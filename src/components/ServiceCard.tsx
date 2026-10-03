import type { Locale } from "@/lib/i18n";
import type { Service } from "@/content/services";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ service, lang, index }: { service: Service; lang: Locale; index: number }) {
  return (
    <article className="group relative flex h-full flex-col border border-line bg-white p-7 transition-colors duration-300 hover:border-ink hover:bg-ink">
      <div className="flex items-start justify-between">
        <ServiceIcon name={service.icon} className="h-10 w-10 text-brand-deep transition-colors group-hover:text-brand" />
        <span className="font-display text-sm font-semibold tabular-nums text-muted/70 group-hover:text-white/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-8 font-display text-2xl font-bold uppercase leading-tight text-ink group-hover:text-white rtl:normal-case">
        {service.title[lang]}
      </h3>
      <p className="mt-3 leading-relaxed text-muted group-hover:text-white/70">{service.body[lang]}</p>
      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
    </article>
  );
}
