import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { atAGlance, waLink } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

const FALLBACK = 'radial-gradient(90% 70% at 50% 25%, #3a4a5c 0%, #142233 50%, #050a10 100%)'

/** A fact from the programme gets a tick; anything not in the client's programme reads "Contact office". */
function Value({ v, align = 'center' }) {
  if (v == null)
    return (
      <span className="inline-flex items-center gap-1.5 text-[0.82rem] italic text-mist-500">
        <span aria-hidden="true">—</span> Contact office
      </span>
    )
  return (
    <span className={`inline-flex min-w-0 items-start gap-2 text-[0.85rem] leading-snug text-cream-50 ${align === 'center' ? 'justify-center text-left' : 'text-right'}`}>
      <span className="mt-px inline-grid h-5 w-5 shrink-0 place-items-center rounded-full border border-jade-400/50 bg-jade-500/10" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-3 w-3">
          <path className="cp-tick" d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#5fd28f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="min-w-0">{v}</span>
    </span>
  )
}

/**
 * "Hajj & Umrah at a glance": the two programmes side by side, real facts only.
 * Desktop: a two-column glass table; mobile: a swipeable card per programme.
 */
export default function ComparePackages() {
  const root = useRef(null)
  const { columns, rows } = atAGlance

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const tl = gsap.timeline({ scrollTrigger: { trigger: q('.cp-wrap')[0], start: 'top 75%', once: true }, defaults: { ease: 'expo.out' } })
        tl.from(q('.cp-head'), { y: 40, autoAlpha: 0, stagger: 0.12, duration: 1.1 })
          .from(q('.cp-row'), { y: 18, autoAlpha: 0, stagger: 0.06, duration: 0.8 }, 0.3)
          .from(q('.cp-wrap .cp-tick'), { drawSVG: '0%', stagger: 0.03, duration: 0.45, ease: 'power2.out' }, 0.7)
        gsap.from(q('.cp-card'), { y: 50, autoAlpha: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.cp-mobile')[0], start: 'top 85%', once: true } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="At a glance"
          title={['Hajj & Umrah ', { accent: 'at a glance' }]}
          lead="The two programmes side by side. Anything not listed in the programme is confirmed by the office before booking."
        />

        {/* desktop table */}
        <div className="cp-wrap glass relative mx-auto mt-14 hidden max-w-[1060px] rounded-[32px] px-6 pb-8 md:block lg:px-10">
          <table className="relative w-full table-fixed border-separate border-spacing-0 text-sm">
            <caption className="sr-only">Hajj 2027 and Ziyarath Special Umrah compared</caption>
            <colgroup>
              <col style={{ width: '24%' }} />
              <col style={{ width: '38%' }} />
              <col style={{ width: '38%' }} />
            </colgroup>
            <thead>
              <tr>
                <td />
                {columns.map((c) => (
                  <th key={c.id} scope="col" className="cp-head px-4 pb-6 pt-8 align-bottom">
                    <div className="mx-auto h-36 w-28">
                      <ArchFrame className="h-full w-full" innerClassName="bg-ink-900" finial={false}>
                        <Photo src={c.image} fallback={FALLBACK} sizes="112px">
                          <Icon name={c.type === 'umrah' ? 'mosque' : 'kaaba'} strokeWidth={0.7} className="absolute left-1/2 top-[38%] h-12 w-12 -translate-x-1/2 text-gold-200 opacity-25" />
                        </Photo>
                      </ArchFrame>
                    </div>
                    <span className="mt-3 inline-block rounded-full border border-gold-400/40 bg-ink-950/50 px-3 py-1 font-normal text-gold-100">{c.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="cp-row">
                  <th scope="row" className="border-t border-gold-400/15 py-4 pl-2 pr-4 text-left font-normal text-mist-300">
                    <span className="flex items-center gap-3">
                      <Icon name={r.icon} className="h-4.5 w-4.5 shrink-0 text-gold-200" />
                      {r.label}
                    </span>
                  </th>
                  {r.values.map((v, i) => (
                    <td key={i} className="border-t border-gold-400/15 px-4 py-4 text-center">
                      <Value v={v} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td />
                {columns.map((c) => (
                  <td key={c.id} className="pt-6 text-center">
                    <a
                      href={waLink(c.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gold-400/40 px-4 text-xs text-gold-100 transition hover:border-gold-200 hover:bg-gold-400/10"
                    >
                      <Icon name="whatsapp" className="h-4 w-4" /> Enquire about {c.name}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* mobile: swipeable cards */}
        <div
          className="cp-mobile -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 [scrollbar-width:none] md:hidden"
          role="region"
          aria-label="Hajj and Umrah compared"
        >
          {columns.map((c, ci) => (
            <article key={c.id} className="cp-card glass relative w-[86%] shrink-0 snap-center rounded-[26px] p-5">
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold-300">{c.season}</p>
              <h3 className="mt-1 font-display text-2xl italic text-cream-50">{c.name}</h3>
              <dl className="mt-4 divide-y divide-gold-400/15">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start gap-3 py-3 text-sm">
                    <dt className="flex items-center gap-2 text-mist-300">
                      <Icon name={r.icon} className="h-4 w-4 shrink-0 text-gold-200" />
                      {r.label}
                    </dt>
                    <dd className="flex justify-end">
                      <Value v={r.values[ci]} align="right" />
                    </dd>
                  </div>
                ))}
              </dl>
              <a href={waLink(c.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full justify-between py-1.5 pl-5 text-sm">
                Enquire
                <span className="btn-arrow h-9 w-9">
                  <Icon name="whatsapp" className="h-4 w-4" />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
