import { useState } from 'react'
import SeoHead from '../components/SeoHead'
import ProductShowcase from '../components/ProductShowcase'
import { FALLBACK_CASE_STUDIES, EMERGING_PRODUCTS } from '../data/appData'

export default function CaseStudiesPage() {
  const [category, setCategory] = useState('All products')
  const categories = ['All products', ...new Set(FALLBACK_CASE_STUDIES.map(app => app.category))]
  const studies = FALLBACK_CASE_STUDIES.filter(app => category === 'All products' || app.category === category)
  return <div className="editorial-site">
    <SeoHead title="In-house mobile product case studies | APPZYS" description="Explore the problems, workflows and engineering behind APPZYS mobile products for OCR, document processing and audio transcription." canonicalPath="/case-studies" />
    <div className="section-shell">
      <header className="page-intro"><p className="section-label">The APPZYS product portfolio</p><h1>Built by us.<br />Made to be useful.</h1><p>Text that cannot be copied. Documents that need retyping. Recordings that take too long to revisit. Our in-house mobile products start with everyday problems like these.</p><p>These applications are our own products, not commissioned client work. Explore the user experience first, then the engineering behind it.</p></header>
      <div className="filter-row" aria-label="Filter products">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <p className="evidence-note" aria-live="polite">Showing {studies.length} {studies.length === 1 ? 'product' : 'products'}</p>
      <ProductShowcase studies={studies} />
      <section className="section-space"><p className="section-label">Also in development</p><h2>Exploring what comes next.</h2><div className="service-detail-grid">{EMERGING_PRODUCTS.map(product => <div key={product.name}><h3>{product.name}</h3><p>{product.summary}</p><p className="evidence-note">In active development</p></div>)}</div></section>
    </div>
  </div>
}
