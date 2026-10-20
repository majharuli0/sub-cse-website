"use client"

import { useState } from "react"
import { MenuIcon } from "lucide-react"

import { SmartLink } from "@/components/shared/smart-link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { links, mobileExtraLinks } from "@/config/site"

/** Plain data (no icon components) so it can be passed from the server header. */
export type MobileNavItem = { label: string; href: string; links?: { title: string; href: string }[] }

/** Slide-in drawer navigation for screens narrower than the desktop mega menu. */
export function MobileNav({ items }: { items: MobileNavItem[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-11 shrink-0 place-items-center rounded-sm border border-line text-heading transition-colors hover:bg-surface 2xl:hidden"
        >
          <MenuIcon className="size-5" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[88%] gap-0 overflow-y-auto sm:max-w-sm" data-lenis-prevent>
        <SheetHeader className="border-b border-line">
          <SheetTitle className="text-heading">Menu</SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile" className="px-4 pb-6">
          <Accordion type="single" collapsible>
            {items.map((item) =>
              item.links ? (
                <AccordionItem key={item.label} value={item.label} className="border-line">
                  <AccordionTrigger className="py-3 text-[17px] font-semibold text-heading hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-2.5 [&_a]:no-underline">
                    <ul>
                      {item.links.map((sub) => (
                        <li key={sub.title} className="border-t border-line-soft">
                          <SheetClose asChild>
                            <SmartLink
                              href={sub.href}
                              className="block py-2.5 text-[15px] text-foreground hover:text-heading"
                            >
                              {sub.title}
                            </SmartLink>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div key={item.label} className="border-b border-line">
                  <SheetClose asChild>
                    <SmartLink href={item.href} className="block py-3 text-[17px] font-semibold text-heading">
                      {item.label}
                    </SmartLink>
                  </SheetClose>
                </div>
              )
            )}
          </Accordion>

          <ul className="mt-4 flex flex-wrap gap-x-[18px] gap-y-1.5 text-[15px] text-muted-foreground">
            {mobileExtraLinks.map((link) => (
              <li key={link.label}>
                <SheetClose asChild>
                  <SmartLink href={link.href} className="inline-block py-1.5 hover:text-heading">
                    {link.label}
                  </SmartLink>
                </SheetClose>
              </li>
            ))}
          </ul>

          <Button asChild variant="brand" size="brand" className="mt-5 w-full">
            <a href={links.apply}>Apply now</a>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
