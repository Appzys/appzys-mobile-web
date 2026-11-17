import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Camera,
  CheckCircle2,
  Clock,
  Cpu,
  Eye,
  FileText,
  Languages,
  Layers,
  Lock,
  Phone,
  ScanText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react'
import StackDecisionHelper from '../components/StackDecisionHelper'
import CaseStudyMiniPreview from '../components/CaseStudyMiniPreview'

const OCR_CAPABILITIES = [
  {
    icon: ScanText,
    title: 'On-Device Document & Receipt OCR',
    desc: 'High-speed text extraction from physical paper, invoices, and documents with auto-edge detection, perspective correction, and local caching.',
    latency: '< 90ms Frame Rate',
    proof: 'Engineered in AI Text Scanner (100K+ Play)',
  },
  {
    icon: Camera,
    title: 'Floating Screenshot Overlay Capture',
    desc: 'Extracts non-selectable text from screen overlays, social media feeds, and restricted apps without user data leaving the mobile device.',
    latency: 'Sub-140ms Isolate',
    proof: 'Engineered in Copy Text On Screen (500K+ Play)',
  },
  {
    icon: FileText,
    title: 'Cursive & Digital Ink Handwriting Recognition',
    desc: 'Adaptive stroke-detection models that transform messy lecture notes and forms into editable digital text organized into searchable folder vaults.',
    latency: '180ms Stroke Engine',
    proof: 'Engineered in Handwriting Scanner (10K+ Play)',
  },
  {
    icon: Bot,
    title: 'On-Device Document Q&A & AI Summaries',
    desc: 'Combines fast OCR with local vector parsing and secure Cloud Functions mediation to deliver instant executive summaries without API token wastage.',
    latency: 'Streaming Response',
    proof: 'Engineered in AI Transcript & Scanner Apps',
  },
]

const COMPARISON_MATRIX = [
  {
    feature: 'Cloud Latency Per Scan',
    cloudApi: '2.5s - 4.5s (Network Dependent)',
    appzysOnDevice: 'Sub-100ms Instant On-Device',
    whyBetter: '25x Faster, works without internet',
  },
  {
    feature: 'Monthly Cloud API Costs',
    cloudApi: '$1.50 per 1,000 scans (Escalates with users)',
    appzysOnDevice: '$0.00 (Zero Token/API Bills)',
    whyBetter: 'Predictable fixed costs, unlimited scans',
  },
  {
    feature: 'User Data & Privacy Compliance',
    cloudApi: 'Photos uploaded to third-party servers',
    appzysOnDevice: '100% Local On-Device (Zero Upload)',
    whyBetter: 'Automatic GDPR, HIPAA & Store Privacy pass',
  },
  {
    feature: 'UI Responsiveness',
    cloudApi: 'UI freezes during synchronous upload',
    appzysOnDevice: '60 FPS Smooth (Dart Background Isolates)',
    whyBetter: 'Zero camera stutter on budget devices',
  },
]

