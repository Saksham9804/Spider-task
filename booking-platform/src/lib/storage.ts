import { addMinutes, isBefore, parseISO } from 'date-fns'
import type { Booking, Business, Service, StoredData } from './types'

const STORAGE_KEY = 'multibook:data:v1'

export function loadData(): StoredData {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const seeded = seed()
    saveData(seeded)
    return seeded
  }
  try {
    return JSON.parse(raw) as StoredData
  } catch {
    const seeded = seed()
    saveData(seeded)
    return seeded
  }
}

export function saveData(data: StoredData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function seed(): StoredData {
  const businesses: Business[] = [
    { id: 'b1', type: 'salon', name: 'Glow Salon', address: '123 Main St', contact: '555-1234', openingHours: 'Mon-Fri 9-18', description: 'Premium salon services.', rating: 4.7, city: 'City Center', resourceCapacity: 4 },
    { id: 'b2', type: 'restaurant', name: 'Pasta Place', address: '45 Food Ave', contact: '555-5678', openingHours: 'Daily 11-22', description: 'Italian cuisine.', rating: 4.5, city: 'Downtown', resourceCapacity: 20 },
  ]
  const services: Service[] = [
    { id: 's1', businessId: 'b1', name: 'Haircut', durationMinutes: 30, priceCents: 2500 },
    { id: 's2', businessId: 'b1', name: 'Facial', durationMinutes: 45, priceCents: 4500 },
    { id: 's3', businessId: 'b2', name: 'Table for two', durationMinutes: 60 },
  ]
  const bookings: Booking[] = []
  return { businesses, services, bookings }
}

export function listBusinesses(filter?: { type?: Business['type'] }): Business[] {
  const { businesses } = loadData()
  if (filter?.type) return businesses.filter(b => b.type === filter.type)
  return businesses
}

export function getBusiness(id: string): Business | undefined {
  return loadData().businesses.find(b => b.id === id)
}

export function listServices(businessId: string): Service[] {
  return loadData().services.filter(s => s.businessId === businessId)
}

export function createBooking(input: Omit<Booking, 'id' | 'status' | 'endTimeIso'>): Booking | { error: string } {
  const data = loadData()
  const service = data.services.find(s => s.id === input.serviceId)
  if (!service) return { error: 'Service not found' }

  const start = parseISO(input.startTimeIso)
  const end = addMinutes(start, service.durationMinutes)

  // Conflict check: overlapping bookings for the same business cannot exceed resourceCapacity
  const business = data.businesses.find(b => b.id === input.businessId)
  if (!business) return { error: 'Business not found' }

  const overlapping = data.bookings.filter(b => b.businessId === input.businessId).filter(b => rangesOverlap(input.startTimeIso, b.startTimeIso, end.toISOString(), b.endTimeIso))
  if (overlapping.length >= business.resourceCapacity) {
    return { error: 'Time slot is fully booked' }
  }

  const booking: Booking = {
    ...input,
    id: `bk_${Date.now()}`,
    status: 'confirmed',
    endTimeIso: end.toISOString(),
  }
  data.bookings.push(booking)
  saveData(data)
  return booking
}

function rangesOverlap(aStartIso: string, bStartIso: string, aEndIso: string, bEndIso: string): boolean {
  const aStart = parseISO(aStartIso)
  const aEnd = parseISO(aEndIso)
  const bStart = parseISO(bStartIso)
  const bEnd = parseISO(bEndIso)
  return isBefore(aStart, bEnd) && isBefore(bStart, aEnd)
}