import { contact, mapsLink, waLink } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'

// Neighbourhoods next to Mehdipatnam (geography only — not a claim about who our customers are)
const NEARBY = ['Masab Tank', 'Tolichowki', 'Rethibowli', 'Nanal Nagar', 'Langar Houz', 'Attapur', 'Humayun Nagar', 'Banjara Hills']

/** "Visit our Mehdipatnam office" — address, directions, phones and nearby areas. */
export default function SeoLocal({ whatsapp }) {
  return (
    <section className="relative py-16 sm:py-24" aria-labelledby="local-title">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="glass-strong relative grid gap-10 overflow-hidden rounded-[32px] p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
          <div className="pattern-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />
          <div className="relative lg:col-span-7">
            <SectionHeading id="local-title" align="left" eyebrow="Visit us" title={['Our office in ', { accent: 'Mehdipatnam' }]} divider={false} />
            <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-mist-300">
              Sit down with {contact.person} and our team, go through the options and bring your documents for checking — or start on WhatsApp
              and visit when you are ready.
            </p>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="group mt-8 flex max-w-xl gap-4 text-cream-100">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-400/40 text-gold-200">
                <Icon name="mapPin" className="h-5 w-5" />
              </span>
              <span className="text-[0.98rem] leading-relaxed">
                {contact.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-gold-300 group-hover:underline">
                  Get directions <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                </span>
              </span>
            </a>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={waLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Enquire on WhatsApp
                <span className="btn-arrow">
                  <Icon name="whatsapp" className="h-4 w-4" />
                </span>
              </a>
              <a href={contact.phones[0].href} className="btn btn-ghost">
                Call {contact.phones[0].label}
                <span className="btn-arrow">
                  <Icon name="phone" className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>

          <div className="relative space-y-8 lg:col-span-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-300">Close to</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {NEARBY.map((n) => (
                  <li key={n} className="rounded-full border border-gold-400/25 bg-ink-950/40 px-3.5 py-1.5 text-sm text-cream-100">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-300">Call or WhatsApp</p>
              <ul className="mt-3 space-y-1">
                {contact.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="inline-flex min-h-[40px] items-center gap-3 font-display text-2xl text-cream-50 transition hover:text-gold-200">
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-center gap-3 text-sm text-mist-300">
              <Icon name="globe" className="h-4 w-4 shrink-0 text-gold-200" />
              {contact.branch.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
