import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    duration: 'Stage 01',
    desc: 'Understand requirements, existing systems and delivery expectations.',
    deliverable: 'Requirements analysis, existing systems review and scope baseline.',
    gate: 'Clear mutual understanding of project goals and constraints',
  },
  {
    num: '02',
    title: 'Plan',
    duration: 'Stage 02',
    desc: 'Agree on implementation scope, features and milestones.',
    deliverable: 'Feature roadmap, technical architecture and milestone plan.',
    gate: 'Agreed scope, delivery milestones and change handling',
  },
  {
    num: '03',
    title: 'Build',
    duration: 'Stage 03',
    desc: 'Develop agreed functionality with regular progress updates.',
    deliverable: 'End-to-end Flutter development with regular builds and progress updates.',
    gate: 'Regular progress reviews based on engagement needs',
  },
  {
    num: '04',
    title: 'Validate',
    duration: 'Stage 04',
    desc: 'Test functionality, review issues and prepare builds.',
    deliverable: 'Functional testing, issue resolution, regression checks and candidate builds.',
    gate: 'Functional validation and issue resolution before release',
  },
  {
    num: '05',
    title: 'Launch & Handover',
    duration: 'Stage 05',
    desc: 'Prepare Android/iOS release and complete agreed technical handover.',
    deliverable: 'Production store submission support and agreed technical handover.',
    gate: 'Release verification and agreed project handover',
  },
]

export default function DevelopmentProcess() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Sticky Column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Our Delivery Approach
              </span>
              <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl">
                A Clear Process From Requirements to Release
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-black sm:text-base">
                A structured five-stage delivery workflow designed to maintain transparency, code quality, and on-time release.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1D63ED] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1652CA]"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Vertical Dashed Timeline (01 to 06) */}
          <div className="lg:col-span-8">
            <div className="relative space-y-5 pl-12 before:absolute before:bottom-6 before:left-[17px] before:top-6 before:border-l-2 before:border-dashed before:border-slate-300">
              {STEPS.map((step) => (
                <div key={step.num} className="group relative flex items-start">
                  <span className="absolute -left-12 top-5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1D63ED] bg-white font-display text-xs font-extrabold text-[#1D63ED] transition duration-300 group-hover:bg-[#1D63ED] group-hover:text-white">
                    {step.num}
                  </span>

                  <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition duration-300 group-hover:-translate-y-1 group-hover:border-blue-400 group-hover:shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-black transition-colors group-hover:text-blue-600">
                        {step.title}
                      </h3>
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#1D63ED]">
                        {step.duration}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-black">{step.desc}</p>

                    <div className="mt-4 grid gap-3 border-t border-slate-100 pt-3.5 text-xs sm:grid-cols-2">
                      <div className="flex items-start gap-2 text-slate-700">
                        <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1D63ED]" />
                        <span>{step.deliverable}</span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1D63ED]" />
                        <span>{step.gate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
