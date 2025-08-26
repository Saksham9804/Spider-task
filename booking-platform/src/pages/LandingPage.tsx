import { Link } from 'react-router-dom'
import { Building2, Scissors, Hospital, Landmark, ArrowRight, Search } from 'lucide-react'

export default function LandingPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Book Restaurants, Salons, Hospitals & Banks — All in One Place</h1>
            <p className="mt-4 text-slate-600 max-w-2xl">Find and reserve appointments instantly. Simple, fast, and reliable for businesses and customers.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/browse" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700">Book Now <ArrowRight size={16} /></Link>
              <Link to="/register-business" className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-3 text-slate-700 font-medium hover:border-slate-400">Register Your Business</Link>
            </div>
            <div className="mt-8 w-full max-w-xl">
              <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white p-2">
                <Search className="text-slate-400" size={18} />
                <input aria-label="Search" placeholder="Search by business, category, or location" className="w-full outline-none" />
                <Link to="/browse" className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white">Search</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-blue-100" />
              <img src="/hero-illustration.svg" alt="Booking" className="relative z-10 mx-auto max-w-md" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-cyan-100" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-slate-900">Categories</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <CategoryCard to="/browse?category=restaurants" icon={<Building2 />} title="Restaurants" />
            <CategoryCard to="/browse?category=salons" icon={<Scissors />} title="Salons" />
            <CategoryCard to="/browse?category=hospitals" icon={<Hospital />} title="Hospitals" />
            <CategoryCard to="/browse?category=banks" icon={<Landmark />} title="Banks" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-slate-900">How It Works</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <StepCard step={1} title="Business Register" description="Create your listing, add services, set availability." />
            <StepCard step={2} title="Customer Search & Discover" description="Browse categories, compare, and find the perfect time." />
            <StepCard step={3} title="Book & Confirm" description="Reserve instantly and get confirmation notifications." />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Featured Businesses</h2>
            <Link to="/browse" className="text-sm text-blue-700 hover:underline">See all</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-slate-200 p-4">
                <div className="h-24 rounded-md bg-slate-100" />
                <div className="mt-3 font-medium">Business #{i + 1}</div>
                <div className="text-sm text-slate-600">City Center • 4.6 ⭐</div>
                <Link to="/business/1" className="mt-3 inline-block text-sm text-blue-700 hover:underline">View</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ to, icon, title }: { to: string, icon: React.ReactNode, title: string }) {
  return (
    <Link to={to} className="group rounded-lg border border-slate-200 bg-white p-4 hover:shadow-sm transition">
      <div className="h-12 w-12 rounded-md bg-blue-600 text-white grid place-items-center">
        {icon}
      </div>
      <div className="mt-3 font-medium text-slate-800">{title}</div>
      <div className="text-sm text-slate-600">Explore and book now</div>
    </Link>
  )
}

function StepCard({ step, title, description }: { step: number, title: string, description: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="text-xs font-semibold text-blue-700">Step {step}</div>
      <div className="mt-1 font-medium text-slate-800">{title}</div>
      <div className="text-sm text-slate-600">{description}</div>
    </div>
  )
}