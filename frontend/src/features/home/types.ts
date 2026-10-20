import type { LucideIcon } from "lucide-react"

// Shapes for the landing page content. When the Laravel endpoints exist, the
// API should return these same shapes so the components don't change.

export type ImageRef = { src: string; alt: string; position?: string }

export type HeroSlide = ImageRef

export type QuickLink = { label: string; meta: string; href: string; icon: LucideIcon; highlight?: boolean }

export type NewsItem = { type: "News" | "Event"; date: string; title: string; href: string }
export type FeaturedNews = NewsItem & { excerpt: string; image: ImageRef }
export type UpcomingEvent = { day: string; month: string; title: string; place: string; href: string }
export type Notice = { category: string; title: string; href: string }

export type ProgramLevel = "ug" | "pg" | "short"
export type Program = { level: ProgramLevel; title: string; meta: string; href: string; image: ImageRef }

export type ResearchCard = { tag: string; title: string; meta: string; href: string }

export type GalleryCategory = "Events" | "Academics" | "Campus life"
export type GalleryItem = ImageRef & { title: string; category: GalleryCategory; width: number; height: number }

export type FacultyMember = { id: number; name: string; initials: string; role: string; tag: string }

export type Alumnus = {
  name: string
  initials: string
  role: string
  company: string
  location: string
  batch: string
  logo?: string
}

export type MissionPillar = { icon: LucideIcon; title: string; description: string }
