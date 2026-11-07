import { useEffect, useRef } from 'react'
import { gsap, loopsOnlyWhenVisible, useGSAP } from '../../lib/gsap'
import { useAppReady } from '../../lib/appState'
import { packages } from '../../data/content'
import { ArchFrame } from '../ui/Ornaments'
import Photo from '../ui/Photo'
import Icon from '../ui/Icon'

const FALLBACKS = [
  'radial-gradient(90% 70% at 50% 25%, #4a3626 0%, #251a12 50%, #120c09 100%)',
  'radial-gradient(90% 70% at 50% 25%, #6b4a2a 0%, #33241a 50%, #1a130e 100%)',
]
// the two cards: holidays + pilgrimage
const CARDS = [
  { id: 'holiday', badge: 'Tailor-made', name: 'Holidays worldwide', image: '/images/services/holiday.webp', icon: 'palm', rays: true },
  { id: 'pilgrimage', badge: 'Hajj 2027 · Umrah', name: 'Pilgrimage programmes', image: packages.umrah.image, icon: 'globe' },
]
// final fan position for each card: [xPercent, rotation, y]
const FAN = [
  [-48, -8, 0],
  [48, 8, 14],
]
const fanFor = (i) => {
  // the art column is narrowest between 1024 and 1279px (two-column hero), and on phones
  const mq = (q) => window.matchMedia(q).matches
  const k = mq('(min-width: 1280px)') ? 1 : mq('(min-width: 1024px)') ? 0.6 : mq('(min-width: 640px)') ? 1 : 0.72
  return [FAN[i][0] * k, FAN[i][1], FAN[i][2]]
}

/** Packages hero art: holidays + pilgrimage cards fan out of a single stack, then float and lean toward the cursor. */
export default function TierFan() {
  const root = useRef(null)
  const tl = useRef(null)
  const ready = useAppReady()
  const readyRef = useRef(ready)

  const { context: gsapCtx } = useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const cards = q('.tf-card')
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        cards.forEach((c, i) => {
          const [x, r, y] = fanFor(i)
          gsap.set(c, { xPercent: x, rotation: r, y, transformOrigin: '50% 100%' })
        })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(cards, { autoAlpha: 0, y: 60, transformOrigin: '50% 100%' })
        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out' } })
          .to(cards, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0)
          .to(q('.tf-glow'), { autoAlpha: 1, scale: 1, duration: 1.6 }, 0.2)
        cards.forEach((c, i) => {
          const [x, r, y] = fanFor(i)
          tl.current.to(c, { xPercent: x, rotation: r, y, duration: 1.5 }, 0.55)
        })
        tl.current.from(q('.tf-chip'), { autoAlpha: 0, y: 12, stagger: 0.1, duration: 0.8 }, 1.2)
        gsap.to(q('.tf-float'), { y: -10, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.6 })
        if (readyRef.current) tl.current.play()
      })

      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const stage = q('.tf-stage')[0]
        gsap.set(stage, { transformPerspective: 1200 })
        const ry = gsap.quickTo(stage, 'rotationY', { duration: 1, ease: 'power3.out' })
        const rx = gsap.quickTo(stage, 'rotationX', { duration: 1, ease: 'power3.out' })
        const move = (e) => {
          const r = root.current.getBoundingClientRect()
          ry(((e.clientX - r.left) / r.width - 0.5) * 10)
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8)
        }
        const leave = () => {
          ry(0)
          rx(0)
        }
        const el = root.current
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        }
      })
    },
    { scope: root },
  )
  // ambient loops rest while this block is off-screen
  useEffect(() => loopsOnlyWhenVisible(gsapCtx, root.current), [gsapCtx])

  useEffect(() => {
    readyRef.current = ready
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <div ref={root} className="relative mx-auto h-[360px] w-full max-w-[620px] sm:h-[470px]" aria-hidden="true">
      <div className="tf-glow invisible absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-[radial-gradient(closest-side,rgb(246_214_130/0.22),transparent)] opacity-0" />
      <div className="tf-stage absolute inset-0">
        {CARDS.map((t, i) => (
          <div
            key={t.id}
            className="tf-card absolute bottom-6 left-[calc(50%-80px)] h-[250px] w-[160px] sm:left-[calc(50%-112px)] sm:h-[350px] sm:w-[224px]"
            style={{ zIndex: i === 0 ? 3 : 2 }}
          >
            <div className="tf-float h-full w-full">
              <ArchFrame className="h-full w-full" innerClassName="bg-ink-900" borderClassName="drop-shadow-[0_0_10px_rgba(200,150,62,0.45)]">
                <Photo src={t.image} fallback={FALLBACKS[i]} priority sizes="(max-width: 639px) 160px, 224px" rays={t.rays ?? false}>
                  <Icon name={t.icon} strokeWidth={0.6} className="absolute left-1/2 top-[34%] h-1/3 w-2/3 -translate-x-1/2 text-gold-200 opacity-25" />
                </Photo>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-950 to-transparent" />
                <div className="tf-chip absolute inset-x-0 bottom-5 flex flex-col items-center gap-1 text-center">
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold-200 sm:text-[0.62rem]">{t.badge}</span>
                  <span className="px-3 font-display text-lg leading-tight text-cream-50 sm:text-2xl">{t.name}</span>
                </div>
              </ArchFrame>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
