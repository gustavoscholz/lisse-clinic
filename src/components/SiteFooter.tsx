import brandLogo from '../assets/hero/brand-logo.svg'
import brandMark from '../assets/hero/brand-mark.svg'
import addressIcon from '../assets/information/address-icon.png'
import { externalLinks, type SiteMode } from '../data/site'

const highlights = [
  { label: 'Harmonização Corporal', mode: 'harmonizacao' },
  { label: 'Faloplastia', mode: 'faloplastia' },
  { label: 'Emagrecimento', mode: 'emagrecimento' },
] as const

const footerNavigation = [
  { label: 'Início', targetId: 'inicio', destination: 'inicio' },
  { label: 'Sobre a Lisse Clinic', targetId: 'sobre', destination: 'inicio' },
  { label: 'Tratamentos', targetId: 'tratamentos', destination: 'inicio' },
  { label: 'Equipe', targetId: 'equipe', destination: 'inicio' },
  { label: 'Resultados', targetId: 'resultados', destination: 'current' },
  { label: 'Feedbacks', targetId: 'avaliacoes', destination: 'current' },
] as const

type SiteFooterProps = {
  activeMode: SiteMode
  onNavigate: (mode: SiteMode, targetId: string) => void
}

function buildHref(mode: SiteMode, targetId: string) {
  return mode === 'inicio'
    ? `#${targetId}`
    : `?modo=${mode}#${targetId}`
}

export function SiteFooter({ activeMode, onNavigate }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand" data-reveal="up">
            <a
              className="site-footer__logo"
              href="#inicio"
              aria-label="Voltar ao início"
              onClick={(event) => {
                event.preventDefault()
                onNavigate('inicio', 'inicio')
              }}
            >
              <img src={brandLogo} alt="Lisse Clinic" />
            </a>
            <p>
              Estética, saúde e bem-estar com cuidado individual e protocolos
              personalizados.
            </p>
            <a
              className="site-footer__instagram"
              href={externalLinks.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Acessar o Instagram da Lisse Clinic"
            >
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle className="site-footer__instagram-dot" cx="17.4" cy="6.8" r="1" />
                </svg>
              </span>
              Siga-nos no Instagram
            </a>
          </div>

          <nav className="site-footer__column" aria-label="Destaques" data-reveal="up">
            <h2>Destaques</h2>
            <ul>
              {highlights.map((item) => (
                <li key={item.mode}>
                  <a
                    href={buildHref(item.mode, 'procedimentos')}
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate(item.mode, 'procedimentos')
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__column" aria-label="Navegação" data-reveal="up">
            <h2>Navegação</h2>
            <ul>
              {footerNavigation.map((item) => {
                const destinationMode =
                  item.destination === 'current' ? activeMode : 'inicio'

                return (
                  <li key={item.targetId}>
                    <a
                      href={buildHref(destinationMode, item.targetId)}
                      onClick={(event) => {
                        event.preventDefault()
                        onNavigate(destinationMode, item.targetId)
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="site-footer__column site-footer__contact" data-reveal="up">
            <h2>Contato</h2>
            <p className="site-footer__contact-row">
              <span aria-hidden="true">
                <img src={addressIcon} alt="" />
              </span>
              Pampulha — Belo Horizonte, MG
            </p>
            <p className="site-footer__contact-row">
              <span aria-hidden="true">☎</span>
              (31) 9999-9999
            </p>
            <a
              className="site-footer__whatsapp"
              href={externalLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">
                <img src={brandMark} alt="" />
              </span>
              Atendimento via WhatsApp
            </a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 Lisse Clinic</p>
          <p>
            Desenvolvido por <strong>Águia Digital</strong>
          </p>
        </div>
      </div>
    </footer>
  )
}
