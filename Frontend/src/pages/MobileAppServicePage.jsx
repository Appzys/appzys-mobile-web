import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileCheck,
  GitBranch,
  HelpCircle,
  Layers,
  Lock,
  Mic,
  Plug,
  Rocket,
  RotateCcw,
  ScanText,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'
import TrustMarquee from '../components/TrustMarquee'
import {
  AI_CAPABILITIES,
  SERVICE_COMPARISON,
  SERVICES_LIST,
} from '../data/appData'

const UPGRADED_ENGAGEMENT_MODELS = [
  {
    name: 'Fixed-Price MVP Sprint',
    tierBadge: 'Most Popular for Startups',
    timeline: '4 - 6 Weeks Delivery',
    idealFor: 'Founders & seed-stage companies launching a new Android & iOS app with fixed scope, clear milestones, and guaranteed launch date.',
    serviceQuery: '01. Mobile App Development (Flutter)',
    points: [
      'Single Flutter & Dart shared codebase for iOS & Android',
      'Clean Provider state management & reactive architecture',
      'Firebase Auth, Cloud Firestore & Cloud Functions setup',
      'Third-party REST API or AI workflow integration',
      'Apple App Store & Google Play publishing support',
      'Free 30-day post-launch bug warranty & QA signoff',
    ],
  },
  {
    name: 'Dedicated Developer Pod',
    tierBadge: 'Agency Extension & Scale',
    timeline: 'Monthly Allocation (160h/mo)',
    idealFor: 'Software agencies, product companies, and CTOs needing dedicated senior Flutter engineering power without hiring overhead.',
    serviceQuery: '04. Dedicated Flutter Development / White-Label',
    points: [
      'Full-time senior Flutter engineer allocated exclusively to you',
      '100% white-label delivery under your brand & GitHub repo',
      'Direct Slack, Teams, Jira & daily sprint standup sync',
      'Seamless collaboration with your backend & design teams',
      'Strict mutual NDA & complete IP protection guarantee',
      'Flexible month-to-month commitment with 2-week notice',
    ],
  },
  {
    name: 'Enhancement & Maintenance Retainer',
    tierBadge: 'Continuous SLA Support',
    timeline: 'Agreed Monthly Hours',
    idealFor: 'Live apps requiring continuous performance monitoring, OS dependency upgrades (Android 15 / iOS 18), and bug fix sprints.',
    serviceQuery: '03. App Enhancement & Maintenance',
    points: [
      'Comprehensive initial Codebase Audit & performance check',
      'Prioritized bug fixes, regression testing & Crashlytics reviews',
      'Flutter SDK, third-party package & OS API upgrades',
      'Store compliance updates & quarterly feature enhancements',
      'Guaranteed SLA response times for critical store issues',
      'Roll-over unused maintenance hours (subject to agreement)',
    ],
  },
]

const SERVICE_TAGS = [
  ['Android & iOS', 'Provider State', 'Firebase & REST'],
  ['Audio / Speech AI', 'PDF & OCR', 'Cloud Functions Proxy'],
  ['Codebase Audit', 'Bug Fixes & SDK Upgrades', 'Monthly Retainer'],
  ['Team Extension', 'White-Label Agency', 'Monthly Allocation'],
]

