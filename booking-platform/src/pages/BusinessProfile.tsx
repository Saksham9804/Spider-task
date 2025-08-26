import { Link, useParams } from 'react-router-dom'
import { listServices, getBusiness } from '../lib/storage'

export default function BusinessProfile() {
  const { businessId = '' } = useParams()
  const business = getBusiness(businessId)
  const services = listServices(businessId)

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="h-48 rounded-md bg-slate-100" />
            <h1 className="mt-4 text-2xl font-semibold">{business?.name || 'Business'}</h1>
            <div className="text-slate-600">{business?.city || 'City'} • {business?.rating || '4.5'} ⭐</div>
            <p className="mt-3 text-slate-700">{business?.description || 'Description about the business, services, and location details.'}</p>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 p-4">
            <div className="font-medium">Services</div>
            <div className="mt-3 grid gap-3">
              {services.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-md border border-slate-200 p-3">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-slate-600">{s.durationMinutes} min</div>
                  </div>
                  <div className="text-sm font-medium">{s.priceCents ? `$${(s.priceCents/100).toFixed(2)}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="font-medium">Availability</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {['10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00'].map((t) => (
                <Link key={t} to={`/booking/${businessId}?time=${encodeURIComponent(t)}`} className="rounded-md border border-slate-300 px-3 py-2 text-center text-sm hover:border-slate-400">{t}</Link>
              ))}
            </div>
            <Link to={`/booking/${businessId}`} className="mt-3 inline-block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-white">Book Now</Link>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 p-4">
            <div className="font-medium">Reviews</div>
            <div className="mt-3 grid gap-2 text-sm">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-md border border-slate-200 p-3">User {i+1}: Excellent! ⭐⭐⭐⭐⭐</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}