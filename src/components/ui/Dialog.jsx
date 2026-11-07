import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap, useGSAP } from '../../lib/gsap'
import { lockScroll, unlockScroll } from '../../lib/lenis'
import Icon from './Icon'

/**
 * Modal shell shared by the video player and the lightboxes (same behaviour as the package
 * modal): portal to <body>, scroll lock, focus moved inside and trapped, Esc / backdrop /
 * close button close it, focus returns to the opener. `onClosing` runs first (e.g. pause a video).
 * `onKey` receives other key presses (arrow keys in a lightbox).
 */
export default function Dialog({ label, onClose, onClosing, onKey, children, className = '' }) {
  const root = useRef(null)
  const panel = useRef(null)
  const closing = useRef(false)
  const handlers = useRef({})
  handlers.current = { onKey, onClosing }

  const close = () => {
    if (closing.current) return
    closing.current = true
    handlers.current.onClosing?.()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return onClose()
    gsap
      .timeline({ onComplete: onClose })
      .to(panel.current, { y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to(root.current, { opacity: 0, duration: 0.2 }, '-=0.1')
  }
  const closeRef = useRef(close)
  closeRef.current = close

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        // opacity, not autoAlpha: a visibility:hidden dialog could not take focus on open
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from(root.current, { opacity: 0, duration: 0.3, ease: 'power1.out' })
          .from(panel.current, { y: 50, scale: 0.97, duration: 0.8 }, 0.05)
      })
    },
    { scope: root },
  )

  useEffect(() => {
    lockScroll()
    const before = document.activeElement
    const el = panel.current
    const focusables = () => [...el.querySelectorAll('a[href], button:not([disabled]), video[controls], [tabindex="0"]')].filter((n) => n.offsetParent !== null)
    el.querySelector('[data-autofocus]')?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') return closeRef.current()
      if (e.key !== 'Tab') return handlers.current.onKey?.(e)
      const f = focusables()
      if (!f.length) return
      if (!el.contains(document.activeElement)) {
        e.preventDefault()
        f[0].focus()
      } else if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault()
        f[f.length - 1].focus()
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault()
        f[0].focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      unlockScroll()
      before?.focus?.()
    }
  }, [])

  return createPortal(
    <div ref={root} className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      <button type="button" aria-label={`Close ${label}`} onClick={() => close()} tabIndex={-1} className="absolute inset-0 cursor-default bg-ink-950/85 backdrop-blur-md" />
      <div ref={panel} role="dialog" aria-modal="true" aria-label={label} data-lenis-prevent className={`relative w-full ${className}`}>
        <button
          type="button"
          data-autofocus
          onClick={() => close()}
          aria-label="Close"
          className="absolute right-2 top-2 z-20 grid h-11 w-11 place-items-center rounded-full border border-gold-400/50 bg-ink-950/70 text-cream-50 backdrop-blur transition hover:border-gold-200 sm:right-3 sm:top-3"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
