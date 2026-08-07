import brandLogo from '../assets/hero/brand-logo.svg'
import brandMark from '../assets/hero/brand-mark.svg'
import addressIcon from '../assets/information/address-icon.png'
import { externalLinks } from '../data/site'

const highlights = [
  'Harmonização Corporal',
  'Faloplastia',
  'Emagrecimento',
] as const

const footerNavigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre a Lisse Clinic', href: '#sobre' },
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Feedbacks', href: '#avaliacoes' },
] as const

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand" data-reveal="up">
            <a href="#inicio" aria-label="Voltar ao início">
              <img src={brandLogo} alt="Lisse Clinic" />
            </a>
            <p>
              Estética, saúde e bem-estar com cuidado individual e protocolos
              personalizados.
            </p>
            <span className="site-footer__instagram" aria-disabled="true">
              <span aria-hidden="true">◎</span>
              Siga-nos no Instagram
            </span>
          </div>

          <nav className="site-footer__column" aria-label="Destaques" data-reveal="up">
            <h2>Destaques</h2>
            <ul>
              {highlights.map((item) => (
                <li key={item}>
                  <a href="#tratamentos">{item}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__column" aria-label="Navegação" data-reveal="up">
            <h2>Navegação</h2>
            <ul>
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
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
