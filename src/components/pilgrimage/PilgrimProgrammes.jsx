import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { contact, packages, waLink } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import PillTabs from '../ui/PillTabs'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'
import { RouteChip, Stars } from '../packages/ProgrammeBits'
import ProgrammeTimeline from './ProgrammeTimeline'
import ZiyarathGrid from './ZiyarathGrid'

const TABS = [
  { id: 'hajj', label: 'Hajj 2027', icon: 'kaaba' },
  { id: 'umrah', label: 'Umrah', icon: 'mosque' },
]
const FALLBACK = 'radial-gradient(90% 70% at 60% 25%, #6b5a3a 0%, #2a2216 50%, #0a0805 100%)'

function BlockTitle({ eyebrow, children }) {
  return (
    <div className="pp-in">
      {eyebrow && <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-gold-300">{eyebrow}</p>}
      <h3 className="mt-2 flex items-center gap-3 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight text-cream-50">
        <span className="h-px w-8 shrink-0 bg-gold-400/60" aria-hidden="true" />
        {children}
      </h3>
    </div>
  )
}

function Programme({ pkg }) {
  const { programme } = pkg
  const hajj = pkg.type === 'hajj'
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* overview */}
      <div className="pp-in glass-strong grid gap-8 overflow-hidden rounded-[32px] p-6 sm:p-10 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{pkg.season}</p>
          <h3 className="mt-2 font-display text-[clamp(2.4rem,5vw,3.8rem)] font-semibold leading-[1] text-cream-50">{pkg.name}</h3>
          <p className="mt-3 font-display text-xl text-gold-100">{pkg.tagline}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-mist-300">{pkg.intro}</p>
          {pkg.route && <RouteChip route={pkg.route} className="mt-5" />}
        </div>
        <div className="flex min-w-0 flex-col rounded-[24px] border border-gold-400/25 bg-ink-950/45 p-6 lg:col-span-5">
          <dl className="divide-y divide-gold-400/15 text-sm">
            {[
              ['Price', pkg.price, 'star'],
              ['Dates', pkg.dates, 'calendar'],
            ].map(([k, v, icon]) => (
              <div key={k} className="flex items-start gap-3 py-3 first:pt-0">
                <Icon name={icon} className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <dt className="sr-only">{k}</dt>
                <dd className="text-cream-100">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm leading-relaxed text-mist-300">{pkg.booking ?? pkg.groupNote}</p>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <a href={waLink(pkg.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-primary py-1.5 pl-5 text-sm">
              Enquire on WhatsApp
              <span className="btn-arrow h-9 w-9">
                <Icon name="whatsapp" className="h-4 w-4" />
              </span>
            </a>
            <a href={contact.phones[0].href} className="btn btn-ghost py-1.5 pl-5 text-sm">
              Call
              <span className="btn-arrow h-9 w-9">
                <Icon name="phone" className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* inclusions */}
      <div>
        <BlockTitle eyebrow={hajj ? 'Package experience' : 'Inclusions'}>{hajj ? 'Services included' : 'What the group includes'}</BlockTitle>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {pkg.inclusions.map((inc, i) => (
            <li key={inc.title} className="pp-card glass relative min-w-0 overflow-hidden rounded-[24px] p-6">
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-12 place-items-center rounded-t-full border border-gold-400/45 bg-ink-950/40 text-gold-200 shadow-[0_0_24px_-8px_rgba(200,150,62,0.6)]">
                  <Icon name={inc.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-4xl leading-none text-gold-400/25">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h4 className="mt-5 font-display text-[1.45rem] font-semibold leading-tight text-cream-50">{inc.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">{inc.text}</p>
            </li>
          ))}
          {pkg.cta && (
            <li className="pp-card relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-gold-300/60 bg-linear-to-b from-gold-400/15 to-ink-950/40 p-6 shadow-[0_0_40px_-14px_rgba(200,150,62,0.55)]">
              <Icon name="sparkle" className="h-7 w-7 text-gold-200" />
              <h4 className="mt-5 font-display text-[1.45rem] font-semibold leading-tight text-cream-50">{pkg.cta.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">{pkg.cta.text}</p>
              <div className="mt-auto pt-6">
                <a href={waLink(pkg.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-primary py-1.5 pl-5 text-sm">
                  Speak to our team
                  <span className="btn-arrow h-9 w-9">
                    <Icon name="whatsapp" className="h-4 w-4" />
                  </span>
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* programme */}
      <div>
        <BlockTitle eyebrow={programme.eyebrow}>{programme.title}</BlockTitle>
        <div className="mt-10">
          <ProgrammeTimeline steps={programme.steps} label={hajj ? 'Transfer' : 'Umrah'} icon={hajj ? 'bus' : 'kaaba'} />
        </div>
        <p className="pp-in mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-mist-300">{programme.note}</p>
      </div>

      {/* Umrah: Madinah Ziyarath + Riyazul Jannah */}
      {pkg.ziyarath && (
        <div>
          <BlockTitle eyebrow="Extended Ziyarath programme">{pkg.ziyarath.title}</BlockTitle>
          <div className="mt-8">
            <ZiyarathGrid places={pkg.ziyarath.places} />
          </div>
          <p className="pp-in mt-6 text-sm text-mist-300">{pkg.ziyarath.note}</p>
        </div>
      )}
      {pkg.riyazulJannah && (
        <div className="pp-in glass flex flex-col gap-5 rounded-[28px] p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold-400/50 bg-ink-950/50 text-gold-200">
            <Icon name="mosque" className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h4 className="font-display text-2xl font-semibold text-cream-50">Riyazul Jannah arrangements</h4>
            <p className="mt-1 text-sm leading-relaxed text-mist-300">{pkg.riyazulJannah}</p>
          </div>
        </div>
      )}

      {/* hotels */}
      <div>
        <BlockTitle eyebrow="Accommodation">{hajj ? 'Makkah & Madinah hotels' : 'Where the group stays'}</BlockTitle>
        {pkg.hotels.length ? (
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-5">
            {pkg.hotels.map((h) => (
              <li key={h.id} className="pp-card glass flex min-w-0 items-center gap-4 rounded-[24px] p-3 pr-5 sm:gap-6">
                <span className="relative block h-28 w-24 shrink-0 overflow-hidden rounded-[18px] sm:h-32 sm:w-28">
                  <Photo src={h.image} fallback={FALLBACK} sizes="112px">
                    <Icon name="bed" strokeWidth={0.8} className="absolute left-1/2 top-[40%] h-10 w-10 -translate-x-1/2 text-gold-200 opacity-30" />
                  </Photo>
                </span>
                <div className="min-w-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold-300">{h.cityName}</p>
                  <p className="mt-1 font-display text-2xl font-semibold leading-tight text-cream-50">{h.name}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mist-300">
                    <Stars n={h.stars} />
                    {h.stars}-star
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold-400/35 bg-ink-950/50 px-2.5 py-1 text-xs text-gold-100">
                    <Icon name="mapPin" className="h-3.5 w-3.5 shrink-0" />
                    {h.distance}&nbsp;m from {h.from}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // TODO: confirm with client — Hajj hotels
          <p className="pp-in glass mt-8 flex items-center gap-4 rounded-[24px] p-6 text-mist-300">
            <Icon name="bed" className="h-6 w-6 shrink-0 text-gold-200" />
            {pkg.hotelsNote}.
          </p>
        )}
        {!!pkg.hotels.length && <p className="mt-4 text-xs text-mist-500">Photos are representative.</p>}
      </div>
    </div>
  )
}

/** /services/haj-umrah: a Hajj / Umrah toggle over the full detail of each programme. */
export default function PilgrimProgrammes() {
  const root = useRef(null)
  const [type, setType] = useState('hajj')
  const first = useRef(true)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        q('.pp-in, .pp-card').forEach((el) =>
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }),
        )
      })
    },
    { scope: root, dependencies: [type], revertOnUpdate: true },
  )

  // the new panel changes the page height: re-measure every trigger below it
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    ScrollTrigger.refresh()
  }, [type])

  return (
    <section ref={root} id="programmes" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(900px_480px_at_50%_520px,rgb(200_150_62/0.08),transparent)]" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Our programmes"
          title={['Hajj 2027 & ', { accent: 'Umrah' }]}
          lead="Switch between the two programmes for what is included, the programme itself, hotels and how to book."
        />
        <PillTabs tabs={TABS} value={type} onChange={setType} idBase="prog" label="Programme" className="mx-auto mt-10" />
        <div id="prog-panel" role="tabpanel" aria-labelledby={`prog-tab-${type}`} className="mt-12">
          <Programme key={type} pkg={packages[type]} />
        </div>
      </div>
    </section>
  )
}
