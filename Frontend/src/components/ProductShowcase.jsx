import { Link } from 'react-router-dom'
import ProductWorkflow from './ProductWorkflow'
import { PRODUCT_STORIES, METRICS_NOTE } from '../data/productStories'
import { FALLBACK_CASE_STUDIES } from '../data/appData'

export default function ProductShowcase({ studies = FALLBACK_CASE_STUDIES.slice(0, 3) }) {
  return <div className="product-stories">
    {studies.map((app) => {
      const story = PRODUCT_STORIES[app.slug]
      return <article key={app.slug} className="product-story">
        <div className="product-story-copy">
          <p className="section-label">In-house product / {app.appName}</p>
          <h3>{story.headline}</h3>
          <p>{app.summary}</p>
          <p className="product-evidence">{app.installsLabel}<br /><span>{app.ratingLabel} · company-reported</span></p>
          <Link className="text-link" to={`/case-studies/${app.slug}`}>Explore {app.appName}</Link>
        </div>
        <ProductWorkflow slug={app.slug} />
      </article>
    })}
    <p className="evidence-note">{METRICS_NOTE}</p>
  </div>
}
