"use client"

import { m, type Variants } from "motion/react"

import { Container } from "@/components/layout/container"
import { SmartLink } from "@/components/shared/smart-link"
import { cn } from "@/lib/utils"
import { quickLinks } from "@/features/home/data/hero"

// Each cell flies in from its own spread-out position and snaps into place (spring).
const cell: Variants = {
  hidden: (i: number) => ({ opacity: 0, x: (i - 1.5) * 8, y: 14 }),
  shown: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.15 + i * 0.08 },
  }),
}

// Once the four pieces have joined, the shared outline + shadow bloom in behind them.
const backplate: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 1], delay: 0.6 } },
}

// Outer corners per cell: 2×2 on small screens, one row from `lg`.
const corners = [
  "rounded-tl-md lg:rounded-l-md",
  "rounded-tr-md lg:rounded-none",
  "rounded-bl-md lg:rounded-none",
  "rounded-br-md lg:rounded-r-md",
]

/** Four shortcut cards that assemble into one bar; on large screens it overlaps the hero photo. */
export function QuickLinks() {
  return (
    <Container className="relative z-[2] mt-[18px] lg:-mt-12">
      <m.ul
        className="relative grid grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
      >
        <m.span
          aria-hidden
          variants={backplate}
          className="pointer-events-none absolute inset-0 rounded-md border border-line lg:border-0 lg:shadow-float"
        />
        {quickLinks.map(({ icon: Icon, ...link }, i) => (
          <m.li
            key={link.label}
            custom={i}
            variants={cell}
            className={cn(
              "relative overflow-hidden border-line bg-card",
              corners[i],
              i % 2 === 0 && "border-r",
              i < 2 && "border-b lg:border-b-0",
              "lg:border-r lg:last:border-r-0"
            )}
          >
            <SmartLink
              href={link.href}
              className={cn(
                "group flex h-full gap-2.5 p-3.5 sm:gap-3.5 lg:px-[22px] lg:py-5",
                link.highlight ? "bg-brand text-brand-foreground" : "text-foreground hover:bg-surface"
              )}
            >
              <Icon
                aria-hidden
                className={cn(
                  "size-[22px] shrink-0 transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 lg:size-[26px]",
                  !link.highlight && "text-heading"
                )}
              />
              <span>
                <span className="block text-base font-semibold group-hover:underline lg:text-[17px]">{link.label}</span>
                <span
                  className={cn(
                    "block text-[13px] lg:text-sm",
                    link.highlight ? "text-brand-foreground/85" : "text-muted-foreground"
                  )}
                >
                  {link.meta}
                </span>
              </span>
            </SmartLink>
          </m.li>
        ))}
      </m.ul>
    </Container>
  )
}
