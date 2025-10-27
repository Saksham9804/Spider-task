export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-semibold">Admin Panel</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 p-4"><div className="text-sm text-slate-600">Total Businesses</div><div className="mt-2 text-2xl font-semibold">120</div></div>
        <div className="rounded-lg border border-slate-200 p-4"><div className="text-sm text-slate-600">Restaurants</div><div className="mt-2 text-2xl font-semibold">45</div></div>
        <div className="rounded-lg border border-slate-200 p-4"><div className="text-sm text-slate-600">Customers</div><div className="mt-2 text-2xl font-semibold">2,340</div></div>
        <div className="rounded-lg border border-slate-200 p-4"><div className="text-sm text-slate-600">Bookings</div><div className="mt-2 text-2xl font-semibold">8,912</div></div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Business Approvals</div>
          <div className="mt-3 grid gap-2 text-sm">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-md border border-slate-200 p-3 flex items-center justify-between">
                <div>New Business #{3000+i}</div>
                <div className="flex gap-2">
                  <button className="rounded-md border border-slate-300 px-2 py-1">Approve</button>
                  <button className="rounded-md border border-slate-300 px-2 py-1">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="font-medium">Reports & Analytics</div>
          <div className="mt-3 text-sm text-slate-600">Daily/monthly booking stats, top categories, and engagement insights.</div>
        </div>
      </div>
    </div>
  )
}