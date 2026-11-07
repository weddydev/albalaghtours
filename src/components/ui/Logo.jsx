import { useId } from 'react'

/**
 * Globe with a flight arc and a gold aeroplane.
 * Stroke paths carry `.logo-stroke` (draw-on animation); the plane + origin dot are `.logo-fill`.
 */
export function LogoMark({ className = 'h-11 w-11' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`lg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e4bf" />
          <stop offset="0.5" stopColor="#d9a84e" />
          <stop offset="1" stopColor="#a87b30" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#lg-${id})`} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        {/* globe */}
        <path className="logo-stroke" d="M7 27a15 15 0 1 0 30 0a15 15 0 1 0 -30 0" />
        <path className="logo-stroke" d="M22 12c-5.4 4-7.6 9.4-7.6 15s2.2 11 7.6 15c5.4-4 7.6-9.4 7.6-15s-2.2-11-7.6-15z" opacity="0.55" />
        <path className="logo-stroke" d="M8.6 21h26.8M7 27h30M8.6 33h26.8" opacity="0.55" />
        {/* flight arc */}
        <path className="logo-stroke" d="M3.5 36.5C11 45 31 43 40.5 14.5" strokeWidth="1.4" />
      </g>
      <g className="logo-fill" fill={`url(#lg-${id})`}>
        <circle cx="3.5" cy="36.5" r="1.7" />
        {/* aeroplane, nose up-right at the end of the arc */}
        <path transform="translate(33.6 3.2) scale(0.6) rotate(30 12 12)" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
      </g>
    </svg>
  )
}

export default function Logo({ className = '', compact = false }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={compact ? 'h-9 w-9' : 'h-11 w-11'} />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className="font-display text-[1.55rem] font-semibold tracking-wide text-cream-50">Al Balagh</span>
        <span className="mt-1 text-[0.58rem] font-medium tracking-[0.34em] text-gold-200">TOURS &amp; TRAVELS</span>
      </span>
    </span>
  )
}
