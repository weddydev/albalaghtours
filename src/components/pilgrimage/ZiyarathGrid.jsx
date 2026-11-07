import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'

/** Numbered place chips that pop in, in batches, as they scroll into view. */
export default function ZiyarathGrid({ places }) {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.set(q('.zg-item'), { autoAlpha: 0, y: 26, scale: 0.94 })
        ScrollTrigger.batch(q('.zg-item'), {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.8, ease: 'back.out(1.6)', overwrite: true }),
        })
      })
    },
    { scope: root },
  )

  return (
    <ul ref={root} className="grid gap-3 min-[460px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {places.map((p, i) => (
        <li
          key={p}
          className="zg-item glass flex min-w-0 items-center gap-3 rounded-2xl px-4 py-3.5 transition-[border-color] duration-500 hover:!border-gold-300/60"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-400/40 font-display text-sm text-gold-200">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0 break-words text-[0.95rem] leading-snug text-cream-50">{p}</span>
        </li>
      ))}
    </ul>
  )
}
