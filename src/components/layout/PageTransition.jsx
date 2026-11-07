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

function DoorPanel({ side }) {
  const left = side === 'left'
  return (
    <div
      className={`wipe-${side} absolute inset-y-0 w-1/2 overflow-hidden ${left ? 'left-0' : 'right-0'}`}
      style={{ background: `linear-gradient(${left ? 90 : 270}deg, #03110b 0%, #082a1c 70%, #0d3b28 100%)` }}
    >
      <div className="pattern-overlay absolute inset-0 opacity-[0.07]" />
      <div className={`absolute inset-y-[6%] w-px bg-gold-400/30 ${left ? 'right-10' : 'left-10'}`} />
      <div
        className={`absolute inset-y-0 w-[3px] bg-linear-to-b from-gold-100 via-gold-300 to-gold-500 shadow-[0_0_30px_6px_rgba(232,207,122,0.45)] ${
          left ? 'right-0' : 'left-0'
        }`}
      />
      <div className={`absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border-2 border-gold-300/80 ${left ? 'right-6' : 'left-6'}`} />
    </div>
  )
}

/**
 * Renders the routes for a "shown" location that lags the real one, so a pair of gold
 * doors can close over the old page, the route swaps (scroll reset + ScrollTrigger refresh),
 * and the doors open on the new page. ~0.8s. Same-path changes (hash only) swap instantly.
 * Lazy pages: the chunk starts loading as the doors close; if it is not in yet (it is normally
 * prefetched), the doors simply stay closed until it is.
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
      .fromTo(q('.wipe-left'), { xPercent: -101 }, { xPercent: 0, duration: 0.36 }, 0)
      .fromTo(q('.wipe-right'), { xPercent: 101 }, { xPercent: 0, duration: 0.36 }, 0)
      .fromTo(q('.wipe-mark'), { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.22, ease: 'power2.out' }, 0.2)
      .call(() => {
        if (isRouteReady(location.pathname)) return swap()
        const t = tl.current
        t.pause()
        chunk.then(() => {
          if (tl.current !== t) return // a newer navigation took over
          swap()
          t.play()
        }, hardLoad)
      })
      .to(q('.wipe-mark'), { autoAlpha: 0, scale: 1.1, duration: 0.18, ease: 'power2.in' }, '+=0.04')
      .to(q('.wipe-left'), { xPercent: -101, duration: 0.4 }, '<0.06')
      .to(q('.wipe-right'), { xPercent: 101, duration: 0.4 }, '<')
      .set(root.current, { autoAlpha: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <>
      {children(shown)}
      <div ref={root} aria-hidden="true" className="pointer-events-none invisible fixed inset-0 z-[85]">
        <DoorPanel side="left" />
        <DoorPanel side="right" />
        <div className="wipe-mark absolute inset-0 grid place-items-center">
          <div className="relative grid h-44 w-32 place-items-center">
            <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path
                d="M4 138V52C4 32 30 24 42 14 47 10 49 6 50 2c1 4 3 8 8 12 12 10 38 18 38 38v86"
                fill="#05190f"
                stroke="#e8cf7a"
                strokeWidth="1.5"
              />
              <path d="M12 138V55c0-16 22-24 32-32 4-3 5-6 6-9 1 3 2 6 6 9 10 8 32 16 32 32v83" fill="none" stroke="#d4af37" strokeOpacity="0.5" />
            </svg>
            <LogoMark className="relative mt-6 h-14 w-14" />
          </div>
        </div>
      </div>
    </>
  )
}
