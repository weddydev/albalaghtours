import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { brand, contact, mapsLink, nav, servicePath, services, waLink } from '../../data/content'
import Logo from '../ui/Logo'
import Icon from '../ui/Icon'
import Skyline from '../ui/Skyline'

export default function Footer() {
  const root = useRef(null)
  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 85%', toggleActions: 'play none none reverse' } })
        tl.from(q('.ft-sky'), { yPercent: 40, autoAlpha: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out' })
          .from(q('.ft-col'), { y: 40, autoAlpha: 0, stagger: 0.1, duration: 1, ease: 'expo.out' }, 0.25)
        gsap.fromTo(
          q('.ft-word'),
          { yPercent: 35 },
          { yPercent: -10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } },
        )
      })
    },
    { scope: root },
  )

  return (
    <footer ref={root} className="relative isolate overflow-hidden bg-ink-950 pt-28 lg:pt-36">
      {/* skyline crest */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 lg:h-36" aria-hidden="true">
        <Skyline variant="far" fill="#0a2a1c" className="ft-sky absolute inset-x-0 bottom-0 h-full w-full" />
        <Skyline variant="near" fill="#03110b" lights className="ft-sky absolute inset-x-0 bottom-0 h-[78%] w-full" />
      </div>
      <div className="absolute inset-x-0 top-0 -z-10 h-36 bg-ink-900" />
      <div className="pattern-overlay pointer-events-none absolute inset-0 -z-10 opacity-[0.03]" />

      <div className="relative mx-auto grid max-w-[1320px] gap-12 px-5 pb-14 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="ft-col lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist-300">
            Haj &amp; Umrah, flights, visas and every travel document — handled with care from Mehdipatnam, Hyderabad.
          </p>
          {/* TODO: confirm with client — contact.since (applies to Hyderabad office too?) */}
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-gold-300">{contact.since}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-mist-500">Your contact</p>
          <p className="mt-1 font-display text-2xl italic text-cream-50">{contact.person}</p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-6 py-1.5 pl-5 text-sm"
          >
            Chat on WhatsApp
            <span className="btn-arrow h-8 w-8">
              <Icon name="whatsapp" className="h-4 w-4" />
            </span>
          </a>
        </div>

        <nav aria-label="Quick links" className="ft-col lg:col-span-2">
          <h2 className="text-xs uppercase tracking-[0.24em] text-gold-300">Explore</h2>
          <ul className="mt-5 space-y-1">
            {nav.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="inline-flex min-h-[40px] items-center text-sm text-mist-300 transition hover:text-cream-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="ft-col lg:col-span-3">
          <h2 className="text-xs uppercase tracking-[0.24em] text-gold-300">Services</h2>
          <ul className="mt-5 space-y-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={servicePath(s)} className="group inline-flex min-h-[36px] items-center gap-2 text-sm text-mist-300 transition hover:text-cream-50">
                  <span className="h-px w-3 bg-gold-400/50 transition-all group-hover:w-5 group-hover:bg-gold-200" aria-hidden="true" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="ft-col not-italic lg:col-span-3">
          <h2 className="text-xs uppercase tracking-[0.24em] text-gold-300">Visit or call</h2>
          <ul className="mt-5 space-y-3">
            {contact.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="inline-flex min-h-[40px] items-center gap-3 text-cream-100 transition hover:text-gold-200">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/40 text-gold-200">
                    <Icon name="phone" className="h-4 w-4" />
                  </span>
                  {p.label}
                </a>
              </li>
            ))}
            <li>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-sm leading-relaxed text-mist-300 transition hover:text-cream-50">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-400/40 text-gold-200">
                  <Icon name="mapPin" className="h-4 w-4" />
                </span>
                <span>
                  {contact.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  <span className="mt-1 inline-block text-xs text-gold-300 underline-offset-4 hover:underline">Open in Google Maps</span>
                </span>
              </a>
            </li>
            <li className="flex gap-3 text-sm leading-relaxed text-mist-300">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-400/40 text-gold-200">
                <Icon name="globe" className="h-4 w-4" />
              </span>
              <span className="self-center">{contact.branch.note}</span>
            </li>
          </ul>
        </address>
      </div>

      <div className="relative border-t border-gold-400/15">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-mist-500 sm:flex-row sm:px-8 lg:px-10">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p>Mehdipatnam, Hyderabad · {contact.branch.area}, {contact.branch.city}</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="ft-word pointer-events-none select-none whitespace-nowrap text-center font-display text-[22vw] font-semibold italic leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(212,175,55,0.14)]"
      >
        {brand.short}
      </p>
    </footer>
  )
}
