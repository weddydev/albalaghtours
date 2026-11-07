import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { destinations } from '../../data/content'
import { TONES } from '../services/ServiceCard'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'

/**
 * Asymmetric bento (Madinah large). Images drift inside their frames as you scroll;
 * hovering zooms the photo and lights the frame. Clicking jumps to that destination's story.
 */
export default function DestinationBento() {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.set(q('.db-cell'), { autoAlpha: 0, y: 70, scale: 0.96 })
        ScrollTrigger.batch(q('.db-cell'), {
          start: 'top 90%',
          once: true,
          onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.1, duration: 1.2, ease: 'expo.out' }),
        })
        q('.db-par').forEach((el) =>
          gsap.fromTo(el, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }),
        )
      })
    },
    { scope: root },
  )

  const open = (slug) => (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('albalagh:destination', { detail: slug }))
  }

  return (
    <div ref={root} className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[270px] lg:grid-cols-4 lg:gap-5">
      {destinations.map((d, i) => (
        <a
          key={d.slug}
          href={`#dest-${d.slug}`}
          onClick={open(d.slug)}
          className={`db-cell group relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[26px] border border-gold-400/25 p-4 transition-[border-color,box-shadow] duration-500 hover:border-gold-300/80 hover:shadow-[0_30px_70px_-30px_rgba(212,175,55,0.55)] sm:p-6 ${
            i === 0 ? 'col-span-2 min-h-[320px] lg:row-span-2' : ''
          }`}
        >
          <div className="db-par absolute inset-[-8%] -z-10">
            <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
              <Photo src={d.image} fallback={TONES[d.tone]}>
                <div className="pattern-overlay absolute inset-0 opacity-[0.08]" />
                <Icon name="mosque" strokeWidth={0.5} className="absolute right-[6%] top-[10%] h-3/5 w-3/5 text-gold-200 opacity-[0.16]" />
              </Photo>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/40 to-transparent" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-ink-950/50 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-gold-100 backdrop-blur sm:left-6 sm:top-6">
            <Icon name="mapPin" className="h-3 w-3" />
            {d.region}
          </span>
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-gold-400/50 bg-ink-950/50 text-gold-200 backdrop-blur transition-transform duration-500 group-hover:rotate-45 sm:right-6 sm:top-6">
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </span>
          <h3 className={`font-display font-semibold italic leading-none text-cream-50 ${i === 0 ? 'text-4xl sm:text-6xl' : 'text-2xl sm:text-3xl'}`}>{d.name}</h3>
          <p className={`mt-2 text-mist-300 ${i === 0 ? 'text-base' : 'text-xs sm:text-sm'}`}>{d.tagline}</p>
        </a>
      ))}
    </div>
  )
}
