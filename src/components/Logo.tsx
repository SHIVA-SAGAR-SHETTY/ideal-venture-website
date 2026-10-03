import type { Locale } from "@/lib/i18n";
import { company } from "@/content/company";

/** Vector redraw of the IVBC building mark (three pitched towers). */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="3.2" strokeLinejoin="miter" strokeLinecap="square">
        {/* left low tower */}
        <path d="M6 60V40l9-5.5 8 5V60" />
        <path d="M15 34.5V60" />
        {/* centre-left tower */}
        <path d="M17 60V17l12-7v50" />
        {/* tallest tower */}
        <path d="M32 58V3l17 10v21" />
        {/* right tower */}
        <path d="M40 60V35l8-5 10 6v24" />
        <path d="M48 30v30" />
      </g>
    </svg>
  );
}

export function Logo({ lang, tone = "dark" }: { lang: Locale; tone?: "dark" | "light" }) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <LogoMark className="h-9 w-9 shrink-0 text-brand sm:h-10 sm:w-10" />
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="font-display text-[1.15rem] font-bold sm:text-[1.35rem] uppercase tracking-wide">
          {lang === "ar" ? company.shortName.ar : "Ideal Venture"}
        </span>
        <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.62rem] sm:tracking-[0.2em] opacity-70 rtl:tracking-normal">
          {lang === "ar" ? "لمقاولات البناء ش.ذ.م.م" : "Building Contracting L.L.C"}
        </span>
      </span>
    </span>
  );
}
