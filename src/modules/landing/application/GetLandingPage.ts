import type { Locale } from "@/shared/domain/Locale";
import type { LandingPageRepository } from "../domain/LandingPageRepository";

/** DTO exposed to the UI: plain data, no business behavior. */
export interface LandingPageView {
  brand: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
  };
  features: { icon: string; title: string; description: string }[];
  chapters: { position: number; title: string; tagline: string; topics: string[] }[];
  steps: { position: number; title: string; description: string }[];
}

/** Use case: read the landing page content and expose it as a view. */
export class GetLandingPage {
  constructor(private readonly repository: LandingPageRepository) {}

  async execute(locale: Locale): Promise<LandingPageView> {
    const page = await this.repository.get(locale);

    return {
      brand: page.brand,
      hero: { ...page.hero },
      features: page.features.map(({ icon, title, description }) => ({
        icon,
        title,
        description,
      })),
      chapters: page.chapters.map(({ title, tagline, topics }, index) => ({
        position: index + 1,
        title,
        tagline,
        topics: [...topics],
      })),
      steps: page.steps.map(({ title, description }, index) => ({
        position: index + 1,
        title,
        description,
      })),
    };
  }
}
