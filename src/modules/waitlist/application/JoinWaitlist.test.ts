import type { Clock } from "@/shared/domain/Clock";
import { AlreadySubscribedError, InvalidEmailError } from "../domain/errors";
import { InMemorySubscriberRepository } from "../infrastructure/InMemorySubscriberRepository";
import { JoinWaitlist } from "./JoinWaitlist";

const fixedNow = new Date("2026-01-15T09:00:00Z");
const fixedClock: Clock = { now: () => fixedNow };

describe("JoinWaitlist", () => {
  let repository: InMemorySubscriberRepository;
  let joinWaitlist: JoinWaitlist;

  beforeEach(() => {
    repository = new InMemorySubscriberRepository();
    joinWaitlist = new JoinWaitlist(repository, fixedClock);
  });

  it("registers a new visitor with the clock's date", async () => {
    const result = await joinWaitlist.execute({ email: "Ada@Example.com" });

    expect(result).toEqual({ email: "ada@example.com" });
    expect(repository.all()).toHaveLength(1);
    expect(repository.all()[0].subscribedAt).toEqual(fixedNow);
  });

  it("rejects an address already registered, whatever its casing", async () => {
    await joinWaitlist.execute({ email: "ada@example.com" });

    await expect(joinWaitlist.execute({ email: "ADA@example.com" })).rejects.toThrow(
      AlreadySubscribedError,
    );
    expect(repository.all()).toHaveLength(1);
  });

  it("rejects an invalid address without saving anything", async () => {
    await expect(joinWaitlist.execute({ email: "not-an-email" })).rejects.toThrow(
      InvalidEmailError,
    );
    expect(repository.all()).toHaveLength(0);
  });
});
