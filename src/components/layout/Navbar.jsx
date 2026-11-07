import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { lockScroll, scrollToTarget, unlockScroll } from '../../lib/lenis'
import { nav, servicePath, services, serviceBySlug, waLink } from '../../data/content'
import Logo from '../ui/Logo'
import Icon from '../ui/Icon'
import { ServiceArt } from '../services/ServiceCard'

const featured = serviceBySlug['holiday-packages']

/** Desktop mega-menu listing all services. */
function MegaMenu({ open, onClose, panelRef }) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(panelRef)
      gsap.set(panelRef.current, { xPercent: -50 })
      if (open) {
        gsap.to(panelRef.current, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'expo.out' })
        gsap.fromTo(q('.mm-item'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.025, duration: 0.45, ease: 'power3.out', delay: 0.05 })
      } else {
        gsap.to(panelRef.current, { autoAlpha: 0, y: -10, duration: 0.25, ease: 'power2.in' })
      }
    },
    { dependencies: [open] },
  )

  return (
    <div ref={panelRef} id="services-menu" className="invisible absolute left-1/2 top-full z-10 mt-3 w-[min(1000px,94vw)] opacity-0">
      <div className="glass-strong grid grid-cols-[290px_1fr] gap-3 rounded-[28px] !bg-ink-950/95 p-3">
        <Link
          to={`/services/${featured.slug}`}
          onClick={onClose}
          className="mm-item group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[22px] border border-gold-400/30 p-6"
        >
          <div className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105">
            <ServiceArt service={featured} rays />
          </div>
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/60 to-transparent" />
          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-gold-200">Featured</span>
          <span className="mt-2 font-display text-3xl leading-none text-cream-50">{featured.title}</span>
          <span className="mt-2 text-sm text-mist-300">{featured.short}</span>
          <span className="mt-4 inline-flex items-center gap-2 text-sm text-gold-200">
            Explore packages <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <ul className="grid grid-cols-2 gap-1 p-2">
          {services.map((s) => (
            <li key={s.slug} className="mm-item">
              <Link
                to={servicePath(s)}
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.06]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-400/35 text-gold-200 transition group-hover:border-gold-200 group-hover:shadow-[0_0_18px_-4px_rgba(230,194,133,0.7)]">
                  <Icon name={s.icon} className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-cream-50">{s.title}</span>
                  <span className="block truncate text-xs text-mist-500">{s.subs[0]}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Navbar({ show }) {
  const bar = useRef(null)
  const drawer = useRef(null)
  const burger = useRef(null)
  const megaWrap = useRef(null)
  const megaPanel = useRef(null)
  const megaBtn = useRef(null)
  const accordion = useRef(null)
  const closeTimer = useRef(0)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [svcOpen, setSvcOpen] = useState(false)
  const { pathname } = useLocation()

  // shrink on scroll — created after the first paint: measuring 'max' forces a full layout,
  // and nothing can scroll before then anyway
  useEffect(() => {
    let st = null
    const id = requestAnimationFrame(() => {
      st = ScrollTrigger.create({ start: 40, end: 'max', onToggle: (self) => setScrolled(self.isActive) })
    })
    return () => {
      cancelAnimationFrame(id)
      st?.kill()
    }
  }, [])

  // close menus whenever the route changes
  useEffect(() => {
    setMega(false)
    setOpen(false)
  }, [pathname])

  useGSAP(
    () => {
      if (!show || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from(bar.current, { y: -30, autoAlpha: 0, duration: 1.2, delay: 0.3, ease: 'expo.out' })
    },
    { dependencies: [show] },
  )

  // mega-menu: Esc + click outside
  useEffect(() => {
    if (!mega) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMega(false)
        megaBtn.current?.focus()
      }
    }
    const onDown = (e) => {
      if (!megaWrap.current?.contains(e.target)) setMega(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [mega])

  // drawer: lock scroll, focus trap, Esc, staggered links
  useEffect(() => {
    if (!open) {
      unlockScroll()
      return
    }
    lockScroll()
    const panel = drawer.current
    const focusables = () => [...panel.querySelectorAll('a, button')].filter((el) => el.offsetParent !== null && el.tabIndex !== -1)
    focusables()[0]?.focus()
    gsap.fromTo(panel.querySelectorAll('[data-drawer-item]'), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.8, ease: 'expo.out' })
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab') {
        const els = focusables()
        const first = els[0]
        const last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      burger.current?.focus()
    }
  }, [open])

  // mobile services accordion
  useGSAP(
    () => {
      if (!accordion.current) return
      gsap.to(accordion.current, { height: svcOpen ? 'auto' : 0, duration: 0.5, ease: 'power3.inOut' })
    },
    { dependencies: [svcOpen, open] },
  )

  const hoverOpen = () => {
    clearTimeout(closeTimer.current)
    setMega(true)
  }
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setMega(false), 180)
  }

  // Home link on the home page just glides back to the top
  const onHomeClick = (e) => {
    if (pathname !== '/') return
    e.preventDefault()
    setOpen(false)
    scrollToTarget('#home', 0)
  }

  // in-page links (Guest Experiences): glide there if we are already on that page, else route + scroll on arrival
  const onHashClick = (to) => (e) => {
    const [path, id] = to.split('#')
    if (pathname !== (path || '/')) return
    e.preventDefault()
    const wasOpen = open
    setOpen(false)
    setTimeout(() => scrollToTarget(`#${id}`), wasOpen ? 80 : 0)
  }
  const clickFor = (l) => (l.to === '/' ? onHomeClick : l.to.includes('#') ? onHashClick(l.to) : undefined)
  // a shorter label where the desktop bar is narrow (1024–1279px)
  const labelFor = (l) =>
    l.short ? (
      <>
        <span className="xl:hidden">{l.short}</span>
        <span className="hidden xl:inline">{l.label}</span>
      </>
    ) : (
      l.label
    )

  const isActive = (l) => (l.mega ? pathname.startsWith('/services') : l.to === '/' ? pathname === '/' : pathname.startsWith(l.to))
  const linkCls = (l) =>
    `group relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors xl:px-4 ${
      isActive(l) ? 'text-gold-200' : 'text-mist-300 hover:text-cream-50'
    }`
  const underline = (l) => (
    <span
      className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-linear-to-r from-gold-400 to-gold-100 transition-transform duration-500 ${
        isActive(l) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}
    />
  )

  return (
    <>
      <header ref={bar} className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${scrolled ? 'py-2.5' : 'py-4 lg:py-6'} ${show ? '' : 'invisible'}`}>
        <div className="px-3">
          <div
            className={`relative mx-auto flex max-w-[1320px] items-center justify-between gap-6 rounded-full px-4 transition-all duration-500 sm:px-6 ${
              scrolled || mega ? 'glass-strong py-2 lg:max-w-[1240px]' : 'border border-transparent py-1'
            }`}
          >
            <Link to="/" onClick={onHomeClick} aria-label="Al Balagh Tours & Travels — home">
              <Logo compact={scrolled} />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((l) =>
                  l.mega ? (
                    <li key={l.label} ref={megaWrap} onPointerEnter={hoverOpen} onPointerLeave={hoverClose} className="static">
                      <button
                        ref={megaBtn}
                        type="button"
                        aria-expanded={mega}
                        aria-controls="services-menu"
                        onClick={() => setMega((v) => !v)}
                        className={linkCls(l)}
                      >
                        {l.label}
                        <Icon name="chevronDown" className={`h-3.5 w-3.5 transition-transform duration-300 ${mega ? 'rotate-180' : ''}`} />
                        {underline(l)}
                      </button>
                      <MegaMenu open={mega} onClose={() => setMega(false)} panelRef={megaPanel} />
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        onClick={clickFor(l)}
                        aria-current={isActive(l) ? 'page' : undefined}
                        className={linkCls(l)}
                      >
                        {labelFor(l)}
                        {underline(l)}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full border border-gold-400/30 px-3 py-1.5 text-xs text-cream-100 sm:inline-flex lg:hidden xl:inline-flex" aria-label="Language: English">
                <Icon name="globe" className="h-3.5 w-3.5 text-gold-200" />
                EN
              </span>
              <Link to="/contact" className="btn btn-primary hidden whitespace-nowrap py-1.5 pl-5 text-sm md:inline-flex">
                Enquire Now
                <span className="btn-arrow h-8 w-8">
                  <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </span>
              </Link>
              <button
                ref={burger}
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-drawer"
                className="grid h-11 w-11 place-items-center rounded-full border border-gold-400/35 text-cream-50 lg:hidden"
              >
                <Icon name="menu" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-drawer"
          ref={drawer}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          className="fixed inset-0 z-[75] flex flex-col overflow-y-auto bg-ink-950/96 px-6 pb-10 pt-6 backdrop-blur-xl lg:hidden"
        >
          <div className="pattern-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />
          <div className="relative flex items-center justify-between">
            <Logo compact />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-gold-400/35 text-cream-50">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="relative mt-10 flex-1">
            <ul>
              {nav.map((l, i) => (
                <li key={l.label} data-drawer-item className="border-b border-gold-400/15">
                  {l.mega ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={svcOpen}
                        aria-controls="drawer-services"
                        onClick={() => setSvcOpen((v) => !v)}
                        className="flex w-full items-baseline gap-4 py-4 text-left font-display text-4xl text-cream-50"
                      >
                        <span className="font-sans text-xs not-italic tracking-[0.2em] text-gold-300">0{i + 1}</span>
                        {l.label}
                        <Icon name="chevronDown" className={`ml-auto h-5 w-5 self-center text-gold-200 transition-transform ${svcOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div ref={accordion} id="drawer-services" className="h-0 overflow-hidden">
                        <ul className="grid gap-1 pb-4 pl-9">
                          {services.map((s) => (
                            <li key={s.slug}>
                              <Link to={servicePath(s)} tabIndex={svcOpen ? 0 : -1} className="flex min-h-[44px] items-center gap-3 text-[0.95rem] text-mist-100">
                                <Icon name={s.icon} className="h-4 w-4 text-gold-200" />
                                {s.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={l.to}
                      onClick={clickFor(l)}
                      aria-current={isActive(l) ? 'page' : undefined}
                      className={`flex items-baseline gap-4 py-4 font-display text-4xl ${isActive(l) ? 'text-gold-200' : 'text-cream-50'}`}
                    >
                      <span className="font-sans text-xs not-italic tracking-[0.2em] text-gold-300">0{i + 1}</span>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <a data-drawer-item href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary relative mt-8 justify-between">
            Enquire on WhatsApp
            <span className="btn-arrow">
              <Icon name="whatsapp" className="h-4 w-4" />
            </span>
          </a>
        </div>
      )}
    </>
  )
}
