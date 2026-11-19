import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Download,
  Layers,
  ScanText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
} from 'lucide-react'
import TrustMarquee from '../components/TrustMarquee'
import CaseStudyMiniPreview from '../components/CaseStudyMiniPreview'
import Reveal from '../components/Reveal'
import TechStackTabs from '../components/TechStackTabs'
import DevelopmentProcess from '../components/DevelopmentProcess'
import WhyChooseUs from '../components/WhyChooseUs'
import FaqSection from '../components/FaqSection'
import SeoHead from '../components/SeoHead'
import { api } from '../services/api'
import { FALLBACK_CASE_STUDIES, SERVICES_LIST } from '../data/appData'

// Animated Counter component that counts up from 0 to target value on scroll into view
function CounterMetric({ target, suffix = '', decimals = 0, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTimestamp = null
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            // Ease-out expo curve for smooth realistic counting
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setCount(easeProgress * target)
            if (progress < 1) {
              window.requestAnimationFrame(step)
            } else {
              setCount(target)
            }
          }
          window.requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()

  return (
    <span ref={elementRef} className="tabular-nums font-display font-extrabold">
      {formatted}{suffix}
    </span>
  )
}

const TRUST_METRICS = [
  {
    target: 620,
    suffix: 'K+',
    decimals: 0,
    label: 'Reported Google Play downloads',
    icon: Download,
  },
  {
    target: 14,
    suffix: 'K+',
    decimals: 0,
    label: 'Reported US App Store ratings',
    icon: Star,
  },
  {
    target: 4.6,
    suffix: ' / 5',
    decimals: 1,
    label: 'Referenced US App Store product rating',
    icon: Star,
  },
  {
    target: 8,
    suffix: '+ Years',
    decimals: 0,
    label: 'Mobile development experience',
    icon: Smartphone,
  },
]

