import { Link, useParams } from 'react-router-dom'
import { Check, Layers, ScanText, ShieldCheck } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import CaseStudySurfaces from '../components/CaseStudySurfaces'
import ProductStoreLinks from '../components/ProductStoreLinks'
import { CaseStudyArchitecture, CaseStudyStack, CaseStudyOutcomes } from '../components/CaseStudyEngineering'
import { FALLBACK_CASE_STUDIES } from '../data/appData'
import { PRODUCT_STORIES } from '../data/productStories'
import { PRODUCT_LISTINGS } from '../data/productListings'
import { CASE_STUDY_DETAILS, CASE_STUDY_SECTIONS, STORE_CHECK_DATE } from '../data/caseStudyDetails'
import screenshots from '../data/productScreenshots.json'

function SectionHeading({ label, title }) {
  return <header className="case-section-heading"><p className="section-label">{label}</p><h2>{title}</h2></header>
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams()
  const study = FALLBACK_CASE_STUDIES.find(app => app.slug === slug)
  const details = CASE_STUDY_DETAILS[slug]
  const story = PRODUCT_STORIES[slug]
  if (!study || !details || !story) return <div className="section-shell section-space"><h1 className="text-3xl font-bold">Product story not found</h1><Link className="text-link" to="/case-studies">Explore all products</Link></div>
  const screens = screenshots[slug] || []
  const listing = PRODUCT_LISTINGS[slug]
  const related = details.related.map(key => FALLBACK_CASE_STUDIES.find(app => app.slug === key)).filter(Boolean)

  return <div className={`editorial-site case-study case-tone-${story.color}`} data-product={slug}>
    <SeoHead title={`${study.appName} — Case study | APPZYS`} description={study.summary} canonicalPath={`/case-studies/${slug}`} />
    <div className="section-shell">
      <header className="case-hero">
        <div className="case-hero-copy"><Link className="text-link" to="/case-studies">All case studies</Link>
          <div className="case-brand"><img src={`/product-icons/${slug}.png`} alt="" width="56" height="56" /><div><p className="section-label">APPZYS / In-house product</p><strong>{study.appName}</strong></div></div>
          <h1>{story.headline}</h1><p className="case-lead">{details.value}</p>
          <div className="case-hero-tags"><span>{study.category}</span><span>Live on Google Play</span></div>
          <ProductStoreLinks slug={slug} name={study.appName} />
        </div>
        <div className="case-hero-art"><div className="case-art-label"><ScanText size={18} /><span>From the product</span></div><CaseStudySurfaces slug={slug} name={study.appName} surfaces={details.surfaces.slice(0, 2)} screens={screens} hero /><p>Product previews · Screen content from the store artwork</p></div>
      </header>

      <section id="project-facts" className="case-facts" aria-labelledby="case-facts-title"><h2 id="case-facts-title">Project facts</h2><dl>{[['Product owner', 'APPZYS'], ['Engagement', 'In-house product'], ['Platforms', listing.apple ? 'Android & iOS' : 'Android'], ['Product focus', study.category]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
      <div className="case-layout">
        <aside className="case-sidebar"><nav aria-label="Case study sections"><p>Inside this case study</p>{CASE_STUDY_SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></aside>
        <div className="case-content">
          <section id="project-summary" className="case-section"><SectionHeading label="Project summary" title="One focused product. A useful everyday workflow." /><p className="case-large-copy">{study.summary}</p><div className="case-value"><Layers size={24} /><p>{details.value}</p></div></section>
          <section id="client-context" className="case-section"><SectionHeading label="Client context" title="Our product. Our ongoing responsibility." /><p>{details.context}</p><div className="case-context"><span>Built for</span><strong>{details.audience}</strong></div></section>
          <section id="the-problem" className="case-section"><SectionHeading label="The problem" title={study.tagline} /><p>{study.challenge}</p></section>
          <section id="solution" className="case-section"><SectionHeading label="Solution" title={story.outcome} /><p>{study.solution}</p><ol className="case-journey">{story.steps.map(step => <li key={step.title}><span className="case-journey-dot" aria-hidden="true" /><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>
          <section id="product-surfaces" className="case-section"><SectionHeading label="Product surfaces" title="See how the experience comes together." /><CaseStudySurfaces slug={slug} name={study.appName} surfaces={details.surfaces} screens={screens} /><p className="case-note">Store artwork illustrates the product; captions describe workflow areas. Tap a screen to enlarge.</p></section>
          <section id="architecture" className="case-section"><SectionHeading label="Architecture" title="Feature-based MVVM. Connected through Firebase." /><p>{study.appName} uses Flutter and Dart, with features separated into focused modules. Views render the experience, ViewModels coordinate feature state through Provider, and data responsibilities connect local persistence with Firebase backend services.</p><CaseStudyArchitecture name={study.appName} features={details.surfaces} /></section>
          <section id="engineering" className="case-section"><SectionHeading label="Engineering" title="The details that make the workflow dependable." /><p>Product-specific engineering priorities alongside the shared Flutter and Firebase foundation:</p><div className="case-engineering">{details.engineering.map(([title, description]) => <article key={title}><ShieldCheck size={24} aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></section>
          <section id="stack" className="case-section"><SectionHeading label="Stack" title="Technology stack" /><p>A Flutter application supported by Firebase backend services, on-device storage and tools for production quality and product insights.</p><CaseStudyStack /></section>
          <section id="outcomes" className="case-section"><SectionHeading label="Outcomes" title="Project results & public product footprint" /><CaseStudyOutcomes details={details} listing={listing} date={STORE_CHECK_DATE} /></section>
          <section id="capabilities" className="case-section"><SectionHeading label="Capabilities" title="What this product brings together." /><ul className="case-capabilities">{details.capabilities.map(item => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul></section>
          <section id="live-product" className="case-section case-live"><img src={`/product-icons/${slug}.png`} alt="" width="64" height="64" /><SectionHeading label="Live product" title={`Explore ${study.appName}.`} /><p>See the current features, screenshots and release information in the official store listing.</p><ProductStoreLinks slug={slug} name={study.appName} /></section>
          <section id="related-work" className="case-section"><SectionHeading label="Related work" title="More ways we make information useful." /><div className="case-related">{related.map(app => <Link key={app.slug} to={`/case-studies/${app.slug}`}><img src={`/product-icons/${app.slug}.png`} alt="" width="48" height="48" /><h3>{app.appName}</h3><p>{app.summary}</p><span className="text-link">Explore case study</span></Link>)}</div></section>
        </div>
      </div>
      <section className="case-contact"><p className="section-label">From our products to yours</p><h2>Have a workflow worth making easier?</h2><p>{story.service}</p><Link className="primary-button" to={`/contact?ref=${encodeURIComponent(study.appName)}`}>Discuss a similar project</Link></section>
    </div>
  </div>
}
