import separatorMark from '../assets/hero/separator-mark.png'
import cardMarkGold from '../assets/treatments/card-mark-gold.svg'
import cardMedallion from '../assets/treatments/logo-cards.png'
import type { Treatment } from '../types/content'

type TreatmentCardProps = {
  treatment: Treatment
}

function TreatmentImage({ treatment }: TreatmentCardProps) {
  return (
    <div className="treatment-card__image">
      <img src={treatment.image} alt={`Atendimento de ${treatment.eyebrow}`} />
    </div>
  )
}

function TreatmentCopy({ treatment }: TreatmentCardProps) {
  return (
    <div className="treatment-card__copy">
      <p className="treatment-card__eyebrow">{treatment.eyebrow}</p>
      <h3>{treatment.title}</h3>
      <p className="treatment-card__highlights">
        {treatment.highlights.map((highlight, index) => (
          <span key={highlight}>
            {highlight}
            {index < treatment.highlights.length - 1 && (
              <span className="treatment-card__bullet" aria-hidden="true">
                {' '}•{' '}
              </span>
            )}
          </span>
        ))}
      </p>
      <p className="treatment-card__description">{treatment.description}</p>
      <div className="treatment-card__tags" aria-label="Benefícios">
        {treatment.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <span className="treatment-card__explore" aria-disabled="true">
        Explorar especialidade
      </span>
    </div>
  )
}

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  const image = <TreatmentImage treatment={treatment} />
  const copy = <TreatmentCopy treatment={treatment} />

  return (
    <article
      className={`treatment-card treatment-card--${treatment.tone} treatment-card--image-${treatment.imageSide}`}
      data-reveal="up"
    >
      <div className="treatment-card__watermark" aria-hidden="true">
        <img
          src={treatment.tone === 'gold' ? cardMarkGold : separatorMark}
          alt=""
        />
      </div>

      {image}
      {copy}

      {treatment.hasMedallion && (
        <img
          className="treatment-card__medallion"
          src={cardMedallion}
          alt=""
          aria-hidden="true"
        />
      )}
    </article>
  )
}
