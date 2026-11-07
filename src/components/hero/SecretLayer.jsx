import { hero } from '../../data/content'

/* Fine gold filigree for one corner (flipped for the others) */
function Filigree({ className = '', style }) {
  return (
    <svg viewBox="0 0 220 220" className={className} style={style} aria-hidden="true">
      <g fill="none" stroke="#e8cf7a" strokeWidth="1" strokeLinecap="round">
        <path d="M10 10h150M10 10v150M22 22h100M22 22v100" strokeOpacity="0.7" />
        <path d="M22 60c46 0 70 22 70 64 0 22-14 33-28 25-12-7-6-24 6-20" />
        <path d="M60 22c0 46 22 70 64 70 22 0 33-14 25-28-7-12-24-6-20 6" />
        <path d="M92 124c18 6 30 22 30 46M124 92c6 18 22 30 46 30" strokeOpacity="0.7" />
        <path d="M70 70c22 8 34 24 32 50-16-14-28-28-32-50zM70 70c8 22 24 34 50 32-14-16-28-28-50-32z" fill="#d4af37" fillOpacity="0.18" />
        <path d="M16 16l8 0 0 8-8 0z" transform="rotate(45 20 20)" fill="#e8cf7a" />
      </g>
      <g fill="#e8cf7a">
        <circle cx="170" cy="10" r="2" />
        <circle cx="10" cy="170" r="2" />
        <circle cx="186" cy="10" r="1.2" />
        <circle cx="10" cy="186" r="1.2" />
      </g>
    </svg>
  )
}

/* Eight-fold rosette of interlaced squares and petals */
function Rosette({ className = '' }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="#d4af37" strokeWidth="0.35">
        <circle r="98" />
        <circle r="94" strokeDasharray="0.5 2" />
        <rect x="-62" y="-62" width="124" height="124" />
        <rect x="-62" y="-62" width="124" height="124" transform="rotate(45)" />
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d="M0 -88C14 -70 14 -50 0 -36C-14 -50 -14 -70 0 -88z" transform={`rotate(${i * 22.5})`} />
        ))}
        <circle r="36" />
        <circle r="22" />
        <polygon points="0,-22 6,-6 22,0 6,6 0,22 -6,6 -22,0 -6,-6" />
      </g>
    </svg>
  )
}

/** Everything the lantern light can uncover. Sits under the darkness layer. */
export default function SecretLayer() {
  return (
    <div className="h-secret pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
      <div className="pattern-overlay absolute inset-0 opacity-30" />
      <Rosette className="absolute left-[calc(50%-min(42vw,470px))] top-[calc(42%-min(42vw,470px))] h-[min(84vw,940px)] w-[min(84vw,940px)] opacity-80" />

      <p
        lang="ar"
        dir="rtl"
        className="absolute inset-x-6 top-[13%] text-center font-arabic text-[8vw] leading-[1.5] text-gold-200 lg:top-[11%] lg:text-[4.4vw]"
      >
        {hero.ayah}
      </p>
      <p className="absolute inset-x-6 bottom-[31%] mx-auto max-w-5xl max-lg:hidden text-center font-display text-base italic leading-snug text-gold-100 lg:bottom-[29%] lg:text-lg">
        {hero.translation}
      </p>

      <Filigree className="absolute left-3 top-20 w-[26vw] max-w-[220px] lg:left-6 lg:top-24" />
      <Filigree className="absolute right-3 top-20 w-[26vw] max-w-[220px] lg:right-6 lg:top-24" style={{ transform: 'scaleX(-1)' }} />
      <Filigree className="absolute bottom-3 left-3 w-[26vw] max-w-[220px] lg:bottom-6 lg:left-6" style={{ transform: 'scaleY(-1)' }} />
      <Filigree className="absolute bottom-3 right-3 w-[26vw] max-w-[220px] lg:bottom-6 lg:right-6" style={{ transform: 'scale(-1,-1)' }} />
    </div>
  )
}
