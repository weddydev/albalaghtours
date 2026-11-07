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
    'Dubai, Türkiye, the Maldives, Thailand, Malaysia & Singapore, Azerbaijan, Europe and Makkah & Madinah — trips planned end to end by Al Balagh Tours & Travels, Hyderabad.',
  )

  return (
    <>
      <PageHero
        crumb="Destinations"
        kicker="Holidays · Pilgrimage · Worldwide"
        lines={['Where to', 'next?']}
        intro="City breaks, island escapes, classic tours and pilgrimage — flights, visas, hotels and sightseeing arranged together, from one desk in Hyderabad."
        actions={
          <>
            <button type="button" onClick={() => scrollToTarget('#dest-grid')} className="btn btn-primary">
              See destinations
              <span className="btn-arrow">
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </button>
            <a href={waLink('Hello Al Balagh Tours. I would like help choosing a destination for my next trip.')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Help me choose
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
            <SectionHeading eyebrow="Popular destinations" title={['Places worth the ', { accent: 'journey' }]} lead="Tap a destination to read more — every trip is tailor-made around your dates and budget." />
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
          whatsapp="Hello, I would like to plan a trip to a destination not listed on your website."
          lead="These are just a few favourites. Tell us where you would like to go and we will plan the rest."
        />
      </AfterFirstPaint>
    </>
  )
}
