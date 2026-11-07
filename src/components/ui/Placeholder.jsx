import { useId } from 'react'

/* Generic elegant scene: warm dusk gradient, low sun, layered hills and a small plane. */
function GenericScene({ id, tone = 'emerald', label }) {
  const tones = {
    emerald: ['#1a130e', '#33241a', '#6b4a2a'],
    dusk: ['#1a120c', '#3b2a22', '#b07a4a'],
    sand: ['#1a140c', '#5a4126', '#c8995a'],
    sky: ['#1a120c', '#5a3f28', '#cdb48a'],
  }
  const [a, b, c] = tones[tone] || tones.emerald
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="0.6" stopColor={b} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#g-${id})`} />
      <circle cx="280" cy="196" r="34" fill="#eed39a" opacity="0.55" />
      <path d="M96 70l14-2 6-7h3l-3 7 9-1 3-3h2l-1 4 1 4h-2l-3-3-9-1 3 7h-3l-6-7-14-2z" fill="#eed39a" opacity="0.7" />
      <g fill="#17110d">
        <path d="M0 236c60-30 120-34 180-14s120 10 220-24v102H0z" opacity="0.6" />
        <path d="M0 262c80-22 150-18 220-4s120 4 180-10v52H0z" opacity="0.9" />
      </g>
      {label && (
        <text x="200" y="288" textAnchor="middle" fill="#e6c285" opacity="0.55" fontSize="9" letterSpacing="2" fontFamily="Inter, sans-serif">
          {label.toUpperCase()}
        </text>
      )}
    </svg>
  )
}

export default function Placeholder({ tone, label, className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <GenericScene id={id} tone={tone} label={label} />
    </div>
  )
}
