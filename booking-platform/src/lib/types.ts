export type BusinessType = 'restaurant' | 'salon' | 'hospital' | 'bank'

export interface Service {
  id: string
  businessId: string
  name: string
  durationMinutes: number
  priceCents?: number
}

export interface Business {
  id: string
  type: BusinessType
  name: string
  address: string
  contact: string
  openingHours: string
  description?: string
  logoUrl?: string
  photoUrls?: string[]
  rating?: number
  city?: string
  resourceCapacity: number
}

export interface Booking {
  id: string
  businessId: string
  serviceId: string
  customerId: string
  startTimeIso: string
  endTimeIso: string
  numPeople: number
  paymentMethod: 'online' | 'venue'
  status: 'pending' | 'approved' | 'cancelled' | 'confirmed'
}

export interface StoredData {
  businesses: Business[]
  services: Service[]
  bookings: Booking[]
}