import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery'

/** Gold ring + dot that trail the cursor and grow over interactive elements (desktop only). */
export default function CursorGlow() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    if (!fine || reduced) return
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' })
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' })
    let shown = false
    const onMove = (e) => {
      if (!shown) {
        shown = true
        gsap.to([ring.current, dot.current], { autoAlpha: 1, duration: 0.5 })
      }
      rx(e.clientX)
      ry(e.clientY)
      dx(e.clientX)
      dy(e.clientY)
    }
    const onOver = (e) => {
      const hot = e.target.closest('a, button, select, input, textarea, label, [data-cursor]')
      gsap.to(ring.current, {
        scale: hot ? 1.9 : 1,
        backgroundColor: hot ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0)',
        borderColor: hot ? 'rgba(243,220,143,0.9)' : 'rgba(212,175,55,0.6)',
        duration: 0.45,
        ease: 'power3.out',
      })
      gsap.to(dot.current, { scale: hot ? 0 : 1, duration: 0.3 })
    }
    const onLeave = () => {
      shown = false
      gsap.to([ring.current, dot.current], { autoAlpha: 0, duration: 0.3 })
    }
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, reduced])

  if (!fine || reduced) return null
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={ring}
        className="invisible absolute left-[-18px] top-[-18px] h-9 w-9 rounded-full border opacity-0"
        style={{ borderColor: 'rgba(212,175,55,0.6)' }}
      />
      <div ref={dot} className="invisible absolute left-[-3px] top-[-3px] h-1.5 w-1.5 rounded-full bg-gold-200 opacity-0" />
    </div>
  )
}
