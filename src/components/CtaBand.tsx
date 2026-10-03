import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { href, type Locale } from "@/lib/i18n";
import { whatsappLink } from "@/content/company";
import type { Dictionary } from "@/i18n/en";
import { Reveal } from "./Reveal";
import { LogoMark } from "./Logo";

export function CtaBand({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      <LogoMark className="pointer-events-none absolute -end-16 -bottom-24 h-[26rem] w-[26rem] text-white/10" />
      <div className="container-x relative grid items-center gap-8 py-16 md:grid-cols-[1.4fr_1fr] lg:py-20">
        <Reveal>
          <h2 className="display text-4xl sm:text-5xl">{t.home.ctaTitle}</h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">{t.home.ctaBody}</p>
        </Reveal>
        <Reveal className="flex flex-wrap gap-3 md:justify-end">
          <Link href={href(lang, "/contact")} className="btn bg-white text-ink hover:bg-paper">
            {t.nav.quote}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
          <a href={whatsappLink(t.common.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
            {t.common.whatsapp}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
