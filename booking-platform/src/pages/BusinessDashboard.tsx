export default function BusinessDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-semibold">Business Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 p-4"><div className="text-sm text-slate-600">Upcoming bookings</div><div className="mt-2 text-2xl font-semibold">8</div></div>
        <div className="rounded-lg border border-slate-200 p-4"><div className="text-sm text-slate-600">Today’s schedule</div><div className="mt-2 text-2xl font-semibold">5</div></div>
        <div className="rounded-lg border border-slate-200 p-4"><div className="text-sm text-slate-600">Earnings</div><div className="mt-2 text-2xl font-semibold">$1,240</div></div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Manage Services</div>
          <div className="mt-3 grid gap-2">
            {['Haircut','Facial','Consultation','Table for two'].map((s) => (
              <div key={s} className="flex items-center justify-between rounded-md border border-slate-200 p-2">
                <div>{s}</div>
                <div className="text-sm text-slate-600">30-60 min</div>
              </div>
            ))}
          </div>
          <button className="mt-3 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white">Add Service</button>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Availability</div>
          <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm">
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} className="rounded-md border border-slate-200 p-3">{d}</div>
            ))}
          </div>
          <button className="mt-3 rounded-md border border-slate-300 px-3 py-2 text-sm">Edit Time Slots</button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Booking Management</div>
          <div className="mt-3 grid gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-md border border-slate-200 p-3 text-sm flex items-center justify-between">
                <div>Booking #{1000 + i} • Today 2:{i}0 PM</div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-slate-300 px-2 py-1">Approve</button>
                  <button className="rounded-md border border-slate-300 px-2 py-1">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Reviews & Ratings</div>
          <div className="mt-3 grid gap-2 text-sm">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-md border border-slate-200 p-3">Customer {i+1}: Great service! ⭐⭐⭐⭐⭐</div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 p-4">
        <div className="font-medium">Settings</div>
        <div className="mt-3 text-sm text-slate-600">Profile • Payment setup • Notifications</div>
      </div>
    </div>
  )
}