import type { LandingPageView } from "@/modules/landing/application/GetLandingPage";

interface FeatureGridProps {
  title: string;
  features: LandingPageView["features"];
}

export function FeatureGrid({ title, features }: FeatureGridProps) {
  return (
    <section className="section">
      <h2>{title}</h2>
      <ul className="feature-grid">
        {features.map((feature) => (
          <li key={feature.title} className="card">
            <span className="card-icon" aria-hidden="true">
              {feature.icon}
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
