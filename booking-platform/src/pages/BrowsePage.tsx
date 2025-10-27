import { Link, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { listBusinesses } from '../lib/storage'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export default function BrowsePage() {
  const q = useQuery()
  const category = q.get('category') || 'all'
  const businesses = useMemo(() => category==='all' ? listBusinesses() : listBusinesses({ type: category as any }), [category])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xl font-semibold">Browse Businesses</div>
        <div className="flex gap-2 text-sm">
          {['all','restaurants','salons','hospitals','banks'].map((c) => (
            <Link key={c} to={c==='all' ? '/browse' : `/browse?category=${c}`}
              className={`rounded-md px-3 py-2 border ${category===c ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 text-slate-700 hover:border-slate-400'}`}>{c[0].toUpperCase()+c.slice(1)}</Link>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {businesses.map((b) => (
          <div key={b.id} className="rounded-lg border border-slate-200 p-4">
            <div className="h-24 rounded-md bg-slate-100" />
            <div className="mt-3 font-medium">{b.name}</div>
            <div className="text-sm text-slate-600">{b.city || 'City'} • {b.rating || '4.5'} ⭐</div>
            <div className="mt-3 flex gap-2">
              <Link to={`/business/${b.id}`} className="text-sm text-blue-700 hover:underline">View</Link>
              <Link to={`/booking/${b.id}`} className="text-sm text-blue-700 hover:underline">Check availability</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}