import { hero, heroMedia } from '../../data/content'
import Photo from '../ui/Photo'

const FILL_FALLBACK =
  'linear-gradient(115deg, #f6e6b4 0%, #e2c46a 22%, #fff4d6 44%, #d4af37 62%, #f3dc8f 80%, #c9a440 100%)'

/**
 * Giant headline filled with the Kaaba photo.
 * Technique: white text on black inside an isolated group, photo multiplied on top,
 * then the whole group is screen-blended onto the stage — so only the letters show the photo,
 * and the letters can still be split/moved with plain transforms.
 */
export default function HeroHeadline() {
  return (
    <div className="h-head pointer-events-none absolute inset-0 z-[3] mix-blend-screen [isolation:isolate]">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 flex items-center justify-center px-3 pb-[18vh] lg:pb-[14vh]">
        <h1 className="h-title relative text-center font-display text-[18.5vw] font-semibold italic leading-[0.88] tracking-[-0.02em] text-white lg:text-[min(11.4vw,20vh)] lg:leading-[0.9]">
          {hero.headline.map((w, i) => (
            <span key={w.text}>
              <span className={`h-word inline-block px-[0.04em] ${w.accent ? 'h-accent' : ''}`}>{w.text}</span>
              {/* desktop: 2 lines (after "Journey"); mobile: 3 lines (after "Sacred", "Journey") */}
              {i === 1 && <br className="lg:hidden" />}
              {i === 2 ? <br /> : i < hero.headline.length - 1 && ' '}
            </span>
          ))}
        </h1>
      </div>
      <div className="absolute inset-0 overflow-hidden opacity-[0.84] mix-blend-multiply">
        <div className="h-fill absolute inset-[-10%]">
          <Photo src={heroMedia.headlineFill} fallback={FILL_FALLBACK} width={2400} height={1350} />
        </div>
      </div>
    </div>
  )
}
