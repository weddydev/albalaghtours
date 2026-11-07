import { useRef, useEffect } from 'react'
import { gsap, loopsOnlyWhenVisible, useGSAP } from '../../lib/gsap'

const GOLD = '#c8963e'
const RED = '#b3171f' // Albanian accent — only the small flag and the bag stripe

// city blocks along the skyline: [x, width, height]
const BLOCKS = [
  [20, 46, 60], [70, 34, 88], [108, 52, 48], [164, 40, 74], [210, 30, 56], [246, 58, 92], [520, 36, 66],
  [820, 44, 82], [868, 30, 58], [902, 56, 96], [962, 38, 64], [1004, 48, 86], [1056, 34, 52], [1094, 54, 78], [1152, 40, 60],
]
const BASE = 250

/**
 * Original illustration: a Tirana skyline (Dajti mountains, the clock tower, a mosque dome and
 * minaret, the pyramid, city blocks) with a delivery rider crossing on a scooter. Wheels spin,
 * the rider bounces, speed lines flicker. Loops gently, pauses when off screen, and stays
 * still for reduced motion.
 */
export default function RiderScene({ className = '' }) {
  const root = useRef(null)

  const { context: gsapCtx } = useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const loops = [
          gsap.fromTo(q('.rs-rider'), { x: -260 }, { x: 1300, duration: 12, ease: 'none', repeat: -1 }),
          gsap.to(q('.rs-wheel'), { rotation: 360, transformOrigin: '50% 50%', duration: 0.55, ease: 'none', repeat: -1 }),
          gsap.to(q('.rs-bounce'), { y: -2.5, duration: 0.22, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
          gsap.fromTo(q('.rs-speed'), { scaleX: 0.35, opacity: 0.2, transformOrigin: '100% 50%' }, { scaleX: 1, opacity: 0.85, duration: 0.32, stagger: 0.09, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
          gsap.to(q('.rs-window'), { opacity: 0.2, duration: () => gsap.utils.random(1.2, 2.6), ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.35, from: 'random' } }),
        ]
        // only animate while the scene is on screen (works the same with native scroll and Lenis)
        // a fast scroll can queue several entries: the last one is the current state
        const io = new IntersectionObserver((entries) => {
          const on = entries[entries.length - 1].isIntersecting
          loops.forEach((t) => (on ? t.play() : t.pause()))
        })
        io.observe(root.current)
        return () => io.disconnect()
      })
    },
    { scope: root },
  )
  // ambient loops rest while this block is off-screen
  useEffect(() => loopsOnlyWhenVisible(gsapCtx, root.current), [gsapCtx])

  return (
    <div ref={root} className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" className="h-[170px] w-full sm:h-[220px] lg:aspect-[4/1] lg:h-auto lg:max-h-[380px]">
        <defs>
          <linearGradient id="rs-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.35" stopColor="#33241a" stopOpacity="0" />
            <stop offset="1" stopColor="#33241a" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="rs-sun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#eed39a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#eed39a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="300" fill="url(#rs-sky)" />
        <circle cx="610" cy="160" r="95" fill="url(#rs-sun)" />

        {/* Dajti mountains */}
        <path d="M0 212L80 172 150 192 240 132 320 176 420 118 520 166 600 142 700 182 800 124 900 170 1000 134 1100 176 1200 150V250H0z" fill="#2a1c14" />
        <path d="M0 212L80 172 150 192 240 132 320 176 420 118 520 166 600 142 700 182 800 124 900 170 1000 134 1100 176 1200 150" fill="none" stroke={GOLD} strokeOpacity="0.25" />

        {/* skyline */}
        <g fill="#22170f" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1">
          {BLOCKS.map(([x, w, h]) => (
            <rect key={x} x={x} y={BASE - h} width={w} height={h} />
          ))}
          {/* clock tower */}
          <rect x="322" y="116" width="26" height="134" />
          <path d="M318 116L335 88 352 116z" />
          {/* mosque: dome + minaret */}
          <rect x="378" y="200" width="84" height="50" />
          <path d="M388 200c0-36 64-36 64 0z" />
          <rect x="470" y="122" width="9" height="128" />
          <path d="M467 122l7.5-26 7.5 26z" />
          {/* pyramid */}
          <path d="M640 250l42-48h76l42 48z" />
          <path d="M660 227h120M650 239h140" fill="none" />
          {/* flag pole */}
          <path d="M586 250V146" fill="none" strokeOpacity="0.8" />
        </g>
        <circle cx="335" cy="138" r="6" fill="none" stroke="#eed39a" strokeWidth="1.4" />
        <path d="M335 138v-4M335 138h3" stroke="#eed39a" strokeWidth="1.2" />
        <path d="M466 160h17" stroke={GOLD} strokeOpacity="0.6" />
        <path d="M587 148h30v18h-30z" fill={RED} />
        <g className="rs-windows" fill="#e6c285">
          {BLOCKS.flatMap(([x, w, h], i) =>
            [0, 1, 2].map((k) => (
              <rect key={`${i}-${k}`} className="rs-window" x={x + 8 + ((k * 13) % (w - 14))} y={BASE - h + 12 + k * 16} width="5" height="7" opacity={0.65 - k * 0.12} />
            )),
          )}
        </g>

        {/* road */}
        <path d={`M0 ${BASE}H1200`} stroke={GOLD} strokeOpacity="0.7" strokeWidth="1.5" />
        <rect x="0" y={BASE} width="1200" height="50" fill="#1a130e" />
        <path className="rs-lane" d={`M0 ${BASE + 22}H1200`} stroke="#eed39a" strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="28 22" />

        {/* rider — origin on the road under the scooter */}
        <g className="rs-rider" transform={`translate(540 ${BASE})`}>
          <g stroke="#eed39a" strokeLinecap="round">
            <path className="rs-speed" d="M-74 -40h48" strokeWidth="2.4" />
            <path className="rs-speed" d="M-96 -72h56" strokeWidth="2" />
            <path className="rs-speed" d="M-66 -100h40" strokeWidth="1.6" />
          </g>
          <g className="rs-bounce">
            {/* delivery bag */}
            <rect x="-8" y="-122" width="56" height="54" rx="7" fill="#2a1c14" stroke={GOLD} strokeWidth="2.2" />
            <rect x="-8" y="-104" width="56" height="6" fill={RED} />
            <path d="M6 -122v-6h28v6" fill="none" stroke={GOLD} strokeWidth="2" />
            {/* scooter */}
            <path d="M4 -24C2 -48 22 -60 58 -58L84 -50C92 -40 100 -34 118 -34H134L128 -24z" fill="#33241a" stroke={GOLD} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M58 -30H122" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
            <path d="M126 -32L150 -94" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
            <path d="M128 -34C140 -42 146 -62 148 -86" fill="none" stroke="#e6c285" strokeWidth="2" />
            <path d="M140 -97H162" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
            <circle cx="157" cy="-82" r="4.5" fill="#eed39a" />
            <path d="M130 -28a23 23 0 0 1 44 0" fill="none" stroke={GOLD} strokeWidth="2.4" />
            <path d="M26 -60C38 -67 66 -67 80 -60" stroke="#17110d" strokeWidth="7" strokeLinecap="round" />
            {/* rider */}
            <g stroke="#f3e9d8" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M56 -64L80 -104" strokeWidth="11" stroke="#a87b30" />
              <path d="M78 -102L104 -90 142 -97" strokeWidth="6" stroke="#a87b30" />
              <path d="M56 -62L96 -60 112 -36" strokeWidth="9" stroke="#8a6526" />
              <path d="M110 -34h12" strokeWidth="6" stroke="#17110d" />
            </g>
            <circle cx="86" cy="-120" r="14" fill="#33241a" stroke={GOLD} strokeWidth="2.4" />
            <path d="M88 -126a12 12 0 0 1 11 9" fill="none" stroke="#eed39a" strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* wheels */}
          {[30, 150].map((cx) => (
            <g key={cx} className="rs-wheel">
              <circle cx={cx} cy="-22" r="22" fill="#17110d" stroke={GOLD} strokeWidth="4" />
              <circle cx={cx} cy="-22" r="13" fill="none" stroke={GOLD} strokeOpacity="0.4" />
              <path d={`M${cx - 13} -22H${cx + 13}M${cx} -35V-9M${cx - 9} -31l18 18M${cx + 9} -31l-18 18`} stroke="#e6c285" strokeOpacity="0.7" strokeWidth="1.4" />
              <circle cx={cx} cy="-22" r="4" fill="#eed39a" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
