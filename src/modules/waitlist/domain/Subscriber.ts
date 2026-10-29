import { Email } from "./Email";

/** Entity: a person on the waitlist, identified by their email. */
export class Subscriber {
  private constructor(
    readonly email: Email,
    readonly subscribedAt: Date,
  ) {}

  static register(email: Email, now: Date): Subscriber {
    return new Subscriber(email, now);
  }

  /** Rebuilds an entity that was already persisted. */
  static restore(email: string, subscribedAt: string): Subscriber {
    return new Subscriber(Email.create(email), new Date(subscribedAt));
  }
}
