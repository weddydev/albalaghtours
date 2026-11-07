import { useEffect, useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { useAppReady } from '../../lib/appState'
import { destinations, hyderabadOnMap } from '../../data/content'

const [HX, HY] = hyderabadOnMap
// label offset [dx, dy, anchor] per destination so nearby names never collide
// (arcs arrive from Hyderabad on the right, so the names sit to the left of their pins)
const LABEL = { madinah: [-2, 1, 'end'], makkah: [-2, 1, 'end'], 'mina-arafat': [-2, 0.6, 'end'], badr: [-2, 1, 'end'], taif: [0, 4.2, 'middle'] }
const arc = ([x, y]) => `M${HX} ${HY} Q${(HX + x) / 2} ${Math.min(HY, y) - 14} ${x} ${y}`

/** Destinations hero art: arcs draw from Hyderabad to each destination; a light travels each route. */
export default function RouteMap() {
  const root = useRef(null)
  const tl = useRef(null)
  const ready = useAppReady()
  const readyRef = useRef(ready)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out' } })
          .from(q('.rm-panel'), { autoAlpha: 0, y: 40, duration: 1.2 }, 0)
          .from(q('.rm-dots'), { autoAlpha: 0, duration: 1.4 }, 0.2)
          .from(q('.rm-home'), { scale: 0, transformOrigin: '50% 50%', duration: 0.9, ease: 'back.out(3)' }, 0.5)
          .from(q('.rm-arc'), { drawSVG: '0%', stagger: 0.18, duration: 1.4, ease: 'power2.inOut' }, 0.7)
          .from(q('.rm-pin'), { scale: 0, transformOrigin: '50% 50%', stagger: 0.18, duration: 0.7, ease: 'back.out(3)' }, 1.4)
          .from(q('.rm-label'), { autoAlpha: 0, stagger: 0.18, duration: 0.6 }, 1.5)
          .from(q('.rm-chip'), { autoAlpha: 0, y: 12, duration: 0.8 }, 2)
          .call(() => {
            q('.rm-traveller').forEach((dot, i) => {
              gsap.fromTo(
                dot,
                { autoAlpha: 0 },
                {
                  autoAlpha: 1,
                  duration: 3,
                  delay: i * 0.7,
                  ease: 'power1.inOut',
                  repeat: -1,
                  repeatDelay: 1.5,
                  motionPath: { path: q('.rm-arc')[i], align: q('.rm-arc')[i], alignOrigin: [0.5, 0.5] },
                },
              )
            })
          })
        gsap.fromTo(q('.rm-pulse'), { scale: 1, opacity: 0.9, transformOrigin: '50% 50%' }, { scale: 3, opacity: 0, duration: 2, repeat: -1, ease: 'power1.out', stagger: 0.4 })
        if (readyRef.current) tl.current.play()
      })
    },
    { scope: root },
  )

  useEffect(() => {
    readyRef.current = ready
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[620px]" aria-hidden="true">
      <div className="rm-panel glass-strong relative overflow-hidden rounded-[36px] p-3 sm:p-5">
        <svg viewBox="0 0 100 62" className="h-auto w-full overflow-visible">
          <defs>
            <pattern id="rm-grid" width="2.4" height="2.4" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="0.28" fill="#d4af37" />
            </pattern>
            <radialGradient id="rm-fade">
              <stop offset="0.55" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="rm-mask">
              <rect width="100" height="62" fill="url(#rm-fade)" />
            </mask>
            <linearGradient id="rm-arc-g" x1="1" x2="0">
              <stop offset="0" stopColor="#5fd28f" />
              <stop offset="1" stopColor="#f3dc8f" />
            </linearGradient>
          </defs>
          <rect className="rm-dots" width="100" height="62" fill="url(#rm-grid)" opacity="0.35" mask="url(#rm-mask)" />

          {destinations.map((d) => (
            <path key={d.slug} className="rm-arc" d={arc(d.map)} fill="none" stroke="url(#rm-arc-g)" strokeWidth="0.35" strokeLinecap="round" />
          ))}
          {destinations.map((d) => (
            <circle key={d.slug} className="rm-traveller" r="0.8" fill="#fff6d6" opacity="0" />
          ))}

          {destinations.map((d) => (
            <g key={d.slug}>
              <circle className="rm-pin rm-pulse" cx={d.map[0]} cy={d.map[1]} r="1.1" fill="none" stroke="#e8cf7a" strokeWidth="0.25" />
              <circle className="rm-pin" cx={d.map[0]} cy={d.map[1]} r="1.1" fill="#e8cf7a" />
              <text className="rm-label" x={d.map[0] + (LABEL[d.slug]?.[0] ?? 0)} y={d.map[1] + (LABEL[d.slug]?.[1] ?? -2.4)} textAnchor={LABEL[d.slug]?.[2] ?? 'middle'} fontSize="2.5" fill="#f3e9cf" fontFamily="Cormorant Garamond, serif" fontStyle="italic">
                {d.name}
              </text>
            </g>
          ))}

          <g className="rm-home">
            <circle className="rm-pulse" cx={HX} cy={HY} r="1.6" fill="none" stroke="#5fd28f" strokeWidth="0.3" />
            <circle cx={HX} cy={HY} r="1.6" fill="#3fbf74" stroke="#d7f8e2" strokeWidth="0.35" />
            <text x={HX + 2} y={HY + 4.6} textAnchor="end" fontSize="2.6" fill="#8be0ab" fontFamily="Inter, sans-serif" letterSpacing="0.3">
              Hyderabad
            </text>
          </g>
        </svg>
        <div className="rm-chip absolute right-4 top-4 rounded-full border border-gold-400/35 bg-ink-950/70 px-4 py-2 text-xs text-gold-100 backdrop-blur sm:right-6 sm:top-6">
          {destinations.length} places on our programmes · from Hyderabad
        </div>
      </div>
    </div>
  )
}
