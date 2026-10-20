import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"

/** Standard page section: consistent top spacing + page container. */
export function Section({ className, children, ...props }: React.ComponentProps<"section">) {
  return (
    <section className={cn("scroll-mt-6 pt-16 sm:pt-24", className)} {...props}>
      <Container>{children}</Container>
    </section>
  )
}

type SectionHeaderProps = {
  title: string
  subtitle?: string
  /** Links, carousel arrows or filter pills shown on the right (wraps below on small screens). */
  actions?: React.ReactNode
  align?: "start" | "center"
  className?: string
}

export function SectionHeader({ title, subtitle, actions, align = "start", className }: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "mb-7 flex flex-wrap items-end justify-between gap-5",
        align === "center" && "justify-center text-center",
        className
      )}
    >
      <div className={cn(align === "center" && "w-full")}>
        <h2 className="text-[29px] leading-[1.15] font-semibold tracking-[-0.015em] text-heading sm:text-[34px]">
          {title}
        </h2>
        {subtitle && <p className="mt-2 max-w-[620px] text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3 sm:gap-5">{actions}</div>}
    </Reveal>
  )
}
