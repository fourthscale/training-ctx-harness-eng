import { join } from "node:path";
import { LOCALES } from "@/shared/domain/Locale";
import { JsonFileLandingPageRepository } from "./JsonFileLandingPageRepository";

const repository = new JsonFileLandingPageRepository(join(process.cwd(), "content"));

describe("JsonFileLandingPageRepository", () => {
  it.each(LOCALES)("loads valid content for locale %p", async (locale) => {
    const page = await repository.get(locale);

    expect(page.brand).toBe("Acme");
    expect(page.features.length).toBeGreaterThan(0);
  });

  it("has the same structure in every locale", async () => {
    const pages = await Promise.all(LOCALES.map((locale) => repository.get(locale)));
    const shape = (page: (typeof pages)[number]) => ({
      features: page.features.length,
      chapters: page.chapters.map((c) => c.topics.length),
      steps: page.steps.length,
    });

    for (const page of pages) {
      expect(shape(page)).toEqual(shape(pages[0]));
    }
  });
});
