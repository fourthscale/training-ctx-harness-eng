import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Locale } from "@/shared/domain/Locale";
import { LandingPage, type LandingPageProps } from "../domain/LandingPage";
import type { LandingPageRepository } from "../domain/LandingPageRepository";

/**
 * Adapter: reads the page content from one JSON file per locale
 * (`landing-page.<locale>.json`). No database.
 */
export class JsonFileLandingPageRepository implements LandingPageRepository {
  constructor(private readonly contentDir: string) {}

  async get(locale: Locale): Promise<LandingPage> {
    const raw = await readFile(join(this.contentDir, `landing-page.${locale}.json`), "utf-8");
    const props = JSON.parse(raw) as LandingPageProps;
    return LandingPage.create(props);
  }
}
