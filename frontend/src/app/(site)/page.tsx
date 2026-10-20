import { Container } from "@/components/layout/container"
import { buildMetadata } from "@/lib/seo/metadata"

export const metadata = buildMetadata({ path: "/" })

export default function HomePage() {
  return <Container className="py-12">{/* Landing page — build from design */}</Container>
}
