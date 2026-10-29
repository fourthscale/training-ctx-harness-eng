import { DEFAULT_LOCALE, isLocale, type Locale } from "@/shared/domain/Locale";

/**
 * Picks the best supported locale from an Accept-Language header,
 * e.g. "en-US,en;q=0.9,fr;q=0.8" gives "en". Falls back to the default locale.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const candidates = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        language: tag.split("-")[0].toLowerCase(),
        quality: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .filter((c) => c.language && c.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  return candidates.map((c) => c.language).find(isLocale) ?? DEFAULT_LOCALE;
}
