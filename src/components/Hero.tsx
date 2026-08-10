import clinicBackground from '../assets/hero/clinic-background.png'
import backgroundMark from '../assets/hero/background-mark.png'
import brandMark from '../assets/hero/brand-mark.svg'
import harmonizationMedallion from '../assets/hero/harmonization-medallion.png'
import professionals from '../assets/hero/professionals.png'
import { specialties, type SiteMode } from '../data/site'
import { specialtyPages } from '../data/specialtyPages'
import { Header } from './Header'
import { SpecialtyRail } from './SpecialtyRail'

type HeroProps = {
  mode: SiteMode
  onNavigate: (mode: SiteMode, targetId: string) => void
}

export function Hero({ mode, onNavigate }: HeroProps) {
  const specialtyMode = mode === 'inicio' ? null : mode
  const specialtyConfig = specialtyMode
    ? specialtyPages[specialtyMode]
    : null

  return (
    <section
      id="inicio"
      className={`hero${specialtyMode ? ` hero--specialty hero--${specialtyMode}` : ''}`}
      aria-labelledby="hero-title"
    >
      <Header activeMode={mode} onNavigate={onNavigate} />

      <div className="hero__stage">
        <div className="hero__visual" aria-hidden="true">
          {specialtyConfig && specialtyMode ? (
            <>
              <img
                className="hero__harmonization-background-mark"
                src={backgroundMark}
                alt=""
              />
              <img
                className={`hero__harmonization-photo hero__specialty-photo hero__specialty-photo--${specialtyConfig.hero.imageKind}`}
                src={specialtyConfig.hero.image}
                alt=""
              />
              <span className="hero__harmonization-medallion">
                <img src={harmonizationMedallion} alt="" />
              </span>
            </>
          ) : (
            <>
              <img className="hero__clinic" src={clinicBackground} alt="" />
              <div className="hero__clinic-fade" />
              <img className="hero__background-mark" src={backgroundMark} alt="" />
              <img className="hero__professionals" src={professionals} alt="" />
            </>
          )}
        </div>

        <div className="hero__content">
          {specialtyConfig ? (
            <>
              <p className="eyebrow">{specialtyConfig.hero.eyebrow}</p>
              <h1 id="hero-title">
                {specialtyConfig.hero.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className="hero__description">
                {specialtyConfig.hero.description}
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow">Lisse Clinic | Belo Horizonte</p>
              <h1 id="hero-title">
                <span>Suas beleza, com</span>
                <span>cuidado e exclusividade.</span>
              </h1>
              <p className="hero__description">
                Protocolos personalizados para rosto, corpo, saúde e bem estar,
                conduzidos por uma equipe multiprofissional
              </p>
            </>
          )}

          <div className="hero__actions" aria-label="Ações principais">
            <span className="button button--primary" aria-disabled="true">
              Agendar avaliação
            </span>
            {specialtyConfig ? (
              <a className="button button--link" href="#procedimentos">
                Conhecer tratamentos
              </a>
            ) : (
              <a className="button button--link" href="#tratamentos">
                Conhecer tratamentos
              </a>
            )}
          </div>
        </div>
      </div>

      <SpecialtyRail items={specialties} />

      {!specialtyConfig && (
        <div className="hero__mark-mobile" aria-hidden="true">
          <img src={brandMark} alt="" />
        </div>
      )}
    </section>
  )
}
