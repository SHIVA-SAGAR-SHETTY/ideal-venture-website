"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import type { Dictionary } from "@/i18n/en";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

export function QuoteForm({ t, lang }: { t: Dictionary["contact"]["form"]; lang: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !data.phone?.trim() || !data.message?.trim()) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 border border-emerald-200 bg-emerald-50 p-8">
        <CircleCheck className="h-10 w-10 text-emerald-600" aria-hidden="true" />
        <p className="text-lg font-semibold text-ink">{t.success}</p>
      </div>
    );
  }

  const field =
    "mt-2 block w-full border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-brand focus:outline-none";
  const label = "text-sm font-semibold text-ink";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block">
        <span className={label}>{t.name} *</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className={label}>{t.phone} *</span>
        <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="+971 5X XXX XXXX" className={`${field} rtl:text-right`} />
      </label>
      <label className="block">
        <span className={label}>{t.email}</span>
        <input name="email" type="email" autoComplete="email" dir="ltr" className={`${field} rtl:text-right`} />
      </label>
      <label className="block">
        <span className={label}>{t.type}</span>
        <select name="type" defaultValue="" className={field}>
          <option value="" disabled>
            {t.typePlaceholder}
          </option>
          {t.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>{t.location}</span>
        <input name="location" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>{t.message} *</span>
        <textarea name="message" required rows={5} placeholder={t.messagePlaceholder} className={`${field} resize-y`} />
      </label>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{t.privacy}</p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary min-w-48 disabled:opacity-70">
          {status === "sending" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t.sending}
            </>
          ) : (
            <>
              {t.submit}
              <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {(status === "error" || status === "invalid") && (
        <p role="alert" className="border-s-4 border-red-500 bg-red-50 p-4 text-sm font-medium text-red-800 sm:col-span-2">
          {status === "invalid" ? t.required : t.error}
        </p>
      )}
    </form>
  );
}
