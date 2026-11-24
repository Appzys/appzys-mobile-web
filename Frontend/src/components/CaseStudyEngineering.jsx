import { Activity, Cloud, Database, HardDrive, Layers, Smartphone } from 'lucide-react'
import { PRODUCT_TECHNOLOGY } from '../data/productEngineering'

const icons = { mobile: Smartphone, layers: Layers, cloud: Cloud, database: Database, storage: HardDrive, activity: Activity }

function DiagramCard({ icon: Icon, label, title, children }) {
  return (
    <div className="architecture-node">
      <span className="architecture-icon-wrap"><Icon size={22} aria-hidden="true" /></span>
      <div>
        <span className="architecture-node-label">{label}</span>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  )
}

export function CaseStudyArchitecture({ name, features }) {
  return (
    <figure className="architecture-board" aria-label={`${name} feature-based MVVM architecture`}>
      <div className="architecture-board-heading">
        <span className="architecture-brand-icon"><Smartphone size={24} aria-hidden="true" /></span>
        <div>
          <strong>{name}</strong>
          <span>Flutter application · Dart</span>
        </div>
        <span className="architecture-badge">Feature-based MVVM</span>
      </div>
      <div className="architecture-features">{features.map(([title]) => <span key={title}>{title}</span>)}</div>
      <div className="architecture-client">
        <DiagramCard icon={Smartphone} label="Presentation" title="Views">Flutter screens and reusable widgets</DiagramCard>
        <DiagramCard icon={Layers} label="State & coordination" title="ViewModels · Provider">UI state and feature interactions</DiagramCard>
        <DiagramCard icon={Database} label="Application data" title="Models & data access">Typed data and persistence boundaries</DiagramCard>
      </div>
      <div className="architecture-connector"><span>Application data & services</span></div>
      <div className="architecture-services">
        <DiagramCard icon={HardDrive} label="On the device" title="Local persistence">Hive · SharedPreferences</DiagramCard>
        <DiagramCard icon={Cloud} label="Firebase backend" title="Cloud services">Cloud Firestore · Cloud Functions</DiagramCard>
      </div>
      <div className="architecture-observability">
        <span className="architecture-icon-wrap"><Activity size={20} aria-hidden="true" /></span>
        <strong>Quality & product insights</strong>
        <span className="architecture-chip">Firebase Crashlytics</span>
        <span className="architecture-chip">Firebase Analytics</span>
      </div>
      <figcaption>Architecture overview based on the shared stack confirmed by APPZYS. Feature responsibilities vary by product.</figcaption>
    </figure>
  )
}

export function CaseStudyStack() {
  return <div className="technology-grid">{PRODUCT_TECHNOLOGY.map(group => {
    const Icon = icons[group.icon]
    return <article className="technology-card" key={group.title}><div className="technology-heading"><Icon size={22} aria-hidden="true" /><h3>{group.title}</h3></div><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul><p>{group.description}</p></article>
  })}</div>
}

export function CaseStudyOutcomes({ details, listing, date }) {
  return <><div className="case-results-grid">
    <article className="case-result-card"><strong className="case-result-number">{details.downloads}</strong><h3>Android downloads on Google Play</h3><p>{details.downloadsSource ? 'Cumulative Google Play download band reported by APPZYS.' : 'The public listing shows this cumulative download band.'}</p><a href={listing.play} target="_blank" rel="noopener noreferrer">{details.downloadsSource ? 'View Google Play listing' : 'Source: Google Play listing'}</a></article>
    <article className="case-result-card"><strong className="case-result-number">{listing.apple ? '2 stores' : 'Live'}</strong><h3>{listing.apple ? 'Available on Android & iOS' : 'Published on Google Play'}</h3><p>{details.result}</p><a href={listing.apple || listing.play} target="_blank" rel="noopener noreferrer">{listing.apple ? 'Source: App Store listing' : 'Explore the live product'}</a></article>
    <article className="case-result-card"><h3>A connected product workflow</h3><p>{details.value}</p><span className="case-result-source">Product scope · APPZYS</span></article>
    <article className="case-result-card"><h3>Built to evolve by feature</h3><p>Flutter and feature-based MVVM connect the mobile experience with Firebase services, local persistence and production monitoring.</p><span className="case-result-source">Implementation details · APPZYS</span></article>
  </div><p className="case-note">{details.downloadsSource ? `Download band updated by APPZYS on ${date}.` : `Store download band checked ${date}.`} Downloads are cumulative and do not represent active users.</p></>
}
