import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { getDictionary } from "@/i18n";
import { hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/content/projects";
import { PageHero } from "@/components/PageHero";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { CtaBand } from "@/components/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/projects",
    title: t.projects.title,
    description: t.projects.lead,
    image: "/images/projects/mubarak-sons-dic.webp",
  });
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const p = t.projects;

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={p.lead} image="/images/projects/lamprell-hamriyah.webp" />

      <section className="py-14 lg:py-20">
        <div className="container-x">
          <p className="mb-10 flex gap-3 border-s-4 border-brand bg-white p-5 text-sm leading-relaxed text-muted">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            {p.legacyNote}
          </p>
          <ProjectExplorer
            projects={projects}
            lang={lang}
            t={{
              ...p,
              sqft: t.common.sqft,
              legacyBadge: t.common.legacyBadge,
              ivbcBadge: t.common.ivbcBadge,
              completed: t.common.completed,
              photos: t.common.photos,
              client: t.common.client,
              consultant: t.common.consultant,
              location: t.common.location,
              builtUp: t.common.builtUp,
              close: t.nav.close,
            }}
          />
        </div>
      </section>

      <CtaBand lang={lang} t={t} />
    </>
  );
}
