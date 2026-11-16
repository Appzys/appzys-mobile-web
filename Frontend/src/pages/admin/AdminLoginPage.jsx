import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin@appzys.com')
  const [password, setPassword] = useState('AppzysAdmin2026!')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/admin/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await login(username, password)
    if (res.success) {
      navigate(from, { replace: true })
    } else {
      setError(res.error || 'Invalid credentials. Please verify username and password.')
    }
  }

  const fillDemo = () => {
    setUsername('admin@appzys.com')
    setPassword('AppzysAdmin2026!')
    setError('')
  }

  return (
    <div className="relative flex min-h-[90vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand Card Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#1D63ED] to-blue-400 text-white shadow-lg shadow-blue-500/25">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="text-left">
              <span className="font-display text-xl font-black tracking-tight text-[#0A192F]">
                APPZYS
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1D63ED]">
                Internal Studio Portal
              </span>
            </div>
          </Link>

          <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-[#1D63ED]">
            <Lock className="h-3.5 w-3.5" />
            Day 10: Spring Security &amp; JWT Protected Access
          </div>

          <h1 className="mt-3 font-display text-2xl font-extrabold text-[#0A192F] sm:text-3xl">
            Admin Team Sign-In
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
            Secure mini-CRM access to manage client leads, requests, and cost estimates.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Admin Username or Email
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@appzys.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="text-xs font-bold text-[#1D63ED] hover:underline"
                >
                  Auto-fill Demo
                </button>
              </div>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <KeyRound className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm font-medium text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D63ED] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-[#1652CA] disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating JWT...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Help */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 font-bold text-[#1D63ED]">
              <Sparkles className="h-3.5 w-3.5" />
              Default Internal Credentials
            </div>
            <div className="mt-1.5 space-y-0.5 font-mono text-[11px] text-slate-800">
              <div>User: <span className="font-bold">admin@appzys.com</span></div>
              <div>Pass: <span className="font-bold">AppzysAdmin2026!</span></div>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#1D63ED]"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  )
}
