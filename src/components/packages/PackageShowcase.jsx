import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Flip, gsap, ScrollTrigger } from '../../lib/gsap'
import { enquiryText, packages, waLink } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'
import PackageModal from './PackageModal'
import { RouteChip } from './ProgrammeBits'

const FALLBACK = 'radial-gradient(90% 70% at 50% 25%, #3a4a5c 0%, #142233 45%, #050a10 100%)'
const TABS = [
  { id: 'hajj', label: 'Hajj 2027', icon: 'kaaba' },
  { id: 'umrah', label: 'Umrah', icon: 'mosque' },
]

/** One programme as a large card: arch photo, badge, highlights, route, "contact for price". */
export function PackageCard({ pkg, onDetails, search }) {
  return (
    <article className="pk-card glass group relative grid overflow-hidden rounded-[32px] p-3 transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgba(212,175,55,0.5)] lg:grid-cols-12 lg:gap-4">
      <div className="relative h-60 sm:h-80 lg:col-span-5 lg:h-auto lg:min-h-[480px]">
        <ArchFrame className="h-full w-full" innerClassName="bg-ink-900" finial={false}>
          <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
            <Photo src={pkg.image} alt={`${pkg.name} — Al Balagh Tours & Travels`} fallback={FALLBACK} width={1000} height={667} sizes="(max-width: 1023px) 92vw, 520px">
              <Icon name={pkg.type === 'umrah' ? 'mosque' : 'kaaba'} strokeWidth={0.7} className="absolute left-1/2 top-[30%] h-1/2 w-1/2 -translate-x-1/2 text-gold-200 opacity-20" />
            </Photo>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-950/80 to-transparent" />
        </ArchFrame>
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-linear-to-b from-gold-100 to-gold-400 px-3 py-1 text-xs font-semibold text-ink-900 shadow-[0_8px_20px_-6px_rgba(212,175,55,0.7)]">
          <Icon name="star" strokeWidth={2} className="h-3 w-3" />
          {pkg.badge}
        </span>
      </div>

      <div className="flex min-w-0 flex-col px-3 pb-3 pt-6 sm:px-6 lg:col-span-7 lg:py-8 lg:pr-8">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-gold-300">{pkg.season}</p>
        <h3 className="mt-2 font-display text-[2.1rem] font-semibold leading-[1.05] text-cream-50 sm:text-[2.7rem]">{pkg.name}</h3>
        <p className="mt-2 font-display text-lg italic text-gold-100 sm:text-xl">{pkg.tagline}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist-300 sm:text-[0.95rem]">{pkg.intro}</p>
        {pkg.route && <RouteChip route={pkg.route} className="mt-5 self-start" />}

        <ul className="mb-7 mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2">
          {pkg.highlights.map((h) => (
            <li key={h.label} className="flex min-w-0 items-center gap-3 text-[0.88rem] text-mist-100">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-400/35 bg-ink-950/40 text-gold-200">
                <Icon name={h.icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0">{h.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-gold-400/15 pt-5">
          <div>
            <p className="text-[0.7rem] text-mist-500">Price &amp; dates</p>
            <p className="font-display text-[1.7rem] font-semibold leading-tight text-cream-50 sm:text-3xl">Contact for price</p>
            <p className="mt-1 text-[0.72rem] text-mist-500">{pkg.dates}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {onDetails && (
              <button
                type="button"
                onClick={() => onDetails(pkg)}
                aria-label={`View details of ${pkg.name}`}
                className="inline-flex h-12 items-center gap-1.5 rounded-full border border-gold-400/50 px-5 text-sm font-medium text-gold-100 transition hover:border-gold-200 hover:bg-gold-400/10"
              >
                View details
                <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </button>
            )}
            <a
              href={waLink(enquiryText(pkg.type, search))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${pkg.name} on WhatsApp`}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-300/60 bg-linear-to-b from-jade-400 to-jade-600 text-white shadow-[0_10px_24px_-8px_rgba(63,191,116,0.8)] transition-transform hover:scale-105"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * Hajj / Umrah tab switch (Flip-animated indicator) + the programme card, which slides like a
 * carousel when the tab changes (arrow keys on the tabs, or a horizontal swipe on the card).
 * Listens for the hero search bar's `albalagh:search` event to preselect a tab; the search
 * choices (month, travellers) are carried into the WhatsApp text when given.
 */
export default function PackageShowcase({ initial = 'hajj', search: initialSearch }) {
  const [active, setActive] = useState(initial) // tab button + indicator
  const [tab, setTab] = useState(initial) // card on show (swaps after the slide-out)
  const [search, setSearch] = useState(initialSearch)
  const panel = useRef(null)
  const indicator = useRef(null)
  const flipState = useRef(null)
  const firstRender = useRef(true)
  const direction = useRef(1)
  const touch = useRef(null)
  const [details, setDetails] = useState(null)

  const change = (next) => {
    if (next === active) return
    direction.current = TABS.findIndex((t) => t.id === next) > TABS.findIndex((t) => t.id === active) ? 1 : -1
    flipState.current = Flip.getState(indicator.current)
    setActive(next)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !panel.current) {
      setTab(next)
      return
    }
    gsap.to(panel.current.querySelectorAll('.pk-cell'), {
      autoAlpha: 0,
      x: -60 * direction.current,
      duration: 0.3,
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => setTab(next),
    })
  }

  // indicator glides to the newly selected tab
  useLayoutEffect(() => {
    if (!flipState.current) return
    Flip.from(flipState.current, { duration: 0.6, ease: 'expo.out' })
    flipState.current = null
  }, [active])

  useEffect(() => {
    const onSearch = (e) => {
      const t = e.detail?.type?.toLowerCase()
      if (t !== 'hajj' && t !== 'umrah') return
      if (e.detail.travellers) setSearch({ month: e.detail.month, travellers: e.detail.travellers })
      change(t)
    }
    window.addEventListener('albalagh:search', onSearch)
    return () => window.removeEventListener('albalagh:search', onSearch)
  })

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(panel.current.querySelectorAll('.pk-cell'), { autoAlpha: 0, x: 60 * direction.current }, { autoAlpha: 1, x: 0, duration: 0.8, ease: 'expo.out' })
    }
    ScrollTrigger.refresh()
  }, [tab])

  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const i = TABS.findIndex((t) => t.id === active)
    const next = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length]
    change(next.id)
    document.getElementById(`pk-tab-${next.id}`)?.focus()
  }

  // horizontal swipe on the card switches programme; vertical drags are left to the page
  const onTouchStart = (e) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return
    const i = TABS.findIndex((x) => x.id === active)
    const next = TABS[i + (dx < 0 ? 1 : -1)]
    if (next) change(next.id)
  }

  return (
    <div id="packages">
      <div role="tablist" aria-label="Programme" onKeyDown={onKey} className="mx-auto flex w-fit rounded-full border border-gold-400/30 bg-ink-950/60 p-1.5">
        {TABS.map((t) => {
          const selected = active === t.id
          return (
            <button
              key={t.id}
              id={`pk-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="pk-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => change(t.id)}
              className={`relative flex min-h-[44px] items-center gap-2 rounded-full px-6 text-sm font-medium transition-colors sm:px-8 ${
                selected ? 'text-white' : 'text-mist-300 hover:text-cream-50'
              }`}
            >
              {selected && (
                <span
                  ref={indicator}
                  data-flip-id="pk-indicator"
                  aria-hidden="true"
                  className="absolute inset-0 -z-0 rounded-full bg-linear-to-b from-jade-400 to-jade-600 shadow-[0_8px_24px_-8px_rgba(63,191,116,0.9),inset_0_1px_0_rgba(255,255,255,0.35)]"
                />
              )}
              <Icon name={t.icon} className="relative h-4 w-4" />
              <span className="relative">{t.label}</span>
            </button>
          )
        })}
      </div>

      <div
        ref={panel}
        id="pk-panel"
        role="tabpanel"
        aria-labelledby={`pk-tab-${active}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="mx-auto mt-10 max-w-[1180px] touch-pan-y overflow-x-clip"
      >
        <div key={tab} className="pk-cell">
          <PackageCard pkg={packages[tab]} onDetails={setDetails} search={search} />
        </div>
        <p className="mt-4 text-center text-xs text-mist-500">
          <span className="pointer-coarse:hidden">Use the tabs (or ← → keys) to switch programme.</span>
          <span className="hidden pointer-coarse:inline">Swipe the card or use the tabs to switch programme.</span>
        </p>
      </div>
      {details && createPortal(<PackageModal pkg={details} search={search} onClose={() => setDetails(null)} />, document.body)}
    </div>
  )
}
