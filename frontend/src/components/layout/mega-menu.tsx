import Image from "next/image"
import { ChevronDown } from "lucide-react"

import { Container } from "@/components/layout/container"
import { SmartLink } from "@/components/shared/smart-link"
import type { NavItem } from "@/config/site"

/**
 * Desktop navigation. Each menu opens on hover or keyboard focus (pure CSS),
 * as a full-width panel under the header.
 */
export function MegaMenu({ items }: { items: NavItem[] }) {
  return (
    <nav aria-label="Main" className="hidden self-stretch 2xl:flex">
      <ul className="flex gap-4 3xl:gap-6">
        {items.map((item) => (
          <li key={item.label} className="group/nav flex items-stretch">
            <SmartLink
              href={item.href}
              className="flex items-center gap-1 text-[15px] font-medium text-foreground underline-offset-[6px] transition-colors group-focus-within/nav:text-heading hover:text-heading hover:underline"
            >
              {item.label}
              {item.menu && (
                <ChevronDown
                  aria-hidden
                  className="hidden size-3.5 text-muted-foreground transition-transform duration-200 group-focus-within/nav:rotate-180 group-hover/nav:rotate-180 3xl:block"
                />
              )}
            </SmartLink>
            {item.menu && <MegaPanel menu={item.menu} />}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function MegaPanel({ menu }: { menu: NonNullable<NavItem["menu"]> }) {
  return (
    <div className="invisible absolute inset-x-0 top-full z-40 -translate-y-2 border-t border-line bg-card pt-[30px] pb-[34px] opacity-0 shadow-menu transition-[opacity,transform,visibility] duration-[220ms] group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100">
      <Container className="grid grid-cols-[300px_1fr] gap-12">
        <div className="border-r border-line pr-6">
          <p className="text-[22px] leading-tight font-semibold text-heading">{menu.title}</p>
          <p className="mt-2 mb-4 text-[15px] text-muted-foreground">{menu.description}</p>
          <SmartLink
            href={menu.cta.href}
            className="text-[15px] font-semibold text-heading underline underline-offset-4"
          >
            {menu.cta.label}
          </SmartLink>
        </div>

        {menu.layout === "cards" ? (
          <ul className="grid grid-cols-[repeat(2,minmax(0,300px))] gap-5">
            {menu.items.map((card) => (
              <li key={card.title}>
                <SmartLink
                  href={card.href}
                  className="group/card block rounded-xl px-3.5 py-3 transition-colors duration-200 hover:bg-surface"
                >
                  <span className="relative mb-2.5 block h-[150px] overflow-hidden rounded-lg">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="300px"
                      className="object-cover"
                      style={{ objectPosition: card.imagePosition }}
                    />
                  </span>
                  <span className="block font-semibold text-heading">{card.title}</span>
                  <span className="block text-sm text-muted-foreground">{card.meta}</span>
                </SmartLink>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-2 gap-x-7 gap-y-1.5">
            {menu.items.map(({ icon: Icon, ...link }) => (
              <li key={link.title}>
                <SmartLink
                  href={link.href}
                  className="group/link grid grid-cols-[42px_1fr] items-center gap-3.5 rounded-xl p-2.5 transition-colors hover:bg-surface"
                >
                  <span className="grid size-[42px] place-items-center rounded-[11px] bg-tint-primary text-heading transition-colors group-hover/link:bg-tint-accent">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-heading">{link.title}</span>
                    <span className="block text-sm text-muted-foreground">{link.meta}</span>
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  )
}
