import { hero } from '../../data/content'

/* Map-corner mark: a double rule with fine graduation ticks and a coordinate label. */
function Corner({ className = '', style, label }) {
  return (
    <svg viewBox="0 0 220 220" className={className} style={style} aria-hidden="true">
      <g fill="none" stroke="#e6c285" strokeWidth="1" strokeLinecap="round">
        <path d="M10 10h170M10 10v170" strokeOpacity="0.75" />
        <path d="M20 20h110M20 20v110" strokeOpacity="0.4" />
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M${20 + i * 10} 10v${i % 4 ? 5 : 9}M10 ${20 + i * 10}h${i % 4 ? 5 : 9}`} strokeOpacity="0.6" />
        ))}
        <circle cx="10" cy="10" r="3.5" fill="#c8963e" fillOpacity="0.5" />
      </g>
      {label && (
        <text x="32" y="40" fill="#e6c285" fontSize="10" letterSpacing="2.5" fontFamily="Inter, sans-serif">
          {label}
        </text>
      )}
    </svg>
  )
}

/* Compass rose: graduated rings, 32 rhumb lines, an eight-point star and N / E / S / W. */
function Compass({ className = '' }) {
  const pts = [0, 90, 180, 270]
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="#c8963e" strokeWidth="0.35">
        <circle r="98" />
        <circle r="92" strokeDasharray="0.5 2" />
        <circle r="70" />
        <circle r="30" />
        {Array.from({ length: 32 }, (_, i) => (
          <path key={i} d="M0 -30V-92" transform={`rotate(${i * 11.25})`} strokeOpacity={i % 4 ? 0.35 : 0.8} />
        ))}
        {Array.from({ length: 72 }, (_, i) => (
          <path key={`t${i}`} d={`M0 -92V${i % 2 ? -95 : -98}`} transform={`rotate(${i * 5})`} />
        ))}
        {/* eight-point star */}
        {[45, 135, 225, 315].map((a) => (
          <path key={a} d="M0 -50L7 -7 0 0-7 -7z" transform={`rotate(${a})`} />
        ))}
        {pts.map((a) => (
          <path key={a} d="M0 -86L10 -10 0 0-10 -10z" transform={`rotate(${a})`} fill="#c8963e" fillOpacity="0.18" />
        ))}
      </g>
      <g fill="#e6c285" fontSize="9" fontFamily="Cormorant Garamond, serif" fontWeight="600" textAnchor="middle">
        <text y="-73">N</text>
        <text x="77" y="3">E</text>
        <text y="80">S</text>
        <text x="-77" y="3">W</text>
      </g>
    </svg>
  )
}

/** Everything the lantern light can uncover. Sits under the darkness layer. */
export default function SecretLayer() {
  return (
    <div className="h-secret pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
      <div className="pattern-overlay absolute inset-0 opacity-30" />
      <Compass className="absolute left-[calc(50%-min(42vw,470px))] top-[calc(42%-min(42vw,470px))] h-[min(84vw,940px)] w-[min(84vw,940px)] opacity-80" />

      <p className="absolute inset-x-6 top-[13%] text-center font-display text-[8.5vw] font-medium leading-[1.2] text-gold-200 lg:top-[10%] lg:text-[4.2vw]">
        {hero.secretLine}
      </p>
      <p className="absolute inset-x-6 bottom-[31%] mx-auto max-w-5xl max-lg:hidden text-center font-display text-base italic leading-snug text-gold-100 lg:bottom-[29%] lg:text-lg">
        {hero.quote}
      </p>

      <Corner label="17.38° N · 78.48° E" className="absolute left-3 top-20 w-[26vw] max-w-[220px] lg:left-6 lg:top-24" />
      <Corner className="absolute right-3 top-20 w-[26vw] max-w-[220px] lg:right-6 lg:top-24" style={{ transform: 'scaleX(-1)' }} />
      <Corner className="absolute bottom-3 left-3 w-[26vw] max-w-[220px] lg:bottom-6 lg:left-6" style={{ transform: 'scaleY(-1)' }} />
      <Corner className="absolute bottom-3 right-3 w-[26vw] max-w-[220px] lg:bottom-6 lg:right-6" style={{ transform: 'scale(-1,-1)' }} />
    </div>
  )
}
