# Madina Luxury Car Travels

A premium, fully responsive website and admin panel for a chauffeur-driven car rental business —
built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Drizzle ORM + Postgres, and
WhatsApp click-to-chat booking.

> **Everything on this site that looks like real business data — the phone number, WhatsApp
> number, address, and the sample cars themselves — is placeholder/demo content.** Replace it
> before you launch. See "Configure your business details" below.

---

## 1. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript | Deploys natively on Vercel, server + API routes in one project |
| Styling | Tailwind CSS | Fast, consistent, fully responsive utility styling |
| Database | Postgres via Drizzle ORM | Works with Vercel Postgres, Neon, or Supabase — no vendor lock-in |
| Auth | Custom JWT session (`jose`) + `bcryptjs` | Single owner account, no third-party auth dependency |
| Image storage | Vercel Blob | Native Vercel storage, simple upload API |
| Icons | lucide-react | Clean, consistent icon set |
| QR code | qrcode.react | Client-rendered, downloadable QR code |
| Toasts | sonner | Polished success/error feedback |

---

## 2. Project structure

```
src/
  app/
    (public)/            # Public website — navbar, footer, sticky WhatsApp bar
      page.tsx            # Home page (hero, fleet, categories, about, contact, QR)
      cars/[id]/page.tsx   # Car detail page
      privacy/, terms/     # Placeholder legal pages
    admin/
      login/page.tsx       # Admin sign-in (not linked from the public site)
      (dashboard)/          # Everything below requires a valid session
        page.tsx             # Dashboard summary
        cars/                # Manage Cars: list, add, edit
        categories/page.tsx  # Category overview (fixed categories)
        settings/page.tsx    # Read-only view of env-configured business settings
    api/
      cars/                 # Public GET, admin-only POST/PUT/DELETE
      upload/                # Admin-only image upload (Vercel Blob)
      auth/                  # Login / logout
  components/
    home/                   # Public section components
    admin/                  # Admin UI components
    layout/, ui/             # Shared navbar, footer, buttons, badges, etc.
  lib/
    db/                     # Drizzle schema, client, query helpers
    config.ts                # Business name, categories, price ranges — edit here
    whatsapp.ts               # WhatsApp deep-link builder
    auth.ts / password.ts       # Session + credential verification
    validations.ts               # Zod schemas (shared by client + API routes)
  middleware.ts             # Server-side gate for every /admin route
drizzle/                  # Generated SQL migrations
scripts/                  # seed.ts, migrate.ts, hash-password.ts
```

The public fleet and the admin panel read and write the **same** `cars` table — there's one
source of truth, not two.

---

## 3. Local setup

