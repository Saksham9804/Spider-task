import { Link, NavLink } from 'react-router-dom'
import { Building2, CalendarClock, Home, Menu } from 'lucide-react'
import { useState } from 'react'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-700' : 'text-slate-600 hover:text-blue-700'}`

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="h-9 w-9 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 grid place-items-center text-white">
                <Building2 size={18} />
              </div>
              <span className="font-semibold text-slate-800">MultiBook</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass} end>
              <Home className="mr-1 inline-block" size={16} /> Home
            </NavLink>
            <NavLink to="/browse" className={navLinkClass}>
              Browse Businesses
            </NavLink>
            <NavLink to="/browse?category=restaurants" className={navLinkClass}>
              Restaurants
            </NavLink>
            <NavLink to="/browse?category=salons" className={navLinkClass}>
              Salons
            </NavLink>
            <NavLink to="/browse?category=hospitals" className={navLinkClass}>
              Hospitals
            </NavLink>
            <NavLink to="/browse?category=banks" className={navLinkClass}>
              Banks
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/register-business" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <CalendarClock size={16} /> Register Your Business
            </Link>
            <button className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700">Login</button>
            <button className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-400">Sign Up</button>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700">
            <Menu />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3">
            <div className="grid gap-2">
              <NavLink to="/" className={navLinkClass} end onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink to="/browse" className={navLinkClass} onClick={() => setOpen(false)}>Browse Businesses</NavLink>
              <NavLink to="/browse?category=restaurants" className={navLinkClass} onClick={() => setOpen(false)}>Restaurants</NavLink>
              <NavLink to="/browse?category=salons" className={navLinkClass} onClick={() => setOpen(false)}>Salons</NavLink>
              <NavLink to="/browse?category=hospitals" className={navLinkClass} onClick={() => setOpen(false)}>Hospitals</NavLink>
              <NavLink to="/browse?category=banks" className={navLinkClass} onClick={() => setOpen(false)}>Banks</NavLink>
              <NavLink to="/admin" className={navLinkClass} onClick={() => setOpen(false)}>Admin</NavLink>
              <Link to="/register-business" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                <CalendarClock size={16} /> Register Your Business
              </Link>
              <div className="flex gap-2">
                <button className="flex-1 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-700">Login</button>
                <button className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-400">Sign Up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}