// Course as returned by the Laravel API. Align fields with the API docs.
export type Course = {
  slug: string
  code: string
  title: string
  summary: string
  description?: string
  credits?: number
  level?: string
  duration?: string
  image?: string
  featured?: boolean
}
