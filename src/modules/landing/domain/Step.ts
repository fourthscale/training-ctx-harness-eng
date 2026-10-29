import { InvalidLandingPageError } from "./InvalidLandingPageError";

export interface StepProps {
  title: string;
  description: string;
}

/** Value object: one step of the training format. */
export class Step {
  private constructor(
    readonly title: string,
    readonly description: string,
  ) {}

  static create({ title, description }: StepProps): Step {
    if (!title.trim() || !description.trim()) {
      throw new InvalidLandingPageError("A step must have a title and a description.");
    }
    return new Step(title.trim(), description.trim());
  }
}
