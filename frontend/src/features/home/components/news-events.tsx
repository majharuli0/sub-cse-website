import Image from "next/image"

import { MoreLink } from "@/components/shared/more-link"
import { ParallaxImage } from "@/components/shared/parallax"
import { Reveal } from "@/components/shared/reveal"
import { Section, SectionHeader } from "@/components/shared/section"
import { SmartLink } from "@/components/shared/smart-link"
import { links } from "@/config/site"
import { featuredNews, latestNews, notices, upcomingEvents } from "@/features/home/data/news"
import type { NewsItem } from "@/features/home/types"

export function NewsEvents() {
  return (
    <Section id="news" className="sm:pt-[88px] lg:pt-28">
      <SectionHeader
        title="News and events"
        subtitle="Latest stories, upcoming events and notices."
        actions={<MoreLink href={links.updates}>See all updates</MoreLink>}
      />

      <div className="grid items-start gap-9 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        {/* Stories */}
        <div>
          <Reveal>
            <SmartLink
              href={featuredNews.href}
              className="group grid items-center gap-4 border-b border-line pb-6 md:grid-cols-2 md:gap-6"
            >
              <Reveal variant="image" className="relative aspect-[16/10] overflow-hidden rounded-xl md:aspect-[4/3]">
                <ParallaxImage>
                  <Image
                    src={featuredNews.image.src}
                    alt={featuredNews.image.alt}
                    fill
                    sizes="(min-width: 861px) 30vw, (min-width: 681px) 45vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: featuredNews.image.position }}
                  />
                </ParallaxImage>
              </Reveal>
              <span>
                <NewsMeta item={featuredNews} />
                <span className="my-2 block text-[19px] leading-[1.3] font-semibold text-heading transition-colors group-hover:text-brand-ink sm:text-[22px]">
                  {featuredNews.title}
                </span>
                <span className="line-clamp-3 block text-[15px] leading-relaxed text-muted-foreground">
                  {featuredNews.excerpt}
                </span>
              </span>
            </SmartLink>
          </Reveal>

          <ul>
            {latestNews.map((item, i) => (
              <Reveal as="li" key={item.title} index={i}>
                <SmartLink href={item.href} className="group block border-b border-line py-4">
                  <NewsMeta item={item} />
                  <span className="mt-1 block text-base leading-snug font-semibold text-foreground transition-colors group-hover:text-brand-ink sm:text-[17px]">
                    {item.title}
                  </span>
                </SmartLink>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Upcoming events + notices */}
        <aside id="upcoming" className="scroll-mt-6 lg:border-l lg:border-line lg:pl-10">
          <AsideHeading>Upcoming events</AsideHeading>
          <ul>
            {upcomingEvents.map((event, i) => (
              <Reveal as="li" key={event.title} index={i}>
                <SmartLink href={event.href} className="group flex gap-3.5 border-b border-line py-3.5">
                  <span className="grid size-[52px] shrink-0 place-content-center rounded-lg border border-line-strong text-center text-heading">
                    <span className="text-base leading-tight font-semibold">{event.day}</span>
                    <span className="text-[11px] text-muted-foreground">{event.month}</span>
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-foreground group-hover:text-brand-ink">
                      {event.title}
                    </span>
                    <span className="block text-[13px] text-subtle">{event.place}</span>
                  </span>
                </SmartLink>
              </Reveal>
            ))}
          </ul>

          <AsideHeading className="mt-7">Notices</AsideHeading>
          <ul>
            {notices.map((notice, i) => (
              <Reveal as="li" key={notice.title} index={i}>
                <SmartLink href={notice.href} className="group flex flex-col gap-0.5 border-b border-line py-3">
                  <span className="text-[13px] font-semibold text-brand-ink">{notice.category}</span>
                  <span className="text-[15px] font-medium text-foreground group-hover:underline">{notice.title}</span>
                </SmartLink>
              </Reveal>
            ))}
          </ul>
          <MoreLink href={links.updates} className="mt-3.5 inline-block text-sm">
            All notices
          </MoreLink>
        </aside>
      </div>
    </Section>
  )
}

function NewsMeta({ item }: { item: NewsItem }) {
  return (
    <span className="flex gap-2.5 text-[13px] text-subtle">
      <span className="font-semibold text-brand-ink">{item.type}</span>
      <span>{item.date}</span>
    </span>
  )
}

function AsideHeading({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={`border-b-2 border-heading pb-2.5 text-[15px] font-semibold text-heading ${className ?? ""}`}>
      {children}
    </h3>
  )
}