const SIX_STEP_PROCESS = [
  {
    step: '01',
    title: '48-Hour Technical Audit & Architecture Plan',
    duration: '2 - 3 Days',
    summary:
      'We evaluate your product goal, existing Flutter code (if any), third-party API feasibility, and deliver a detailed milestone roadmap with fixed scope and timeline.',
    deliverable: 'Technical Architecture Doc & Feasibility Assessment',
    gate: 'Fixed Milestone Roadmap & Zero Scope Ambiguity',
  },
  {
    step: '02',
    title: 'Figma UI/UX & Clickable Mobile Prototype',
    duration: '1 - 2 Weeks',
    summary:
      'Designing mobile screens tailored for thumb-friendly navigation, accessible contrast, smooth touch ergonomics, and high-fidelity clickable Figma prototypes.',
    deliverable: 'Figma Mobile Design System & Clickable Prototype',
    gate: 'Asset & Iconography Specs with 100% UI Sign-Off',
  },
  {
    step: '03',
    title: 'Clean Flutter Sprints & Bi-Weekly Builds',
    duration: '3 - 6 Weeks',
    summary:
      'Sprint-by-sprint development using Flutter & Dart. We push regular TestFlight and Google Play Internal builds so you test real progress on your personal device every two weeks.',
    deliverable: 'Bi-Weekly TestFlight (iOS) & Play Internal Builds',
    gate: 'Clean Flutter Repository & Direct Slack / Jira Sync',
  },
  {
    step: '04',
    title: 'Multi-Device QA & Security Hardening',
    duration: '1 Week',
    summary:
      'Stress-testing the app across 50+ diverse Android and iOS screen sizes, tablets, offline network states, memory leak audits, and OWASP mobile security checks.',
    deliverable: 'Cross-Device QA Matrix & Crashlytics Setup',
    gate: 'API Key Security Check & Performance Crash Report',
  },
  {
    step: '05',
    title: 'App Store & Google Play Store Launch',
    duration: '3 - 5 Days',
    summary:
      'Guaranteed store submission support. We manage release certificates, compliance policies, store metadata, and provide our zero-rejection warranty until live.',
    deliverable: 'Production Store Release & Compliance Verification',
    gate: '100% Source Code Transfer & Signing Credentials',
  },
  {
    step: '06',
    title: '30-Day Bug Warranty & Retainer Sprints',
    duration: 'Ongoing Support',
    summary:
      'Post-launch 30-day bug warranty included free. Followed by optional monthly retainer hours for new feature sprints, OS upgrades (Android 15 / iOS 18), and Crashlytics tracking.',
    deliverable: '30-Day Free Warranty & SLA Response Support',
    gate: 'Monthly Dependency Upgrades & Feature Backlog Sprints',
  },
]

