import { CASE_STUDY_DETAILS } from '../data/caseStudyDetails'
import { Link } from 'react-router-dom'
import screenshots from '../data/productScreenshots.json'
import { PRODUCT_STORIES } from '../data/productStories'
import { FALLBACK_CASE_STUDIES } from '../data/appData'
import CaseStudySurfaces from './CaseStudySurfaces'

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
        <CaseStudySurfaces slug={app.slug} name={app.appName} surfaces={CASE_STUDY_DETAILS[app.slug].surfaces.slice(0, 2)} screens={screenshots[app.slug]} hero eager={false} />
      </article>
    })}
    <p className="evidence-note">Google Play download bands checked 21 November 2026; AI Study Tutor updated to 500+ by APPZYS. Downloads are cumulative and do not represent active users.</p>
  </div>
}
