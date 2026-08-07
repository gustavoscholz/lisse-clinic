import cardWatermark from '../assets/treatments/card-mark-gold.svg'
import { harmonizationBenefits } from '../data/harmonizationBenefits'

type BenefitsGroupProps = {
  duplicate?: boolean
}

function BenefitsGroup({ duplicate = false }: BenefitsGroupProps) {
  return (
    <div
      className="harmonization-benefits__group"
      role={duplicate ? undefined : 'list'}
      aria-hidden={duplicate || undefined}
    >
      {harmonizationBenefits.map((benefit) => (
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

export function HarmonizationBenefits() {
  return (
    <section
      id="diferenciais-harmonizacao"
      className="harmonization-benefits"
      aria-label="Diferenciais dos tratamentos de harmonização"
    >
      <div
        className="harmonization-benefits__viewport"
        tabIndex={0}
        aria-label="Carrossel contínuo de diferenciais. Posicione o foco para pausar."
        data-reveal="fade"
      >
        <div className="harmonization-benefits__track">
          <BenefitsGroup />
          <BenefitsGroup duplicate />
        </div>

        <span className="harmonization-benefits__shade harmonization-benefits__shade--left" />
        <span className="harmonization-benefits__shade harmonization-benefits__shade--right" />
      </div>
    </section>
  )
}
