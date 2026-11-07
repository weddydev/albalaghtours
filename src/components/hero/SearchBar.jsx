import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon'
import { enquiryText, waLink } from '../../data/content'
import { scrollToTarget } from '../../lib/lenis'
import { useMagnetic } from '../../hooks/useMagnetic'

function upcomingMonths(count = 14) {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i + 1, 1)
    return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  })
}

export default function SearchBar() {
  const [type, setType] = useState('Umrah')
  const [month, setMonth] = useState('')
  const [travellers, setTravellers] = useState(2)
  const months = useMemo(() => upcomingMonths(), [])
  const btn = useRef(null)
  const navigate = useNavigate()
  useMagnetic(btn, 0.2)

  // the departure month is optional and only mentioned when chosen
  const message = enquiryText(type.toLowerCase(), { month, travellers })

  // preselect the programme in Featured Journeys: on this page if it is here, otherwise on /packages
  const onSubmit = (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('albalagh:search', { detail: { type, month, travellers } }))
    if (scrollToTarget('#packages')) return
    const t = type.toLowerCase()
    navigate(`/packages?type=${t}`, { state: { search: { type: t, month, travellers } } })
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Find a Hajj or Umrah package"
      className="hero-search glass-strong relative mx-auto flex w-full max-w-[1120px] flex-col gap-2 rounded-[28px] p-2.5 lg:flex-row lg:items-stretch lg:rounded-full"
    >
      {/* Umrah / Hajj toggle */}
      <div role="radiogroup" aria-label="Journey type" className="relative grid grid-cols-2 rounded-full bg-ink-950/60 p-1 lg:w-[250px]">
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-linear-to-b from-jade-400 to-jade-600 shadow-[0_6px_20px_-6px_rgba(63,191,116,0.9),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: type === 'Hajj' ? 'translateX(100%)' : 'translateX(0)' }}
        />
        {['Umrah', 'Hajj'].map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={type === t}
            onClick={() => setType(t)}
            className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-colors ${
              type === t ? 'text-white' : 'text-mist-300 hover:text-cream-100'
            }`}
          >
            <Icon name={t === 'Umrah' ? 'mosque' : 'kaaba'} className="h-4 w-4" />
            {t}
          </button>
        ))}
      </div>

      <span className="hidden w-px self-stretch bg-gold-400/20 lg:block" aria-hidden="true" />

      {/* Departure month */}
      <label className="relative flex flex-1 items-center gap-3 rounded-full px-5 py-2.5 transition-colors hover:bg-white/[0.03] max-lg:border max-lg:border-gold-400/20">
        <Icon name="calendar" className="h-5 w-5 shrink-0 text-gold-200" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-mist-500">Departure</span>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="field-select w-full cursor-pointer truncate pr-6 text-sm text-cream-100 outline-none"
          >
            <option value="">Any month (optional)</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </span>
        <Icon name="chevronDown" className="pointer-events-none absolute right-5 h-4 w-4 text-gold-200" />
      </label>

      <span className="hidden w-px self-stretch bg-gold-400/20 lg:block" aria-hidden="true" />

      {/* Travellers stepper */}
      <div className="flex items-center gap-3 rounded-full px-5 py-2.5 max-lg:border max-lg:border-gold-400/20 lg:w-[250px]">
        <Icon name="users" className="h-5 w-5 shrink-0 text-gold-200" />
        <span className="flex flex-1 flex-col">
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-mist-500">Travellers</span>
          <span className="text-sm text-cream-100" aria-live="polite">
            {travellers} {travellers > 1 ? 'pilgrims' : 'pilgrim'}
          </span>
        </span>
        <button
          type="button"
          aria-label="Remove a traveller"
          onClick={() => setTravellers((n) => Math.max(1, n - 1))}
          disabled={travellers <= 1}
          className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/35 text-gold-200 transition hover:border-gold-200 hover:bg-gold-400/10 disabled:opacity-35"
        >
          <Icon name="minus" className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Add a traveller"
          onClick={() => setTravellers((n) => Math.min(40, n + 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/35 text-gold-200 transition hover:border-gold-200 hover:bg-gold-400/10"
        >
          <Icon name="plus" className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button ref={btn} type="submit" className="btn btn-primary flex-1 justify-between py-2 pl-6 lg:flex-none">
          <span className="whitespace-nowrap">Search Packages</span>
          <span className="btn-arrow">
            <Icon name="search" className="h-4 w-4" />
          </span>
        </button>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask about this ${type} trip on WhatsApp`}
          className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full border border-gold-400/40 bg-ink-950/50 text-jade-300 transition hover:border-jade-400 hover:text-jade-400 hover:shadow-[0_0_24px_-4px_rgba(63,191,116,0.7)]"
        >
          <Icon name="whatsapp" className="h-6 w-6" />
        </a>
      </div>
    </form>
  )
}
