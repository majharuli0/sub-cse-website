import Link from "next/link"

import { Container } from "@/components/layout/container"
import { MobileNav } from "@/components/layout/mobile-nav"
import { mainNav, siteConfig } from "@/config/site"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-lg font-semibold">
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <MobileNav items={mainNav} />
      </Container>
    </header>
  )
}
