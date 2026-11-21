import { PRODUCT_LISTINGS } from '../data/productListings'

export default function ProductStoreLinks({ slug, name, showAppStore = true }) {
  const listing = PRODUCT_LISTINGS[slug]
  if (!listing) return null
  return <div className="product-store-links" aria-label={`Download ${name}`}>
    {showAppStore && listing.apple && <a href={listing.apple} target="_blank" rel="noopener noreferrer" className="product-store-button" aria-label={`${name} on the App Store (opens in new tab)`}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.1 12.4c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.5-1.7-3.1-1.7-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.9.9-3.6 2.2-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 1.9-1 2.6-2.1.9-1.2 1.3-2.4 1.3-2.5-.1 0-2.7-1-2.7-3.6ZM15 5.8c.6-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.2 1.8-1 2.8 1 .1 2.1-.5 2.7-1.2Z" /></svg><span><small>Download on the</small><strong>App Store</strong></span></a>}
    {listing.play && <a href={listing.play} target="_blank" rel="noopener noreferrer" className="product-store-button" aria-label={`${name} on Google Play (opens in new tab)`}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#53d5c5" d="M3 2 14 12 3 22Z"/><path fill="#68a5ff" d="m3 2 14 8-3 2Z"/><path fill="#ffce47" d="m17 10 4 2-4 2-3-2Z"/><path fill="#ff747d" d="m3 22 11-10 3 2Z"/></svg><span><small>Get it on</small><strong>Google Play</strong></span></a>}
  </div>
}
