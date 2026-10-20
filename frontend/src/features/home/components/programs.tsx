import { MoreLink } from "@/components/shared/more-link"
import { Section, SectionHeader } from "@/components/shared/section"
import { ProgramFilter } from "@/features/home/components/program-filter"

export function Programs() {
  return (
    <Section id="programs">
      <SectionHeader
        title="Find your program"
        subtitle="Each program page has the full curriculum, syllabus and fees."
        actions={<MoreLink href="https://sub.ac.bd/programs">All programs</MoreLink>}
      />
      <ProgramFilter />
    </Section>
  )
}
