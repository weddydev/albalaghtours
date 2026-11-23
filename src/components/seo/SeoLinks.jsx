import { Link } from 'react-router-dom'
import { seoLinks, seoPath } from '../../data/seo'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'

/** Cards linking to the other Hyderabad landing pages (internal links help both visitors and search). */
export default function SeoLinks({ current }) {
  const others = seoLinks.filter((p) => p.slug !== current)
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading align="left" eyebrow="Also from Hyderabad" title={['More from our ', { accent: 'Mehdipatnam desk' }]} divider={false} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                to={seoPath(p)}
                className="group flex h-full flex-col rounded-[24px] border border-gold-400/15 bg-ink-800/50 p-6 transition hover:-translate-y-1 hover:border-gold-300/50"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-400/40 text-gold-200">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <span className="mt-5 font-display text-2xl font-semibold leading-tight text-cream-50">{p.label}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-mist-300">{p.teaser}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-jade-300 group-hover:text-jade-400">
                  Read more <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
