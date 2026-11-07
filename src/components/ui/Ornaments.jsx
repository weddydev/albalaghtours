import { useId } from 'react'

/* Soft rounded-top window (think aircraft window / gallery frame) in unit coordinates — used for clip-paths. */
export const ARCH_UNIT = 'M0,1 L0,0.2 C0,0.075 0.1,0 0.24,0 L0.76,0 C0.9,0 1,0.075 1,0.2 L1,1 Z'
const ARCH_OUTER = 'M0.6,100 L0.6,20 C0.6,7.5 10,0.6 24,0.6 L76,0.6 C90,0.6 99.4,7.5 99.4,20 L99.4,100'
const ARCH_INNER = 'M3.6,100 L3.6,21 C3.6,9.6 12,3.6 25,3.6 L75,3.6 C88,3.6 96.4,9.6 96.4,21 L96.4,100'

/**
 * Rounded-top frame with a thin gold double border.
 * `innerClassName` is applied to the clipped layer (put images there).
 * (`finial` is accepted for backwards compatibility and ignored.)
 */
// eslint-disable-next-line no-unused-vars
export function ArchFrame({ children, className = '', innerClassName = '', borderClassName = '', finial }) {
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
            <stop offset="0" stopColor="#f6e7c6" />
            <stop offset="0.35" stopColor="#c8963e" />
            <stop offset="1" stopColor="#c8963e" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path className="arch-border" d={ARCH_OUTER} fill="none" stroke={`url(#ab-${id})`} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        <path className="arch-border" d={ARCH_INNER} fill="none" stroke={`url(#ab-${id})`} strokeWidth="0.7" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
      </svg>
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

/* Classic brass storm (hurricane) lantern — body only, the chain is drawn separately */
export function LanternSVG({ className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 80 172" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`lm-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7e5c24" />
          <stop offset="0.35" stopColor="#f1d9a6" />
          <stop offset="0.6" stopColor="#c8963e" />
          <stop offset="1" stopColor="#5a3f1a" />
        </linearGradient>
        <radialGradient id={`lf-${id}`} cx="0.5" cy="0.58" r="0.62">
          <stop offset="0" stopColor="#fff6d0" />
          <stop offset="0.3" stopColor="#ffd36b" />
          <stop offset="0.7" stopColor="#e88a1d" stopOpacity="0.8" />
          <stop offset="1" stopColor="#7a3d06" stopOpacity="0.5" />
        </radialGradient>
        <filter id={`lb-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {/* hanging ring + wire bail */}
      <circle cx="40" cy="6" r="4.5" fill="none" stroke={`url(#lm-${id})`} strokeWidth="2" />
      <path d="M14 66C12 30 68 30 66 66" fill="none" stroke={`url(#lm-${id})`} strokeWidth="1.6" />
      <path d="M40 10.5V24" stroke={`url(#lm-${id})`} strokeWidth="1.6" />
      {/* chimney + hood */}
      <rect x="33" y="24" width="14" height="9" rx="2" fill={`url(#lm-${id})`} />
      <path d="M22 46h36l-8-13H30z" fill={`url(#lm-${id})`} />
      <rect x="20" y="46" width="40" height="5" rx="1.5" fill={`url(#lm-${id})`} />
      {/* glass globe + flame */}
      <path d="M26 51c-9 10-12 22-12 36s4 26 12 34h28c8-8 12-20 12-34s-3-26-12-36z" fill={`url(#lf-${id})`} className="lantern-glass" />
      <ellipse cx="40" cy="92" rx="8" ry="15" fill="#fff4c8" filter={`url(#lb-${id})`} className="lantern-flame" />
      <path d="M40 84c-3 5-4 9-2 13 1 2 3 2 4 0 2-4 1-8-2-13z" fill="#fff8e0" opacity="0.9" />
      {/* wire guard */}
      <g fill="none" stroke={`url(#lm-${id})`} strokeWidth="1.3">
        <path d="M24 52c-8 10-11 22-11 35s3 25 11 34M56 52c8 10 11 22 11 35s-3 25-11 34" />
        <path d="M40 51v70" strokeWidth="0.8" opacity="0.7" />
        <path d="M14 87h52" strokeWidth="1" />
      </g>
      {/* fuel tank + base */}
      <rect x="20" y="121" width="40" height="5" rx="1.5" fill={`url(#lm-${id})`} />
      <path d="M18 126h44l3 16c0 7-11 11-25 11s-25-4-25-11z" fill={`url(#lm-${id})`} />
      <path d="M24 136h32" stroke="#5a3f1a" strokeWidth="0.8" strokeDasharray="1.5 2" />
      <rect x="31" y="153" width="18" height="4" rx="1.5" fill={`url(#lm-${id})`} />
    </svg>
  )
}

/* Laurel wreath half, used around trust badges */
export function Laurel({ className = '', flip = false }) {
  return (
    <svg viewBox="0 0 16 40" className={className} style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
      <g fill="none" stroke="#c8963e" strokeWidth="1" strokeLinecap="round">
        <path d="M12 38C5 32 3 22 7 4" />
        {[8, 14, 20, 26, 32].map((y, i) => (
          <g key={y}>
            <path d={`M${6.2 - i * 0.2} ${y}c-3-1-4.6-3.4-4.6-6 3 .4 4.6 2.8 4.6 6z`} fill="#c8963e" fillOpacity="0.35" />
            <path d={`M${6.6 + i * 0.4} ${y + 1}c2.6-1.6 3.4-4 3-6.4-2.6 1-3.4 3.6-3 6.4z`} fill="#c8963e" fillOpacity="0.35" />
          </g>
        ))}
      </g>
    </svg>
  )
}