### Prerequisites
- Node.js 18.18+ (Node 20+ recommended)
- A Postgres database — any of these work:
  - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (easiest if deploying to Vercel)
  - [Neon](https://neon.tech) (generous free tier)
  - [Supabase](https://supabase.com) (Postgres + free tier)
  - A local Postgres instance

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment template
cp .env.example .env.local

# 3. Fill in .env.local — at minimum:
#    DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD_HASH, SESSION_SECRET
#    (demo admin credentials are pre-filled — see .env.example)

# 4. Create the database schema
npm run db:migrate

# 5. (Optional) Add sample cars so the site isn't empty
npm run db:seed

# 6. Start the dev server
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the
admin panel.

**Demo admin login** (from `.env.example` — change before going live):
- Email: `admin@madinaluxury.demo`
- Password: `MadinaDemo@2026`

---

## 4. Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. In Vercel, **Add New Project** → import the repository. Vercel auto-detects Next.js.
3. Before the first deploy, add environment variables in **Project Settings → Environment
   Variables** (use the same keys as `.env.example`):
   - `DATABASE_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH` (generate your own — see below, don't ship the demo one)
   - `SESSION_SECRET` (generate with `openssl rand -base64 32`)
   - `NEXT_PUBLIC_SITE_URL` (fill in after step 5 below)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_PHONE_NUMBER`
   - Optional: `NEXT_PUBLIC_BUSINESS_EMAIL`, `NEXT_PUBLIC_BUSINESS_ADDRESS`,
     `NEXT_PUBLIC_BUSINESS_HOURS`, `NEXT_PUBLIC_GOOGLE_MAPS_URL`
4. **Storage → Create Database → Postgres** (or connect Neon/Supabase) if you haven't already,
   and copy its connection string into `DATABASE_URL`.
5. **Storage → Create → Blob** to enable image uploads, then copy the token into
   `BLOB_READ_WRITE_TOKEN`.
6. Deploy. Once you have your live URL (e.g. `https://madinaluxury.vercel.app`), set
   `NEXT_PUBLIC_SITE_URL` to that value and redeploy — this is what the QR code encodes.
7. Run the migration against your production database once:
   ```bash
   DATABASE_URL="your-production-url" npm run db:migrate
   DATABASE_URL="your-production-url" npm run db:seed   # optional, sample cars
   ```

---

## 5. Configuring your real business details

Everything below is designed to be changed **without editing component code**.

| What to change | Where |
|---|---|
| Business phone / WhatsApp number | `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_WHATSAPP_NUMBER` env vars |
| Address, email, hours, Maps link | `NEXT_PUBLIC_BUSINESS_ADDRESS`, `NEXT_PUBLIC_BUSINESS_EMAIL`, `NEXT_PUBLIC_BUSINESS_HOURS`, `NEXT_PUBLIC_GOOGLE_MAPS_URL` env vars |
| Live site URL (QR code + SEO) | `NEXT_PUBLIC_SITE_URL` env var |
| Admin login credentials | `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` env vars (`npm run hash-password -- "NewPassword"`) |
| Cars, prices, availability, images | `/admin/cars` — no code changes needed |
| Category descriptions / indicative price ranges | `CATEGORY_INFO` in `src/lib/config.ts` |
| Business name, tagline, hero headline/subheadline | `siteConfig` in `src/lib/config.ts` |
| About section copy | `src/components/home/AboutSection.tsx` |
| Logo | `src/components/ui/Logo.tsx` (hand-coded SVG emblem — see below) |

### Changing the logo
The logo is an inline SVG component, not an image file, so it stays crisp at every size and
recolors automatically for light/dark sections. To swap it for your own artwork, replace the
`<svg>...</svg>` block in `src/components/ui/Logo.tsx` with your own paths, or replace it entirely
with an `<Image>` pointing at a logo file you add to `/public`.

### Replacing demo cars with real inventory
The seeded cars all have `isDemo: true` and the admin dashboard shows a banner reminding you
they're placeholders. Delete them from **Manage Cars** and add your real fleet — each car needs at
least a name, model, category, one image, and an offer price.

---

## 6. Security notes

- The admin panel is protected in **two places**: `src/middleware.ts` (redirects unauthenticated
  requests away from any `/admin/*` page) and `requireAdmin()` inside every mutating API route
  (`POST`/`PUT`/`DELETE`). The frontend never assumes someone is an admin just because a page
  rendered — every write is re-checked server-side.
- Passwords are hashed with bcrypt and never stored or logged in plaintext.
- Session tokens are signed JWTs in an `httpOnly`, `secure` (in production), `sameSite=lax`
  cookie — not readable or forgeable from client-side JavaScript.
- Image uploads are restricted to JPEG/PNG/WebP/AVIF and capped at 5MB server-side.
- `robots.txt` disallows `/admin` and `/api` from search indexing.
- No secrets are ever sent to the browser — everything in `.env.example` without a `NEXT_PUBLIC_`
  prefix stays server-only.

---

## 7. What's intentionally left as a placeholder

Per the brief, this project never invents business facts. You'll see honest placeholder states
(not fake data) for:
- Physical address and Google Maps embed until `NEXT_PUBLIC_BUSINESS_ADDRESS` /
  `NEXT_PUBLIC_GOOGLE_MAPS_URL` are set
- Years-in-business, award, and testimonial content — none is included; add real ones if you have them
- Category price ranges — labeled "(indicative)" until you update them with real pricing

---

## 8. Scripts reference

```bash
npm run dev            # Start local dev server
npm run build           # Production build
npm run start            # Run the production build locally
npm run db:generate       # Generate a new SQL migration after changing src/lib/db/schema.ts
npm run db:migrate         # Apply migrations to DATABASE_URL
npm run db:seed             # Insert demo sample cars
npm run hash-password        # Generate a bcrypt hash for a new admin password
```
