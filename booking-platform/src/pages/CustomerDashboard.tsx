export default function CustomerDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-semibold">Your Bookings</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Upcoming</div>
          <div className="mt-3 grid gap-2 text-sm">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-md border border-slate-200 p-3">Booking #{2000+i} • Tomorrow 11:{i}0 AM <button className="ml-2 rounded-md border border-slate-300 px-2 py-1">Reschedule</button> <button className="ml-2 rounded-md border border-slate-300 px-2 py-1">Cancel</button></div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Past</div>
          <div className="mt-3 grid gap-2 text-sm">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-md border border-slate-200 p-3">Booking #{1800+i} • Last week <button className="ml-2 rounded-md border border-slate-300 px-2 py-1">Review</button></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Saved Businesses</div>
          <div className="mt-3 grid gap-2 text-sm">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-md border border-slate-200 p-3">Favorite Business #{i+1}</div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Profile</div>
          <div className="mt-3 text-sm text-slate-600">Manage contact info, notifications, and preferences.</div>
        </div>
      </div>
    </div>
  )
}