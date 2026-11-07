import Icon from '../ui/Icon'

/** Display title of a programme step: Umrah steps have a title, Hajj transfers a from → to. */
export const stepTitle = (s) => s.title ?? `${s.from} → ${s.to}`

/** "Hyderabad → Jeddah · Madinah → Hyderabad (both direct flights)" */
export function RouteChip({ route, className = '' }) {
  return (
    <p
      className={`inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-gold-400/35 bg-ink-950/50 px-3.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-gold-100 ${className}`}
    >
      <Icon name="plane" className="h-3.5 w-3.5 shrink-0 text-gold-300" />
      {route.legs.map((l, i) => (
        <span key={l.from} className="whitespace-nowrap">
          {l.from} → {l.to}
          {i < route.legs.length - 1 && <span className="ml-2 text-gold-400/60">·</span>}
        </span>
      ))}
      <span className="whitespace-nowrap normal-case tracking-normal text-mist-300">({route.note.toLowerCase()})</span>
    </p>
  )
}

export function Stars({ n, className = 'h-3.5 w-3.5' }) {
  return (
    <span className="inline-flex gap-0.5 text-gold-200" role="img" aria-label={`${n}-star`}>
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} name="star" strokeWidth={1.6} className={`fill-gold-300/80 ${className}`} />
      ))}
    </span>
  )
}
