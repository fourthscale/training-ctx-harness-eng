import { DomainError } from "@/shared/domain/DomainError";

export class InvalidLandingPageError extends DomainError {
  readonly code = "INVALID_LANDING_PAGE";
}