const RADIAL_TECH_NODES = [
  {
    id: 'flutter',
    title: 'Flutter',
    shortTitle: 'Flutter',
    version: 'Flutter 3.x (iOS & Android)',
    category: 'Frontend Core',
    tag: 'UI Framework',
    badge: 'Core Framework',
    icon: Smartphone,
    desc: 'Google’s UI toolkit compiling directly to native ARM64 machine code for 60-120 FPS jank-free mobile performance.',
    points: [
      'Single Cross-Platform Codebase',
      'Material 3 & Cupertino',
      'Zero Bridge Lag',
    ],
    pills: ['Flutter SDK', 'Single Codebase', 'Material 3 & Cupertino', 'Zero Bridge Lag'],
    x: 50,
    y: 10,
    angle: 270,
  },
  {
    id: 'dart',
    title: 'Dart',
    shortTitle: 'Dart',
    version: 'Dart 3 Type-Safe',
    category: 'Core Language',
    tag: 'Core Language',
    badge: 'Sound Null Safety',
    icon: Code2,
    desc: 'Client-optimized programming language with sound null safety, strong typing, and instant sub-second Hot Reload.',
    points: [
      'Strict Compile-Time Safety',
      'Fast AOT & JIT Compilation',
      'Predictable Memory Profile',
    ],
    pills: ['Dart 3', 'Sound Null Safety', 'Fast AOT & JIT', 'Predictable Memory'],
    x: 78.3,
    y: 21.7,
    angle: 315,
  },
  {
    id: 'firebase',
    title: 'Firebase',
    shortTitle: 'Firebase',
    version: 'Auth, Firestore, Cloud Functions',
    category: 'Backend & Cloud',
    tag: 'Cloud & Auth Backend',
    badge: 'Google Cloud Platform',
    icon: Database,
    desc: 'Low-latency realtime NoSQL data sync, multi-provider social authentication, and secure document cloud storage.',
    points: [
      'Offline Local Persistence',
      'Secure Cloud Storage',
      'Realtime Database Streams',
    ],
    pills: ['Firebase Auth', 'Firestore DB', 'Realtime Sync', 'Cloud Storage'],
    x: 90,
    y: 50,
    angle: 0,
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    shortTitle: 'Node.js',
    version: 'Express & Cloud Functions',
    category: 'Backend & Cloud',
    tag: 'Serverless APIs & Middleware',
    badge: 'Custom Middleware',
    icon: Server,
    desc: 'Serverless backend microservices and REST endpoints designed to mediate payments, webhooks, and secure API keys.',
    points: [
      'Serverless Cloud Functions',
      'Stripe / Razorpay Webhooks',
      'JWT Authentication',
    ],
    pills: ['Node.js APIs', 'Serverless Functions', 'Stripe / Webhooks', 'JWT Security'],
    x: 78.3,
    y: 78.3,
    angle: 45,
  },
  {
    id: 'gemini',
    title: 'Google Gemini AI',
    shortTitle: 'Gemini AI',
    version: 'Gemini 1.5 Flash & Pro APIs',
    category: 'Mobile AI & ML',
    tag: 'Multimodal Intelligence',
    badge: 'State-of-the-Art LLM',
    icon: Sparkles,
    desc: 'Multimodal image and document OCR parsing, contextual summarization, voice transcription, and mobile Q&A.',
    points: [
      'Document & Camera Parsing',
      'Prompt Guardrail Throttling',
      'Server-Side Token Shield',
    ],
    pills: ['Gemini 1.5 Pro', 'Multimodal Vision', 'Document Q&A', 'Token Safeguards'],
    x: 50,
    y: 90,
    angle: 90,
  },
  {
    id: 'fastlane',
    title: 'Fastlane',
    shortTitle: 'Fastlane',
    version: 'Automated Store Pipelines',
    category: 'DevOps & Store',
    tag: 'Release Automation',
    badge: 'Automated Delivery',
    icon: Rocket,
    desc: 'Automates iOS provisioning profiles, Android keystore signing, localized screenshot generation, and store uploads.',
    points: [
      '1-Click Store Deployment',
      'Automated Keystore Signing',
      'Zero Manual Release Errors',
    ],
    pills: ['Fastlane CI/CD', 'Automated Signing', '1-Click Store Deployment'],
    x: 21.7,
    y: 78.3,
    angle: 135,
  },
  {
    id: 'testflight',
    title: 'Apple TestFlight',
    shortTitle: 'TestFlight',
    version: 'Bi-Weekly Stakeholder Track',
    category: 'DevOps & Store',
    tag: 'iOS Beta Distribution',
    badge: 'Over-The-Air iOS Builds',
    icon: Layers,
    desc: 'Direct over-the-air iOS build delivery so clients and testers touch, test, and validate live features on iPhones.',
    points: [
      'Bi-Weekly Test Releases',
      'Crash Log Telemetry',
      'Stakeholder Feedback Loop',
    ],
    pills: ['TestFlight iOS', 'Bi-Weekly Builds', 'Live iPhone Testing', 'Crash Telemetry'],
    x: 10,
    y: 50,
    angle: 180,
  },
  {
    id: 'playconsole',
    title: 'Google Play Console',
    shortTitle: 'Play Console',
    version: 'Internal, Closed & Production',
    category: 'DevOps & Store',
    tag: 'Android Track Management',
    badge: 'Play Store Distribution',
    icon: Terminal,
    desc: 'Android App Bundle (.aab) distribution, phased staged rollouts, and store policy compliance management.',
    points: [
      'AAB Optimized Bundles',
      'Staged Production Rollouts',
      'ANR & Crash Tracking',
    ],
    pills: ['Play Console', 'AAB Bundles', 'Staged Rollouts', 'ANR & Crash Tracking'],
    x: 21.7,
    y: 21.7,
    angle: 225,
  },
]



