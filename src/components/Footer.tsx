import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { href, type Locale } from "@/lib/i18n";
import { company, whatsappLink } from "@/content/company";
import type { Dictionary } from "@/i18n/en";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const nav = [
    ["/about", t.nav.about],
    ["/services", t.nav.services],
    ["/projects", t.nav.projects],
    ["/credentials", t.nav.credentials],
    ["/contact", t.nav.contact],
  ] as const;

  return (
    <footer className="blueprint relative overflow-hidden bg-ink pb-20 text-white/70 md:pb-0">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <Logo lang={lang} tone="light" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">{t.footer.tagline}</p>
          <a href={whatsappLink(t.common.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-8">
            {t.common.whatsapp}
          </a>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-brand">{t.footer.explore}</h2>
          <ul className="mt-5 space-y-3">
            {nav.map(([path, label]) => (
              <li key={path}>
                <Link href={href(lang, path)} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="eyebrow text-brand">{t.footer.contact}</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span>{company.contact.address[lang]}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <a href={company.contact.phoneHref} dir="ltr" className="hover:text-white">
                {company.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <a href={`mailto:${company.contact.email}`} className="break-all hover:text-white">
                {company.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name[lang]}. {t.footer.rights}
          </p>
          <p>
            {t.footer.licence}: <span dir="ltr">DET {company.license.number}</span> · DCCI {company.license.dcci}
          </p>
        </div>
      </div>
    </footer>
  );
}
