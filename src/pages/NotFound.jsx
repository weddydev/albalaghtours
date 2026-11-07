import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import { servicePath, services } from '../data/content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { ArchFrame, LanternSVG } from '../components/ui/Ornaments'
import Icon from '../components/ui/Icon'

export default function NotFound() {
  const root = useRef(null)
  useDocumentMeta('Page not found', 'This page could not be found. Explore Al Balagh Tours & Travels services in Hyderabad.')

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ delay: 0.3, defaults: { ease: 'expo.out' } })
          .from(q('.nf-reveal'), { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4 })
          .from(q('.nf-digit'), { yPercent: 120, stagger: 0.1, duration: 1.2 }, 0.2)
          .from(q('.nf-fade'), { autoAlpha: 0, y: 20, stagger: 0.1, duration: 1 }, 0.6)
          .from(q('.nf-lantern'), { y: -220, duration: 1.6, ease: 'bounce.out' }, 0.3)
        gsap.fromTo(q('.nf-rig'), { rotation: -6 }, { rotation: 6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 0%' })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative isolate flex min-h-svh items-center overflow-hidden pb-24 pt-36">
      <div className="pattern-overlay absolute inset-0 -z-10 opacity-[0.04]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(30_138_76/0.2),transparent)]" />
      <div className="mx-auto grid w-full max-w-[1100px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative mx-auto h-[420px] w-[300px]">
          <ArchFrame className="h-full w-full" innerClassName="bg-[radial-gradient(80%_60%_at_50%_30%,#0d3b28,#03110b)]">
            <div className="nf-reveal absolute inset-0 flex items-end justify-center pb-12">
              <p className="flex overflow-hidden font-display text-[8.5rem] font-semibold italic leading-none">
                {['4', '0', '4'].map((d, i) => (
                  <span key={i} className="nf-digit text-grad-gold inline-block px-1">
                    {d}
                  </span>
                ))}
              </p>
            </div>
          </ArchFrame>
          <div className="nf-lantern absolute left-[calc(50%-28px)] top-[-150px] w-14">
            <div className="nf-rig flex flex-col items-center">
              <div className="lantern-chain h-40 w-[2px]" />
              <LanternSVG className="w-full drop-shadow-[0_0_18px_rgba(255,190,90,0.6)]" />
            </div>
          </div>
        </div>
        <div className="text-center lg:text-left">
          <p className="nf-fade eyebrow">Page not found</p>
          <h1 className="nf-fade mt-5 font-display text-5xl font-semibold italic leading-none text-cream-50 sm:text-6xl">
            This path isn’t on <span className="text-grad-green">our map</span>
          </h1>
          <p className="nf-fade mt-5 text-mist-300">The page may have moved. Let us guide you back — or straight to the service you need.</p>
          <div className="nf-fade mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link to="/" className="btn btn-primary">
              Back to home
              <span className="btn-arrow">
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <ul className="nf-fade mt-8 flex flex-wrap justify-center gap-2 lg:justify-start" aria-label="Popular services">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  to={servicePath(s)}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-gold-400/30 px-4 text-xs text-mist-100 transition hover:border-gold-200 hover:text-cream-50"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
