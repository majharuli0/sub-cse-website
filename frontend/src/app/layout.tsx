import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { siteConfig } from "@/config/site"
import { buildMetadata } from "@/lib/seo/metadata"

import "./globals.css"

// Swap for the fonts in the design; keep the CSS variable names.
const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  ...buildMetadata(),
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  applicationName: siteConfig.name,
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
