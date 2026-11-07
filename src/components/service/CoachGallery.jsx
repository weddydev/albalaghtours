import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import ArchCarousel from '../ui/ArchCarousel'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'

const FALLBACK = 'radial-gradient(90% 70% at 60% 25%, #6b5a3a 0%, #2a2216 50%, #0a0805 100%)'

/** Private Transfers: feature chips, the route line, the coach photo carousel and a link to the Hajj transfers. */
export default function CoachGallery({ service }) {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: q('.cg-head')[0], start: 'top 80%', once: true }, defaults: { ease: 'expo.out' } })
          .from(q('.cg-chip'), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.8 })
          .from(q('.cg-route-line'), { scaleX: 0, duration: 1.2, ease: 'power3.inOut' }, 0.2)
          .from(q('.cg-stop'), { scale: 0, autoAlpha: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(3)' }, 0.4)
        gsap.from(q('.cg-hajj'), { y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.cg-hajj')[0], start: 'top 90%', once: true } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="cg-head grid items-end gap-8 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-7" align="left" eyebrow="Our coaches" title={['Travel in ', { accent: 'comfort' }]} divider={false} />
          <div className="lg:col-span-5">
            <ul className="flex flex-wrap gap-2">
              {service.features.map((f) => (
                <li key={f.label} className="cg-chip inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-ink-950/50 px-4 py-2 text-sm text-gold-100">
                  <Icon name={f.icon} className="h-4 w-4 shrink-0 text-gold-300" />
                  {f.label}
                </li>
              ))}
            </ul>
            {/* route line */}
            <div className="relative mt-6" aria-label={`Routes: ${service.routes.join(', ')}`} role="img">
              <div className="cg-route-line absolute inset-x-3 top-3 h-px origin-left bg-linear-to-r from-jade-400 via-gold-300 to-gold-200" />
              <ol className="relative flex justify-between" aria-hidden="true">
                {service.routes.map((r) => (
                  <li key={r} className="cg-stop flex flex-col items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-gold-300 bg-ink-900">
                      <span className="h-2 w-2 rounded-full bg-gold-200" />
                    </span>
                    <span className="font-display text-lg text-cream-50">{r}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ArchCarousel items={service.coaches} label="Coach photos" fallback={FALLBACK} icon="bus" />
        </div>
        <p className="mt-2 text-xs text-mist-500">Photos are representative.</p>

        <Link
          to={{ pathname: '/services/haj-umrah', hash: '#programmes' }}
          className="cg-hajj glass group mt-10 flex flex-col gap-4 rounded-[28px] p-6 transition-colors hover:!border-gold-300/60 sm:flex-row sm:items-center sm:p-8"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold-400/50 bg-ink-950/50 text-gold-200">
            <Icon name="kaaba" className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-2xl font-semibold text-cream-50">Hajj 2027 private bus transfers</span>
            <span className="mt-1 block text-sm text-mist-300">Private buses during the 5 days of Hajj — from your Makkah hotel to Mina, Arafat, Muzdalifah, Jamarat and back.</span>
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-200">
            See the transfer timeline
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  )
}
