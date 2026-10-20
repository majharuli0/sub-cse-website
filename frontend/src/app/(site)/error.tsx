"use client"

import { useEffect } from "react"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

export default function SiteError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Hook an error reporting service in here.
    console.error(error)
  }, [error])

  return (
    <Container className="space-y-4 py-24 text-center">
      <h1 className="font-heading text-3xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">We couldn&apos;t load this page. Please try again.</p>
      <Button onClick={() => retry()}>Try again</Button>
    </Container>
  )
}
