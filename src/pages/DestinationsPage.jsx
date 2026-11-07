import { scrollToTarget } from '../lib/lenis'
import { waLink } from '../data/content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/page/PageHero'
import RouteMap from '../components/destinations/RouteMap'
import DestinationBento from '../components/destinations/DestinationBento'
import DestinationStories from '../components/destinations/DestinationStories'
import SectionHeading from '../components/ui/SectionHeading'
import CtaBand from '../components/service/CtaBand'
import Icon from '../components/ui/Icon'
import AfterFirstPaint from '../components/ui/AfterFirstPaint'

export default function DestinationsPage() {
  useDocumentMeta(
    'Top Destinations',
    'Madinah, Makkah, Taif, Mina & Arafat and Badr — the places on the Hajj 2027 and Ziyarath Special Umrah programmes of Al Balagh Tours & Travels.',
  )

  return (
    <>
      <PageHero
        crumb="Destinations"
        kicker="Hajj 2027 · Ziyarath Special Umrah"
        lines={['Explore top', 'Destinations']}
        intro="The places our Hajj and Umrah programmes take you — the two Holy Cities, Taif, the days of Hajj at Mina and Arafat, and Badr on the Madinah Ziyarath."
        actions={
          <>
            <button type="button" onClick={() => scrollToTarget('#dest-grid')} className="btn btn-primary">
              See destinations
              <span className="btn-arrow">
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </button>
            <a href={waLink('Assalamu Alaikum Al Balagh Tours. I would like to know more about your Hajj and Umrah programmes.')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Ask about the programmes
              <span className="btn-arrow">
                <Icon name="whatsapp" className="h-4 w-4" />
              </span>
            </a>
          </>
        }
        art={<RouteMap />}
      />
      <AfterFirstPaint>
        <section id="dest-grid" className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
            <SectionHeading eyebrow="On our programmes" title={['Places that ', { accent: 'call' }, ' to the heart']} lead="Tap a place to read how it features in the programme." />
            <div className="mt-12">
              <DestinationBento />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
          <SectionHeading align="left" eyebrow="Destination stories" title={['A closer ', { accent: 'look' }]} divider={false} />
        </div>
        <DestinationStories />

        <CtaBand
          prefix="Dreaming of"
          accent="somewhere else"
          whatsapp="Assalamu Alaikum, I would like to plan a trip to a destination not listed on your website."
          lead="Beyond Hajj & Umrah, our holiday packages cover other trips too. Tell us where you would like to go."
        />
      </AfterFirstPaint>
    </>
  )
}
