import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

import { getCourseDetails } from "@/api/courses"
import { QUERY_KEYS } from "@/api/queryKeys"
import type { Course } from "@/features/courses/types"

export const useCourseDetails = (slug: string, options: Partial<UseQueryOptions<Course>> = {}) =>
  useQuery({
    queryKey: QUERY_KEYS.COURSE_DETAILS(slug),
    queryFn: () => getCourseDetails(slug),
    enabled: !!slug,
    ...options,
  })
