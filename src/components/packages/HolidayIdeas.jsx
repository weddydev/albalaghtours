import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { destinations, waLink } from '../../data/content'
import { TONES } from '../services/ServiceCard'
import SectionHeading from '../ui/SectionHeading'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'

const HOLIDAYS = destinations.filter((d) => !d.link) // pilgrimage has its own section below

/**
 * Packages page: tailor-made holiday ideas (from the destinations list). Each card opens a
 * WhatsApp enquiry; nothing here promises prices, dates or inclusions.
 */
export default function HolidayIdeas() {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.set(q('.hi-card'), { autoAlpha: 0, y: 60 })
        ScrollTrigger.batch(q('.hi-card'), {
          start: 'top 90%',
          once: true,
          onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.1, ease: 'expo.out' }),
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="holidays" ref={root} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Holiday packages"
          title={['Tailor-made ', { accent: 'holidays' }]}
          lead="Flights, visas, hotels, transfers and sightseeing in one plan — shaped around your dates, budget and pace. Pick a favourite or tell us your own idea."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {HOLIDAYS.map((d, i) => (
            <article
              key={d.slug}
              className="hi-card group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[26px] border border-cream-100/10 p-6 transition-[border-color,box-shadow] duration-500 hover:border-gold-300/60 hover:shadow-[0_30px_70px_-30px_rgba(200,150,62,0.5)]"
            >
              <div className="absolute inset-0 -z-10 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                <Photo src={d.image} fallback={TONES[d.tone]} sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw" rays={d.rays}>
                  <Icon name={d.icon ?? 'globe'} strokeWidth={0.5} className="absolute right-[6%] top-[8%] h-1/2 w-1/2 text-gold-200 opacity-[0.14]" />
                </Photo>
              </div>
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/60 to-ink-950/5" />

              <p className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-gold-200">
                <Icon name="mapPin" className="h-3 w-3" />
                {d.region}
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold leading-none text-cream-50">{d.name}</h3>
              <p className="mt-2 text-sm text-mist-300">{d.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {d.bestFor.map((b) => (
                  <span key={b} className="rounded-full border border-cream-100/15 bg-ink-950/65 px-2.5 py-0.5 text-[0.7rem] text-cream-100">
                    {b}
                  </span>
                ))}
              </div>
              <a href={waLink(d.whatsapp)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-200 hover:text-gold-100">
                <Icon name="whatsapp" className="h-4 w-4" />
                Plan this trip
                <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
