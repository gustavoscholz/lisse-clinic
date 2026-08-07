import decorMarkLeft from '../assets/about/decor-mark-left.svg'
import decorMarkRight from '../assets/about/decor-mark-right.svg'
import { harmonizationProcedures } from '../data/harmonizationProcedures'
import type { HarmonizationProcedure } from '../types/content'

type ProcedureCardProps = {
  procedure: HarmonizationProcedure
}

function ProcedureCard({ procedure }: ProcedureCardProps) {
  return (
    <article
      className={`harmonization-procedure harmonization-procedure--image-${procedure.imageSide}`}
      data-reveal="up"
    >
      <div className="harmonization-procedure__image">
        <img
          src={procedure.image}
          alt={procedure.imageAlt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="harmonization-procedure__copy">
        <p className="harmonization-procedure__eyebrow">
          {procedure.eyebrow}
        </p>
        <h3>{procedure.title}</h3>
        <p className="harmonization-procedure__highlights">
          {procedure.highlights.map((highlight, index) => (
            <span key={highlight}>
              {highlight}
              {index < procedure.highlights.length - 1 && (
                <span aria-hidden="true"> • </span>
              )}
            </span>
          ))}
        </p>
        <p className="harmonization-procedure__description">
          {procedure.description}
        </p>
        <p className="harmonization-procedure__indication-label">
          Indicado para:
        </p>
        <div
          className="harmonization-procedure__tags"
          aria-label="Indicações"
        >
          {procedure.indications.map((indication) => (
            <span key={indication}>{indication}</span>
          ))}
        </div>
        <span
          className="harmonization-procedure__explore"
          aria-disabled="true"
        >
          Explorar especialidade
        </span>
      </div>
    </article>
  )
}

export function HarmonizationProcedures() {
  return (
    <section
      id="procedimentos"
      className="harmonization-procedures"
      aria-labelledby="harmonization-procedures-title"
    >
      <div className="harmonization-procedures__decor" aria-hidden="true">
        <img
          className="harmonization-procedures__mark harmonization-procedures__mark--upper-left"
          src={decorMarkLeft}
          alt=""
        />
        <img
          className="harmonization-procedures__mark harmonization-procedures__mark--middle-right"
          src={decorMarkRight}
          alt=""
        />
        <img
          className="harmonization-procedures__mark harmonization-procedures__mark--lower-right"
          src={decorMarkRight}
          alt=""
        />
      </div>

      <div className="harmonization-procedures__inner">
        <header className="harmonization-procedures__header" data-reveal="up">
          <p className="harmonization-procedures__eyebrow">
            Sobre os procedimentos
          </p>
          <h2 id="harmonization-procedures-title">
            Cuidados pensados para o que você deseja transformar.
          </h2>
          <p>
            Na Lisse, cada protocolo é definido após uma avaliação individual,
            considerando suas características, necessidades e objetivos.
          </p>
        </header>

        <div className="harmonization-procedures__list">
          {harmonizationProcedures.map((procedure) => (
            <ProcedureCard procedure={procedure} key={procedure.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
