import { buildMetadata } from "@/lib/seo/metadata"
import { AboutCse } from "@/features/home/components/about-cse"
import { AdmissionCta } from "@/features/home/components/admission-cta"
import { Alumni } from "@/features/home/components/alumni"
import { Faculty } from "@/features/home/components/faculty"
import { Gallery } from "@/features/home/components/gallery"
import { Glance } from "@/features/home/components/glance"
import { Hero } from "@/features/home/components/hero"
import { Mission } from "@/features/home/components/mission"
import { NewsEvents } from "@/features/home/components/news-events"
import { Programs } from "@/features/home/components/programs"
import { QuickLinks } from "@/features/home/components/quick-links"
import { Research } from "@/features/home/components/research"

export const metadata = buildMetadata({
  title: "Computer Science and Engineering at SUB",
  description:
    "B.Sc. and M.Sc. programs in computer science, data science and machine learning at State University of Bangladesh. Meet our faculty, research and alumni.",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <Glance />
      <NewsEvents />
      <Programs />
      <Research />
      <Gallery />
      <Faculty />
      <Mission />
      <Alumni />
      <AboutCse />
      <AdmissionCta />
    </>
  )
}
