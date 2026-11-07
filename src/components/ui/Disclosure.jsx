import { useEffect, useId, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import Icon from './Icon'

/** Accessible show/hide row with a GSAP height animation. */
export default function Disclosure({ title, icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  const panel = useRef(null)
  const first = useRef(true)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (first.current || reduce) {
      gsap.set(panel.current, { height: open ? 'auto' : 0 })
      first.current = false
      return
    }
    gsap.to(panel.current, { height: open ? 'auto' : 0, duration: 0.5, ease: 'power3.inOut' })
  }, [open])

  return (
    <div className={`rounded-[20px] border transition-colors duration-500 ${open ? 'border-gold-400/45 bg-ink-800/40' : 'border-gold-400/20'}`}>
      <h3>
        <button
          type="button"
          id={`${id}-b`}
          aria-expanded={open}
          aria-controls={`${id}-p`}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-3 px-5 py-4 text-left"
        >
          {icon && <Icon name={icon} className="h-5 w-5 shrink-0 text-gold-200" />}
          <span className="flex-1 font-medium text-cream-50">{title}</span>
          <Icon name="chevronDown" className={`h-5 w-5 text-gold-200 transition-transform duration-500 ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      <div ref={panel} id={`${id}-p`} role="region" aria-labelledby={`${id}-b`} aria-hidden={!open} className="h-0 overflow-hidden">
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  )
}
