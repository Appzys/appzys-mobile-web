import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ArrowRight, Smartphone, Sparkles } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Mobile Services', to: '/services/mobile-app-development' },
  { label: 'AI & OCR Apps', to: '/services/ai-ocr-app-development' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
  /* { label: 'Blog', to: '/blog' }, */
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            {/* Exact Appzys Logo from Uploaded Image in crisp white rounded card */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1 shadow-sm border border-slate-200 overflow-hidden">
              <img
                src="/appzys-logo.png"
                alt="Appzys Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="font-display text-lg font-black tracking-tight text-[#0A192F]">
                APPZYS
              </span>
              <span className="ml-1.5 hidden rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 sm:inline-block border border-blue-200/50">
                Mobile &amp; AI Studio
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-[#0A192F]'
                  }`
                }
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-blue-100 px-1.5 py-0.2 text-[10px] font-bold text-blue-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1652CA]"
            >
              <Sparkles className="h-4 w-4" />
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-semibold ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                    }`
                  }
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-blue-100 px-1.5 py-0.2 text-[10px] font-bold text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Thumb-friendly sticky mobile CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2.5">
          <Link
            to="/about"
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-center text-xs font-semibold text-slate-800"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="flex-1 rounded-xl bg-[#2563EB] px-3 py-2.5 text-center text-xs font-semibold text-white shadow-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  )
}
