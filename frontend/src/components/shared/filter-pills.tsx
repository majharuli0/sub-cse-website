import { cn } from "@/lib/utils"

type FilterPillsProps<T extends string> = {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  label: string
  className?: string
}

/** Toggle-style filter buttons (gallery, programs). */
export function FilterPills<T extends string>({ options, value, onChange, label, className }: FilterPillsProps<T>) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-[42px] rounded-sm border px-3.5 text-[15px] font-medium transition-colors sm:h-[46px] sm:px-[18px]",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-line bg-surface text-foreground hover:border-line-strong"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
