/** Port for reading the current time, injected so the domain stays testable. */
export interface Clock {
  now(): Date;
}
