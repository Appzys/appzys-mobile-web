import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react'

const QUESTIONS = [
  {
    id: 'platform',
    title: '1. What is your target mobile platform?',
    subtitle: 'Choose where your users will install and run the application.',
    options: [
      {
        id: 'cross-platform',
        label: 'Both iOS & Android',
        sub: 'Single unified codebase for fast launch & lower cost',
        icon: Smartphone,
      },
      {
        id: 'native-single',
        label: 'iOS or Android Only',
        sub: 'Platform-specific exclusive hardware APIs',
        icon: Layers,
      },
      {
        id: 'cross-web',
        label: 'iOS, Android & Web',
        sub: 'Multi-platform consumer or B2B ecosystem',
        icon: Cpu,
      },
    ],
  },
  {
    id: 'aiDemand',
    title: '2. What is your AI / Computer Vision requirement?',
    subtitle: 'Determines whether compute runs locally on-device or via cloud APIs.',
    options: [
      {
        id: 'on-device-vision',
        label: 'On-Device Real-Time Vision & OCR',
        sub: 'Sub-100ms camera frame processing, 100% offline & zero cloud token cost',
        icon: Sparkles,
      },
      {
        id: 'cloud-llm',
        label: 'Cloud AI / LLM & Speech API',
        sub: 'Server-side Gemini, OpenAI, or speech transcription models',
        icon: Zap,
      },
      {
        id: 'standard-app',
        label: 'Standard Production Mobile App',
        sub: 'Clean UI layouts, auth, payments, database & push notifications',
        icon: CheckCircle2,
      },
    ],
  },
  {
    id: 'budgetTimeline',
    title: '3. What is your launch timeline and budget priority?',
    subtitle: 'Helps balance engineering velocity against dual-codebase maintenance overhead.',
    options: [
      {
        id: 'rapid-mvp',
        label: 'Fast 4–8 Weeks MVP Launch',
        sub: 'Ship to TestFlight & Google Play with fixed timeline & maximum ROI',
        icon: Zap,
      },
      {
        id: 'enterprise-scale',
        label: 'Long-Term Enterprise Scaling',
        sub: 'Custom native performance profiling & ongoing dedicated sprint pod',
        icon: ShieldCheck,
      },
    ],
  },
]

