import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, loopsOnlyWhenVisible, useGSAP } from '../../lib/gsap'
import { getLenis, scrollToTarget } from '../../lib/lenis'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import { useMagnetic } from '../../hooks/useMagnetic'
import { hero, trustBadges, waLink } from '../../data/content'
import Icon from '../ui/Icon'
import HeroHeadline from './HeroHeadline'
import SecretLayer from './SecretLayer'
import WindowScene from './WindowScene'
import LanternAccent from './LanternAccent'
import { FinaleBackdrop, FinaleContent, RouteLine } from './HeroFinale'

// --spot is set per breakpoint on the stage
// Darkness with a soft circular hole for the lantern light. It used to be a CSS mask moved with
// mask-position every frame (a full-screen repaint per frame); now it is a 2×-viewport layer with the
// hole baked into its gradient, moved with a GPU transform — same picture, no repaint.
const HOLE = 'radial-gradient(circle var(--spot) at 50% 50%, transparent 0%, rgb(23 17 13 / 0.5) 55%, rgb(23 17 13) 100%)'
const HOLE_STYLE = { background: HOLE, willChange: 'transform' }

// Layout offset of `el` inside `root`, ignoring transforms.
function offsetWithin(el, root) {
  let x = 0
  let y = 0
  for (let n = el; n && n !== root; n = n.offsetParent) {
    x += n.offsetLeft
    y += n.offsetTop
  }
  return { x, y }
}

function IntroUI({ onExplore, cue = 'Scroll to take off' }) {
  const a = useRef(null)
  const b = useRef(null)
  useMagnetic(a, 0.25)
  useMagnetic(b, 0.25)
  return (
    <>
      <div className="h-intro pointer-events-none absolute inset-x-0 bottom-[15vh] z-[8] flex flex-col items-center gap-6 px-6 text-center lg:bottom-[12vh]">
        <p className="h-intro-item max-w-md text-[0.95rem] leading-relaxed text-mist-300 lg:max-w-lg">{hero.subline}</p>
        <div className="h-intro-item pointer-events-auto flex flex-wrap justify-center gap-3">
          <a ref={a} href="#packages" onClick={onExplore} className="btn btn-primary">
            Explore Packages
            <span className="btn-arrow">
              <Icon name="arrowRight" className="h-4 w-4" />
            </span>
          </a>
          <a ref={b} href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            WhatsApp Us
            <span className="btn-arrow">
              <Icon name="whatsapp" className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
      <div className="h-stats pointer-events-none absolute inset-x-0 bottom-5 z-[8] flex items-center justify-between px-6 text-[0.65rem] tracking-[0.18em] text-mist-500 lg:px-10">
        {/* TODO: confirm with client — badges come from content.trustBadges */}
        <ul className="hidden gap-6 uppercase sm:flex" aria-label="Trust and accreditation">
          {trustBadges.map((t) => (
            <li key={t.bottom} className="h-stat">
              {t.top} {t.bottom}
            </li>
          ))}
        </ul>
        <span className="h-stat mx-auto flex items-center gap-3 uppercase sm:mx-0">
          {cue}
          <span className="relative block h-8 w-px overflow-hidden bg-gold-400/20">
            <span className="absolute inset-x-0 top-0 h-3 animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-gold-200" />
          </span>
        </span>
      </div>
    </>
  )
}

/**
 * "Lantern Light Journey".
 * Stage 1 — a dark cabin; a lantern light (cursor, or auto-roaming on touch) reveals the
 * gold headline and a hidden compass-and-map layer.
 * Stage 2 — a sticky, scroll-scrubbed journey: the headline parts, the aircraft window's shade
 * lifts onto a sunset over the wing, we push through into the clouds and arrive at the search bar.
 */
