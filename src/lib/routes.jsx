import { lazy } from 'react'

/*
 * Route chunks. The home page ships in the main bundle; every other page is its own chunk,
 * loaded on demand, prefetched while the browser is idle, and awaited by the page transition
 * (the doors close, the chunk is ready, the page swaps) so navigation looks exactly the same.
 */
const loaders = {
  service: () => import('../pages/ServicePage'),
  packages: () => import('../pages/PackagesPage'),
  hotels: () => import('../pages/HotelsPage'),
  destinations: () => import('../pages/DestinationsPage'),
  contact: () => import('../pages/ContactPage'),
  albania: () => import('../pages/AlbaniaPage'),
}

const pending = new Map()
const modules = new Map()

/** Start (or reuse) the download of a route chunk. */
export function preloadRoute(key) {
  if (!loaders[key]) return Promise.resolve()
  if (!pending.has(key)) {
    pending.set(
      key,
      loaders[key]().then(
        (m) => {
          modules.set(key, m.default)
          try {
            if (sessionStorage.getItem('albalagh:chunk-retry') === key) sessionStorage.removeItem('albalagh:chunk-retry')
          } catch {
            /* storage unavailable */
          }
          return m
        },
        (err) => {
          pending.delete(key) // allow a retry
          throw err
        },
      ),
    )
  }
  return pending.get(key)
}

/** Which chunk a pathname needs (null = it is in the main bundle). */
export function routeKey(pathname) {
  if (pathname.startsWith('/services/')) return 'service'
  return { '/packages': 'packages', '/hotels': 'hotels', '/destinations': 'destinations', '/contact': 'contact', '/albania-work-visa': 'albania' }[pathname] ?? null
}

export const isRouteReady = (pathname) => {
  const key = routeKey(pathname)
  return !key || modules.has(key)
}
export const preloadPath = (pathname) => preloadRoute(routeKey(pathname))

/** After the first page is up, fetch the other pages quietly so later navigations never wait. */
export function prefetchAllRoutes() {
  const run = () => Object.keys(loaders).forEach((k) => preloadRoute(k).catch(() => {}))
  if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 4000 })
  else setTimeout(run, 2500)
}

// Once a chunk is in memory the page renders directly (no Suspense round-trip, so a transition
// swap is synchronous); `lazy` is only used for a cold, direct visit.
function routeComponent(key) {
  // a chunk that cannot load (e.g. a stale tab after a new deploy): reload once, never loop
  const Lazy = lazy(() =>
    preloadRoute(key).catch((err) => {
      let retried = false
      try {
        retried = sessionStorage.getItem('albalagh:chunk-retry') === key
        sessionStorage.setItem('albalagh:chunk-retry', key)
      } catch {
        /* storage unavailable */
      }
      if (retried) throw err
      window.location.reload()
      return new Promise(() => {})
    }),
  )
  function Route(props) {
    const Page = modules.get(key)
    return Page ? <Page {...props} /> : <Lazy {...props} />
  }
  return Route
}

export const ServicePage = routeComponent('service')
export const PackagesPage = routeComponent('packages')
export const HotelsPage = routeComponent('hotels')
export const DestinationsPage = routeComponent('destinations')
export const ContactPage = routeComponent('contact')
export const AlbaniaPage = routeComponent('albania')
