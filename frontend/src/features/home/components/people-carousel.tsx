"use client"

import { useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"

import { CarouselArrows } from "@/components/shared/carousel-arrows"
import { MoreLink } from "@/components/shared/more-link"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeader } from "@/components/shared/section"
import type { Link } from "@/config/site"

type PeopleCarouselProps = {
  title: string
  subtitle: string
  more: Link
  /** Used in arrow labels, e.g. "faculty member" → "Next faculty member". */
  itemLabel: string
  autoplayMs: number
  /** Pre-rendered cards (server components). */
  slides: React.ReactNode[]
}

/** Looping, swipeable carousel with autoplay (pauses on hover, off for reduced motion). */
export function PeopleCarousel({ title, subtitle, more, itemLabel, autoplayMs, slides }: PeopleCarouselProps) {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: autoplayMs,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    })
  )
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "start", duration: 32 }, [autoplay])

  return (
    <>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        actions={
          <>
            <CarouselArrows label={itemLabel} onPrev={() => api?.scrollPrev()} onNext={() => api?.scrollNext()} />
            <MoreLink href={more.href}>{more.label}</MoreLink>
          </>
        }
      />
      <div>
        <div ref={viewportRef} className="-mr-[18px] overflow-hidden sm:mr-0" aria-roledescription="carousel">
          <ul className="-ml-3.5 flex touch-pan-y sm:-ml-5">
            {slides.map((slide, i) => (
              <li
                key={i}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                className="min-w-0 shrink-0 grow-0 basis-[78%] pl-3.5 sm:basis-1/2 sm:pl-5 lg:basis-1/3 xl:basis-1/4"
              >
                <Reveal index={i % 4} className="h-full">
                  {slide}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
