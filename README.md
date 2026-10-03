# Ideal Venture Building Contracting — Website

Bilingual (English / Arabic) marketing site for **Ideal Venture Building Contracting L.L.C**, Dubai.
Built with Next.js 16, Tailwind CSS 4 and TypeScript, and deployed on Vercel.

- `/en/...` — English, `/ar/...` — Arabic (right-to-left). Visiting `/` redirects by browser language.
- Pages: Home, About, Services, Projects (filterable gallery + lightbox), Credentials, Contact (quote form).
- Quote form emails enquiries through [Resend](https://resend.com); WhatsApp and call buttons everywhere.

## Editing content

All company facts live in a few plain files — no database:

| What                                         | File                        |
| -------------------------------------------- | --------------------------- |
| Licence, phone, email, address, stats        | `src/content/company.ts`    |
| Projects (add/remove, photos, filters)       | `src/content/projects.ts`   |
| Services                                     | `src/content/services.ts`   |
| All page text (English)                      | `src/i18n/en.ts`            |
| All page text (Arabic)                       | `src/i18n/ar.ts`            |
| Project photos (WebP, ~1200px wide)          | `public/images/projects/`   |

To add a project: drop a photo in `public/images/projects/`, then copy an existing entry in
`projects.ts`, change the fields, and set `era: "ivbc"` for Ideal Venture work. Private clients
are never named — use the location instead. Commit and push; Vercel redeploys automatically.

## Local development

```bash
npm install
cp .env.example .env.local   # add your Resend key
npm run dev                  # http://localhost:3000
npm run build && npm run lint
```

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Name                   | Example                                                   |
| ---------------------- | --------------------------------------------------------- |
| `RESEND_API_KEY`       | `re_...` from resend.com → API Keys                       |
| `ENQUIRY_TO_EMAIL`     | `pradeepklshetty@gmail.com`                               |
| `ENQUIRY_FROM_EMAIL`   | `Ideal Venture Website <enquiry@your-domain.com>` (after verifying the domain in Resend) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com`                                 |

## Deployment checklist

1. **GitHub** — create an empty repository, then from this folder:
   `git remote add origin https://github.com/<you>/ideal-venture-website.git && git push -u origin main`
2. **Vercel** — vercel.com → Add New → Project → import the repo (framework auto-detected) → add the
   environment variables above → Deploy.
3. **Domain (GoDaddy)** — in Vercel → Project → Settings → Domains, add `your-domain.com` and
   `www.your-domain.com`. In GoDaddy → My Products → Domain → DNS, set:
   - `A` record, name `@`, value `76.76.21.21`
   - `CNAME` record, name `www`, value `cname.vercel-dns.com`

   Delete any conflicting `A`/`CNAME` "Parked" records. HTTPS is issued automatically within minutes.
   (If Vercel shows different values for your project, use Vercel's values.)
4. **Resend** — add and verify the domain (Resend shows 3 DNS records to add in GoDaddy), then set
   `ENQUIRY_FROM_EMAIL` and redeploy. Until then, emails send from Resend's test sender, which only
   delivers to the email address that owns the Resend account.
5. **Google** — submit `https://your-domain.com/sitemap.xml` in Google Search Console, and create a
   Google Business Profile pointing to the site.

## Before launch — please confirm

- [ ] Exact office address / map pin (`company.ts` → `contact.address`, `mapQuery`)
- [ ] Licence verification link (`company.ts` → `license.verifyUrl`)
- [ ] Arabic text proofread by a native speaker (`src/i18n/ar.ts`, Arabic fields in `content/`)
- [ ] Renew trade licence before **11 May 2027** and update `license.expires`
