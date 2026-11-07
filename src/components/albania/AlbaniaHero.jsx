import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { useAppReady } from '../../lib/appState'
import { useMagnetic } from '../../hooks/useMagnetic'
import { albania, contact, waLink } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'
import RiderScene from './RiderScene'

const FALLBACKS = [
  'radial-gradient(90% 70% at 60% 20%, #1f6b45 0%, #0d3b28 45%, #04150d 100%)',
  'radial-gradient(90% 70% at 60% 20%, #46708a 0%, #1b3446 45%, #07131c 100%)',
  'radial-gradient(90% 70% at 60% 20%, #6b2a2e 0%, #2a1416 50%, #0a0505 100%)',
]
// arch layout on the right: [position classes, parallax distance]
const ARCHES = [
  ['right-[6%] top-0 w-[58%] aspect-[4/5] z-[2]', -60],
  ['left-0 bottom-[2%] w-[44%] aspect-[3/4] z-[3]', -120],
  ['right-0 bottom-0 w-[34%] aspect-[3/4] z-[1]', -30],
]

/** "Your job in Europe starts here." — title, actions and notice, Albania photos in arches, the rider scene. */
export default function AlbaniaHero() {
  const root = useRef(null)
  const tl = useRef(null)
  const ready = useAppReady()
  const readyRef = useRef(ready)
  const wa = useRef(null)
  const call = useRef(null)
  useMagnetic(wa, 0.25)
  useMagnetic(call, 0.25)
  const { hero, notice } = albania

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const split = SplitText.create(q('.ah-line'), { type: 'words', mask: 'words', wordsClass: 'gw' })
        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out' } })
          .from(q('.ah-crumb li'), { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.8 }, 0.1)
          .from(q('.ah-rule'), { scaleX: 0, duration: 1.5, ease: 'power3.inOut' }, 0.15)
          .from(split.words, { yPercent: 115, stagger: 0.08, duration: 1.3 }, 0.3)
          .from(q('.ah-fade'), { autoAlpha: 0, y: 18, stagger: 0.08, duration: 1 }, 0.75)
          .from(q('.ah-arch'), { autoAlpha: 0, y: 70, stagger: 0.12, duration: 1.4 }, 0.35)
          .from(q('.ah-scene'), { autoAlpha: 0, y: 30, duration: 1.2 }, 0.9)
        if (readyRef.current) tl.current.play()
        // photos drift at different speeds as the hero scrolls away
        q('.ah-par').forEach((el) =>
          gsap.to(el, { y: Number(el.dataset.depth), ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } }),
        )
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

  return (
    <section ref={root} aria-labelledby="albania-title" className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_75%_35%,rgb(30_138_76/0.22),transparent_70%),radial-gradient(45%_45%_at_0%_70%,rgb(13_59_40/0.6),transparent_70%)]" />
      <div className="pattern-overlay absolute inset-0 -z-10 opacity-[0.04]" />

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="min-w-0 lg:col-span-7">
          <nav aria-label="Breadcrumb">
            <ol className="ah-crumb flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-mist-500">
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
                Albania
              </li>
            </ol>
          </nav>
          <div className="ah-rule mt-6 h-px w-48 origin-left bg-linear-to-r from-gold-300 via-gold-200 to-transparent" />

          <p className="ah-fade mt-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-gold-300">
            <span className="h-2 w-2 shrink-0 rotate-45 bg-alb-red" aria-hidden="true" />
            {hero.kicker}
          </p>
          <h1 id="albania-title" className="mt-3 font-display text-[clamp(3rem,7.6vw,7.2rem)] font-semibold italic leading-[0.92] tracking-[-0.01em] text-cream-50">
            <span className="ah-line block pb-[0.06em]">{hero.lines[0]}</span>
            <span className="ah-line accent-split block pb-[0.06em] pr-[0.08em] lg:pl-[0.5em]">{hero.lines[1]}</span>
          </h1>
          <p className="ah-fade mt-6 max-w-xl text-[1.05rem] leading-relaxed text-mist-300">{hero.intro}</p>

          <div className="ah-fade mt-9 flex flex-wrap gap-3">
            <a ref={wa} href={waLink(albania.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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

          {/* TODO: confirm exact wording with client */}
          <p className="ah-fade mt-8 flex max-w-xl items-start gap-3 rounded-2xl border border-gold-400/25 border-l-alb-red border-l-2 bg-ink-950/45 px-4 py-3 text-[0.82rem] leading-relaxed text-mist-300">
            <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-gold-200" />
            {notice}
          </p>
        </div>

        <div className="relative mx-auto h-[360px] w-full max-w-[460px] sm:h-[460px] lg:col-span-5 lg:h-[520px]">
          <div className="absolute inset-[-10%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(246_214_130/0.2),transparent)]" />
          {hero.photos.map((p, i) => (
            <div key={p.src} className={`ah-arch absolute ${ARCHES[i][0]}`}>
              <div className="ah-par h-full w-full" data-depth={ARCHES[i][1]}>
                <ArchFrame className="h-full w-full" innerClassName="bg-ink-900" borderClassName="drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]" finial={i === 0}>
                  <Photo src={p.src} alt={p.alt} fallback={FALLBACKS[i]} priority={i === 0} sizes="(max-width: 1023px) 60vw, 300px">
                    <Icon name={i === 2 ? 'mapPin' : 'globe'} strokeWidth={0.6} className="absolute left-1/2 top-[36%] h-1/3 w-1/3 -translate-x-1/2 text-gold-200 opacity-25" />
                  </Photo>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-950/80 to-transparent" />
                  <span className="absolute inset-x-0 bottom-4 px-3 text-center font-display text-base italic text-cream-50 sm:text-lg">{p.caption}</span>
                </ArchFrame>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RiderScene className="ah-scene mt-10 lg:mt-6" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-b from-transparent to-ink-900" />
    </section>
  )
}
