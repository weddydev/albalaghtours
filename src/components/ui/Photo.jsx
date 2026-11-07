import { useEffect, useRef, useState } from 'react'

const missing = new Set()
let reportTimer = 0

/** Collects missing media and logs one tidy line, so the client knows what to upload. */
export function reportMissing(src) {
  missing.add(src)
  clearTimeout(reportTimer)
  reportTimer = setTimeout(() => {
    console.info(`[Al Balagh] Missing media, using fallbacks: ${[...missing].join(', ')}`)
  }, 400)
}

/** Every .webp in /public/images ships with a "-640" sibling for small screens. */
const srcSetFor = (src) => (src?.endsWith('.webp') ? `${src.replace(/\.webp$/, '-640.webp')} 640w, ${src} 1000w` : undefined)

/**
 * Full-bleed photo with a gradient (and optional children) underneath.
 * Uses a native lazy <img> (no JS pre-fetch), so off-screen photos are not downloaded up front;
 * phones get the 640px variant via srcSet. If the file is missing the fallback simply stays.
 * `priority`: an above-the-fold image that is likely the LCP — loaded eagerly at high priority.
 */
export default function Photo({
  src,
  alt = '',
  fallback,
  children,
  width,
  height,
  eager = false,
  priority = false,
  sizes = '(max-width: 1023px) 92vw, 40vw',
  className = '',
  imgClassName = '',
}) {
  const [status, setStatus] = useState('loading')
  const img = useRef(null)

  // reset when the source changes (e.g. hotel selection panel), and catch already-cached images
  useEffect(() => {
    const el = img.current
    setStatus(el?.complete && el.naturalWidth > 0 ? 'ok' : 'loading')
  }, [src])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden={alt ? undefined : true}>
      <div className="absolute inset-0" style={{ background: fallback }}>
        {children}
      </div>
      {status !== 'missing' && (
        <img
          ref={img}
          src={src}
          srcSet={srcSetFor(src)}
          sizes={srcSetFor(src) ? sizes : undefined}
          alt={alt}
          width={width}
          height={height}
          loading={eager || priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setStatus('ok')}
          onError={() => {
            reportMissing(src)
            setStatus('missing')
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${status === 'ok' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  )
}
