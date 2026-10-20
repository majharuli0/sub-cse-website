import { cn } from "@/lib/utils"

/** Page width used by every section: 1240px max, 18px gutter on phones, 40px from `sm`. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-[18px] sm:px-10", className)} {...props} />
}
