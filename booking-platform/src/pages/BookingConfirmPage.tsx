import { Link, useParams } from 'react-router-dom'

export default function BookingConfirmPage() {
  const { bookingId } = useParams()
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 grid place-items-center text-green-700">✓</div>
      <h1 className="mt-4 text-2xl font-semibold">Booking Confirmed</h1>
      <div className="mt-2 text-slate-600">Your booking ID is <span className="font-medium">{bookingId}</span>. A confirmation has been sent to your contact.</div>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/customer" className="rounded-md bg-blue-600 px-4 py-2 text-white">Go to Dashboard</Link>
        <Link to="/browse" className="rounded-md border border-slate-300 px-4 py-2">Book Another</Link>
      </div>
    </div>
  )
}