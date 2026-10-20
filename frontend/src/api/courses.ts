import api from "@/api/axios"
import { ENDPOINTS } from "@/api/endpoints"
import type { Course } from "@/features/courses/types"

// Laravel API Resources wrap responses in { data: ... }
export async function getCourseDetails(slug: string) {
  const res = await api.get<{ data: Course }>(ENDPOINTS.COURSE_DETAILS(slug))
  return res.data.data
}
