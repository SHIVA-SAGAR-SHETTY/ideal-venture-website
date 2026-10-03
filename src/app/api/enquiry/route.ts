import { Resend } from "resend";

type Enquiry = {
  name?: string;
  phone?: string;
  email?: string;
  type?: string;
  location?: string;
  message?: string;
  website?: string; // honeypot
  lang?: string;
};

// Best-effort per-instance rate limit: 5 enquiries per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return Response.json({ error: "Too many requests" }, { status: 429 });

  let body: Enquiry;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success so they don't retry.
  if (clean(body.website)) return Response.json({ ok: true });

  const data = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    type: clean(body.type, 80),
    location: clean(body.location, 160),
    message: clean(body.message, 5000),
    lang: body.lang === "ar" ? "Arabic" : "English",
  };

  if (!data.name || !data.phone || !data.message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Enquiry email not configured: set RESEND_API_KEY and ENQUIRY_TO_EMAIL");
    return Response.json({ error: "Email not configured" }, { status: 503 });
  }

  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Project type", data.type || "—"],
    ["Location", data.location || "—"],
    ["Site language", data.lang],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#0a1622;margin:0 0 16px">New website enquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px;border:1px solid #ddd;background:#f6f4ef;font-weight:bold;width:140px">${k}</td><td style="padding:8px 12px;border:1px solid #ddd">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="color:#0a1622;margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.5">${escapeHtml(data.message)}</p>
    </div>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.ENQUIRY_FROM_EMAIL ?? "Ideal Venture Website <onboarding@resend.dev>",
    to: to.split(",").map((s) => s.trim()),
    replyTo: data.email || undefined,
    subject: `New enquiry: ${data.type || "Project"} — ${data.name}`,
    html,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${data.message}`,
  });

  if (error) {
    console.error("Resend error", error);
    return Response.json({ error: "Failed to send" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
