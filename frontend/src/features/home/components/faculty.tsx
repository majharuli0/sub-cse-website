import { Section } from "@/components/shared/section"
import { PeopleCarousel } from "@/features/home/components/people-carousel"
import { faculty, facultyProfileUrl } from "@/features/home/data/people"
import type { FacultyMember } from "@/features/home/types"

export function Faculty() {
  return (
    <Section id="people">
      <PeopleCarousel
        title="Meet our faculty"
        subtitle="See who teaches what, and what they research."
        more={{ label: "All faculty", href: "https://sub.ac.bd/department/computer-science-and-engineering" }}
        itemLabel="faculty member"
        autoplayMs={4000}
        slides={faculty.map((member) => (
          <FacultyCard key={member.id} member={member} />
        ))}
      />
    </Section>
  )
}

function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <a href={facultyProfileUrl(member.id)} className="group block">
      {/* Initials until real photos are available */}
      <span
        aria-hidden
        className="grid aspect-[4/5] place-items-center rounded-md bg-surface text-[56px] font-bold text-line-strong transition-colors group-hover:bg-tint-primary"
      >
        {member.initials}
      </span>
      <span className="mt-3 block text-[19px] font-semibold text-heading group-hover:underline">{member.name}</span>
      <span className="block text-[15px] text-muted-foreground">{member.role}</span>
      <span className="mt-2 inline-block max-w-full truncate rounded-full bg-tint-primary px-2.5 py-1 text-[13px] font-semibold text-heading">
        {member.tag}
      </span>
    </a>
  )
}
