import { useEffect, useState, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ArrowRight, Rocket, Workflow, Cog, UsersRound } from 'lucide-react'

const SERVICES_DROPDOWN = [
  {
    title: 'MVP app development',
    subtitle: 'Idea to launch',
    description: 'Turn your product vision into a first release for Android & iOS.',
    slug: 'mobile-app-development',
    icon: Rocket,
  },
  {
    title: 'SaaS & backend integration',
    subtitle: 'Web to mobile',
    description: 'Connect existing web APIs, databases and auth to mobile.',
    slug: 'mobile-app-integration',
    icon: Workflow,
  },
  {
    title: 'App maintenance & enhancement',
    subtitle: 'Improve & maintain',
    description: 'Fix bugs, upgrade dependencies and ship new features.',
    slug: 'app-enhancement-maintenance',
    icon: Cog,
  },
  {
    title: 'Dedicated Flutter development',
    subtitle: 'Your mobile development partner',
    description: 'A dedicated mobile pod to build and support your solution.',
    slug: 'dedicated-flutter-development',
    icon: UsersRound,
  },
]

const APPS_DROPDOWN = [
  {
    title: 'Copy Text On Screen',
    subtitle: 'OCR & Productivity Utility',
    badge: '500K+ downloads',
    slug: 'copy-text-on-screen',
    iconUrl: '/product-icons/copy-text-on-screen.png',
  },
  {
    title: 'AI Text Scanner',
    subtitle: 'Documents, OCR & AI Integration',
    badge: '100K+ downloads',
    slug: 'ai-text-scanner',
    iconUrl: '/product-icons/ai-text-scanner.png',
  },
  {
    title: 'AI Transcript',
    subtitle: 'Audio/video to text & AI summaries',
    badge: '10K+ downloads',
    slug: 'ai-transcript-audio-to-text',
    iconUrl: '/product-icons/ai-transcript-audio-to-text.png',
  },
  {
    title: 'Handwriting to Text Scanner',
    subtitle: 'Handwritten notes to editable text',
    badge: '10K+ downloads',
    slug: 'handwriting-to-text-scanner',
    iconUrl: '/product-icons/handwriting-to-text-scanner.png',
  },
  {
    title: 'Live Transcribe',
    subtitle: 'Real-time speech to text',
    badge: '500+ downloads',
    slug: 'live-transcribe',
    iconUrl: '/product-icons/live-transcribe.png',
  },
  {
    title: 'AI Study Tutor',
    subtitle: 'Document learning & study assistant',
    badge: '500+ downloads',
    slug: 'ai-study-tutor',
    iconUrl: '/product-icons/ai-study-tutor.png',
  },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState({ services: false, apps: false })
  const hoverTimeoutRef = useRef(null)
  const navContainerRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null)
        if (open) {
          setOpen(false)
          document.getElementById('navigation-toggle')?.focus()
        }
      }
    }
    const handleClickOutside = (event) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handleClickOutside)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [open])

  const handleMouseEnter = (type) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setActiveDropdown(type)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  const handleItemClick = (slug, targetPath) => {
    setActiveDropdown(null)
    setOpen(false)
    if (location.pathname === targetPath) {
      setTimeout(() => {
        const el = document.getElementById(slug)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 30)
    }
  }

  const closeMenu = () => {
    setOpen(false)
    setActiveDropdown(null)
  }

  const toggleMobileSubmenu = (key, event) => {
    event.preventDefault()
    event.stopPropagation()
    setMobileExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <header className="site-header" ref={navContainerRef}>
        <div className="header-inner">
          <Link to="/" onClick={closeMenu} className="header-brand" aria-label="APPZYS home">
            <img src="/appzys-brand-symbol.png" alt="" width="48" height="48" />
            <span className="header-wordmark">
              <span>APPZYS</span>
              <span>Technologies Private Limited</span>
            </span>
          </Link>

          <nav className="desktop-navigation" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `header-nav-link${isActive ? ' is-active' : ''}`}
            >
              Home
            </NavLink>

            {/* Mobile Services with Dropdown */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/services/mobile-app-development"
                className={({ isActive }) =>
                  `header-nav-link has-dropdown${isActive || activeDropdown === 'services' ? ' is-active' : ''}`
                }
              >
                <span>Mobile Services</span>
                <ChevronDown
                  size={14}
                  className={`header-chevron transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180 text-[#1d63ed]' : 'text-slate-400'
                  }`}
                  aria-hidden="true"
                />
              </NavLink>

              {activeDropdown === 'services' && (
                <div
                  className="nav-dropdown-menu nav-dropdown-services"
                  role="menu"
                  aria-label="Mobile services menu"
                >
                  <div className="nav-dropdown-header">
                    <span className="nav-dropdown-label">Mobile engineering services</span>
                    <span className="nav-dropdown-count">4 services</span>
                  </div>
                  <div className="nav-dropdown-services-list">
                    {SERVICES_DROPDOWN.map((service) => {
                      const Icon = service.icon
                      return (
                        <Link
                          key={service.slug}
                          to={`/services/mobile-app-development#${service.slug}`}
                          onClick={() => handleItemClick(service.slug, '/services/mobile-app-development')}
                          className="nav-dropdown-item"
                          role="menuitem"
                        >
                          <div className="nav-dropdown-icon-box">
                            <Icon size={18} />
                          </div>
                          <div className="nav-dropdown-text">
                            <div className="nav-dropdown-title">{service.title}</div>
                            <div className="nav-dropdown-desc">
                              <span className="font-semibold text-slate-700">{service.subtitle}</span> &bull; {service.description}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  <div className="nav-dropdown-footer">
                    <Link
                      to="/services/mobile-app-development"
                      onClick={closeMenu}
                    >
                      <span>Explore all mobile services</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* AI & OCR Apps with Dropdown */}
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => handleMouseEnter('apps')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/services/ai-ocr-app-development"
                className={({ isActive }) =>
                  `header-nav-link has-dropdown${isActive || activeDropdown === 'apps' ? ' is-active' : ''}`
                }
              >
                <span>AI & OCR Apps</span>
                <ChevronDown
                  size={14}
                  className={`header-chevron transition-transform duration-200 ${
                    activeDropdown === 'apps' ? 'rotate-180 text-[#1d63ed]' : 'text-slate-400'
                  }`}
                  aria-hidden="true"
                />
              </NavLink>

              {activeDropdown === 'apps' && (
                <div
                  className="nav-dropdown-menu nav-dropdown-apps"
                  role="menu"
                  aria-label="AI and OCR apps menu"
                >
                  <div className="nav-dropdown-header">
                    <span className="nav-dropdown-label">AI & OCR mobile applications</span>
                    <span className="nav-dropdown-count">6 production apps</span>
                  </div>
                  <div className="nav-dropdown-apps-grid">
                    {APPS_DROPDOWN.map((app) => (
                      <Link
                        key={app.slug}
                        to={`/services/ai-ocr-app-development#${app.slug}`}
                        onClick={() => handleItemClick(app.slug, '/services/ai-ocr-app-development')}
                        className="nav-dropdown-item"
                        role="menuitem"
                      >
                        <img
                          src={app.iconUrl}
                          alt=""
                          className="nav-dropdown-app-icon"
                          width="38"
                          height="38"
                          loading="lazy"
                        />
                        <div className="nav-dropdown-text">
                          <div className="nav-dropdown-title">{app.title}</div>
                          <div className="nav-dropdown-desc">{app.subtitle}</div>
                          <span className="nav-dropdown-badge">{app.badge}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="nav-dropdown-footer">
                    <Link
                      to="/services/ai-ocr-app-development"
                      onClick={closeMenu}
                    >
                      <span>Explore full AI & OCR app catalog</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/case-studies"
              className={({ isActive }) => `header-nav-link${isActive ? ' is-active' : ''}`}
            >
              Case Studies
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => `header-nav-link${isActive ? ' is-active' : ''}`}
            >
              About
            </NavLink>
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
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
          >
            Home
          </NavLink>

          {/* Mobile Services Group */}
          <div className="mobile-nav-group">
            <div className="mobile-nav-parent-row">
              <NavLink
                to="/services/mobile-app-development"
                onClick={closeMenu}
                className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
              >
                Mobile Services
              </NavLink>
              <button
                type="button"
                className="mobile-submenu-toggle"
                onClick={(e) => toggleMobileSubmenu('services', e)}
                aria-label="Toggle Mobile Services submenu"
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${mobileExpanded.services ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}
                />
              </button>
            </div>
            {mobileExpanded.services && (
              <div className="mobile-sublinks">
                {SERVICES_DROPDOWN.map((service) => {
                  const Icon = service.icon
                  return (
                    <Link
                      key={service.slug}
                      to={`/services/mobile-app-development#${service.slug}`}
                      onClick={() => handleItemClick(service.slug, '/services/mobile-app-development')}
                      className="mobile-sublink"
                    >
                      <Icon size={16} className="text-blue-600 shrink-0" />
                      <span>{service.title}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* AI & OCR Apps Group */}
          <div className="mobile-nav-group">
            <div className="mobile-nav-parent-row">
              <NavLink
                to="/services/ai-ocr-app-development"
                onClick={closeMenu}
                className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
              >
                AI & OCR Apps
              </NavLink>
              <button
                type="button"
                className="mobile-submenu-toggle"
                onClick={(e) => toggleMobileSubmenu('apps', e)}
                aria-label="Toggle AI & OCR Apps submenu"
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${mobileExpanded.apps ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}
                />
              </button>
            </div>
            {mobileExpanded.apps && (
              <div className="mobile-sublinks">
                {APPS_DROPDOWN.map((app) => (
                  <Link
                    key={app.slug}
                    to={`/services/ai-ocr-app-development#${app.slug}`}
                    onClick={() => handleItemClick(app.slug, '/services/ai-ocr-app-development')}
                    className="mobile-sublink"
                  >
                    <img
                      src={app.iconUrl}
                      alt=""
                      className="w-4 h-4 rounded shrink-0 object-cover"
                    />
                    <span>{app.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/case-studies"
            onClick={closeMenu}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
          >
            Case Studies
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
          >
            About
          </NavLink>

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
