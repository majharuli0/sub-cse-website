"use client"

import { m, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

const EASE = [0.2, 0.65, 0.3, 1] as const

const tags = { div: m.div, li: m.li, article: m.article, aside: m.aside }

type RevealProps = {
  /** Position in a group; staggers the animation by (index % 6) × 80ms. */
  index?: number
  as?: keyof typeof tags
  /** "up": fade + rise (cards, text). "image": the photo expands top → bottom (curtain wipe). */
  variant?: "up" | "image"
  className?: string
  children?: React.ReactNode
}

const up: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } }),
}

const curtain: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  shown: (delay: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE, delay },
  }),
}

/**
 * Animates its children in when they scroll into view (once), including on load.
 * For "image", the outer box is what's observed and the inner layer is clipped,
 * because a fully clipped element never reports as visible.
 */
export function Reveal({ index = 0, as = "div", variant = "up", className, children }: RevealProps) {
  const Tag = tags[as]
  const delay = (index % 6) * 0.08

  if (variant === "image") {
    return (
      <Tag
        className={cn("relative", className)}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.15 }}
        custom={delay}
      >
        <m.div className="absolute inset-0" variants={curtain} custom={delay}>
          {children}
        </m.div>
      </Tag>
    )
  }

  return (
    <Tag
      className={className}
      variants={up}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      custom={delay}
    >
      {children}
    </Tag>
  )
}