export default function HomePage() {
  const [featuredStudies] = useState(FALLBACK_CASE_STUDIES)
  const carouselRef = useRef(null)

  const scrollCases = (dir) => {
    carouselRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }

  return (
    <div>
      <SeoHead
        title="Appzys | Flutter Mobile App Development & Engineering Support"
        description="Engineering mobile products for businesses and growing teams. We build Flutter applications for Android and iOS, connect existing business systems, and support production apps."
        canonicalPath="/"
        keywords="Flutter mobile app development, Flutter engineering support, hire Flutter developers, mobile app development company India, Android iOS apps"
      />

      {/* Hero Section: OrangeMantra-Style Full Bleed Cinematic Banner */}
      <section className="relative flex min-h-[calc(100vh-68px)] w-full items-center overflow-hidden bg-[#000E26] py-12 text-white sm:py-16">
        {/* Full-bleed background graphics canvas */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Right-anchored image matching container height: phone is 100% visible from top to bottom */}
          <div className="absolute inset-y-0 right-0 flex h-full w-full justify-end">
            <img
              src="/home-hero-banner.jpg"
              alt="Appzys 3D Flutter Mobile Solutions Showcase"
              className="h-full w-auto max-w-none object-contain object-right"
            />
          </div>

          {/* Seamless gradient blend: ensures pristine text readability on left while blending phone naturally */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000E26] via-[#000E26]/90 to-transparent lg:w-[58%]" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#000E26] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-left lg:max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3.5 py-1.5 text-xs font-semibold text-blue-200">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              Flutter Mobile App Development &amp; Engineering Support
            </div>

            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.14] tracking-tight text-white sm:text-4xl lg:text-[2.85rem] xl:text-[3.25rem]">
              Flutter Mobile App Development Services for{' '}
              <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 bg-clip-text text-transparent">
                Growing Teams.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              We build Flutter applications for Android and iOS, connect existing business systems to
              mobile experiences, and provide ongoing engineering support for applications already in production.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D63ED] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-[#1652CA]"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-blue-400/50"
              >
                View Our Work
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Regular Builds &amp; Updates
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Agreed Delivery Milestones
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Verified Functional Testing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* OrangeMantra-Style Live Scrolling Trust Marquee */}
      <TrustMarquee />

      {/* Store Proof Metric Strip */}
      <section className="border-b border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          {TRUST_METRICS.map((item, idx) => {
            const Icon = item.icon
            return (
              <Reveal key={item.label} delay={idx * 60} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-300 hover:shadow-lg">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#1D63ED] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-start">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-[#1D63ED] group-hover:text-white group-hover:ring-[#1D63ED]">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="mt-4 font-display text-2xl font-extrabold text-[#0A192F] transition-colors duration-300 group-hover:text-[#1D63ED]">
                    <CounterMetric
                      target={item.target}
                      suffix={item.suffix}
                      decimals={item.decimals}
                    />
                  </div>
                  <div className="mt-1.5 text-xs font-medium leading-relaxed text-slate-600">
                    {item.label}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Services Section: MindInventory-Style Sticky Split Editorial Layout */}
      <section className="bg-white py-16 sm:py-22">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1D63ED]">
                Focused Mobile Engineering
              </span>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl">
                Our Core Services
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-black sm:text-base">
                Focused mobile engineering services for businesses and software teams.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Core Engineering Stack
                </div>
                <div className="mt-2 font-display text-lg font-bold text-black">
                  Flutter &amp; Dart &middot; Provider &middot; Firebase &amp; Cloud Functions &middot; AI APIs
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/services/mobile-app-development"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1D63ED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1652CA]"
                >
                  Explore Mobile Pillar Page <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-400"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {SERVICES_LIST.map((service, index) => (
              <Reveal key={service.title} delay={index * 55}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-lg">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#1D63ED] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-xs ring-1 ring-slate-200/80 transition group-hover:bg-[#1D63ED] group-hover:text-white">
                      {index % 3 === 0 ? (
                        <Smartphone className="h-5 w-5" />
                      ) : index % 3 === 1 ? (
                        <Layers className="h-5 w-5" />
                      ) : (
                        <Cpu className="h-5 w-5" />
                      )}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-black transition-colors group-hover:text-blue-600">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black">
                    {service.summary || service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Showcase: Clean White Sheet Canvas + 3D Studio Cards */}
      <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Selected In-House Products
              </span>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-black sm:text-4xl">
                Products we have built. Problems we have solved.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black sm:text-base">
                Our experience comes from developing, publishing and operating mobile applications
                for OCR, document processing, transcription and AI-powered productivity.
              </p>
            </div>
            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <button
                type="button"
                onClick={() => scrollCases(-1)}
                aria-label="Previous case studies"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-2xs transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCases(1)}
                aria-label="Next case studies"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-2xs transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <Link
                to="/case-studies"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1D63ED] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1652CA]"
              >
                View Our Applications
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredStudies.map((app) => (
              <div
                key={app.slug}
                className="group relative h-[470px] w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[calc((100%-3rem)/3)] perspective-1000"
              >
                {app.frontImage ? (
                  <div className="transform-style-3d relative h-full w-full transition-transform duration-700 ease-in-out group-hover:rotate-y-180">
                    {/* FRONT FACE: High-Resolution Studio Visual */}
                    <div className="backface-hidden absolute inset-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md">
                      <img
                        src={app.frontImage}
                        alt={app.appName}
                        className="h-full w-full object-cover"
                      />

                      {/* Top Right Rating Badge */}
                      <div className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-amber-300 shadow-md">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{app.rating}</span>
                      </div>

                      {/* Bottom Info: App Name (Left) + Google Play Badge (Right) */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 pt-12">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display text-sm font-bold text-white sm:text-base">
                            {app.appName}
                          </span>
                          <span className="shrink-0 rounded-full border border-blue-400/40 bg-blue-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-blue-200 shadow-sm">
                            {app.installsLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK FACE: Detailed Engineering Breakdown & Links */}
                    <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between overflow-y-auto rounded-2xl border border-blue-400/60 bg-[#080E20] p-6 shadow-2xl">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-full bg-blue-500/20 px-2.5 py-1 text-[11px] font-semibold text-blue-200">
                            {app.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400">
                            <Star className="h-3.5 w-3.5 fill-blue-400 text-blue-400" />
                            {app.rating}
                          </span>
                        </div>

                        {/* Visual Mini Phone Screen Preview */}
                        <div className="mt-3">
                          <CaseStudyMiniPreview slug={app.slug} />
                        </div>

                        <h3 className="mt-3 font-display text-lg font-bold text-white">
                          {app.appName}
                        </h3>
                        <p className="mt-0.5 text-xs font-semibold text-blue-400">
                          {app.installsLabel}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-slate-300">
                          {app.summary}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-slate-800 pt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {(app.techStack || []).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-slate-700 bg-slate-950/70 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={`/case-studies/${app.slug}`}
                          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-300 transition-colors hover:text-white"
                        >
                          Read Engineering Breakdown
                          <ArrowRight className="h-3.5 w-3.5 transition-transform hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={`/case-studies/${app.slug}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                          {app.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600">
                          <Star className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
                          {app.rating}
                        </span>
                      </div>

                      {/* Visual Mini Phone Screen Preview */}
                      <div className="mt-3">
                        <CaseStudyMiniPreview slug={app.slug} />
                      </div>

                      <h3 className="mt-3 font-display text-lg font-bold text-black group-hover:text-blue-600">
                        {app.appName}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold text-blue-600">
                        {app.installsLabel}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">{app.summary}</p>
                    </div>

                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(app.techStack || []).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600">
                        Read Engineering Breakdown
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 05: Who We Work With (PDF Page 10) */}
      <section className="border-t border-slate-200 bg-[#FAFBFD] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Target Partnerships
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-black sm:text-4xl">
              Who We Work With
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Whether you are a founder building a product from scratch or an agency needing dedicated Flutter engineering capacity.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Card 1: For Businesses & Startups */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xs transition duration-300 hover:border-blue-300 hover:shadow-xl sm:p-10">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#1D63ED] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1D63ED]">
                  Startups &amp; Product Owners
                </span>
                <h3 className="mt-4 font-display text-2xl font-black text-[#0A192F]">
                  For Businesses &amp; Startups
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Have a mobile product to launch or an existing platform that needs an Android and iOS application? We help turn agreed requirements into a functional mobile application, from implementation through testing and release preparation.
                </p>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-6">
                <Link
                  to="/contact?service=01%20%E2%80%94%20Full%20MVP%20Mobile%20App%20Development"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold text-[#0A192F] shadow-xs transition-all duration-300 group-hover:border-[#1D63ED] group-hover:bg-[#1D63ED] group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-500/20"
                >
                  <span>Discuss a Mobile App Project</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: For Software Agencies & Product Teams */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xs transition duration-300 hover:border-blue-300 hover:shadow-xl sm:p-10">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#1D63ED] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1D63ED]">
                  Agencies &amp; Engineering Leads
                </span>
                <h3 className="mt-4 font-display text-2xl font-black text-[#0A192F]">
                  For Software Agencies &amp; Product Teams
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Need additional Flutter development capacity for an existing project or upcoming mobile requirement? We can collaborate with your team, support specific modules and integrations, or help with ongoing Flutter development.
                </p>
              </div>
              <div className="mt-8 border-t border-slate-100 pt-6">
                <Link
                  to="/contact?service=04%20%E2%80%94%20Dedicated%20Flutter%20Development"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-xs font-bold text-[#0A192F] shadow-xs transition-all duration-300 group-hover:border-[#1D63ED] group-hover:bg-[#1D63ED] group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-500/20"
                >
                  <span>Explore a Development Partnership</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Capabilities, Delivery Process, Why Choose Us & FAQs */}
      <TechStackTabs />
      <DevelopmentProcess />
      <WhyChooseUs />

      <FaqSection />

      {/* Bottom High-Contrast Conversion Banner */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A192F] via-[#0F2557] to-[#1D4ED8] p-8 text-white shadow-2xl sm:p-12">
              <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#1D63ED]/25 blur-3xl" />
              <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
                    <ShieldCheck className="h-4 w-4" />
                    APPZYS Technologies &bull; Chennai, India
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                    Have a mobile product to build or a team to extend?
                  </h2>
                  <p className="mt-2 text-sm text-slate-300 sm:text-base">
                    Whether you need a new Flutter application, integration with an existing backend,
                    improvements to an existing product or additional development capacity, let us discuss your requirements.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1D63ED] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-[#1652CA]"
                >
                  Discuss Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
