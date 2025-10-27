import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import BrowsePage from './pages/BrowsePage'
import BusinessRegister from './pages/BusinessRegister'
import BusinessDashboard from './pages/BusinessDashboard'
import BusinessProfile from './pages/BusinessProfile'
import BookingPage from './pages/BookingPage'
import BookingConfirmPage from './pages/BookingConfirmPage'
import CustomerDashboard from './pages/CustomerDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <div className="min-h-full flex flex-col bg-white text-slate-800">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/register-business" element={<BusinessRegister />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/business/:businessId" element={<BusinessProfile />} />
          <Route path="/booking/:businessId" element={<BookingPage />} />
          <Route path="/booking/:bookingId/confirm" element={<BookingConfirmPage />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
