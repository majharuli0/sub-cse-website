import { BookOpen, Calendar, GraduationCap, Users } from "lucide-react"

import { links } from "@/config/site"
import type { HeroSlide, QuickLink } from "@/features/home/types"

export const heroContent = {
  kicker: "Department of Computer Science and Engineering",
  title: "Build the software Bangladesh runs on.",
  lead: "Undergraduate and graduate programs in computer science, data science and machine learning at State University of Bangladesh.",
}

export const heroSlides: HeroSlide[] = [
  { src: "/images/hero-celebration.jpg", alt: "CSE students celebrating on the SUB campus", position: "50% 50%" },
  {
    src: "/images/project-showcase.jpg",
    alt: "A student presenting his project poster to faculty",
    position: "62% 28%",
  },
  { src: "/images/campus.jpg", alt: "The SUB campus building at Kanchan", position: "center 40%" },
  {
    src: "/images/tech-carnival-colors.jpg",
    alt: "Students throwing colors during the CSE Tech Carnival",
    position: "45% 62%",
  },
]

export const quickLinks: QuickLink[] = [
  { label: "Admission", meta: "Spring 2027 is open", href: links.apply, icon: GraduationCap, highlight: true },
  { label: "Programs", meta: "B.Sc., M.Sc. and courses", href: "#programs", icon: BookOpen },
  { label: "Faculty", meta: "Meet our teachers", href: "#people", icon: Users },
  { label: "Events", meta: "Contests and fairs", href: "#news", icon: Calendar },
]
