"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, m, type Transition, type Variants } from "motion/react"

import { Container } from "@/components/layout/container"
import { SmartLink } from "@/components/shared/smart-link"
import { cn } from "@/lib/utils"
import { mainNav, type NavItem } from "@/config/site"

const EASE: Transition["ease"] = [0.2, 0.65, 0.3, 1]
const CLOSE_DELAY_MS = 140

// Content swaps with a short slide in the direction the pointer moved.
const contentVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 24 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.28, ease: EASE } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -24, transition: { duration: 0.18, ease: EASE } }),
}

/**
 * Desktop navigation with ONE shared full-width panel: it stays open while you
 * move across items — only its content changes and its height eases between menus.
 * Hover or focus an item to open; ↓ moves into the panel; Esc closes.
 */
export function MegaMenu() {
  const [active, setActive] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const panelRef = useRef<HTMLDivElement>(null)

  const open = (index: number) => {
    clearTimeout(closeTimer.current)
    if (!mainNav[index].menu) return setActive(null)
    if (active !== null && index !== active) setDirection(index > active ? 1 : -1)
    setActive(index)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY_MS)
  }
  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const menu = active !== null ? mainNav[active].menu : undefined

  return (
    <nav
      aria-label="Main"
      className="hidden self-stretch 2xl:flex"
      onMouseLeave={scheduleClose}
      onMouseEnter={() => clearTimeout(closeTimer.current)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setActive(null)
        if (e.key === "ArrowDown" && menu) {
          e.preventDefault()
          panelRef.current?.querySelector<HTMLElement>("a")?.focus()
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null)
      }}
    >
      {/* Items touch (padding, no gaps) so the pointer never falls into dead space. */}
      <ul className="flex">
        {mainNav.map((item, i) => (
          <li key={item.label} className="relative flex items-stretch" onMouseEnter={() => open(i)}>
            <SmartLink
              href={item.href}
              onFocus={() => open(i)}
              aria-expanded={item.menu ? active === i : undefined}
              aria-haspopup={item.menu ? "true" : undefined}
              className={cn(
                "flex items-center gap-1 px-2 text-[15px] font-medium transition-colors hover:text-heading 3xl:px-3",
                active === i ? "text-heading" : "text-foreground"
              )}
            >
              {item.label}
              {item.menu && (
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "hidden size-3.5 text-muted-foreground transition-transform duration-200 3xl:block",
                    active === i && "rotate-180"
                  )}
                />
              )}
            </SmartLink>
            {/* Underline glides between items */}
            {active === i && (
              <m.span
                layoutId="nav-underline"
                className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-heading 3xl:inset-x-3"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {menu && (
          <m.div
            ref={panelRef}
            key="mega-panel"
            className="absolute inset-x-0 top-full z-40 border-t border-line bg-card shadow-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE } }}
          >
            <AutoHeight>
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <m.div
                  key={active}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <MenuContent menu={menu} />
                </m.div>
              </AnimatePresence>
            </AutoHeight>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/** Animates its height to fit whatever content it holds. */
function AutoHeight({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | "auto">("auto")

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setHeight(entry.borderBoxSize[0].blockSize))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <m.div className="overflow-hidden" animate={{ height }} transition={{ duration: 0.3, ease: EASE }}>
      <div ref={innerRef}>{children}</div>
    </m.div>
  )
}

function MenuContent({ menu }: { menu: NonNullable<NavItem["menu"]> }) {
  return (
    <Container className="grid grid-cols-[300px_1fr] gap-12 pt-[30px] pb-[34px]">
      <div className="border-r border-line pr-6">
        <p className="text-[22px] leading-tight font-semibold text-heading">{menu.title}</p>
        <p className="mt-2 mb-4 text-[15px] text-muted-foreground">{menu.description}</p>
        <SmartLink href={menu.cta.href} className="text-[15px] font-semibold text-heading underline underline-offset-4">
          {menu.cta.label}
        </SmartLink>
      </div>

      {menu.layout === "cards" ? (
        <ul className="grid grid-cols-[repeat(2,minmax(0,300px))] gap-5">
          {menu.items.map((card) => (
            <li key={card.title}>
              <SmartLink
                href={card.href}
                className="block rounded-xl px-3.5 py-3 transition-colors duration-200 hover:bg-surface"
              >
                <span className="relative mb-2.5 block h-[150px] overflow-hidden rounded-lg">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover"
                    style={{ objectPosition: card.imagePosition }}
                  />
                </span>
                <span className="block font-semibold text-heading">{card.title}</span>
                <span className="block text-sm text-muted-foreground">{card.meta}</span>
              </SmartLink>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-2 content-start gap-x-7 gap-y-1.5">
          {menu.items.map(({ icon: Icon, ...link }) => (
            <li key={link.title}>
              <SmartLink
                href={link.href}
                className="group/link grid grid-cols-[42px_1fr] items-center gap-3.5 rounded-xl p-2.5 transition-colors hover:bg-surface"
              >
                <span className="grid size-[42px] place-items-center rounded-[11px] bg-tint-primary text-heading transition-colors group-hover/link:bg-tint-accent">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold text-heading">{link.title}</span>
                  <span className="block text-sm text-muted-foreground">{link.meta}</span>
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
