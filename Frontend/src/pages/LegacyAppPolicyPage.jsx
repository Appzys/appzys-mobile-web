import { useLocation } from 'react-router-dom'
import SeoHead from '../components/SeoHead'
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const APP_NAMES = {
  textscanner: 'AI Text Scanner: Image To Text',
  copytext: 'Copy Text On Screen',
  handocr: 'Handwriting to Text Scanner OCR',
  aichat: 'AI Chat & Document Assistant',
}

export default function LegacyAppPolicyPage() {
  const { pathname } = useLocation()
  const isTerms = pathname.includes('termsofuse')
  
  // Extract app identifier from path, e.g. /ios/textscanner/privacypolicy
  let appKey = 'copytext'
  if (pathname.includes('textscanner')) appKey = 'textscanner'
  else if (pathname.includes('handocr')) appKey = 'handocr'
  else if (pathname.includes('aichat')) appKey = 'aichat'

  const appName = APP_NAMES[appKey] || 'Appzys Mobile Application'
  const title = isTerms
    ? `${appName} - Terms of Use | Appzys`
    : `${appName} - Privacy Policy | Appzys`

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <SeoHead
        title={title}
        description={`Official ${isTerms ? 'Terms of Use' : 'Privacy Policy'} for ${appName} published by Appzys Technologies Private Limited.`}
        canonicalPath={pathname}
      />

      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Appzys Home
        </Link>

        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            {isTerms ? <FileText className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
          </span>
          <div>
            <h1 className="font-display text-2xl font-black text-[#0A192F] sm:text-3xl">
              {isTerms ? 'Terms of Use' : 'Privacy Policy'}
            </h1>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {appName} &bull; Appzys Technologies Pvt. Ltd.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700 border-t border-slate-100 pt-6">
          <p>
            <strong>Last Updated:</strong> November 2026
          </p>

          <section>
            <h2 className="font-display text-base font-bold text-slate-900">1. Overview</h2>
            <p className="mt-2">
              Appzys Technologies Private Limited (&ldquo;Appzys&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates {appName} across the Apple App Store and Google Play. This policy outlines our strict commitments regarding user privacy, data security, and on-device processing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-slate-900">2. On-Device OCR &amp; Data Minimization</h2>
            <p className="mt-2">
              Our optical character recognition (OCR) and text scanning pipelines prioritize <strong>on-device local processing</strong> via ML Kit and CoreML. Images, scanned documents, and recognized text strings remain strictly on your local device memory and are not uploaded to, harvested by, or stored in any remote server without explicit user export actions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-slate-900">3. Camera &amp; Storage Permissions</h2>
            <p className="mt-2">
              The application requests access to your device camera and photo library exclusively for the purpose of capturing documents and selecting images for text extraction. We do not sell, rent, or transfer your photos or biometric identifiers to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-slate-900">4. Analytics &amp; Crash Reporting</h2>
            <p className="mt-2">
              We may utilize industry-standard, anonymized crash analytics (e.g. Firebase Crashlytics) to diagnose memory leaks, cold launch latencies, and device compatibility bugs. No personally identifiable information (PII) or document contents are transmitted in crash dumps.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-bold text-slate-900">5. Contact Us</h2>
            <p className="mt-2">
              For any questions, data deletion inquiries, or feedback regarding {appName}, please contact our engineering team directly at:
            </p>
            <div className="mt-3 rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs">
              <p className="font-bold text-slate-900">Appzys Technologies Private Limited</p>
              <p>Email: <a href="mailto:support@appzys.com" className="text-blue-600 underline">support@appzys.com</a></p>
              <p>Address: F4 Block 3, 1st Floor, Atana Arun Excello, Karanithangal, Kanchipuram, Tamil Nadu – 602105, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
