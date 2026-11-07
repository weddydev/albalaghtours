import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/*
 * Deferred GSAP setup for below-the-fold sections.
 *
 * `useGSAP` runs every section's setup inside React's first commit, before the first frame. Each
 * setup writes styles and then measures (SplitText, ScrollTrigger, gsap.set + reads), so the page
 * relayouts dozens of times before anything is painted. `useNearGSAP` runs the *same* setup, in a
 * gsap.context scoped and reverted exactly like useGSAP, but only when the section comes within
 * 1.5 screens of the viewport (always before it can be seen), or when the browser is idle after
 * the first load — one section per idle slice, in page order. The animations are unchanged.
 *
 * Use it only for sections that start below the fold and create no pins (pins stay in useGSAP so
 * ScrollTrigger keeps measuring in page order).
 */

const jobs = new Set()
let io = null
let enabled = false // idle draining allowed (after the first-load preloader)
let draining = false
let refreshTimer = 0

const rIC = (fn) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1200 }) : setTimeout(() => fn({ timeRemaining: () => 8 }), 60))

// one ScrollTrigger refresh after a burst of late setups (SplitText can move lines by a pixel)
function scheduleRefresh() {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => rIC(() => ScrollTrigger.refresh()), 250)
}

function runJob(job) {
  if (job.done) return
  job.done = true
  jobs.delete(job)
  io?.unobserve(job.el)
  job.run()
  scheduleRefresh()
}

function observer() {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          for (const job of [...jobs]) if (job.el === e.target) runJob(job)
        }
      },
      { rootMargin: '150% 0px 150% 0px' },
    )
  }
  return io
}

// in page order, one setup per idle slice, so every task stays short
function step() {
  rIC((deadline) => {
    const next = [...jobs].filter((j) => j.el.isConnected).sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))[0]
    if (!next) {
      draining = false
      return
    }
    if (deadline.timeRemaining() > 4 || deadline.didTimeout) runJob(next)
    step()
  })
}
function drain() {
  if (!enabled || draining) return
  draining = true
  step()
}

/** Called once the first-load preloader is done: let remaining setups run in idle time. */
export function startDeferredSetups() {
  enabled = true
  drain()
}

/** Drop-in for `useGSAP(setup, { scope })` on below-the-fold sections. */
export function useNearGSAP(setup, { scope }) {
  const fn = useRef(setup)
  fn.current = setup

  useLayoutEffect(() => {
    const el = scope.current
    if (!el) return
    let ctx = null
    const job = { el, done: false, run: () => (ctx = gsap.context(() => fn.current(), el)) }
    jobs.add(job)
    observer().observe(el)
    drain() // later pages: their sections queue up and drain in idle time too
    return () => {
      job.done = true
      jobs.delete(job)
      io?.unobserve(el)
      ctx?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
