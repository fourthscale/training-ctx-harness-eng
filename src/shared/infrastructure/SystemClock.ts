import type { Clock } from "@/shared/domain/Clock";

/** Production clock: returns the real current time. */
export class SystemClock implements Clock {
  now(): Date {
    return new Date();
  }
}
