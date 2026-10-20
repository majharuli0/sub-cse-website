import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Parallax } from "@/components/shared/parallax"
import { Kicker } from "@/components/shared/kicker"
import { Reveal } from "@/components/shared/reveal"
import { missionPillars, vision } from "@/features/home/data/about"

export function Mission() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="relative isolate mt-16 scroll-mt-6 overflow-hidden bg-panel py-14 text-white sm:mt-24 sm:py-24"
    >
      <Parallax>
        <Image src="/images/campus.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_40%]" />
      </Parallax>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(11,26,61,.96)_0%,rgba(11,26,61,.9)_50%,rgba(11,26,61,.8)_100%)]"
      />

      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] xl:gap-[72px]">
        <Reveal>
          <Kicker>Our vision</Kicker>
          <h2 id="mission-heading" className="sr-only">
            Vision and mission
          </h2>
          <blockquote className="mb-7 text-[25px] leading-[1.3] font-medium tracking-[-0.015em] lg:text-[32px] xl:text-[38px]">
            {vision.before}
            <span className="text-highlight">{vision.highlight}</span>
            {vision.after}
          </blockquote>
          <a href={vision.link.href} className="underline underline-offset-4 hover:text-highlight">
            {vision.link.label}
          </a>
        </Reveal>

        <div>
          <Reveal>
            <Kicker>Our mission</Kicker>
          </Reveal>
          <ul className="space-y-3.5">
            {missionPillars.map(({ icon: Icon, title, description }, i) => (
              <Reveal
                as="li"
                key={title}
                index={i}
                className="flex gap-4 rounded-xl border border-white/14 bg-white/6 p-4 sm:px-[22px] sm:py-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand text-brand-foreground">
                  <Icon aria-hidden className="size-[22px]" />
                </span>
                <div>
                  <h3 className="text-base font-semibold sm:text-lg">{title}</h3>
                  <p className="mt-1 text-[15px] text-on-panel">{description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
