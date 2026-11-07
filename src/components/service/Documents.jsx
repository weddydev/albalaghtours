import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { waLink } from '../../data/content'
import Icon from '../ui/Icon'
import Parchment from './Parchment'

/** Parchment checklist: the ogee edge draws, then each tick is inked in turn. */
export default function Documents({ service }) {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', once: true }, defaults: { ease: 'expo.out' } })
          .from(q('.dc-card'), { y: 90, autoAlpha: 0, duration: 1.3 })
          .from(q('.pc-cap'), { clipPath: 'inset(0% 50% 0% 50%)', duration: 1.3, ease: 'power3.inOut' }, 0.25)
          .from(q('.dc-head > *'), { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.4)
          .from(q('.dc-item'), { x: -16, autoAlpha: 0, stagger: 0.08, duration: 0.8 }, 0.6)
          .from(q('.dc-tick'), { drawSVG: '0%', stagger: 0.08, duration: 0.5, ease: 'power2.out' }, 0.75)
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[980px] px-5 sm:px-8">
        <Parchment className="dc-card drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]" innerClassName="px-6 pb-12 pt-2 sm:px-14 sm:pb-14">
          <div className="dc-head relative text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold-500/50 bg-cream-50 text-gold-600">
              <Icon name="certificate" className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink-800 sm:text-5xl">{service.documentsTitle ?? 'Documents you may need'}</h2>
            <p className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-cream-50/70 px-4 py-1.5 text-xs font-medium text-ink-700">
              <Icon name="shield" className="h-3.5 w-3.5 text-jade-600" />
              {service.documentsNote ?? 'Requirements vary — contact us to confirm.'}
            </p>
          </div>
          <ul className="relative mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {service.documents.map((d) => (
              <li key={d} className="dc-item flex items-start gap-3 border-b border-gold-500/20 pb-4 text-[0.95rem] leading-snug text-ink-800">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true">
                  <circle cx="12" cy="12" r="10.5" fill="none" stroke="#a87b30" strokeOpacity="0.35" />
                  <path className="dc-tick" d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="#a87b30" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {d}
              </li>
            ))}
          </ul>
          <div className="relative mt-8 text-center">
            <a
              href={waLink(`Hello, could you confirm the documents I need for ${service.title}?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-jade-700 underline-offset-4 hover:underline"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Ask us to check your documents
            </a>
          </div>
        </Parchment>
      </div>
    </section>
  )
}
