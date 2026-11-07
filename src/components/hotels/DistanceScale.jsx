import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { hotels } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'
import { fmtDistance } from './HotelPicker'

const MAX = 600
const TICKS = [0, 150, 300, 450, 600]

function Track({ city, list, icon }) {
  return (
    <div className="ds-track relative">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/50 text-gold-200">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <h3 className="font-display text-3xl italic text-cream-50">{city}</h3>
      </div>

      <div className="relative mt-16 h-px sm:mt-20">
        {/* base + progress */}
        <div className="absolute inset-x-0 top-0 h-px bg-gold-400/20" />
        <div className="ds-progress absolute inset-x-0 top-[-1px] h-[3px] origin-left rounded-full bg-linear-to-r from-jade-400 via-gold-300 to-gold-200 shadow-[0_0_14px_rgba(232,207,122,0.6)]" />
        {/* ticks */}
        {TICKS.map((t) => (
          <span key={t} className={`absolute top-2 whitespace-nowrap text-[0.6rem] tracking-[0.12em] text-mist-500 ${t === MAX ? '-translate-x-full text-right' : t === 0 ? '' : '-translate-x-1/2'}`} style={{ left: `${(t / MAX) * 100}%` }}>
            <span className={`mb-1 block h-2 w-px bg-gold-400/30 ${t === MAX ? 'ml-auto' : t === 0 ? '' : 'mx-auto'}`} />
            {t === 0 ? (city === 'Makkah' ? 'Haram' : 'Masjid') : fmtDistance(t)}
          </span>
        ))}
        {/* hotel pins */}
        {list.map((h, i) => (
          <div key={h.id} className="ds-pin absolute top-0" style={{ left: `${(h.distance / MAX) * 100}%` }} data-at={h.distance / MAX}>
            <span className="ds-dot absolute left-0 top-0 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold-300 bg-ink-900 text-[0.6rem] font-semibold text-gold-200">
              {i + 1}
            </span>
            <span className={`absolute left-0 hidden -translate-x-1/2 md:block ${i % 2 ? 'bottom-12' : 'bottom-4'}`}>
              <span className="ds-name block whitespace-nowrap rounded-full border border-gold-400/30 bg-ink-950/70 px-3 py-1 text-xs text-cream-100">{h.name}</span>
            </span>
          </div>
        ))}
        {/* walker */}
        <span className="ds-walker absolute left-[-18px] top-[-18px] grid h-9 w-9 place-items-center rounded-full bg-linear-to-b from-jade-400 to-jade-600 text-white shadow-[0_0_24px_rgba(63,191,116,0.8)]">
          <Icon name="users" className="h-4 w-4" />
        </span>
      </div>

      {/* legend (names under the track on small screens) */}
      <ol className="mt-12 grid gap-2 text-sm md:hidden">
        {list.map((h, i) => (
          <li key={h.id} className="flex items-center justify-between gap-3 border-b border-gold-400/10 pb-2">
            <span className="flex items-center gap-2 text-cream-100">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-gold-300 text-[0.6rem] text-gold-200">{i + 1}</span>
              {h.name}
            </span>
            <span className="text-xs text-mist-500">{fmtDistance(h.distance)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** "Every step counts": for each city a walker glides along a 0–600 m track as you scroll, lighting each hotel it passes. */
export default function DistanceScale() {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        q('.ds-track').forEach((track) => {
          const line = track.querySelector('.ds-progress').parentElement
          const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: track, start: 'top 70%', end: 'bottom 45%', scrub: 0.8 } })
          tl.fromTo(track.querySelector('.ds-progress'), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0).fromTo(
            track.querySelector('.ds-walker'),
            { x: 0 },
            { x: () => line.offsetWidth, duration: 1 },
            0,
          )
          track.querySelectorAll('.ds-pin').forEach((pin) => {
            const at = parseFloat(pin.dataset.at)
            tl.fromTo(pin.querySelector('.ds-dot'), { backgroundColor: '#05190f', color: '#e8cf7a' }, { backgroundColor: '#e8cf7a', color: '#05190f', duration: 0.04 }, at)
            const name = pin.querySelector('.ds-name')
            if (name) tl.fromTo(name, { autoAlpha: 0.35, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.06 }, at)
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden bg-linear-to-b from-transparent via-ink-950/60 to-transparent py-20 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow="Every step counts" title={['How close is ', { accent: 'close' }, '?']} lead="The Umrah group stays 300 m from the Haram in Makkah and 150 m from Masjid an-Nabawi in Madinah — scroll to take the walk." />
        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24">
          <Track city="Makkah" list={hotels.makkah} icon="kaaba" />
          <Track city="Madinah" list={hotels.madinah} icon="mosque" />
        </div>
      </div>
    </section>
  )
}
