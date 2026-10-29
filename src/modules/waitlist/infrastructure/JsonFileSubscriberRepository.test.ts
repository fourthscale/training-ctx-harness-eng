import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Email } from "../domain/Email";
import { Subscriber } from "../domain/Subscriber";
import { JsonFileSubscriberRepository } from "./JsonFileSubscriberRepository";

describe("JsonFileSubscriberRepository", () => {
  let dir: string;
  let filePath: string;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "waitlist-"));
    filePath = join(dir, "subscribers.json");
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it("treats a missing file as an empty list", async () => {
    const repository = new JsonFileSubscriberRepository(filePath);

    expect(await repository.existsByEmail(Email.create("ada@example.com"))).toBe(false);
  });

  it("persists subscribers to the JSON file", async () => {
    const repository = new JsonFileSubscriberRepository(filePath);
    const email = Email.create("ada@example.com");

    await repository.save(Subscriber.register(email, new Date("2026-01-15T09:00:00Z")));

    expect(await repository.existsByEmail(email)).toBe(true);
    expect(JSON.parse(await readFile(filePath, "utf-8"))).toEqual([
      { email: "ada@example.com", subscribedAt: "2026-01-15T09:00:00.000Z" },
    ]);
  });
});
