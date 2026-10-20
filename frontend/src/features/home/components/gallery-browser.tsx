"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLenis } from "lenis/react"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { AnimatePresence, m, useInView, type Transition, type Variants } from "motion/react"

import { FilterPills } from "@/components/shared/filter-pills"
import { MoreLink } from "@/components/shared/more-link"
import { ParallaxImage } from "@/components/shared/parallax"
import { SectionHeader } from "@/components/shared/section"
import { links } from "@/config/site"
import { useImagesLoaded } from "@/hooks/useImagesLoaded"
import { cn } from "@/lib/utils"
import { galleryFilters, galleryItems } from "@/features/home/data/gallery"
import type { GalleryCategory, GalleryItem } from "@/features/home/types"

const EASE_SWING = [0.65, 0, 0.35, 1] as const
const EASE_OUT = [0.2, 0.65, 0.3, 1] as const
/** The card "expands" on a soft spring — quick to start, settles without wobble. */
const CARD_SPRING: Transition = { type: "spring", stiffness: 210, damping: 28, mass: 0.9 }

/** Bento slots for the unfiltered view: 2-column on small screens, 12-column on large. */
const bentoSlots = [
  "col-span-2 row-span-2 lg:col-[1/8] lg:row-[1/5]",
  "col-span-2 lg:col-[8/13] lg:row-[1/3]",
  "lg:col-[8/11] lg:row-[3/5]",
  "lg:col-[11/13] lg:row-[3/5]",
  "lg:col-[1/5] lg:row-[5/7]",
  "lg:col-[5/9] lg:row-[5/7]",
  "col-span-2 lg:col-[9/13] lg:row-[5/7]",
]

/** Shared id that lets a tile's card expand into the viewer and shrink back. */
const cardId = (item: GalleryItem) => `gallery-card-${item.src}`

// The <li> is what the in-view observer watches (never clipped — a fully clipped element
// never reports as visible); its inner layer expands top → bottom (curtain wipe).
const tileVariants: Variants = {
  hidden: {},
  shown: {},
  exit: { opacity: 0, transition: { duration: 0.25 } },
}
const curtainVariants: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  shown: (delay: number) => ({ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: EASE_OUT, delay } }),
}

type Viewer = { origin: number; current: number }

