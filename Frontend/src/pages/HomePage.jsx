import { Link } from 'react-router-dom'
import SeoHead from '../components/SeoHead'
import ServicesOverview from '../components/ServicesOverview'
import ProofMetrics from '../components/ProofMetrics'

export default function HomePage() {
  return <div className="editorial-site">
    <SeoHead title="APPZYS | Mobile applications that solve real problems" description="Flutter applications for Android and iOS. Explore APPZYS in-house products, mobile development, backend integration and ongoing engineering support." canonicalPath="/" />
    <section className="home-intro section-shell">
      <div className="hero-copy">
        <p className="section-label">APPZYS / Mobile application engineering</p>
        <h1>We build mobile applications that <em>solve real problems.</em></h1>
        <p className="hero-description">From a new product idea to an existing business platform. We build Flutter applications for Android and iOS, connect your backend, and support what comes next.</p>
        <div className="button-row"><Link to="/contact" className="primary-button">Discuss your project</Link><a href="#home-services" className="secondary-button">Explore our services</a></div>
        <p className="hero-footnote">New applications. Better existing products. Extra engineering capacity.</p>
      </div>
      <figure className="hero-collaboration">
        <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1400&q=85" alt="Colleagues sharing ideas and collaborating around a laptop in a bright workspace" width="1400" height="1050" fetchPriority="high" />
        <figcaption><span>Good products start with shared ideas.</span><p>Let’s turn your next idea into a mobile experience that matters.</p></figcaption>
      </figure>
    </section>
    <ProofMetrics />
    <ServicesOverview />
    <section className="section-shell section-space company-section"><div><p className="section-label">The people behind the products</p><h2>A mobile engineering partner.<br />With product experience of our own.</h2></div><div><p>APPZYS Technologies Private Limited is based in Chennai, India. We develop our own mobile products and bring that practical experience to businesses, agencies and product teams.</p><p>Start by discussing your users, existing systems and delivery constraints. Scope, communication, source-code handover and support expectations should be agreed before development begins.</p><Link className="text-link" to="/about">Get to know APPZYS</Link></div></section>
  </div>
}
