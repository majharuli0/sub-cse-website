import {
  Bell,
  BookText,
  Calendar,
  FlaskConical,
  Image as ImageIcon,
  MessageSquare,
  Monitor,
  Newspaper,
  Phone,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react"

// Public, build-time values. NEXT_PUBLIC_* must be referenced literally so Next can inline them.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")

export const siteConfig = {
  name: "Department of CSE",
  shortName: "CSE",
  description:
    "Undergraduate and graduate programs in computer science, data science and machine learning at State University of Bangladesh.",
  url: siteUrl,
  locale: "en_US",
} as const

export const links = {
  apply: "https://sub.ac.bd/admission",
  calendar: "https://sub.ac.bd/calender",
  portal: "http://119.148.8.225:8071/apps/",
  alumni: "https://sub.ac.bd/alumni",
  hotline: "tel:16665",
  journal: "https://sub.edu.bd/journal/index.php/jsub",
  updates: "https://sub.ac.bd/event",
} as const

export type Link = { label: string; href: string }

export const utilityLinks: { left: Link[]; right: Link[] } = {
  left: [
    { label: "News and events", href: "#news" },
    { label: "Notices", href: "#news" },
    { label: "Academic calendar", href: links.calendar },
  ],
  right: [
    { label: "Hotline 16665", href: links.hotline },
    { label: "Student Portal", href: links.portal },
  ],
}

// ── Main navigation + mega menus ────────────────────────────────────────────

export type MegaCard = { title: string; meta: string; href: string; image: string; imagePosition?: string }
export type MegaLink = { title: string; meta: string; href: string; icon: LucideIcon }

export type NavItem = {
  label: string
  href: string
  menu?: {
    title: string
    description: string
    cta: Link
  } & ({ layout: "cards"; items: MegaCard[] } | { layout: "links"; items: MegaLink[] })
}

export const programLinks = {
  bscCse: "/courses/bsc-in-cse",
  bscData:
    "https://sub.ac.bd/program/B.Sc.%20in%20Data%20Science%20and%20Engineering/bsc-in-data-science-and-engineering",
  mscData:
    "https://sub.ac.bd/program/M.Sc.%20in%20Data%20Science%20and%20Machine%20Learning/msc-in-data-science-and-machine-learning",
  certificate: "https://sub.ac.bd/program/Professional%20Certification%20Course/professional-certification-course",
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "#top" },
  {
    label: "About",
    href: "#mission",
    menu: {
      title: "About CSE",
      description:
        "The Department of Computer Science and Engineering, part of the School of Science and Technology at SUB.",
      cta: { label: "About the department", href: "#mission" },
      layout: "links",
      items: [
        { title: "Mission and vision", meta: "What guides the department", href: "#mission", icon: Target },
        {
          title: "Chairman's message",
          meta: "A welcome from the department head",
          href: "#about",
          icon: MessageSquare,
        },
        { title: "Facilities", meta: "Labs, classrooms and resources", href: "#about", icon: Monitor },
        { title: "Contact", meta: "Office, email and phone", href: "#contact", icon: Phone },
      ],
    },
  },
  {
    label: "B.Sc.",
    href: "#programs",
    menu: {
      title: "Undergraduate programs",
      description: "Four year degrees with hands-on labs and electives in 8 specialization areas.",
      cta: { label: "Compare programs", href: "#programs" },
      layout: "cards",
      items: [
        {
          title: "B.Sc. in Computer Science and Engineering",
          meta: "4 years, 140 credits",
          href: programLinks.bscCse,
          image: "/images/lab.jpg",
        },
        {
          title: "B.Sc. in Data Science and Engineering",
          meta: "4 years, 140 credits",
          href: programLinks.bscData,
          image: "/images/project-showcase.jpg",
          imagePosition: "60% 30%",
        },
      ],
    },
  },
  {
    label: "M.Sc.",
    href: "#programs",
    menu: {
      title: "Graduate and professional",
      description: "Advanced study in data science and machine learning, plus a short professional course.",
      cta: { label: "All programs", href: "#programs" },
      layout: "cards",
      items: [
        {
          title: "M.Sc. in Data Science and Machine Learning",
          meta: "1.5 years, 40 credits",
          href: programLinks.mscData,
          image: "/images/campus.jpg",
        },
        {
          title: "Professional certificate in data analysis",
          meta: "4 months, hybrid",
          href: programLinks.certificate,
          image: "/images/friends.jpg",
        },
      ],
    },
  },
  {
    label: "Research",
    href: "#research",
    menu: {
      title: "Research",
      description: "Faculty and students work on AI, security, data science and IoT.",
      cta: { label: "Explore research", href: "#research" },
      layout: "links",
      items: [
        {
          title: "Research areas",
          meta: "AI, security, data science, IoT and more",
          href: "#research",
          icon: Sparkles,
        },
        { title: "Journal of SUB", meta: "Read faculty and student research", href: links.journal, icon: BookText },
        { title: "Labs", meta: "Machine learning, big data and NLP labs", href: "#research", icon: FlaskConical },
      ],
    },
  },
  {
    label: "Updates",
    href: "#news",
    menu: {
      title: "Updates",
      description: "News, events, notices and photos from the department.",
      cta: { label: "See all updates", href: "#news" },
      layout: "links",
      items: [
        { title: "News and events", meta: "Stories from the department", href: "#news", icon: Newspaper },
        { title: "Upcoming events", meta: "Contests, seminars and fairs", href: "#upcoming", icon: Calendar },
        { title: "Notices", meta: "Exams, routines and admission", href: "#news", icon: Bell },
        { title: "Gallery", meta: "Photos from campus life", href: "#gallery", icon: ImageIcon },
      ],
    },
  },
]

