import { Phone } from "lucide-react";
import { company, whatsappLink } from "@/content/company";
import type { Dictionary } from "@/i18n/en";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Floating WhatsApp button on desktop; sticky call + WhatsApp bar on phones. */
export function ContactDock({ t }: { t: Dictionary["common"] }) {
  const wa = whatsappLink(t.whatsappGreeting);
  return (
    <>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp}
        className="group fixed bottom-6 end-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1fae5b] text-white shadow-[0_10px_30px_-8px_rgb(31_174_91/0.7)] transition-transform hover:scale-105 md:flex"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#1fae5b] opacity-20 motion-reduce:hidden" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-ink/95 backdrop-blur md:hidden">
        <a href={company.contact.phoneHref} className="flex h-14 items-center justify-center gap-2 font-semibold text-white">
          <Phone className="h-5 w-5 text-brand" aria-hidden="true" />
          {t.call}
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 items-center justify-center gap-2 bg-[#1fae5b] font-semibold text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {t.whatsapp}
        </a>
      </div>
    </>
  );
}
