import { SmartLink } from "@/components/shared/smart-link"
import { cn } from "@/lib/utils"

/** The underlined navy "See all …" link used across sections. */
export function MoreLink({ className, ...props }: React.ComponentProps<typeof SmartLink>) {
  return (
    <SmartLink
      className={cn(
        "font-semibold text-heading underline underline-offset-4 transition-colors hover:text-brand-ink",
        className
      )}
      {...props}
    />
  )
}
