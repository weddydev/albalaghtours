import { useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { reviews, waLink } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'
import Dialog from '../ui/Dialog'
import Lightbox from '../ui/Lightbox'

const FALLBACKS = [
  'radial-gradient(90% 70% at 50% 20%, #6b4a2a 0%, #33241a 45%, #1a130e 100%)',
  'radial-gradient(90% 70% at 50% 20%, #6b5a3a 0%, #2a2216 50%, #0a0805 100%)',
  'radial-gradient(90% 70% at 50% 20%, #4a3626 0%, #251a12 45%, #120c09 100%)',
]
const ASPECTS = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-[3/4]']
const byline = (r) => [r.name, r.city].filter(Boolean).join(' · ')

function SampleBadge({ r, className = '' }) {
  if (!r.sample) return null
  return <span className={`rounded-full border border-gold-400/40 bg-ink-950/70 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.18em] text-gold-200 ${className}`}>Sample</span>
}

/** Portrait video player. Never autoplays; preload="none"; paused before the dialog closes. */
function VideoModal({ review, onClose }) {
  const video = useRef(null)
  const [failed, setFailed] = useState(false)
  return (
    <Dialog label={`Video review — ${byline(review)}`} onClose={onClose} onClosing={() => video.current?.pause()} className="max-w-[440px]">
      <div className="glass-strong overflow-hidden rounded-[28px] p-2">
        <div className="relative mx-auto aspect-[9/16] h-[min(76svh,720px)] max-w-full overflow-hidden rounded-[22px]" style={{ background: FALLBACKS[0] }}>
          {failed ? (
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div>
                <Icon name="play" strokeWidth={1} className="mx-auto h-12 w-12 text-gold-200 opacity-60" />
                <p className="mt-3 font-display text-2xl text-cream-50">Video coming soon</p>
              </div>
            </div>
          ) : (
            <video
              ref={video}
              src={review.src}
              poster={review.poster || undefined}
              controls
              playsInline
              preload="none"
              onError={() => setFailed(true)}
              className="absolute inset-0 h-full w-full bg-ink-950 object-contain"
            >
              {review.quote}
            </video>
          )}
        </div>
        <p className="flex items-center justify-between gap-3 px-3 pb-1 pt-3 text-sm text-cream-100">
          {byline(review)}
          <SampleBadge r={review} />
        </p>
      </div>
    </Dialog>
  )
}

function VideoCard({ r, i, onPlay }) {
  const inner = (
    <ArchFrame className="aspect-[3/4.4] w-full" innerClassName="bg-ink-900" borderClassName="drop-shadow-[0_0_8px_rgba(200,150,62,0.35)]">
      <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
        {r ? <Photo src={r.poster} fallback={FALLBACKS[i % 3]} sizes="(max-width: 639px) 62vw, 260px" /> : <div className="absolute inset-0" style={{ background: FALLBACKS[0] }} />}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-950/90 to-transparent" />
      <span className="absolute left-1/2 top-[44%] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold-300/70 bg-ink-950/75 text-gold-100 shadow-[0_0_30px_-6px_rgba(200,150,62,0.7)] transition-transform duration-500 group-hover:scale-110">
        <Icon name="play" strokeWidth={1.6} className="ml-1 h-6 w-6 fill-gold-200/80" />
      </span>
      <span className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-1.5 px-3 text-center">
        <span className="text-sm text-cream-50">{r ? byline(r) : 'Video reviews coming soon'}</span>
        {r && <SampleBadge r={r} />}
      </span>
    </ArchFrame>
  )
  return (
    <li className="ge-video w-[62%] shrink-0 snap-center sm:w-[36%] lg:w-[calc((100%-60px)/4)]">
      {r ? (
        <button type="button" onClick={() => onPlay(r)} aria-label={`Play video review — ${byline(r)}`} className="group block w-full outline-none focus-visible:[&_.arch-borders]:drop-shadow-[0_0_10px_rgba(230,194,133,0.9)]">
          {inner}
        </button>
      ) : (
        <div className="group">{inner}</div>
      )}
    </li>
  )
}

/** Quote carousel: ← / → keys (when focused), prev / next, dots, horizontal swipe. */
function QuoteCarousel({ items }) {
  const [i, setI] = useState(0)
  const slide = useRef(null)
  const touch = useRef(null)
  const go = (n) => {
    const next = (n + items.length) % items.length
    if (next === i) return
    if (!slide.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setI(next)
    const dir = n > i ? 1 : -1
    gsap.to(slide.current, {
      autoAlpha: 0,
      x: -30 * dir,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setI(next)
        gsap.fromTo(slide.current, { autoAlpha: 0, x: 30 * dir }, { autoAlpha: 1, x: 0, duration: 0.6, ease: 'expo.out' })
      },
    })
  }
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(i + 1)
    if (e.key === 'ArrowLeft') go(i - 1)
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(i + (dx < 0 ? 1 : -1))
  }
  const r = items[i]

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Guest quotes"
      tabIndex={0}
      onKeyDown={onKey}
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={onTouchEnd}
      className="ge-quotes glass-strong relative mx-auto max-w-[860px] touch-pan-y rounded-[32px] px-6 pb-8 pt-10 text-center outline-none focus-visible:ring-2 focus-visible:ring-gold-200 sm:px-14"
    >
      <Icon name="quote" strokeWidth={1.2} className="mx-auto h-10 w-10 text-gold-300" />
      <div ref={slide} aria-live="polite" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
        <blockquote className="mt-5 font-display text-[clamp(1.4rem,2.6vw,2rem)] italic leading-snug text-cream-50">“{r.quote}”</blockquote>
        <p className="mt-5 flex items-center justify-center gap-3 text-sm text-gold-200">
          {byline(r)}
          <SampleBadge r={r} />
        </p>
      </div>
      {items.length > 1 && (
        <div className="mt-7 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous quote" className="grid h-11 w-11 place-items-center rounded-full border border-gold-400/45 text-gold-200 transition hover:border-gold-200 hover:bg-gold-400/10">
            <Icon name="chevronLeft" className="h-5 w-5" />
          </button>
          <div className="flex gap-1">
            {items.map((_, k) => (
              <button key={k} type="button" onClick={() => go(k)} aria-label={`Show quote ${k + 1}`} aria-current={k === i ? 'true' : undefined} className="grid h-11 w-7 place-items-center">
                <span className={`block h-2 rounded-full transition-all duration-500 ${k === i ? 'w-6 bg-gold-200' : 'w-2 bg-gold-400/40'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next quote" className="grid h-11 w-11 place-items-center rounded-full border border-gold-400/45 text-gold-200 transition hover:border-gold-200 hover:bg-gold-400/10">
            <Icon name="chevronRight" className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

/** Home #reviews: video reviews, a photo wall and the quote carousel — all from content.reviews. */
export default function GuestExperiences() {
  const root = useRef(null)
  const [video, setVideo] = useState(null)
  const [photo, setPhoto] = useState(-1)
  const videos = reviews.filter((r) => r.type === 'video')
  const photos = reviews.filter((r) => r.type === 'photo')
  const quotes = reviews.filter((r) => r.type === 'text')
  const photoItems = photos.map((r) => ({ src: r.src, alt: `Photo from ${byline(r)}`, caption: byline(r) }))

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.set(q('.ge-video, .ge-photo'), { autoAlpha: 0, y: 50 })
        ScrollTrigger.batch(q('.ge-video, .ge-photo'), {
          start: 'top 90%',
          once: true,
          onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1, ease: 'expo.out', overwrite: true }),
        })
        gsap.from(q('.ge-quotes'), { y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: q('.ge-quotes')[0], start: 'top 85%', once: true } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="reviews" aria-labelledby="reviews-title" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(900px_480px_at_50%_520px,rgb(200_150_62/0.08),transparent)]" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading id="reviews-title" eyebrow="Guest Experiences" title={['Stories from our ', { accent: 'guests' }]} lead="Videos, photos and words from the people we travel with." />

        {/* video reviews */}
        <h3 className="mt-16 flex items-center gap-3 font-display text-2xl text-cream-50">
          <Icon name="play" className="h-5 w-5 text-gold-300" />
          Video reviews
        </h3>
        <ul className="-mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-5 pb-4 pt-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:justify-center lg:px-0">
          {videos.length ? videos.map((r, i) => <VideoCard key={r.src} r={r} i={i} onPlay={setVideo} />) : <VideoCard r={null} i={0} />}
        </ul>

        {/* photo reviews */}
        {photos.length > 0 && (
          <>
            <h3 className="mt-14 flex items-center gap-3 font-display text-2xl text-cream-50">
              <Icon name="camera" className="h-5 w-5 text-gold-300" />
              Photos from our guests
            </h3>
            <ul className="mt-6 columns-2 gap-3 sm:columns-3 sm:gap-4">
              {photos.map((r, i) => (
                <li key={r.src} className="ge-photo mb-3 break-inside-avoid sm:mb-4">
                  <button
                    type="button"
                    onClick={() => setPhoto(i)}
                    aria-label={`Open ${photoItems[i].alt}`}
                    className={`group relative block w-full overflow-hidden rounded-[22px] border border-gold-400/25 transition-colors hover:border-gold-300/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-200 ${ASPECTS[i % ASPECTS.length]}`}
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <Photo src={r.src} alt={photoItems[i].alt} fallback={FALLBACKS[(i + 1) % 3]} sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 400px">
                        <Icon name="camera" strokeWidth={0.8} className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-gold-200 opacity-25" />
                      </Photo>
                    </div>
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-ink-950/85 to-transparent px-3 pb-2.5 pt-8 text-left text-xs text-cream-100">
                      <span className="min-w-0 truncate">{byline(r)}</span>
                      <SampleBadge r={r} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* text reviews */}
        {quotes.length > 0 && (
          <div className="mt-16">
            <QuoteCarousel items={quotes} />
          </div>
        )}

        <p className="mt-10 text-center text-sm text-mist-300">
          Travelled with us?{' '}
          <a href={waLink('Hello Al Balagh Tours. I would like to share my travel experience.')} target="_blank" rel="noopener noreferrer" className="text-jade-300 underline-offset-4 hover:underline">
            Share your experience on WhatsApp
          </a>
        </p>
      </div>
      {video && <VideoModal review={video} onClose={() => setVideo(null)} />}
      {photo > -1 && <Lightbox items={photoItems} start={photo} label="Guest photos" onClose={() => setPhoto(-1)} />}
    </section>
  )
}
