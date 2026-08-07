import separatorMark from '../assets/hero/separator-mark.png'

type SpecialtyRailProps = {
  items: readonly string[]
  reveal?: boolean
}

export function SpecialtyRail({ items, reveal = false }: SpecialtyRailProps) {
  return (
    <div
      className="specialty-rail"
      aria-label="Especialidades"
      data-reveal={reveal ? 'fade' : undefined}
    >
      <div className="specialty-rail__track">
        {items.map((item, index) => (
          <div className="specialty-rail__item" key={item}>
            <span>{item}</span>
            {index < items.length - 1 && (
              <img src={separatorMark} alt="" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
