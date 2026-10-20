import { ChevronLeft, ChevronRight } from "lucide-react"

type CarouselArrowsProps = { label: string; onPrev: () => void; onNext: () => void }

const arrowClass =
  "grid size-11 place-items-center rounded-full border border-line-strong bg-card text-heading transition-colors hover:border-heading sm:size-9"

/** Round prev/next buttons for section carousels. `label` names the item, e.g. "faculty member". */
export function CarouselArrows({ label, onPrev, onNext }: CarouselArrowsProps) {
  return (
    <div className="flex gap-2">
      <button type="button" className={arrowClass} onClick={onPrev} aria-label={`Previous ${label}`}>
        <ChevronLeft className="size-4" />
      </button>
      <button type="button" className={arrowClass} onClick={onNext} aria-label={`Next ${label}`}>
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}
