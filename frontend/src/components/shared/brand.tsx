import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type BrandProps = { variant?: "dark" | "light"; className?: string }

/** Logo + department name. "dark" text for the header, "light" for the footer. */
export function Brand({ variant = "dark", className }: BrandProps) {
  const light = variant === "light"

  return (
    <Link href="#top" className={cn("flex min-w-0 items-center gap-3", className)}>
      <span className={cn("shrink-0", light && "grid size-12 place-items-center rounded-lg bg-white")}>
        <Image
          src="/images/logo.png"
          alt="State University of Bangladesh logo"
          width={50}
          height={50}
          loading={light ? "lazy" : "eager"}
          className={cn("object-contain", light ? "size-[38px]" : "size-[42px] sm:size-[50px]")}
        />
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className={cn("block font-semibold", light ? "text-base text-white" : "text-sm text-heading sm:text-[15px]")}
        >
          Computer Science and Engineering
        </span>
        <span className={cn("block text-xs sm:text-[13px]", light ? "text-on-panel-muted" : "text-muted-foreground")}>
          State University of Bangladesh
        </span>
      </span>
    </Link>
  )
}
