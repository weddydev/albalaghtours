import { startTransition, useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '../../lib/gsap'
import { useAppReady } from '../../lib/appState'

/**
 * On the very first load, renders its children a few frames after the first paint (as a
 * low-priority transition), so the first frame only has to lay out what is on screen.
 * `frames` staggers several blocks so their layouts land in different frames.
 * The preloader covers the page and scroll is locked meanwhile, so nothing visible changes.
 * After the first load (client-side navigation) children render immediately, as before.
 */
export default function AfterFirstPaint({ children, frames = 2 }) {
  const ready = useAppReady()
  const [show, setShow] = useState(ready)
  const deferred = useRef(!ready)

  useEffect(() => {
    if (show) return
    let left = frames
    let id = 0
    const tick = () => {
      if (--left > 0) id = requestAnimationFrame(tick)
      else startTransition(() => setShow(true))
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  // the page just grew: re-measure every trigger once the new content is laid out
  useEffect(() => {
    if (!show || !deferred.current) return
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [show])

  return show ? children : null
}
