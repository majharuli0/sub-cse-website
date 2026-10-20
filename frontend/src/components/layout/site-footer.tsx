import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="py-8 text-sm text-muted-foreground">{siteConfig.name}</Container>
    </footer>
  )
}
