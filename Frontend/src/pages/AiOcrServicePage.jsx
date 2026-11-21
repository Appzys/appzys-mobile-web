import { Link } from 'react-router-dom'
import SeoHead from '../components/SeoHead'
import AiProductCatalog from '../components/AiProductCatalog'
import ProjectBrief from '../components/ProjectBrief'
import { AI_CAPABILITIES } from '../data/appData'

export default function AiOcrServicePage() {
  return <div className="editorial-site">
    <SeoHead title="AI & OCR mobile products and capabilities | APPZYS" description="Explore APPZYS products for text recognition, document processing and audio transcription, and the mobile engineering behind them." canonicalPath="/services/ai-ocr-app-development" />
    <div className="section-shell"><header className="page-intro"><p className="section-label">AI & OCR applications</p><h1>Less manual work.<br />More useful information.</h1><p>Make text editable, documents easier to understand, and recordings easier to revisit. See how we bring recognition and AI into practical mobile workflows.</p><div className="button-row"><a className="primary-button" href="#ai-products">Explore the products</a><Link className="secondary-button" to="/contact">Discuss an AI feature</Link></div></header>
    <AiProductCatalog />
    <section className="section-space"><p className="section-label">From product experience to your application</p><h2>AI features with a clear job to do.</h2><div className="service-detail-grid">{AI_CAPABILITIES.map(capability => <div key={capability.code} className="border-t border-slate-200 pt-6"><h3 className="!text-2xl">{capability.title}</h3><p className="mt-3 text-slate-600">{capability.useCases}</p><ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">{capability.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
    <section className="service-detail"><h2>Choose the processing approach around the task.</h2><div className="service-detail-grid"><div><h3 className="!text-2xl">On the device</h3><p className="mt-4">Useful when supported recognition can run locally and offline access or keeping source files on the device matters. Accuracy, language support and device performance need validation.</p></div><div><h3 className="!text-2xl">Through a backend</h3><p className="mt-4">Useful for hosted AI models and longer processing tasks. Plan for network interruptions, consent, file retention, protected credentials and usage costs.</p></div></div></section>
    <ProjectBrief /></div>
  </div>
}
