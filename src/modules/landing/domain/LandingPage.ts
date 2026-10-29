import { Chapter, type ChapterProps } from "./Chapter";
import { Feature, type FeatureProps } from "./Feature";
import { InvalidLandingPageError } from "./InvalidLandingPageError";
import { Step, type StepProps } from "./Step";

export interface Hero {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export interface LandingPageProps {
  brand: string;
  hero: Hero;
  features: FeatureProps[];
  chapters: ChapterProps[];
  steps: StepProps[];
}

export const MAX_FEATURES = 6;

/**
 * Aggregate root: the full content of the landing page.
 * Every content consistency rule is enforced here, at creation time.
 */
export class LandingPage {
  private constructor(
    readonly brand: string,
    readonly hero: Readonly<Hero>,
    readonly features: readonly Feature[],
    readonly chapters: readonly Chapter[],
    readonly steps: readonly Step[],
  ) {}

  static create(props: LandingPageProps): LandingPage {
    if (!props.brand.trim()) {
      throw new InvalidLandingPageError("Brand is required.");
    }
    if (!props.hero.title.trim()) {
      throw new InvalidLandingPageError("Hero must have a title.");
    }

    const features = props.features.map(Feature.create);
    if (features.length === 0) {
      throw new InvalidLandingPageError("At least one feature is required.");
    }
    if (features.length > MAX_FEATURES) {
      throw new InvalidLandingPageError(
        `No more than ${MAX_FEATURES} features, otherwise the message gets diluted.`,
      );
    }
    const titles = new Set(features.map((f) => f.title.toLowerCase()));
    if (titles.size !== features.length) {
      throw new InvalidLandingPageError("Two features share the same title.");
    }

    const chapters = props.chapters.map(Chapter.create);
    if (chapters.length === 0) {
      throw new InvalidLandingPageError("The program must have at least one chapter.");
    }

    const steps = props.steps.map(Step.create);

    return new LandingPage(
      props.brand.trim(),
      { ...props.hero },
      features,
      chapters,
      steps,
    );
  }
}
