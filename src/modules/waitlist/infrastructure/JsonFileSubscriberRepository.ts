import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { Email } from "../domain/Email";
import { Subscriber } from "../domain/Subscriber";
import type { SubscriberRepository } from "../domain/SubscriberRepository";

interface SubscriberRecord {
  email: string;
  subscribedAt: string;
}

/**
 * Adapter: stores subscribers in a JSON file.
 * Deliberately naive (no locking): it is a fake database for training purposes.
 */
export class JsonFileSubscriberRepository implements SubscriberRepository {
  constructor(private readonly filePath: string) {}

  async existsByEmail(email: Email): Promise<boolean> {
    const subscribers = await this.readAll();
    return subscribers.some((s) => s.email.equals(email));
  }

  async save(subscriber: Subscriber): Promise<void> {
    const subscribers = await this.readAll();
    subscribers.push(subscriber);

    const records: SubscriberRecord[] = subscribers.map((s) => ({
      email: s.email.value,
      subscribedAt: s.subscribedAt.toISOString(),
    }));
    await mkdir(dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, JSON.stringify(records, null, 2), "utf-8");
  }

  private async readAll(): Promise<Subscriber[]> {
    try {
      const raw = await readFile(this.filePath, "utf-8");
      const records = JSON.parse(raw) as SubscriberRecord[];
      return records.map((r) => Subscriber.restore(r.email, r.subscribedAt));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    }
  }
}
