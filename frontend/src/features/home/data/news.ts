import type { FeaturedNews, NewsItem, Notice, UpcomingEvent } from "@/features/home/types"

export const featuredNews: FeaturedNews = {
  type: "News",
  date: "[Date], 2026",
  title: "SUB CSE students take part in Innovation Hub 2026",
  excerpt:
    "Students presented their innovations at the SUB booth, joined by Professor Dr. Sharmin Parveen of the CSE department. [Add one line on results or highlights.]",
  href: "#news",
  image: { src: "/images/innovation-hub.jpg", alt: "SUB booth at Innovation Hub 2026", position: "center 40%" },
}

export const latestNews: NewsItem[] = [
  {
    type: "Event",
    date: "25 Sep 2026",
    title: "PRISM AI Creative Awards 2026 comes to SUB",
    href: "https://sub.ac.bd/event/prism-ai-2026-hits-sub-creativity-ai-and-next-gen-innovation",
  },
  {
    type: "Event",
    date: "Registration open",
    title: "IUPC 2026: register your team",
    href: "https://www.iupc.sub.edu.bd",
  },
  { type: "News", date: "[Date]", title: "Colors, music and projects at CSE Tech Carnival", href: "#news" },
]

export const upcomingEvents: UpcomingEvent[] = [
  {
    day: "Open",
    month: "Now",
    title: "IUPC 2026 team registration",
    place: "Inter university programming contest at SUB",
    href: "https://www.iupc.sub.edu.bd",
  },
  {
    day: "Jan",
    month: "2027",
    title: "Spring 2027 semester begins",
    place: "Classes start for new and current students",
    href: "https://sub.ac.bd/admission",
  },
  { day: "[DD]", month: "[Mon]", title: "[Upcoming seminar or workshop]", place: "[Venue]", href: "#upcoming" },
]

export const notices: Notice[] = [
  { category: "Admission", title: "Admission is going on for Spring 2027", href: "https://sub.ac.bd/admission" },
  { category: "Contest", title: "IUPC 2026 registration is ongoing", href: "https://www.iupc.sub.edu.bd" },
  {
    category: "Students",
    title: "Certificate verification for students going abroad is now on mygov.bd",
    href: "https://sub.ac.bd/page/mygov-apostille-bd",
  },
]
