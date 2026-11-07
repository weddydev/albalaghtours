import { useState } from 'react'
import { heroMedia } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Photo, { reportMissing } from '../ui/Photo'

const DUSK =
  'radial-gradient(90% 55% at 50% 88%, #e0a15a 0%, #8a5540 28%, #3a2c48 55%, #141634 78%, #080a1c 100%)'

/* Fallback art for the door view: the Green Dome and minarets against the dusk sky. */
function MadinahSilhouette() {
  const minarets = [
    [62, 120],
    [338, 120],
    [118, 205],
    [282, 205],
  ]
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="md-dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24684a" />
          <stop offset="1" stopColor="#0b2a1c" />
        </linearGradient>
        <radialGradient id="md-sun" cx="0.5" cy="0.82" r="0.55">
          <stop offset="0" stopColor="#ffd59a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd59a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="520" fill="url(#md-sun)" />
      <g fill="#0c0d1d">
        {minarets.map(([x, top]) => (
          <g key={x}>
            <rect x={x - 6} y={top} width="12" height={420 - top} />
            <rect x={x - 10} y={top + 60} width="20" height="5" />
            <rect x={x - 9} y={top + 130} width="18" height="4" />
            <path d={`M${x - 6} ${top}L${x} ${top - 34}L${x + 6} ${top}Z`} />
          </g>
        ))}
        <rect x="0" y="405" width="400" height="115" />
        <rect x="146" y="330" width="108" height="80" />
      </g>
      {minarets.map(([x, top]) => (
        <circle key={x} cx={x} cy={top + 62} r="2.2" fill="#ffd27a" />
      ))}
      <path d="M138 336C138 276 176 248 200 228C224 248 262 276 262 336Z" fill="url(#md-dome)" />
      <path d="M200 228V206" stroke="#e8cf7a" strokeWidth="2" />
      <path d="M204 199a6 6 0 11-6.4-7.4 4.6 4.6 0 106.4 7.4z" fill="#e8cf7a" />
      <g fill="#f2b866" opacity="0.6">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${12 + i * 30} 470v-26q8-12 16 0v26z`} />
        ))}
      </g>
    </svg>
  )
}

function MadinahView({ blurred = false }) {
  return (
    <Photo
      src={heroMedia.door}
      fallback={DUSK}
      width={1600}
      height={2000}
      imgClassName={blurred ? 'scale-110' : ''}
    >
      <MadinahSilhouette />
    </Photo>
  )
}

function DoorVideo() {
  const [ready, setReady] = useState(false)
  return (
    <video
      data-hero-video
      src={heroMedia.video}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onLoadedData={() => setReady(true)}
      onError={() => reportMissing(heroMedia.video)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}

function DoorPanel({ side }) {
  const left = side === 'left'
  return (
    <div
      className={`h-panel-${side} relative h-full w-1/2 [backface-visibility:hidden]`}
      style={{
        transformOrigin: left ? '0% 50%' : '100% 50%',
        background: 'linear-gradient(180deg, #0d3b28 0%, #082a1c 45%, #04150d 100%)',
        boxShadow: left ? 'inset -1px 0 0 rgb(232 207 122 / 0.6)' : 'inset 1px 0 0 rgb(232 207 122 / 0.6)',
      }}
    >
      <div className="pattern-overlay absolute inset-0 bg-[length:56px_56px] opacity-[0.35]" />
      <div className={`absolute bottom-[4%] top-[30%] border border-gold-400/45 ${left ? 'left-[12%] right-[8%]' : 'left-[8%] right-[12%]'}`} />
      <div className={`absolute bottom-[6%] top-[33%] border border-gold-400/20 ${left ? 'left-[16%] right-[12%]' : 'left-[12%] right-[16%]'}`} />
      {/* ring handle near the meeting edge */}
      <div className={`absolute top-[56%] h-6 w-6 rounded-full border-2 border-gold-300 shadow-[0_0_14px_rgba(212,175,55,0.55)] ${left ? 'right-[10%]' : 'left-[10%]'}`} />
    </div>
  )
}

/** Tall ogee door at the centre. Opens on scroll, then the camera pushes through it. */
export default function DoorScene() {
  return (
    <div className="h-door-root absolute left-1/2 top-[15vh] z-[1] h-[60vh] w-[64vw] -translate-x-1/2 lg:top-[12vh] lg:h-[74vh] lg:w-[min(30vw,460px)]">
      <div className="h-door absolute inset-0" style={{ transformOrigin: '50% 60%' }}>
        <div className="h-door-glow absolute inset-[-25%] rounded-full bg-[radial-gradient(closest-side,rgb(246_214_130/0.35),rgb(212_175_55/0.12)_50%,transparent)] opacity-0" />
        <ArchFrame
          className="h-full w-full"
          innerClassName="bg-ink-950"
          borderClassName="lg:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
        >
          <div className="h-door-view absolute inset-0">
            <MadinahView />
            <div className="h-door-blur absolute inset-0 scale-110 blur-[7px] max-lg:hidden">
              <MadinahView blurred />
            </div>
            <DoorVideo />
          </div>
          <div className="absolute inset-0 flex" style={{ perspective: '1400px' }}>
            <DoorPanel side="left" />
            <DoorPanel side="right" />
          </div>
        </ArchFrame>
      </div>
    </div>
  )
}
