import { useEffect } from 'react'

const SITE = 'Al Balagh Tours & Travels'

/** Sets <title> and <meta name="description"> for the current page. `exact` uses the title as given. */
export function useDocumentMeta(title, description, { exact = false } = {}) {
  useEffect(() => {
    document.title = exact ? title : title ? `${title} | ${SITE}` : `${SITE} — Holidays, Flights, Visas & Hajj · Hyderabad`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    if (description) meta.content = description
  }, [title, description, exact])
}
