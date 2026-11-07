import { useEffect, useId, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { contact, waLink } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'

function Item({ faq, open, onToggle, id }) {
  const panel = useRef(null)
  const first = useRef(true)

  useEffect(() => {
    const el = panel.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (first.current || reduce) {
      gsap.set(el, { height: open ? 'auto' : 0 })
      first.current = false
      return
    }
    gsap.to(el, { height: open ? 'auto' : 0, duration: 0.55, ease: 'power3.inOut', onComplete: () => ScrollTrigger.refresh() })
    gsap.fromTo(el.firstChild, { autoAlpha: open ? 0 : 1, y: open ? -8 : 0 }, { autoAlpha: open ? 1 : 0, y: 0, duration: 0.45, delay: open ? 0.12 : 0 })
  }, [open])

  return (
    <li className={`faq-item rounded-[20px] border transition-colors duration-500 ${open ? 'border-gold-400/50 bg-ink-800/40' : 'border-gold-400/15'}`}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
        >
          <span className="flex-1 font-display text-xl font-semibold leading-snug text-cream-50 sm:text-[1.45rem]">{faq.q}</span>
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
              open ? 'rotate-45 border-gold-200 bg-gold-400/15 text-gold-100' : 'border-gold-400/40 text-gold-200'
            }`}
          >
            <Icon name="plus" className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div ref={panel} id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className="h-0 overflow-hidden" aria-hidden={!open}>
        <p className="px-5 pb-6 pr-16 text-[0.97rem] leading-relaxed text-mist-300 sm:px-6">{faq.a}</p>
      </div>
    </li>
  )
}

/** Accessible accordion (one open at a time) with GSAP height animation. */
export default function Faq({ service }) {
  const root = useRef(null)
  const [open, setOpen] = useState(0)
  const base = useId().replace(/:/g, '')

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.from(q('.faq-item'), { y: 30, autoAlpha: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.faq-list')[0], start: 'top 85%', once: true } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <SectionHeading align="left" eyebrow="FAQ" title={['Questions, ', { accent: 'answered' }]} />
          <p className="mt-6 text-mist-300">Can’t find what you need? Ask us directly — we usually reply on WhatsApp.</p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <a href={waLink(service.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 text-jade-300 hover:text-jade-400">
              <Icon name="whatsapp" className="h-4 w-4" /> Message us on WhatsApp
            </a>
            <a href={contact.phones[0].href} className="inline-flex min-h-[44px] items-center gap-2 text-gold-200 hover:text-gold-100">
              <Icon name="phone" className="h-4 w-4" /> {contact.phones[0].label}
            </a>
          </div>
        </div>
        <ul className="faq-list space-y-3 lg:col-span-8">
          {service.faqs.map((f, i) => (
            <Item key={f.q} id={`${base}-${i}`} faq={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
