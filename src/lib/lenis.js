import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis = null

// Phones/tablets keep native scrolling (smooth, momentum, no JS on the scroll path).
// Lenis only smooths wheel/trackpad input, so it is pointless — and doubles ScrollTrigger work — on touch.
const touchDevice = () => window.matchMedia('(hover: none), (pointer: coarse)').matches
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initLenis() {
  if (lenis || reducedMotion() || touchDevice()) return lenis
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

function tick(time) {
  lenis?.raf(time * 1000)
}

export function destroyLenis() {
  gsap.ticker.remove(tick)
  lenis?.destroy()
  lenis = null
}

export const getLenis = () => lenis

/** Freeze / release page scrolling (menus, dialogs, preloader) with or without Lenis. */
export function lockScroll() {
  if (lenis) lenis.stop()
  else document.documentElement.style.overflow = 'hidden'
}
export function unlockScroll() {
  if (lenis) lenis.start()
  else document.documentElement.style.overflow = ''
}

/** Smooth-scroll to a y position, selector or element. Returns false if the target is missing. */
export function scrollToTarget(target, offset = -80) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el == null) return false
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
    return true
  }
  const top = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' })
  return true
}
