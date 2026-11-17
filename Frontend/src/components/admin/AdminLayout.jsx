import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Briefcase,
  Calculator,
  ExternalLink,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  ShieldCheck,
  User,
  X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/api'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [newCount, setNewCount] = useState(0)

  // Fetch count of new leads
  useEffect(() => {
    let active = true
    api.getAdminStats().then((res) => {
      if (active && res?.data?.newLeads !== undefined) {
        setNewCount(res.data.newLeads)
      }
    }).catch(() => {})
    return () => {
      active = false
    }
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Overview & KPIs',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/admin/leads',
      label: 'Client Inquiries & Leads',
      icon: Inbox,
      badge: newCount > 0 ? `${newCount} New` : null,
      badgeColor: 'bg-blue-600 text-white',
    },
    {
      to: '/admin/estimates',
      label: 'Cost Estimates Scope',
      icon: Calculator,
      badge: null,
    },
    {
      to: '/admin/blogs',
      label: 'Articles & SEO CMS',
      icon: FileText,
      badge: null,
    },
    {
      to: '/admin/case-studies',
      label: 'Case Studies CMS',
      icon: Briefcase,
      badge: null,
    },
  ]

  return (
    <div className="flex min-h-screen bg-slate-100/70 text-slate-900">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white p-5 lg:flex">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#1D63ED] to-blue-400 text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-base font-black tracking-tight text-[#0A192F]">
                APPZYS
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1D63ED]">
                Admin Operations
              </span>
            </div>
          </Link>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Mini-CRM Navigation
            </div>
            <nav className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  location.pathname === item.to ||
                  (item.to === '/admin/dashboard' && location.pathname === '/admin')

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                      isActive
                        ? 'bg-[#1D63ED] text-white shadow-sm shadow-blue-500/25'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                          isActive
                            ? 'bg-white text-[#1D63ED]'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Public Site Links
            </div>
            <div className="mt-2 space-y-1">
              <Link
                to="/"
                target="_blank"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                <span>View Live Site</span>
              </Link>
              <Link
                to="/contact"
                target="_blank"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                <span>Test Contact Form</span>
              </Link>
            </div>
          </div>
        </div>

        {/* User Footer Strip */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                {user?.fullName?.charAt(0) || 'A'}
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-bold text-slate-900">
                  {user?.fullName || 'Appzys Admin'}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Authenticated
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign Out"
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-red-600 shadow-2xs"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="hidden items-center gap-2 text-xs font-semibold text-slate-500 sm:flex">
              <span>Admin Portal</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">
                {location.pathname.includes('leads')
                  ? 'Client Leads & CRM'
                  : location.pathname.includes('estimates')
                  ? 'Cost Estimates'
                  : location.pathname.includes('blogs')
                  ? 'Articles & SEO CMS'
                  : location.pathname.includes('case-studies')
                  ? 'Case Studies CMS'
                  : 'Dashboard Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>JWT Session Active</span>
            </div>

            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              <span>+ New Inquiry Test</span>
            </Link>
          </div>
        </header>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white p-4 lg:hidden">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-blue-600" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </nav>
          </div>
        )}

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
