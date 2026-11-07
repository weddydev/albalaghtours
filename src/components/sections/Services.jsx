import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { services, waLink } from '../../data/content'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../services/ServiceCard'
import Icon from '../ui/Icon'
import TransfersTeaser from './TransfersTeaser'

// Bento placement (4 cols on desktop, 2 on mobile). Order + grid-flow-dense fills every cell.
const LAYOUT = {
  'holiday-packages': { cls: 'col-span-2 lg:row-span-2', size: 'xl' },
  'haj-umrah': { cls: 'lg:col-span-2', size: 'wide' },
  'immigration-services': { cls: 'lg:col-span-2', size: 'wide' },
  'vfs-appointments': { cls: 'col-span-2', size: 'wide' },
  'albania-work-visa': { cls: 'col-span-2', size: 'wide' },
  'private-transfers': { cls: 'col-span-2', size: 'wide' },
}
const COUNT = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'][services.length] || services.length

export default function Services() {
  const root = useRef(null)

  useNearGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // cards rise in batches as they enter
        gsap.set(q('.svc-reveal'), { autoAlpha: 0, y: 70, rotationX: -10, transformPerspective: 1200, transformOrigin: '50% 100%' })
        ScrollTrigger.batch(q('.svc-reveal'), {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, rotationX: 0, duration: 1.1, stagger: 0.09, ease: 'expo.out', overwrite: true }),
        })
        gsap.from(q('.svc-aside > *'), {
          autoAlpha: 0,
          y: 24,
          stagger: 0.12,
          duration: 1,
          scrollTrigger: { trigger: q('.svc-aside')[0], start: 'top 85%', once: true },
        })
      })

      // the two halves of the bento drift against each other while scrolling
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const grid = q('.svc-grid')[0]
        const cells = q('.svc-cell')
        const half = grid.offsetWidth / 2
        const right = cells.filter((c) => c.offsetLeft + c.offsetWidth / 2 > half && c.offsetWidth < half * 1.5)
        const left = cells.filter((c) => !right.includes(c))
        const st = { trigger: grid, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
        gsap.fromTo(right, { y: 50 }, { y: -50, ease: 'none', scrollTrigger: st })
        gsap.fromTo(left, { y: -12 }, { y: 12, ease: 'none', scrollTrigger: { ...st } })
      })
    },
    { scope: root },
  )

  return (
    <section id="services" ref={root} aria-labelledby="services-title" className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="pattern-overlay pointer-events-none absolute inset-0 -z-10 opacity-[0.035]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(200_150_62/0.16),transparent)]" />

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-7"
            id="services-title"
            align="left"
            eyebrow="Our Services"
            title={['Complete travel ', { accent: 'solutions' }, ', one trusted desk']}
          />
          <div className="svc-aside lg:col-span-5 lg:pb-3">
            <p className="text-[1.02rem] leading-relaxed text-mist-300">
              {COUNT} services under one roof in Mehdipatnam — from your next holiday to your passport renewal.{' '}
              <span className="pointer-coarse:hidden">Hover a card to see what is inside, then click for the full details.</span>
              <span className="hidden pointer-coarse:inline">Tap any card for the full details.</span>
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-2 text-gold-200">
                <span className="font-display text-3xl text-cream-50">{services.length}</span> services
              </span>
              <span className="h-6 w-px bg-gold-400/30" aria-hidden="true" />
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-jade-300 hover:text-jade-400">
                <Icon name="whatsapp" className="h-4 w-4" />
                Not sure which? Ask us
                <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="svc-grid mt-14 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:auto-rows-[290px] lg:grid-cols-4 lg:gap-5">
          {services.map((s) => {
            const layout = LAYOUT[s.slug] || { cls: '', size: 'md' }
            return (
              <div key={s.slug} className={`svc-cell ${layout.cls}`}>
                <div className="svc-reveal h-full">
                  <ServiceCard service={s} size={layout.size} />
                </div>
              </div>
            )
          })}
        </div>
        <TransfersTeaser />
      </div>
    </section>
  )
}
