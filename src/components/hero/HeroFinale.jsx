import { hero, heroMedia } from '../../data/content'
import Photo from '../ui/Photo'
import SearchBar from './SearchBar'

const WARM_DARK = 'radial-gradient(70% 60% at 50% 42%, #3b2a10 0%, #171007 50%, #050403 100%)'
const PINS = [40, 500, 960]

/** Kaaba close-up backdrop + warm bloom. */
export function FinaleBackdrop({ className = '' }) {
  return (
    <>
      <div className={`h-finale absolute inset-0 z-[7] ${className}`}>
        <Photo src={heroMedia.finale} fallback={WARM_DARK} width={2000} height={1333} />
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_45%,transparent_30%,rgb(3_17_11/0.75))]" />
        <div className="absolute inset-0 bg-linear-to-b from-ink-950/70 via-ink-950/30 via-60% to-ink-900" />
      </div>
      <div className="h-bloom pointer-events-none absolute inset-0 z-[7] bg-[radial-gradient(50%_45%_at_50%_45%,rgb(255_214_140/0.4),rgb(212_175_55/0.12)_45%,transparent_75%)] lg:mix-blend-screen" />
    </>
  )
}

/** Final copy + glass search bar. */
export function FinaleContent({ className = '' }) {
  return (
    <div className={`h-final pointer-events-none z-[9] flex flex-col items-center justify-center px-5 text-center ${className}`}>
      <p className="h-final-item pointer-events-auto eyebrow">{hero.finalEyebrow}</p>
      <h2 className="h-final-item mt-5 font-display text-[clamp(2.7rem,6.2vw,5.8rem)] font-semibold italic leading-[0.95] text-cream-50">
        {hero.finalTitle[0]}
        <br />
        <span className="text-grad-green pr-[0.06em]">{hero.finalTitle[1]}</span>
      </h2>
      <div className="h-final-item pointer-events-auto mt-8 w-full lg:mt-10">
        <SearchBar />
      </div>
    </div>
  )
}

/** Hyderabad ── Madinah ── Makkah. Pins light up as each stage of the scroll is reached. */
export function RouteLine({ className = '', lit = false }) {
  return (
    <div className={`h-route pointer-events-none z-[9] mx-auto w-[min(88vw,920px)] ${className}`} aria-label={`Route: ${hero.route.join(' to ')}`}>
      <svg viewBox="0 0 1000 28" className="w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="route-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#a8862a" />
            <stop offset="0.5" stopColor="#fbefc4" />
            <stop offset="1" stopColor="#d4af37" />
          </linearGradient>
        </defs>
        <path d="M40 14H960" stroke="#e8cf7a" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 7" />
        <path className="h-route-line" d="M40 14H960" stroke="url(#route-grad)" strokeWidth="1.6" />
        {PINS.map((x, i) => (
          <g key={x} className={`h-pin-${i}`} transform={`translate(${x} 14)`}>
            <g className="h-pin-glow" style={{ opacity: lit ? 1 : 0 }}>
              <circle r="13" fill="#e8cf7a" opacity="0.18" />
              <circle className="h-pin-ring" r="7" fill="none" stroke="#e8cf7a" strokeWidth="1" />
            </g>
            <circle r="5" fill="#05190f" stroke="#e8cf7a" strokeWidth="1.3" />
            <circle className="h-pin-core" r="2.2" fill="#f3dc8f" style={{ opacity: lit ? 1 : 0.25 }} />
          </g>
        ))}
      </svg>
      <div className="relative mt-1 h-5 text-[0.62rem] uppercase tracking-[0.28em]">
        {hero.route.map((name, i) => (
          <span
            key={name}
            className={`h-pin-label-${i} absolute top-0 whitespace-nowrap ${lit ? 'text-gold-200' : 'text-mist-500'}`}
            style={{ left: `${PINS[i] / 10}%`, transform: `translateX(${i === 0 ? '-15%' : i === 2 ? '-85%' : '-50%'})` }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
