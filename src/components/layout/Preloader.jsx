import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { LogoMark } from '../ui/Logo'

/** ≤1.5s gold logo draw + lantern glow. Click "Skip" (or anywhere) to jump ahead. */
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const tl = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        onDone()
        gsap.set(root.current, { autoAlpha: 0, display: 'none' })
        return
      }
      tl.current = gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .set(q('.logo-stroke'), { drawSVG: '0%' })
        .set(q('.logo-fill'), { autoAlpha: 0, scale: 0.9, transformOrigin: '50% 80%' })
        .to(q('.pre-glow'), { autoAlpha: 1, scale: 1, duration: 1.1 }, 0)
        .to(q('.logo-stroke'), { drawSVG: '100%', duration: 0.9, stagger: 0.08, ease: 'power2.inOut' }, 0)
        .to(q('.logo-fill'), { autoAlpha: 1, scale: 1, duration: 0.6 }, 0.55)
        .from(q('.pre-word'), { yPercent: 110, duration: 0.8, stagger: 0.08, ease: 'expo.out' }, 0.4)
        .from(q('.pre-bar'), { scaleX: 0, duration: 1.15, ease: 'power2.inOut' }, 0)
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.75, ease: 'expo.inOut' }, 1.15)
        .call(onDone, null, 1.2)
        .set(root.current, { display: 'none' })
    },
    { scope: root },
  )

  const skip = () => tl.current?.progress(1)

  return (
    <div
      ref={root}
      onClick={skip}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      role="status"
      aria-label="Loading Al Balagh Tours & Travels"
    >
      <div className="pattern-overlay absolute inset-0 opacity-[0.04]" />
      <div className="relative flex flex-col items-center">
        <div className="pre-glow invisible absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full bg-[radial-gradient(closest-side,rgb(246_214_130/0.35),transparent)] opacity-0" />
        <LogoMark className="relative h-24 w-24" />
        <div className="mt-6 overflow-hidden">
          <p className="pre-word font-display text-4xl font-semibold text-cream-50">Al Balagh</p>
        </div>
        <div className="overflow-hidden">
          <p className="pre-word mt-1 text-[0.65rem] tracking-[0.5em] text-gold-200">TOURS &amp; TRAVELS</p>
        </div>
        <div className="pre-bar mt-8 h-px w-48 origin-left bg-linear-to-r from-transparent via-gold-200 to-transparent" />
      </div>
      <button
        type="button"
        onClick={skip}
        className="absolute bottom-8 right-8 rounded-full border border-gold-400/30 px-4 py-2 text-xs tracking-[0.2em] text-mist-300 transition hover:border-gold-200 hover:text-cream-50"
      >
        SKIP INTRO
      </button>
    </div>
  )
}
