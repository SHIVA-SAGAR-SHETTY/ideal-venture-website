import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata({ lang, path: "/services", title: t.services.title, description: t.services.lead });
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const s = t.services;

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} lead={s.lead} image="/images/projects/star-steel-interior.webp" />

      <section className="py-20 lg:py-28">
        <ul className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id}>
              <ServiceCard service={service} lang={lang} index={i} />
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="blueprint bg-ink py-20 text-white lg:py-28">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow={s.eyebrow} title={s.processTitle} />
          <ol className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {s.process.map((step, i) => (
              <Reveal as="li" key={step.title} className="relative bg-ink p-7">
                <span className="display text-6xl text-white/10">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-2xl font-bold text-brand uppercase rtl:normal-case">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
    </>
  );
}
