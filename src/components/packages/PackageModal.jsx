import { useEffect, useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { lockScroll, unlockScroll } from '../../lib/lenis'
import { contact, enquiryText, waLink } from '../../data/content'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'
import Disclosure from '../ui/Disclosure'
import { RouteChip, Stars, stepTitle } from './ProgrammeBits'

const FALLBACK = 'radial-gradient(90% 80% at 60% 20%, #3a4a5c 0%, #142233 45%, #050a10 100%)'

/**
 * Programme details dialog: hero image, "What's included" grid, hotels / programme / documents
 * disclosures, WhatsApp / call actions. Focus is trapped, Esc and the backdrop close it, page scroll is locked.
 */
export default function PackageModal({ pkg, search, onClose }) {
  const root = useRef(null)
  const panel = useRef(null)
  const closing = useRef(false)

  const close = () => {
    if (closing.current) return
    closing.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return onClose()
    gsap
      .timeline({ onComplete: onClose })
      .to(panel.current, { y: 40, autoAlpha: 0, duration: 0.35, ease: 'power2.in' })
      .to(root.current, { autoAlpha: 0, duration: 0.25 }, '-=0.15')
  }

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          // opacity, not autoAlpha: a visibility:hidden dialog could not take focus on open
          .from(root.current, { opacity: 0, duration: 0.35, ease: 'power1.out' })
          .from(panel.current, { y: 80, scale: 0.97, duration: 0.9 }, 0.05)
          .from(q('.pm-media'), { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.1 }, 0.15)
          .from(q('.pm-in'), { y: 20, autoAlpha: 0, stagger: 0.05, duration: 0.8 }, 0.3)
      })
    },
    { scope: root },
  )

  // scroll lock, focus trap, Esc, focus restore
  useEffect(() => {
    lockScroll()
    const before = document.activeElement
    const el = panel.current
    const focusables = () => [...el.querySelectorAll('a, button')].filter((n) => n.offsetParent !== null)
    el.querySelector('[data-autofocus]')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!el.contains(document.activeElement)) {
        e.preventDefault()
        f[0].focus()
      } else if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault()
        f[f.length - 1].focus()
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault()
        f[0].focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
      before?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { programme } = pkg

  return (
    <div ref={root} className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" aria-label="Close programme details" onClick={close} className="absolute inset-0 cursor-default bg-ink-950/80 backdrop-blur-md" tabIndex={-1} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        data-lenis-prevent
        className="glass-strong relative max-h-[92svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-[32px] !bg-ink-900/95 sm:rounded-[32px]"
      >
        <div className="pm-media relative h-56 overflow-hidden sm:h-72">
          <Photo src={pkg.image} alt={`${pkg.name} — Al Balagh Tours & Travels`} fallback={FALLBACK} eager width={1000} height={667} sizes="(max-width: 768px) 100vw, 768px">
            <Icon name="kaaba" strokeWidth={0.6} className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-gold-200 opacity-20" />
          </Photo>
          <div className="absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/30 to-transparent" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-linear-to-b from-gold-100 to-gold-400 px-3 py-1 text-xs font-semibold text-ink-900">
            <Icon name="star" strokeWidth={2} className="h-3 w-3" />
            {pkg.badge}
          </span>
          <button
            type="button"
            data-autofocus
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-gold-400/50 bg-ink-950/60 text-cream-50 backdrop-blur transition hover:border-gold-200"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="relative -mt-14 px-6 pb-8 sm:px-10 sm:pb-10">
          <p className="pm-in text-xs uppercase tracking-[0.24em] text-gold-300">{pkg.season}</p>
          <h2 id="pm-title" className="pm-in mt-2 font-display text-4xl font-semibold italic leading-tight text-cream-50 sm:text-5xl">
            {pkg.name}
          </h2>
          <p className="pm-in mt-1 font-display text-lg italic text-gold-100">{pkg.tagline}</p>
          <div className="pm-in mt-4 flex flex-wrap items-end gap-x-6 gap-y-1">
            {/* TODO: confirm with client — price and dates */}
            <p className="font-display text-3xl font-semibold text-gold-100 sm:text-4xl">Contact for price</p>
            <p className="pb-1.5 text-sm text-mist-500">{pkg.dates}</p>
          </div>
          {pkg.route && <RouteChip route={pkg.route} className="pm-in mt-4" />}

          <h3 className="pm-in mt-9 flex items-center gap-3 font-display text-2xl italic text-cream-50">
            <span className="h-px w-8 bg-gold-400/60" aria-hidden="true" />
            What’s included
          </h3>
          <ul className="pm-in mt-4 grid gap-3 sm:grid-cols-2">
            {pkg.inclusions.map((inc) => (
              <li key={inc.title} className="flex items-start gap-3 rounded-2xl border border-gold-400/20 bg-ink-950/40 p-4">
                <Icon name={inc.icon} className="mt-0.5 h-6 w-6 shrink-0 text-gold-200" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-cream-50">{inc.title}</span>
                  <span className="mt-0.5 block text-[0.82rem] leading-snug text-mist-300">{inc.text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="pm-in mt-6 space-y-3">
            <Disclosure title="Hotels" icon="bed">
              {pkg.hotels.length ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {pkg.hotels.map((h) => (
                    <li key={h.id} className="rounded-2xl border border-gold-400/20 bg-ink-950/40 p-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-300">{h.cityName}</p>
                      <p className="mt-1 font-display text-xl font-semibold text-cream-50">{h.name}</p>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mist-300">
                        <Stars n={h.stars} />
                        <span>
                          {h.stars}-star · {h.distance}&nbsp;m from {h.from}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-mist-300">{pkg.hotelsNote}.</p>
              )}
            </Disclosure>

            <Disclosure title={`Programme — ${programme.title}`} icon={pkg.type === 'hajj' ? 'bus' : 'kaaba'}>
              <ol className="relative space-y-4 border-l border-gold-400/30 pl-5">
                {programme.steps.map((s, i) => (
                  <li key={stepTitle(s) + i} className="relative">
                    <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rotate-45 border border-gold-300 bg-ink-900" aria-hidden="true" />
                    <p className="text-[0.68rem] uppercase tracking-[0.2em] text-gold-300">Step {i + 1}</p>
                    <p className="font-medium text-cream-50">{stepTitle(s)}</p>
                    {s.text && <p className="text-sm text-mist-300">{s.text}</p>}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs text-mist-500">{programme.note}</p>
            </Disclosure>

            {pkg.ziyarath && (
              <Disclosure title={pkg.ziyarath.title} icon="mapPin">
                <ul className="flex flex-wrap gap-2">
                  {pkg.ziyarath.places.map((p) => (
                    <li key={p} className="rounded-full border border-gold-400/30 px-3 py-1 text-xs text-gold-100">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-mist-500">{pkg.ziyarath.note}</p>
              </Disclosure>
            )}

            {pkg.riyazulJannah && (
              <Disclosure title="Riyazul Jannah arrangements" icon="mosque">
                <p className="text-sm text-mist-300">{pkg.riyazulJannah}</p>
              </Disclosure>
            )}

            {pkg.documents && (
              <Disclosure title="Documents" icon="certificate">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {pkg.documents.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-mist-100">
                      <Icon name="check" strokeWidth={2} className="h-4 w-4 shrink-0 text-jade-300" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-mist-500">{pkg.documentsNote}</p>
              </Disclosure>
            )}
          </div>

          <p className="pm-in mt-6 text-sm text-mist-300">{pkg.booking ?? pkg.groupNote}</p>

          <div className="pm-in mt-6 flex flex-wrap gap-3">
            <a href={waLink(enquiryText(pkg.type, search))} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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
        </div>
      </div>
    </div>
  )
}
