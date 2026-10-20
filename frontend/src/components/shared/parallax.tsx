"use client"

import { useRef } from "react"
import { m, useReducedMotion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

/** Scroll progress of an element through the viewport: 0 when it enters at the bottom, 1 when it leaves at the top. */
function useViewportProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  return { ref, progress: scrollYProgress }
}

/**
 * Full-bleed section background that drifts slower than the page.
 * The layer is 30% taller than the section (15% each side) so it never shows a gap.
 */
export function Parallax({ className, children }: { className?: string; children: React.ReactNode }) {
  const { ref, progress } = useViewportProgress()
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], ["-10%", "10%"])

  return (
    <div ref={ref} aria-hidden className={cn("absolute inset-0 -z-20 overflow-hidden", className)}>
      <m.div className="absolute inset-x-0 -top-[15%] -bottom-[15%]" style={{ y: reduce ? 0 : y }}>
        {children}
      </m.div>
    </div>
  )
}

/**
 * A photo that drifts inside its frame while the frame scrolls by (the frame stays put).
 * Fills its positioned parent; put a `fill` <Image> inside.
 */
export function ParallaxImage({
  strength = 8,
  className,
  children,
}: {
  /** Max drift in % of the photo's height (keep ≤ 9; the photo overhangs 12% each side). */
  strength?: number
  className?: string
  children: React.ReactNode
}) {
  const { ref, progress } = useViewportProgress()
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <m.div className="absolute inset-x-0 -top-[12%] -bottom-[12%]" style={{ y: reduce ? 0 : y }}>
        {children}
      </m.div>
    </div>
  )
}

/**
 * Content that moves at its own speed while scrolling, for layered depth.
 * `speed` is the total travel in px (positive = drifts up as you scroll down).
 */
export function ParallaxLayer({
  speed = 40,
  className,
  children,
}: {
  speed?: number
  className?: string
  children: React.ReactNode
}) {
  const { ref, progress } = useViewportProgress()
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], [speed / 2, -speed / 2])

  return (
    <m.div ref={ref} className={className} style={{ y: reduce ? 0 : y }}>
      {children}
    </m.div>
  )
}
