import { useEffect, useRef } from 'react'
import { gsap, loopsOnlyWhenVisible, useGSAP } from '../../lib/gsap'
import { useAppReady } from '../../lib/appState'
import { hotels } from '../../data/content'

const C = 200
const RINGS = [
  { r: 62, label: '100 m', d: 100 },
  { r: 112, label: '300 m', d: 300 },
  { r: 158, label: '600 m', d: 600 },
  { r: 192, label: '1 km +', d: 1500 },
]
// distance (m) → radius, piecewise between the rings
export function radiusFor(d) {
  let prev = { r: 0, d: 0 }
  for (const ring of RINGS) {
    if (d <= ring.d) return prev.r + ((d - prev.d) / (ring.d - prev.d)) * (ring.r - prev.r)
    prev = ring
  }
  return RINGS[RINGS.length - 1].r
}
const ANGLES = [-50, 35, 145, 230]

/** Hotels hero art: a proximity "radar" around the Kaaba — rings draw, hotels pop in, a beam sweeps. */
export default function DistanceRings() {
  const root = useRef(null)
  const tl = useRef(null)
  const ready = useAppReady()
  const readyRef = useRef(ready)

  const { context: gsapCtx } = useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out' } })
          .from(q('.dr-core'), { scale: 0, transformOrigin: '50% 50%', duration: 1, ease: 'back.out(2)' }, 0.1)
          .from(q('.dr-ring'), { drawSVG: '50% 50%', stagger: 0.15, duration: 1.4, ease: 'power3.inOut' }, 0.2)
          .from(q('.dr-label'), { autoAlpha: 0, y: 6, stagger: 0.12, duration: 0.7 }, 0.8)
          .from(q('.dr-dot'), { scale: 0, transformOrigin: '50% 50%', stagger: 0.12, duration: 0.8, ease: 'back.out(3)' }, 1.1)
          .from(q('.dr-sweep'), { autoAlpha: 0, duration: 1 }, 1.2)
          .from(q('.dr-chip'), { autoAlpha: 0, y: 10, duration: 0.8 }, 1.6)
        gsap.to(q('.dr-sweep'), { rotation: 360, duration: 7, ease: 'none', repeat: -1 })
        gsap.fromTo(q('.dr-pulse'), { scale: 1, opacity: 0.8, transformOrigin: '50% 50%' }, { scale: 3, opacity: 0, duration: 2, repeat: -1, ease: 'power1.out', stagger: 0.5 })
        if (readyRef.current) tl.current.play()
      })
    },
    { scope: root },
  )
  // ambient loops rest while this block is off-screen
  useEffect(() => loopsOnlyWhenVisible(gsapCtx, root.current), [gsapCtx])

  useEffect(() => {
    readyRef.current = ready
    if (ready) tl.current?.play()
  }, [ready])

  const dots = hotels.makkah.map((h, i) => {
    const r = radiusFor(h.distance)
    const a = (ANGLES[i % ANGLES.length] * Math.PI) / 180
    return { ...h, x: C + Math.cos(a) * r, y: C + Math.sin(a) * r }
  })

  return (
    <div ref={root} className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(closest-side,rgb(200_150_62/0.18),transparent)]" />
      {/* sweeping beam */}
      <div className="absolute inset-[4%] overflow-hidden rounded-full">
        <div className="dr-sweep absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgb(230_194_133/0.28),rgb(230_194_133/0.06)_40deg,transparent_70deg)]" />
      </div>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible">
        {RINGS.map((ring, i) => (
          <g key={ring.label}>
            <circle className="dr-ring" cx={C} cy={C} r={ring.r} fill="none" stroke="#c8963e" strokeOpacity={0.75 - i * 0.12} strokeWidth="1" strokeDasharray={i === 3 ? '2 5' : undefined} />
            <text className="dr-label" x={C} y={C - ring.r - 6} textAnchor="middle" fill="#e6c285" fontSize="10" letterSpacing="2" fontFamily="Inter, sans-serif">
              {ring.label}
            </text>
          </g>
        ))}
        {/* Kaaba at the centre */}
        <g className="dr-core">
          <circle cx={C} cy={C} r="26" fill="#1f1510" stroke="#e6c285" strokeWidth="1.2" />
          <g transform={`translate(${C - 12} ${C - 12})`} fill="none" stroke="#eed39a" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M4 8.5L12 5l8 3.5v10L12 22l-8-3.5z" />
            <path d="M4 8.5L12 12l8-3.5M12 12v10M4 11.5l8 3.5 8-3.5" />
          </g>
        </g>
        {dots.map((d) => (
          <g key={d.id} className="dr-dot">
            <circle className="dr-pulse" cx={d.x} cy={d.y} r="6" fill="none" stroke="#e0b866" strokeWidth="1" />
            <circle cx={d.x} cy={d.y} r="6" fill="#d9a84e" stroke="#f3e9d8" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <div className="dr-chip glass absolute bottom-[10%] right-[2%] rounded-2xl px-4 py-3 text-xs sm:right-[6%]">
        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-300">Umrah group · Makkah</p>
        <p className="mt-1 font-display text-lg text-cream-50">{hotels.makkah[0].name}</p>
        <p className="text-mist-300">
          {hotels.makkah[0].stars}-star · {hotels.makkah[0].distance}&nbsp;m from {hotels.makkah[0].from}
        </p>
      </div>
    </div>
  )
}
