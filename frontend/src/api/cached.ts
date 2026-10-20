import "server-only"

import { cacheLife, cacheTag } from "next/cache"

import { getCourseDetails } from "@/api/courses"

/**
 * Server cache for PAGES (not TanStack). Pages call these so their HTML is
 * prebuilt (fast + SEO) and Laravel is hit at most once an hour.
 * Laravel can refresh a tag right away via POST /api/revalidate.
 */
export const CACHE_TAGS = {
  COURSES: "courses",
}

export async function getCachedCourseDetails(slug: string) {
  "use cache"
  cacheLife("hours")
  cacheTag(CACHE_TAGS.COURSES)

  return getCourseDetails(slug)
}
