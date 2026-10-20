import { revalidateTag } from "next/cache"

import { CACHE_TAGS } from "@/api/cached"

/**
 * Laravel calls this after an admin edits content, so pages update right away:
 *   POST /api/revalidate   header x-revalidate-secret: <secret>   body {"tag":"courses"}
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  if (!Object.values(CACHE_TAGS).includes(body.tag)) {
    return Response.json({ message: "Unknown tag" }, { status: 400 })
  }

  revalidateTag(body.tag, { expire: 0 })
  return Response.json({ revalidated: body.tag })
}
