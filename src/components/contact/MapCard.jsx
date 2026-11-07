import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { contact, mapsLink } from '../../data/content'
import Icon from '../ui/Icon'

const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Mawin Zam Zam Plaza, Opposite Old Prince Hotel, Mehdipatnam, Hyderabad, Telangana 500028')}`

/** Illustrated (not to scale) map: streets draw in, the pin drops onto Mehdipatnam and ripples. */
export default function MapCard() {
  const root = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 80%', once: true }, defaults: { ease: 'expo.out' } })
          .from(root.current, { y: 60, autoAlpha: 0, duration: 1.2 })
          .from(q('.mc-street'), { drawSVG: '0%', stagger: 0.05, duration: 1.2, ease: 'power2.inOut' }, 0.2)
          .from(q('.mc-block'), { autoAlpha: 0, stagger: 0.03, duration: 0.6 }, 0.6)
          .from(q('.mc-pin'), { y: -60, autoAlpha: 0, duration: 1, ease: 'bounce.out' }, 1)
          .from(q('.mc-label'), { autoAlpha: 0, y: 8, stagger: 0.1, duration: 0.6 }, 1.4)
        gsap.fromTo(q('.mc-ripple'), { scale: 0.4, opacity: 0.9, transformOrigin: '50% 50%' }, { scale: 2.6, opacity: 0, duration: 2, repeat: -1, ease: 'power1.out', stagger: 0.7 })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="glass-strong flex h-full flex-col overflow-hidden rounded-[32px] p-3">
      <div className="relative overflow-hidden rounded-[24px] bg-ink-950/70">
        <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label="Illustrative map of our office location in Mehdipatnam">
          <g fill="#0d3b28" opacity="0.6">
            {[
              [30, 30, 80, 50], [130, 20, 70, 60], [240, 26, 120, 44], [24, 112, 90, 56], [250, 100, 60, 70], [320, 96, 60, 60],
              [40, 210, 100, 60], [170, 200, 60, 70], [270, 210, 110, 60],
            ].map(([x, y, w, h], i) => (
              <rect key={i} className="mc-block" x={x} y={y} width={w} height={h} rx="6" />
            ))}
          </g>
          <g fill="none" stroke="#d4af37" strokeLinecap="round">
            <path className="mc-street" d="M-10 180C90 170 200 150 410 120" strokeWidth="7" strokeOpacity="0.35" />
            <path className="mc-street" d="M-10 180C90 170 200 150 410 120" strokeWidth="1.2" strokeOpacity="0.9" strokeDasharray="6 6" />
            <path className="mc-street" d="M150 -10C160 80 170 200 180 310" strokeWidth="4" strokeOpacity="0.3" />
            <path className="mc-street" d="M330 -10C320 100 300 200 290 310" strokeWidth="3" strokeOpacity="0.22" />
            <path className="mc-street" d="M-10 90H410" strokeWidth="2" strokeOpacity="0.18" />
            <path className="mc-street" d="M-10 255H410" strokeWidth="2" strokeOpacity="0.18" />
          </g>
          {/* landmark opposite */}
          <g className="mc-label">
            <rect x="196" y="186" width="10" height="10" rx="2" fill="#e8cf7a" opacity="0.7" />
            <text x="212" y="195" fontSize="10" fill="#b9c6bc" fontFamily="Inter, sans-serif">
              Old Prince Hotel
            </text>
          </g>
          <text className="mc-label" x="22" y="164" fontSize="11" fill="#e8cf7a" fontFamily="Inter, sans-serif" letterSpacing="2">
            MEHDIPATNAM
          </text>
          <g transform="translate(200 146)">
            <circle className="mc-ripple" r="14" fill="none" stroke="#5fd28f" strokeWidth="1.5" />
            <circle className="mc-ripple" r="14" fill="none" stroke="#5fd28f" strokeWidth="1" />
            <g className="mc-pin">
              <path d="M0 0c-8-10-14-17-14-25a14 14 0 0128 0c0 8-6 15-14 25z" transform="translate(0 -2)" fill="#3fbf74" stroke="#d7f8e2" strokeWidth="1.5" />
              <circle cy="-27" r="5" fill="#05190f" />
              <rect x="-38" y="-70" width="76" height="22" rx="11" fill="#05190f" stroke="#d4af37" strokeOpacity="0.6" />
              <text y="-55" textAnchor="middle" fontSize="12" fill="#f3e9cf" fontFamily="Cormorant Garamond, serif" fontStyle="italic">
                Al Balagh
              </text>
            </g>
          </g>
        </svg>
        <span className="absolute bottom-3 left-3 rounded-full bg-ink-950/70 px-3 py-1 text-[0.65rem] text-mist-500">Illustrative map — not to scale</span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Our Hyderabad office</p>
        <p className="mt-1 font-display text-2xl italic text-cream-50">Mawin Zam Zam Plaza</p>
        <address className="mt-2 text-sm not-italic leading-relaxed text-mist-300">{contact.address.full}</address>
        <dl className="mt-5 divide-y divide-gold-400/15 border-y border-gold-400/15 text-sm">
          {[
            ['Landmark', 'Opposite Old Prince Hotel', 'mapPin'],
            ['Area', 'Mehdipatnam, Hyderabad', 'globe'],
            ['Ask for', contact.person, 'users'],
            ['Also at', `${contact.branch.city} (${contact.branch.area})`, 'globe'],
          ].map(([k, val, icon]) => (
            <div key={k} className="flex items-center justify-between gap-4 py-3">
              <dt className="flex items-center gap-2 text-mist-500">
                <Icon name={icon} className="h-4 w-4 text-gold-300" />
                {k}
              </dt>
              <dd className="text-right text-cream-100">{val}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost py-1.5 pl-5 text-sm">
            Open map
            <span className="btn-arrow h-9 w-9">
              <Icon name="mapPin" className="h-4 w-4" />
            </span>
          </a>
          <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn btn-primary py-1.5 pl-5 text-sm">
            Directions
            <span className="btn-arrow h-9 w-9">
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
