"use client"

import { useSyncExternalStore } from "react"
import { ReactLenis } from "lenis/react"

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function subscribe(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery)
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}

/**
 * Smooth (inertia) scrolling for the whole page, including #anchor links.
 * Turned off for users who prefer reduced motion.
 */
export function SmoothScroll() {
  const reducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true // server: render nothing
  )

  if (reducedMotion) return null
  return <ReactLenis root options={{ duration: 1.1, anchors: true }} />
}
