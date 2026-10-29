/**
 * Business error: a domain rule was violated.
 * Messages are meant for developers; the UI layer maps `code` to user-facing copy.
 */
export abstract class DomainError extends Error {
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
