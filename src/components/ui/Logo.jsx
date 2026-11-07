import { useId } from 'react'

/** Mosque-in-arch mark with gold crescent. Stroke paths carry `.logo-stroke` for draw-on animation. */
export function LogoMark({ className = 'h-11 w-11' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`lg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbefc4" />
          <stop offset="0.5" stopColor="#e2c46a" />
          <stop offset="1" stopColor="#a8862a" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#lg-${id})`} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path className="logo-stroke" d="M6 45V22.5C6 14.5 15 10.5 24 3.5c9 7 18 11 18 19V45" />
        <path className="logo-stroke" d="M10 45V24c0-6 7-9.5 14-15 7 5.5 14 9 14 15v21" opacity="0.55" />
        <path className="logo-stroke" d="M3 45h42" />
        <path className="logo-stroke" d="M14.5 45V27.5M33.5 45V27.5M13.6 27.5h1.8l-.9-2.6zM32.6 27.5h1.8l-.9-2.6z" />
      </g>
      <g className="logo-fill" fill={`url(#lg-${id})`}>
        <path d="M17 36.5c0-5.6 3.3-8.2 7-10.2 3.7 2 7 4.6 7 10.2z" />
        <rect x="16.5" y="36.5" width="15" height="6.5" rx="0.6" />
        <rect x="23.4" y="23" width="1.2" height="3.6" />
        <path d="M26.2 18.6a3.4 3.4 0 11-3.7-4.6 2.7 2.7 0 103.7 4.6z" />
      </g>
      <path d="M22.3 43v-3.2a1.7 1.7 0 013.4 0V43z" fill="#05190f" />
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
