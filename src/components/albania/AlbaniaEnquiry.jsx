import { useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { useNearGSAP } from '../../hooks/useNearGSAP'
import { albania, waLink } from '../../data/content'
import { Field, INPUT } from '../contact/EnquiryForm'
import SectionHeading from '../ui/SectionHeading'
import Icon from '../ui/Icon'

/** Static Albania enquiry: no backend — submit opens WhatsApp with every field pre-filled. */
export default function AlbaniaEnquiry() {
  const root = useRef(null)
  const [v, setV] = useState({ name: '', phone: '', job: '', role: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sentHref, setSentHref] = useState('')
  const { form, notice } = albania

  useNearGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 80%', once: true }, defaults: { ease: 'expo.out' } })
          .from(q('.ae-card'), { y: 60, autoAlpha: 0, duration: 1.2 })
          .from(q('.ef-field'), { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.9 }, 0.3)
      })
    },
    { scope: root },
  )

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  const describedBy = (k) => (errors[k] ? `ae-${k}-err` : undefined)

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (v.name.trim().length < 2) errs.name = 'Please enter your name.'
    if (v.phone.replace(/\D/g, '').length < 10) errs.phone = 'Please enter a valid phone number.'
    setErrors(errs)
    if (Object.keys(errs).length) {
      root.current.querySelector(`#ae-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    const lines = [
      form.intro,
      `Name: ${v.name.trim()}`,
      `Phone: ${v.phone.trim()}`,
      v.job.trim() && `Current job: ${v.job.trim()}`,
      v.role.trim() && `Preferred role: ${v.role.trim()}`,
      v.message.trim() && `Message: ${v.message.trim()}`,
    ].filter(Boolean)
    const href = waLink(lines.join('\n'))
    window.open(href, '_blank', 'noopener') // inside the click for popup blockers
    setSentHref(href)
  }

  return (
    <section ref={root} id="albania-enquiry" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[980px] px-5 sm:px-8">
        <form onSubmit={onSubmit} noValidate aria-labelledby="ae-title" className="ae-card glass-strong relative rounded-[32px] p-6 sm:p-10">
          <SectionHeading id="ae-title" align="left" eyebrow="Enquiry" title={form.title} divider={false} />
          <p className="mt-4 max-w-xl text-sm text-mist-300">{form.lead}</p>

          <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            <Field id="ae-name" label="Your name *" error={errors.name}>
              <input id="ae-name" autoComplete="name" value={v.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={describedBy('name')} className={INPUT} placeholder="Full name" />
            </Field>
            <Field id="ae-phone" label="Phone / WhatsApp *" error={errors.phone}>
              <input
                id="ae-phone"
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
            <Field id="ae-job" label="Current job">
              <input id="ae-job" autoComplete="organization-title" value={v.job} onChange={set('job')} className={INPUT} placeholder="e.g. driver, cook, technician" />
            </Field>
            <Field id="ae-role" label="Preferred role">
              <input id="ae-role" value={v.role} onChange={set('role')} className={INPUT} placeholder="The kind of work you are looking for" />
            </Field>
            <Field id="ae-message" label="Message" className="sm:col-span-2">
              <textarea id="ae-message" rows={3} value={v.message} onChange={set('message')} className={`${INPUT} resize-none`} placeholder="Your questions…" />
            </Field>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn btn-primary">
              Send on WhatsApp
              <span className="btn-arrow">
                <Icon name="whatsapp" className="h-4 w-4" />
              </span>
            </button>
            {sentHref && (
              <a href={sentHref} target="_blank" rel="noopener noreferrer" className="text-sm text-jade-300 underline-offset-4 hover:underline" role="status">
                WhatsApp didn’t open? Tap here.
              </a>
            )}
          </div>
          {/* TODO: confirm exact wording with client */}
          <p className="mt-6 flex items-start gap-2 border-t border-gold-400/15 pt-5 text-xs leading-relaxed text-mist-500">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-alb-red" aria-hidden="true" />
            {notice}
          </p>
        </form>
      </div>
    </section>
  )
}
