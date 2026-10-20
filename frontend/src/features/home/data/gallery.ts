import type { GalleryCategory, GalleryItem } from "@/features/home/types"

export const galleryFilters: { value: "all" | GalleryCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Events", label: "Events" },
  { value: "Academics", label: "Academics" },
  { value: "Campus life", label: "Campus life" },
]

/** Order matters: the first 7 fill the bento layout (b1–b7). */
export const galleryItems: GalleryItem[] = [
  {
    src: "/images/hero-celebration.jpg",
    width: 1920,
    height: 1280,
    alt: "",
    title: "CSE Tech Carnival on the main field",
    category: "Events",
  },
  {
    src: "/images/lab.jpg",
    width: 1024,
    height: 600,
    alt: "",
    title: "Faculty and students in the computer lab",
    category: "Academics",
  },
  {
    src: "/images/project-showcase.jpg",
    width: 1920,
    height: 1280,
    alt: "",
    title: "Project showcase with faculty",
    category: "Academics",
    position: "60% 30%",
  },
  {
    src: "/images/tech-carnival-colors.jpg",
    width: 1200,
    height: 800,
    alt: "",
    title: "Colors at the Tech Carnival",
    category: "Events",
    position: "45% 65%",
  },
  {
    src: "/images/friends.jpg",
    width: 1200,
    height: 800,
    alt: "",
    title: "Friends on campus",
    category: "Campus life",
  },
  {
    src: "/images/campus.jpg",
    width: 1920,
    height: 950,
    alt: "",
    title: "SUB campus, Kanchan",
    category: "Campus life",
  },
  {
    src: "/images/innovation-hub.jpg",
    width: 512,
    height: 267,
    alt: "",
    title: "SUB booth at Innovation Hub 2026",
    category: "Events",
  },
]