const TRUST_GUARANTEES = [
  {
    title: 'Zero Store Rejection Policy',
    badge: '100% Launch Guarantee',
    highlight: 'Official Store Approval Warranty',
    desc: 'If Apple or Google flags any policy, guideline, or metadata revision during review, our engineering team modifies and resubmits the build at zero additional cost until approved.',
    icon: Award,
  },
  {
    title: '100% Client IP Ownership',
    badge: 'Full Legal Transfer',
    highlight: 'Complete Source Code Ownership',
    desc: 'You own 100% of the source code, design assets, and intellectual property. Signed mutual NDA before kick-off with complete Git repository transfer upon milestone release.',
    icon: Lock,
  },
  {
    title: 'Server-Side API Key Shielding',
    badge: 'Zero Exposed Secrets',
    highlight: 'OWASP Mobile Security',
    desc: 'Third-party AI tokens and secret keys are never hardcoded inside mobile client APK/IPA binaries. All traffic routes through secure serverless Cloud Functions proxies.',
    icon: ShieldCheck,
  },
  {
    title: 'Bi-Weekly TestFlight & Play Builds',
    badge: 'Touch Progress Early',
    highlight: 'Working Builds Every Sprint',
    desc: 'No waiting months in the dark. We deliver working builds directly to your phone via TestFlight & Google Play Internal testing at every two-week sprint milestone.',
    icon: Smartphone,
  },
]

const HIGH_INTENT_FAQS = [
  {
    q: 'How much does a production Flutter mobile app MVP cost and how long does it take?',
    a: 'A focused production-ready Flutter MVP typically takes 4 to 6 weeks to develop, with costs ranging between $5,000 and $15,000 depending on features, backend complexity, and AI API integrations. We provide a transparent, fixed-scope estimate within 48 hours of our initial technical audit so you have zero surprise fees.',
  },
  {
    q: 'Who owns the intellectual property (IP) and source code after launch?',
    a: 'You own 100% of the source code, design assets, and intellectual property from day one. We sign a strict mutual Non-Disclosure Agreement (NDA) before discovery, and the entire GitHub repository and signing credentials are fully transferred to your team upon milestone completion.',
  },
  {
    q: 'What happens if Apple App Store or Google Play Store rejects our app?',
    a: 'We provide our official Zero Store Rejection Policy. If Apple or Google requests any guideline adjustments, metadata updates, or permission clarification during review, our engineering team immediately makes the required adjustments and handles resubmission until your app is officially approved—at no additional cost.',
  },
  {
    q: 'Can you integrate our existing backend APIs and custom enterprise database?',
    a: 'Yes. Most of our client projects integrate directly with existing REST or GraphQL backends hosted on AWS, Google Cloud, Node.js, Python, or Java. We write typed Dart repository models with JWT token handling, retry interceptors, and local caching so your mobile app talks seamlessly to your infrastructure.',
  },
  {
    q: 'How do you prevent third-party AI APIs (OpenAI / Gemini) from racking up unexpected costs?',
    a: 'We implement three critical safeguards: (1) All AI API keys are isolated inside Firebase Cloud Functions serverless proxies (never in client app code), (2) We configure strict token quotas, rate limiting, and client-side prompt validation to prevent abuse, and (3) We use low-cost models or on-device ML Kit OCR wherever possible before calling LLM endpoints.',
  },
]

const SERVICE_ICONS = [Smartphone, Sparkles, Wrench, Users]

