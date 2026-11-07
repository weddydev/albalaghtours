import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import Dialog from './Dialog'
import Icon from './Icon'

const FALLBACK = 'radial-gradient(90% 80% at 50% 25%, #6b4a2a 0%, #33241a 45%, #1a130e 100%)'

/**
 * Full-screen photo viewer: ← / → keys, prev / next buttons, horizontal swipe, counter + caption.
 * `items` = [{ src, alt, caption }]. A missing file shows a gradient with "Photo coming soon".
 */
export default function Lightbox({ items, start = 0, label = 'Photo viewer', onClose }) {
  const [i, setI] = useState(start)
  const [missing, setMissing] = useState({})
  const img = useRef(null)
  const touch = useRef(null)
  const item = items[i]
  const many = items.length > 1

  const go = (d) => many && setI((n) => (n + d + items.length) % items.length)

  useEffect(() => {
    if (!img.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(img.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
  }, [i])

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1)
  }

  return (
    <Dialog label={label} onClose={onClose} onKey={onKey} className="max-w-5xl">
      <figure className="glass-strong overflow-hidden rounded-[28px] p-2 sm:p-3">
        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="relative h-[min(72svh,720px)] touch-pan-y overflow-hidden rounded-[22px]" style={{ background: FALLBACK }}>
          {missing[item.src] ? (
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <Icon name="camera" strokeWidth={1} className="mx-auto h-14 w-14 text-gold-200 opacity-60" />
                <p className="mt-3 font-display text-2xl text-cream-50">Photo coming soon</p>
              </div>
            </div>
          ) : (
            <img
              ref={img}
              key={item.src}
              src={item.src}
              alt={item.alt}
              decoding="async"
              onError={() => setMissing((m) => ({ ...m, [item.src]: true }))}
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}
          {many && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-gold-400/50 bg-ink-950/70 text-cream-50 backdrop-blur transition hover:border-gold-200 sm:left-4"
              >
                <Icon name="chevronLeft" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-gold-400/50 bg-ink-950/70 text-cream-50 backdrop-blur transition hover:border-gold-200 sm:right-4"
              >
                <Icon name="chevronRight" className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
        <figcaption className="flex items-center justify-between gap-4 px-3 pb-1 pt-3 text-sm" aria-live="polite">
          <span className="min-w-0 text-cream-100">{item.caption || item.alt}</span>
          {many && (
            <span className="shrink-0 text-xs tracking-[0.18em] text-gold-300">
              {i + 1} / {items.length}
            </span>
          )}
        </figcaption>
      </figure>
    </Dialog>
  )
}
