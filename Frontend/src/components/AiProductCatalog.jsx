import { Link } from 'react-router-dom'
import { ArrowLeft, BatteryFull, Copy, Languages, Link2, MoreVertical, Share2, Signal, Wifi } from 'lucide-react'
import { FALLBACK_CASE_STUDIES } from '../data/appData'
import StoreIcon from './StoreIcon'
import ProductStoreLinks from './ProductStoreLinks'
import { PRODUCT_LISTINGS, PRODUCT_PREVIEW_COPY } from '../data/productListings'
import screenshots from '../data/productScreenshots.json'
import { METRICS_NOTE } from '../data/productStories'

const otherProducts = [
  { slug: 'handwriting-to-text-scanner', name: 'Handwriting to Text', summary: 'Convert handwritten notes into editable text.', route: '/case-studies/handwriting-to-text-scanner' },
  { slug: 'live-transcribe', name: 'Live Transcribe Speech to Text', summary: 'Real-time speech to text transcription.', route: '/case-studies/live-transcribe' },
  { slug: 'ai-study-tutor', name: 'AI Study Tutor', summary: 'AI-powered study assistance and explanations.', route: '/case-studies/ai-study-tutor' },
]

function ProductIcon({ slug }) {
  return <img className="catalog-icon" src={`/product-icons/${slug}.png`} alt="" width="88" height="88" loading="lazy" />
}

function PhoneStatusBar() {
  return <span className="product-phone-status-bar" aria-hidden="true">
    <span>9:41</span>
    <span className="product-phone-status-icons"><Signal /><Wifi /><BatteryFull /></span>
  </span>
}

const scannerTextStart = 'surrendered to this world body which should be made to function as a World Government. India should strive to achieve this objective by friendly negotiations with other countries.'
const scannerTextBeforeSelection = 'If such a World Forum is established, disputed territories can '
const scannerSelectedText = 'be entrusted to it by all nations and all nations can live in peace. After'
const scannerTextEnd = ' advent of atomic weapons, it is dangerous to permit war between nations over territorial disputes and it is foolish to believe that war can be prevented by holding on to an agricultural era. Immediately we must chalk out an ideal plan and set an example to other nations.'

function ScannerScreenPreview() {
  return <span className="scanner-screen-preview" role="img" aria-label="AI Text Scanner preview using the original document photo and its extracted text">
    <span className="scanner-preview-toolbar" aria-hidden="true"><ArrowLeft /><span>1 / 1</span><Copy /><Share2 /><Languages /><Link2 /><MoreVertical /></span>
    <span className="scanner-preview-document" />
    <span className="scanner-preview-result"><span className="scanner-preview-drag-handle" aria-hidden="true" /><span className="scanner-preview-result-text">{scannerTextStart}<br /><br />{scannerTextBeforeSelection}<span className="scanner-preview-selection">{scannerSelectedText}</span>{scannerTextEnd}</span></span>
  </span>
}

function CopyScreenPreview({ screen }) {
  return <span className="copy-screen-preview">
    <span className="copy-preview-content"><img src={screen.src} width={screen.width} height={screen.height} loading="lazy" decoding="async" alt="Copy Text On Screen selecting text from a screenshot" /></span>
    <span className="copy-preview-toolbar" aria-hidden="true"><span>English <span className="copy-language-chevron" /></span><span>HandwrittenText</span><span className="copy-handwriting-checkbox" /></span>
  </span>
}

