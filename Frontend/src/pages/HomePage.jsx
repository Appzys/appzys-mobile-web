import { Link } from 'react-router-dom'
import SeoHead from '../components/SeoHead'
import ProductWorkflow from '../components/ProductWorkflow'
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
      <div className="hero-product">
        <div className="hero-product-heading"><span>Built here. Used out there.</span><span>Copy Text On Screen</span></div>
        <ProductWorkflow slug="copy-text-on-screen" compact />
        <Link to="/case-studies/copy-text-on-screen" className="hero-product-link">Discover the product story</Link>
      </div>
    </section>
    <ProofMetrics />
    <ServicesOverview />
    <section className="section-shell section-space company-section"><div><p className="section-label">The people behind the products</p><h2>A mobile engineering partner.<br />With product experience of our own.</h2></div><div><p>APPZYS Technologies Private Limited is based in Chennai, India. We develop our own mobile products and bring that practical experience to businesses, agencies and product teams.</p><p>Start by discussing your users, existing systems and delivery constraints. Scope, communication, source-code handover and support expectations should be agreed before development begins.</p><Link className="text-link" to="/about">Get to know APPZYS</Link></div></section>
    <section className="project-invitation"><div className="section-shell"><p className="section-label">Your next mobile product</p><h2>What are you trying to build?</h2><p>A new idea, an existing app that needs attention, or a team that needs support. Let’s start there.</p><Link className="primary-button" to="/contact">Discuss your project</Link><a className="quiet-link" href="mailto:support@appzys.com">support@appzys.com</a></div></section>
  </div>
}
