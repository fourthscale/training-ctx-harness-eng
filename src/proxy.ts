import { NextResponse, type NextRequest } from "next/server";
import { negotiateLocale } from "@/i18n/negotiateLocale";

/** Sends visitors hitting "/" to the locale that best matches their browser. */
export function proxy(request: NextRequest) {
  const locale = negotiateLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
