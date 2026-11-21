import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, MessageSquare, FileText, Handshake, Rocket, Workflow, Cog, UsersRound } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import { SERVICES_LIST } from '../data/appData'
import { SERVICE_DETAILS } from '../data/serviceDetails'
import { SERVICE_PRESENTATION } from '../data/servicePresentation'
import { SERVICE_SALES_CONTENT } from '../data/serviceSalesContent'
import ServiceDeliveryVisual from '../components/ServiceDeliveryVisual'

const SERVICE_ICONS = {
  'mobile-app-development': Rocket,
  'mobile-app-integration': Workflow,
  'app-enhancement-maintenance': Cog,
  'dedicated-flutter-development': UsersRound,
}

export default function MobileAppServicePage() {
  const [activeService, setActiveService] = useState(SERVICES_LIST[0].slug)

  useEffect(() => {
    const sections = SERVICES_LIST.map(service => document.getElementById(service.slug)).filter(Boolean)
    let frame = null

    const updateActiveService = () => {
      frame = null
      // Track the section reaching the reading area below the sticky header.
      const readingLine = Math.min(180, window.innerHeight * 0.3)
      let active = sections[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) active = section
      }
      if (active) setActiveService(active.id)
    }
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateActiveService)
    }

    updateActiveService()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="editorial-site mobile-services-page">
      <SeoHead
        title="Mobile development & Flutter engineering services | APPZYS"
        description="Build a new app, extend your backend to mobile, improve an existing Flutter product or add engineering capacity with APPZYS."
        canonicalPath="/services/mobile-app-development"
      />
      <section className="service-page-hero">
        <div className="section-shell service-hero-layout">
          <div>
            <p className="section-label">Mobile engineering / Android & iOS</p>
            <h1>Your next chapter.<br /><span>Built for mobile.</span></h1>
            <p className="service-hero-description">Launch a first product, bring your platform to mobile, improve a Flutter application or extend your team. Find the service that matches what you need now.</p>
            <div className="button-row">
              <Link className="primary-button" to="/contact">Discuss your project</Link>
              <a className="secondary-button" href="#services">Find your service</a>
            </div>
          </div>
          <nav className="service-hero-index" aria-label="Explore mobile services">
            {SERVICES_LIST.map(service => {
              const Icon = SERVICE_ICONS[service.slug]
              return <a key={service.slug} href={`#${service.slug}`}>
                <span className="service-index-icon"><Icon size={22} aria-hidden="true" /></span>
                <span><strong>{service.overviewTitle}</strong><small>{service.outcome}</small></span>
              </a>
            })}
          </nav>
        </div>
      </section>

      <div id="services" className="section-shell service-catalog-layout">
        <aside className="service-catalog-sidebar">
          <nav aria-label="Choose a mobile service">
            <p className="section-label">Find your starting point</p>
            {SERVICES_LIST.map(service => (
              <a key={service.slug} href={`#${service.slug}`} aria-current={activeService === service.slug ? 'location' : undefined}>
                <span>{service.overviewTitle}</span>
                <small>{service.outcome}</small>
              </a>
            ))}
            <div className="service-sidebar-help">
              <MessageSquare size={20} aria-hidden="true" />
              <p>Not sure which fits?</p>
              <Link to="/contact">Tell us about your app</Link>
            </div>
          </nav>
        </aside>

        <div className="service-catalog-content">
          {SERVICES_LIST.map(service => {
            const detail = SERVICE_DETAILS[service.slug]
            const presentation = SERVICE_PRESENTATION[service.slug]
            const sales = SERVICE_SALES_CONTENT[service.slug]
            const Icon = SERVICE_ICONS[service.slug]
            return (
              <section key={service.slug} id={service.slug} className={`service-offering service-theme-${presentation.tone}`} aria-labelledby={`${service.slug}-title`}>
                <div className="service-offering-intro"><div className="service-offering-intro-copy">
                  <div className="service-offering-label"><span className="service-index-icon"><Icon size={22} aria-hidden="true" /></span><p className="section-label">{service.overviewTitle}</p></div>

                  <h2 id={`${service.slug}-title`}>{sales.question}</h2>
                  <p>{sales.answer}</p>
                  <Link className="service-intro-link" to={`/contact?service=${encodeURIComponent(service.overviewTitle)}`}>{sales.action}</Link>
                  </div><ServiceDeliveryVisual presentation={presentation} />
                </div>
                <div className="service-offering-body">
                  <div className="service-audience"><span>Built for</span><ul>{sales.audience.map(audience => <li key={audience}>{audience}</li>)}</ul></div>
                  <header className="service-pain-heading"><p className="service-body-label">Does this sound like you?</p><h3>Here’s how we can help.</h3></header>
                  <div className="service-problem-solutions">{sales.pairs.map(([problem, solution, explanation]) => <article className="service-problem-solution" key={problem}><div className="service-problem"><span className="service-question-label"><span className="service-question-mark" aria-hidden="true">?</span>Your challenge</span><h4>{problem}</h4></div><div className="service-solution"><span className="service-solution-label"><Check size={16} aria-hidden="true" />Our response</span><h4>{solution}</h4><p>{explanation}</p></div></article>)}</div>
                  {sales.proofSlug && <div className="service-product-proof"><img src={`/product-icons/${sales.proofSlug}.png`} width="40" height="40" alt="" /><div><strong>We build and maintain our own apps, too.</strong><Link to={`/case-studies/${sales.proofSlug}`}>See the {sales.proofName} case study</Link></div></div>}
                  <details className="service-scope-disclosure"><summary>Explore the technical scope</summary><p className="service-delivery-summary">{detail.delivery}</p><ul className="service-deliverables">{detail.capabilities.map((item, index) => <li key={item}><Check size={18} aria-hidden="true" /><div><h4>{presentation.capabilities[index]}</h4><p>{item}</p></div></li>)}</ul></details>
                  <div className="service-supporting-details">
                  <div className="service-starting-point">
                    <FileText size={22} aria-hidden="true" />
                    <div><h3>Where we start</h3><p>{detail.startingPoint}</p></div>
                  </div>
                  <div className="service-engagement">
                    <Handshake size={22} aria-hidden="true" />
                    <div><h3>How we work together</h3><p>{detail.engagement}</p></div>
                  </div>
                  </div>
                  <div className="service-offering-footer">
                    <Link className="primary-button" to={`/contact?service=${encodeURIComponent(service.title)}`}>{sales.action}</Link>
                    <p>{sales.reassurance}</p>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
      <section className="service-next-step">
        <div className="section-shell">
          <div className="section-heading">
            <div><p className="section-label">Let’s work through it together</p><h2>You bring the context.<br />We’ll discuss the next step.</h2></div>
            <div><p>Tell us who the app is for, what needs to improve and what you already have. A technical specification can come later.</p><Link className="primary-button mt-6" to="/contact">Start a conversation</Link></div>
          </div>
        </div>
      </section>
    </div>
  )
}
