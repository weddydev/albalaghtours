import { useLayoutEffect, useRef } from 'react'
import { Flip } from '../../lib/gsap'
import Icon from './Icon'

/**
 * Accessible pill tabs; the green indicator glides to the selected tab with GSAP Flip.
 * Arrow keys move between tabs. `idBase` builds the tab/panel ids.
 */
export default function PillTabs({ tabs, value, onChange, idBase, label, className = '' }) {
  const indicator = useRef(null)
  const state = useRef(null)

  const select = (id) => {
    if (id === value) return
    if (indicator.current) state.current = Flip.getState(indicator.current)
    onChange(id)
  }

  useLayoutEffect(() => {
    if (!state.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    Flip.from(state.current, { duration: 0.6, ease: 'expo.out' })
    state.current = null
  }, [value])

  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const i = tabs.findIndex((t) => t.id === value)
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]
    select(next.id)
    document.getElementById(`${idBase}-tab-${next.id}`)?.focus()
  }

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKey} className={`flex w-fit rounded-full border border-gold-400/30 bg-ink-950/60 p-1.5 ${className}`}>
      {tabs.map((t) => {
        const selected = value === t.id
        return (
          <button
            key={t.id}
            id={`${idBase}-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${idBase}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => select(t.id)}
            className={`relative flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors sm:px-7 ${
              selected ? 'text-white' : 'text-mist-300 hover:text-cream-50'
            }`}
          >
            {selected && (
              <span
                ref={indicator}
                data-flip-id={`${idBase}-indicator`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-linear-to-b from-jade-400 to-jade-600 shadow-[0_8px_24px_-8px_rgba(217,168,78,0.9),inset_0_1px_0_rgba(255,255,255,0.35)]"
              />
            )}
            {t.icon && <Icon name={t.icon} className="relative h-4 w-4" />}
            <span className="relative">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
