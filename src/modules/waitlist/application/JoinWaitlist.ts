import type { Clock } from "@/shared/domain/Clock";
import { Email } from "../domain/Email";
import { AlreadySubscribedError } from "../domain/errors";
import { Subscriber } from "../domain/Subscriber";
import type { SubscriberRepository } from "../domain/SubscriberRepository";

export interface JoinWaitlistCommand {
  email: string;
}

export interface JoinWaitlistResult {
  email: string;
}

/** Use case: add a visitor to the waitlist. */
export class JoinWaitlist {
  constructor(
    private readonly subscribers: SubscriberRepository,
    private readonly clock: Clock,
  ) {}

  async execute(command: JoinWaitlistCommand): Promise<JoinWaitlistResult> {
    const email = Email.create(command.email);

    if (await this.subscribers.existsByEmail(email)) {
      throw new AlreadySubscribedError(email.value);
    }

    const subscriber = Subscriber.register(email, this.clock.now());
    await this.subscribers.save(subscriber);

    return { email: subscriber.email.value };
  }
}
