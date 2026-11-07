import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { scrollToTarget } from '../../lib/lenis'
import { enquiry, hotels, hotelsNote, waLink } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'
import PillTabs from '../ui/PillTabs'

const CITIES = [
  { id: 'makkah', label: 'Makkah hotels', icon: 'kaaba' },
  { id: 'madinah', label: 'Madinah hotels', icon: 'mosque' },
]
const AMENITY_ICON = {
  'Hyderabadi buffet meals': 'utensils',
  'Laundry service': 'shirt',
}
const GROUP = 'Ziyarath Special Umrah'
const FALLBACK = 'radial-gradient(90% 70% at 60% 25%, #6b5a3a 0%, #2a2216 50%, #0a0805 100%)'
export const fmtDistance = (m) => (m >= 1000 ? `${(m / 1000).toFixed(1)}\u00a0km` : `${m}\u00a0m`)

function Stars({ n, className = 'h-3.5 w-3.5' }) {
  return (
    <span className="flex gap-0.5 text-gold-200" role="img" aria-label={`${n}-star`}>
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} name="star" strokeWidth={1.6} className={`fill-gold-300/80 ${className}`} />
      ))}
    </span>
  )
}

/**
 * Makkah / Madinah tabs, a radio list of hotels and a sticky "your selection" panel.
 * Switching city staggers the list in; choosing a hotel re-reveals the panel.
 */
