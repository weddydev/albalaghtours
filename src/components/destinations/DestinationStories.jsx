import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { getLenis, scrollToTarget } from '../../lib/lenis'
import { destinations, enquiry, waLink } from '../../data/content'
import { TONES } from '../services/ServiceCard'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'

function Story({ d, i }) {
  return (
    <article id={`dest-${d.slug}`} className="ds-panel relative grid shrink-0 items-center gap-8 lg:h-full lg:w-[min(84vw,1120px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      <div className="relative mx-auto h-[420px] w-full max-w-[340px] lg:h-[min(64vh,560px)] lg:max-w-[400px]">
        <ArchFrame className="h-full w-full" innerClassName="bg-ink-900" borderClassName="drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]">
          <div className="ds-img absolute inset-[-10%]">
            <Photo src={d.image} fallback={TONES[d.tone]}>
              <div className="pattern-overlay absolute inset-0 opacity-[0.08]" />
              <Icon name="mosque" strokeWidth={0.5} className="absolute left-1/2 top-[34%] h-1/3 w-2/3 -translate-x-1/2 text-gold-200 opacity-20" />
            </Photo>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-950/90 to-transparent" />
        </ArchFrame>
        <span className="absolute -left-2 top-10 font-display text-7xl italic leading-none text-gold-400/30 sm:-left-8 sm:text-8xl">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.26em] text-gold-300">{d.region}</p>
        <h3 className="mt-3 font-display text-[clamp(2.8rem,5.6vw,5.4rem)] font-semibold italic leading-[0.92] text-cream-50">
          {d.name}
          <span className="mt-2 block text-[0.38em] not-italic text-mist-300">{d.full !== d.name ? d.full : d.tagline}</span>
        </h3>
        <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-mist-300">{d.text}</p>
        <ul className="mt-6 space-y-2">
          {d.highlights.map((h) => (
            <li key={h} className="flex items-center gap-3 text-cream-100">
              <span className="h-2 w-2 rotate-45 border border-gold-300 bg-gold-400/30" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {d.bestFor.map((b) => (
            <span key={b} className="rounded-full border border-gold-400/30 px-3 py-1 text-xs text-gold-100">
              {b}
            </span>
          ))}
        </div>
        {d.note && <p className="mt-4 text-xs italic text-mist-500">{d.note}</p>}
        <a
          href={waLink(enquiry[d.programme] ?? 'Assalamu Alaikum Al Balagh Tours. I would like to know more about your Hajj and Umrah programmes.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-8"
        >
          Enquire on WhatsApp
          <span className="btn-arrow">
            <Icon name="whatsapp" className="h-4 w-4" />
          </span>
        </a>
      </div>
    </article>
  )
}

/**
 * Destination stories. Desktop: the section pins and the panels travel horizontally with scroll
 * (images drift inside their arches; a gold progress line fills). Mobile / reduced motion: a vertical stack.
 */
export default function DestinationStories() {
  const root = useRef(null)
  const jump = useRef((slug) => scrollToTarget(`#dest-${slug}`))

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        const track = q('.ds-track')[0]
        const distance = () => track.scrollWidth - window.innerWidth
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: q('.ds-pin')[0], start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
        })
        gsap.fromTo(q('.ds-bar'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: q('.ds-pin')[0], start: 'top top', end: () => `+=${distance()}`, scrub: 0.8 } })
        q('.ds-panel').forEach((panel, i) => {
          gsap.fromTo(
            panel.querySelector('.ds-img'),
            { xPercent: 8 },
            { xPercent: -8, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } },
          )
          gsap.from(panel.querySelectorAll('h3, p, li, .btn'), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.04,
            duration: 0.9,
            ease: 'expo.out',
            // the first panel is already on screen when the pin begins, so it reveals on a normal trigger
            scrollTrigger: i === 0 ? { trigger: panel, start: 'top 75%', once: true } : { trigger: panel, containerAnimation: tween, start: 'left 75%', toggleActions: 'play none none reverse' },
          })
        })
        // jump to a panel = scroll to its horizontal position inside the pin
        jump.current = (slug) => {
          const panel = document.getElementById(`dest-${slug}`)
          const st = tween.scrollTrigger
          const p = Math.min(1, panel.offsetLeft / distance())
          const y = st.start + p * (st.end - st.start)
          const lenis = getLenis()
          lenis ? lenis.scrollTo(y, { duration: 1.6 }) : window.scrollTo({ top: y, behavior: 'smooth' })
        }
        return () => {
          jump.current = (slug) => scrollToTarget(`#dest-${slug}`)
        }
      })
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        q('.ds-panel').forEach((panel) =>
          gsap.from(panel.children, { y: 50, autoAlpha: 0, stagger: 0.12, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: panel, start: 'top 80%', once: true } }),
        )
      })
    },
    { scope: root },
  )

  useEffect(() => {
    const onJump = (e) => jump.current(e.detail)
    window.addEventListener('albalagh:destination', onJump)
    return () => window.removeEventListener('albalagh:destination', onJump)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section ref={root} aria-label="Destination stories" className="relative">
      <div className="ds-pin relative overflow-hidden lg:flex lg:h-svh lg:flex-col lg:justify-center">
        <div className="ds-track flex flex-col gap-20 px-5 py-16 sm:px-8 lg:w-max lg:flex-row lg:items-center lg:gap-[8vw] lg:px-[8vw] lg:py-0">
          {destinations.map((d, i) => (
            <Story key={d.slug} d={d} i={i} />
          ))}
        </div>
        <div className="absolute inset-x-[8vw] bottom-10 hidden h-px bg-gold-400/20 lg:block" aria-hidden="true">
          <div className="ds-bar h-full origin-left bg-linear-to-r from-jade-400 via-gold-300 to-gold-200 shadow-[0_0_12px_rgba(232,207,122,0.6)]" />
        </div>
      </div>
    </section>
  )
}
