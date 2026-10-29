"use client";

import { useActionState } from "react";
import { joinWaitlistAction } from "@/app/actions";
import { initialWaitlistFormState } from "./WaitlistFormState";

interface WaitlistFormProps {
  locale: string;
  labels: { email: string; placeholder: string; submit: string; pending: string };
}

export function WaitlistForm({ locale, labels }: WaitlistFormProps) {
  const [state, formAction, isPending] = useActionState(
    joinWaitlistAction,
    initialWaitlistFormState,
  );

  return (
    <form action={formAction} className="waitlist-form">
      <input type="hidden" name="locale" value={locale} />
      <label htmlFor="email" className="sr-only">
        {labels.email}
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder={labels.placeholder}
        autoComplete="email"
      />
      <button type="submit" className="button" disabled={isPending}>
        {isPending ? labels.pending : labels.submit}
      </button>
      {state.status !== "idle" && (
        <p role="status" className={`form-message ${state.status}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
