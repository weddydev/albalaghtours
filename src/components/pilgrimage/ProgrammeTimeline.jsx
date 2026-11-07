import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import Icon from '../ui/Icon'

/**
 * Numbered route / timeline. A gold line fills as you scroll and each stop lights up as the
 * gold reaches it. Mobile: one column on a left rail. Desktop: the stops alternate either
 * side of a centre rail. Steps are `{ from, to, text? }` (transfers) or `{ title, text? }`.
 */
export default function ProgrammeTimeline({ steps, label = 'Step', icon = 'bus' }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('.pt-lit'), { opacity: 1 })
        gsap.set(q('.pt-num'), { color: '#05190f' })
      })
      mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px)' }, (ctx) => {
        if (!ctx.conditions.motion) return
        const items = q('.pt-step')
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'bottom 62%', scrub: 0.6 },
        })
        tl.fromTo(q('.pt-progress'), { scaleY: 0 }, { scaleY: 1, duration: 3 }, 0)
        items.forEach((item, i) => {
          const at = Math.max(0, (i / Math.max(1, items.length - 1)) * 3 - 0.08)
          const card = item.querySelector('.pt-card')
          tl.to(item.querySelector('.pt-lit'), { opacity: 1, duration: 0.2 }, at)
            .to(item.querySelector('.pt-num'), { color: '#05190f', duration: 0.2 }, at)
            .fromTo(card, { autoAlpha: 0.35, x: ctx.conditions.desktop && card.dataset.side === 'left' ? -18 : 18 }, { autoAlpha: 1, x: 0, duration: 0.3 }, at)
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative">
      <div className="absolute bottom-7 left-[27px] top-7 w-px bg-gold-400/15 lg:left-1/2" aria-hidden="true">
        <div className="pt-progress absolute inset-0 origin-top bg-linear-to-b from-gold-100 via-gold-300 to-gold-500 shadow-[0_0_14px_rgba(232,207,122,0.6)]" />
      </div>
      <ol className="relative space-y-5 lg:space-y-3">
        {steps.map((s, i) => {
          const left = i % 2 === 0
          return (
            <li
              key={(s.title ?? s.from + s.to) + i}
              className="pt-step relative grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] lg:gap-6"
            >
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-gold-400/50 bg-ink-950 shadow-[0_0_24px_-8px_rgba(212,175,55,0.6)] lg:col-start-2 lg:row-start-1 lg:mx-auto">
                <span className="pt-lit absolute inset-0 rounded-full bg-linear-to-b from-gold-100 to-gold-500 opacity-0" aria-hidden="true" />
                <span className="pt-num relative font-display text-2xl font-semibold italic text-gold-200">{i + 1}</span>
              </span>
              <div
                data-side={left ? 'left' : 'right'}
                className={`pt-card glass min-w-0 rounded-[22px] p-5 lg:row-start-1 ${left ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-3'}`}
              >
                <p className={`flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-gold-300 ${left ? 'lg:justify-end' : ''}`}>
                  <Icon name={icon} className="h-3.5 w-3.5 shrink-0" />
                  {label} {i + 1}
                </p>
                {s.title ? (
                  <h4 className="mt-1.5 font-display text-[1.45rem] font-semibold leading-tight text-cream-50">{s.title}</h4>
                ) : (
                  <h4 className={`mt-1.5 flex flex-wrap items-center gap-x-2 font-display text-[1.45rem] font-semibold leading-tight text-cream-50 ${left ? 'lg:justify-end' : ''}`}>
                    <span>{s.from}</span>
                    <Icon name="arrowRight" className="h-4 w-4 shrink-0 text-gold-300" />
                    <span className="sr-only">to</span>
                    <span>{s.to}</span>
                  </h4>
                )}
                {s.text && <p className="mt-1 text-sm leading-relaxed text-mist-300">{s.text}</p>}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
