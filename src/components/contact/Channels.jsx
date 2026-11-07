import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { contact, mapsLink, waLink } from '../../data/content'
import Icon from '../ui/Icon'

/** Three ways to reach us. Cards tip up into place; each medallion sends out a slow gold ripple. */
export default function Channels() {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.from(q('.ch-card'), {
          y: 70,
          rotationX: 25,
          transformPerspective: 1000,
          transformOrigin: '50% 100%',
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
        })
        gsap.fromTo(q('.ch-ripple'), { scale: 1, opacity: 0.7 }, { scale: 1.9, opacity: 0, duration: 2.4, repeat: -1, ease: 'power1.out', stagger: 0.8 })
      })
    },
    { scope: root },
  )

  const Medallion = ({ icon, green }) => (
    <span className="relative grid h-16 w-16 place-items-center">
      <span className={`ch-ripple absolute inset-0 rounded-full border ${green ? 'border-jade-400/60' : 'border-gold-300/60'}`} aria-hidden="true" />
      <span
        className={`relative grid h-16 w-16 place-items-center rounded-full border bg-ink-950/60 shadow-[0_0_30px_-8px_rgba(212,175,55,0.5)] ${
          green ? 'border-jade-400/60 text-jade-300' : 'border-gold-400/50 text-gold-200'
        }`}
      >
        <Icon name={icon} className="h-7 w-7" />
      </span>
    </span>
  )

  return (
    <section ref={root} className="relative py-16 sm:py-24">
      <ul className="mx-auto grid max-w-[1180px] gap-4 px-5 sm:px-8 md:grid-cols-3 lg:gap-6 lg:px-10">
        <li className="ch-card glass rounded-[28px] p-7">
          <Medallion icon="phone" />
          <h2 className="mt-6 font-display text-3xl italic text-cream-50">Call us</h2>
          <p className="mt-1 text-sm text-mist-500">Speak to {contact.person} or our team.</p>
          <ul className="mt-5 space-y-2">
            {contact.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="group inline-flex min-h-[44px] items-center gap-2 text-xl text-cream-100 transition hover:text-gold-200">
                  {p.label}
                  <Icon name="arrowRight" className="h-4 w-4 text-gold-300 transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li className="ch-card glass rounded-[28px] p-7">
          <Medallion icon="whatsapp" green />
          <h2 className="mt-6 font-display text-3xl italic text-cream-50">WhatsApp</h2>
          <p className="mt-1 text-sm text-mist-500">Send your questions and documents list any time.</p>
          <p className="mt-5 text-xl text-cream-100">{contact.phones[0].label}</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 py-1.5 pl-5 text-sm">
            Start a chat
            <span className="btn-arrow h-9 w-9">
              <Icon name="whatsapp" className="h-4 w-4" />
            </span>
          </a>
        </li>
        <li className="ch-card glass rounded-[28px] p-7">
          <Medallion icon="mapPin" />
          <h2 className="mt-6 font-display text-3xl italic text-cream-50">Visit us</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed text-mist-300">
            {contact.address.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm text-gold-200 hover:text-gold-100">
            Open in Google Maps <Icon name="arrowUpRight" className="h-4 w-4" />
          </a>
          <p className="mt-3 flex items-center gap-2 border-t border-gold-400/15 pt-4 text-sm text-mist-300">
            <Icon name="globe" className="h-4 w-4 shrink-0 text-gold-300" />
            {contact.branch.note}
          </p>
          {/* TODO: confirm with client — office hours */}
        </li>
      </ul>
    </section>
  )
}
