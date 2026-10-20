"use client"

import { useRef } from "react"
import { m, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Background layer that drifts slower than the page while its section scrolls by.
 * It's 30% taller than the section (15% overflow each side), so it never shows a gap.
 */
export function Parallax({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <div ref={ref} aria-hidden className={cn("absolute inset-0 -z-20 overflow-hidden", className)}>
      <m.div className="absolute inset-x-0 -top-[15%] -bottom-[15%]" style={{ y }}>
        {children}
      </m.div>
    </div>
  )
}
