import { useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { contact, waLink } from '../../data/content'
import SectionHeading from './SectionHeading'
import Photo from './Photo'
import Icon from './Icon'
import Lightbox from './Lightbox'

const FALLBACK = 'radial-gradient(90% 70% at 50% 25%, #6b4a2a 0%, #33241a 45%, #1a130e 100%)'

/**
 * One flyer: the whole poster (never cropped — it carries text) centred on a soft, blurred
 * backdrop of itself inside a gold-edged frame, so posters of any shape line up evenly.
 */
function FlyerCard({ f, onOpen, sizes }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open flyer: ${f.caption}`}
      className="group block w-full rounded-[28px] border border-gold-400/40 bg-ink-900/80 p-2 text-left shadow-[0_30px_70px_-35px_rgba(200,150,62,0.55)] transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-gold-200/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-200"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-ink-950">
        <div className="absolute inset-0 scale-110 opacity-50 blur-2xl" aria-hidden="true">
          <Photo src={f.src} fallback={FALLBACK} sizes={sizes} />
        </div>
        <div className="absolute inset-0 bg-ink-950/35" aria-hidden="true" />
        <div className="absolute inset-3 sm:inset-4">
          <Photo src={f.src} alt={f.alt} fallback="transparent" width={f.w} height={f.h} sizes={sizes} warm={false} imgClassName="!object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)]">
            <Icon name="camera" strokeWidth={0.8} className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-gold-200 opacity-30" />
          </Photo>
        </div>
      </div>
      <span className="flex items-center justify-between gap-3 px-3 pb-1.5 pt-3.5">
        <span className="min-w-0 font-display text-lg font-semibold leading-tight text-cream-50 sm:text-xl">{f.caption}</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold-400/40 px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-gold-100 transition-colors group-hover:border-gold-200">
          <Icon name="search" className="h-3.5 w-3.5" />
          View
        </span>
      </span>
    </button>
  )
}

/**
 * The agency's flyers. Several → a centred row of cards; one → the card beside the copy
 * (`children` adds anything extra under the lead, e.g. a notice). Tap a flyer to read it full screen.
 */
export default function FlyerShowcase({ eyebrow, title, lead, items, whatsapp, label = 'Flyers', children }) {
  const root = useRef(null)
  const [open, setOpen] = useState(-1)
  const single = items.length === 1

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 80%', once: true }, defaults: { ease: 'expo.out' } })
          .from(q('.fs-cell'), { y: 70, autoAlpha: 0, rotation: (i) => (single ? -2 : i % 2 ? 2.5 : -2.5), stagger: 0.14, duration: 1.3 })
          .from(q('.fs-copy > *'), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.25)
      })
    },
    { scope: root },
  )

  const actions = (
    <div className="flex flex-wrap gap-3">
      <a href={waLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        Enquire on WhatsApp
        <span className="btn-arrow">
          <Icon name="whatsapp" className="h-4 w-4" />
        </span>
      </a>
      <a href={contact.phones[0].href} className="btn btn-ghost">
        Call {contact.phones[0].label}
        <span className="btn-arrow">
          <Icon name="phone" className="h-4 w-4" />
        </span>
      </a>
    </div>
  )

  return (
    <section ref={root} className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(900px_480px_at_50%_520px,rgb(200_150_62/0.07),transparent)]" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        {single ? (
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="fs-cell mx-auto w-full max-w-[420px] lg:col-span-5">
              <FlyerCard f={items[0]} onOpen={() => setOpen(0)} sizes="(max-width: 639px) 90vw, 420px" />
            </div>
            <div className="fs-copy min-w-0 lg:col-span-7">
              <SectionHeading align="left" eyebrow={eyebrow} title={title} divider={false} />
              <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-mist-300">{lead}</p>
              {children}
              <div className="mt-8">{actions}</div>
            </div>
          </div>
        ) : (
          <>
            <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
            <ul className="mx-auto mt-14 grid max-w-[920px] gap-6 sm:grid-cols-2 lg:gap-8">
              {items.map((f, i) => (
                <li key={f.src} className="fs-cell">
                  <FlyerCard f={f} onOpen={() => setOpen(i)} sizes="(max-width: 639px) 90vw, 440px" />
                </li>
              ))}
            </ul>
            <div className="fs-copy mt-10 flex justify-center">{actions}</div>
          </>
        )}
      </div>
      {open > -1 && <Lightbox items={items} start={open} label={label} onClose={() => setOpen(-1)} />}
    </section>
  )
}
