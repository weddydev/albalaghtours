import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { scrollToTarget } from '../../lib/lenis'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'

const num = (i) => String(i + 1).padStart(2, '0')

function Item({ item }) {
  const label = typeof item === 'string' ? item : item.label
  return (
    <li className="flex gap-3 text-[0.97rem] leading-snug text-cream-100">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-200">
        <Icon name="check" className="h-3.5 w-3.5" />
      </span>
      {item.to ? (
        <Link to={item.to} className="underline-offset-4 transition hover:text-gold-200 hover:underline">
          {label}
        </Link>
      ) : (
        <span>{label}</span>
      )}
    </li>
  )
}

/**
 * Long-form guide for a landing page: an "On this page" index (desktop) beside numbered
 * sections — heading, paragraphs, a checklist, an optional note and a link onward.
 */
export default function SeoArticle({ article }) {
  const root = useRef(null)
  const { eyebrow, title, lead, sections } = article

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.set(q('.sa-item'), { autoAlpha: 0, y: 40 })
        ScrollTrigger.batch(q('.sa-item'), {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.9, ease: 'expo.out', overwrite: true }),
        })
      })
    },
    { scope: root },
  )

  const jump = (id) => (e) => {
    e.preventDefault()
    scrollToTarget(`#${id}`, -110)
  }

  return (
    <section ref={root} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading align="left" eyebrow={eyebrow} title={title} lead={lead} />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <nav aria-label="On this page" className="max-lg:hidden lg:col-span-4 xl:col-span-3">
            <div className="glass sticky top-32 rounded-[24px] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-gold-300">On this page</p>
              <ol className="mt-4 space-y-0.5">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} onClick={jump(s.id)} className="group flex min-h-[40px] items-center gap-3 text-sm text-mist-300 transition hover:text-cream-50">
                      <span className="font-display text-base text-gold-400 transition group-hover:text-gold-200">{num(i)}</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="space-y-5 lg:col-span-8 xl:col-span-9">
            {sections.map((s, i) => (
              <article id={s.id} key={s.id} className="sa-item scroll-mt-28 rounded-[28px] border border-gold-400/15 bg-ink-800/50 p-6 sm:p-9">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl text-gold-400/70 sm:text-3xl" aria-hidden="true">
                    {num(i)}
                  </span>
                  <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-cream-50 sm:text-[2.1rem]">{s.heading}</h3>
                </div>
                {s.body && (
                  <div className="mt-4 space-y-3 text-[1rem] leading-relaxed text-mist-300">
                    {s.body.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                  </div>
                )}
                {s.list && (
                  <ul className={`mt-5 grid gap-3 ${s.list.length > 3 ? 'sm:grid-cols-2' : ''}`}>
                    {s.list.map((item) => (
                      <Item key={typeof item === 'string' ? item : item.label} item={item} />
                    ))}
                  </ul>
                )}
                {s.note && <p className="mt-5 border-l-2 border-gold-400/50 pl-4 text-sm italic leading-relaxed text-mist-300">{s.note}</p>}
                {s.link && (
                  <Link to={s.link.to} className="group mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-jade-300 transition hover:text-jade-400">
                    {s.link.label}
                    <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
