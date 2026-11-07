import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'

// Register every plugin exactly once for the whole app.
gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, DrawSVGPlugin, Flip, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })
// mobile URL-bar show/hide must not trigger a full ScrollTrigger refresh mid-scroll
ScrollTrigger.config({ ignoreMobileResize: true })

/* Every infinite animation (repeat: -1) created in a gsap.context — including inside gsap.matchMedia. */
function infiniteLoops(ctx) {
  const out = []
  const walk = (item) => {
    if (!item) return
    if (Array.isArray(item.contexts)) item.contexts.forEach(walk) // gsap.matchMedia()
    if (Array.isArray(item.data) && typeof item.add === 'function') return item.data.forEach(walk) // nested context
    if (typeof item.repeat === 'function' && item.repeat() === -1 && !item.scrollTrigger) out.push(item)
  }
  walk(ctx)
  return out
}

/**
 * Ambient loops (floats, pulses, flickers, sways…) keep ticking forever, even far off-screen,
 * so the main thread never rests. This pauses a context's infinite loops while `el` is out of
 * view and resumes them as it comes back — the animations themselves are unchanged.
 * Only loops paused here are resumed, so tweens that were intentionally paused stay paused.
 * Returns a cleanup function.
 */
export function loopsOnlyWhenVisible(ctx, el) {
  if (!ctx || !el || typeof IntersectionObserver === 'undefined') return () => {}
  const pausedByUs = new Set()
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        pausedByUs.forEach((a) => a.resume())
        pausedByUs.clear()
      } else {
        for (const a of infiniteLoops(ctx)) {
          if (a.paused()) continue
          a.pause()
          pausedByUs.add(a)
        }
      }
    },
    { rootMargin: '15% 0px 15% 0px' },
  )
  io.observe(el)
  return () => io.disconnect()
}

export { gsap, ScrollTrigger, SplitText, MotionPathPlugin, DrawSVGPlugin, Flip, useGSAP }
