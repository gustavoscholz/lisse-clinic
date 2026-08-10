import decorLowerLeft from '../assets/treatments/decor-mark-lower-left.svg'
import decorLowerRight from '../assets/treatments/decor-mark-lower-right.svg'
import decorUpperLeft from '../assets/treatments/decor-mark-upper-left.svg'
import decorUpperRight from '../assets/treatments/decor-mark-upper-right.svg'
import decorRingCenter from '../assets/treatments/decor-ring-center.svg'
import decorRingLeft from '../assets/treatments/decor-ring-left.svg'
import decorRingRight from '../assets/treatments/decor-ring-right.svg'
import brandMark from '../assets/hero/brand-mark.svg'
import {
  externalLinks,
  treatmentSpecialties,
  type SpecialtyMode,
} from '../data/site'
import { treatments } from '../data/treatments'
import { SpecialtyRail } from './SpecialtyRail'
import { TreatmentCard } from './TreatmentCard'

type TreatmentsProps = {
  onNavigate: (mode: SpecialtyMode) => void
}

export function Treatments({ onNavigate }: TreatmentsProps) {
  return (
    <section
      id="tratamentos"
      className="treatments-section"
      aria-labelledby="treatments-title"
    >
      <SpecialtyRail items={treatmentSpecialties} reveal variant="hero" />

      <div className="treatments-section__decor" aria-hidden="true">
        <img className="treatments-section__ring treatments-section__ring--left" src={decorRingLeft} alt="" />
        <img className="treatments-section__ring treatments-section__ring--center" src={decorRingCenter} alt="" />
        <img className="treatments-section__ring treatments-section__ring--right" src={decorRingRight} alt="" />
        <img className="treatments-section__mark treatments-section__mark--upper-left" src={decorUpperLeft} alt="" />
        <img className="treatments-section__mark treatments-section__mark--upper-right" src={decorUpperRight} alt="" />
        <img className="treatments-section__mark treatments-section__mark--lower-left" src={decorLowerLeft} alt="" />
        <img className="treatments-section__mark treatments-section__mark--lower-right" src={decorLowerRight} alt="" />
      </div>

      <div className="treatments-section__inner">
        <header className="treatments-section__header" data-reveal="up">
          <p className="treatments-section__eyebrow">Nossos tratamentos</p>
          <h2 id="treatments-title">Cuidados especializados para cada objetivo.</h2>
          <p>
            Protocolos faciais, corporais e de saúde definidos
            <br />
            a partir de uma avaliação individual.
          </p>
        </header>

        <div className="treatments-section__cards">
          {treatments.map((treatment) => (
            <TreatmentCard
              treatment={treatment}
              onNavigate={onNavigate}
              key={treatment.id}
            />
          ))}
        </div>

        <div className="treatments-section__cta" data-reveal="up">
          <div className="treatments-section__cta-copy">
            <h3>Não sabe qual cuidado combina com seu objetivo?</h3>
            <p>Agende uma avaliação e receba uma orientação personalizada.</p>
          </div>
          <a
            className="treatments-section__cta-button brand-cta"
            href={externalLinks.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <span className="treatments-section__cta-mark brand-cta__mark" aria-hidden="true">
              <img src={brandMark} alt="" />
            </span>
            <span className="brand-cta__label">Desejo tirar dúvidas via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
