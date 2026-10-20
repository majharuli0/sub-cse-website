import Image from "next/image"
import { MapPin } from "lucide-react"

import { Container } from "@/components/layout/container"
import { links } from "@/config/site"
import { PeopleCarousel } from "@/features/home/components/people-carousel"
import { alumni } from "@/features/home/data/people"
import type { Alumnus } from "@/features/home/types"

// Avatar backgrounds cycle through these (initials until photos exist).
const avatarGradients = [
  "bg-[linear-gradient(135deg,#12285a,#2f4c8f)]",
  "bg-[linear-gradient(135deg,#1f6f6a,#2e8f86)]",
  "bg-[linear-gradient(135deg,#3b2f6b,#5b4c9a)]",
  "bg-[linear-gradient(135deg,#8c3b1f,#c2531b)]",
]

export function Alumni() {
  return (
    <section id="life" className="scroll-mt-6 bg-surface pt-[72px] pb-20 sm:pt-28 sm:pb-[120px]">
      <Container>
        <PeopleCarousel
          title="Our alumni"
          subtitle="From the 2nd batch to today, our graduates work in Bangladesh, the USA, the UK, Japan and Singapore."
          more={{ label: "See all alumni", href: links.alumni }}
          itemLabel="alumni"
          autoplayMs={4600}
          slides={alumni.map((person, i) => (
            <AlumniCard key={person.name} person={person} gradient={avatarGradients[i % avatarGradients.length]} />
          ))}
        />
      </Container>
    </section>
  )
}

function AlumniCard({ person, gradient }: { person: Alumnus; gradient: string }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-soft transition-[transform,box-shadow] duration-300 ease-soft hover:-translate-y-1.5 hover:shadow-lift">
      <div className="h-[92px] border-b border-line-soft px-[22px] py-4 sm:h-[104px]">
        {person.logo ? (
          // Logos are dark-on-light artwork, so they sit on a white plate in both themes.
          <div className="relative size-full rounded-lg bg-white">
            <Image src={person.logo} alt={person.company} fill sizes="240px" className="object-contain px-2.5 py-1" />
          </div>
        ) : (
          <div className="grid size-full place-items-center rounded-lg bg-surface-2 px-3 text-center">
            <span className="line-clamp-2 text-sm font-semibold text-subtle">{person.company}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center bg-[linear-gradient(var(--surface-2),var(--card)_70%)] px-[18px] pb-[22px] text-center">
        <span
          aria-hidden
          className={`mt-[18px] grid size-[76px] place-items-center rounded-full border-4 border-card text-[26px] font-semibold text-white shadow-[0_6px_18px_rgb(var(--shadow-color)/0.16)] sm:size-[84px] ${gradient}`}
        >
          {person.initials}
        </span>
        <h3 className="mt-3.5 text-[17px] font-semibold text-heading">{person.name}</h3>
        <p className="mt-0.5 text-sm text-ink-2">
          {person.role}
          {!person.logo && <span className="sr-only"> at {person.company}</span>}
        </p>
        <div className="mt-auto flex items-center gap-2.5 pt-3.5">
          <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">
            {person.batch}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-subtle">
            <MapPin aria-hidden className="size-[13px]" />
            {person.location}
          </span>
        </div>
      </div>
    </article>
  )
}
