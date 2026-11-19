import { Link } from 'react-router-dom'
import { Smartphone, MapPin, Mail, Phone, Globe, Linkedin, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-blue-900/40 bg-gradient-to-r from-[#0A192F] via-[#0F2557] to-[#1D4ED8] pb-20 pt-14 text-blue-100 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              {/* Exact Appzys Logo from Uploaded Image */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1 shadow-md overflow-hidden">
                <img
                  src="/appzys-logo.png"
                  alt="Appzys Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="font-display text-xl font-black text-white tracking-tight">
                  APPZYS
                </span>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-blue-200/80">
                  Technologies Private Limited
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              APPZYS Technologies is a Chennai-based mobile engineering company specializing in Flutter, Android and iOS engineering. Alongside developing its own mobile products, APPZYS provides production engineering support to businesses, software agencies and growing product teams.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-blue-300">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              100% Source-Code IP Ownership &amp; NDA Protection From Day 1
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-app-development" className="hover:text-white transition">
                  Mobile Services
                </Link>
              </li>
              <li>
                <Link to="/services/ai-ocr-app-development" className="hover:text-white transition">
                  AI &amp; OCR Apps
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-white transition">
                  Case Studies
                </Link>
              </li>
              {/*
              <li>
                <Link to="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              */}
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact &amp; Studio HQ</h3>
            <ul className="mt-4 space-y-3 text-sm text-blue-100">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                <span>Guindy, Chennai, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-blue-300" />
                <a href="mailto:support@appzys.com" className="hover:text-white hover:underline transition">
                  support@appzys.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-blue-300" />
                <a href="tel:+919025359351" className="hover:text-white hover:underline transition">
                  +91 9025359351
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 shrink-0 text-blue-300" />
                <a href="https://www.appzys.com" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition">
                  www.appzys.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <Linkedin className="h-4 w-4 shrink-0 text-blue-300" />
                <a
                  href="https://linkedin.com/company/appzys"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-300 hover:text-white hover:underline transition"
                >
                  linkedin.com/company/appzys
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-blue-100/80 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} APPZYS Technologies Private Limited. Guindy, Chennai, India.</p>
          <p>Flutter &bull; Dart &bull; Firebase &bull; On-Device AI &bull; REST APIs</p>
        </div>
      </div>
    </footer>
  )
}
