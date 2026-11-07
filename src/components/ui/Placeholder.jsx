import { useId } from 'react'

/* Generic elegant scene: night gradient, crescent, dome + minarets. */
function GenericScene({ id, tone = 'emerald', label }) {
  const tones = {
    emerald: ['#04140c', '#0d3b28', '#2a5a3c'],
    dusk: ['#0b1424', '#3a3550', '#b07a4a'],
    sand: ['#1a140c', '#5a4126', '#c8995a'],
    sky: ['#0a1a2a', '#2b5a7a', '#9cc0cf'],
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
      <path d="M318 62a18 18 0 11-19.5-24 14.4 14.4 0 1019.5 24z" fill="#f3dc8f" opacity="0.85" />
      <g fill="#03110b" opacity="0.85">
        <path d="M140 300v-70c0-34 30-50 60-66 30 16 60 32 60 66v70z" />
        <rect x="104" y="150" width="12" height="150" />
        <rect x="284" y="150" width="12" height="150" />
        <path d="M104 150l6-22 6 22zM284 150l6-22 6 22z" />
        <rect x="0" y="262" width="400" height="38" />
      </g>
      {label && (
        <text x="200" y="288" textAnchor="middle" fill="#e8cf7a" opacity="0.55" fontSize="9" letterSpacing="2" fontFamily="Inter, sans-serif">
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
