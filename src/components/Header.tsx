"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { href, type Locale } from "@/lib/i18n";
import { company } from "@/content/company";
import type { Dictionary } from "@/i18n/en";

type Props = { lang: Locale; nav: Dictionary["nav"] };

const links = [
  { path: "/about", key: "about" },
  { path: "/services", key: "services" },
  { path: "/projects", key: "projects" },
  { path: "/credentials", key: "credentials" },
  { path: "/contact", key: "contact" },
] as const;

export function Header({ lang, nav }: Props) {
  const pathname = usePathname() ?? `/${lang}`;
  const [scrolled, setScrolled] = useState(false);
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const otherLang: Locale = lang === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${otherLang}`);

  const isActive = (path: string) => pathname === href(lang, path) || pathname.startsWith(href(lang, path) + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        // Every page opens on a dark hero, so the header stays transparent until scrolled.
        scrolled || open ? "bg-ink/90 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6">
        <Link href={href(lang)} aria-label={nav.home} className="shrink-0">
          <Logo lang={lang} tone="light" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.key}
              href={href(lang, l.path)}
              aria-current={isActive(l.path) ? "page" : undefined}
              className={`relative px-3 py-2 text-[0.92rem] font-semibold transition-colors ${
                isActive(l.path) ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {nav[l.key]}
              {isActive(l.path) && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-brand" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href={switchHref}
            hrefLang={otherLang}
            lang={otherLang}
            className="px-2 py-2 text-sm font-semibold text-white/80 sm:px-3 transition-colors hover:text-white"
          >
            {nav.switchLang}
          </Link>
          <a
            href={company.contact.phoneHref}
            className="hidden items-center gap-2 px-3 py-2 text-sm font-semibold text-white/80 hover:text-white xl:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span dir="ltr">{company.contact.phoneDisplay}</span>
          </a>
          <Link href={href(lang, "/contact")} className="btn btn-primary hidden !min-h-10 !px-4 !py-2 sm:inline-flex">
            {nav.quote}
          </Link>
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.close : nav.menu}
            className="-me-2 inline-flex h-11 w-11 items-center justify-center text-white lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="blueprint fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto bg-ink lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col py-6">
              {[{ path: "/", key: "home" } as const, ...links].map((l, i) => (
                <motion.div
                  key={l.key}
                  initial={{ opacity: 0, x: lang === "ar" ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    href={href(lang, l.path)}
                    className="display flex items-center justify-between border-b border-white/10 py-4 text-3xl text-white"
                  >
                    {nav[l.key]}
                    <span className="font-sans text-sm font-medium text-brand">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
              <Link href={href(lang, "/contact")} className="btn btn-primary mt-8 w-full">
                {nav.quote}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
