import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Barlow_Condensed, IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactDock } from "@/components/ContactDock";
import { getDictionary } from "@/i18n";
import { dirOf, hasLocale, locales } from "@/lib/i18n";
import { organizationJsonLd, pageMetadata, siteUrl } from "@/lib/seo";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0a1622",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return {
    ...pageMetadata({ lang, description: t.meta.description }),
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s | ${lang === "ar" ? "ايديال فينتشر" : "Ideal Venture"}` },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${manrope.variable} ${barlow.variable} ${arabic.variable}`}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[70] focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Header lang={lang} nav={t.nav} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <ContactDock t={t.common} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(lang)) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
