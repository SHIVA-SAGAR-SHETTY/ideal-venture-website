import { notFound } from "next/navigation";
import { BadgeCheck, ExternalLink, Landmark, ShieldCheck } from "lucide-react";
import { getDictionary } from "@/i18n";
import { hasLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/content/company";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { LogoMark } from "@/components/Logo";

export async function generateMetadata({ params }: PageProps<"/[lang]/credentials">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata({ lang, path: "/credentials", title: t.credentials.title, description: t.credentials.lead });
}

const formatDate = (lang: Locale, iso: string) =>
  new Intl.DateTimeFormat(lang === "ar" ? "ar-AE" : "en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(iso));

export default async function CredentialsPage({ params }: PageProps<"/[lang]/credentials">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const c = t.credentials;
  const lic = company.license;

  const rows: [string, string, boolean?][] = [
    [c.fields.company, company.name[lang]],
    [c.fields.number, lic.number, true],
    [c.fields.dcci, lic.dcci, true],
    [c.fields.legalType, lic.legalType[lang]],
    [c.fields.activity, lic.activity[lang]],
    [c.fields.issued, formatDate(lang, lic.issued)],
    [c.fields.expires, formatDate(lang, lic.expires)],
    [c.fields.authority, lic.authority[lang]],
  ];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} image="/images/projects/caterpillar-jafza.webp" />

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          {/* Licence card styled like a drawing title block */}
          <Reveal className="relative overflow-hidden border-2 border-ink bg-white lg:col-span-7">
            <div className="flex items-center justify-between gap-4 bg-ink px-6 py-4 text-white">
              <h2 className="flex items-center gap-3 font-display text-xl font-bold uppercase rtl:normal-case">
                <BadgeCheck className="h-6 w-6 text-brand" aria-hidden="true" />
                {c.licenseTitle}
              </h2>
              <span className="font-display text-sm tracking-widest text-white/60">DET · DUBAI</span>
            </div>
            <dl className="divide-y divide-line">
              {rows.map(([label, value, mono]) => (
                <div key={label} className="grid gap-1 px-6 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-muted">{label}</dt>
                  <dd className={`font-semibold text-ink ${mono ? "font-display text-2xl tracking-wider" : ""}`} dir={mono ? "ltr" : undefined}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-line bg-paper px-6 py-5">
              <a href={lic.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
                {c.verify}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <LogoMark className="pointer-events-none absolute -end-10 -bottom-10 h-48 w-48 text-ink/[0.04]" />
          </Reveal>

          <div className="space-y-6 lg:col-span-5">
            <Reveal className="border border-line bg-white p-7">
              <Landmark className="h-9 w-9 text-brand-deep" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="display mt-5 text-3xl">{c.authoritiesTitle}</h2>
              <p className="mt-3 text-muted">{c.authoritiesLead}</p>
              <ul className="mt-6 space-y-3">
                {company.authorities.map((a) => (
                  <li key={a.en} className="flex items-start gap-3 font-semibold">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-brand" />
                    {a[lang]}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="border border-line bg-white p-7">
              <ShieldCheck className="h-9 w-9 text-brand-deep" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="display mt-5 text-3xl">{c.qhseTitle}</h2>
              <p className="mt-3 leading-relaxed text-muted">{c.qhseBody}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2 py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading eyebrow={t.common.client} title={t.home.clientsTitle} />
          <ul className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {company.clients.map((name) => (
              <Reveal as="li" key={name} className="flex min-h-20 items-center justify-center bg-paper-2 p-4 text-center">
                <span className="font-display text-lg font-semibold text-ink/70 uppercase">{name}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
    </>
  );
}
