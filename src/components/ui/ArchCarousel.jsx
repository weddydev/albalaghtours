import { useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { ArchFrame } from './Ornaments'
import Photo from './Photo'
import Icon from './Icon'
import Lightbox from './Lightbox'

/**
 * Scroll-snap row of photos in ogee arches (native swipe on touch), prev / next buttons and
 * ← / → keys on the row; each photo opens the lightbox. `parallax` drifts the photos inside
 * their arches while the page scrolls. `items` = [{ src, alt, caption }].
 */
export default function ArchCarousel({ items, label, fallback, icon = 'camera', parallax = false }) {
  const root = useRef(null)
  const track = useRef(null)
  const [open, setOpen] = useState(-1)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.set(q('.ac-cell'), { autoAlpha: 0, y: 50 })
        ScrollTrigger.batch(q('.ac-cell'), {
          start: 'top 90%',
          once: true,
          onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1, ease: 'expo.out', overwrite: true }),
        })
        if (parallax) {
          q('.ac-par').forEach((el) =>
            gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.closest('.ac-cell'), start: 'top bottom', end: 'bottom top', scrub: true } }),
          )
        }
      })
    },
    { scope: root },
  )

  const step = (d) => {
    const el = track.current
    const cell = el.querySelector('.ac-cell')
    const by = cell ? cell.getBoundingClientRect().width + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: d * by, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    step(e.key === 'ArrowRight' ? 1 : -1)
  }

  return (
    <div ref={root}>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => step(-1)} aria-label="Scroll photos left" className="grid h-11 w-11 place-items-center rounded-full border border-gold-400/45 text-gold-200 transition hover:border-gold-200 hover:bg-gold-400/10">
          <Icon name="chevronLeft" className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Scroll photos right" className="grid h-11 w-11 place-items-center rounded-full border border-gold-400/45 text-gold-200 transition hover:border-gold-200 hover:bg-gold-400/10">
          <Icon name="chevronRight" className="h-5 w-5" />
        </button>
      </div>
      <ul
        ref={track}
        onKeyDown={onKey}
        role="list"
        aria-label={label}
        className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 pt-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
      >
        {items.map((it, i) => (
          <li key={it.src} className="ac-cell w-[68%] shrink-0 snap-center sm:w-[40%] lg:w-[calc((100%-48px)/4)]">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${it.caption || it.alt}`}
              className="group block w-full text-left outline-none focus-visible:[&_.arch-borders]:drop-shadow-[0_0_10px_rgba(232,207,122,0.9)]"
            >
              <ArchFrame className="aspect-[3/4] w-full" innerClassName="bg-ink-900" borderClassName="drop-shadow-[0_0_8px_rgba(212,175,55,0.35)]">
                <div className="ac-par absolute inset-[-8%]">
                  <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                    <Photo src={it.src} alt={it.alt} fallback={fallback} sizes="(max-width: 639px) 68vw, (max-width: 1023px) 40vw, 300px">
                      <Icon name={icon} strokeWidth={0.7} className="absolute left-1/2 top-[38%] h-1/4 w-1/4 -translate-x-1/2 text-gold-200 opacity-25" />
                    </Photo>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-950/85 to-transparent" />
                <span className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2 px-4 text-center text-sm text-cream-50">
                  <Icon name="search" className="h-4 w-4 shrink-0 text-gold-200" />
                  <span className="min-w-0 break-words">{it.caption || it.alt}</span>
                </span>
              </ArchFrame>
            </button>
          </li>
        ))}
      </ul>
      {open > -1 && <Lightbox items={items} start={open} label={label} onClose={() => setOpen(-1)} />}
    </div>
  )
}
