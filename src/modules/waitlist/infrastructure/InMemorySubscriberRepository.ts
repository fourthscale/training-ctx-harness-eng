import type { Email } from "../domain/Email";
import type { Subscriber } from "../domain/Subscriber";
import type { SubscriberRepository } from "../domain/SubscriberRepository";

/** In-memory adapter: handy for tests and for running without a file. */
export class InMemorySubscriberRepository implements SubscriberRepository {
  private readonly subscribers: Subscriber[] = [];

  async existsByEmail(email: Email): Promise<boolean> {
    return this.subscribers.some((s) => s.email.equals(email));
  }

  async save(subscriber: Subscriber): Promise<void> {
    this.subscribers.push(subscriber);
  }

  all(): readonly Subscriber[] {
    return this.subscribers;
  }
}
