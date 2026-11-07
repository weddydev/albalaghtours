import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import { useNearGSAP } from '../hooks/useNearGSAP'
import { scrollToTarget } from '../lib/lenis'
import { enquiry, hotelAmenities, hotelsNote, waLink } from '../data/content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import PageHero from '../components/page/PageHero'
import DistanceRings from '../components/hotels/DistanceRings'
import HotelPicker from '../components/hotels/HotelPicker'
import DistanceScale from '../components/hotels/DistanceScale'
import SectionHeading from '../components/ui/SectionHeading'
import CtaBand from '../components/service/CtaBand'
import Icon from '../components/ui/Icon'
import AfterFirstPaint from '../components/ui/AfterFirstPaint'

const CITIES = ['Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'Baku', 'Cairo', 'Jeddah', 'Riyadh', 'Singapore', 'Hyderabad']

/** Stay services on the Umrah group, with line icons that ink themselves in. */
function Amenities() {
  const root = useRef(null)
  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 80%', once: true } })
          .from(q('.am-card'), { y: 40, autoAlpha: 0, stagger: 0.1, duration: 1, ease: 'expo.out' })
          .from(q('.am-icon path, .am-icon circle, .am-icon rect'), { drawSVG: '0%', duration: 1.2, stagger: 0.05, ease: 'power2.inOut' }, 0.2)
      })
    },
    { scope: root },
  )
  return (
    <section ref={root} className="py-16 sm:py-20">
      <ul className="mx-auto grid max-w-[860px] gap-3 px-5 sm:grid-cols-2 sm:px-8 lg:gap-5 lg:px-10">
        {hotelAmenities.map((a) => (
          <li key={a.title} className="am-card glass rounded-[24px] p-5 text-center sm:p-7">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold-400/40 bg-ink-950/50 text-gold-200 shadow-[0_0_30px_-8px_rgba(212,175,55,0.5)]">
              <Icon name={a.icon} strokeWidth={1.3} className="am-icon h-7 w-7" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-cream-50 sm:text-2xl">{a.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-mist-300 sm:text-sm">{a.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Worldwide stays: copy beside an endless gold marquee of city names. */
function Worldwide() {
  const root = useRef(null)
  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        q('.ww-row').forEach((row, i) => {
          gsap.fromTo(row, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, duration: 28 + i * 6, ease: 'none', repeat: -1 })
        })
        gsap.from(q('.ww-card'), { y: 60, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 80%', once: true } })
      })
    },
    { scope: root },
  )
  return (
    <section ref={root} className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="ww-card glass-strong relative grid items-center gap-10 overflow-hidden rounded-[36px] p-7 sm:p-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Beyond the Haramain</p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-semibold italic leading-none text-cream-50">
              Hotels <span className="text-grad-green pr-[0.05em]">worldwide</span>, too
            </h2>
            <p className="mt-5 max-w-md text-mist-300">City breaks, business trips and family holidays — ask us about hotel stays for your journey.</p>
            <Link to="/services/hotel-bookings" className="btn btn-ghost mt-8">
              Hotel booking service
              <span className="btn-arrow">
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <div className="relative -mx-7 space-y-4 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)] sm:-mx-12 lg:mx-0" aria-hidden="true">
            {[0, 1].map((r) => (
              <div key={r} className="ww-row flex w-max gap-4">
                {[...CITIES, ...CITIES].map((c, i) => (
                  <span
                    key={i}
                    className={`whitespace-nowrap rounded-full border px-5 py-2.5 font-display text-2xl italic ${
                      (i + r) % 3 === 0 ? 'border-gold-300/60 text-gold-100' : 'border-gold-400/20 text-mist-300'
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HotelsPage() {
  useDocumentMeta(
    'Hotels in Makkah & Madinah',
    'Ziyarath Special Umrah group stays: Akaber Al Hijra (3-star, 300 m from the Haram) and Diwan Al Madinah (3-star, 150 m from Masjid an-Nabawi).',
  )

  return (
    <>
      <PageHero
        crumb="Hotels"
        kicker="Accommodation · Makkah & Madinah"
        lines={['Stay closer to', 'the Holy Sites']}
        intro={`The Ziyarath Special Umrah group stays at Akaber Al Hijra in Makkah and Diwan Al Madinah in Madinah. ${hotelsNote}`}
        actions={
          <>
            <button type="button" onClick={() => scrollToTarget('#hotel-list')} className="btn btn-primary">
              See the hotels
              <span className="btn-arrow">
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </button>
            <a href={waLink(enquiry.umrah)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Ask on WhatsApp
              <span className="btn-arrow">
                <Icon name="whatsapp" className="h-4 w-4" />
              </span>
            </a>
          </>
        }
        art={<DistanceRings />}
      />
      <AfterFirstPaint>
        <section id="hotel-list" className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
            <SectionHeading eyebrow="Accommodation" title={['Your ', { accent: 'stay' }]} lead="Switch between Makkah and Madinah to see where the Umrah group stays." />
            <div className="mt-12">
              <HotelPicker />
            </div>
          </div>
        </section>

        <Amenities />
        <DistanceScale />
        <Worldwide />
        <CtaBand
          prefix="Looking for"
          accent="the right stay"
          whatsapp="Assalamu Alaikum, please help me with a hotel stay for my trip."
          lead="For Hajj, the office shares the Makkah and Madinah hotel details at booking. For other trips, tell us your dates and we will look at options."
        />
      </AfterFirstPaint>
    </>
  )
}
