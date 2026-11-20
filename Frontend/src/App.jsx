import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MobileAppServicePage from './pages/MobileAppServicePage'
import AiOcrServicePage from './pages/AiOcrServicePage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudyDetailPage from './pages/CaseStudyDetailPage'
import BlogHubPage from './pages/BlogHubPage'
import BlogPostDetailPage from './pages/BlogPostDetailPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import LegacyAppPolicyPage from './pages/LegacyAppPolicyPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminLeadsPage from './pages/admin/AdminLeadsPage'
import AdminEstimatesPage from './pages/admin/AdminEstimatesPage'
import AdminBlogsPage from './pages/admin/AdminBlogsPage'
import AdminCaseStudiesPage from './pages/admin/AdminCaseStudiesPage'

// Keep navigation predictable when moving from long stories to another route.
function ScrollToLocation() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

// Layout wrapper for public consumer pages with public Navbar and Footer
function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" className="flex-1 pb-20 lg:pb-0">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToLocation />
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
            path="/services/ai-ocr-app-development"
            element={
              <PublicLayout>
                <AiOcrServicePage />
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
          {/* 
          <Route
            path="/blog"
            element={
              <PublicLayout>
                <BlogHubPage />
              </PublicLayout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <PublicLayout>
                <BlogPostDetailPage />
              </PublicLayout>
            }
          />
          */}
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactPage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />

          {/* LEGACY APP STORE & PLAY STORE PRESERVATION ROUTES (Zero Downtime) */}
          <Route
            path="/ios/:app/:doc"
            element={
              <PublicLayout>
                <LegacyAppPolicyPage />
              </PublicLayout>
            }
          />
          <Route
            path="/ios/textscanner/privacypolicy"
            element={
              <PublicLayout>
                <LegacyAppPolicyPage />
              </PublicLayout>
            }
          />
          <Route
            path="/ios/textscanner/termsofuse"
            element={
              <PublicLayout>
                <LegacyAppPolicyPage />
              </PublicLayout>
            }
          />
          <Route
            path="/ios/copytext/privacypolicy"
            element={
              <PublicLayout>
                <LegacyAppPolicyPage />
              </PublicLayout>
            }
          />
          <Route
            path="/ios/handocr/privacypolicy"
            element={
              <PublicLayout>
                <LegacyAppPolicyPage />
              </PublicLayout>
            }
          />
          <Route
            path="/ios/aichat/privacypolicy"
            element={
              <PublicLayout>
                <LegacyAppPolicyPage />
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
              <Route path="blogs" element={<AdminBlogsPage />} />
              <Route path="case-studies" element={<AdminCaseStudiesPage />} />
            </Route>
          </Route>

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
