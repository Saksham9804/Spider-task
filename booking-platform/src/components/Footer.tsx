import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="text-lg font-semibold text-slate-800">MultiBook</div>
          <p className="mt-2 text-sm text-slate-600">Book restaurants, salons, hospitals and banks in one place.</p>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-700">Company</div>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-700">Legal</div>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li><Link to="#">Privacy</Link></li>
            <li><Link to="#">Terms</Link></li>
            <li><Link to="#">Support</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-700">Follow</div>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} MultiBook. All rights reserved.</div>
    </footer>
  )
}