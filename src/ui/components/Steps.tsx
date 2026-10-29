import type { LandingPageView } from "@/modules/landing/application/GetLandingPage";

interface StepsProps {
  title: string;
  steps: LandingPageView["steps"];
}

export function Steps({ title, steps }: StepsProps) {
  return (
    <section className="section">
      <h2>{title}</h2>
      <ol className="steps">
        {steps.map((step) => (
          <li key={step.position} className="step">
            <span className="step-number">{step.position}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
