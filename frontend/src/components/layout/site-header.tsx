import { Container } from "@/components/layout/container"
import { MegaMenu } from "@/components/layout/mega-menu"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Brand } from "@/components/shared/brand"
import { SmartLink } from "@/components/shared/smart-link"
import { Button } from "@/components/ui/button"
import { links, mainNav, utilityLinks } from "@/config/site"

const mobileNavItems = mainNav.map((item) => ({
  label: item.label,
  href: item.href,
  links: item.menu?.items.map(({ title, href }) => ({ title, href })),
}))

export function SiteHeader() {
  return (
    <header id="top" className="relative z-40 border-b border-line bg-background">
      {/* Utility bar */}
      <div className="hidden border-b border-line bg-surface text-sm text-muted-foreground sm:block">
        <Container className="flex h-11 items-center justify-between">
          {Object.entries(utilityLinks).map(([side, group]) => (
            <ul key={side} className="flex gap-[22px]">
              {group.map((link) => (
                <li key={link.label}>
                  <SmartLink href={link.href} className="hover:text-heading hover:underline">
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          ))}
        </Container>
      </div>

      {/* Main row */}
      <Container className="flex h-[68px] items-center justify-between gap-2.5 sm:h-20 sm:gap-6">
        <Brand />
        <MegaMenu items={mainNav} />
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Button asChild variant="brand" size="brand" className="hidden md:inline-flex">
            <a href={links.apply}>Apply now</a>
          </Button>
          <MobileNav items={mobileNavItems} />
        </div>
      </Container>
    </header>
  )
}
