import { useEffect, useLayoutEffect, useState } from 'react'
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
import { isSiteMode, type SiteMode } from './data/site'
import { useScrollReveal } from './hooks/useScrollReveal'

function readModeFromLocation(): SiteMode {
  const requestedMode = new URLSearchParams(window.location.search).get('modo')
  return isSiteMode(requestedMode) ? requestedMode : 'inicio'
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

  const navigate = (mode: SiteMode, targetId: string) => {
    const nextUrl = new URL(window.location.href)

    if (mode === 'inicio') {
      nextUrl.searchParams.delete('modo')
    } else {
      nextUrl.searchParams.set('modo', mode)
    }

    nextUrl.hash = targetId
    window.history.pushState({}, '', nextUrl)
    setSiteMode(mode)
    setNavigationRevision((revision) => revision + 1)
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
            <Treatments />
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
