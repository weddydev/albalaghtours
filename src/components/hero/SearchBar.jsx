import { useMemo, useRef, useState } from 'react'
import Icon from '../ui/Icon'
import { tripTypes, tripEnquiry, waLink } from '../../data/content'
import { useMagnetic } from '../../hooks/useMagnetic'

function upcomingMonths(count = 14) {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i + 1, 1)
    return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  })
}

/**
 * Hero trip planner: where to, what kind of trip, when and how many.
 * "Plan my trip" opens WhatsApp with everything the visitor chose, written as a short message.
 */
export default function SearchBar() {
  const [destination, setDestination] = useState('')
  const [type, setType] = useState(tripTypes[0].id)
  const [month, setMonth] = useState('')
  const [travellers, setTravellers] = useState(2)
  const months = useMemo(() => upcomingMonths(), [])
  const btn = useRef(null)
  useMagnetic(btn, 0.2)

  const message = tripEnquiry({ destination, type, month, travellers })

  const onSubmit = (e) => {
    e.preventDefault()
    window.open(waLink(message), '_blank', 'noopener,noreferrer')
  }

  const field = 'relative flex items-center gap-3 rounded-full px-5 py-2.5 transition-colors hover:bg-white/[0.03] max-lg:border max-lg:border-cream-100/10'
  const label = 'text-[0.62rem] uppercase tracking-[0.22em] text-mist-500'

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Plan a trip"
      className="hero-search glass-strong relative mx-auto flex text-left w-full max-w-[1180px] flex-col gap-2 rounded-[28px] p-2.5 lg:flex-row lg:items-stretch lg:rounded-full"
    >
      {/* Where to */}
      <label className={`${field} lg:flex-[1.3]`}>
        <Icon name="mapPin" className="h-5 w-5 shrink-0 text-gold-300" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className={label}>Where to?</span>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Dubai, Istanbul, Bali…"
            maxLength={60}
            className="w-full bg-transparent text-sm text-cream-100 outline-none placeholder:text-mist-500"
          />
        </span>
      </label>

      <span className="hidden w-px self-stretch bg-cream-100/10 lg:block" aria-hidden="true" />

      {/* Trip type */}
      <label className={`${field} lg:flex-1`}>
        <Icon name={tripTypes.find((t) => t.id === type)?.icon ?? 'globe'} className="h-5 w-5 shrink-0 text-gold-300" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className={label}>Trip</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className="field-select w-full cursor-pointer truncate pr-6 text-sm text-cream-100 outline-none">
            {tripTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </span>
        <Icon name="chevronDown" className="pointer-events-none absolute right-5 h-4 w-4 text-gold-300" />
      </label>

      <span className="hidden w-px self-stretch bg-cream-100/10 lg:block" aria-hidden="true" />

      {/* Departure month */}
      <label className={`${field} lg:flex-1`}>
        <Icon name="calendar" className="h-5 w-5 shrink-0 text-gold-300" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className={label}>Departure</span>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className="field-select w-full cursor-pointer truncate pr-6 text-sm text-cream-100 outline-none">
            <option value="">Any month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </span>
        <Icon name="chevronDown" className="pointer-events-none absolute right-5 h-4 w-4 text-gold-300" />
      </label>

      <span className="hidden w-px self-stretch bg-cream-100/10 lg:block" aria-hidden="true" />

      {/* Travellers stepper */}
      <div className="flex items-center gap-3 rounded-full px-5 py-2.5 max-lg:border max-lg:border-cream-100/10 lg:w-[220px]">
        <Icon name="users" className="h-5 w-5 shrink-0 text-gold-300" />
        <span className="flex flex-1 flex-col">
          <span className={label}>Travellers</span>
          <span className="text-sm text-cream-100" aria-live="polite">
            {travellers} {travellers > 1 ? 'people' : 'person'}
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

      <button ref={btn} type="submit" className="btn btn-primary justify-between py-2 pl-6 lg:flex-none">
        <span className="whitespace-nowrap">Plan my trip</span>
        <span className="btn-arrow">
          <Icon name="whatsapp" className="h-4 w-4" />
        </span>
      </button>
    </form>
  )
}
