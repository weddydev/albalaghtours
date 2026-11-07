import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { useAppReady } from '../../lib/appState'
import { useMagnetic } from '../../hooks/useMagnetic'
import { contact, waLink } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Icon from '../ui/Icon'
import { ServiceArt } from '../services/ServiceCard'
import Motif from './Motif'

export default function ServiceHero({ service }) {
  const root = useRef(null)
  const tl = useRef(null)
  const ready = useAppReady()
  const readyRef = useRef(ready)
  const wa = useRef(null)
  const call = useRef(null)
  useMagnetic(wa, 0.25)
  useMagnetic(call, 0.25)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const split = SplitText.create(q('.svh-line'), { type: 'words', mask: 'words', wordsClass: 'gw' })
        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out' } })
          .from(q('.svh-reveal'), { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0)
          .from(q('.svh-zoom'), { scale: 1.35, duration: 2.6 }, 0)
          .from(q('.arch-borders'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.7, ease: 'power2.inOut' }, 0.1)
          .from(q('.svh-crumb li'), { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.8 }, 0.1)
          .from(q('.svh-rule'), { scaleX: 0, duration: 1.5, ease: 'power3.inOut' }, 0.15)
          .from(split.words, { yPercent: 115, stagger: 0.08, duration: 1.3 }, 0.3)
          .from(q('.svh-fade'), { autoAlpha: 0, y: 18, stagger: 0.08, duration: 1 }, 0.75)
        if (readyRef.current) tl.current.play()
        return () => {
          tl.current = null
        }
      })
    },
    { scope: root },
  )

  useEffect(() => {
    readyRef.current = ready
    if (ready) tl.current?.play()
  }, [ready])

  const { lines, accent } = service.heading

  return (
    <section ref={root} aria-labelledby="service-title" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:flex lg:min-h-[86vh] lg:items-center lg:pb-20 lg:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_75%_40%,rgb(200_150_62/0.22),transparent_70%),radial-gradient(45%_45%_at_0%_70%,rgb(51_36_26/0.6),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-ink-900" />
      <div className="pattern-overlay absolute inset-0 -z-10 opacity-[0.04]" />

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <nav aria-label="Breadcrumb">
            <ol className="svh-crumb flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-mist-500">
              <li>
                <Link to="/" className="transition hover:text-gold-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to={{ pathname: '/', hash: '#services' }} className="transition hover:text-gold-200">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-200">
                {service.title}
              </li>
            </ol>
          </nav>
          <div className="svh-rule mt-6 h-px w-48 origin-left bg-linear-to-r from-gold-300 via-gold-200 to-transparent" />

          <p className="svh-fade mt-6 text-xs font-medium uppercase tracking-[0.28em] text-gold-300">{service.kicker}</p>
          <h1 id="service-title" className="mt-3 font-display text-[clamp(3.2rem,9vw,8.2rem)] font-semibold leading-[0.9] tracking-[-0.01em] text-cream-50">
            {lines.map((l, i) => (
              <span key={l} className={`svh-line block pb-[0.06em] ${i === accent ? 'accent-split pr-[0.08em]' : ''} ${i === 1 ? 'lg:pl-[0.6em]' : ''}`}>
                {l}
              </span>
            ))}
          </h1>
          <p className="svh-fade mt-6 max-w-xl text-[1.05rem] leading-relaxed text-mist-300">{service.intro}</p>

          <div className="svh-fade mt-9 flex flex-wrap gap-3">
            <a ref={wa} href={waLink(service.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Enquire on WhatsApp
              <span className="btn-arrow">
                <Icon name="whatsapp" className="h-4 w-4" />
              </span>
            </a>
            <a ref={call} href={contact.phones[0].href} className="btn btn-ghost">
              Call Now
              <span className="btn-arrow">
                <Icon name="phone" className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:col-span-5 lg:max-w-[440px]">
          <div className="absolute inset-[-12%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(246_214_130/0.22),transparent)]" />
          <ArchFrame className="aspect-[4/5] w-full" innerClassName="bg-ink-900" borderClassName="drop-shadow-[0_0_12px_rgba(200,150,62,0.45)]">
            <div className="svh-reveal absolute inset-0">
              <div className="svh-zoom absolute inset-0">
                <ServiceArt service={service} priority iconClassName="!h-[60%] !w-[60%] !right-[20%] !top-[12%]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-950/90 to-transparent" />
            </div>
          </ArchFrame>
          <Motif type={service.motif} className="absolute -left-4 top-[30%] h-24 w-24 sm:-left-10 sm:h-28 sm:w-28" />
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
            <div className="svh-fade glass flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs text-cream-100">
              <Icon name="mapPin" className="h-4 w-4 text-gold-200" />
              Mehdipatnam · Hyderabad
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
