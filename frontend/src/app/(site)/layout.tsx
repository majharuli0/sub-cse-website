import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { QueryProvider } from "@/components/providers/query-provider"
import { JsonLd } from "@/components/shared/json-ld"
import { organizationJsonLd } from "@/lib/seo/json-ld"

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <QueryProvider>
      <JsonLd data={organizationJsonLd()} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </QueryProvider>
  )
}
