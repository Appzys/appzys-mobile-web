import { Link, useParams } from 'react-router-dom'
import SeoHead from '../components/SeoHead'
import ProductWorkflow from '../components/ProductWorkflow'
import { FALLBACK_CASE_STUDIES } from '../data/appData'
import { PRODUCT_STORIES, METRICS_NOTE } from '../data/productStories'

export default function CaseStudyDetailPage() {
  const { slug } = useParams()
  const study = FALLBACK_CASE_STUDIES.find(app => app.slug === slug)
  if (!study) return <div className="section-shell section-space"><h1 className="text-3xl font-bold">Product story not found</h1><Link className="text-link" to="/case-studies">Explore all products</Link></div>
  const story = PRODUCT_STORIES[slug]
  return <div className="editorial-site">
    <SeoHead title={`${study.appName} — Product story | APPZYS`} description={study.summary} canonicalPath={`/case-studies/${slug}`} />
    <div className="section-shell">
      <header className="page-intro"><Link className="text-link" to="/case-studies">All product stories</Link><p className="section-label mt-8">In-house product / {study.appName}</p><h1>{story.headline}</h1><p>{study.summary}</p></header>
      <ProductWorkflow slug={slug} />
      <section className="service-detail-grid section-space"><div><p className="section-label">The problem</p><h2>A task that should be easier.</h2><p className="mt-6">{study.challenge}</p></div><div><p className="section-label">The solution</p><h2>{story.outcome}</h2><p className="mt-6">{study.solution}</p></div></section>
      <section className="service-detail"><p className="section-label">The user journey</p><h2>From source to something useful.</h2><ol className="workflow-step-list">{story.steps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>
      <section className="service-detail"><p className="section-label">Product evidence</p><div className="service-detail-grid"><div><h2>{study.installsLabel}</h2><p className="mt-5">{study.ratingLabel} · company-reported</p></div><div><p>{METRICS_NOTE}</p><p>Figures refer to individual products and stores. Current store values may differ.</p></div></div></section>
      <section className="service-detail"><p className="section-label">Behind the experience</p><h2>Engineering follows the workflow.</h2><div className="service-detail-grid"><div><p>{study.engineeringNote}</p><div className="mt-6 flex flex-wrap gap-2">{study.techStack.map(tech => <span key={tech} className="rounded-md bg-slate-100 px-3 py-2 text-sm">{tech}</span>)}</div></div><div><ul>{study.capabilities.map(item => <li key={item}>{item}</li>)}</ul></div></div></section>
      <section className="service-detail"><p className="section-label">Relevant to your product</p><h2>Building something with similar challenges?</h2><p className="mt-5 text-slate-600">{story.service} We can discuss which parts apply to your users, requirements and existing systems.</p><Link className="primary-button mt-7" to={`/contact?ref=${encodeURIComponent(study.appName)}`}>Discuss a similar project</Link><div className="filter-row mt-10">{FALLBACK_CASE_STUDIES.filter(app => app.slug !== slug).map(app => <Link className="secondary-button" key={app.slug} to={`/case-studies/${app.slug}`}>{app.appName}</Link>)}</div></section>
    </div>
  </div>
}
