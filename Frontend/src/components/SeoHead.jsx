import { useEffect } from 'react'

const BASE_URL = 'https://appzys.com'
const DEFAULT_IMAGE = 'https://appzys.com/home-hero-banner.png'
const DEFAULT_KEYWORDS =
  'Flutter app development company, iOS app developers, Android app development India, on-device OCR SDK, AI mobile app studio, Appzys'

export default function SeoHead({
  title = 'Appzys | Flutter & AI Mobile App Development Studio',
  description = 'Appzys is a senior-led mobile engineering studio building production Flutter, iOS, Android, and on-device AI/OCR applications for founders and scaleups.',
  canonicalPath = '/',
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema = null,
  breadcrumbs = null,
}) {
  const canonicalUrl = `${BASE_URL}${canonicalPath === '/' ? '' : canonicalPath}`

  useEffect(() => {
    // 1. Update Document Title
    document.title = title

    // Helper to update or create meta tags
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // 2. Standard Meta Tags
    setMeta('name', 'description', description)
    setMeta('name', 'keywords', keywords)
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

    // 3. Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]')
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.setAttribute('href', canonicalUrl)

    // 4. OpenGraph Tags
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:site_name', 'Appzys Mobile & AI Studio')
    setMeta('property', 'og:locale', 'en_US')

    // 5. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    // 6. JSON-LD Structured Data Schema Injection
    const coreOrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'ProfessionalService'],
      name: 'Appzys Technologies Private Limited',
      legalName: 'Appzys Technologies Private Limited',
      url: BASE_URL,
      logo: `${BASE_URL}/appzys-logo.png`,
      image: DEFAULT_IMAGE,
      description:
        'Senior-led cross-platform mobile application and on-device AI/OCR engineering studio with ~1M+ verified app store installs.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'F4 Block 3, 1st Floor, Atana Arun Excello, Karanithangal',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '602105',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9025359351',
        contactType: 'Sales & Technical Inquiry',
        email: 'support@appzys.com',
      },
      sameAs: [
        'https://www.linkedin.com/company/appzys-technologies-private-limited/home',
        'https://play.google.com/store/apps/developer?id=Appzys+-+AI+Apps,+Scanner+%26+OCR',
      ],
      priceRange: '$$',
    }

    const appStoreProofSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Copy Text On Screen',
      operatingSystem: 'Android, iOS',
      applicationCategory: 'BusinessApplication',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.1',
        reviewCount: '1500',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: {
        '@type': 'Organization',
        name: 'Appzys Technologies Private Limited',
      },
    }

    const schemasToInject = [coreOrganizationSchema, appStoreProofSchema]

    if (schema) {
      if (Array.isArray(schema)) {
        schemasToInject.push(...schema)
      } else {
        schemasToInject.push(schema)
      }
    }

    if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.item.startsWith('http') ? b.item : `${BASE_URL}${b.item}`,
        })),
      }
      schemasToInject.push(breadcrumbSchema)
    }

    // Clean existing injected schema
    const existingScript = document.getElementById('appzys-jsonld')
    if (existingScript) {
      existingScript.remove()
    }

    const scriptEl = document.createElement('script')
    scriptEl.id = 'appzys-jsonld'
    scriptEl.type = 'application/ld+json'
    scriptEl.text = JSON.stringify(schemasToInject)
    document.head.appendChild(scriptEl)

    return () => {
      // Keep head clean if needed
    }
  }, [title, description, canonicalUrl, keywords, ogImage, ogType, schema, breadcrumbs])

  return null
}
