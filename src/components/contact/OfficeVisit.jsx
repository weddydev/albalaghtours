import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { contact, mapsLink, officePhotos } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'

const FALLBACKS = [
  'radial-gradient(90% 70% at 60% 25%, #6b5a3a 0%, #2a2216 50%, #0a0805 100%)',
  'radial-gradient(90% 70% at 60% 25%, #6b4a2a 0%, #33241a 45%, #1a130e 100%)',
]

/** Contact page: office photos in arches beside the Hyderabad address, phones and map link. */
export default function OfficeVisit() {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 80%', once: true }, defaults: { ease: 'expo.out' } })
          .from(q('.ov-arch'), { y: 60, autoAlpha: 0, stagger: 0.15, duration: 1.2 })
          .from(q('.ov-copy > *'), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.3)
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="ov-title" className="relative pb-20 sm:pb-28">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <div className="relative mx-auto flex w-full max-w-[460px] items-end gap-4 lg:col-span-6">
          {officePhotos.map((p, i) => (
            <div key={p.src} className={`ov-arch ${i ? 'mb-10 w-[44%]' : 'w-[56%]'}`}>
              <ArchFrame className="aspect-[3/4] w-full" innerClassName="bg-ink-900" borderClassName="drop-shadow-[0_0_10px_rgba(200,150,62,0.4)]" finial={i === 0}>
                <Photo src={p.src} alt={p.alt} fallback={FALLBACKS[i % 2]} sizes="(max-width: 1023px) 50vw, 260px">
                  <Icon name="globe" strokeWidth={0.6} className="absolute left-1/2 top-[36%] h-1/3 w-1/2 -translate-x-1/2 text-gold-200 opacity-25" />
                </Photo>
              </ArchFrame>
            </div>
          ))}
        </div>

        <div className="ov-copy min-w-0 lg:col-span-6">
          <p className="eyebrow">Visit our office</p>
          <h2 id="ov-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none text-cream-50">
            Come and <span className="text-grad-green pr-[0.05em]">meet us</span>
          </h2>
          <address className="mt-6 not-italic leading-relaxed text-mist-300">
            {contact.address.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
            {contact.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="inline-flex min-h-[44px] items-center gap-2 text-cream-100 transition hover:text-gold-200">
                  <Icon name="phone" className="h-4 w-4 text-gold-300" />
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-4 py-1.5 pl-5 text-sm">
            Open in Google Maps
            <span className="btn-arrow h-9 w-9">
              <Icon name="mapPin" className="h-4 w-4" />
            </span>
          </a>
          <p className="mt-6 flex items-center gap-2 border-t border-gold-400/15 pt-5 text-sm text-mist-300">
            <Icon name="globe" className="h-4 w-4 shrink-0 text-gold-300" />
            {contact.branch.note}
          </p>
        </div>
      </div>
    </section>
  )
}
