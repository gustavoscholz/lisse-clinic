import { useEffect, useLayoutEffect, useState } from 'react'
import { AboutClinic } from './components/AboutClinic'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { HarmonizationBenefits } from './components/HarmonizationBenefits'
import { HarmonizationProcedures } from './components/HarmonizationProcedures'
import { Information } from './components/Information'
import { Results } from './components/Results'
import { Reviews } from './components/Reviews'
import { SiteFooter } from './components/SiteFooter'
import { Team } from './components/Team'
import { Treatments } from './components/Treatments'
import type { SiteMode } from './data/site'
import { useScrollReveal } from './hooks/useScrollReveal'

function readModeFromLocation(): SiteMode {
  return new URLSearchParams(window.location.search).get('modo') ===
    'harmonizacao'
    ? 'harmonizacao'
    : 'inicio'
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

    if (mode === 'harmonizacao') {
      nextUrl.searchParams.set('modo', 'harmonizacao')
    } else {
      nextUrl.searchParams.delete('modo')
    }

    nextUrl.hash = targetId
    window.history.pushState({}, '', nextUrl)
    setSiteMode(mode)
    setNavigationRevision((revision) => revision + 1)
  }

  const isHome = siteMode === 'inicio'

  return (
    <>
      <main>
        <Hero mode={siteMode} onNavigate={navigate} />
        {isHome ? (
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
            <HarmonizationProcedures />
            <HarmonizationBenefits />
            <Results />
            <Reviews />
            <Information />
          </>
        )}
      </main>
      <SiteFooter />
    </>
  )
}

export default App
