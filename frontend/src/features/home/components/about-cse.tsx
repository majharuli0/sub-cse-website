import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Parallax } from "@/components/shared/parallax"
import { Reveal } from "@/components/shared/reveal"
import { SmartLink } from "@/components/shared/smart-link"
import { aboutCse } from "@/features/home/data/about"

/** Full-bleed campus photo with an info card; the card sits over the lower photo on phones. */
export function AboutCse() {
  return (
    <section
      aria-labelledby="about-cse-heading"
      className="relative isolate pt-[280px] pb-8 lg:flex lg:min-h-[680px] lg:items-center lg:py-0"
    >
      <Parallax>
        <Image src="/images/campus.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_45%]" />
      </Parallax>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,26,61,.45),rgba(11,26,61,0)_60%)]"
      />
      {/* Fades the photo into the alumni band above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90px] bg-[linear-gradient(var(--surface),transparent)] sm:h-[140px]"
      />

      <Container>
        <Reveal className="rounded-md bg-card p-[22px] shadow-card sm:p-[30px] lg:max-w-[420px]">
          <p className="text-sm font-bold text-brand-ink">{aboutCse.eyebrow}</p>
          <h2 id="about-cse-heading" className="mt-1.5 mb-2.5 text-[32px] leading-[1.15] font-bold text-heading">
            {aboutCse.title}
          </h2>
          <p className="mb-4 text-ink-2">{aboutCse.body}</p>
          <ul>
            {aboutCse.links.map((link) => (
              <li key={link.label}>
                <SmartLink
                  href={link.href}
                  className="group flex items-center justify-between border-t border-line py-3 font-medium text-foreground hover:text-heading"
                >
                  {link.label}
                  <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </SmartLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
