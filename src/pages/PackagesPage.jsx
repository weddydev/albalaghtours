import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { enquiry, flyers, waLink } from '../data/content'
import { ScrollTrigger } from '../lib/gsap'
import { scrollToTarget } from '../lib/lenis'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/page/PageHero'
import TierFan from '../components/packages/TierFan'
import PackageShowcase from '../components/packages/PackageShowcase'
import SeasonBanner from '../components/packages/SeasonBanner'
import ComparePackages from '../components/packages/ComparePackages'
import SectionHeading from '../components/ui/SectionHeading'
import CtaBand from '../components/service/CtaBand'
import Icon from '../components/ui/Icon'
import AfterFirstPaint from '../components/ui/AfterFirstPaint'
import FlyerShowcase from '../components/ui/FlyerShowcase'

export default function PackagesPage() {
  const [params] = useSearchParams()
  const { state } = useLocation()
  const initial = params.get('type') === 'umrah' ? 'umrah' : 'hajj'
  const search = state?.search // set by the hero search bar on the home page
  useDocumentMeta(
    'Hajj 2027 & Umrah Packages',
    'Hajj 2027 and the Ziyarath Special Umrah group from Hyderabad — dining, laundry, Ziyarath, private Hajj transfers and direct Umrah flights.',
  )

  // arriving from the hero search: bring the programme card into view once the doors have opened
  useEffect(() => {
    if (!search) return
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      scrollToTarget('#pk-section')
    }, 650)
    return () => clearTimeout(t)
  }, [search])

  return (
    <>
      <PageHero
        crumb="Packages"
        kicker="Hajj 2027 · Ziyarath Special Umrah"
        lines={['Journeys of', 'the Heart']}
        intro="Two programmes, planned with care: Hajj 2027 with private transfers during the days of Hajj, and the Ziyarath Special Umrah group with direct flights from Hyderabad."
        actions={
          <>
            <button type="button" onClick={() => scrollToTarget('#pk-section')} className="btn btn-primary">
              Explore programmes
              <span className="btn-arrow">
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </button>
            <a href={waLink('Assalamu Alaikum Al Balagh Tours. I would like to speak to your team about Hajj / Umrah.')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Ask our team
              <span className="btn-arrow">
                <Icon name="whatsapp" className="h-4 w-4" />
              </span>
            </a>
          </>
        }
        art={<TierFan />}
      />
      <AfterFirstPaint>
        <section id="pk-section" className="relative py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(50%_40%_at_50%_25%,rgb(212_175_55/0.08),transparent)]" />
          <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Featured journeys"
              title={['Choose your ', { accent: 'journey' }]}
              lead="Switch between Hajj 2027 and the Ziyarath Special Umrah group, then open the details for inclusions, hotels and the programme."
            />
            <div className="mt-12">
              <PackageShowcase initial={search?.type ?? initial} search={search} />
            </div>
          </div>
        </section>

        <FlyerShowcase
          eyebrow="Umrah flyers"
          title={['Latest Umrah ', { accent: 'flyers' }]}
          lead="Our current Deluxe Umrah flyers — tap one to read it in full, then ask our team on WhatsApp for the details."
          items={flyers.umrah}
          whatsapp={enquiry.umrah}
          label="Umrah flyers"
        />
        <SeasonBanner />
        <ComparePackages />
        <CtaBand
          prefix="Ready to travel with"
          accent="a clear plan"
          whatsapp={'Assalamu Alaikum Al Balagh Tours. I would like to speak to your team about Hajj / Umrah.'}
          lead="Speak to our team about the price, dates, hotel arrangements and the details you need before booking."
        />
      </AfterFirstPaint>
    </>
  )
}
