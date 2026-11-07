import { useRef } from 'react'
import { gsap, SplitText } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { GoldDivider } from './Ornaments'

/**
 * Eyebrow pill + italic display title (with one green accent phrase) + optional lead.
 * The title lines rise out of masks when the heading scrolls into view.
 * `title` is an array of parts: strings, or { accent: 'text' }.
 */
export default function SectionHeading({ id, eyebrow, title, lead, align = 'center', as: Tag = 'h2', divider = true, className = '', light = false }) {
  const ref = useRef(null)

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(ref)
        const split = SplitText.create(q('.sh-title'), { type: 'lines', mask: 'lines', linesClass: 'sh-line' })
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true } })
        tl.from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'expo.out' }, 0.1)
        // optional parts — only animate what is rendered
        if (eyebrow) tl.from(q('.eyebrow'), { autoAlpha: 0, y: 14, duration: 0.8 }, 0)
        if (divider) tl.from(q('.sh-divider'), { autoAlpha: 0, scaleX: 0.4, duration: 0.9 }, 0.45)
        if (lead) tl.from(q('.sh-lead'), { autoAlpha: 0, y: 16, duration: 0.9 }, 0.5)
      })
    },
    { scope: ref },
  )

  const centered = align === 'center'
  return (
    <div ref={ref} className={`${centered ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? '!text-ink-800 !bg-cream-50/60 !border-gold-500/50' : ''}`}>{eyebrow}</p>}
      <Tag
        id={id}
        className={`sh-title mt-5 font-display text-[clamp(2.5rem,5.4vw,4.75rem)] font-semibold italic leading-[1] ${
          light ? 'text-ink-800' : 'text-cream-50'
        }`}
      >
        {title.map((part, i) =>
          typeof part === 'string' ? (
            <span key={i}>{part}</span>
          ) : (
            <span key={i} className="text-grad-green pr-[0.05em]">
              {part.accent}
            </span>
          ),
        )}
      </Tag>
      {divider && <GoldDivider className={`sh-divider mt-6 ${centered ? '' : 'justify-start'}`} />}
      {lead && (
        <p className={`sh-lead mt-6 max-w-2xl text-[1.02rem] leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-ink-700' : 'text-mist-300'}`}>
          {lead}
        </p>
      )}
    </div>
  )
}
