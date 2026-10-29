import { LandingPage } from "../domain/LandingPage";
import type { LandingPageRepository } from "../domain/LandingPageRepository";
import { GetLandingPage } from "./GetLandingPage";

describe("GetLandingPage", () => {
  it("exposes the page as a DTO with numbered chapters and steps", async () => {
    const page = LandingPage.create({
      brand: "Acme",
      hero: { eyebrow: "E", title: "T", subtitle: "S", ctaLabel: "C" },
      features: [{ icon: "🧪", title: "Tests", description: "Loop on the tests." }],
      chapters: [
        { title: "Context", tagline: "What the agent knows.", topics: ["Overview", "Window"] },
      ],
      steps: [
        { title: "Explore", description: "Read." },
        { title: "Plan", description: "Propose." },
      ],
    });
    const repository: LandingPageRepository = { get: async () => page };

    const view = await new GetLandingPage(repository).execute("en");

    expect(view.chapters).toEqual([
      {
        position: 1,
        title: "Context",
        tagline: "What the agent knows.",
        topics: ["Overview", "Window"],
      },
    ]);
    expect(view.steps).toEqual([
      { position: 1, title: "Explore", description: "Read." },
      { position: 2, title: "Plan", description: "Propose." },
    ]);
    expect(view.features).toEqual([
      { icon: "🧪", title: "Tests", description: "Loop on the tests." },
    ]);
  });
});
