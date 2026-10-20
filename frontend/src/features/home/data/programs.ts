import { programLinks } from "@/config/site"
import type { Program, ProgramLevel } from "@/features/home/types"

export const programLevels: { value: "all" | ProgramLevel; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ug", label: "Undergraduate" },
  { value: "pg", label: "Graduate" },
  { value: "short", label: "Short course" },
]

export const programLevelLabel: Record<ProgramLevel, string> = {
  ug: "Undergraduate",
  pg: "Graduate",
  short: "Short course",
}

export const programs: Program[] = [
  {
    level: "ug",
    title: "B.Sc. in Computer Science and Engineering",
    meta: "4 years, 140 credits",
    href: programLinks.bscCse,
    image: { src: "/images/lab.jpg", alt: "" },
  },
  {
    level: "ug",
    title: "B.Sc. in Data Science and Engineering",
    meta: "4 years, 140 credits",
    href: programLinks.bscData,
    image: { src: "/images/project-showcase.jpg", alt: "", position: "60% 30%" },
  },
  {
    level: "pg",
    title: "M.Sc. in Data Science and Machine Learning",
    meta: "1.5 years, 40 credits",
    href: programLinks.mscData,
    image: { src: "/images/campus.jpg", alt: "" },
  },
  {
    level: "short",
    title: "Professional Certificate in Applied Data Analysis (SPSS)",
    meta: "4 months, 15 classes, hybrid",
    href: programLinks.certificate,
    image: { src: "/images/friends.jpg", alt: "" },
  },
]
