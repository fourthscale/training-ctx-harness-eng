import { DomainError } from "@/shared/domain/DomainError";

export class InvalidEmailError extends DomainError {
  readonly code = "INVALID_EMAIL";

  constructor(value: string) {
    super(`"${value}" is not a valid email address.`);
  }
}

export class AlreadySubscribedError extends DomainError {
  readonly code = "ALREADY_SUBSCRIBED";

  constructor(email: string) {
    super(`${email} is already on the waitlist.`);
  }
}
