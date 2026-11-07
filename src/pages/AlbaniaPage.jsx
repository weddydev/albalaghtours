import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useNearGSAP } from '../hooks/useNearGSAP'
import { albania, flyers, serviceBySlug } from '../data/content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import AlbaniaHero from '../components/albania/AlbaniaHero'
import AlbaniaEnquiry from '../components/albania/AlbaniaEnquiry'
import OfferGrid from '../components/service/OfferGrid'
import Documents from '../components/service/Documents'
import Faq from '../components/service/Faq'
import Related from '../components/service/Related'
import CtaBand from '../components/service/CtaBand'
import ProgrammeTimeline from '../components/pilgrimage/ProgrammeTimeline'
import ArchCarousel from '../components/ui/ArchCarousel'
import SectionHeading from '../components/ui/SectionHeading'
import Icon from '../components/ui/Icon'
import AfterFirstPaint from '../components/ui/AfterFirstPaint'
import FlyerShowcase from '../components/ui/FlyerShowcase'

const SERVICE = serviceBySlug['albania-work-visa']
const GALLERY_FALLBACK = 'radial-gradient(90% 70% at 60% 20%, #6b4a2a 0%, #33241a 45%, #1a130e 100%)'

/** "Why Albania": glass cards that rise in and light their icon on hover. */
function WhyAlbania() {
  const root = useRef(null)
  const { why } = albania
  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap.set(q('.wa-card'), { autoAlpha: 0, y: 60 })
        ScrollTrigger.batch(q('.wa-card'), {
          start: 'top 88%',
          once: true,
          onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1.1, ease: 'expo.out', overwrite: true }),
        })
      })
    },
    { scope: root },
  )
  return (
    <section ref={root} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} lead={why.lead} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {why.cards.map((c, i) => (
            <li key={c.title} className="wa-card glass group relative min-w-0 overflow-hidden rounded-[24px] p-6 sm:p-7">
              <span className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-gold-200 via-gold-400/60 to-transparent" />
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-12 place-items-center rounded-t-full border border-gold-400/45 bg-ink-950/40 text-gold-200 shadow-[0_0_24px_-8px_rgba(200,150,62,0.6)] transition-colors duration-500 group-hover:text-cream-50">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-4xl leading-none text-gold-400/25">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-6 font-display text-[1.45rem] font-semibold leading-tight text-cream-50">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function AlbaniaPage() {
  useDocumentMeta(albania.meta.title, albania.meta.description, { exact: true })
  const { help, steps, documents, gallery, faqs, cta } = albania

  return (
    <>
      <AlbaniaHero />
      <AfterFirstPaint>
        <FlyerShowcase
          eyebrow="Now hiring"
          title={['Albania ', { accent: 'job flyer' }]}
          lead="Tap the flyer to read it in full, or ask our team on WhatsApp for the details."
          items={flyers.albania}
          whatsapp={albania.whatsapp}
          label="Albania flyer"
        >
          {/* TODO: confirm exact wording with client */}
          <p className="mt-6 flex max-w-xl items-start gap-3 rounded-2xl border border-gold-400/25 border-l-2 border-l-alb-red bg-ink-950/45 px-4 py-3 text-[0.82rem] leading-relaxed text-mist-300">
            <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-gold-200" />
            {albania.notice}
          </p>
        </FlyerShowcase>
        <WhyAlbania />
        <OfferGrid service={help} />

        <section className="relative overflow-hidden bg-linear-to-b from-transparent via-ink-950/60 to-transparent py-20 sm:py-28">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
            <SectionHeading eyebrow={steps.eyebrow} title={steps.title} />
            <div className="mt-14">
              <ProgrammeTimeline steps={steps.items} label="Step" icon="check" />
            </div>
          </div>
        </section>

        <Documents service={documents} />

        <section className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
            <SectionHeading align="left" eyebrow="Gallery" title={['Glimpses of ', { accent: 'Albania' }]} divider={false} />
            <div className="mt-6">
              <ArchCarousel items={gallery} label="Albania photos" fallback={GALLERY_FALLBACK} icon="globe" parallax />
            </div>
          </div>
        </section>

        <Faq service={{ faqs, whatsapp: albania.whatsapp }} />
        <AlbaniaEnquiry />
        <Related service={SERVICE} />
        <CtaBand prefix={cta.prefix} accent={cta.accent} whatsapp={albania.whatsapp} lead={cta.lead} />
      </AfterFirstPaint>
    </>
  )
}