export default function StackDecisionHelper() {
  const [answers, setAnswers] = useState({
    platform: 'cross-platform',
    aiDemand: 'on-device-vision',
    budgetTimeline: 'rapid-mvp',
  })

  const handleSelect = (qId, optId) => {
    setAnswers((prev) => ({ ...prev, [qId]: optId }))
  }

  const reset = () => {
    setAnswers({
      platform: 'cross-platform',
      aiDemand: 'on-device-vision',
      budgetTimeline: 'rapid-mvp',
    })
  }

  // Determine recommendation based on user selections
  const getRecommendation = () => {
    if (answers.aiDemand === 'on-device-vision') {
      return {
        tag: 'APPZYS SIGNATURE ARCHITECTURE',
        title: 'AI-Hybrid Flutter (Dart + Native ML Kit / C++ Isolates)',
        matchPercent: '98% Optimal Match',
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        summary:
          'Single Flutter codebase for 60fps UI, coupled with background Dart isolates & native C++/ML Kit platform channels for millisecond offline computer vision. The exact architecture behind our Copy Text On Screen and AI Text Scanner (600K+ combined downloads).',
        benefits: [
          '40% - 50% cost savings compared to maintaining separate Swift & Kotlin teams',
          'Zero cloud latency: instant frame extraction under 90ms on-device',
          'Zero ongoing cloud AI server costs or user token bills',
          '100% offline private: zero user photos uploaded over external networks',
        ],
        typicalTimeline: '6 - 9 Weeks to Store Approval',
        serviceParam: '02. AI Integration & Applications',
      }
    }

    if (answers.platform === 'native-single' && answers.budgetTimeline === 'enterprise-scale') {
      return {
        tag: 'PLATFORM-EXCLUSIVE NATIVE',
        title: 'Pure Native (Swift iOS / Kotlin Android)',
        matchPercent: '92% Match for Exclusive Hardware',
        badgeColor: 'bg-blue-50 text-[#1D63ED] border-blue-200',
        summary:
          'Best when targeting exclusive OS-level capabilities like Apple Vision Pro spatial kits, Android system services, or platform-only hardware sensors.',
        benefits: [
          'Direct access to newest first-party OS APIs without bridge layer',
          'Targeted for single-platform enterprise contracts',
          'Complete native compilation and custom background services',
        ],
        typicalTimeline: '10 - 14 Weeks per Platform',
        serviceParam: '01. Mobile App Development (Flutter)',
      }
    }

    return {
      tag: 'CROSS-PLATFORM GOLD STANDARD',
      title: 'Production Flutter & Dart + Firebase / Cloud APIs',
      matchPercent: '96% Optimal Match',
      badgeColor: 'bg-blue-50 text-[#1D63ED] border-blue-200',
      summary:
        'Clean single-codebase Flutter application with Provider state management, REST API / Firebase backend, and secure cloud AI integration proxies.',
      benefits: [
        'One shared codebase running natively on both Android ARM64 and iOS devices',
        'Weekly TestFlight and Google Play Internal testing drops',
        'Zero bridge lag with Flutter native Skia / Impeller GPU rendering',
        'Easy post-launch maintenance without duplicating bug fixes',
      ],
      typicalTimeline: '5 - 8 Weeks to Store Approval',
      serviceParam: '01. Mobile App Development (Flutter)',
    }
  }

  const rec = getRecommendation()

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1D63ED]">
            <Sparkles className="h-3.5 w-3.5" />
            Decision Helper Widget
          </span>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-[#0A192F] sm:text-3xl">
            Which Stack Fits Your Mobile Product?
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Interactive selector for non-technical founders: Native vs. Flutter vs. AI-Hybrid.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Selections</span>
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        {/* LEFT COLUMN: 3 Interactive Questions (7 Cols) */}
        <div className="space-y-8 lg:col-span-7">
          {QUESTIONS.map((q) => (
            <div key={q.id}>
              <div className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
                {q.title}
              </div>
              <div className="text-xs text-slate-500">{q.subtitle}</div>

              <div className="mt-3 grid gap-2.5">
                {q.options.map((opt) => {
                  const Icon = opt.icon
                  const isSelected = answers[q.id] === opt.id

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? 'border-[#1D63ED] bg-blue-50/60 shadow-xs ring-2 ring-blue-500/15'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition ${
                          isSelected
                            ? 'bg-[#1D63ED] text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-xs sm:text-sm font-bold ${
                            isSelected ? 'text-[#1D63ED]' : 'text-slate-900'
                          }`}
                        >
                          {opt.label}
                        </div>
                        <div className="mt-0.5 text-[11px] text-slate-500">{opt.sub}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Real-Time Dynamic Recommendation Card (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-md sm:p-7">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#1D63ED]">
                {rec.tag}
              </span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                {rec.matchPercent}
              </span>
            </div>

            <h4 className="mt-4 font-display text-xl font-black text-[#0A192F] sm:text-2xl">
              {rec.title}
            </h4>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-700">
              {rec.summary}
            </p>

            {/* Key Architectural Benefits */}
            <div className="mt-5 border-t border-slate-200/80 pt-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Architectural Advantages
              </div>
              <ul className="mt-2.5 space-y-2 text-xs text-slate-800">
                {rec.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1D63ED]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Estimated Delivery Timeline */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-3.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Sprint Target Delivery
              </div>
              <div className="mt-0.5 font-display text-sm font-extrabold text-[#1D63ED]">
                {rec.typicalTimeline}
              </div>
              <div className="text-[11px] text-slate-500">
                Includes TestFlight drops &amp; App Store submission
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <Link
                to={`/contact?service=${encodeURIComponent(rec.serviceParam)}&model=${encodeURIComponent(
                  rec.title
                )}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D63ED] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1652CA]"
              >
                <span>Contact Us For This Stack</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
