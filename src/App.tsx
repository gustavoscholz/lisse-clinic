import { useEffect, useLayoutEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { AboutClinic } from './components/AboutClinic'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { SpecialtyBenefits } from './components/HarmonizationBenefits'
import { SpecialtyProcedures } from './components/HarmonizationProcedures'
import { Information } from './components/Information'
import { Results } from './components/Results'
import { Reviews } from './components/Reviews'
import { SiteFooter } from './components/SiteFooter'
import { Team } from './components/Team'
import { Treatments } from './components/Treatments'
import {
  isSiteMode,
  type SiteMode,
  type SpecialtyMode,
} from './data/site'
import { useScrollReveal } from './hooks/useScrollReveal'

function readModeFromLocation(): SiteMode {
  const requestedMode = new URLSearchParams(window.location.search).get('modo')
  return isSiteMode(requestedMode) ? requestedMode : 'inicio'
}

type NavigateOptions = {
  instantScroll?: boolean
  transition?: boolean
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    finished: Promise<void>
  }
}

function App() {
  const [siteMode, setSiteMode] = useState<SiteMode>(readModeFromLocation)
  const [navigationRevision, setNavigationRevision] = useState(0)

  useScrollReveal(siteMode)

  useEffect(() => {
    const updateFromHistory = () => {
      setSiteMode(readModeFromLocation())
      setNavigationRevision((revision) => revision + 1)
    }

    window.addEventListener('popstate', updateFromHistory)
    return () => window.removeEventListener('popstate', updateFromHistory)
  }, [])

  useLayoutEffect(() => {
    const targetId = window.location.hash.slice(1) || 'inicio'

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [navigationRevision, siteMode])

  const navigate = (
    mode: SiteMode,
    targetId: string,
    options: NavigateOptions = {},
  ) => {
    const commitNavigation = () => {
      const nextUrl = new URL(window.location.href)
      const root = document.documentElement

      if (options.instantScroll) {
        root.classList.add('is-instant-navigation')
      }

      if (mode === 'inicio') {
        nextUrl.searchParams.delete('modo')
      } else {
        nextUrl.searchParams.set('modo', mode)
      }

      nextUrl.hash = targetId
      window.history.pushState({}, '', nextUrl)

      flushSync(() => {
        setSiteMode(mode)
        setNavigationRevision((revision) => revision + 1)
      })

      if (options.instantScroll) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            root.classList.remove('is-instant-navigation')
          })
        })
      }
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const transitionDocument = document as ViewTransitionDocument

    if (
      options.transition &&
      !reduceMotion &&
      transitionDocument.startViewTransition
    ) {
      transitionDocument.startViewTransition(commitNavigation)
      return
    }

    commitNavigation()
  }

  const navigateFromTreatment = (mode: SpecialtyMode) => {
    navigate(mode, 'inicio', { instantScroll: true, transition: true })
  }

  const isHome = siteMode === 'inicio'
  const specialtyMode = isHome ? null : siteMode

  return (
    <>
      <main>
        <Hero mode={siteMode} onNavigate={navigate} />
        {!specialtyMode ? (
          <>
            <AboutClinic />
            <Treatments onNavigate={navigateFromTreatment} />
            <Team />
            <Results />
            <Reviews />
            <Information />
            <Contact />
          </>
        ) : (
          <>
            <SpecialtyProcedures mode={specialtyMode} />
            <SpecialtyBenefits mode={specialtyMode} />
            <Results />
            <Reviews />
            <Information />
          </>
        )}
      </main>
      <SiteFooter activeMode={siteMode} onNavigate={navigate} />
    </>
  )
}

export default App
