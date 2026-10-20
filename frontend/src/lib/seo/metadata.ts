import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

type BuildMetadataInput = {
  title?: string
  description?: string
  /**
   * Path of THIS page, e.g. "/courses/cse-101". Sets the canonical URL, so only
   * pass it from a page (never from a layout, or every child page inherits it).
   */
  path?: string
  image?: string
  noIndex?: boolean
}

/** One place to build page metadata so canonical, Open Graph and Twitter stay consistent. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path,
  image,
  noIndex = false,
}: BuildMetadataInput = {}): Metadata {
  const images = image ? [{ url: image }] : undefined

  return {
    title,
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(path && { url: path }),
      title: title ?? siteConfig.name,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
      images,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  }
}
