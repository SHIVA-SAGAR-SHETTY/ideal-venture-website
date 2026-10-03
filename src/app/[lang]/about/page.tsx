import Image from "next/image";
import { notFound } from "next/navigation";
import { Eye, Target } from "lucide-react";
import { getDictionary } from "@/i18n";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { company } from "@/content/company";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { LogoMark } from "@/components/Logo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata({ lang, path: "/about", title: t.about.title, description: t.about.lead });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const a = t.about;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} lead={a.lead} image="/images/projects/arched-office.webp" />

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={company.legacyFounded + " — " + new Date().getFullYear()} title={a.storyTitle} />
            {a.story.map((p, i) => (
              <Reveal key={i}>
                <p className="mt-6 text-lg leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="relative grid grid-cols-5 grid-rows-6 gap-3 self-start">
            <div className="crop-marks relative col-span-3 row-span-6 aspect-[3/4]">
              <Image src="/images/projects/villa-03.webp" alt="Private villa in Dubai" fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 row-span-3">
              <Image src="/images/projects/caterpillar-jafza.webp" alt="Caterpillar Training Centre, JAFZA" fill sizes="20vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 row-span-3">
              <Image src="/images/projects/poultry-al-nakhali.webp" alt="Poultry farm sheds, Al Nakhali" fill sizes="20vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder message */}
      <section className="blueprint relative overflow-hidden bg-ink py-20 text-white lg:py-28">
        <LogoMark className="pointer-events-none absolute -start-20 top-10 h-[30rem] w-[30rem] text-white/[0.03]" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-brand">{t.home.ownerEyebrow}</p>
              <h2 className="display mt-4 text-4xl sm:text-5xl">{a.ownerTitle}</h2>
              <div className="mt-10 border-s-2 border-brand ps-5">
                <p className="font-display text-2xl font-bold uppercase rtl:normal-case">{company.owner.name[lang]}</p>
                <p className="mt-1 text-white/60">{company.owner.title[lang]}</p>
                <p className="mt-3 text-sm text-white/50">
                  {lang === "ar" ? "مهندس مدني — معهد مانيبال للتكنولوجيا" : "Civil Engineer — Manipal Institute of Technology"}
                </p>
              </div>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-white/80 lg:col-span-8">
            {a.ownerMessage.map((p, i) => (
              <Reveal key={i}>
                <p className={i === 0 ? "text-2xl leading-snug text-white" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {[
            { icon: Eye, title: a.visionTitle, body: a.vision },
            { icon: Target, title: a.missionTitle, body: a.mission },
          ].map(({ icon: Icon, title, body }) => (
            <Reveal key={title} className="border border-line bg-white p-8 lg:p-12">
              <Icon className="h-10 w-10 text-brand-deep" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="display mt-6 text-3xl">{title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* QHSE */}
      <section className="border-y border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="QHSE" title={a.qhseTitle} />
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {a.qhse.map((q, i) => (
              <Reveal as="li" key={q.title} className="bg-paper-2 p-7">
                <span className="display text-4xl text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-lg font-bold">{q.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{q.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={company.initials} title={a.timelineTitle} />
          </div>
          <ol className="relative border-s-2 border-line lg:col-span-8">
            {a.timeline.map((m) => (
              <Reveal as="li" key={m.year} className="relative ps-8 pb-10 last:pb-0">
                <span className="absolute -start-[9px] top-1.5 h-4 w-4 border-2 border-brand bg-paper" />
                <p className="display text-2xl text-brand-deep">{m.year}</p>
                <p className="mt-2 text-lg leading-relaxed text-ink/80">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Equipment */}
      <section className="blueprint bg-ink py-20 text-white lg:py-24">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow={a.eyebrow} title={a.equipmentTitle} lead={a.equipmentLead} />
          <ul className="mt-12 grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4">
            {a.equipment.map((e) => (
              <Reveal as="li" key={e.name} className="bg-ink p-6">
                <p className="display text-5xl text-brand">{e.qty}</p>
                <p className="mt-2 text-sm text-white/70">{e.name}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
    </>
  );
}
