import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import Icon from '../ui/Icon'
import Photo from '../ui/Photo'
import { servicePath } from '../../data/content'

/* Fallback backgrounds while /images/services/*.jpg are missing */
export const TONES = {
  night: 'radial-gradient(90% 70% at 70% 20%, #3a2a1e 0%, #1f1510 45%, #120c09 100%)',
  sky: 'radial-gradient(90% 70% at 75% 15%, #6b4a2e 0%, #33241a 45%, #17110d 100%)',
  dusk: 'radial-gradient(90% 70% at 70% 20%, #8a5a3e 0%, #3b2418 45%, #17110d 100%)',
  emerald: 'radial-gradient(90% 70% at 70% 20%, #6b4a2a 0%, #33241a 45%, #1a130e 100%)',
  sand: 'radial-gradient(90% 70% at 70% 20%, #9b7a45 0%, #4a3820 45%, #120d06 100%)',
}

/** Gradient + oversized faint line icon, used under every service image. */
export function ServiceArt({ service, iconClassName = '', priority = false, rays = false }) {
  return (
    <Photo src={service.image} fallback={TONES[service.tone] || TONES.emerald} width={1200} height={900} priority={priority} rays={rays}>
      <div className="pattern-overlay absolute inset-0 opacity-[0.07]" />
      <Icon
        name={service.icon}
        strokeWidth={0.6}
        className={`absolute -right-[8%] -top-[6%] h-[78%] w-[78%] text-gold-200 opacity-[0.16] ${iconClassName}`}
      />
    </Photo>
  )
}

/**
 * A service card that links to the service page (/services/:slug, or its own page).
 * Fine pointer + motion: a GSAP hover timeline (lift, image slides up and dims, sub-services
 * stagger in, description swaps for a "View details" pill) + 3D tilt + gold spotlight.
 * Keyboard focus plays the same timeline. Touch / reduced motion: everything is shown statically.
 */
