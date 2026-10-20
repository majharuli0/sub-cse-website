// Public, build-time values. NEXT_PUBLIC_* must be referenced literally so Next can inline them.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

export const siteConfig = {
  name: "Department of CSE",
  shortName: "CSE",
  description: "Department of Computer Science & Engineering",
  url: siteUrl,
  locale: "en_US",
} as const

export const mainNav = [{ title: "Home", href: "/" }] as const

export type NavItem = (typeof mainNav)[number]
