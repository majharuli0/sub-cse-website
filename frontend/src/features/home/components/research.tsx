import { MoreLink } from "@/components/shared/more-link"
import { Reveal } from "@/components/shared/reveal"
import { Section, SectionHeader } from "@/components/shared/section"
import { SmartLink } from "@/components/shared/smart-link"
import { Button } from "@/components/ui/button"
import { links } from "@/config/site"
import { researchAreas, researchCards, researchFeatured } from "@/features/home/data/about"

export function Research() {
  return (
    <Section id="research">
      <SectionHeader
        title="Research and publication"
        subtitle="Students join faculty research through thesis, projects and lab work."
        actions={<MoreLink href={links.journal}>Journal of SUB</MoreLink>}
      />

      {/* Wraps on desktop, scrolls sideways on phones */}
      <ul className="-mx-[18px] mb-6 flex gap-2 overflow-x-auto px-[18px] pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {researchAreas.map((area) => (
          <li
            key={area}
            className="shrink-0 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-foreground"
          >
            {area}
          </li>
        ))}
      </ul>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <Reveal>
          <SmartLink
            href={researchFeatured.href}
            className="group block h-full overflow-hidden rounded-md border border-line bg-card"
          >
            <span aria-hidden className="dot-placeholder block h-[190px] sm:h-[300px]" />
            <span className="block p-5">
              <span className="block text-[13px] font-semibold text-brand-ink">{researchFeatured.tag}</span>
              <span className="my-1 block text-[19px] leading-[1.3] font-bold text-heading group-hover:underline sm:text-[22px]">
                {researchFeatured.title}
              </span>
              <span className="block text-[15px] text-muted-foreground">{researchFeatured.meta}</span>
            </span>
          </SmartLink>
        </Reveal>

        <div className="flex flex-col gap-5">
          {researchCards.map((card, i) => (
            <Reveal key={card.title} index={i + 1}>
              <SmartLink
                href={card.href}
                className="group grid grid-cols-[96px_1fr] gap-4 rounded-md border border-line bg-card p-3 sm:grid-cols-[150px_1fr]"
              >
                <span
                  aria-hidden
                  className="dot-placeholder block h-20 rounded-sm bg-[length:18px_18px] sm:h-[110px]"
                />
                <span>
                  <span className="block text-[13px] font-semibold text-brand-ink">{card.tag}</span>
                  <span className="mt-1 block leading-[1.35] font-semibold text-heading group-hover:underline">
                    {card.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{card.meta}</span>
                </span>
              </SmartLink>
            </Reveal>
          ))}

          <Reveal index={3} className="flex-1">
            <div className="flex h-full flex-col justify-between gap-5 rounded-md bg-panel p-[26px] text-white lg:min-h-[180px]">
              <p className="text-2xl leading-tight font-bold">Read research from SUB faculty and students</p>
              <Button asChild variant="white" size="brand" className="self-start">
                <a href={links.journal}>Journal of SUB</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
