import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { contact, waLink } from '../../data/content'
import { LanternSVG } from '../ui/Ornaments'
import Icon from '../ui/Icon'
import Parchment from './Parchment'

function HangingLantern({ className }) {
  return (
    <div className={`cta-lantern pointer-events-none absolute top-0 w-10 max-md:hidden sm:w-12 ${className}`} aria-hidden="true">
      <div className="cta-rig flex flex-col items-center" style={{ transformOrigin: '50% 0%' }}>
        <div className="lantern-chain h-28 w-[2px] sm:h-36" />
        <LanternSVG className="w-full drop-shadow-[0_0_16px_rgba(255,190,90,0.6)]" />
      </div>
    </div>
  )
}

/** Closing call to action: a parchment arch rising between two swaying lanterns (the footer skyline sits below). */
export default function CtaBand({ service, accent, whatsapp, lead, prefix = 'Ready to begin with' }) {
  const root = useRef(null)
  const subject = accent ?? service.heading.lines.join(' ')
  const message = whatsapp ?? service.whatsapp

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', once: true }, defaults: { ease: 'expo.out' } })
          .from(q('.cta-card'), { y: 120, autoAlpha: 0, duration: 1.4 })
          .from(q('.cta-lantern'), { y: -180, duration: 1.6, ease: 'bounce.out', stagger: 0.15 }, 0.3)
          .from(q('.cta-in > *'), { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.6)
        gsap.fromTo(q('.cta-rig'), { rotation: -5 }, { rotation: 5, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.6 })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative isolate overflow-hidden pb-20 pt-24 sm:pb-28 sm:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_60%,rgb(212_175_55/0.12),transparent_70%)]" />
      <HangingLantern className="left-[8%] lg:left-[16%]" />
      <HangingLantern className="right-[8%] lg:right-[16%]" />

      <div className="relative mx-auto max-w-[760px] px-5 sm:px-8">
        <Parchment className="cta-card" capClassName="h-24 sm:h-32" innerClassName="px-6 pb-14 pt-0 sm:px-12">
          <div className="cta-in relative text-center">
            <Icon name="mosque" className="mx-auto h-10 w-10 text-gold-500" />
            <h2 className="mt-4 font-display text-4xl font-semibold italic leading-tight text-ink-800 sm:text-5xl">
              {prefix} <span className="text-jade-600">{subject}</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-ink-700">
              {lead ?? `Tell us what you need and ${contact.person} or our team will guide you through the next steps.`}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Enquire on WhatsApp
                <span className="btn-arrow">
                  <Icon name="whatsapp" className="h-4 w-4" />
                </span>
              </a>
              <a
                href={contact.phones[0].href}
                className="btn border border-ink-700/40 bg-ink-800 py-2 pl-5 pr-2 text-cream-50 hover:shadow-[0_14px_30px_-12px_rgba(3,17,11,0.8)]"
              >
                Call {contact.phones[0].label}
                <span className="btn-arrow">
                  <Icon name="phone" className="h-4 w-4" />
                </span>
              </a>
            </div>
            <a href={contact.phones[1].href} className="mt-4 inline-flex min-h-[44px] items-center text-sm text-ink-700 underline-offset-4 hover:underline">
              or call {contact.phones[1].label}
            </a>
          </div>
        </Parchment>
      </div>

    </section>
  )
}
