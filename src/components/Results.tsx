import decorMarkLeft from '../assets/about/decor-mark-left.svg'
import decorMarkRight from '../assets/about/decor-mark-right.svg'
import brandMark from '../assets/hero/brand-mark.svg'
import { externalLinks } from '../data/site'
import { resultCases } from '../data/results'
import type { ResultCase } from '../types/content'

type ResultCardProps = {
  result: ResultCase
  isClone?: boolean
}

type ResultRowProps = {
  results: ResultCase[]
  rowIndex: number
}

const resultsRows = Array.from({ length: 4 }, (_, index) =>
  resultCases.slice(index * 3, index * 3 + 3),
)

function ResultCard({ result, isClone = false }: ResultCardProps) {
  const imageStyle = result.crop
    ? {
        width: `${result.crop.width}%`,
        height: `${result.crop.height}%`,
        left: `${result.crop.left}%`,
        top: `${result.crop.top}%`,
      }
    : undefined

  return (
    <figure className="results-card" role={isClone ? undefined : 'listitem'}>
      <img
        className={`results-card__image${result.fit === 'cover' ? ' results-card__image--cover' : ''}`}
        src={result.image}
        alt={isClone ? '' : result.alt}
        style={imageStyle}
        loading="lazy"
        decoding="async"
      />

      <span className="results-card__divider" aria-hidden="true" />
      <span className="results-card__watermark" aria-hidden="true">
        <img src={brandMark} alt="" />
        <span>Lisse</span>
      </span>
      <span className="results-card__label results-card__label--before">
        Antes
      </span>
      <span className="results-card__label results-card__label--after">
        Depois
      </span>
    </figure>
  )
}

function ResultRow({ results, rowIndex }: ResultRowProps) {
  const direction = rowIndex % 2 === 0 ? 'right' : 'left'

  return (
    <div
      className={`results-marquee results-marquee--${direction}`}
      role="group"
      aria-label={`Resultados estéticos, fileira ${rowIndex + 1} de 4`}
      tabIndex={0}
    >
      <div className="results-marquee__track">
        <div className="results-marquee__group" role="list">
          {results.map((result) => (
            <ResultCard result={result} key={result.id} />
          ))}
        </div>

        {[1, 2].map((copy) => (
          <div
            className="results-marquee__group results-marquee__group--clone"
            aria-hidden="true"
            key={copy}
          >
            {results.map((result) => (
              <ResultCard
                result={result}
                isClone
                key={`${result.id}-copy-${copy}`}
              />
            ))}
          </div>
        ))}
      </div>

      <span
        className="results-marquee__shade results-marquee__shade--left"
        aria-hidden="true"
      />
      <span
        className="results-marquee__shade results-marquee__shade--right"
        aria-hidden="true"
      />
    </div>
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

        <div className="results-section__marquees" data-reveal="up">
          {resultsRows.map((results, index) => (
            <ResultRow
              results={results}
              rowIndex={index}
              key={`results-row-${index + 1}`}
            />
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
