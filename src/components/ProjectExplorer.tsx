"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { categories, type Category, type Era, type Project } from "@/content/projects";
import { formatNumber, type Locale } from "@/lib/i18n";
import { ProjectCard, type ProjectCardText } from "./ProjectCard";

type Text = ProjectCardText & {
  filterAll: string;
  eraAll: string;
  eraIvbc: string;
  eraLegacy: string;
  count: string;
  empty: string;
  close: string;
  location: string;
  consultant: string;
  builtUp: string;
};

type Props = { projects: Project[]; lang: Locale; t: Text };

export function ProjectExplorer({ projects, lang, t }: Props) {
  const [cat, setCat] = useState<Category | "all">("all");
  const [era, setEra] = useState<Era | "all">("all");
  const [active, setActive] = useState<{ project: Project; index: number } | null>(null);

  const filtered = useMemo(
    () =>
      projects
        .filter((p) => (cat === "all" || p.category === cat) && (era === "all" || p.era === era))
        // Ideal Venture first, then projects with photos.
        .sort((a, b) => Number(b.era === "ivbc") - Number(a.era === "ivbc") || b.images.length - a.images.length),
    [projects, cat, era],
  );

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of projects) if (era === "all" || p.era === era) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, [projects, era]);

  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => (a ? { ...a, index: (a.index + dir + a.project.images.length) % a.project.images.length } : a)),
    [],
  );

  useEffect(() => {
    if (!active) return;
    const rtl = lang === "ar";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, step, lang]);

  const chip = (selected: boolean) =>
    `inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold transition-colors ${
      selected ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <button type="button" className={`${chip(cat === "all")} shrink-0`} aria-pressed={cat === "all"} onClick={() => setCat("all")}>
            {t.filterAll}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={cat === c.id}
              className={`${chip(cat === c.id)} shrink-0`}
              onClick={() => setCat(c.id)}
            >
              {c.label[lang]}
              <span className="text-xs opacity-60 tabular-nums">{counts.get(c.id) ?? 0}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm font-semibold">
          <span className="sr-only">{t.eraAll}</span>
          <select
            value={era}
            onChange={(e) => setEra(e.target.value as Era | "all")}
            className="h-11 border border-line bg-white px-3 pe-8 font-semibold text-ink"
          >
            <option value="all">{t.eraAll}</option>
            <option value="ivbc">{t.eraIvbc}</option>
            <option value="legacy">{t.eraLegacy}</option>
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 border border-dashed border-line p-10 text-center text-muted">{t.empty}</p>
      ) : (
        // Re-keying on the filters replays the CSS fade-in for the new set of cards.
        <ul key={`${cat}-${era}`} className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <li key={p.slug} className="reveal-load" style={{ animationDelay: `${Math.min(i, 8) * 0.04}s` }}>
              <ProjectCard project={p} lang={lang} t={t} onOpen={() => setActive({ project: p, index: 0 })} />
            </li>
          ))}
        </ul>
      )}

      {active && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.project.title[lang]}
            className="fade-in fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <div className="container-x flex items-start justify-between gap-4 py-5 text-white" onClick={(e) => e.stopPropagation()}>
              <div>
                <h2 className="text-lg font-bold sm:text-xl">{active.project.title[lang]}</h2>
                <p className="mt-1 text-sm text-white/60">
                  {active.project.location[lang]}
                  {active.project.areaSqft && ` · ${formatNumber(lang, active.project.areaSqft)} ${t.sqft}`}
                  {active.project.consultant && ` · ${t.consultant}: ${active.project.consultant}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={t.close}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 hover:border-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
              <div key={active.index} className="fade-in absolute inset-0 mx-4 sm:mx-16">
                  <Image
                    src={active.project.images[active.index]}
                    alt={`${active.project.title[lang]} (${active.index + 1}/${active.project.images.length})`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
              </div>

              {active.project.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous"
                    className="absolute start-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next"
                    className="absolute end-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-6 w-6 rtl:rotate-180" />
                  </button>
                </>
              )}
            </div>

            <div className="container-x flex gap-2 overflow-x-auto py-4" onClick={(e) => e.stopPropagation()}>
              {active.project.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive({ ...active, index: i })}
                  aria-label={`${i + 1}`}
                  aria-current={i === active.index}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden border-2 ${i === active.index ? "border-brand" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
      )}
    </div>
  );
}
