import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'

// Register every plugin exactly once for the whole app.
gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, DrawSVGPlugin, Flip, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })
// mobile URL-bar show/hide must not trigger a full ScrollTrigger refresh mid-scroll
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, SplitText, MotionPathPlugin, DrawSVGPlugin, Flip, useGSAP }
