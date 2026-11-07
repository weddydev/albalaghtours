import { useEffect, useRef, useState } from 'react'
import Placeholder from './Placeholder'
import { ScrollTrigger } from '../../lib/gsap'

/**
 * Renders /images/<file>. Until the real photo exists (or while it loads),
 * an illustrated placeholder sits underneath, so the layout never breaks.
 */
export default function SmartImage({
  file,
  alt,
  width,
  height,
  priority = false,
  tone,
  className = '',
  imgClassName = '',
}) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = ref.current
    if (img?.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {!loaded && <Placeholder tone={tone} label={file} />}
      <img
        ref={ref}
        src={`/images/${file}`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => {
          setLoaded(true)
          ScrollTrigger.refresh()
        }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
