import { notFound } from "next/navigation";
import { container } from "@/container";
import { getMessages } from "@/i18n/messages";
import { isLocale, LOCALES } from "@/shared/domain/Locale";
import { FeatureGrid } from "@/ui/components/FeatureGrid";
import { Hero } from "@/ui/components/Hero";
import { LocaleSwitcher } from "@/ui/components/LocaleSwitcher";
import { Program } from "@/ui/components/Program";
import { Steps } from "@/ui/components/Steps";
import { WaitlistForm } from "@/ui/components/WaitlistForm";

// Content is read on every request, so content/*.json can be edited without a rebuild.
export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const page = await container.getLandingPage.execute(locale);
  const t = getMessages(locale);

  return (
    <>
      <header className="topbar">
        <span className="brand">{page.brand}</span>
        <nav className="topbar-nav">
          <a href="#waitlist" className="topbar-link">
            {page.hero.ctaLabel}
          </a>
          <LocaleSwitcher locales={LOCALES} current={locale} label={t.localeSwitcher.label} />
        </nav>
      </header>
      <main>
        <Hero hero={page.hero} />
        <FeatureGrid title={t.sections.features} features={page.features} />
        <Program
          title={t.sections.program}
          chapterLabel={t.sections.chapterLabel}
          chapters={page.chapters}
        />
        <Steps title={t.sections.format} steps={page.steps} />
        <section id="waitlist" className="section waitlist">
          <h2>{t.contact.title}</h2>
          <p>{t.contact.text}</p>
          <WaitlistForm
            locale={locale}
            labels={{
              email: t.contact.emailLabel,
              placeholder: t.contact.emailPlaceholder,
              submit: page.hero.ctaLabel,
              pending: t.contact.pending,
            }}
          />
        </section>
      </main>
      <footer className="footer">
        {page.brand} · {t.footer}
      </footer>
    </>
  );
}
