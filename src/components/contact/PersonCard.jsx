import { useEffect, useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { useAppReady } from '../../lib/appState'
import { contact, waLink } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'

const FALLBACK = 'radial-gradient(90% 70% at 50% 30%, #1f6b45 0%, #0d3b28 50%, #04150d 100%)'
const CHIPS = [
  { label: 'Haj & Umrah', icon: 'kaaba', pos: 'left-[-4%] top-[18%]' },
  { label: 'Visas', icon: 'stamp', pos: 'right-[-6%] top-[34%]' },
  { label: 'Flights', icon: 'plane', pos: 'left-[-8%] top-[58%]' },
]

/** Contact hero art: Mohammed Shafi in a gold arch, a signature underline that inks itself, floating service chips. */
export default function PersonCard() {
  const root = useRef(null)
  const tl = useRef(null)
  const ready = useAppReady()
  const readyRef = useRef(ready)
  const initials = contact.person
    .split(' ')
    .map((p) => p[0])
    .join('')

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out' } })
          .from(q('.pc-reveal'), { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0)
          .from(q('.pc-zoom'), { scale: 1.3, duration: 2.4 }, 0)
          .from(q('.arch-borders'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.6, ease: 'power2.inOut' }, 0.1)
          .from(q('.pc-name'), { y: 24, autoAlpha: 0, duration: 1 }, 0.9)
          .from(q('.pc-sign'), { drawSVG: '0%', duration: 1.2, ease: 'power2.inOut' }, 1.2)
          .from(q('.pc-chip'), { scale: 0.6, autoAlpha: 0, stagger: 0.12, duration: 0.8, ease: 'back.out(2)' }, 1.3)
        gsap.to(q('.pc-chip'), { y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.5 })
        if (readyRef.current) tl.current.play()
      })
    },
    { scope: root },
  )

  useEffect(() => {
    readyRef.current = ready
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[380px]">
      <div className="absolute inset-[-14%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(246_214_130/0.2),transparent)]" />
      <div className="relative aspect-[4/5] w-full">
        <ArchFrame className="h-full w-full" innerClassName="bg-ink-900" borderClassName="drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]">
          <div className="pc-reveal absolute inset-0">
            <div className="pc-zoom absolute inset-0">
              <Photo src={contact.photo} alt={`${contact.person}, ${contact.role} at Al Balagh Tours & Travels`} fallback={FALLBACK} width={800} height={1000}>
                <div className="pattern-overlay absolute inset-0 opacity-[0.08]" />
                <span className="absolute inset-0 grid place-items-center font-display text-[7rem] font-semibold italic text-gold-200/40">{initials}</span>
              </Photo>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-950/95 to-transparent" />
          </div>
        </ArchFrame>
        {CHIPS.map((c) => (
          <span key={c.label} className={`pc-chip glass absolute ${c.pos} inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-cream-100`} aria-hidden="true">
            <Icon name={c.icon} className="h-4 w-4 text-gold-200" />
            {c.label}
          </span>
        ))}
      </div>
      <div className="pc-name relative mt-6 text-center">
        <p className="font-display text-4xl font-semibold italic text-cream-50">{contact.person}</p>
        <svg viewBox="0 0 260 16" className="mx-auto -mt-1 h-4 w-56" aria-hidden="true">
          <path className="pc-sign" d="M4 10C50 3 120 2 180 6c26 2 50 5 76 9" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold-300">{contact.role}</p>
        <div className="mt-4 flex justify-center gap-2">
          <a href={contact.phones[0].href} aria-label={`Call ${contact.person}`} className="grid h-11 w-11 place-items-center rounded-full border border-gold-400/50 text-gold-200 transition hover:border-gold-200 hover:bg-gold-400/10">
            <Icon name="phone" className="h-4 w-4" />
          </a>
          <a
            href={waLink(`Assalamu Alaikum ${contact.person}, I would like some help with my travel plans.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${contact.person}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-jade-400/60 text-jade-300 transition hover:border-jade-400 hover:bg-jade-500/10"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
