import { DEFAULT_LOCALE } from "@/shared/domain/Locale";
import { negotiateLocale } from "./negotiateLocale";

describe("negotiateLocale", () => {
  it.each([
    ["en-US,en;q=0.9,fr;q=0.8", "en"],
    ["fr-FR,fr;q=0.9,en;q=0.8", "fr"],
    ["de-DE,de;q=0.9,en;q=0.5", "en"],
    ["fr;q=0.3,en;q=0.7", "en"],
  ])("picks the best supported locale from %p", (header, expected) => {
    expect(negotiateLocale(header)).toBe(expected);
  });

  it.each([null, "", "de-DE,es;q=0.8", "en;q=0"])(
    "falls back to the default locale for %p",
    (header) => {
      expect(negotiateLocale(header)).toBe(DEFAULT_LOCALE);
    },
  );
});
