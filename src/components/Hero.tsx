import backgroundMark from '../assets/hero/background-mark.png'
import brandMark from '../assets/hero/brand-mark.svg'
import homeCurveCenter from '../assets/hero/decor-curve-center.svg'
import homeCurveRight from '../assets/hero/decor-curve-right.svg'
import homeGlow from '../assets/hero/decor-circle.svg'
import homeRibbon from '../assets/hero/decor-ribbon.svg'
import harmonizationMedallion from '../assets/hero/harmonization-medallion.png'
import kellyCutout from '../assets/hero/kelly-cutout.png'
import { externalLinks, specialties, type SiteMode } from '../data/site'
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
      className={`hero hero--${mode}${specialtyMode ? ' hero--specialty' : ' hero--home'}`}
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
              <div className="hero__home-backdrop" />
              <img className="hero__home-glow" src={homeGlow} alt="" />
              <img
                className="hero__home-ribbon"
                src={homeRibbon}
                alt=""
              />
              <img
                className="hero__home-curve hero__home-curve--center"
                src={homeCurveCenter}
                alt=""
              />
              <img
                className="hero__home-curve hero__home-curve--right"
                src={homeCurveRight}
                alt=""
              />
              <div className="hero__kelly-frame">
                <img className="hero__kelly" src={kellyCutout} alt="" />
              </div>
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
              <p className="eyebrow hero__location-signature">
                <span className="hero__location-mark" aria-hidden="true">
                  <img src={brandMark} alt="" />
                </span>
                <span>Lisse Clinic</span>
                <span>Belo Horizonte</span>
              </p>
              <h1 id="hero-title">
                <span>Sua beleza, com</span>
                <span>cuidado e exclusividade.</span>
              </h1>
              <p className="hero__description">
                Protocolos personalizados para rosto, corpo, saúde e bem-estar,
                conduzidos por uma equipe multiprofissional
              </p>
            </>
          )}

          <div className="hero__actions" aria-label="Ações principais">
            <a
              className="button button--primary"
              href={externalLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Agendar avaliação
            </a>
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

      <SpecialtyRail items={specialties} variant="hero" />

      {!specialtyConfig && (
        <div className="hero__mark-mobile" aria-hidden="true">
          <img src={brandMark} alt="" />
        </div>
      )}
    </section>
  )
}
