import { Globe, Lightbulb, Sparkles } from "lucide-react"

import { links } from "@/config/site"
import type { MissionPillar, ResearchCard } from "@/features/home/types"

export const glanceStats = [
  { value: "800+", label: "Current students", tone: "warm" },
  { value: "2,000+", label: "Graduates", tone: "indigo" },
] as const

export const researchAreas = [
  "AI and machine learning",
  "Cybersecurity and blockchain",
  "Data science and bioinformatics",
  "Internet of things",
  "Software engineering",
]

export const researchFeatured: ResearchCard = {
  tag: "Research focus",
  title: "Computer vision and large language models",
  meta: "Led by Muhammad Masud Tarek, Associate Professor and Chairman (Acting), with work in data analysis and deep learning.",
  href: "https://sub.ac.bd/faculty/44",
}

export const researchCards: ResearchCard[] = [
  {
    tag: "Research focus",
    title: "Blockchain and network security",
    meta: "Dr. Md. Shohidul Islam",
    href: "https://sub.ac.bd/faculty/436",
  },
  {
    tag: "Labs",
    title: "Machine learning, big data and NLP labs",
    meta: "One computer for every student",
    href: "https://sub.ac.bd/program/M.Sc.%20in%20Data%20Science%20and%20Machine%20Learning/msc-in-data-science-and-machine-learning",
  },
]

export const vision = {
  before: "To play a leading role in higher education by producing ",
  highlight: "intelligent, skilled global citizens",
  after: " with an agile mindset and cutting edge knowledge.",
  link: { label: "Read the full vision and mission", href: "https://sub.ac.bd/about" },
}

export const missionPillars: MissionPillar[] = [
  {
    icon: Lightbulb,
    title: "Inspire curiosity",
    description: "A challenging academic environment that pushes students to ask better questions.",
  },
  {
    icon: Sparkles,
    title: "Encourage creativity",
    description: "Room to build, experiment and turn ideas into working projects.",
  },
  {
    icon: Globe,
    title: "Ready for society and industry",
    description: "Graduates who respond to the changing needs of the country and the world.",
  },
]

export const aboutCse = {
  eyebrow: "School of Science and Technology",
  title: "More about CSE",
  body: "One of the major academic units of State University of Bangladesh. Classes focus on hands-on training, with labs for machine learning, data analytics, big data and cloud computing.",
  links: [
    { label: "Mission and vision", href: "#mission" },
    { label: "Chairman's message", href: "#about" },
    { label: "History", href: "#about" },
    { label: "Facilities", href: "#about" },
  ],
}

export const admissionCta = {
  title: "Spring 2027 admission is open",
  subtitle: "Questions about admission? Talk to us directly.",
  actions: [
    { label: "Apply now", href: links.apply, variant: "brand" },
    { label: "WhatsApp", href: "https://wa.me/8801766662992", variant: "outline-light" },
    { label: "Call 16665", href: links.hotline, variant: "outline-light" },
  ],
} as const
