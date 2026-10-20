"use client"

import { Fragment, useEffect, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { m, useReducedMotion, useScroll, useTransform } from "motion/react"

import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"
import type { HeroSlide } from "@/features/home/types"

const INTERVAL_MS = 6000
const OVERLAY_QUERY = "(min-width: 561px)" // text sits over the photo from `sm`

function useOverlayLayout() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(OVERLAY_QUERY)
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    },
    () => window.matchMedia(OVERLAY_QUERY).matches,
    () => false
  )
}

type HeroCarouselProps = {
  slides: HeroSlide[]
  content: { kicker: string; title: string; lead: string }
}

/**
 * Hero: photos slide horizontally every 6s with a slow Ken Burns zoom, and the
 * headline re-plays a word-by-word rise on every slide. From `sm` the text sits
 * over the photo; on phones it drops below it.
 */
export function HeroCarousel({ slides, content }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)
  // Photos drift down a little as the page scrolls past the hero (parallax).
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 900], ["0%", "12%"])
  // The headline rises and fades faster than the photo → the photo feels behind it.
  const textY = useTransform(scrollY, [0, 600], [0, -110])
  const textOpacity = useTransform(scrollY, [0, 520], [1, 0])
  const overlay = useOverlayLayout()
  const reduceMotion = useReducedMotion()
  const textDepth = overlay && !reduceMotion

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [slides.length, index])

  const words = content.title.split(" ")

  return (
    <section aria-label="Introduction" className="relative">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-panel sm:aspect-[4/3] lg:aspect-[16/8] xl:aspect-[16/7] xl:max-h-[720px]">
        {/* Parallax layer is taller than the frame so drifting never shows a gap. */}
        <m.div className="absolute inset-x-0 -top-[15%] h-[115%]" style={{ y: parallaxY }}>
          <div
            className="absolute inset-0 flex transition-transform duration-900 ease-swing"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={slide.src} className="relative size-full shrink-0 overflow-hidden" aria-hidden={i !== index}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  fetchPriority={i === 0 ? "high" : "auto"}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: slide.position }}
                />
              </div>
            ))}
          </div>
        </m.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(11,26,61,.88)_0%,rgba(11,26,61,.55)_26%,rgba(11,26,61,.12)_48%,rgba(11,26,61,0)_62%)] sm:block"
        />

        <div
          className="absolute right-3 bottom-3 z-[3] flex gap-0.5 sm:right-8 sm:bottom-6 lg:bottom-[60px] 3xl:right-[calc((100%-1240px)/2+28px)]"
          role="group"
          aria-label="Choose hero photo"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1} of ${slides.length}`}
              aria-current={i === index}
              className="grid size-7 place-items-center"
            >
              <span
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-300",
                  i === index ? "w-[26px] bg-white" : "w-2 bg-white/55"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <m.div
        className="sm:pointer-events-none sm:absolute sm:inset-x-0 sm:bottom-[82px]"
        style={textDepth ? { y: textY, opacity: textOpacity } : undefined}
      >
        {/* key={index} replays the text animation on every slide change */}
        <Container key={index} className="pt-5 pb-1 sm:p-0 sm:px-10">
          <p className="animate-fade-up text-[15px] font-semibold text-warm sm:text-base sm:text-highlight sm:[text-shadow:0_2px_12px_rgba(8,16,40,.5)]">
            {content.kicker}
          </p>
          <h1
            aria-label={content.title}
            className="mt-2 max-w-[780px] text-[32px] leading-[1.08] font-semibold tracking-[-0.02em] text-heading sm:text-[38px] sm:text-white sm:[text-shadow:0_2px_16px_rgba(8,16,40,.45)] xl:text-[44px] 3xl:text-[54px]"
          >
            {words.map((word, i) => (
              <Fragment key={i}>
                {/* The space must sit between the masks: inline-blocks drop trailing whitespace. */}
                {i > 0 && " "}
                <span aria-hidden className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <span className="animate-word-rise inline-block" style={{ animationDelay: `${120 + i * 70}ms` }}>
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
          </h1>
          <p
            className="animate-fade-up mt-3 max-w-[640px] text-base text-ink-2 sm:text-[17px] sm:text-[#e3e7f4]"
            style={{ animationDelay: `${200 + words.length * 70}ms` }}
          >
            {content.lead}
          </p>
        </Container>
      </m.div>
    </section>
  )
}