export default function AiProductCatalog() {
  return <section id="ai-products" className="ai-catalog" aria-labelledby="catalog-heading">
    <div className="catalog-heading"><p className="section-label">Our products</p><h2 id="catalog-heading">Built by APPZYS. Used every day.</h2><p>Our own mobile products turn images, documents and conversations into useful information. Explore the apps and the product experience behind our engineering.</p></div>
    <div className="product-panel-list">
      {FALLBACK_CASE_STUDIES.slice(0, 3).map(app => <article className={`product-panel catalog-${PRODUCT_LISTINGS[app.slug].accent}`} key={app.slug} data-product={app.slug}>
        <div className="product-panel-visual">
          <div className="product-visual-brand"><ProductIcon slug={app.slug} /><div><strong>{app.appName}</strong></div></div>
          <div className="product-preview-copy">
            <p className="product-preview-headline">{PRODUCT_PREVIEW_COPY[app.slug].headline}</p>
            <p className="product-preview-description">{PRODUCT_PREVIEW_COPY[app.slug].description}</p>
          </div>
          <div className="product-screen-gallery" aria-label={`${app.appName} Google Play screenshots`}>
            {screenshots[app.slug].slice(0, 2).map((screen, index) => <a className={index === 1 ? 'product-phone-frame' : 'product-poster'} href={screen.src} target="_blank" rel="noopener noreferrer" key={screen.src} aria-label={`View ${app.appName} screenshot ${index + 1} full size (opens in new tab)`}>{index === 1 && <PhoneStatusBar />}<span className={index === 1 ? 'product-phone-screen' : 'product-poster-screen'}>{index === 1 && app.slug === 'ai-text-scanner' ? <ScannerScreenPreview /> : index === 1 && app.slug === 'copy-text-on-screen' ? <CopyScreenPreview screen={screen} /> : <img src={screen.src} width={screen.width} height={screen.height} loading="lazy" decoding="async" alt={`${app.appName} app preview from the official store listing ${index + 1}`} />}</span>{index === 1 && <img className="product-device-overlay" src="/product-screenshots/device-frame.png" alt="" aria-hidden="true" width="1440" height="2560" />}</a>)}
          </div>
          <p className="product-screen-caption">App screenshots · Tap to enlarge</p>
        </div>
        <div className="product-panel-content">
        <header className="catalog-identity"><ProductIcon slug={app.slug} /><div><p className="catalog-category">{PRODUCT_LISTINGS[app.slug].category}</p><h3>{app.appName}</h3></div></header>
        <p className="catalog-summary">{app.summary}</p>
        <div className="catalog-proof"><div><strong>{PRODUCT_LISTINGS[app.slug].downloads}</strong><span className="catalog-store-label"><StoreIcon store="Google Play" />Google Play downloads</span></div><div><strong><span className="catalog-star" aria-hidden="true">★</span> {PRODUCT_LISTINGS[app.slug].rating}<small>/5</small></strong><span className="catalog-store-label"><StoreIcon store={PRODUCT_LISTINGS[app.slug].ratingStore} />{PRODUCT_LISTINGS[app.slug].ratingStore} rating</span></div></div>
        <a className="catalog-review-card" href={PRODUCT_LISTINGS[app.slug].ratingStore === 'App Store' ? PRODUCT_LISTINGS[app.slug].apple : PRODUCT_LISTINGS[app.slug].play} target="_blank" rel="noopener noreferrer" aria-label={`Read ${app.appName} ratings on ${PRODUCT_LISTINGS[app.slug].ratingStore} (opens in new tab)`}><span className="catalog-review-icon"><StoreIcon store={PRODUCT_LISTINGS[app.slug].ratingStore} /></span><span className="catalog-review-copy"><strong>{PRODUCT_LISTINGS[app.slug].ratings} <span>ratings</span></strong><span>on {PRODUCT_LISTINGS[app.slug].ratingStore}</span></span><span className="catalog-review-action">View ratings</span></a>
        <p className="product-platforms">Available on iOS & Android</p><h4>What we built</h4>
        <ul>{app.capabilities.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul>
        <ProductStoreLinks slug={app.slug} name={app.appName} /><div className="catalog-footer"><span>Built & maintained by APPZYS</span><Link className="text-link" to={`/case-studies/${app.slug}`}>View case study</Link></div>
        </div>
      </article>)}
    </div>
    <p className="evidence-note">{METRICS_NOTE}</p>
    <section className="catalog-more" aria-labelledby="more-products-heading"><div className="catalog-more-heading"><p className="section-label">More tools, built by us</p><h3 id="more-products-heading">More from APPZYS</h3></div><div className="catalog-more-grid">{otherProducts.map(app => <article className="catalog-small" key={app.slug}><ProductIcon slug={app.slug} /><div className="catalog-small-copy"><h4>{app.name}</h4><p>{app.summary}</p></div><div className="catalog-small-actions">{app.route && <Link className="text-link" to={app.route}>View case study</Link>}<ProductStoreLinks slug={app.slug} name={app.name} showAppStore={false} /></div></article>)}</div></section>
  </section>
}
