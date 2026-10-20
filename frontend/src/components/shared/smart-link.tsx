import Link from "next/link"

/** Uses next/link for in-site routes and a plain <a> for external, tel: and mailto: links. */
export function SmartLink({ href, ...props }: React.ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} {...props} />
  return <a href={href} {...props} />
}
