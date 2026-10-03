import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/** Sends locale-less URLs (e.g. "/" or "/projects") to /en or /ar based on the browser language. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const prefersArabic = /^ar\b/.test(accept.trim()) || (accept.includes("ar") && !accept.includes("en"));
  const locale = prefersArabic ? "ar" : defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip API routes, Next internals, metadata files and anything with a file extension.
  matcher: ["/((?!api|_next|.*\\..*|sitemap.xml|robots.txt).*)"],
};