export default function ServiceCard({ service, size = 'md', className = '' }) {
  const ref = useRef(null)
  const featured = size === 'xl'
  const wide = size === 'wide'

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const el = ref.current
        const q = gsap.utils.selector(el)
        gsap.set(q('.sc-sub'), { autoAlpha: 0, y: 14 })
        gsap.set(q('.sc-pill'), { autoAlpha: 0, x: -10 })
        gsap.set(el, { transformPerspective: 1100 })

        const tl = gsap
          .timeline({ paused: true, defaults: { duration: 0.55, ease: 'power3.out' } })
          .to(el, { y: -8, duration: 0.6 }, 0)
          .to(q('.sc-img'), { yPercent: -9, scale: 1.06, duration: 0.9 }, 0)
          .to(q('.sc-dim'), { opacity: 1, duration: 0.5 }, 0)
          .to(q('.sc-glow'), { opacity: 1, duration: 0.45 }, 0)
          .to(q('.sc-arrow'), { autoAlpha: 0, scale: 0.4, rotate: 45, duration: 0.3 }, 0)
          .to(q('.sc-desc'), { autoAlpha: 0, y: -8, duration: 0.25 }, 0)
          .to(q('.sc-icon'), { autoAlpha: featured ? 1 : 0, scale: featured ? 1 : 0.6, duration: 0.3 }, 0)
          .to(q('.sc-sub'), { autoAlpha: 1, y: 0, stagger: 0.07 }, 0.12)
          .to(q('.sc-pill'), { autoAlpha: 1, x: 0 }, 0.2)

        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3.out' })
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3.out' })
        const spot = q('.sc-spot')[0]
        const sx = gsap.quickTo(spot, 'x', { duration: 0.35, ease: 'power3.out' })
        const sy = gsap.quickTo(spot, 'y', { duration: 0.35, ease: 'power3.out' })
        const tilt = featured ? 4 : 7

        const enter = () => tl.timeScale(1).play()
        const leave = () => {
          tl.timeScale(1.4).reverse()
          rx(0)
          ry(0)
        }
        const move = (e) => {
          const r = el.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width
          const py = (e.clientY - r.top) / r.height
          ry((px - 0.5) * tilt)
          rx(-(py - 0.5) * tilt)
          sx(e.clientX - r.left)
          sy(e.clientY - r.top)
        }
        const focus = () => {
          sx(el.offsetWidth * 0.3)
          sy(el.offsetHeight * 0.3)
          enter()
        }
        el.addEventListener('pointerenter', enter)
        el.addEventListener('pointerleave', leave)
        el.addEventListener('pointermove', move)
        el.addEventListener('focus', focus)
        el.addEventListener('blur', leave)
        return () => {
          el.removeEventListener('pointerenter', enter)
          el.removeEventListener('pointerleave', leave)
          el.removeEventListener('pointermove', move)
          el.removeEventListener('focus', focus)
          el.removeEventListener('blur', leave)
        }
      })
    },
    { scope: ref },
  )

  const subs = service.subs.slice(0, featured ? 4 : 3)

  return (
    <Link
      ref={ref}
      to={servicePath(service)}
      className={`sc relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[26px] border border-gold-400/25 bg-ink-900 p-4 outline-none sm:p-6 ${
        featured ? 'min-h-[380px] lg:p-9' : 'min-h-[250px]'
      } ${className}`}
    >
      {/* imagery */}
      <div className="sc-img absolute inset-0 -z-10">
        <ServiceArt service={service} rays={featured} />
      </div>
      {/* warm brown grade so every photo sits in the palette, then the legibility gradient
          (stronger on touch, where the subs list is always shown over the photo) */}
      <div className="absolute inset-0 -z-10 bg-ink-700/45 mix-blend-multiply" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/75 to-ink-950/5 pointer-coarse:via-ink-950/88 pointer-coarse:to-ink-950/25" />
      <div className="sc-dim absolute inset-0 -z-10 bg-ink-950/65 opacity-0" />
      <div className="sc-spot pointer-events-none absolute left-0 top-0 -z-10 h-0 w-0">
        <div className="sc-glow absolute left-[-190px] top-[-190px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgb(230_194_133/0.3),rgb(200_150_62/0.08)_55%,transparent)] opacity-0" />
      </div>
      <div className="sc-glow pointer-events-none absolute inset-0 rounded-[26px] opacity-0 shadow-[inset_0_0_0_1px_rgba(230,194,133,0.75),0_30px_70px_-25px_rgba(200,150,62,0.45)]" />

      <span className="sc-arrow absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-gold-400/50 bg-ink-950/70 text-gold-200 sm:right-5 sm:top-5">
        <Icon name="arrowUpRight" className="h-4 w-4" />
      </span>
      {featured && (
        <span className="absolute left-6 top-6 rounded-full border border-gold-400/40 bg-ink-950/70 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-gold-200 pointer-fine:left-9 pointer-fine:top-9">
          {service.kicker}
        </span>
      )}

      {/* sub-services: over the dimmed image on desktop hover, in the flow on touch */}
      <ul
        className={`order-last mt-3 space-y-1.5 pointer-fine:absolute pointer-fine:inset-x-6 pointer-fine:mt-0 ${
          featured ? 'pointer-fine:top-24 pointer-fine:left-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 sm:gap-y-2' : 'pointer-fine:top-6 pointer-fine:right-16'
        }`}
        aria-label={`${service.title} includes`}
      >
        {subs.map((s) => (
          <li key={s} className={`sc-sub flex items-start gap-2 text-cream-100 ${featured ? 'text-sm lg:text-[0.95rem]' : 'text-[0.72rem] sm:text-[0.82rem]'}`}>
            <Icon name="check" strokeWidth={2} className="mt-[0.15em] h-3.5 w-3.5 shrink-0 text-gold-300" />
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <div className="relative">
        <span
          className={`sc-icon grid place-items-center rounded-full border border-gold-400/50 bg-ink-950/65 text-gold-200 shadow-[0_0_24px_-6px_rgba(200,150,62,0.5)] ${
            featured ? 'h-14 w-14' : 'h-10 w-10 sm:h-11 sm:w-11'
          }`}
        >
          <Icon name={service.icon} className={featured ? 'h-7 w-7' : 'h-5 w-5'} />
        </span>
        {service.isNew && (
          <span className="absolute left-14 top-2 inline-flex items-center gap-1.5 rounded-full bg-linear-to-b from-gold-100 to-gold-400 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-900 shadow-[0_8px_20px_-6px_rgba(200,150,62,0.7)] sm:left-16 sm:top-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-alb-red" aria-hidden="true" />
            New
          </span>
        )}
        <h3
          className={`mt-3 font-display font-semibold leading-[1.05] text-cream-50 sm:mt-4 ${
            featured ? 'text-[2rem] sm:text-5xl' : wide ? 'text-xl sm:text-[1.7rem]' : 'text-lg sm:text-[1.45rem]'
          }`}
        >
          {service.title}
        </h3>
        <div className="relative mt-2">
          <p className={`sc-desc text-mist-300 max-sm:hidden ${featured ? 'max-w-md text-base' : 'text-[0.85rem] leading-snug'}`}>{service.short}</p>
          <span className="sc-pill absolute left-0 top-0 inline-flex items-center gap-2 rounded-full border border-gold-300/60 bg-gold-400/10 px-3.5 py-1.5 text-xs font-medium text-gold-100 pointer-coarse:hidden motion-reduce:hidden">
            View details
            <Icon name="arrowRight" className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      {/* touch devices: explicit affordance after the list */}
      <span className="order-last mt-4 hidden items-center gap-1.5 text-xs font-medium text-gold-200 pointer-coarse:inline-flex">
        View details <Icon name="arrowRight" className="h-3.5 w-3.5" />
      </span>
    </Link>
  )
}
