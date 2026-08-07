import { useEffect, useState } from 'react'
import brandLogo from '../assets/hero/brand-logo.svg'
import brandMark from '../assets/hero/brand-mark.svg'
import { navigationItems, type SiteMode } from '../data/site'

type HeaderProps = {
  activeMode: SiteMode
  onNavigate: (mode: SiteMode, targetId: string) => void
}

export function Header({ activeMode, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = (mode: SiteMode, targetId: string) => {
    setMenuOpen(false)
    onNavigate(mode, targetId)
  }

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          className="brand"
          href="#inicio"
          aria-label="Lisse Clinic — início"
          onClick={(event) => {
            event.preventDefault()
            navigate('inicio', 'inicio')
          }}
        >
          <img src={brandLogo} alt="Lisse Clinic" />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.activeFor === activeMode ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                navigate(item.mode, item.targetId)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <span className="contact-pill" aria-disabled="true">
          <span className="contact-pill__mark" aria-hidden="true">
            <img src={brandMark} alt="" />
          </span>
          Entre em contato
        </span>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className="mobile-nav"
        data-open={menuOpen}
        aria-label="Navegação mobile"
      >
        {navigationItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-current={item.activeFor === activeMode ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault()
              navigate(item.mode, item.targetId)
            }}
          >
            {item.label}
          </a>
        ))}
        <span aria-disabled="true">Entre em contato</span>
      </nav>
    </header>
  )
}
