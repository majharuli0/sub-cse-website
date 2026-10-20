import { siteConfig } from "@/config/site"

export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString()

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: siteConfig.name,
    url: siteConfig.url,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
