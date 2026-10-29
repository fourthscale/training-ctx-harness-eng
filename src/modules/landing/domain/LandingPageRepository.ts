import type { Locale } from "@/shared/domain/Locale";
import type { LandingPage } from "./LandingPage";

/** Port: the domain states what it needs, the infrastructure decides how. */
export interface LandingPageRepository {
  get(locale: Locale): Promise<LandingPage>;
}
