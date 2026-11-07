import { heroMedia } from '../../data/content'
import Photo from '../ui/Photo'

const SKY =
  'linear-gradient(180deg, #2a1c14 0%, #5a3a24 30%, #b7763a 55%, #e6b56a 68%, #f3d9a0 74%, #8a6a52 82%, #3d2c20 100%)'

/* Fallback art for the window view: dusk above a sea of cloud, with the wing reaching in. */
function SkySilhouette() {
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="ws-sun" cx="0.38" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#fff1c8" stopOpacity="0.95" />
          <stop offset="0.25" stopColor="#ffd38a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd38a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ws-wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3d2c20" />
          <stop offset="1" stopColor="#17110d" />
        </linearGradient>
      </defs>
      <rect width="400" height="520" fill="url(#ws-sun)" />
      {/* cloud sea */}
      <g fill="#f3e2bf">
        <path d="M0 300c40-14 70-6 110-12s70-16 120-8 90 10 170 0v240H0z" opacity="0.35" />
        <path d="M0 336c50-10 90 4 140-4s80-18 130-10 80 12 130 4v194H0z" opacity="0.45" />
        <path d="M0 380c60-12 110 6 160-2s90-14 140-6 70 10 100 4v144H0z" opacity="0.6" />
      </g>
      {/* wing */}
      <path d="M400 250L170 372l-18 14 26 4 222-58z" fill="url(#ws-wing)" />
      <path d="M170 372L400 250" stroke="#e6c285" strokeOpacity="0.55" strokeWidth="1.2" />
      <path d="M392 254l8-60v56z" fill="#271a13" />
    </svg>
  )
}

function WindowView({ blurred = false }) {
  return (
    <Photo
      src={heroMedia.window}
      fallback={SKY}
      width={1600}
      height={1280}
      eager
      sizes="(max-width: 1023px) 64vw, 460px"
      rays
      imgClassName={`object-[80%_50%] ${blurred ? 'scale-110' : ''}`}
    >
      <SkySilhouette />
    </Photo>
  )
}

/** A small airliner silhouette, crossing the view while the shade lifts. */
function DistantPlane() {
  return (
    <svg viewBox="0 0 120 40" className="h-plane absolute left-[-30%] top-[24%] w-[26%] opacity-0" aria-hidden="true">
      <path d="M0 20h70" stroke="#fbf3e4" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="2 3" />
      {/* drawn nose-left, mirrored so the nose leads (x' = 182 − x) */}
      <path
        transform="translate(182 0) scale(-1 1)"
        d="M72 19.2l14-1.4 9-9.8h4l-5 9.4 12-1 4-4h3l-2 5.6 2 5.6h-3l-4-4-12-1 5 9.4h-4l-9-9.8-14-1.4z"
        fill="#17110d"
      />
    </svg>
  )
}

/** Window shade: lifts on scroll (`.h-shade`, animated in Hero.jsx). */
function Shade() {
  return (
    <div
      className="h-shade absolute inset-0 z-[3]"
      style={{ background: 'linear-gradient(180deg, #5a4330 0%, #4a3626 55%, #3d2c20 100%)' }}
    >
      <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(180deg,transparent_0_22px,rgb(0_0_0/0.25)_22px_23px,rgb(255_255_255/0.06)_23px_24px)]" />
      <div className="absolute inset-x-0 bottom-0 h-[7%] bg-linear-to-b from-[#6b4f38] to-[#3d2c20] shadow-[0_-1px_0_rgb(243_233_216/0.15)]" />
      <div className="absolute bottom-[2.2%] left-1/2 h-[1.6%] w-[26%] -translate-x-1/2 rounded-full bg-linear-to-b from-gold-200 to-gold-500 shadow-[0_0_10px_rgb(200_150_62/0.5)]" />
    </div>
  )
}

/**
 * Aircraft window at the centre of the hero. Its shade lifts on scroll to reveal the view
 * over the wing, then the camera pushes through the window into the clouds.
 * Class names (`h-door-*`) are kept so the scroll timeline in Hero.jsx can drive it.
 */
export default function WindowScene() {
  return (
    <div className="h-door-root absolute left-1/2 top-[15vh] z-[1] h-[60vh] w-[64vw] -translate-x-1/2 lg:top-[12vh] lg:h-[74vh] lg:w-[min(30vw,460px)]">
      <div className="h-door absolute inset-0" style={{ transformOrigin: '50% 52%' }}>
        <div className="h-door-glow absolute inset-[-25%] rounded-full bg-[radial-gradient(closest-side,rgb(246_214_150/0.32),rgb(200_150_62/0.1)_50%,transparent)] opacity-0" />

        {/* cabin wall around the window */}
        <div
          className="absolute inset-0 rounded-[48%/30%] p-[8%]"
          style={{
            background: 'linear-gradient(160deg, #4a3626 0%, #2a1c14 55%, #1a130e 100%)',
            boxShadow:
              'inset 0 2px 0 rgb(243 233 216 / 0.1), inset 0 -24px 40px rgb(0 0 0 / 0.45), 0 30px 80px -20px rgb(0 0 0 / 0.8), 0 0 0 1px rgb(200 150 62 / 0.35)',
          }}
        >
          {/* the opening */}
          <div className="relative isolate h-full w-full overflow-hidden rounded-[46%/27%] bg-ink-950 shadow-[0_0_0_1.5px_rgb(230_194_133/0.7)] lg:drop-shadow-[0_0_10px_rgba(200,150,62,0.45)]">
            <div className="h-door-view absolute inset-0">
              <WindowView />
              <div className="h-door-blur absolute inset-0 scale-110 blur-[7px] max-lg:hidden">
                <WindowView blurred />
              </div>
              {/* warm grade so the photo sits in the palette */}
              <div className="absolute inset-0 bg-[#c8963e] opacity-30 mix-blend-color" />
              <DistantPlane />
            </div>
            <Shade />
            {/* glass: inner shadow + a soft diagonal sheen */}
            <div className="pointer-events-none absolute inset-0 z-[4] rounded-[inherit] shadow-[inset_0_10px_30px_rgb(0_0_0/0.55)]" />
            <div className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(125deg,transparent_30%,rgb(255_255_255/0.07)_42%,transparent_52%)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
