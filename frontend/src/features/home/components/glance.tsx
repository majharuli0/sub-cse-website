import Image from "next/image"
import Link from "next/link"
import { GraduationCap, Play, Users } from "lucide-react"

import { CountUp } from "@/components/shared/count-up"
import { Reveal } from "@/components/shared/reveal"
import { Section, SectionHeader } from "@/components/shared/section"
import { cn } from "@/lib/utils"
import { glanceStats } from "@/features/home/data/about"

const tile = "flex h-[150px] flex-col justify-between rounded-md p-4 sm:h-[190px] sm:p-[22px]"

const statStyles = {
  warm: { bg: "bg-tint-warm", icon: Users, iconColor: "text-warm" },
  indigo: { bg: "bg-tint-indigo", icon: GraduationCap, iconColor: "text-indigo" },
}

export function Glance() {
  const [students, graduates] = glanceStats

  return (
    <Section id="about">
      <SectionHeader title="CSE at a glance" align="center" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Reveal index={0}>
          <StatTile {...students} />
        </Reveal>

        <Reveal index={1}>
          <Link href="#life" className={cn(tile, "group relative isolate overflow-hidden text-white")}>
            <Image
              src="/images/tech-carnival-colors.jpg"
              alt=""
              fill
              sizes="(min-width: 861px) 25vw, 50vw"
              className="-z-20 object-cover"
              style={{ objectPosition: "45% 72%" }}
            />
            <span
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(11,26,61,.88)_0%,rgba(11,26,61,.35)_55%,rgba(11,26,61,.1)_100%)]"
            />
            <span className="grid size-10 place-items-center rounded-full bg-white text-[#1a2238]">
              <Play aria-hidden className="size-4 fill-current" />
            </span>
            <span>
              <span className="block text-lg leading-tight font-bold sm:text-[22px]">A day in CSE</span>
              <span className="mt-1 block text-sm opacity-90">Watch campus life at SUB</span>
            </span>
          </Link>
        </Reveal>

        <Reveal index={2}>
          <StatTile {...graduates} />
        </Reveal>

        <Reveal index={3}>
          <Link
            href="#about"
            className={cn(tile, "bg-brand text-brand-foreground transition-opacity hover:opacity-95")}
          >
            <span className="text-xl leading-[1.15] font-bold sm:text-[26px]">Explore the department</span>
            <span className="text-[15px] font-semibold underline underline-offset-4">About CSE</span>
          </Link>
        </Reveal>
      </div>
    </Section>
  )
}

function StatTile({ value, label, tone }: (typeof glanceStats)[number]) {
  const { bg, icon: Icon, iconColor } = statStyles[tone]

  return (
    <div className={cn(tile, bg)}>
      <Icon aria-hidden className={cn("size-[34px] self-end", iconColor)} strokeWidth={1.8} />
      <div>
        <p className="text-[32px] leading-none font-bold text-heading tabular-nums sm:text-[44px]">
          <CountUp value={value} />
        </p>
        <p className="mt-1 font-medium text-foreground">{label}</p>
      </div>
    </div>
  )
}
