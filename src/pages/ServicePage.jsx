import { useEffect } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { ScrollTrigger } from '../lib/gsap'
import { scrollToTarget } from '../lib/lenis'
import { useAppReady } from '../lib/appState'
import { enquiry, flyers, serviceBySlug } from '../data/content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import ServiceHero from '../components/service/ServiceHero'
import OfferGrid from '../components/service/OfferGrid'
import HowItWorks from '../components/service/HowItWorks'
import Documents from '../components/service/Documents'
import Faq from '../components/service/Faq'
import Related from '../components/service/Related'
import CtaBand from '../components/service/CtaBand'
import PilgrimProgrammes from '../components/pilgrimage/PilgrimProgrammes'
import HajjNotes from '../components/pilgrimage/HajjNotes'
import CoachGallery from '../components/service/CoachGallery'
import NotFound from './NotFound'
import AfterFirstPaint from '../components/ui/AfterFirstPaint'
import FlyerShowcase from '../components/ui/FlyerShowcase'
import ArchCarousel from '../components/ui/ArchCarousel'
import SectionHeading from '../components/ui/SectionHeading'

export default function ServicePage() {
  const { slug } = useParams()
  const service = serviceBySlug[slug]
  const ready = useAppReady()
  const { hash } = useLocation()
  useDocumentMeta(service ? service.title : 'Page not found', service?.short)

  // arriving with #section (e.g. the Hajj transfer timeline): scroll once the doors have opened
  useEffect(() => {
    if (!ready || !hash) return
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      scrollToTarget(hash)
    }, 650)
    return () => clearTimeout(t)
  }, [ready, hash, slug])

  if (!service) return <NotFound />
  if (service.path) return <Navigate to={service.path} replace />

  return (
    <div key={slug}>
      <ServiceHero service={service} />
      <AfterFirstPaint>
        <OfferGrid service={service} />
        {slug === 'haj-umrah' && <PilgrimProgrammes />}
        {slug === 'haj-umrah' && (
          <FlyerShowcase
            eyebrow="Umrah flyers"
            title={['Latest Umrah ', { accent: 'flyers' }]}
            lead="Our current Deluxe Umrah flyers — tap one to read it in full, then ask our team on WhatsApp for the details."
            items={flyers.umrah}
            whatsapp={enquiry.umrah}
            label="Umrah flyers"
          />
        )}
        {service.coaches && <CoachGallery service={service} />}
        <HowItWorks service={service} />
        <Documents service={service} />
        {service.gallery && (
          <section className="relative py-16 sm:py-24">
            <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
              <SectionHeading
                align="left"
                eyebrow={slug === 'haj-umrah' ? 'Pilgrimage Gallery' : 'Hotel Gallery'}
                title={slug === 'haj-umrah' ? ['Moments from our ', { accent: 'pilgrimage groups' }] : ['Inside our ', { accent: 'hotel stays' }]}
                lead={
                  slug === 'haj-umrah'
                    ? 'Real moments of our pilgrims — direct flight arrivals, Haram visits, ziyarath and buffet dining.'
                    : 'A glimpse of the rooms, buffet dining, reception lobby and amenities arranged for our guests and pilgrims.'
                }
                divider={false}
              />
              <div className="mt-6">
                <ArchCarousel
                  items={service.gallery}
                  label={slug === 'haj-umrah' ? 'Pilgrimage photos' : 'Hotel photos'}
                  fallback="radial-gradient(90% 70% at 60% 25%, #6b5a3a 0%, #2a2216 50%, #0a0805 100%)"
                  icon={slug === 'haj-umrah' ? 'kaaba' : 'bed'}
                  parallax
                />
              </div>
            </div>
          </section>
        )}
        {slug === 'haj-umrah' && <HajjNotes />}
        <Faq service={service} />
        <Related service={service} />
        <CtaBand service={service} />
      </AfterFirstPaint>
    </div>
  )
}
