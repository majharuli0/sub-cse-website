import { useEffect, useState } from "react"

/**
 * True once every <img> inside `ref` has finished loading (or failed), so a
 * reveal animation can wait for the photo instead of uncovering an empty frame.
 *
 * Once `armed` (the frame is near the viewport), lazy images are switched to
 * eager: a photo hidden under a closed curtain (clip-path) never counts as
 * visible, so the browser's own lazy-loading would otherwise never fetch it.
 * The `timeoutMs` safety net also starts counting from then.
 */
export function useImagesLoaded(ref: React.RefObject<HTMLElement | null>, armed = true, timeoutMs = 2500) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const images = [...el.querySelectorAll("img")]
    const isDone = (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
    let frame = 0

    const check = () => {
      if (images.every(isDone)) frame = requestAnimationFrame(() => setLoaded(true))
    }
    const fail = () => setLoaded(true)
    images.forEach((img) => {
      img.addEventListener("load", check)
      img.addEventListener("error", fail)
    })
    check()

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", check)
        img.removeEventListener("error", fail)
      })
      cancelAnimationFrame(frame)
    }
  }, [ref])

  useEffect(() => {
    if (!armed) return
    ref.current?.querySelectorAll("img").forEach((img) => {
      if (img.loading === "lazy") img.loading = "eager"
    })
    const fallback = setTimeout(() => setLoaded(true), timeoutMs)
    return () => clearTimeout(fallback)
  }, [armed, ref, timeoutMs])

  return loaded
}