export default function AiOcrServicePage() {
  const [activeDemoTab, setActiveDemoTab] = useState('ocr')

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* 1. HERO SECTION: Full-Bleed High-Tech Navy Card */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0A192F] p-8 text-white shadow-2xl sm:p-12 lg:p-14">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-200">
              <BrainCircuit className="h-4 w-4 text-blue-300" />
              Appzys Signature Engineering Niche
            </div>

            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.25rem] leading-[1.15]">
              On-Device AI, Computer Vision &amp;{' '}
              <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-emerald-300 bg-clip-text text-transparent">
                Multilingual OCR
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-300">
              Sub-100ms offline recognition pipelines engineered with Flutter, Dart background
              isolates, and Google ML Kit. Zero cloud API token bills, 100% user data privacy, and
              zero store review rejections.
            </p>

            {/* Metrics Strip */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-4">
              <div>
                <div className="font-display text-2xl font-black text-blue-300">600K+</div>
                <div className="text-xs text-slate-300">In-House OCR Installs</div>
              </div>
              <div>
                <div className="font-display text-2xl font-black text-emerald-300">&lt; 90ms</div>
                <div className="text-xs text-slate-300">Camera Frame Latency</div>
              </div>
              <div>
                <div className="font-display text-2xl font-black text-blue-300">100%</div>
                <div className="text-xs text-slate-300">Offline &amp; Private</div>
              </div>
              <div>
                <div className="font-display text-2xl font-black text-emerald-300">0%</div>
                <div className="text-xs text-slate-300">Store Rejections</div>
              </div>
            </div>

            {/* Hero Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact?service=02.+AI+Integration+%26+Applications"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D63ED] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-[#1652CA]"
              >
                <span>Request Free 48-Hr Architecture Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#helper"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                <span>Which Stack Fits My App?</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. LIVE ON-DEVICE PIPELINE INSPECTION */}
        <div>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D63ED]">
              Proven Production Architecture
            </span>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-[#0A192F] sm:text-4xl">
              How Our On-Device Mobile AI Pipeline Operates
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Unlike web-first agencies that rely on slow third-party cloud APIs, Appzys isolates heavy
              computer vision compute inside dedicated background threads on the user&apos;s phone.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {OCR_CAPABILITIES.map((cap) => {
              const Icon = cap.icon
              return (
                <div
                  key={cap.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-blue-300 transition duration-200"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1D63ED] border border-blue-100">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-[#0A192F]">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{cap.desc}</p>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-3.5">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-emerald-700">{cap.latency}</span>
                      <span className="text-slate-400">{cap.proof}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 3. CLOUD VS ON-DEVICE BENCHMARK COMPARISON TABLE (DEACTIVATED)
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-9">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D63ED]">
              Commercial &amp; Latency Comparison
            </span>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-[#0A192F] sm:text-3xl">
              Cloud AI vs. Appzys On-Device Architecture
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Why startups and scaleups save thousands of dollars per month by choosing local on-device machine learning over cloud-only APIs.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 font-bold text-slate-700">
                  <th className="py-3 px-4">Performance Vector</th>
                  <th className="py-3 px-4">Standard Cloud Vision API</th>
                  <th className="py-3 px-4 text-[#1D63ED]">Appzys On-Device Engine</th>
                  <th className="py-3 px-4 text-emerald-800">Founder Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_MATRIX.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-4 font-bold text-[#0A192F]">{row.feature}</td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{row.cloudApi}</td>
                    <td className="py-4 px-4 font-bold text-[#1D63ED] bg-blue-50/30">
                      {row.appzysOnDevice}
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-700">{row.whyBetter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        */}

        {/* 4. DAY 8 HERO FEATURE: "Which Stack Fits Your Mobile Product?" Decision Helper */}
        <div id="helper">
          <StackDecisionHelper />
        </div>

        {/* 5. PRIVACY, COMPLIANCE & STORE APPROVAL GUARANTEE */}
        <div className="rounded-3xl bg-[#0A192F] p-8 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" />
                Apple &amp; Google Store Privacy Exemption
              </div>
              <h3 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
                100% Privacy Compliant: Photos &amp; Documents Never Leave the Phone
              </h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                Both Apple App Store and Google Play require strict user consent and data safety
                declarations when apps upload photos to external clouds. Because Appzys architectures
                run Google ML Kit and OCR completely on-device, your app qualifies for the highest privacy
                rating and bypasses rigorous external data audits.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-blue-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Zero Third-Party Cloud Transmission
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  HIPAA &amp; GDPR Compliant by Default
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  No Background Network Leaks
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                In-House Case Study Proof
              </div>
              <div className="mt-3">
                <CaseStudyMiniPreview slug="copy-text-on-screen" />
              </div>
              <div className="mt-3 text-right">
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1D63ED] hover:underline"
                >
                  View Case Study Breakdown <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 6. BOTTOM PITCH CONVERSION BANNER */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#0A192F] via-[#0F2557] to-[#1D4ED8] p-8 text-white sm:flex-row sm:items-center sm:p-10 shadow-xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-300">
              <Sparkles className="h-4 w-4" />
              Direct Senior Engineering Team &bull; Tamil Nadu, India
            </div>
            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
              Have an AI, OCR, or Document Processing App Idea?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Receive a custom mobile architecture blueprint, model feasibility assessment, and fixed sprint estimate in 48 hours.
            </p>
          </div>
          <Link
            to="/contact?service=02.+AI+Integration+%26+Applications"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1D63ED] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-[#1652CA]"
          >
            Request Free 48-Hr Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}
