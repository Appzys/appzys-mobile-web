import { Link, useLocation } from 'react-router-dom'
import { Check, MessageSquare, FileText, Code2, Smartphone } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import DevelopmentProcess from '../components/DevelopmentProcess'
import ProjectBrief from '../components/ProjectBrief'
import ServiceVisual from '../components/ServiceVisual'
import { SERVICES_LIST } from '../data/appData'
import { SERVICE_DETAILS } from '../data/serviceDetails'

export default function MobileAppServicePage() {
  const { hash } = useLocation()

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
            <h1>Your next step.<br /><span>Built around your app.</span></h1>
            <p className="service-hero-description">A first release. A connected platform. A better existing app. The right engineering support starts with where you are today.</p>
            <div className="button-row">
              <Link className="primary-button" to="/contact">Discuss your project</Link>
              <a className="secondary-button" href="#services">Find your service</a>
            </div>
          </div>
          <div className="service-hero-panel">
            <p>From your idea to what comes next.</p>
            <div className="service-journey">
              <div><MessageSquare size={22} /><span>Understand the need</span></div>
              <div><Code2 size={22} /><span>Build the experience</span></div>
              <div><Smartphone size={22} /><span>Support the product</span></div>
            </div>
            <span>Flutter development · Backend integration · Ongoing support</span>
          </div>
        </div>
      </section>

      <div id="services" className="section-shell service-catalog-layout">
        <aside className="service-catalog-sidebar">
          <nav aria-label="Choose a mobile service">
            <p className="section-label">Find your starting point</p>
            {SERVICES_LIST.map(service => (
              <a key={service.slug} href={`#${service.slug}`} aria-current={hash === `#${service.slug}` ? 'location' : undefined}>
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
            return (
              <section key={service.slug} id={service.slug} className="service-offering" aria-labelledby={`${service.slug}-title`}>
                <div className="service-offering-intro">
                  <p className="section-label">{service.tag}</p>
                  <h2 id={`${service.slug}-title`}>{service.overviewTitle}</h2>
                  <p>{service.summary}</p>
                </div>
                <ServiceVisual slug={service.slug} />
                <div className="service-offering-body">
                  <div className="service-fit"><span>Who it’s for</span><p>{detail.audience}</p></div>
                  <h3>What we can help you deliver</h3>
                  <ul className="service-deliverables">
                    {service.capabilities.map(item => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}
                  </ul>
                  <div className="service-starting-point">
                    <FileText size={22} aria-hidden="true" />
                    <div><h3>Bring what you have.</h3><p>{detail.startingPoint}</p></div>
                  </div>
                  <div className="service-example">
                    <span>Relevant in-house experience</span>
                    <Link to={`/case-studies${detail.example.slug ? `/${detail.example.slug}` : ''}`}>{detail.example.name}</Link>
                    <p>{detail.example.description}</p>
                  </div>
                  <div className="service-offering-footer">
                    <Link className="primary-button" to={`/contact?service=${encodeURIComponent(service.title)}`}>Discuss this service</Link>
                    <p>Scope, milestones and handover agreed before development.</p>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
      <DevelopmentProcess />
      <section className="service-next-step">
        <div className="section-shell">
          <div className="section-heading">
            <div><p className="section-label">Let’s work through it together</p><h2>You bring the context.<br />We’ll discuss the next step.</h2></div>
            <div><p>Tell us who the app is for, what needs to improve and what you already have. A technical specification can come later.</p><Link className="primary-button mt-6" to="/contact">Start a conversation</Link></div>
          </div>
          <ProjectBrief />
        </div>
      </section>
    </div>
  )
}
