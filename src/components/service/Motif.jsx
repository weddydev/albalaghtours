import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

const S = { fill: 'none', stroke: '#e8cf7a', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

/* Each motif: SVG (64×64) with `.m-a` / `.m-b` parts that its loop animates. */
const ART = {
  plane: (
    <g {...S}>
      <path className="m-a" d="M8 44c10-4 22-6 34-4" strokeDasharray="2 4" strokeOpacity="0.6" />
      <g className="m-b">
        <path d="M30 34l3-1 2-10 7 7 2-1-2-10 6-5c1.6-1.5 1.6-3.5.2-4.3-1-.6-2.7-.2-4.2 1.2l-5.4 5-10-3-2.4 1 7 7.4-9.8 2.4-3.6-2-2.6 1 4.4 3.8 1.6 5.8 2.6-1 .4-3.8 8.8-5.4" />
      </g>
    </g>
  ),
  kaaba: (
    <g {...S}>
      <circle className="m-a" cx="32" cy="32" r="26" strokeOpacity="0.35" />
      <g className="m-b">
        <path d="M16 24l16-7 16 7v20l-16 7-16-7z" />
        <path d="M16 24l16 7 16-7M32 31v20" />
        <path d="M16 29l16 7 16-7" stroke="#f3dc8f" strokeWidth="2.2" />
        <path d="M37 38v7" />
      </g>
    </g>
  ),
  palm: (
    <g {...S}>
      <path d="M8 54h48" strokeOpacity="0.5" />
      <g className="m-b">
        <path d="M33 54c.5-9 0-17-2.5-25" />
        <path d="M30.5 29c-4-6-10-7-15-4 5 .4 9 2 11 5M30.5 29c2-6 8-9 14-7.5-4.8 1.4-8 3.6-10 7.2M30.5 29c6.8-1.4 12.8 1.6 15 7.6-4-1.8-8.4-3.2-12.8-2.8M30.5 29c-6 .4-11 4-12.8 9.6 4-3 7.8-4.6 12-5" />
      </g>
      <circle className="m-a" cx="48" cy="14" r="5" stroke="#f3dc8f" />
    </g>
  ),
  stamp: (
    <g {...S}>
      <rect x="14" y="40" width="36" height="16" rx="2" strokeOpacity="0.5" />
      <circle className="m-a" cx="32" cy="48" r="6" stroke="#3fbf74" strokeWidth="2" />
      <g className="m-b">
        <path d="M26 8h12l-2 14h-8z" />
        <path d="M20 30a4 4 0 014-4h16a4 4 0 014 4v4H20z" />
      </g>
    </g>
  ),
  globe: (
    <g {...S}>
      <circle cx="32" cy="32" r="22" />
      <path d="M10 32h44M14 21h36M14 43h36" strokeOpacity="0.6" />
      <ellipse className="m-a" cx="32" cy="32" rx="10" ry="22" />
      <circle className="m-b" cx="50" cy="16" r="3" fill="#f3dc8f" stroke="none" />
    </g>
  ),
  passport: (
    <g {...S}>
      <g className="m-b">
        <rect x="18" y="10" width="28" height="44" rx="3" />
        <circle cx="32" cy="28" r="7" />
        <path d="M25 28h14M32 21c2 2 3 4.4 3 7s-1 5-3 7c-2-2-3-4.4-3-7s1-5 3-7zM24 44h16" />
      </g>
      <circle className="m-a" cx="46" cy="46" r="8" stroke="#3fbf74" strokeWidth="2" />
    </g>
  ),
  shield: (
    <g {...S}>
      <path className="m-b" d="M32 8l18 7v13c0 12-7.6 21-18 25-10.4-4-18-13-18-25V15z" />
      <path className="m-a" d="M23 31l6 6 12-13" stroke="#f3dc8f" strokeWidth="2.4" />
    </g>
  ),
  hotel: (
    <g {...S}>
      <path d="M10 50h44" strokeOpacity="0.5" />
      <g className="m-b">
        <path d="M18 44a14 14 0 0128 0z" />
        <path d="M32 30v-4M28 24h8" />
      </g>
      <path className="m-a" d="M44 18l3-3M47 24h4M42 14v-4" stroke="#f3dc8f" />
    </g>
  ),
  certificate: (
    <g {...S}>
      <rect x="8" y="12" width="40" height="30" rx="2" />
      <path d="M15 21h26M15 28h18" strokeOpacity="0.6" />
      <g className="m-b">
        <circle cx="44" cy="40" r="9" stroke="#f3dc8f" />
        <path d="M44 33l2 4.4 4.6.6-3.4 3.2.8 4.6-4-2.2-4 2.2.8-4.6-3.4-3.2 4.6-.6z" fill="#d4af37" fillOpacity="0.4" />
      </g>
      <path className="m-a" d="M40 48l-2 8 6-3 6 3-2-8" />
    </g>
  ),
  bus: (
    <g {...S}>
      <path className="m-a" d="M6 50h52" strokeDasharray="6 5" strokeOpacity="0.55" />
      <g className="m-b">
        <rect x="12" y="16" width="40" height="26" rx="5" />
        <path d="M12 30h40M20 16v14M32 16v14M44 16v14" />
        <circle cx="21" cy="44" r="3.5" />
        <circle cx="43" cy="44" r="3.5" />
      </g>
    </g>
  ),
  calendar: (
    <g {...S}>
      <rect x="10" y="14" width="44" height="40" rx="4" />
      <path d="M10 24h44M22 8v10M42 8v10" />
      <g className="m-b" style={{ transformOrigin: '32px 24px' }}>
        <rect x="14" y="27" width="36" height="23" rx="2" fill="#082a1c" />
        <path d="M20 34h6M30 34h6M40 34h4M20 42h6M30 42h6" strokeOpacity="0.7" />
      </g>
      <circle className="m-a" cx="42" cy="42" r="3.4" fill="#3fbf74" stroke="none" />
    </g>
  ),
}

/* A small, characterful loop per motif */
const LOOPS = {
  plane: (q) =>
    gsap.to(q('.m-b'), {
      motionPath: { path: [{ x: 0, y: 0 }, { x: 7, y: -6 }, { x: 0, y: -10 }, { x: -6, y: -4 }, { x: 0, y: 0 }], curviness: 1.4 },
      duration: 5,
      ease: 'none',
      repeat: -1,
    }),
  kaaba: (q) => gsap.fromTo(q('.m-a'), { scale: 0.85, opacity: 0.8, transformOrigin: '50% 50%' }, { scale: 1.15, opacity: 0, duration: 2.4, ease: 'power1.out', repeat: -1 }),
  palm: (q) => gsap.fromTo(q('.m-b'), { rotation: -4 }, { rotation: 4, transformOrigin: '50% 100%', duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
  stamp: (q) =>
    gsap
      .timeline({ repeat: -1, repeatDelay: 0.8 })
      .fromTo(q('.m-b'), { y: -6 }, { y: 10, duration: 0.25, ease: 'power3.in' })
      .fromTo(q('.m-a'), { scale: 0.2, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)' })
      .to(q('.m-b'), { y: -6, duration: 0.6, ease: 'power2.out' }, '<')
      .to(q('.m-a'), { opacity: 0, duration: 0.8 }, '+=0.6'),
  globe: (q) => gsap.fromTo(q('.m-a'), { scaleX: 1, transformOrigin: '50% 50%' }, { scaleX: 0.08, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
  passport: (q) => {
    gsap.fromTo(q('.m-b'), { rotation: -6 }, { rotation: 6, transformOrigin: '50% 100%', duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.fromTo(q('.m-a'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(3)', repeat: -1, repeatDelay: 2.4, yoyo: true })
  },
  shield: (q) => {
    gsap.fromTo(q('.m-a'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, ease: 'power2.inOut', repeat: -1, repeatDelay: 1.6 })
    gsap.fromTo(q('.m-b'), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.05, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  },
  hotel: (q) => gsap.fromTo(q('.m-a'), { opacity: 0.2 }, { opacity: 1, duration: 0.4, ease: 'power1.inOut', yoyo: true, repeat: -1, repeatDelay: 0.6 }),
  certificate: (q) => gsap.to(q('.m-b'), { rotation: 360, svgOrigin: '44 40', duration: 14, ease: 'none', repeat: -1 }),
  bus: (q) => {
    gsap.fromTo(q('.m-a'), { strokeDashoffset: 0 }, { strokeDashoffset: -22, duration: 0.9, ease: 'none', repeat: -1 })
    gsap.fromTo(q('.m-b'), { y: 0 }, { y: -1.6, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  },
  calendar: (q) => gsap.fromTo(q('.m-b'), { rotationX: 0 }, { rotationX: -180, opacity: 0, duration: 0.9, ease: 'power2.in', repeat: -1, repeatDelay: 1.6 }),
}

/** Floating glass medallion with a service-specific animated line motif. */
export default function Motif({ type, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(ref)
        gsap.from(ref.current, { autoAlpha: 0, scale: 0.5, rotation: -12, duration: 1.3, delay: 0.9, ease: 'back.out(1.7)' })
        gsap.to(q('.m-float'), { y: -12, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        LOOPS[type]?.(q)
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <div className="m-float glass grid h-full w-full place-items-center rounded-full shadow-[0_0_50px_-10px_rgba(212,175,55,0.55)]">
        <svg viewBox="0 0 64 64" className="h-[58%] w-[58%] overflow-visible">
          {ART[type] || ART.kaaba}
        </svg>
      </div>
    </div>
  )
}
