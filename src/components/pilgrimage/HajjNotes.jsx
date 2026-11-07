import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { packages, waLink } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import Disclosure from '../ui/Disclosure'
import Icon from '../ui/Icon'

const ICONS = ['calendar', 'passport', 'plane', 'bus', 'luggage', 'shield']

/** Hajj 2027 important notes — an accordion, wording kept faithful to the client's programme. */
export default function HajjNotes() {
  const root = useRef(null)
  const hajj = packages.hajj

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.from(q('.hn-item'), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.hn-list')[0], start: 'top 85%', once: true } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <SectionHeading align="left" eyebrow="Hajj 2027" title={['Important ', { accent: 'notes' }]} />
          <p className="mt-6 text-mist-300">Please read these before you book. Confirm the final written terms with the office.</p>
          <a href={waLink(hajj.whatsapp)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm text-jade-300 hover:text-jade-400">
            <Icon name="whatsapp" className="h-4 w-4" /> Ask the office a question
          </a>
        </div>
        <ul className="hn-list space-y-3 lg:col-span-8">
          {hajj.notes.map((n, i) => (
            <li key={n.title} className="hn-item">
              <Disclosure title={n.title} icon={ICONS[i % ICONS.length]} defaultOpen={i === 0}>
                <ul className="space-y-2.5">
                  {n.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-mist-300">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-300 bg-gold-400/30" aria-hidden="true" />
                      <span className="min-w-0">{p}</span>
                    </li>
                  ))}
                </ul>
              </Disclosure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
