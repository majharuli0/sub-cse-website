"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import type { ApiError } from "@/api/axios"

// Every query/mutation error is typed as ApiError.
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError
  }
}

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("@tanstack/react-query-devtools").then((mod) => mod.ReactQueryDevtools))
    : () => null

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: { retry: 0 },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
