import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/shared/reveal"
import { Button } from "@/components/ui/button"
import { admissionCta } from "@/features/home/data/about"

export function AdmissionCta() {
  return (
    <section aria-labelledby="admission-cta-heading" className="bg-panel py-12 text-white">
      <Container>
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 id="admission-cta-heading" className="text-[28px] leading-tight font-bold sm:text-[32px]">
              {admissionCta.title}
            </h2>
            <p className="mt-1 opacity-80">{admissionCta.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {admissionCta.actions.map((action) => (
              <Button key={action.label} asChild variant={action.variant} size="brand">
                <a href={action.href}>{action.label}</a>
              </Button>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
