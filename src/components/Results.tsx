import decorMarkLeft from '../assets/about/decor-mark-left.svg'
import decorMarkRight from '../assets/about/decor-mark-right.svg'
import brandMark from '../assets/hero/brand-mark.svg'
import { externalLinks } from '../data/site'
import { resultCases } from '../data/results'
import type { ResultCase } from '../types/content'

type ResultCardProps = {
  result: ResultCase
  index: number
}

function ResultCard({ result, index }: ResultCardProps) {
  const imageStyle = result.crop
    ? {
        width: `${result.crop.width}%`,
        height: `${result.crop.height}%`,
        left: `${result.crop.left}%`,
        top: `${result.crop.top}%`,
      }
    : undefined

  return (
    <figure
      className="results-card"
      data-reveal="up"
      data-reveal-delay={index % 3 === 1 ? '1' : undefined}
    >
      <img
        className={`results-card__image${result.fit === 'cover' ? ' results-card__image--cover' : ''}`}
        src={result.image}
        alt={result.alt}
        style={imageStyle}
        loading="lazy"
        decoding="async"
      />

      <span className="results-card__divider" aria-hidden="true" />
      <span className="results-card__label results-card__label--before">
        Antes
      </span>
      <span className="results-card__label results-card__label--after">
        Depois
      </span>
    </figure>
  )
}

export function Results() {
  return (
    <section
      id="resultados"
      className="results-section"
      aria-labelledby="results-title"
    >
      <div className="results-section__decor" aria-hidden="true">
        <img
          className="results-section__decor-mark results-section__decor-mark--left"
          src={decorMarkLeft}
          alt=""
        />
        <img
          className="results-section__decor-mark results-section__decor-mark--right"
          src={decorMarkRight}
          alt=""
        />
      </div>

      <div className="results-section__inner">
        <header className="results-section__header" data-reveal="up">
          <p className="results-section__eyebrow">Nossos resultados</p>
          <h2 id="results-title">
            Transformações que preservam a sua essência.
          </h2>
          <p>
            Uma equipe multiprofissional que une experiência, escuta e cuidado
            personalizado em cada etapa.
          </p>
        </header>

        <div className="results-section__grid">
          {resultCases.map((result, index) => (
            <ResultCard result={result} index={index} key={result.id} />
          ))}
        </div>

        <a
          className="results-section__cta"
          href={externalLinks.whatsapp}
          target="_blank"
          rel="noreferrer"
          data-reveal="up"
        >
          <span className="results-section__cta-mark" aria-hidden="true">
            <img src={brandMark} alt="" />
          </span>
          Agendar avaliação
        </a>
      </div>
    </section>
  )
}
