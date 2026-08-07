import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'
import decorMarkLeft from '../assets/about/decor-mark-left.svg'
import decorMarkRight from '../assets/about/decor-mark-right.svg'
import brandMark from '../assets/hero/brand-mark.svg'
import arrowIcon from '../assets/reviews/arrow.svg'
import googleIcon from '../assets/reviews/google-icon.png'
import starsIcon from '../assets/reviews/stars.svg'
import { reviews } from '../data/reviews'
import { externalLinks } from '../data/site'
import type { Review } from '../types/content'

type DragState = {
  pointerId: number
  startX: number
  startScrollLeft: number
}

function GoogleSummary() {
  return (
    <div className="reviews-summary" data-reveal="up">
      <div className="reviews-summary__identity">
        <img src={googleIcon} alt="Google" />
        <div>
          <strong>Lisse Clinic no Google</strong>
          <div className="reviews-summary__rating">
            <b>5.0</b>
            <img src={starsIcon} alt="5 estrelas" />
            <span>Avaliações de pacientes</span>
          </div>
        </div>
      </div>

      <a
        className="reviews-summary__link"
        href={externalLinks.googleReviews}
        target="_blank"
        rel="noreferrer"
      >
        Ver todas as avaliações no Google
        <img src={arrowIcon} alt="" aria-hidden="true" />
      </a>
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card">
      <header className="review-card__header">
        <div className="review-card__customer">
          <span className="review-card__avatar" aria-hidden="true">
            {review.avatar ? <img src={review.avatar} alt="" /> : null}
          </span>
          <strong>{review.author}</strong>
        </div>
        <img className="review-card__google" src={googleIcon} alt="Google" />
      </header>

      <div className="review-card__meta">
        <img src={starsIcon} alt={`${review.rating} estrelas`} />
        <span>{review.relativeDate}</span>
      </div>

      <blockquote>{review.quote}</blockquote>
      <p className="review-card__procedure">{review.procedure}</p>
    </article>
  )
}

export function Reviews() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef<DragState | null>(null)
  const scrollFrameRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(2)

  const getSlideLeft = useCallback((index: number) => {
    const viewport = viewportRef.current
    const slide = viewport?.querySelectorAll<HTMLElement>(
      '.reviews-carousel__slide',
    )[index]

    if (!viewport || !slide) return 0

    return slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2
  }, [])

  const scrollToIndex = useCallback(
    (requestedIndex: number, behavior?: ScrollBehavior) => {
      const viewport = viewportRef.current
      if (!viewport) return

      const nextIndex = Math.max(0, Math.min(requestedIndex, reviews.length - 1))
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      viewport.scrollTo({
        left: getSlideLeft(nextIndex),
        behavior: behavior ?? (reducedMotion ? 'auto' : 'smooth'),
      })
      setActiveIndex(nextIndex)
    },
    [getSlideLeft],
  )

  useLayoutEffect(() => {
    const positionInitialSlide = () => scrollToIndex(2, 'auto')
    const frame = window.requestAnimationFrame(positionInitialSlide)
    window.addEventListener('resize', positionInitialSlide)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', positionInitialSlide)
    }
  }, [scrollToIndex])

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
      }
    },
    [],
  )

  const findNearestSlide = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return 0

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2
    const slides = Array.from(
      viewport.querySelectorAll<HTMLElement>('.reviews-carousel__slide'),
    )

    return slides.reduce(
      (nearest, slide, index) => {
        const distance = Math.abs(
          slide.offsetLeft + slide.offsetWidth / 2 - viewportCenter,
        )
        return distance < nearest.distance ? { index, distance } : nearest
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index
  }, [])

  const handleScroll = () => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current)
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      setActiveIndex(findNearestSlide())
    })
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return

    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.dataset.dragging = 'true'
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    event.preventDefault()
    event.currentTarget.scrollLeft =
      dragState.startScrollLeft - (event.clientX - dragState.startX)
  }

  const finishPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    delete event.currentTarget.dataset.dragging
    dragStateRef.current = null
    scrollToIndex(findNearestSlide())
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollToIndex(activeIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollToIndex(activeIndex - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      scrollToIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      scrollToIndex(reviews.length - 1)
    }
  }

  return (
    <section
      id="avaliacoes"
      className="reviews-section"
      aria-labelledby="reviews-title"
    >
      <div className="reviews-section__decor" aria-hidden="true">
        <img
          className="reviews-section__decor-mark reviews-section__decor-mark--left"
          src={decorMarkLeft}
          alt=""
        />
        <img
          className="reviews-section__decor-mark reviews-section__decor-mark--right"
          src={decorMarkRight}
          alt=""
        />
      </div>

      <div className="reviews-section__inner">
        <header className="reviews-section__header" data-reveal="up">
          <p className="reviews-section__eyebrow">Avaliações</p>
          <h2 id="reviews-title">
            Experiências que refletem o nosso cuidado.
          </h2>
          <p>
            Relatos de quem confiou na Lisse Clinic e viveu uma experiência
            personalizada em cada etapa.
          </p>
        </header>

        <GoogleSummary />

        <div className="reviews-carousel" data-reveal="up">
          <div
            ref={viewportRef}
            className="reviews-carousel__viewport"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Avaliações de pacientes"
            tabIndex={0}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointerDrag}
            onPointerCancel={finishPointerDrag}
            onKeyDown={handleKeyDown}
          >
            {reviews.map((review, index) => (
              <div
                className="reviews-carousel__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${reviews.length}`}
                key={review.id}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          <span className="reviews-carousel__shade reviews-carousel__shade--left" />
          <span className="reviews-carousel__shade reviews-carousel__shade--right" />
        </div>

        <div className="reviews-carousel__dots" aria-label="Selecionar avaliação">
          {reviews.map((review, index) => (
            <button
              type="button"
              className="reviews-carousel__dot"
              data-active={activeIndex === index}
              aria-label={`Mostrar avaliação ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => scrollToIndex(index)}
              key={review.id}
            />
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite">
          Avaliação {activeIndex + 1} de {reviews.length}
        </p>

        <a
          className="reviews-section__cta"
          href={externalLinks.whatsapp}
          target="_blank"
          rel="noreferrer"
          data-reveal="up"
        >
          <span className="reviews-section__cta-mark" aria-hidden="true">
            <img src={brandMark} alt="" />
          </span>
          Desejo agendar minha consulta
        </a>
      </div>
    </section>
  )
}
