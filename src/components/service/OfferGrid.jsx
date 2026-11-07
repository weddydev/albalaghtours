import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { useTilt } from '../../hooks/useTilt'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'

function OfferCard({ item, index }) {
  const ref = useRef(null)
  useTilt(ref, 6)
  return (
    <li className="of-item h-full">
      <div ref={ref} className="glass group relative h-full overflow-hidden rounded-[24px] p-6 sm:p-7">
        <span className="of-line absolute inset-x-6 top-0 h-px origin-left bg-linear-to-r from-gold-200 via-gold-400/60 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_0%,rgb(212_175_55/0.14),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex items-start justify-between">
          <span className="grid h-14 w-12 place-items-center rounded-t-full border border-gold-400/45 bg-ink-950/40 text-gold-200 shadow-[0_0_24px_-8px_rgba(212,175,55,0.6)]">
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <span className="font-display text-4xl italic leading-none text-gold-400/25">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="relative mt-6 font-display text-[1.45rem] font-semibold leading-tight text-cream-50">{item.title}</h3>
        <p className="relative mt-2 text-sm leading-relaxed text-mist-300">{item.text}</p>
      </div>
    </li>
  )
}

/** "What we offer": a sticky story column beside a grid of tilting glass cards. */
export default function OfferGrid({ service }) {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.set(q('.of-item'), { autoAlpha: 0, y: 60, rotationY: -12, transformPerspective: 1000 })
        gsap.set(q('.of-line'), { scaleX: 0 })
        ScrollTrigger.batch(q('.of-item'), {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { autoAlpha: 1, y: 0, rotationY: 0, stagger: 0.1, duration: 1.1, ease: 'expo.out' })
            gsap.to(batch.map((b) => b.querySelector('.of-line')), { scaleX: 1, stagger: 0.1, duration: 1.4, delay: 0.3, ease: 'power3.inOut' })
          },
        })
        gsap.from(q('.of-copy p'), { autoAlpha: 0, y: 20, stagger: 0.12, duration: 1, scrollTrigger: { trigger: q('.of-copy')[0], start: 'top 85%', once: true } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading align="left" eyebrow="What we offer" title={['How we help with ', { accent: service.heading.lines.join(' ') }]} />
            <div className="of-copy mt-8 space-y-4 text-[0.98rem] leading-relaxed text-mist-300">
              {service.long.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:gap-5">
          {service.offer.map((item, i) => (
            <OfferCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
