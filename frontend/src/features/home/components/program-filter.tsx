"use client"

import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"

import { FilterPills } from "@/components/shared/filter-pills"
import { Reveal } from "@/components/shared/reveal"
import { SmartLink } from "@/components/shared/smart-link"
import { programLevelLabel, programLevels, programs } from "@/features/home/data/programs"
import type { ProgramLevel } from "@/features/home/types"

const levelColor: Record<ProgramLevel, string> = {
  ug: "text-[#2f6fd0] dark:text-[#7aa6ee]",
  pg: "text-[#e2622b] dark:text-[#f0956a]",
  short: "text-brand-ink",
}

/** Level filter + program cards (client: holds the selected level). */
export function ProgramFilter() {
  const [level, setLevel] = useState<"all" | ProgramLevel>("all")
  const visible = programs.filter((program) => level === "all" || program.level === level)

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2.5">
        {/* Visual placeholder until program search exists (as in the design). */}
        <div className="flex h-[46px] min-w-0 basis-full items-center gap-2 rounded-sm border border-line px-3.5 text-subtle sm:flex-[1_1_280px] sm:basis-auto">
          <Search aria-hidden className="size-4" />
          Search for a program or course
        </div>
        <FilterPills options={programLevels} value={level} onChange={setLevel} label="Filter programs by level" />
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((program, i) => (
          <Reveal as="li" key={program.title} index={i}>
            <SmartLink
              href={program.href}
              className="group grid h-full grid-cols-[110px_minmax(0,1fr)] overflow-hidden rounded-md border border-line bg-card transition-[box-shadow,translate] duration-300 ease-soft hover:-translate-y-1 hover:shadow-card sm:block"
            >
              <Reveal variant="image" index={i} className="relative min-h-[110px] overflow-hidden sm:h-[150px]">
                <Image
                  src={program.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1101px) 25vw, (min-width: 561px) 50vw, 110px"
                  className="object-cover"
                  style={{ objectPosition: program.image.position }}
                />
              </Reveal>
              <span className="block px-3.5 py-3 sm:p-4">
                <span className={`flex items-center gap-1.5 text-[13px] font-semibold ${levelColor[program.level]}`}>
                  <span aria-hidden className="size-[7px] rounded-full bg-current" />
                  {programLevelLabel[program.level]}
                </span>
                <span className="my-1.5 block text-base leading-[1.3] font-semibold text-heading sm:text-lg">
                  {program.title}
                </span>
                <span className="block text-sm text-muted-foreground">{program.meta}</span>
              </span>
            </SmartLink>
          </Reveal>
        ))}
      </ul>
    </>
  )
}