export default function HotelPicker() {
  const root = useRef(null)
  const [city, setCity] = useState('makkah')
  const [selectedId, setSelectedId] = useState(hotels.makkah[0].id)
  const list = hotels[city]
  const selected = list.find((h) => h.id === selectedId) || list[0]
  const cityName = city === 'makkah' ? 'Makkah' : 'Madinah'

  const changeCity = (c) => {
    setCity(c)
    setSelectedId(hotels[c][0].id)
  }

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.from(q('.hp-item'), { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.hp-list')[0], start: 'top 85%', once: true } })
        gsap.from(q('.hp-panel'), { y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: q('.hp-panel')[0], start: 'top 85%', once: true } })
      })
    },
    { scope: root },
  )

  const firstCity = useRef(true)
  useLayoutEffect(() => {
    if (firstCity.current) {
      firstCity.current = false
      return
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(root.current.querySelectorAll('.hp-item'), { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.07, duration: 0.8, ease: 'expo.out' })
    }
    ScrollTrigger.refresh()
  }, [city])

  const firstSel = useRef(true)
  useLayoutEffect(() => {
    if (firstSel.current) {
      firstSel.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const q = gsap.utils.selector(root)
    gsap.fromTo(q('.hp-reveal'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut' })
    gsap.fromTo(q('.hp-swap'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.7, ease: 'expo.out', delay: 0.15 })
  }, [selected.id])

  return (
    <div ref={root}>
      <PillTabs tabs={CITIES} value={city} onChange={changeCity} idBase="hotels" label="City" className="mx-auto" />

      <div id="hotels-panel" role="tabpanel" aria-labelledby={`hotels-tab-${city}`} className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <fieldset className="hp-list lg:col-span-7">
          <legend className="sr-only">Choose a hotel in {cityName}</legend>
          <ul className="space-y-4">
            {list.map((h) => {
              const on = h.id === selected.id
              return (
                <li key={h.id} className="hp-item">
                  <label
                    className={`group relative flex cursor-pointer items-center gap-4 rounded-[24px] border p-3 pr-5 transition-all duration-500 sm:gap-6 ${
                      on
                        ? 'border-gold-300/80 bg-ink-800/60 shadow-[0_20px_50px_-25px_rgba(212,175,55,0.6)]'
                        : 'border-gold-400/20 bg-ink-900/40 hover:border-gold-400/50'
                    } has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-gold-200`}
                  >
                    <input type="radio" name={`hotel-${city}`} value={h.id} checked={on} onChange={() => {
                        setSelectedId(h.id)
                        // on phones the panel sits under the list — bring it into view
                        if (!window.matchMedia('(min-width: 1024px)').matches) setTimeout(() => scrollToTarget('.hp-panel', -90), 150)
                      }} className="sr-only" />
                    <div className="relative h-28 w-24 shrink-0 sm:h-32 sm:w-28">
                      <ArchFrame className="h-full w-full" innerClassName="bg-ink-900" finial={false}>
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                          <Photo src={h.image} fallback={FALLBACK} sizes="112px">
                            <Icon name="bed" strokeWidth={0.8} className="absolute left-1/2 top-[40%] h-10 w-10 -translate-x-1/2 text-gold-200 opacity-30" />
                          </Photo>
                        </div>
                      </ArchFrame>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xl font-semibold leading-tight text-cream-50 sm:text-2xl">{h.name}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <Stars n={h.stars} />
                        <span className="text-xs text-mist-500">
                          {h.stars}-star · {GROUP}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/35 bg-ink-950/50 px-2.5 py-1 text-xs text-gold-100">
                          <Icon name="mapPin" className="h-3.5 w-3.5 shrink-0" />
                          {fmtDistance(h.distance)} from {h.from}
                        </span>
                        <span className="hidden flex-wrap items-center gap-x-3 gap-y-1 text-mist-300 sm:flex">
                          {h.amenities.map((a) => (
                            <span key={a} title={a} className="inline-flex items-center gap-1 text-xs">
                              <Icon name={AMENITY_ICON[a] || 'check'} className="h-3.5 w-3.5 text-gold-300" />
                              {a}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-colors ${on ? 'border-jade-400' : 'border-gold-400/40'}`}
                      aria-hidden="true"
                    >
                      <span className={`h-3 w-3 rounded-full bg-jade-400 transition-transform duration-300 ${on ? 'scale-100' : 'scale-0'}`} />
                    </span>
                  </label>
                </li>
              )
            })}
            <li className="hp-item flex items-center gap-4 rounded-[24px] border border-dashed border-gold-400/30 p-4 pr-5 sm:gap-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-400/40 text-gold-200">
                <Icon name="kaaba" className="h-5 w-5" />
              </span>
              <p className="min-w-0 text-sm text-mist-300">
                <span className="block font-display text-lg italic text-cream-50">Hajj 2027</span>
                {hotelsNote}
              </p>
            </li>
          </ul>
          <p className="mt-5 text-xs text-mist-500">Stays for the {GROUP} group. Photos are representative. Availability is confirmed by the office when you enquire.</p>
        </fieldset>

        <aside className="hp-panel lg:col-span-5" aria-live="polite" aria-label="Your selection">
          <div className="glass-strong overflow-hidden rounded-[30px] p-3 lg:sticky lg:top-28">
            <div className="hp-reveal relative h-56 overflow-hidden rounded-[22px] sm:h-64">
              <Photo src={selected.image} fallback={FALLBACK}>
                <Icon name="bed" strokeWidth={0.6} className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-gold-200 opacity-20" />
              </Photo>
              <div className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-gold-400/40 bg-ink-950/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold-100 backdrop-blur">
                Your selection
              </span>
              <span className="absolute bottom-3 right-3 rounded-full bg-ink-950/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-mist-300">Representative image</span>
            </div>
            <div className="px-4 pb-4 pt-5 sm:px-5">
              <p className="hp-swap text-xs uppercase tracking-[0.22em] text-gold-300">
                {cityName} · {GROUP}
              </p>
              <h3 className="hp-swap mt-1 font-display text-3xl font-semibold italic text-cream-50">{selected.name}</h3>
              <div className="hp-swap mt-2">
                <Stars n={selected.stars} className="h-4 w-4" />
              </div>
              <div className="hp-swap mt-5">
                <div className="flex justify-between text-xs text-mist-500">
                  <span>{city === 'makkah' ? 'Haram' : 'Masjid an-Nabawi'}</span>
                  <span>{fmtDistance(selected.distance)}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gold-400/15">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-jade-400 to-gold-300 transition-[width] duration-700"
                    style={{ width: `${Math.min(100, (selected.distance / 1500) * 100)}%` }}
                  />
                </div>
              </div>
              <ul className="hp-swap mt-5 grid gap-2 sm:grid-cols-2">
                {selected.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 rounded-xl border border-gold-400/15 px-3 py-2 text-sm text-mist-100">
                    <Icon name={AMENITY_ICON[a] || 'check'} className="h-4 w-4 text-gold-200" />
                    {a}
                  </li>
                ))}
              </ul>
              <a
                href={waLink(enquiry.umrah)}
                target="_blank"
                rel="noopener noreferrer"
                className="hp-swap btn btn-primary mt-6 w-full justify-between"
              >
                Enquire about the Umrah group
                <span className="btn-arrow">
                  <Icon name="whatsapp" className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