export function GalleryBrowser() {
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all")
  // origin = the tile the card expanded from (and shrinks back into); current = photo being viewed
  const [viewer, setViewer] = useState<Viewer | null>(null)

  const items = galleryItems.filter((item) => filter === "all" || item.category === filter)
  const bento = filter === "all"

  return (
    <>
      <SectionHeader
        title="Gallery"
        subtitle="Moments from classes, contests and campus life."
        actions={
          <>
            <FilterPills options={galleryFilters} value={filter} onChange={setFilter} label="Filter photos" />
            <MoreLink href={links.updates}>Full gallery</MoreLink>
          </>
        }
      />

      <ul
        className={cn(
          "grid gap-2.5 sm:gap-3.5",
          bento
            ? "auto-rows-[130px] grid-cols-2 sm:auto-rows-[170px] lg:auto-rows-[118px] lg:grid-cols-12"
            : "auto-rows-[140px] grid-cols-2 sm:auto-rows-[180px] lg:auto-rows-[240px] lg:grid-cols-3"
        )}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <GalleryCell key={item.src} delay={(i % 6) * 0.08} className={cn(bento && bentoSlots[i])}>
              <GalleryTile
                item={item}
                expanded={viewer?.origin === i}
                onOpen={() => setViewer({ origin: i, current: i })}
              />
            </GalleryCell>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {viewer && items[viewer.current] && (
          <Lightbox
            items={items}
            viewer={viewer}
            onStep={(current) => setViewer({ ...viewer, current })}
            onClose={() => setViewer(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

type GalleryCellProps = {
  delay: number
  className?: string
  children: React.ReactNode
  /** Passed by AnimatePresence (popLayout) to measure exiting tiles. */
  ref?: React.Ref<HTMLLIElement>
}

/**
 * Grid cell: glides to new positions when filtering, fades out when filtered away,
 * and wipes its photo in only once it's in view AND the photo has loaded.
 */
function GalleryCell({ delay, className, children, ref }: GalleryCellProps) {
  const localRef = useRef<HTMLLIElement>(null)
  const inView = useInView(localRef, { once: true, amount: 0.2 })
  // Start fetching the photo a little before it scrolls in; reveal once in view + loaded.
  const near = useInView(localRef, { once: true, margin: "0px 0px 400px 0px" })
  const loaded = useImagesLoaded(localRef, near)
  const setRefs = (node: HTMLLIElement | null) => {
    localRef.current = node
    if (typeof ref === "function") ref(node)
    else if (ref) ref.current = node
  }

  return (
    <m.li
      ref={setRefs}
      layout
      variants={tileVariants}
      initial="hidden"
      animate={inView && loaded ? "shown" : "hidden"}
      exit="exit"
      transition={{ layout: { duration: 0.6, ease: EASE_SWING } }}
      className={cn("relative", className)}
    >
      <m.div className="size-full" variants={curtainVariants} custom={delay}>
        {children}
      </m.div>
    </m.li>
  )
}

function GalleryTile({ item, expanded, onOpen }: { item: GalleryItem; expanded: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open photo: ${item.title}`}
      className="group relative block size-full cursor-zoom-in rounded-2xl bg-placeholder text-left"
    >
      {/* The card itself expands into the viewer; while open, its place stays empty. */}
      {!expanded && (
        <m.span
          layoutId={cardId(item)}
          transition={CARD_SPRING}
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: 16 }}
        >
          <ParallaxImage strength={7}>
            <Image
              src={item.src}
              alt=""
              fill
              sizes="(min-width: 861px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: item.position }}
            />
          </ParallaxImage>
          <span className="absolute inset-x-0 bottom-0 flex translate-y-1 flex-col items-start gap-1.5 bg-[linear-gradient(to_top,rgba(10,18,40,.78),rgba(10,18,40,0))] px-2.5 pt-7 pb-2.5 transition-transform duration-500 ease-soft group-hover:translate-y-0 sm:px-4 sm:pt-10 sm:pb-3.5">
            <span className="rounded-full bg-white/92 px-2.5 py-0.5 text-[11.5px] font-semibold text-[#12285a]">
              {item.category}
            </span>
            <span className="text-[13px] font-semibold text-white sm:text-[15px]">{item.title}</span>
          </span>
          <span
            aria-hidden
            className="absolute top-3 right-3 hidden size-9 place-items-center rounded-full bg-white text-[#12285a] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:grid"
          >
            <Maximize2 className="size-4" />
          </span>
        </m.span>
      )}
    </button>
  )
}

// → moves photos rightward (new one enters from the left); ← moves them leftward.
const SLIDE: Transition = { duration: 0.5, ease: EASE_SWING }
const slideVariants: Variants = {
  enter: (dir: number) => (dir === 0 ? { opacity: 0 } : { x: dir > 0 ? "-100%" : "100%", opacity: 1 }),
  center: { x: 0, opacity: 1, transition: SLIDE },
  exit: (dir: number) =>
    dir === 0 ? { opacity: 0, transition: { duration: 0.25 } } : { x: dir > 0 ? "100%" : "-100%", transition: SLIDE },
}

type LightboxProps = {
  items: GalleryItem[]
  viewer: Viewer
  onStep: (index: number) => void
  onClose: () => void
}

/** Full-screen viewer: the tile's card expands here. Arrows/keys browse, Esc or ✕ closes. */
function Lightbox({ items, viewer, onStep, onClose }: LightboxProps) {
  const item = items[viewer.current]
  const origin = items[viewer.origin]
  const [closing, setClosing] = useState(false)
  // Direction the photos travel: 1 = rightward (→ pressed), -1 = leftward (← pressed), 0 = crossfade.
  const [direction, setDirection] = useState(0)
  // While closing, show the original photo again so the card shrinks back into a matching tile.
  const shown = closing ? origin : item
  const ratio = shown.width / shown.height

  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lenis = useLenis()
  const step = (delta: 1 | -1) => {
    setDirection(delta)
    onStep((viewer.current + delta + items.length) % items.length)
  }
  const close = () => {
    setDirection(0)
    setClosing(true)
    onClose()
  }

  // Lock page scroll, focus the viewer, and return focus to the tile on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const root = document.documentElement
    root.style.overflow = "hidden"
    lenis?.stop()
    closeRef.current?.focus()
    return () => {
      root.style.overflow = ""
      lenis?.start()
      opener?.focus()
    }
  }, [lenis])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close()
    else if (e.key === "ArrowLeft") step(-1)
    else if (e.key === "ArrowRight") step(1)
    else if (e.key === "Tab") {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button")
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  // Chrome (top bar, arrows, caption) fades in after the card has mostly expanded.
  const chrome = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, delay: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${viewer.current + 1} of ${items.length}: ${item.title}`}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[200] flex flex-col text-white"
      data-lenis-prevent
    >
      <m.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[rgba(8,14,32,.92)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35 } }}
        exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.05 } }}
        onClick={close}
      />

      <m.div className="flex items-center justify-between px-5 py-3.5" {...chrome}>
        <p className="text-sm text-[#c3cadb]">
          {viewer.current + 1} of {items.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="grid size-11 place-items-center rounded-xl border border-white/30 transition-colors hover:bg-white/10"
        >
          <X className="size-5" />
        </button>
      </m.div>

      <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center sm:px-24">
        <LightboxArrow
          label="Previous photo"
          onClick={() => step(-1)}
          className="absolute top-1/2 left-6 hidden -translate-y-1/2 sm:grid"
          {...chrome}
        >
          <ChevronLeft className="size-5" />
        </LightboxArrow>

        {/* The expanded card: same layoutId as the tile, sized to the photo's real shape. */}
        <m.div
          layoutId={cardId(origin)}
          transition={CARD_SPRING}
          className="pointer-events-auto relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.45)]"
          style={{
            borderRadius: 0,
            aspectRatio: `${shown.width} / ${shown.height}`,
            width: `min(100%, calc((100dvh - 230px) * ${ratio}))`,
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <m.div
              key={shown.src}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) > 70 || Math.abs(velocity.x) > 500
                if (swipe) step(offset.x > 0 ? 1 : -1)
              }}
              className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
            >
              <Image src={shown.src} alt={shown.title} fill sizes="100vw" className="object-cover" />
            </m.div>
          </AnimatePresence>
        </m.div>

        <LightboxArrow
          label="Next photo"
          onClick={() => step(1)}
          className="absolute top-1/2 right-6 hidden -translate-y-1/2 sm:grid"
          {...chrome}
        >
          <ChevronRight className="size-5" />
        </LightboxArrow>
      </div>

      <m.div className="flex items-center justify-between gap-3 px-4 pt-4 pb-6 sm:justify-center sm:px-5" {...chrome}>
        <LightboxArrow label="Previous photo" onClick={() => step(-1)} className="sm:hidden">
          <ChevronLeft className="size-5" />
        </LightboxArrow>
        <div className="flex min-w-0 flex-col items-center gap-2 text-center">
          <span className="rounded-full bg-white/92 px-2.5 py-0.5 text-[11.5px] font-semibold text-[#12285a]">
            {item.category}
          </span>
          <p className="text-[15px]">{item.title}</p>
        </div>
        <LightboxArrow label="Next photo" onClick={() => step(1)} className="sm:hidden">
          <ChevronRight className="size-5" />
        </LightboxArrow>
      </m.div>
    </div>
  )
}

type LightboxArrowProps = React.ComponentProps<typeof m.button> & { label: string }

function LightboxArrow({ label, className, children, ...props }: LightboxArrowProps) {
  return (
    <m.button
      type="button"
      aria-label={label}
      className={cn(
        "pointer-events-auto z-10 grid size-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/6 backdrop-blur-sm transition-colors hover:bg-white/16 sm:size-12",
        className
      )}
      {...props}
    >
      {children}
    </m.button>
  )
}
