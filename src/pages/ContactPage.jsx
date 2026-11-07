import { contact, waLink } from '../data/content'
import { scrollToTarget } from '../lib/lenis'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/page/PageHero'
import PersonCard from '../components/contact/PersonCard'
import Channels from '../components/contact/Channels'
import EnquiryForm from '../components/contact/EnquiryForm'
import MapCard from '../components/contact/MapCard'
import OfficeVisit from '../components/contact/OfficeVisit'
import Icon from '../components/ui/Icon'
import AfterFirstPaint from '../components/ui/AfterFirstPaint'

export default function ContactPage() {
  useDocumentMeta('Contact', `Call, WhatsApp or visit Al Balagh Tours & Travels at Mawin Zam Zam Plaza, Mehdipatnam, Hyderabad. Contact ${contact.person}.`)

  return (
    <>
      <PageHero
        crumb="Contact"
        kicker="We are here to help"
        lines={['Let’s plan', 'your journey']}
        intro={`Call, WhatsApp or visit us in Mehdipatnam — ${contact.person} and our team will guide you from the very first question.`}
        actions={
          <>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Chat on WhatsApp
              <span className="btn-arrow">
                <Icon name="whatsapp" className="h-4 w-4" />
              </span>
            </a>
            <button type="button" onClick={() => scrollToTarget('#enquiry')} className="btn btn-ghost">
              Send an enquiry
              <span className="btn-arrow">
                <Icon name="mail" className="h-4 w-4" />
              </span>
            </button>
          </>
        }
        art={<PersonCard />}
      />
      <AfterFirstPaint>
        <Channels />

        <section id="enquiry" className="relative pb-24 pt-8 sm:pb-32">
          <div className="mx-auto grid max-w-[1180px] gap-6 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10">
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
            <div className="lg:col-span-5">
              <MapCard />
            </div>
          </div>
        </section>

        <OfficeVisit />
      </AfterFirstPaint>
    </>
  )
}
