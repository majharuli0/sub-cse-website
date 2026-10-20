import { cn } from "@/lib/utils"

/** Small uppercase label with a leading line, used on dark sections. */
export function Kicker({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "mb-[18px] flex items-center gap-3 text-sm font-semibold tracking-[0.08em] text-highlight uppercase",
        className
      )}
    >
      <span aria-hidden className="h-0.5 w-9 bg-highlight" />
      {children}
    </p>
  )
}
