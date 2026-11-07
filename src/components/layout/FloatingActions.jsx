import { useEffect, useState } from 'react'
import { getLenis } from '../../lib/lenis'
import { waLink } from '../../data/content'
import Icon from '../ui/Icon'

/** Pulsing WhatsApp button + back-to-top (appears after scrolling). */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900)
    // first check on the next frame: reading scrollY during mount would force an extra full layout
    const id = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const toTop = () => {
    const lenis = getLenis()
    lenis ? lenis.scrollTo(0, { duration: 1.8 }) : window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-center gap-3 sm:bottom-7 sm:right-6">
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`hidden h-11 w-11 place-items-center rounded-full border border-gold-400/50 sm:grid bg-ink-950/80 text-gold-200 backdrop-blur transition-all duration-500 hover:border-gold-200 hover:text-cream-50 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <Icon name="arrowUp" className="h-4 w-4" />
      </button>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Al Balagh on WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full border border-gold-300/60 bg-linear-to-b from-jade-400 to-jade-600 text-white shadow-[0_12px_30px_-8px_rgba(63,191,116,0.8)] transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-jade-400/40 motion-reduce:hidden" aria-hidden="true" />
        <Icon name="whatsapp" className="relative h-7 w-7" />
      </a>
    </div>
  )
}
