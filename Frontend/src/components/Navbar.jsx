import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Mobile Services', to: '/services/mobile-app-development' },
  { label: 'AI & OCR Apps', to: '/services/ai-ocr-app-development' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        document.getElementById('navigation-toggle')?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" onClick={closeMenu} className="header-brand" aria-label="APPZYS home">
            <img src="/appzys-brand-symbol.png" alt="" width="48" height="48" />
            <span className="header-wordmark">
              <span>APPZYS</span>
              <span>Technologies Private Limited</span>
            </span>
          </Link>

          <nav className="desktop-navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `header-nav-link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact" className="header-contact">Discuss your project</Link>

          <button
            id="navigation-toggle"
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            className="navigation-toggle"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={closeMenu} className="primary-button">Discuss your project</Link>
        </nav>
      </header>

      <div className="mobile-contact-bar">
        <Link to="/about" onClick={closeMenu}>About us</Link>
        <Link to="/contact" onClick={closeMenu}>Discuss your project</Link>
      </div>
    </>
  )
}
