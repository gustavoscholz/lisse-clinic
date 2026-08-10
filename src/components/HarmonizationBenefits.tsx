import cardWatermark from '../assets/treatments/card-mark-gold.svg'
import type { SpecialtyMode } from '../data/site'
import { specialtyPages } from '../data/specialtyPages'
import type { SpecialtyBenefit } from '../types/content'

type BenefitsGroupProps = {
  benefits: readonly SpecialtyBenefit[]
  duplicate?: boolean
}

function BenefitsGroup({ benefits, duplicate = false }: BenefitsGroupProps) {
  return (
    <div
      className="harmonization-benefits__group"
      role={duplicate ? undefined : 'list'}
      aria-hidden={duplicate || undefined}
    >
      {benefits.map((benefit) => (
        <article
          className="harmonization-benefit-card"
          role={duplicate ? undefined : 'listitem'}
          key={benefit.id}
        >
          <img
            className="harmonization-benefit-card__watermark"
            src={cardWatermark}
            alt=""
            aria-hidden="true"
          />
          <span className="harmonization-benefit-card__icon" aria-hidden="true">
            <img src={benefit.icon} alt="" loading="lazy" decoding="async" />
          </span>
          <h2>{benefit.title}</h2>
          <p>{benefit.description}</p>
        </article>
      ))}
    </div>
  )
}

type SpecialtyBenefitsProps = {
  mode: SpecialtyMode
}

export function SpecialtyBenefits({ mode }: SpecialtyBenefitsProps) {
  const config = specialtyPages[mode]

  return (
    <section
      id={`diferenciais-${mode}`}
      className="harmonization-benefits"
      aria-label={config.benefitsLabel}
      data-specialty={mode}
    >
      <div
        className="harmonization-benefits__viewport"
        tabIndex={0}
        aria-label="Carrossel contínuo de diferenciais. Posicione o foco para pausar."
        data-reveal="fade"
      >
        <div className="harmonization-benefits__track">
          <BenefitsGroup benefits={config.benefits} />
          <BenefitsGroup benefits={config.benefits} duplicate />
        </div>

        <span className="harmonization-benefits__shade harmonization-benefits__shade--left" />
        <span className="harmonization-benefits__shade harmonization-benefits__shade--right" />
      </div>
    </section>
  )
}
