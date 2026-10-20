# CSE Department Website — Frontend

This is the public website for the department. All of its data comes from the Laravel API.

The stack is Next.js 16, Bun, Tailwind, shadcn/ui, Axios and TanStack Query.

## Setup

```bash
bun install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
bun dev                      # http://localhost:3000
```

Before you push, run `bun run check`, which typechecks, lints and checks formatting. To check the production build, run `bun run build`.

## Folders

```
src/
├─ app/              # pages and layouts (folder = URL)
├─ api/
│  ├─ endpoints.ts   # all Laravel URLs
│  ├─ <feature>.ts   # API functions: getCourseDetails()
│  ├─ cached.ts      # cached versions for pages: getCachedCourseDetails()
│  └─ queryKeys.ts   # TanStack keys (only for hooks)
├─ hooks/            # TanStack hooks (only for browser interactivity)
├─ features/<x>/     # components + types for one feature
├─ components/
│  ├─ ui/            # shadcn components
│  └─ layout/        # header, footer, container
└─ lib/seo/          # buildMetadata(), JSON-LD helpers
```

## Add a new page with an API

The example here is a faculty page, `/faculty`, which loads its data from `GET /faculty`.

**1. Endpoint:** add it to `api/endpoints.ts`.

```ts
FACULTY: "/faculty",
```

**2. Type:** create `features/faculty/types.ts`.

```ts
export type FacultyMember = { slug: string; name: string; designation: string }
```

**3. API function:** create `api/faculty.ts`.

```ts
export async function getFaculty() {
  const res = await api.get<{ data: FacultyMember[] }>(ENDPOINTS.FACULTY)
  return res.data.data
}
```

**4. Cached version:** add it to `api/cached.ts`.

```ts
export async function getCachedFaculty() {
  "use cache"
  cacheLife("weeks") // how long before it refreshes on its own
  cacheTag("faculty") // lets Laravel refresh it instantly
  return getFaculty()
}
```

**5. Page:** create `app/(site)/faculty/page.tsx`.

```tsx
export const metadata = buildMetadata({
  title: "Faculty",
  description: "Meet our faculty members.",
  path: "/faculty",
})

export default async function FacultyPage() {
  const faculty = await getCachedFaculty()
  return <FacultyList faculty={faculty} />
}
```

**6. Sitemap:** add the URL to `app/sitemap.ts`.

### Detail pages

A detail page like `/faculty/[slug]` follows the same steps, with three differences:

- The API function takes the slug: `getFacultyDetails(slug)`.
- The page uses `generateMetadata` instead of `metadata`, so the title can come from the data.
- The page adds `generateStaticParams` so every member's page is built at deploy time.

## Add a component

| Kind                       | Where                                        | How                             |
| -------------------------- | -------------------------------------------- | ------------------------------- |
| Basic UI (button, dialog…) | `components/ui/`                             | `bunx shadcn@latest add dialog` |
| Used by one feature        | `features/<x>/components/`                   | Write it there                  |
| Used across the site       | `components/layout/` or `components/shared/` | Write it there                  |

Components are server components by default. Add `"use client"` at the top only when the component needs `useState`, `onClick` or hooks.

## Hooks (optional)

Use a hook only for things that change after the user does something, such as a search box, a filter or a form. Page content should use `getCached…()`, not a hook.

```ts
// hooks/useFaculty.ts  (+ FACULTY key in api/queryKeys.ts)
export const useFaculty = (options = {}) => useQuery({ queryKey: QUERY_KEYS.FACULTY, queryFn: getFaculty, ...options })
```

## How caching works

- **`getCached…()`** stores the result on the Next.js server. Every visitor gets the stored page, so Laravel is only called when the data refreshes.
- **`bun run build`** calls the APIs and saves each page as HTML. Laravel must be reachable during the build.
- **Laravel** can refresh pages right away after an admin edit:

  ```
  POST /api/revalidate
  header: x-revalidate-secret: <REVALIDATE_SECRET>
  body:   {"tag":"faculty"}
  ```

## For the Laravel team

- Allow this site's domain in `config/cors.php`.
- Return data in the API Resource shape, `{ "data": ... }`.
- Call `/api/revalidate` with the right tag after content changes.

## Note

This project uses Next.js 16, which differs from older versions. Check `node_modules/next/dist/docs/` before using a Next.js API.
