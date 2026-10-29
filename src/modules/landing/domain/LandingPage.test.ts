import { InvalidLandingPageError } from "./InvalidLandingPageError";
import { LandingPage, MAX_FEATURES, type LandingPageProps } from "./LandingPage";

function validProps(overrides: Partial<LandingPageProps> = {}): LandingPageProps {
  return {
    brand: "Acme",
    hero: { eyebrow: "Training", title: "Title", subtitle: "Subtitle", ctaLabel: "Go" },
    features: [{ icon: "🧪", title: "Tests", description: "Loop on the tests." }],
    chapters: [{ title: "Context", tagline: "What the agent knows.", topics: ["Overview"] }],
    steps: [{ title: "Explore", description: "Read the code." }],
    ...overrides,
  };
}

const feature = (title: string) => ({ icon: "•", title, description: "Description" });

describe("LandingPage", () => {
  it("creates a valid page", () => {
    const page = LandingPage.create(validProps());

    expect(page.brand).toBe("Acme");
    expect(page.features.map((f) => f.title)).toEqual(["Tests"]);
  });

  it("requires a brand", () => {
    expect(() => LandingPage.create(validProps({ brand: "  " }))).toThrow(/Brand is required/);
  });

  it("requires a hero title", () => {
    const hero = { eyebrow: "Training", title: " ", subtitle: "Subtitle", ctaLabel: "Go" };

    expect(() => LandingPage.create(validProps({ hero }))).toThrow(/Hero must have a title/);
  });

  it("rejects a feature without a title", () => {
    const features = [{ icon: "•", title: " ", description: "Description" }];

    expect(() => LandingPage.create(validProps({ features }))).toThrow(
      /feature must have a title/,
    );
  });

  it.each([
    { title: " ", description: "Read the code." },
    { title: "Explore", description: " " },
  ])("rejects a step without a title or description: %p", (step) => {
    expect(() => LandingPage.create(validProps({ steps: [step] }))).toThrow(
      /step must have a title and a description/,
    );
  });

  it("rejects a chapter without a title", () => {
    const chapters = [{ title: " ", tagline: "", topics: ["Overview"] }];

    expect(() => LandingPage.create(validProps({ chapters }))).toThrow(
      /chapter must have a title/,
    );
  });

  it("requires at least one feature", () => {
    expect(() => LandingPage.create(validProps({ features: [] }))).toThrow(
      InvalidLandingPageError,
    );
  });

  it(`rejects more than ${MAX_FEATURES} features`, () => {
    const features = Array.from({ length: MAX_FEATURES + 1 }, (_, i) => feature(`F${i}`));

    expect(() => LandingPage.create(validProps({ features }))).toThrow(/No more than/);
  });

  it("rejects two features with the same title (case-insensitive)", () => {
    const features = [feature("Tests"), feature("tests")];

    expect(() => LandingPage.create(validProps({ features }))).toThrow(/same title/);
  });

  it("requires at least one chapter in the program", () => {
    expect(() => LandingPage.create(validProps({ chapters: [] }))).toThrow(/at least one chapter/);
  });

  it("rejects a chapter without topics", () => {
    const chapters = [{ title: "Context", tagline: "", topics: ["  "] }];

    expect(() => LandingPage.create(validProps({ chapters }))).toThrow(/at least one topic/);
  });

  it("rejects a feature without a description", () => {
    const features = [{ icon: "•", title: "Tests", description: "  " }];

    expect(() => LandingPage.create(validProps({ features }))).toThrow(
      InvalidLandingPageError,
    );
  });
});
