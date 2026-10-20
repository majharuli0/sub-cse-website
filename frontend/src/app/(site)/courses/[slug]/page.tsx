import { Container } from "@/components/layout/container"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata = buildMetadata({ title: "Course details" })

export default function CourseDetailsPage() {
  return <Container className="py-12">{/* Course details — build from design */}</Container>
}
