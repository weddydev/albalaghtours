import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { getLenis } from '../../lib/lenis'
import { isRouteReady, preloadPath } from '../../lib/routes'
import { LogoMark } from '../ui/Logo'

function resetScroll() {
  getLenis()?.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}

function afterSwap() {
  resetScroll()
  ScrollTrigger.refresh()
  window.dispatchEvent(new Event('albalagh:page'))
}

function Panel({ side }) {
  const left = side === 'left'
  return (
    <div
      className={`wipe-${side} absolute inset-y-0 w-1/2 overflow-hidden ${left ? 'left-0' : 'right-0'}`}
      style={{ background: `linear-gradient(${left ? 90 : 270}deg, #17110d 0%, #1f1510 60%, #2a1c14 100%)` }}
    >
      <div className="pattern-overlay absolute inset-0 opacity-[0.05]" />
      <div
        className={`absolute inset-y-0 w-[2px] bg-linear-to-b from-transparent via-gold-300 to-transparent shadow-[0_0_24px_4px_rgba(200,150,62,0.35)] ${
          left ? 'right-0' : 'left-0'
        }`}
      />
    </div>
  )
}

/** Airliner silhouette, nose to the right (the path is drawn nose-left, then mirrored). */
function Plane({ className = '' }) {
  return (
    <svg viewBox="0 0 64 24" className={className} aria-hidden="true">
      <path
        transform="translate(64 0) scale(-1 1)"
        d="M2 12.2c0-1 1-1.6 2.4-1.6H24L35 1h4.4L33.6 10.6H50l4.6-5.2h3.2L55.4 12l2.4 6.6h-3.2L50 13.4H33.6L39.4 23H35L24 13.4H4.4C3 13.4 2 13 2 12.2z"
        fill="#e6c285"
      />
    </svg>
  )
}

/**
 * Renders the routes for a "shown" location that lags the real one, so two panels can close
 * over the old page while a plane crosses the seam, the route swaps (scroll reset +
 * ScrollTrigger refresh), and the panels open on the new page. ~0.9s.
 * Same-path changes (hash only) swap instantly.
 * Lazy pages: the chunk starts loading as the panels close; if it is not in yet (it is normally
 * prefetched), the panels simply stay closed until it is.
 */
export default function PageTransition({ children }) {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  const root = useRef(null)
  const tl = useRef(null)

  useEffect(() => {
    if (location.key === shown.key) return
    if (location.pathname === shown.pathname) {
      setShown(location)
      return
    }
    // offline, or a stale tab after a new deploy: fall back to a normal page load
    const hardLoad = () => window.location.assign(location.pathname + location.search + location.hash)
    const chunk = preloadPath(location.pathname)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      chunk.then(() => {
        setShown(location)
        requestAnimationFrame(afterSwap)
      }, hardLoad)
      return
    }
    const swap = () => {
      flushSync(() => setShown(location))
      afterSwap()
    }
    const q = gsap.utils.selector(root)
    tl.current?.kill()
    tl.current = gsap
      .timeline({ defaults: { ease: 'power3.inOut' } })
      .set(root.current, { autoAlpha: 1 })
      .set(q('.wipe-trail'), { autoAlpha: 1 })
      .fromTo(q('.wipe-left'), { xPercent: -101 }, { xPercent: 0, duration: 0.36 }, 0)
      .fromTo(q('.wipe-right'), { xPercent: 101 }, { xPercent: 0, duration: 0.36 }, 0)
      // the plane crosses the whole screen, its contrail drawing behind it
      .fromTo(q('.wipe-plane'), { x: () => -0.15 * window.innerWidth, y: 26 }, { x: () => 1.1 * window.innerWidth, y: -26, duration: 0.95, ease: 'power1.inOut' }, 0)
      .fromTo(q('.wipe-trail'), { scaleX: 0 }, { scaleX: 1, duration: 0.95, ease: 'power1.inOut' }, 0)
      .fromTo(q('.wipe-mark'), { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.22, ease: 'power2.out' }, 0.2)
      .fromTo(q('.wipe-orbit'), { rotation: -40 }, { rotation: 140, duration: 0.9, ease: 'power2.inOut' }, 0.1)
      .call(
        () => {
          if (isRouteReady(location.pathname)) return swap()
          const t = tl.current
          t.pause()
          chunk.then(() => {
            if (tl.current !== t) return // a newer navigation took over
            swap()
            t.play()
          }, hardLoad)
        },
        null,
        0.42,
      )
      .to(q('.wipe-mark'), { autoAlpha: 0, scale: 1.1, duration: 0.18, ease: 'power2.in' }, 0.46)
      .to(q('.wipe-trail'), { autoAlpha: 0, duration: 0.3 }, 0.62)
      .to(q('.wipe-left'), { xPercent: -101, duration: 0.4 }, 0.52)
      .to(q('.wipe-right'), { xPercent: 101, duration: 0.4 }, 0.52)
      .set(root.current, { autoAlpha: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <>
      {children(shown)}
      <div ref={root} aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-[85] overflow-hidden">
        <Panel side="left" />
        <Panel side="right" />

        {/* dashed contrail, slightly tilted to follow the plane's climb */}
        <div className="absolute inset-x-0 top-1/2 -rotate-[2.5deg]">
          <div className="wipe-trail h-px w-full origin-left [background:repeating-linear-gradient(90deg,rgb(230_194_133/0.6)_0_10px,transparent_10px_18px)]" />
        </div>
        <div className="wipe-plane absolute left-0 top-1/2 -mt-4 w-16 -rotate-[2.5deg] sm:w-20">
          <Plane className="w-full drop-shadow-[0_0_14px_rgba(230,194,133,0.55)]" />
        </div>

        <div className="wipe-mark absolute inset-0 grid place-items-center">
          <div className="relative grid h-36 w-36 place-items-center rounded-full border border-gold-400/40 bg-ink-950/90 shadow-[0_0_60px_-10px_rgba(200,150,62,0.45)]">
            <div className="absolute inset-2 rounded-full border border-dashed border-gold-400/25" />
            {/* a tiny plane orbiting the globe */}
            <div className="wipe-orbit absolute inset-0">
              <Plane className="absolute -top-2 left-1/2 w-7 -translate-x-1/2" />
            </div>
            <LogoMark className="relative h-16 w-16" />
          </div>
        </div>
      </div>
    </>
  )
}