export default function Hero({ start }) {
  const reduced = useReducedMotion()
  const root = useRef(null)
  const stageRef = useRef(null)
  const intro = useRef(null)
  const started = useRef(false)

  const explore = (e) => {
    e.preventDefault()
    if (scrollToTarget('#packages')) return
    const el = root.current
    const end = el.offsetTop + el.offsetHeight - window.innerHeight
    const lenis = getLenis()
    lenis ? lenis.scrollTo(end, { duration: 2.6 }) : window.scrollTo({ top: end, behavior: 'smooth' })
  }

  const { context: gsapCtx } = useGSAP(
    () => {
      if (reduced) return
      const q = gsap.utils.selector(root)
      const stage = stageRef.current
      const mm = gsap.matchMedia()

      // `motion` always matches here, so the callback also runs on phones (where fine/desktop are both false)
      mm.add({ motion: '(prefers-reduced-motion: no-preference)', fine: '(hover: hover) and (pointer: fine)', desktop: '(min-width: 1024px)' }, (ctx) => {
        const { fine, desktop } = ctx.conditions
        const split = SplitText.create(q('.h-word'), { type: 'chars', charsClass: 'h-char' })
        const chars = split.chars
        const holes = q('.h-hole')
        const glow = q('.h-glow')[0]

        /* ---------- Lantern light ---------- */
        let W = stage.clientWidth
        let H = stage.clientHeight
        const light = { x: W * 0.96, y: H * 0.2 } // born at the lantern
        const anchor = { ...light }
        const pointer = { x: 0, y: 0, t: -1e9 }
        const lx = gsap.quickTo(light, 'x', { duration: 0.45, ease: 'power3.out' })
        const ly = gsap.quickTo(light, 'y', { duration: 0.45, ease: 'power3.out' })
        const gx = gsap.quickSetter(glow, 'x', 'px')
        const gy = gsap.quickSetter(glow, 'y', 'px')
        const pushX = chars.map((c) => gsap.quickTo(c, 'x', { duration: 0.7, ease: 'power3.out' }))
        const pushY = chars.map((c) => gsap.quickTo(c, 'y', { duration: 0.7, ease: 'power3.out' }))
        let centers = []
        let pushOn = false
        const pushRadius = desktop ? 260 : 150
        const pushMax = desktop ? 16 : 7
        let tx = -1
        let ty = -1

        const measure = () => {
          W = stage.clientWidth
          H = stage.clientHeight
          holes.forEach((h) => {
            h.style.width = `${W * 2}px`
            h.style.height = `${H * 2}px`
          })
          centers = chars.map((c) => {
            const o = offsetWithin(c, stage)
            return { x: o.x + c.offsetWidth / 2, y: o.y + c.offsetHeight / 2 }
          })
        }
        measure()
        ScrollTrigger.addEventListener('refresh', measure)

        const tick = () => {
          const live = performance.now() - pointer.t < (fine ? 4000 : 2500)
          const nx = gsap.utils.clamp(0, W, live ? pointer.x : anchor.x)
          const ny = gsap.utils.clamp(0, H, live ? pointer.y : anchor.y)
          if (nx !== tx || ny !== ty) {
            tx = nx
            ty = ny
            lx(nx)
            ly(ny)
          }
          const tr = `translate3d(${light.x - W}px, ${light.y - H}px, 0)`
          for (const h of holes) h.style.transform = tr
          gx(light.x)
          gy(light.y)
          if (!pushOn) return
          for (let i = 0; i < chars.length; i++) {
            const dx = centers[i].x - light.x
            const dy = centers[i].y - light.y
            const d = Math.hypot(dx, dy) || 1
            const f = d < pushRadius ? (1 - d / pushRadius) ** 2 * pushMax : 0
            pushX[i]((dx / d) * f)
            pushY[i]((dy / d) * f)
          }
        }

        let ticking = false
        const setStage1 = (on) => {
          if (on === ticking) return
          ticking = on
          if (on) gsap.ticker.add(tick)
          else {
            gsap.ticker.remove(tick)
            chars.forEach((_, i) => {
              pushX[i](0)
              pushY[i](0)
            })
          }
        }
        setStage1(true)

        const onPointer = (e) => {
          const r = stage.getBoundingClientRect()
          pointer.x = e.clientX - r.left
          pointer.y = e.clientY - r.top
          pointer.t = performance.now()
        }
        const onTouch = (e) => onPointer(e.touches[0])
        stage.addEventListener('pointermove', onPointer)
        stage.addEventListener('pointerdown', onPointer)
        stage.addEventListener('touchmove', onTouch, { passive: true })

        // the light wanders on its own (touch, or when the mouse rests)
        const roamPts = [
          [0.5, 0.36], [0.72, 0.3], [0.8, 0.46], [0.62, 0.52], [0.36, 0.5], [0.2, 0.36], [0.36, 0.26], [0.5, 0.36],
        ].map(([x, y]) => ({ x: x * W, y: y * H }))
        const roam = gsap.to(anchor, {
          motionPath: { path: roamPts, curviness: 1.4 },
          duration: fine ? 24 : 15,
          ease: 'none',
          repeat: -1,
          paused: true,
        })

        /* ---------- Ambient loops ---------- */
        // mobile: a still photo inside the blended headline avoids re-compositing it every frame
        if (desktop) gsap.fromTo(q('.h-fill'), { xPercent: -5, yPercent: -2, scale: 1.08 }, { xPercent: 5, yPercent: 2, scale: 1.16, duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        else gsap.set(q('.h-fill'), { scale: 1.08 })
        gsap.fromTo(q('.h-lantern-rig'), { rotation: -5 }, { rotation: 5, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        gsap.to(q(desktop ? '.h-lantern-halo, .lantern-flame, .h-glow-core' : '.lantern-flame'), { opacity: 'random(0.75, 1)', duration: 0.18, ease: 'sine.inOut', repeat: -1, repeatRefresh: true })
        gsap.fromTo(q('.h-pin-ring'), { scale: 1, opacity: 0.9, transformOrigin: '50% 50%' }, { scale: 2.6, opacity: 0, duration: 1.8, ease: 'power1.out', repeat: -1 })

        /* ---------- Stage 1: intro (plays after the preloader) ---------- */
        gsap.set(chars, { autoAlpha: 0, yPercent: 45 })
        gsap.set(q('.h-glow-core'), { autoAlpha: 0, scale: 0.25 })
        gsap.set(q('.h-intro-item, .h-stat'), { autoAlpha: 0, y: 18 })
        gsap.set(q('.h-lantern'), { autoAlpha: 0, y: -70 })

        const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        tl.to(q('.h-lantern'), { autoAlpha: 1, y: 0, duration: 1.6 }, 0)
          .fromTo(q('.h-dark-fill'), { opacity: 1 }, { opacity: 0.8, duration: 2.4, ease: 'power2.out' }, 0.2)
          .to(q('.h-glow-core'), { autoAlpha: 1, scale: 1, duration: 1.6 }, 0.35)
          .to(chars, { autoAlpha: 1, yPercent: 0, duration: 1.6, stagger: { each: 0.035, from: 'center' } }, 0.3)
          .to(anchor, { x: roamPts[0].x, y: roamPts[0].y, duration: 1.9, ease: 'power3.inOut' }, 0.5)
          .call(() => {
            roam.play()
            pushOn = true
          }, null, 2.4)
          .to(q('.h-intro-item'), { autoAlpha: 1, y: 0, stagger: 0.14, duration: 1.2 }, 2.0)
          .to(q('.h-stat'), { autoAlpha: 1, y: 0, stagger: 0.06, duration: 1 }, 2.4)
        intro.current = tl
        if (started.current) tl.progress(1)

        /* ---------- Stage 2: scroll journey ---------- */
        const head = q('.h-title')[0]
        const door = q('.h-door')[0]
        const wordDir = (i, el) => {
          const off = el.offsetLeft + el.offsetWidth / 2 - head.offsetWidth / 2
          if (Math.abs(off) < head.offsetWidth * 0.08) return i % 2 ? 1 : -1
          return off < 0 ? -1 : 1
        }
        // push far enough that the window's rounded opening (not the cabin wall) fills the screen
        const doorScale = () => Math.max(W / (0.6 * door.offsetWidth), H / (0.42 * door.offsetHeight)) * 1.15

        gsap.set(q('.h-final-item, .h-route'), { autoAlpha: 0 })
        gsap.set(q('.h-route-line'), { drawSVG: '0%' })
        gsap.set(q('.h-pin-glow'), { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' })

        const s = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: desktop ? 1.1 : 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => setStage1(self.progress < (desktop ? 0.1 : 0.02)),
          },
        })
        const lightPin = (i, t) =>
          s
            .to(q(`.h-pin-${i} .h-pin-glow`), { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, t)
            .to(q(`.h-pin-${i} .h-pin-core`), { opacity: 1, duration: 0.3 }, t)
            .to(q(`.h-pin-label-${i}`), { color: '#eed39a', duration: 0.4 }, t)

        s.to(q('.h-dark'), { autoAlpha: 0, duration: 1.1, ease: 'power1.in' }, 0)
          .to(q('.h-secret'), { autoAlpha: 0, duration: 0.9 }, 0)
          .to(q('.h-glow'), { autoAlpha: 0, duration: 0.8 }, 0)
          .to(q('.h-intro'), { autoAlpha: 0, y: -40, duration: 0.7 }, 0)
          .to(q('.h-stats'), { autoAlpha: 0, duration: 0.4 }, 0)
          .to(q('.h-door-glow'), { autoAlpha: 1, duration: 1 }, 0.3)
          .to(q('.h-route'), { autoAlpha: 1, duration: 0.8 }, 0.3)
          .to(q('.h-route-line'), { drawSVG: '100%', duration: 6.6 }, 0.4)
          .to(q('.h-word'), { x: (i, el) => wordDir(i, el) * W * 0.62, duration: 3, ease: 'power2.in' }, 0.5)
          .to(q('.h-word'), { autoAlpha: 0, duration: 1 }, 2.6)
          .to(q('.h-shade'), { yPercent: -101, duration: 2.6, ease: 'power2.inOut' }, 1.0)
          .fromTo(q('.h-plane'), { xPercent: 0, autoAlpha: 0 }, { xPercent: 560, autoAlpha: 1, duration: 3.4, ease: 'power1.inOut' }, 1.6)
          .fromTo(q('.h-door-view'), { scale: 1.3 }, { scale: 1, duration: 5 }, 1.0)
          .to(q('.h-door-blur'), { autoAlpha: 0, duration: 2.4 }, 2.8)
          .to(q('.h-lantern-out'), { autoAlpha: 0, y: -60, duration: 1 }, 2.2)
          .to(door, { scale: doorScale, duration: 3.6, ease: 'power2.in' }, 2.6)
          .fromTo(q('.h-clouds'), { autoAlpha: 0, yPercent: 40, scale: 1 }, { autoAlpha: 1, yPercent: -5, scale: 1.45, duration: 2.2, ease: 'power1.in' }, 3.9)
          .to(q('.h-clouds'), { autoAlpha: 0, yPercent: -45, scale: 2, duration: 1.6 }, 6.0)
          .fromTo(q('.h-finale'), { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1.04, duration: 2.2, ease: 'power1.out' }, 5.7)
          .fromTo(q('.h-bloom'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 6.1)
          .to(q('.h-bloom'), { autoAlpha: 0.35, duration: 1.2 }, 6.9)
          .fromTo(q('.h-final-item'), { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, stagger: 0.25, duration: 1.2, ease: 'power2.out' }, 7.0)
        lightPin(0, 0.45)
        lightPin(1, 3.9)
        lightPin(2, 6.9)
        s.set(q('.h-head'), { autoAlpha: 0 }, 3.7) // headline has left the screen
          .set(q('.h-door-root'), { autoAlpha: 0 }, 8.2) // the finale fully covers the door by now
        s.to({}, { duration: 1.5 }, 8.6) // hold the final frame before releasing

        return () => {
          setStage1(false)
          ScrollTrigger.removeEventListener('refresh', measure)
          stage.removeEventListener('pointermove', onPointer)
          stage.removeEventListener('pointerdown', onPointer)
          stage.removeEventListener('touchmove', onTouch)
          intro.current = null
        }
      })
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )
  // ambient loops rest while this block is off-screen
  useEffect(() => loopsOnlyWhenVisible(gsapCtx, root.current), [gsapCtx])

  useEffect(() => {
    if (!start) return
    started.current = true
    intro.current?.play()
  }, [start])

  /* ---------- Reduced motion: a calm, static hero ---------- */
  if (reduced) {
    return (
      <section id="home" ref={root} aria-label="Welcome" className="relative">
        <div className="relative isolate h-svh min-h-[560px] overflow-hidden bg-ink-950">
          <div className="absolute inset-0 opacity-25">
            <SecretLayer />
          </div>
          <HeroHeadline />
          <IntroUI onExplore={explore} cue="Scroll to plan your journey" />
          <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(85%_75%_at_50%_45%,transparent_45%,rgb(0_0_0/0.65))]" />
        </div>
        <div className="relative isolate flex min-h-svh flex-col justify-center gap-10 overflow-hidden py-24">
          <FinaleBackdrop className="opacity-100" />
          <FinaleContent className="relative" />
          <RouteLine className="relative" lit />
        </div>
      </section>
    )
  }

  return (
    <section id="home" ref={root} aria-label="Welcome" className="relative h-[200vh] lg:h-[300vh]">
      <div ref={stageRef} className="sticky top-0 isolate h-svh overflow-hidden bg-ink-950 [--spot:190px] lg:[--spot:320px]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgb(51_36_26/0.55),transparent_70%)]" />
        <WindowScene />
        <SecretLayer />
        {/* deep darkness: hides the hidden layer almost completely */}
        <div className="h-dark h-dark-deep pointer-events-none absolute inset-0 z-[3] overflow-hidden">
          <div className="h-hole absolute left-0 top-0 h-[200%] w-[200%] opacity-[0.97]" style={HOLE_STYLE} />
        </div>
        <HeroHeadline />

        {/* darkness with a lantern-shaped hole */}
        <div className="h-dark pointer-events-none absolute inset-0 z-[4] overflow-hidden">
          <div className="h-hole h-dark-fill absolute left-0 top-0 h-[200%] w-[200%]" style={HOLE_STYLE} />
        </div>
        <div className="h-glow pointer-events-none absolute left-0 top-0 z-[5] lg:mix-blend-screen">
          <div
            className="h-glow-core absolute left-[-210px] top-[-210px] h-[420px] w-[420px] rounded-full lg:left-[-340px] lg:top-[-340px] lg:h-[680px] lg:w-[680px]"
            style={{ background: 'radial-gradient(closest-side, rgb(255 214 140 / 0.3), rgb(255 180 90 / 0.1) 45%, transparent 75%)' }}
          />
        </div>

        {/* flying through cloud */}
        <div className="h-clouds pointer-events-none invisible absolute inset-0 z-[6]">
          {[
            ['-20%', '55%', '95vw', 0.55],
            ['40%', '62%', '100vw', 0.5],
            ['10%', '22%', '85vw', 0.42],
            ['55%', '8%', '75vw', 0.38],
            ['-25%', '-5%', '70vw', 0.32],
            ['20%', '80%', '120vw', 0.6],
            ['-10%', '30%', '130vw', 0.75],
            ['5%', '45%', '110vw', 0.85],
            ['70%', '35%', '70vw', 0.45],
          ].map(([l, t, w, o], i) => (
            <div
              key={l + t}
              className={`absolute aspect-[2.4/1] rounded-full ${[1, 2, 3, 4, 8].includes(i) ? 'max-lg:hidden' : ''}`}
              style={{ left: l, top: t, width: w, background: `radial-gradient(closest-side, rgb(240 232 216 / ${o}), rgb(240 232 216 / ${o * 0.35}) 55%, transparent)` }}
            />
          ))}
        </div>

        <FinaleBackdrop className="invisible" />
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(85%_75%_at_50%_45%,transparent_45%,rgb(0_0_0/0.65))]" />

        <IntroUI onExplore={explore} />
        <FinaleContent className="absolute inset-x-0 bottom-[17vh] top-20 lg:bottom-[14vh]" />
        <RouteLine className="absolute inset-x-0 bottom-5" />
        <LanternAccent />
      </div>
    </section>
  )
}
