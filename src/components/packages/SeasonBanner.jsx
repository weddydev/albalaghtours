import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { scrollToTarget } from '../../lib/lenis'
import { packages, waLink } from '../../data/content'
import { LanternSVG } from '../ui/Ornaments'
import Icon from '../ui/Icon'

const STARS = [
  [70, 40, 1.6], [150, 24, 1.1], [250, 60, 1.4], [320, 30, 1], [110, 120, 1], [300, 140, 1.3], [210, 18, 0.9], [40, 170, 1.1],
]

const HAJJ = packages.hajj
const CHIPS = [
  { icon: 'bus', label: 'Private bus during the 5 days of Hajj' },
  { icon: 'mapPin', label: 'Ziyarath in Makkah, Madinah & Taif' },
  { icon: 'luggage', label: 'Premium Hajj kit' },
]

/** Hajj 2027 feature: a crescent that inks itself in, twinkling stars and a swaying lantern. */
export default function SeasonBanner() {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', once: true }, defaults: { ease: 'expo.out' } })
          .from(q('.sb-card'), { y: 80, autoAlpha: 0, duration: 1.3 })
          .from(q('.sb-moon-line'), { drawSVG: '0%', duration: 1.8, ease: 'power2.inOut' }, 0.3)
          .from(q('.sb-moon-fill'), { autoAlpha: 0, duration: 1.2 }, 1.2)
          .from(q('.sb-star'), { scale: 0, transformOrigin: '50% 50%', stagger: 0.06, duration: 0.6, ease: 'back.out(3)' }, 0.8)
          .from(q('.sb-copy > *'), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.4)
          .from(q('.sb-lantern'), { y: -160, duration: 1.6, ease: 'bounce.out' }, 0.5)
        gsap.to(q('.sb-star'), { opacity: 0.25, duration: () => gsap.utils.random(0.8, 1.8), repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: 0.3, from: 'random' } })
        gsap.fromTo(q('.sb-rig'), { rotation: -5 }, { rotation: 5, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 0%' })
      })
    },
    { scope: root },
  )

  const showHajj = () => {
    window.dispatchEvent(new CustomEvent('albalagh:search', { detail: { type: 'Hajj' } }))
    scrollToTarget('#pk-section')
  }

  return (
    <section ref={root} className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="sb-card glass-strong relative isolate grid items-center gap-10 overflow-hidden rounded-[36px] p-7 sm:p-12 lg:grid-cols-12">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_40%,rgb(212_175_55/0.2),transparent_70%)]" />
          <div className="pattern-overlay absolute inset-0 -z-10 opacity-[0.05]" />

          <div className="sb-copy lg:col-span-7">
            <p className="eyebrow">This season</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5.4vw,4.6rem)] font-semibold italic leading-[0.95] text-cream-50">
              <span className="text-grad-green pr-[0.05em]">Hajj</span> 2027
            </h2>
            <p className="mt-5 max-w-lg text-mist-300">
              <span className="block font-display text-xl italic text-gold-100">{HAJJ.tagline}</span>
              <span className="mt-3 block">{HAJJ.intro}</span>
            </p>
            <ul className="mt-6 flex flex-wrap gap-2 text-xs">
              {CHIPS.map((c) => (
                <li key={c.label} className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/35 px-3 py-1.5 text-gold-100">
                  <Icon name={c.icon} className="h-3.5 w-3.5 shrink-0 text-gold-300" />
                  {c.label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink(HAJJ.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Enquire about Hajj 2027
                <span className="btn-arrow">
                  <Icon name="whatsapp" className="h-4 w-4" />
                </span>
              </a>
              <button type="button" onClick={showHajj} className="btn btn-ghost">
                View the Hajj programme
                <span className="btn-arrow">
                  <Icon name="arrowUp" className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>

          <div className="relative h-[260px] lg:col-span-5 lg:h-[340px]" aria-hidden="true">
            <svg viewBox="0 0 360 260" className="absolute inset-0 h-full w-full">
              {STARS.map(([x, y, r], i) => (
                <circle key={i} className="sb-star" cx={x} cy={y} r={r * 1.6} fill="#f3dc8f" />
              ))}
              <path className="sb-moon-fill" d="M222 52a78 78 0 1 0 76 108 62 62 0 1 1-76-108z" fill="#d4af37" fillOpacity="0.16" />
              <path className="sb-moon-line" d="M222 52a78 78 0 1 0 76 108 62 62 0 1 1-76-108z" fill="none" stroke="#e8cf7a" strokeWidth="2" />
              <g fill="#05190f" stroke="#d4af37" strokeOpacity="0.5">
                <path d="M120 260v-50c0-22 20-34 40-46 20 12 40 24 40 46v50z" />
                <rect x="96" y="176" width="10" height="84" />
                <rect x="214" y="176" width="10" height="84" />
                <path d="M96 176l5-18 5 18zM214 176l5-18 5 18z" />
              </g>
            </svg>
            <div className="sb-lantern absolute right-[8%] top-[-48px] w-12 sm:right-[14%]">
              <div className="sb-rig flex flex-col items-center">
                <div className="lantern-chain h-20 w-[2px]" />
                <LanternSVG className="w-full drop-shadow-[0_0_16px_rgba(255,190,90,0.6)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
