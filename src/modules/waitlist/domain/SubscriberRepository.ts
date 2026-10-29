import type { Email } from "./Email";
import type { Subscriber } from "./Subscriber";

export interface SubscriberRepository {
  existsByEmail(email: Email): Promise<boolean>;
  save(subscriber: Subscriber): Promise<void>;
}
