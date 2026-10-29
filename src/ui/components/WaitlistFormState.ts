export type WaitlistFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export const initialWaitlistFormState: WaitlistFormState = { status: "idle" };
