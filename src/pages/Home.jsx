import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../lib/gsap'
import { scrollToTarget } from '../lib/lenis'
import { useAppReady } from '../lib/appState'
import { useSeo } from '../hooks/useDocumentMeta'
import { metaFor } from '../data/seo'
import Hero from '../components/hero/Hero'
import Services from '../components/sections/Services'
import GuestExperiences from '../components/sections/GuestExperiences'
import AfterFirstPaint from '../components/ui/AfterFirstPaint'

export default function Home() {
  const ready = useAppReady()
  const { hash } = useLocation()
  useSeo(metaFor('/'))

  // arriving from another page with /#section: scroll once the doors have opened
  useEffect(() => {
    if (!ready || !hash) return
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      scrollToTarget(hash)
    }, 650)
    return () => clearTimeout(t)
  }, [ready, hash])

  return (
    <>
      <Hero start={ready} />
      <AfterFirstPaint>
        <Services />
      </AfterFirstPaint>
      <AfterFirstPaint frames={8}>
        <GuestExperiences />
      </AfterFirstPaint>
    </>
  )
}
