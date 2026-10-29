import type { LandingPageView } from "@/modules/landing/application/GetLandingPage";

interface ProgramProps {
  title: string;
  chapterLabel: string;
  chapters: LandingPageView["chapters"];
}

export function Program({ title, chapterLabel, chapters }: ProgramProps) {
  return (
    <section className="section">
      <h2>{title}</h2>
      <ol className="program">
        {chapters.map((chapter) => (
          <li key={chapter.position} className="card chapter">
            <p className="chapter-number">
              {chapterLabel} {chapter.position}
            </p>
            <h3>{chapter.title}</h3>
            <p className="chapter-tagline">{chapter.tagline}</p>
            <ul className="chapter-topics">
              {chapter.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
