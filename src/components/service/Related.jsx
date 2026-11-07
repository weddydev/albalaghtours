import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { serviceBySlug } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../services/ServiceCard'

/** Three related services; cards fan in from the right like turning pages. */
export default function Related({ service }) {
  const root = useRef(null)
  const related = service.related.map((s) => serviceBySlug[s]).filter(Boolean)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.from(q('.rl-cell'), {
          x: 80,
          rotationY: -25,
          autoAlpha: 0,
          transformPerspective: 1200,
          transformOrigin: '0% 50%',
          stagger: 0.12,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.rl-grid')[0], start: 'top 85%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading align="left" eyebrow="Keep exploring" title={['Related ', { accent: 'services' }]} divider={false} />
        <div className="rl-grid mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {related.map((s) => (
            <div key={s.slug} className="rl-cell lg:h-[330px]">
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
