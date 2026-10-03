import type { Metadata } from "next";
import { locales, type Locale } from "./i18n";
import { company } from "@/content/company";

/** Set NEXT_PUBLIC_SITE_URL in Vercel once the custom domain is live. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

type Args = { lang: Locale; path?: string; title?: string; description: string; image?: string };

export function pageMetadata({ lang, path = "", title, description, image }: Args): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l === "ar" ? "ar-AE" : "en-AE", `/${l}${path}`]));
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: { ...languages, "x-default": `/en${path}` },
    },
    openGraph: {
      type: "website",
      siteName: company.name[lang],
      locale: lang === "ar" ? "ar_AE" : "en_AE",
      url: `/${lang}${path}`,
      title: title ?? company.name[lang],
      description,
      ...(image && { images: [{ url: image }] }),
    },
  };
}

export function organizationJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteUrl}/#organization`,
    name: company.name.en,
    alternateName: [company.name.ar, company.initials],
    url: `${siteUrl}/${lang}`,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/images/projects/mubarak-sons-dic.webp`,
    telephone: company.contact.phoneDisplay.replace(/\s/g, ""),
    email: company.contact.email,
    foundingDate: String(company.founded),
    founder: { "@type": "Person", name: company.owner.name.en },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office 220, Lootah Building",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    areaServed: ["Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Abu Dhabi", "United Arab Emirates"],
    identifier: { "@type": "PropertyValue", propertyID: "Dubai Commercial License", value: company.license.number },
    knowsLanguage: ["en", "ar"],
  };
}
