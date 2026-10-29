import Link from "next/link";

interface LocaleSwitcherProps {
  locales: readonly string[];
  current: string;
  label: string;
}

export function LocaleSwitcher({ locales, current, label }: LocaleSwitcherProps) {
  return (
    <ul className="locale-switcher" aria-label={label}>
      {locales.map((locale) => (
        <li key={locale}>
          <Link
            href={`/${locale}`}
            hrefLang={locale}
            aria-current={locale === current ? "page" : undefined}
          >
            {locale.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
}
