import { notFound } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { getDictionary } from "@/i18n";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { company, whatsappLink } from "@/content/company";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata({ lang, path: "/contact", title: t.contact.title, description: t.contact.lead });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const c = t.contact;
  const map = `https://www.google.com/maps?q=${encodeURIComponent(company.contact.mapQuery)}&hl=${lang}&output=embed`;

  const items = [
    { icon: Phone, label: t.common.call, value: company.contact.phoneDisplay, href: company.contact.phoneHref, ltr: true },
    { icon: Mail, label: t.common.email, value: company.contact.email, href: `mailto:${company.contact.email}`, ltr: true },
    { icon: MapPin, label: c.detailsTitle, value: company.contact.address[lang] },
  ];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} image="/images/projects/villa-al-khawaneej.webp" />

      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="border border-line bg-white p-6 sm:p-10 lg:col-span-7">
            <h2 className="display text-3xl sm:text-4xl">{c.form.title}</h2>
            <div className="relative mt-8">
              <QuoteForm t={c.form} lang={lang} />
            </div>
          </Reveal>

          <div className="space-y-4 lg:col-span-5">
            <Reveal>
              <a
                href={whatsappLink(t.common.whatsappGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 bg-[#1fae5b] p-6 text-white transition-colors hover:bg-[#178a48]"
              >
                <WhatsAppIcon className="h-10 w-10 shrink-0" />
                <span>
                  <span className="block font-display text-2xl font-bold uppercase rtl:normal-case">{t.common.whatsapp}</span>
                  <span className="block text-white/85" dir="ltr">
                    {company.contact.phoneDisplay}
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal>
              <ul className="divide-y divide-line border border-line bg-white">
                {items.map(({ icon: Icon, label, value, href, ltr }) => (
                  <li key={label} className="flex gap-4 p-6">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-muted">{label}</p>
                      {href ? (
                        <a href={href} dir={ltr ? "ltr" : undefined} className="mt-1 block font-semibold break-all text-ink hover:text-brand-deep">
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 font-semibold text-ink">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="relative aspect-[4/3] overflow-hidden border border-line bg-paper-2">
              <iframe
                title={company.contact.address[lang]}
                src={map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[40%]"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
