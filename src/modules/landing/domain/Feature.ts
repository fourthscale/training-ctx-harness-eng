import { InvalidLandingPageError } from "./InvalidLandingPageError";

export interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

/** Value object: a key selling point highlighted on the landing page. */
export class Feature {
  private constructor(
    readonly icon: string,
    readonly title: string,
    readonly description: string,
  ) {}

  static create({ icon, title, description }: FeatureProps): Feature {
    if (!title.trim()) {
      throw new InvalidLandingPageError("A feature must have a title.");
    }
    if (!description.trim()) {
      throw new InvalidLandingPageError(`Feature "${title}" must have a description.`);
    }
    return new Feature(icon.trim(), title.trim(), description.trim());
  }
}
