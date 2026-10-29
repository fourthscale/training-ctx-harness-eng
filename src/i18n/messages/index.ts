import type { Locale } from "@/shared/domain/Locale";
import { en } from "./en";
import { fr } from "./fr";

/** Shape of a UI dictionary, derived from the French reference. */
export type Messages = typeof fr;

const dictionaries: Record<Locale, Messages> = { fr, en };

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}
