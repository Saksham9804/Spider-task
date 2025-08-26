import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { createBooking, getBusiness, listServices } from '../lib/storage'

export default function BookingPage() {
  const { businessId = '' } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const services = useMemo(() => listServices(businessId), [businessId])
  const [serviceId, setServiceId] = useState(services[0]?.id || '')
  const [date, setDate] = useState('')
  const [time, setTime] = useState(params.get('time') || '')
  const [people, setPeople] = useState(1)
  const [contact, setContact] = useState('')
  const [payment, setPayment] = useState<'online'|'venue'>('venue')
  const business = getBusiness(businessId)

  useEffect(() => {
    if (services.length && !serviceId) setServiceId(services[0].id)
  }, [services, serviceId])

  function onConfirm() {
    if (!serviceId || !date || !time || !contact) return alert('Please complete all fields')
    const startIso = new Date(`${date}T${time}:00`).toISOString()
    const result = createBooking({
      businessId,
      serviceId,
      customerId: contact,
      startTimeIso: startIso,
      numPeople: people,
      paymentMethod: payment,
    })
    if ('error' in result) return alert(result.error)
    navigate(`/booking/${result.id}/confirm`)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-semibold">Book Appointment</h1>
      <div className="mt-1 text-sm text-slate-600">{business?.name}</div>

      <div className="mt-6 grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Service</label>
            <select value={serviceId} onChange={(e)=>setServiceId(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2">
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Number of people</label>
            <input type="number" min={1} value={people} onChange={(e)=>setPeople(Number(e.target.value))} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Contact</label>
            <input placeholder="Email or phone" value={contact} onChange={(e)=>setContact(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 p-2" />
          </div>
        </div>
        <div>
          <div className="text-sm font-medium">Payment Option</div>
          <div className="mt-2 flex gap-3 text-sm">
            <label className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 ${payment==='online'?'border-blue-600':'border-slate-300'}`}>
              <input type="radio" name="payment" value="online" checked={payment==='online'} onChange={()=>setPayment('online')} /> Pay Online
            </label>
            <label className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 ${payment==='venue'?'border-blue-600':'border-slate-300'}`}>
              <input type="radio" name="payment" value="venue" checked={payment==='venue'} onChange={()=>setPayment('venue')} /> Pay at Venue
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">You will receive confirmation by email/SMS.</div>
          <button onClick={onConfirm} className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">Confirm Booking</button>
        </div>
      </div>
    </div>
  )
}