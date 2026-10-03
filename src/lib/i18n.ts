export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A string that exists in every supported language. */
export type Localized = Record<Locale, string>;

export const dirOf = (lang: Locale) => (lang === "ar" ? "rtl" : "ltr");

/** Prefix an internal path with the active locale: href("ar", "/projects") -> "/ar/projects". */
export const href = (lang: Locale, path = "/") =>
  path === "/" ? `/${lang}` : `/${lang}${path}`;

const numberLocale: Record<Locale, string> = { en: "en-US", ar: "ar-AE" };

export const formatNumber = (lang: Locale, value: number) =>
  new Intl.NumberFormat(numberLocale[lang], { maximumFractionDigits: 0 }).format(value);
