import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToTarget } from '../lib/lenis'

/**
 * Returns go(hash): on the home page it smooth-scrolls to the section;
 * from any other route it navigates to "/#hash" and Home scrolls once mounted.
 * Returns false only if we are on home and the section does not exist.
 */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return useCallback(
    (hash) => {
      if (pathname === '/') return scrollToTarget(hash, hash === '#home' ? 0 : -80)
      navigate({ pathname: '/', hash: hash === '#home' ? '' : hash })
      return true
    },
    [pathname, navigate],
  )
}
