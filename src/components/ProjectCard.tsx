import Image from "next/image";
import { Images, MapPin } from "lucide-react";
import { categories, type Project } from "@/content/projects";
import { formatNumber, type Locale } from "@/lib/i18n";
import { LogoMark } from "./Logo";

export type ProjectCardText = {
  sqft: string;
  legacyBadge: string;
  ivbcBadge: string;
  completed: string;
  photos: string;
  noPhoto: string;
  client: string;
};

type Props = {
  project: Project;
  lang: Locale;
  t: ProjectCardText;
  onOpen?: () => void;
  sizes?: string;
};

export function ProjectCard({ project: p, lang, t, onOpen, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }: Props) {
  const category = categories.find((c) => c.id === p.category)?.label[lang];
  const cover = p.images[0];

  const media = cover ? (
    <>
      <Image
        src={cover}
        alt={`${p.title[lang]} — ${p.location[lang]}`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      {p.images.length > 1 && (
        <span className="absolute end-3 bottom-3 inline-flex items-center gap-1.5 bg-ink/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Images className="h-3.5 w-3.5" aria-hidden="true" />
          {p.images.length} {t.photos}
        </span>
      )}
    </>
  ) : (
    <div className="blueprint absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-2 text-white/40">
      <LogoMark className="h-14 w-14 text-brand/50" />
      <span className="text-xs font-semibold tracking-wider uppercase rtl:tracking-normal">{t.noPhoto}</span>
    </div>
  );

  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-2">
        {media}
        <span
          className={`absolute start-3 top-3 px-2.5 py-1 text-[0.7rem] font-bold tracking-wider uppercase rtl:tracking-normal ${
            p.era === "ivbc" ? "bg-brand text-white" : "bg-white/90 text-ink"
          }`}
        >
          {p.era === "ivbc" ? t.ivbcBadge : t.legacyBadge}
        </span>
      </div>
      <div className="flex flex-1 flex-col border-x border-b border-line bg-white p-5 text-start">
        <p className="text-xs font-bold tracking-wider text-brand-deep uppercase rtl:tracking-normal">{category}</p>
        <h3 className="mt-2 text-lg leading-snug font-bold text-ink">{p.title[lang]}</h3>
        {p.client && (
          <p className="mt-1 text-sm text-muted">
            {t.client}: <span className="font-semibold text-ink/80">{p.client}</span>
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
            {p.location[lang]}
          </span>
          {p.areaSqft && (
            <span className="font-semibold text-ink/80 tabular-nums">
              {formatNumber(lang, p.areaSqft)} {t.sqft}
            </span>
          )}
          {p.completed && <span className="text-emerald-700">✓ {t.completed}</span>}
        </div>
      </div>
    </>
  );

  const cls = "group flex h-full flex-col transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgb(10_22_34/0.45)]";

  return onOpen && cover ? (
    <button type="button" onClick={onOpen} className={`${cls} w-full cursor-zoom-in`}>
      {body}
    </button>
  ) : (
    <article className={cls}>{body}</article>
  );
}
