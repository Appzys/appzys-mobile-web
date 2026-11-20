import { Link } from 'react-router-dom'
import { Smartphone, Plug, Wrench, Users, Plus } from 'lucide-react'

const ICONS = {
  'mobile-app-development': Smartphone,
  'mobile-app-integration': Plug,
  'app-enhancement-maintenance': Wrench,
  'dedicated-flutter-development': Users,
}
import { SERVICES_LIST } from '../data/appData'

export default function ServicesOverview() {
  return (
    <section id="home-services" className="services-overview section-space" aria-labelledby="services-overview-title">
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <p className="section-label">Our four services</p>
            <h2 id="services-overview-title">The right support.<br />At every stage of your app.</h2>
          </div>
          <p>From your first mobile release to the next phase of growth. Choose the support you need and explore what it includes.</p>
        </div>
        <div className="services-overview-grid">
          {SERVICES_LIST.map((service) => {
            const Icon = ICONS[service.slug]
            return (
              <Link
                key={service.slug}
                to={`/services/mobile-app-development#${service.slug}`}
                className="service-overview-card"
                aria-label={`Explore ${service.overviewTitle}`}
              >
                <div className="service-card-heading">
                  <span className="service-card-icon"><Icon size={28} strokeWidth={1.6} aria-hidden="true" /></span>
                  <span className="service-overview-outcome">{service.outcome}</span>
                </div>
                <div className="service-overview-content">
                <h3>{service.overviewTitle}</h3>
                <p>{service.overviewSummary}</p>
                <span className="service-overview-action"><span>Explore this service</span><span className="service-card-plus"><Plus size={18} aria-hidden="true" /></span></span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
