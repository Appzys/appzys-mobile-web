import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MobileAppServicePage from './pages/MobileAppServicePage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudyDetailPage from './pages/CaseStudyDetailPage'
import ContactPage from './pages/ContactPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminLeadsPage from './pages/admin/AdminLeadsPage'
import AdminEstimatesPage from './pages/admin/AdminEstimatesPage'

// Layout wrapper for public consumer pages with public Navbar and Footer
function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC CLIENT-FACING ROUTES */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/services/mobile-app-development"
            element={
              <PublicLayout>
                <MobileAppServicePage />
              </PublicLayout>
            }
          />
          <Route
            path="/case-studies"
            element={
              <PublicLayout>
                <CaseStudiesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/case-studies/:slug"
            element={
              <PublicLayout>
                <CaseStudyDetailPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactPage />
              </PublicLayout>
            }
          />

          {/* ADMIN AUTHENTICATION (Day 10) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* PROTECTED ADMIN MINI-CRM ROUTES (Day 10 & Day 11) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="leads" element={<AdminLeadsPage />} />
              <Route path="estimates" element={<AdminEstimatesPage />} />
            </Route>
          </Route>

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
