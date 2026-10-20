"use client"

import { useEffect, useRef } from "react"

const DURATION_MS = 1800

/**
 * Counts a stat like "2,000+" up from 0 when it scrolls into view.
 * The final value is server-rendered, so search engines and no-JS users see it.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const match = value.match(/^([^\d]*)([\d,]+)(.*)$/)
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const [, prefix, digits, suffix] = match
    const target = Number(digits.replace(/,/g, ""))
    const render = (n: number) => {
      el.textContent = `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1)
          render(target * (1 - Math.pow(1 - t, 4))) // ease-out-quart
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    render(0)
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      render(target)
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
