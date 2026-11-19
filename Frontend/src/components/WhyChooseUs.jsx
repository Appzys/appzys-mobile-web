import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

const REASONS = [
  {
    number: '01',
    title: 'Direct Production Track Record',
    description:
      'We do not just build mobile apps for hire—we design, launch, and operate our own in-house applications with 620K+ downloads and a 4.6 average rating across Google Play and the Apple App Store.',
  },
  {
    number: '02',
    title: 'Single Flutter Codebase for iOS & Android',
    description:
      'Our team specializes exclusively in Flutter and Dart to engineer high-performance cross-platform mobile apps. You achieve native performance and 60fps responsiveness with unified business logic and zero duplication of engineering costs.',
  },
  {
    number: '03',
    title: 'Transparent Milestone-Driven Delivery',
    description:
      'We follow an agreed 5-stage engineering delivery workflow (Discover, Plan, Build, Validate, Launch & Handover) with bi-weekly testable build drops, direct Git commits, and zero agency overhead.',
  },
  {
    number: '04',
    title: 'Seamless Backend, Cloud & AI Integration',
    description:
      'We connect mobile apps directly with existing SaaS backends, Firebase infrastructure, custom REST APIs, and production AI/OCR models to deliver high-utility user workflows.',
  },
  {
    number: '05',
    title: 'Direct Access to Dedicated Engineers',
    description:
      'You collaborate directly with senior Flutter developers writing your features. Whether extending an in-house engineering team or delivering a complete MVP, our capacity scales to your requirements.',
  },
  {
    number: '06',
    title: 'Complete Code Ownership & Strict NDA',
    description:
      'Full intellectual property and 100% source code ownership belong to you from day one. We sign NDAs upfront and hand over clean, well-documented, test-validated code repositories.',
  },
]

export default function WhyChooseUs() {
  // Default to index 1 (item "02") just like the reference UI/UX mockup
  const [activeRow, setActiveRow] = useState(1)

  return (
    <section className="border-t border-slate-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1D63ED] border border-blue-100">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Why Choose APPZYS</span>
          </div>
          <h2 className="mt-4 font-display text-2xl font-black tracking-tight text-[#0A192F] sm:text-4xl lg:text-[40px] lg:leading-[1.15]">
            Why Do Businesses Choose Us for Mobile App Development Services?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            As a Chennai-based mobile engineering studio, we understand distinctive business models and build production-grade Flutter applications for Android and iOS. Backed by real app-store operations and direct developer collaboration, here is why founders, software agencies, and growing product teams partner with us.
          </p>
        </div>

        {/* Structured Horizontal List */}
        <div className="mt-12 divide-y divide-slate-100">
          {REASONS.map((item, idx) => {
            const isActive = activeRow === idx

            return (
              <div
                key={item.number}
                onMouseEnter={() => setActiveRow(idx)}
                onClick={() => setActiveRow(idx)}
                className={`group cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'rounded-2xl border border-blue-200/80 bg-[#F5F8FF] p-6 sm:p-7 shadow-xs my-2 -mx-2 sm:mx-0'
                    : 'border-b border-slate-200/70 py-6 sm:py-7 px-2 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-8">
                  {/* Column 1: Number */}
                  <div className="w-12 sm:w-16 shrink-0">
                    <span
                      className={`font-display text-2xl sm:text-3xl font-black transition-colors duration-200 ${
                        isActive
                          ? 'text-[#1D63ED]'
                          : 'text-slate-300 group-hover:text-blue-500'
                      }`}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Column 2: Title */}
                  <div className="md:w-72 lg:w-80 shrink-0">
                    <h3
                      className={`font-display text-base sm:text-lg font-extrabold transition-colors duration-200 ${
                        isActive
                          ? 'text-[#0A192F]'
                          : 'text-slate-800 group-hover:text-[#0A192F]'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Column 3: Description */}
                  <div className="flex-1">
                    <p
                      className={`text-xs sm:text-sm leading-relaxed transition-colors duration-200 ${
                        isActive ? 'text-slate-700 font-medium' : 'text-slate-500'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA snippet */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200/80 bg-[#FAFBFD] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h4 className="font-display text-base font-bold text-[#0A192F]">
              Have a mobile project or need Flutter capacity?
            </h4>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              We review technical requirements, suggest the right architecture, and provide honest sprint timelines.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1D63ED] px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#1652CA]"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
