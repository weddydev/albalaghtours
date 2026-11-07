import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { useAppReady } from '../../lib/appState'

/**
 * Hero shared by the Packages / Hotels / Destinations / Contact pages.
 * Copy on the left (breadcrumb, gold rule, kicker, giant italic title with one green line,
 * intro, actions); each page passes its own animated `art` for the right-hand side.
 * The copy timeline waits for the first-load preloader.
 */
export default function PageHero({ crumb, kicker, lines, accent = 1, intro, actions, art, artClassName = '' }) {
  const root = useRef(null)
  const tl = useRef(null)
  const ready = useAppReady()
  const readyRef = useRef(ready)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const split = SplitText.create(q('.ph-line'), { type: 'words', mask: 'words', wordsClass: 'gw' })
        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out' } })
          .from(q('.ph-crumb li'), { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.8 }, 0.05)
          .from(q('.ph-rule'), { scaleX: 0, duration: 1.5, ease: 'power3.inOut' }, 0.1)
          .from(split.words, { yPercent: 115, stagger: 0.08, duration: 1.3 }, 0.25)
          .from(q('.ph-fade'), { autoAlpha: 0, y: 18, stagger: 0.08, duration: 1 }, 0.7)
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

  return (
    <section ref={root} aria-labelledby="page-title" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:flex lg:min-h-[86vh] lg:items-center lg:pb-20 lg:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_75%_40%,rgb(200_150_62/0.22),transparent_70%),radial-gradient(45%_45%_at_0%_70%,rgb(51_36_26/0.6),transparent_70%)]" />
      <div className="pattern-overlay absolute inset-0 -z-10 opacity-[0.04]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-ink-900" />

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-6 xl:col-span-6">
          <nav aria-label="Breadcrumb">
            <ol className="ph-crumb flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-mist-500">
              <li>
                <Link to="/" className="transition hover:text-gold-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-200">
                {crumb}
              </li>
            </ol>
          </nav>
          <div className="ph-rule mt-6 h-px w-48 origin-left bg-linear-to-r from-gold-300 via-gold-200 to-transparent" />
          <p className="ph-fade mt-6 text-xs font-medium uppercase tracking-[0.28em] text-gold-300">{kicker}</p>
          <h1 id="page-title" className="mt-3 font-display text-[clamp(3.1rem,8.4vw,7.6rem)] font-semibold leading-[0.9] tracking-[-0.01em] text-cream-50">
            {lines.map((l, i) => (
              <span key={l} className={`ph-line block pb-[0.06em] ${i === accent ? 'accent-split pr-[0.08em]' : ''} ${i === 1 ? 'lg:pl-[0.5em]' : ''}`}>
                {l}
              </span>
            ))}
          </h1>
          <p className="ph-fade mt-6 max-w-xl text-[1.05rem] leading-relaxed text-mist-300">{intro}</p>
          {actions && <div className="ph-fade mt-9 flex flex-wrap gap-3">{actions}</div>}
        </div>
        <div className={`relative lg:col-span-6 xl:col-span-6 ${artClassName}`}>{art}</div>
      </div>
    </section>
  )
}
