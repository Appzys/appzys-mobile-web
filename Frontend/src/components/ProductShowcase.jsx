import { CASE_STUDY_DETAILS } from '../data/caseStudyDetails'
import { Link } from 'react-router-dom'
import screenshots from '../data/productScreenshots.json'
import { PRODUCT_STORIES } from '../data/productStories'
import { FALLBACK_CASE_STUDIES } from '../data/appData'

export default function ProductShowcase({ studies = FALLBACK_CASE_STUDIES.slice(0, 3) }) {
  return <div className="product-stories">
    {studies.map((app) => {
      const story = PRODUCT_STORIES[app.slug]
      return <article key={app.slug} className="product-story" data-product={app.slug}>
        <div className="product-story-copy">
          <p className="section-label">In-house product / {app.appName}</p>
          <h3>{story.headline}</h3>
          <p>{app.summary}</p>
          <p className="product-evidence">{CASE_STUDY_DETAILS[app.slug].downloads} Google Play downloads<br /><span>In-house product · Published on Google Play</span></p>
          <Link className="text-link" to={`/case-studies/${app.slug}`}>Explore {app.appName}</Link>
        </div>
        <Link className={`portfolio-preview tone-${story.color}`} to={`/case-studies/${app.slug}`} aria-label={`Explore ${app.appName} case study`}><img src={screenshots[app.slug][0].src} alt={`${app.appName} product preview`} loading="lazy" width="400" height="800" /><img src={screenshots[app.slug][1].src} alt={`${app.appName} second product preview`} loading="lazy" width="400" height="800" /></Link>
      </article>
    })}
    <p className="evidence-note">Google Play download bands checked 21 November 2026; AI Study Tutor updated to 500+ by APPZYS. Downloads are cumulative and do not represent active users.</p>
  </div>
}
