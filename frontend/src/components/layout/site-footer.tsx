import { Building2, Mail, MapPin, Phone } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Brand } from "@/components/shared/brand"
import { Reveal } from "@/components/shared/reveal"
import { SmartLink } from "@/components/shared/smart-link"
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/shared/social-icons"
import { Button } from "@/components/ui/button"
import { contact, footerColumns, socials } from "@/config/site"

const socialLinks = [
  { label: "Facebook", href: socials.facebook, icon: FacebookIcon },
  { label: "LinkedIn", href: socials.linkedin, icon: LinkedinIcon },
  { label: "YouTube", href: socials.youtube, icon: YoutubeIcon },
  { label: "Instagram", href: socials.instagram, icon: InstagramIcon },
]

const footerLink = "block py-1 transition-colors hover:text-white hover:underline"

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-6 bg-panel-deep text-[15px] text-on-panel">
      {/* Brand strip */}
      <div className="border-b border-white/12">
        <Container className="flex flex-wrap items-center justify-between gap-7 py-7 lg:py-10">
          <div className="flex flex-wrap items-center gap-4 lg:gap-7">
            <Brand variant="light" />
            <p className="max-w-[300px] text-[17px] font-medium lg:border-l lg:border-white/20 lg:pl-6">
              Building the next generation of computer scientists and engineers in Bangladesh.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-2.5 md:w-auto">
            <Button asChild variant="white" size="brand" className="grow md:grow-0">
              <a href={`mailto:${contact.officeEmail}`}>Email the department</a>
            </Button>
            <Button asChild variant="outline-faint" size="brand" className="grow md:grow-0">
              <a href={contact.mapsUrl}>Get directions</a>
            </Button>
          </div>
        </Container>
      </div>

      {/* Link grid */}
      <Container className="grid grid-cols-2 gap-x-5 gap-y-7 py-8 lg:grid-cols-4 lg:py-12 xl:grid-cols-[1.6fr_repeat(4,1fr)] xl:gap-9">
        <Reveal className="col-span-full xl:col-span-1">
          <h2 className="mb-3 text-base font-semibold text-white">Contact us</h2>
          <ul className="space-y-2.5">
            <ContactLine icon={MapPin}>{contact.address}</ContactLine>
            <ContactLine icon={Phone}>
              <a href={contact.hotline.href} className="hover:text-white hover:underline">
                {contact.hotline.label}
              </a>
            </ContactLine>
            <ContactLine icon={Mail}>
              <a href={`mailto:${contact.email}`} className="hover:text-white hover:underline">
                {contact.email}
              </a>
            </ContactLine>
            <ContactLine icon={Building2}>
              CSE office:{" "}
              <a href={`mailto:${contact.officeEmail}`} className="hover:text-white hover:underline">
                {contact.officeEmail}
              </a>
              , {contact.officePhone}
            </ContactLine>
          </ul>
          <ul className="mt-[18px] flex gap-2.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="grid size-[42px] place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {footerColumns.map((column, i) => (
          <Reveal key={column.title} index={i + 1}>
            <h2 className="mb-3 text-base font-semibold text-white">{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <SmartLink href={link.href} className={footerLink}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/12 text-sm text-on-panel-muted">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-5">
          <p>© 2026 Department of CSE, State University of Bangladesh</p>
          <ul className="flex flex-wrap gap-5">
            <li>
              <a href="https://sub.ac.bd" className="hover:text-white">
                University website
              </a>
            </li>
            <li>
              <a href="/sitemap.xml" className="hover:text-white">
                Sitemap
              </a>
            </li>
            <li>
              <SmartLink href="#top" className="hover:text-white">
                Back to top
              </SmartLink>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  )
}

function ContactLine({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <Icon aria-hidden className="mt-0.5 size-[18px] shrink-0 text-on-panel-muted" />
      <span>{children}</span>
    </li>
  )
}
