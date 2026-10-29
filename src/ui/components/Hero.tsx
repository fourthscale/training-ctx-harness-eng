import type { LandingPageView } from "@/modules/landing/application/GetLandingPage";

interface HeroProps {
  hero: LandingPageView["hero"];
}

export function Hero({ hero }: HeroProps) {
  return (
    <section className="hero">
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1>{hero.title}</h1>
      <p className="subtitle">{hero.subtitle}</p>
      <a href="#waitlist" className="button">
        {hero.ctaLabel}
      </a>
    </section>
  );
}
