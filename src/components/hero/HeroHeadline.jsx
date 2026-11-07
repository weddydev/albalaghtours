import { hero } from '../../data/content'

const FILL =
  'linear-gradient(115deg, #f3e2bf 0%, #ddb668 22%, #fbf3e4 44%, #c8963e 62%, #eed39a 80%, #b7863a 100%)'

/**
 * Giant headline filled with a slowly drifting candle-gold sheen.
 * Technique: white text on black inside an isolated group, the fill multiplied on top,
 * then the whole group is screen-blended onto the stage — so only the letters show the fill,
 * and the letters can still be split/moved with plain transforms.
 */
export default function HeroHeadline() {
  return (
    <div className="h-head pointer-events-none absolute inset-0 z-[3] mix-blend-screen [isolation:isolate]">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 flex items-center justify-center px-3 pb-[18vh] lg:pb-[14vh]">
        <h1 className="h-title relative text-center font-display text-[18.5vw] font-semibold leading-[0.88] tracking-[-0.02em] text-white lg:text-[min(11.4vw,20vh)] lg:leading-[0.9]">
          {hero.headline.map((w, i) => (
            <span key={w.text}>
              <span className={`h-word inline-block px-[0.04em] ${w.accent ? 'h-accent' : ''}`}>{w.text}</span>
              {/* desktop: 2 lines (after the 3rd word); mobile: 3 lines (after the 2nd and 3rd words) */}
              {i === 1 && <br className="lg:hidden" />}
              {i === 2 ? <br /> : i < hero.headline.length - 1 && ' '}
            </span>
          ))}
        </h1>
      </div>
      <div className="absolute inset-0 overflow-hidden opacity-[0.88] mix-blend-multiply">
        <div className="h-fill absolute inset-[-10%]" style={{ background: FILL }} />
      </div>
    </div>
  )
}
