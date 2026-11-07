import { useId } from 'react'

/* Pointed ogee (mihrab) arch in unit coordinates — used for clip-paths. */
export const ARCH_UNIT =
  'M0,1 L0,0.34 C0,0.2 0.2,0.15 0.33,0.1 C0.43,0.065 0.48,0.04 0.5,0 C0.52,0.04 0.57,0.065 0.67,0.1 C0.8,0.15 1,0.2 1,0.34 L1,1 Z'
const ARCH_OUTER =
  'M0.6,100 L0.6,34 C0.6,20 20,15 33,10 C43,6.5 48,4 50,0.6 C52,4 57,6.5 67,10 C80,15 99.4,20 99.4,34 L99.4,100'
const ARCH_INNER =
  'M3.6,100 L3.6,35 C3.6,22.5 21.5,17.6 34,13.2 C43.4,9.8 48,7.4 50,4.2 C52,7.4 56.6,9.8 66,13.2 C78.5,17.6 96.4,22.5 96.4,35 L96.4,100'

/**
 * Ogee arch window with thin gold double border.
 * `innerClassName` is applied to the clipped layer (put images there).
 */
export function ArchFrame({ children, className = '', innerClassName = '', borderClassName = '', finial = true }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={`relative ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <clipPath id={`arch-${id}`} clipPathUnits="objectBoundingBox">
          <path d={ARCH_UNIT} />
        </clipPath>
      </svg>
      <div className={`absolute inset-0 ${innerClassName}`} style={{ clipPath: `url(#arch-${id})` }}>
        {children}
      </div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`arch-borders pointer-events-none absolute inset-0 h-full w-full overflow-visible ${borderClassName}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`ab-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbefc4" />
            <stop offset="0.35" stopColor="#d4af37" />
            <stop offset="1" stopColor="#d4af37" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path className="arch-border" d={ARCH_OUTER} fill="none" stroke={`url(#ab-${id})`} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        <path className="arch-border" d={ARCH_INNER} fill="none" stroke={`url(#ab-${id})`} strokeWidth="0.8" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
      </svg>
      {finial && (
        <svg viewBox="0 0 20 34" className="arch-finial pointer-events-none absolute left-1/2 top-0 h-8 w-5 -translate-x-1/2 -translate-y-[88%]" aria-hidden="true">
          <path d="M10 0v8" stroke="#e8cf7a" strokeWidth="1" />
          <path d="M10 8l3 6-3 6-3-6z" fill="#e8cf7a" />
          <circle cx="10" cy="25" r="3" fill="none" stroke="#d4af37" strokeWidth="1" />
          <path d="M10 28v6" stroke="#d4af37" strokeWidth="1" />
        </svg>
      )}
    </div>
  )
}

/* Gold divider: line — diamond — line */
export function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-linear-to-r from-transparent to-gold-400/80" />
      <svg viewBox="0 0 24 12" className="h-3 w-6 text-gold-200">
        <path d="M2 6h4M18 6h4" stroke="currentColor" strokeWidth="1" />
        <path d="M12 1l5 5-5 5-5-5z" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M12 4l2 2-2 2-2-2z" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-linear-to-l from-transparent to-gold-400/80" />
    </div>
  )
}

/* Hanging gold lantern (body only — chain is drawn separately) */
export function LanternSVG({ className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 80 172" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`lm-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8f7020" />
          <stop offset="0.35" stopColor="#f7e3a0" />
          <stop offset="0.6" stopColor="#d4af37" />
          <stop offset="1" stopColor="#6e5518" />
        </linearGradient>
        <radialGradient id={`lf-${id}`} cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor="#fff6d0" />
          <stop offset="0.3" stopColor="#ffd36b" />
          <stop offset="0.7" stopColor="#e88a1d" stopOpacity="0.85" />
          <stop offset="1" stopColor="#7a3d06" stopOpacity="0.6" />
        </radialGradient>
        <filter id={`lb-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {/* hanging ring */}
      <circle cx="40" cy="6" r="4.5" fill="none" stroke={`url(#lm-${id})`} strokeWidth="2" />
      {/* cap */}
      <path d="M40 11c-2 6-9 11-17 14h34c-8-3-15-8-17-14z" fill={`url(#lm-${id})`} />
      <rect x="19" y="25" width="42" height="7" rx="1.5" fill={`url(#lm-${id})`} />
      <path d="M22 28h36" stroke="#5a4512" strokeWidth="0.8" strokeDasharray="1.5 2" />
      {/* glass + flame */}
      <path d="M21 32h38l7 34-7 52H21l-7-52z" fill={`url(#lf-${id})`} className="lantern-glass" />
      <ellipse cx="40" cy="78" rx="10" ry="16" fill="#fff4c8" filter={`url(#lb-${id})`} className="lantern-flame" />
      {/* frame & lattice */}
      <g fill="none" stroke={`url(#lm-${id})`} strokeWidth="2.2" strokeLinejoin="round">
        <path d="M21 32h38l7 34-7 52H21l-7-52z" />
        <path d="M30 32l-3 34 3 52M50 32l3 34-3 52M40 32v86" strokeWidth="1.4" />
        <path d="M14 66h52" strokeWidth="1.6" />
      </g>
      <g fill="none" stroke="#f3dc8f" strokeWidth="0.9" opacity="0.9">
        <path d="M24 60c0-9 3-14 6-18 3 4 6 9 6 18M44 60c0-9 3-14 6-18 3 4 6 9 6 18" />
        <path d="M24 108c0-12 3-18 6-24 3 6 6 12 6 24M44 108c0-12 3-18 6-24 3 6 6 12 6 24" />
      </g>
      {/* base */}
      <rect x="20" y="118" width="40" height="7" rx="1.5" fill={`url(#lm-${id})`} />
      <path d="M24 125h32l-11 20h-10z" fill={`url(#lm-${id})`} />
      <path d="M40 145v12" stroke={`url(#lm-${id})`} strokeWidth="2" />
      <path d="M40 157l4 6-4 7-4-7z" fill="#e8cf7a" />
    </svg>
  )
}

/* Laurel wreath half, used around trust badges */
export function Laurel({ className = '', flip = false }) {
  return (
    <svg viewBox="0 0 16 40" className={className} style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
      <g fill="none" stroke="#d4af37" strokeWidth="1" strokeLinecap="round">
        <path d="M12 38C5 32 3 22 7 4" />
        {[8, 14, 20, 26, 32].map((y, i) => (
          <g key={y}>
            <path d={`M${6.2 - i * 0.2} ${y}c-3-1-4.6-3.4-4.6-6 3 .4 4.6 2.8 4.6 6z`} fill="#d4af37" fillOpacity="0.35" />
            <path d={`M${6.6 + i * 0.4} ${y + 1}c2.6-1.6 3.4-4 3-6.4-2.6 1-3.4 3.6-3 6.4z`} fill="#d4af37" fillOpacity="0.35" />
          </g>
        ))}
      </g>
    </svg>
  )
}
