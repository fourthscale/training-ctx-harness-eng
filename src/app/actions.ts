"use server";

import { container } from "@/container";
import { getMessages } from "@/i18n/messages";
import { DEFAULT_LOCALE, isLocale } from "@/shared/domain/Locale";
import { DomainError } from "@/shared/domain/DomainError";
import type { WaitlistFormState } from "@/ui/components/WaitlistFormState";

/**
 * Inbound adapter: turns an HTTP form into a business command,
 * then turns the result (or the business error) into a localized display state.
 */
export async function joinWaitlistAction(
  _previous: WaitlistFormState,
  formData: FormData,
): Promise<WaitlistFormState> {
  const email = String(formData.get("email") ?? "");
  const requestedLocale = String(formData.get("locale") ?? "");
  const t = getMessages(isLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE).contact;

  try {
    const result = await container.joinWaitlist.execute({ email });
    return { status: "success", message: t.success.replace("{email}", result.email) };
  } catch (error) {
    if (error instanceof DomainError && error.code in t.errors) {
      return { status: "error", message: t.errors[error.code as keyof typeof t.errors] };
    }
    console.error(error);
    return { status: "error", message: t.errors.UNEXPECTED };
  }
}
