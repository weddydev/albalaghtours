import { Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ScrollTrigger } from '../../lib/gsap'
import { destroyLenis, initLenis, lockScroll, unlockScroll } from '../../lib/lenis'
import { AppReady } from '../../lib/appState'
import Preloader from './Preloader'
import Navbar from './Navbar'
import Footer from './Footer'
import AfterFirstPaint from '../ui/AfterFirstPaint'
import FloatingActions from './FloatingActions'
import CursorGlow from './CursorGlow'
import PageTransition from './PageTransition'
import Home from '../../pages/Home'
import NotFound from '../../pages/NotFound'
import { AlbaniaPage, ContactPage, DestinationsPage, HotelsPage, PackagesPage, prefetchAllRoutes, routeKey, ServicePage } from '../../lib/routes'
import { startDeferredSetups } from '../../hooks/useNearGSAP'

/** Mounts with the routed page; after a cold direct visit to a lazy page, re-measure every trigger. */
function RefreshOnMount() {
  useEffect(() => {
    if (!routeKey(window.location.pathname)) return // home & 404 are in the main bundle: nothing loaded late
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [])
  return null
}

/** Persistent shell: preloader (first load only), navbar, routed pages, footer. */
export default function Layout() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    initLenis()
    lockScroll() // until the preloader is done
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      destroyLenis()
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    unlockScroll()
    // after the hero's entrance has started: set up the remaining sections, then fetch other pages
    const t = setTimeout(() => {
      startDeferredSetups()
      prefetchAllRoutes()
    }, 1200)
    return () => clearTimeout(t)
  }, [ready])

  return (
    <AppReady.Provider value={ready}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink-800 focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Preloader onDone={() => setReady(true)} />
      <Navbar show={ready} />
      <PageTransition>
        {(location) => (
          <main id="main">
            <Suspense fallback={null}>
              <RefreshOnMount />
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services/:slug" element={<ServicePage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/hotels" element={<HotelsPage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/albania-work-visa" element={<AlbaniaPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        )}
      </PageTransition>
      <AfterFirstPaint frames={14}>
        <Footer />
      </AfterFirstPaint>
      <FloatingActions />
      <CursorGlow />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[95] opacity-[0.06] mix-blend-overlay" />
    </AppReady.Provider>
  )
}
