"use client"

import { domMax, LazyMotion, MotionConfig } from "motion/react"

/**
 * Motion setup for the site: loads only the features we use (lazy `m` components)
 * and respects the OS "reduce motion" setting everywhere.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
