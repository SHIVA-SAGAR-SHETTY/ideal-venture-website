import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MapPin, Quote } from "lucide-react";
import { getDictionary } from "@/i18n";
import { formatNumber, hasLocale, href } from "@/lib/i18n";
import { company, whatsappLink } from "@/content/company";
import { services } from "@/content/services";
import { categories, featuredProjects } from "@/content/projects";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const numLocale = lang === "ar" ? "ar-AE" : "en-US";
  const years = new Date().getFullYear() - company.legacyFounded;

  const stats = [
    { value: years, suffix: "+", label: t.home.stats.years },
    // Floor to 0.1M so the compact figure never overstates (1,157,254 -> 1.1M+).
    { value: Math.floor(company.stats.builtUpSqft / 100_000) * 100_000, suffix: "+", label: t.home.stats.area, compact: true },
    { value: company.stats.projects, suffix: "+", label: t.home.stats.projects },
    { value: company.stats.authorities, suffix: "", label: t.home.stats.authorities },
  ];

  const showcase = [
    "private-villas-dubai",
    "mubarak-sons-dic",
    "star-steel-hamriyah",
    "global-village",
    "caterpillar-training-center",
    "al-nakhali-poultry",
  ]
    .map((slug) => featuredProjects.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="blueprint relative overflow-hidden bg-ink pt-[4.5rem] text-white">
        <div className="pointer-events-none absolute -top-40 end-[-10%] h-[38rem] w-[38rem] rounded-full bg-brand/20 blur-[120px]" />
        <div className="container-x relative grid items-center gap-14 pt-14 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-7">
            <Reveal onLoad>
              <p className="eyebrow text-brand">{t.home.eyebrow}</p>
            </Reveal>
            <h1 className="display mt-6 text-[3.4rem] sm:text-7xl xl:text-[6.4rem]">
              <Reveal onLoad delay={0.05} as="span" className="block">
                <span className="block">{t.home.title1}</span>
              </Reveal>
              <Reveal onLoad delay={0.12} as="span" className="block">
                <span className="block text-white/90">{t.home.title2}</span>
              </Reveal>
              <Reveal onLoad delay={0.19} as="span" className="block">
                <span className="block text-brand">{t.home.title3}</span>
              </Reveal>
            </h1>
            <Reveal onLoad delay={0.28}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">{t.home.lead}</p>
            </Reveal>
            <Reveal onLoad delay={0.36} className="mt-10 flex flex-wrap gap-3">
              <Link href={href(lang, "/contact")} className="btn btn-primary">
                {t.nav.quote}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link href={href(lang, "/projects")} className="btn btn-ghost-light">
                {t.common.viewProjects}
              </Link>
              <a href={whatsappLink(t.common.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsAppIcon className="h-5 w-5" />
                {t.common.whatsapp}
              </a>
            </Reveal>
          </div>

          {/* Image composition */}
          <div className="relative lg:col-span-5">
            <Reveal onLoad delay={0.2} className="crop-marks relative ms-auto aspect-[4/5] w-[88%] sm:w-[75%] lg:w-full">
              <Image
                src="/images/projects/liftek-hamriyah.webp"
                alt="Office, warehouse and service block for Liftek in Hamriyah Free Zone"
                fill
                preload
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute end-0 bottom-0 bg-ink/85 px-4 py-3 text-xs backdrop-blur">
                <p className="font-display text-base font-bold tracking-wide uppercase rtl:normal-case">
                  {formatNumber(lang, 41_200)} {t.common.sqft}
                </p>
                <p className="mt-0.5 text-white/60">{lang === "ar" ? "المنطقة الحرة بالحمرية" : "Hamriyah Free Zone"}</p>
              </div>
            </Reveal>
            <Reveal onLoad
              delay={0.4}
              className="absolute -bottom-8 start-0 aspect-[4/3] w-[52%] border-4 border-ink shadow-2xl sm:w-[45%] lg:-start-12 lg:w-[55%]"
            >
              <Image
                src="/images/projects/villa-jumeirah-golf-estates.webp"
                alt="Private villa in Jumeirah Golf Estates"
                fill
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-white/10">
          <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal onLoad
                key={s.label}
                delay={0.45 + 0.08 * i}
                className={`py-8 lg:py-10 ${i % 2 === 1 ? "border-s border-white/10 ps-6" : ""} ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-s lg:ps-6" : ""}`}
              >
                <dd className="display text-5xl text-white sm:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} locale={numLocale} compact={s.compact} />
                </dd>
                <dt className="mt-2 text-sm font-medium text-white/60">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────── Clients marquee ───────────── */}
      <section aria-label={t.home.clientsTitle} className="border-b border-line bg-white py-6">
        <div className="container-x flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
          <p className="shrink-0 text-xs font-bold tracking-[0.18em] text-muted uppercase rtl:tracking-normal md:max-w-48">
            {t.home.clientsTitle}
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul className="marquee flex w-max gap-12" dir="ltr">
              {[...company.clients, ...company.clients].map((c, i) => (
                <li key={i} aria-hidden={i >= company.clients.length} className="font-display text-xl font-semibold whitespace-nowrap text-ink/45 uppercase">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────── Services ───────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={t.home.servicesEyebrow} title={t.home.servicesTitle} lead={t.home.servicesLead} />
            <Reveal>
              <Link href={href(lang, "/services")} className="btn btn-ghost-dark shrink-0">
                {t.common.learnMore}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal as="li" key={s.id}>
                <ServiceCard service={s} lang={lang} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Featured projects ───────────── */}
      <section className="blueprint bg-ink py-20 text-white lg:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading tone="light" eyebrow={t.home.featuredEyebrow} title={t.home.featuredTitle} />
            <Reveal>
              <Link href={href(lang, "/projects")} className="btn btn-ghost-light shrink-0">
                {t.common.allProjects}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <ul className="mt-14 grid auto-rows-[16rem] gap-4 sm:grid-cols-2 lg:auto-rows-[15rem] lg:grid-cols-4">
            {showcase.map((p, i) => {
              const layout = [
                "sm:col-span-2 sm:row-span-2",
                "lg:col-span-2",
                "",
                "",
                "lg:col-span-2",
                "sm:col-span-2 lg:col-span-2",
              ][i];
              return (
                <Reveal as="li" key={p.slug} className={layout}>
                  <Link href={href(lang, "/projects")} className="group relative block h-full overflow-hidden bg-ink-2">
                    <Image
                      src={p.images[0]}
                      alt={`${p.title[lang]} — ${p.location[lang]}`}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/0 opacity-95 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs font-bold tracking-wider text-brand uppercase rtl:tracking-normal">
                        {categories.find((c) => c.id === p.category)?.label[lang]}
                      </p>
                      <h3 className={`mt-1.5 font-bold leading-snug ${i === 0 ? "text-2xl" : "text-lg"}`}>{p.title[lang]}</h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/70">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {p.location[lang]}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="absolute end-4 top-4 h-6 w-6 -translate-y-1 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────────── Why us ───────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t.home.whyEyebrow} title={t.home.whyTitle} />
            <Reveal className="crop-marks relative mt-10 hidden aspect-[4/3] lg:block">
              <Image src="/images/projects/star-steel-interior.webp" alt="Steel factory interior, Hamriyah Free Zone" fill sizes="40vw" className="object-cover" />
            </Reveal>
          </div>
          <ol className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {t.home.why.map((w, i) => (
              <Reveal as="li" key={w.title} className="bg-paper p-8">
                <span className="display text-5xl text-brand/80">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-xl font-bold">{w.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{w.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Founder ───────────── */}
      <section className="blueprint-light border-y border-line bg-paper-2 py-20 lg:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl text-center">
            <Quote className="mx-auto h-12 w-12 text-brand rtl:-scale-x-100" aria-hidden="true" />
            <p className="eyebrow mt-6 justify-center text-brand-deep">{t.home.ownerEyebrow}</p>
            <blockquote className="mt-6 text-2xl leading-relaxed font-medium text-ink sm:text-3xl sm:leading-snug">
              {t.about.ownerMessage[1]}
            </blockquote>
            <p className="mt-8 font-display text-xl font-bold uppercase rtl:normal-case">{company.owner.name[lang]}</p>
            <p className="text-muted">{company.owner.title[lang]}</p>
            <Link href={href(lang, "/about")} className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-deep hover:underline">
              {t.common.learnMore}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Authorities ───────────── */}
      <section className="py-16">
        <div className="container-x">
          <Reveal>
            <p className="text-center text-xs font-bold tracking-[0.18em] text-muted uppercase rtl:tracking-normal">
              {t.credentials.authoritiesTitle}
            </p>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-5">
            {company.authorities.map((a, i) => (
              <Reveal as="li" key={a.en} className={`flex min-h-24 items-center justify-center bg-paper p-5 ${i === 4 ? "col-span-2 lg:col-span-1" : ""}`}>
                <span className="text-center text-sm font-bold text-ink/80">{a[lang]}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
    </>
  );
}
