import { useEffect } from 'react'
import { absolute, fullTitle, ogImage, SITE_NAME } from '../data/seo'

/* Find-or-create a <meta>/<link> in <head> by attribute and set its value. */
function setTag(tag, keyAttr, key, valueAttr, value) {
  let el = document.head.querySelector(`${tag}[${keyAttr}="${key}"]`)
  if (value == null) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(keyAttr, key)
    document.head.appendChild(el)
  }
  el.setAttribute(valueAttr, value)
}
const setMeta = (name, value) => setTag('meta', 'name', name, 'content', value)
const setProp = (prop, value) => setTag('meta', 'property', prop, 'content', value)

/**
 * Applies a page's SEO meta (see src/data/seo.js): <title>, description, canonical, robots,
 * Open Graph / Twitter share tags and the JSON-LD structured data. The same tags are written into
 * the pre-built HTML by scripts/seo-build.mjs, so crawlers that do not run JS still see them.
 */
export function useSeo(meta) {
  const { title, exact, description, image, noindex, jsonLd } = meta
  const path = meta.path
  const ld = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const t = fullTitle({ title, exact })
    const url = absolute(path ?? (window.location.pathname.replace(/\/+$/, '') || '/'))
    const img = absolute(image ?? ogImage())
    document.title = t
    setMeta('description', description)
    setMeta('robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    setTag('link', 'rel', 'canonical', 'href', noindex ? null : url)
    setProp('og:type', 'website')
    setProp('og:site_name', SITE_NAME)
    setProp('og:locale', 'en_IN')
    setProp('og:title', t)
    setProp('og:description', description)
    setProp('og:url', url)
    setProp('og:image', img)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', t)
    setMeta('twitter:description', description)
    setMeta('twitter:image', img)

    let script = document.getElementById('seo-jsonld')
    if (!ld) script?.remove()
    else {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'seo-jsonld'
        document.head.appendChild(script)
      }
      script.textContent = ld
    }
  }, [title, exact, description, image, noindex, ld, path])
}

/** Older call style, kept for convenience: useDocumentMeta(title, description, { exact }). */
export function useDocumentMeta(title, description, { exact = false } = {}) {
  useSeo({ title, description, exact })
}
