import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import SectionHeading from '../ui/SectionHeading'

const ARCH = 'M2 98V40C2 24 18 18 30 11 36 7.5 39 4.5 40 1c1 3.5 4 6.5 10 10 12 7 28 13 28 29v58z'

function Medallion({ n }) {
  return (
    <span className="hw-medal relative grid h-[88px] w-[70px] shrink-0 place-items-center">
      <svg viewBox="0 0 80 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={`hw-g-${n}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6e3a3" />
            <stop offset="1" stopColor="#b8932b" />
          </linearGradient>
        </defs>
        <path d={ARCH} fill="#05190f" stroke="#d4af37" strokeOpacity="0.5" strokeWidth="1.2" />
        <path className="hw-lit" d={ARCH} fill={`url(#hw-g-${n})`} opacity="0" />
      </svg>
      <span className="hw-num relative mt-4 font-display text-3xl font-semibold italic text-gold-200">{n}</span>
    </span>
  )
}

/**
 * Four steps on a gold track that fills as you scroll.
 * Desktop: horizontal track with arch medallions that light up as the gold reaches them.
 * Mobile: the same track runs vertically.
 */
export default function HowItWorks({ service }) {
  const root = useRef(null)

  useNearGSAP(
    () => {
      const mm = gsap.matchMedia()
      const build = (axis) => () => {
        const q = gsap.utils.selector(root)
        const medals = q('.hw-step')
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('.hw-track-wrap')[0], start: 'top 72%', end: 'bottom 55%', scrub: 0.6 },
        })
        tl.fromTo(q('.hw-progress'), { [axis]: 0 }, { [axis]: 1, duration: 3 }, 0)
        medals.forEach((m, i) => {
          const at = (i / (medals.length - 1)) * 3 - 0.05
          tl.to(m.querySelector('.hw-lit'), { opacity: 1, duration: 0.25 }, Math.max(0, at))
            .to(m.querySelector('.hw-num'), { color: '#05190f', duration: 0.25 }, Math.max(0, at))
            .fromTo(m.querySelectorAll('.hw-copy > *'), { autoAlpha: 0.25, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05 }, Math.max(0, at))
        })
      }
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', build('scaleX'))
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', build('scaleY'))
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden bg-linear-to-b from-transparent via-ink-950/60 to-transparent py-20 sm:py-28 lg:py-36">
      <div className="pattern-overlay pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow="How it works" title={['Four calm ', { accent: 'steps' }]} />

        <div className="hw-track-wrap relative mt-16 lg:mt-20">
          {/* track: horizontal on desktop, vertical on mobile */}
          <div className="absolute bottom-10 left-[34px] top-10 w-px bg-gold-400/15 lg:bottom-auto lg:left-[12.5%] lg:right-[12.5%] lg:top-[44px] lg:h-px lg:w-auto">
            <div className="hw-progress absolute inset-0 origin-top bg-linear-to-b from-gold-100 via-gold-300 to-gold-500 shadow-[0_0_14px_rgba(232,207,122,0.6)] lg:origin-left lg:bg-linear-to-r" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {service.steps.map((s, i) => (
              <li key={s.title} className="hw-step flex gap-6 lg:flex-col lg:items-center lg:text-center">
                <Medallion n={i + 1} />
                <div className="hw-copy pt-3 lg:pt-6">
                  <h3 className="font-display text-2xl font-semibold text-cream-50">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist-300 lg:mx-auto">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
