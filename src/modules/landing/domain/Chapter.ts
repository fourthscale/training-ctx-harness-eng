import { InvalidLandingPageError } from "./InvalidLandingPageError";

export interface ChapterProps {
  title: string;
  tagline: string;
  topics: string[];
}

/** Value object: one part of the training program and its topics. */
export class Chapter {
  private constructor(
    readonly title: string,
    readonly tagline: string,
    readonly topics: readonly string[],
  ) {}

  static create({ title, tagline, topics }: ChapterProps): Chapter {
    if (!title.trim()) {
      throw new InvalidLandingPageError("A chapter must have a title.");
    }
    const cleanTopics = topics.map((t) => t.trim()).filter(Boolean);
    if (cleanTopics.length === 0) {
      throw new InvalidLandingPageError(`Chapter "${title}" must have at least one topic.`);
    }
    return new Chapter(title.trim(), tagline.trim(), cleanTopics);
  }
}