/** Extra links shown under the groups in the mobile drawer. */
export const mobileExtraLinks: Link[] = [
  { label: "News and events", href: "#news" },
  { label: "Notices", href: "#news" },
  { label: "Academic calendar", href: links.calendar },
  { label: "Alumni", href: links.alumni },
  { label: "Student Portal", href: links.portal },
  { label: "Hotline 16665", href: links.hotline },
]

// ── Footer ──────────────────────────────────────────────────────────────────

export const contact = {
  address: "Department of CSE, State University of Bangladesh, 696 Kendua, Kanchan, Rupganj, Narayanganj, Dhaka-1461",
  hotline: { label: "Hotline 16665", href: links.hotline },
  email: "info@sub.edu.bd",
  officeEmail: "cse@sub.edu.bd",
  officePhone: "09606782338 ext. 212",
  mapsUrl: "https://maps.google.com/?q=State+University+of+Bangladesh",
}

export const socials = {
  facebook: "https://www.facebook.com/subedubd",
  linkedin: "https://www.linkedin.com/school/state-university-of-bangladesh/",
  youtube: "https://youtube.com/@sub_edu_bd",
  instagram: "https://www.instagram.com/sub.ac.bd/",
}

export const footerColumns: { title: string; links: Link[] }[] = [
  {
    title: "Academics",
    links: [
      { label: "Programs", href: "#programs" },
      { label: "Curriculum and syllabus", href: `${programLinks.bscCse}#courses` },
      { label: "Class routine", href: "#news" },
      { label: "Exam schedule", href: "#news" },
      { label: "Academic calendar", href: links.calendar },
    ],
  },
  {
    title: "Admission",
    links: [
      { label: "How to apply", href: links.apply },
      { label: "Tuition fees", href: "https://sub.ac.bd/tuition-fee" },
      { label: "Scholarships and waivers", href: "https://sub.ac.bd/scholarship-&-waiver" },
      { label: "Admission FAQ", href: links.apply },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Faculty", href: "#people" },
      { label: "Staff", href: "#people" },
      { label: "Alumni", href: links.alumni },
      { label: "Research areas", href: "#research" },
      { label: "Publications", href: "#research" },
    ],
  },
  {
    title: "Students",
    links: [
      { label: "Notices", href: "#news" },
      { label: "News and events", href: "#news" },
      { label: "Clubs", href: "#life" },
      { label: "Student Portal", href: links.portal },
      { label: "LMS", href: "http://119.148.8.225:8071/moodle/" },
    ],
  },
]
