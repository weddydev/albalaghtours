import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { serviceBySlug, services, waLink } from '../../data/content'
import { upcomingMonths } from '../../lib/dates'
import Icon from '../ui/Icon'

export function Field({ id, label, error, children, className = '' }) {
  return (
    <div className={`ef-field group relative ${className}`}>
      <label htmlFor={id} className="text-[0.68rem] uppercase tracking-[0.22em] text-mist-500 transition-colors group-focus-within:text-gold-200">
        {label}
      </label>
      {children}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-linear-to-r from-gold-300 to-jade-400 transition-transform duration-500 group-focus-within:scale-x-100" />
      {error && (
        <p id={`${id}-err`} className="absolute -bottom-5 left-0 text-xs text-[#f0a3a3]">
          {error}
        </p>
      )}
    </div>
  )
}

export const INPUT =
  'mt-1 w-full border-b border-gold-400/25 bg-transparent pb-2.5 pt-1 text-[1.02rem] text-cream-50 outline-none placeholder:text-mist-500/60 focus-visible:outline-none'

/**
 * Static enquiry form — no backend. On submit it opens WhatsApp with every field pre-filled,
 * while a paper plane flies off the button.
 */
export default function EnquiryForm() {
  const root = useRef(null)
  const plane = useRef(null)
  const [params] = useSearchParams()
  const preset = serviceBySlug[params.get('service')]?.title || ''
  const months = useMemo(() => upcomingMonths(12), [])
  const [v, setV] = useState({ name: '', phone: '', service: preset, travellers: 1, month: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sentHref, setSentHref] = useState('')

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 80%', once: true }, defaults: { ease: 'expo.out' } })
          .from(root.current, { y: 60, autoAlpha: 0, duration: 1.2 })
          .from(q('.ef-head > *'), { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.9 }, 0.2)
          .from(q('.ef-field'), { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.9 }, 0.35)
      })
    },
    { scope: root },
  )

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (v.name.trim().length < 2) e.name = 'Please enter your name.'
    if (v.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a valid phone number.'
    return e
  }

  const fly = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      plane.current,
      { autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1 },
      {
        duration: 1.6,
        ease: 'power2.in',
        motionPath: { path: [{ x: 0, y: 0 }, { x: 80, y: -60 }, { x: 40, y: -160 }, { x: 260, y: -320 }], curviness: 1.4, autoRotate: true },
        scale: 0.4,
        onComplete: () => gsap.set(plane.current, { autoAlpha: 0 }),
      },
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) {
      root.current.querySelector(`#ef-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    const lines = [
      'Hello, I would like to enquire.',
      `Name: ${v.name.trim()}`,
      `Phone: ${v.phone.trim()}`,
      v.service && `Service: ${v.service}`,
      `Travellers: ${v.travellers}`,
      v.month && `Preferred month: ${v.month}`,
      v.message.trim() && `Message: ${v.message.trim()}`,
    ].filter(Boolean)
    const href = waLink(lines.join('\n'))
    window.open(href, '_blank', 'noopener') // must stay inside the click for popup blockers
    setSentHref(href)
    fly()
  }

  const describedBy = (k) => (errors[k] ? `ef-${k}-err` : undefined)

  return (
    <form ref={root} onSubmit={onSubmit} noValidate className="glass-strong relative h-full rounded-[32px] p-6 sm:p-10" aria-labelledby="ef-title">
      <div className="ef-head">
        <p className="eyebrow">Enquiry</p>
        <h2 id="ef-title" className="mt-5 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none text-cream-50">
          Tell us about your <span className="text-grad-green pr-[0.05em]">trip</span>
        </h2>
        <p className="mt-3 text-sm text-mist-300">Fill in a few details and we will continue the conversation on WhatsApp.</p>
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <Field id="ef-name" label="Your name *" error={errors.name}>
          <input id="ef-name" autoComplete="name" value={v.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={describedBy('name')} className={INPUT} placeholder="Full name" />
        </Field>
        <Field id="ef-phone" label="Phone / WhatsApp *" error={errors.phone}>
          <input
            id="ef-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={v.phone}
            onChange={set('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy('phone')}
            className={INPUT}
            placeholder="+91"
          />
        </Field>
        <Field id="ef-service" label="Service">
          <select id="ef-service" value={v.service} onChange={set('service')} className={`${INPUT} field-select cursor-pointer`}>
            <option value="">Choose a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-6">
          <Field id="ef-travellers" label="Travellers">
            <input id="ef-travellers" type="number" min="1" max="60" value={v.travellers} onChange={set('travellers')} className={INPUT} />
          </Field>
          <Field id="ef-month" label="Month">
            <select id="ef-month" value={v.month} onChange={set('month')} className={`${INPUT} field-select cursor-pointer`}>
              <option value="">Any</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field id="ef-message" label="Message" className="sm:col-span-2">
          <textarea id="ef-message" rows={3} value={v.message} onChange={set('message')} className={`${INPUT} resize-none`} placeholder="Dates, budget, questions…" />
        </Field>
      </div>

      <div className="relative mt-10 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary">
          Send on WhatsApp
          <span className="btn-arrow">
            <Icon name="whatsapp" className="h-4 w-4" />
          </span>
        </button>
        <span ref={plane} className="pointer-events-none invisible absolute left-40 top-2 text-gold-200 opacity-0" aria-hidden="true">
          <Icon name="plane" className="h-7 w-7" />
        </span>
        <p className="text-xs text-mist-500">Nothing is stored on this website.</p>
      </div>
      <p role="status" className="mt-4 min-h-[1.25rem] text-sm text-jade-300">
        {sentHref && (
          <>
            WhatsApp should have opened in a new tab.{' '}
            <a href={sentHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Open it again
            </a>
          </>
        )}
      </p>
    </form>
  )
}
