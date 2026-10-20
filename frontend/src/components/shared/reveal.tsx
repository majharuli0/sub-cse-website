"use client"

import { useRef } from "react"
import { m, useInView, type Variants } from "motion/react"

import { useImagesLoaded } from "@/hooks/useImagesLoaded"
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

/** Animates its children in when they scroll into view (once), including on load. */
export function Reveal({ index = 0, as = "div", variant = "up", className, children }: RevealProps) {
  const Tag = tags[as]
  const delay = (index % 6) * 0.08

  if (variant === "image") {
    return (
      <ImageReveal as={as} delay={delay} className={className}>
        {children}
      </ImageReveal>
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

type ImageRevealProps = { as: keyof typeof tags; delay: number; className?: string; children?: React.ReactNode }

/**
 * Photo curtain that starts only once the frame is in view AND its photo has
 * loaded, so it never uncovers an empty frame. The outer box is observed and the
 * inner layer is clipped, because a fully clipped element never reports as visible.
 */
function ImageReveal({ as, delay, className, children }: ImageRevealProps) {
  // li/article/aside share the DOM API used here, so type the tag as div.
  const Tag = tags[as] as typeof m.div
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  // Start fetching the photo a little before it scrolls in; reveal once in view + loaded.
  const near = useInView(ref, { once: true, margin: "0px 0px 400px 0px" })
  const loaded = useImagesLoaded(ref, near)

  return (
    <Tag
      ref={ref}
      className={cn("relative", className)}
      initial="hidden"
      animate={inView && loaded ? "shown" : "hidden"}
    >
      <m.div className="absolute inset-0" variants={curtain} custom={delay}>
        {children}
      </m.div>
    </Tag>
  )
}
