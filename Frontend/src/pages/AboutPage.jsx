import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Code2,
  Download,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import SeoHead from '../components/SeoHead'

const METRICS = [
  { target: '620K+', label: 'Reported Google Play downloads', icon: Download },
  { target: '14K+', label: 'Reported US App Store ratings', icon: Star },
  { target: '4.6 / 5', label: 'Referenced US App Store product rating', icon: Award },
  { target: '8+ Years', label: 'Mobile development experience', icon: Smartphone },
]

const CORE_VALUES = [
  {
    title: 'Practical Mobile Engineering',
    desc: 'We do not sell abstract roadmaps. We build functional, maintainable Flutter applications using clean architecture, Provider state management, and native platform integrations.',
    icon: Code2,
  },
  {
    title: 'First-Hand Product Experience',
    desc: 'Our engineering knowledge comes from publishing, maintaining, and scaling our own in-house mobile apps to hundreds of thousands of active store users.',
    icon: Smartphone,
  },
  {
    title: 'Transparent Collaboration',
    desc: 'You work directly with the developers writing your code. We agree on scope, delivery milestones, and regular build drops with zero agency fluff.',
    icon: Users,
  },
  {
    title: '100% Client IP & Confidentiality',
    desc: 'Your intellectual property, credentials, and source code belong completely to you under strict mutual NDA protection from kickoff.',
    icon: ShieldCheck,
  },
]

export default function AboutPage() {
  return (
    <div className="bg-[#FAFBFD] pb-24 text-slate-900">
      <SeoHead
        title="About APPZYS | Chennai Mobile Engineering Company"
        description="APPZYS Technologies Private Limited is a Chennai-based mobile application development company specializing in Flutter, Android, and iOS engineering."
        canonicalPath="/about"
        keywords="About Appzys, Appzys Technologies Chennai, Flutter app company India, mobile application developers Chennai"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' },
        ]}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>About APPZYS Technologies</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-[#0A192F] sm:text-5xl lg:text-6xl">
            Mobile engineering built around <br className="hidden sm:inline" />
            <span className="text-[#1D63ED]">real product needs.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            APPZYS Technologies Private Limited is a Chennai-based mobile application development company specializing in Flutter, Android and iOS engineering. Alongside developing its own mobile products, APPZYS is bringing its production engineering experience to businesses, software agencies and growing product teams.
          </p>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section className="border-b border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          {METRICS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-4 font-display text-2xl font-black text-[#0A192F] sm:text-3xl">
                  {item.target}
                </span>
                <span className="mt-1 text-xs font-medium text-slate-600">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Our Approach
          </span>
          <h2 className="mt-2 font-display text-2xl font-black text-[#0A192F] sm:text-4xl">
            Built for Practical, Maintainable Delivery
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-600">
            Its focus is practical development, clear communication and maintainable mobile applications.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon
            return (
              <div
                key={val.title}
                className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-xs transition hover:border-blue-300 hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-[#0A192F]">
                  {val.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {val.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* COMPANY DETAILS CARD */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-md sm:p-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                Official Registered Entity
              </span>
              <h3 className="mt-3 font-display text-2xl font-black text-[#0A192F] sm:text-3xl">
                APPZYS Technologies Private Limited
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                A registered mobile engineering company based in Chennai, Tamil Nadu, India. We engineer production Flutter, Android, iOS and on-device AI applications for clients globally.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Guindy, Chennai, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                  <a href="mailto:support@appzys.com" className="hover:underline">
                    support@appzys.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                  <a href="tel:+919025359351" className="hover:underline">
                    +91 9025359351
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-blue-600 shrink-0" />
                  <a href="https://www.appzys.com" target="_blank" rel="noreferrer" className="hover:underline">
                    appzys.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D63ED] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-[#1652CA]"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400"
              >
                View Our Applications
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
