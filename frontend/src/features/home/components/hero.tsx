import { HeroCarousel } from "@/features/home/components/hero-carousel"
import { heroContent, heroSlides } from "@/features/home/data/hero"

export function Hero() {
  return <HeroCarousel slides={heroSlides} content={heroContent} />
}