export default function MobileAppServicePage() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0)
  const [activeRadialIdx, setActiveRadialIdx] = useState(0)
  const [openFaqIdx, setOpenFaqIdx] = useState(0)
  const cardRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'))
            if (!Number.isNaN(idx)) {
              setActiveServiceIdx(idx)
            }
          }
        })
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.1 }
    )

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToService = (idx) => {
    setActiveServiceIdx(idx)
    const target = cardRefs.current[idx]
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div>
      {/* Hero: Case Studies Style Rounded 3xl Floating Banner */}
      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-blue-900/40 bg-[#0A192F] p-7 text-white shadow-xl sm:p-10">
            {/* Right-side 4-Services Isometric 3D Graphic */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[60%] lg:w-[50%]">
              <img
                src="/mobile-services-banner.png"
                alt="Appzys 4 Flutter & AI Mobile Services"
                className="h-full w-full object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/85 to-transparent sm:via-[#0A192F]/55 md:via-[#0A192F]/25" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-200">
                <Sparkles className="h-3.5 w-3.5 text-blue-300" />
                Flutter Mobile App Development &amp; AI Integration
              </span>
              <h1 className="mt-3.5 font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl">
                Focused Flutter Engineering, AI Integration &amp; Dedicated Capacity
              </h1>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                APPZYS builds cross-platform Android and iOS applications exclusively with Flutter and
                Dart&mdash;paired with Provider state management, Firebase, Cloud Functions, and
                real-world AI API workflows.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/contact?service=01.%20Mobile%20App%20Development%20(Flutter)"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D63ED] px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition hover:bg-[#1652CA]"
                >
                  Book Free 48-Hr Flutter Audit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/#estimator"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-400/50"
                >
                  <Calculator className="h-4 w-4" />
                  Estimate Project Cost
                </a>
              </div>

              {/* Compact 4-Metric Strip with Border Top */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-5 sm:grid-cols-4">
                <div>
                  <div className="font-display text-xl font-extrabold text-blue-300">Flutter</div>
                  <div className="text-xs text-slate-300">Shared Codebase</div>
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold text-blue-300">4 Services</div>
                  <div className="text-xs text-slate-300">MVP, AI, Retainer &amp; Team</div>
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold text-blue-300">Firebase</div>
                  <div className="text-xs text-slate-300">Auth, DB &amp; Functions</div>
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold text-blue-300">White-Label</div>
                  <div className="text-xs text-slate-300">Agency Extension Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrustMarquee />

      {/* 4 Core Services: OrangeMantra-Style Sticky Left Nav + Scroll-Synced Cards */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Our 4 Official Services
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-black sm:text-3xl">
              Clear Services Built Around Real Flutter Capabilities
            </h2>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            {/* Left Sticky Navigation */}
            <div className="lg:col-span-4">
              <div className="border-l-2 border-slate-200 lg:sticky lg:top-24">
                {SERVICES_LIST.map((item, idx) => {
                  const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length]
                  const isActive = activeServiceIdx === idx
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToService(idx)}
                      className={`-ml-[2px] flex w-full items-center gap-3.5 border-l-2 px-4 py-3.5 text-left transition ${
                        isActive
                          ? 'border-[#1D63ED] bg-blue-50/50'
                          : 'border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                          isActive
                            ? 'bg-blue-100 text-[#1D63ED] ring-1 ring-blue-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span
                        className={`font-display text-sm transition ${
                          isActive ? 'font-bold text-black' : 'font-medium text-slate-600'
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right Scrollable Cards */}
            <div className="space-y-6 lg:col-span-8">
              {SERVICES_LIST.map((item, idx) => {
                const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length]
                const isActive = activeServiceIdx === idx
                const tags = SERVICE_TAGS[idx] || []
                return (
                  <div
                    key={item.title}
                    id={`service-card-${idx}`}
                    data-idx={idx}
                    ref={(el) => {
                      cardRefs.current[idx] = el
                    }}
                    className={`group relative overflow-hidden rounded-3xl border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg sm:p-9 ${
                      isActive
                        ? 'border-blue-300 shadow-lg shadow-blue-950/5'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#1D63ED] opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1D63ED] transition group-hover:bg-[#1D63ED] group-hover:text-white">
                        <Icon className="h-6 w-6 transition-transform duration-500 ease-out group-hover:rotate-[360deg]" />
                      </span>
                      <span className="select-none font-display text-5xl font-extrabold leading-none text-slate-100">
                        {item.id}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-extrabold text-black transition-colors group-hover:text-blue-600 sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-black sm:text-base">
                      {item.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1 text-xs font-semibold text-[#1D63ED]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-xs text-black sm:text-sm">
                      {item.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1D63ED]" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/contact?service=${encodeURIComponent(item.title)}`}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#1D63ED] hover:text-[#1652CA]"
                    >
                      Inquire About Service {item.id} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-Side Service Comparison Table */}
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Service Comparison
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-black sm:text-3xl">
              Which APPZYS Service Fits Your Situation?
            </h2>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-gradient-to-r from-[#0A192F] via-[#0F2557] to-[#1D4ED8] text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Dimension</th>
                  <th className="px-5 py-4 font-semibold">01. Mobile App Dev</th>
                  <th className="px-5 py-4 font-semibold">02. AI Integration</th>
                  <th className="px-5 py-4 font-semibold">03. Enhancement</th>
                  <th className="px-5 py-4 font-semibold">04. Dedicated Flutter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {SERVICE_COMPARISON.map((row) => (
                  <tr key={row.dimension} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-bold text-black">{row.dimension}</td>
                    <td className="px-5 py-4 text-black">{row.s1}</td>
                    <td className="px-5 py-4 text-black">{row.s2}</td>
                    <td className="px-5 py-4 text-black">{row.s3}</td>
                    <td className="px-5 py-4 text-black">{row.s4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6 AI Capabilities */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Service 02 Deep Dive
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-black sm:text-3xl">
              6 AI Capabilities We Integrate Into Flutter Apps
            </h2>
            <p className="mt-2 text-sm text-black">
              Built with prompt validation, token/cost safeguards, and Firebase Cloud Functions API-key protection.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AI_CAPABILITIES.map((cap) => (
              <div
                key={cap.code}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-lg"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#1D63ED] opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 shadow-xs ring-1 ring-slate-200/80 transition group-hover:bg-[#1D63ED] group-hover:text-white">
                    <Cpu className="h-4 w-4 transition-transform duration-500 ease-out group-hover:rotate-[360deg]" />
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 ring-1 ring-slate-200">
                    Capability {cap.code}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-black transition-colors group-hover:text-blue-600">
                  {cap.title}
                </h3>
                <ul className="mt-3 space-y-1.5 text-xs text-black">
                  {cap.items.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-slate-200 pt-3 text-[11px] font-medium text-slate-700">
                  Use cases: {cap.useCases}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. 6-Step Engineering Process: Compact Layout matching Home Page Dimensions */}
      <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Left Sticky Column */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Engineering Roadmap &amp; Delivery
                </span>
                <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-black sm:text-4xl">
                  Our Mobile Application 6-Step Engineering Process
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  From initial technical feasibility and clickable Figma wireframes to bi-weekly TestFlight drops and zero-rejection store deployment, here is our structured delivery roadmap.
                </p>
                <div className="mt-6">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1D63ED] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1652CA]"
                  >
                    Talk To Our Flutter Experts
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Vertical Dashed Timeline (01 to 06) - Exact Home Page Dimensions */}
            <div className="lg:col-span-8">
              <div className="relative space-y-5 pl-12 before:absolute before:bottom-6 before:left-[17px] before:top-6 before:border-l-2 before:border-dashed before:border-slate-300">
                {SIX_STEP_PROCESS.map((step) => (
                  <div key={step.step} className="group relative flex items-start">
                    <span className="absolute -left-12 top-5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1D63ED] bg-white font-display text-xs font-extrabold text-[#1D63ED] transition duration-300 group-hover:bg-[#1D63ED] group-hover:text-white">
                      {step.step}
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

                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.summary}</p>

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

      {/* 2. Interactive Tech Stack Badges: Image 1 Radial Dial Hub-and-Spoke */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Production-Grade Tooling
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-[#0A192F] sm:text-4xl">
              Interactive Tech Stack Badges
            </h2>
            <p className="mt-2.5 text-sm text-slate-600 sm:text-base">
              Flutter, Dart, Firebase, Node, Gemini AI, Fastlane, TestFlight logos/cards. Field-tested technologies we engineer and scale with.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            
            {/* Left: Interactive Radial Dial matching Image 1 */}
            <div className="lg:col-span-6 flex flex-col items-center">
              
              {/* Radial Dial Wheel */}
              <div className="relative h-[360px] w-[360px] sm:h-[430px] sm:w-[430px] flex items-center justify-center select-none">
                
                {/* SVG Spoke Connector Lines */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 430 430">
                  {/* Outer & Inner Reference Guide Rings */}
                  <circle cx="215" cy="215" r="150" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="215" cy="215" r="90" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  
                  {/* Spoke lines radiating to each node */}
                  {RADIAL_TECH_NODES.map((node, idx) => {
                    const isActive = activeRadialIdx === idx
                    const rad = (node.angle * Math.PI) / 180
                    const nx = 215 + 150 * Math.cos(rad)
                    const ny = 215 + 150 * Math.sin(rad)
                    return (
                      <line
                        key={node.id}
                        x1="215"
                        y1="215"
                        x2={nx}
                        y2={ny}
                        stroke={isActive ? '#2563EB' : '#E2E8F0'}
                        strokeWidth={isActive ? '2.5' : '1'}
                        className="transition-all duration-300"
                      />
                    )
                  })}
                </svg>

                {/* Center Hub: APPZYS Flutter */}
                <div className="relative z-10 flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white shadow-xl shadow-blue-500/25 ring-8 ring-blue-50">
                  <span className="font-display text-xs sm:text-sm font-black tracking-wider uppercase">
                    APPZYS
                  </span>
                  <span className="text-[11px] font-bold text-blue-100">
                    Flutter
                  </span>
                </div>

                {/* 8 Radiating Interactive Spoke Nodes */}
                {RADIAL_TECH_NODES.map((node, idx) => {
                  const isActive = activeRadialIdx === idx
                  const Icon = node.icon
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveRadialIdx(idx)}
                      onMouseEnter={() => setActiveRadialIdx(idx)}
                      className="absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group transition-transform duration-200 focus:outline-none"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      <div
                        className={`flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-2xl border transition-all duration-200 ${
                          isActive
                            ? 'border-blue-500 bg-white text-[#1D63ED] shadow-lg ring-4 ring-blue-100 scale-110'
                            : 'border-slate-200 bg-white text-slate-600 shadow-2xs group-hover:border-blue-300 group-hover:text-blue-600'
                        }`}
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
                      </div>
                      <span
                        className={`mt-1 text-[10px] sm:text-[11px] font-bold whitespace-nowrap px-2 py-0.5 rounded-full transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 shadow-2xs'
                            : 'text-slate-600 group-hover:text-slate-900'
                        }`}
                      >
                        {node.shortTitle}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Mobile quick-selector row (< md) */}
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:hidden">
                {RADIAL_TECH_NODES.map((node, idx) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveRadialIdx(idx)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      activeRadialIdx === idx
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {node.shortTitle}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active Technology Details Card matching Home Page TechStackTabs */}
            <div className="lg:col-span-6">
              {(() => {
                const active = RADIAL_TECH_NODES[activeRadialIdx]
                const ActiveIcon = active.icon
                return (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-7 shadow-xs transition-all duration-300 sm:p-9">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#1D63ED] shadow-xs ring-1 ring-slate-200/80">
                        <ActiveIcon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1D63ED]">
                        {active.category}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-extrabold text-black">
                      {active.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-black sm:text-base">
                      {active.desc}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-slate-200/80 pt-5 text-xs text-black sm:text-sm">
                      {active.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1D63ED]" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {active.pills.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold text-[#1D63ED]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </div>

          </div>
        </div>
      </section>

      {/* 3. 3 Flexible Engagement Models: Fixed Scope MVP vs Dedicated Developer vs Monthly Retainer cards */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Commercial &amp; Partnership Models
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-black sm:text-4xl">
              3 Flexible Engagement Models
            </h2>
            <p className="mt-2.5 text-sm text-slate-700 sm:text-base">
              Fixed Scope MVP vs Dedicated Developer vs Monthly Retainer cards. Select the partnership model tailored for your launch timeline and engineering needs.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {UPGRADED_ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg sm:p-7"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#1D63ED] opacity-0 transition-opacity group-hover:opacity-100" />
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1D63ED]">
                      {model.tierBadge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      {model.timeline}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-black transition-colors group-hover:text-blue-600">
                    {model.name}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                    {model.idealFor}
                  </p>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Included in Model:
                    </div>
                    <ul className="space-y-2.5 text-xs text-black">
                      {model.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/contact?model=${encodeURIComponent(model.name)}&service=${encodeURIComponent(model.serviceQuery)}`}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D63ED] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1652CA] shadow-sm shadow-blue-500/20"
                >
                  Select {model.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. App Store Compliance & 100% Client IP Guarantee (Cleaned Punchy Heading) */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Trust &amp; Legal Protection
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-black sm:text-4xl">
              App Store Compliance &amp; 100% Client IP Guarantee
            </h2>
            <p className="mt-2.5 text-sm text-slate-700 sm:text-base">
              We stand behind our code with strict security safeguards, mutual NDA protection, and an official store approval warranty.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_GUARANTEES.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-md"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#1D63ED] opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-xs ring-1 ring-slate-200 transition group-hover:bg-[#1D63ED] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-4 block text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {item.badge}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-black transition-colors group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <div className="mt-1 text-xs font-semibold text-slate-800">
                    {item.highlight}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Interactive FAQ Section */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Got Questions?
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-black sm:text-4xl">
              Interactive FAQ Section
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clients keta munnadiye answer panra maari 5 key questions regarding cost, timelines, IP ownership, and store launch.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {HIGH_INTENT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition hover:border-blue-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="group flex w-full items-center justify-between p-5 text-left transition sm:p-6"
                  >
                    <span className="font-display text-sm font-bold text-black sm:text-base pr-4 transition-colors group-hover:text-[#1D63ED]">
                      {faq.q}
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isOpen
                          ? 'bg-[#1D63ED] text-white'
                          : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-5 text-xs leading-relaxed text-slate-700 sm:p-6 sm:text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Quick FAQ Contact Banner */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-2xs">
            <p className="text-xs text-slate-600 sm:text-sm">
              Have a custom project requirement or proprietary tech stack question?
            </p>
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#1D63ED] hover:underline sm:text-sm"
            >
              Ask Our Flutter Engineering Team Directly <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 4. Bottom Conversion CTA Banner - Expanded to max-w-7xl Full Container Width matching Image 4 */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#0A192F] via-[#0F2557] to-[#1D4ED8] p-8 text-white sm:p-12 lg:flex-row lg:items-center shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-200">
                <ShieldCheck className="h-4 w-4" />
                NDA + Technical Feasibility Assessment
              </div>
              <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-4xl">
                Ready to Build, AI-Enable, or Scale Your Flutter App?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-base">
                Share your product goal, existing Flutter codebase, or agency capacity need. We&apos;ll deliver a scoped architecture plan and effort estimate within 48 hours.
              </p>
            </div>
            <Link
              to="/contact?service=01.%20Mobile%20App%20Development%20(Flutter)"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#0A192F] transition hover:bg-blue-50 shadow-lg"
            >
              Request Free 48-Hr Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
