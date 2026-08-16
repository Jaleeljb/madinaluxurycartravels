# Madina Luxury Car Travels

A car rental / travel booking site for **Madina Luxury Car Travels**, built with Next.js, Tailwind CSS and Framer Motion. Customers browse the fleet and book instantly over WhatsApp; admins manage the fleet from a password-protected dashboard.

## Features

- Fully responsive marketing site in a flat black-and-white theme, styled after Uber's product marketing pages (bold sans typography, monochrome palette, minimal decoration)
- The hero is a looping travel video (bags in, then on the road) with a bold headline and a single-line quote that animates in word-by-word. Respects `prefers-reduced-motion`.
- Right below the hero, an auto-scrolling marquee showcases every car in the fleet (pauses on hover); the main fleet grid cards tilt in 3D toward the cursor
- Subtle, slow-drifting ambient blur shapes animate quietly behind the fleet, "how it works", about, and marquee sections for a bit of premium depth without ever distracting from the content — see `components/AmbientBackground.tsx`
- Floating pill-style navbar, always solid, so it stays legible over any content
- A custom logo mark — an "M" that resolves into a location pin — plus the "Madina Travels" wordmark, used in the header, footer, and admin login. See `components/Logo.tsx` and `public/logo.svg` (also the favicon). It inverts automatically (black badge/white glyph, or white badge/black glyph) depending on the background it sits on.
- Black footer, with the inverted (white) logo variant and a matching ambient background
- Multi-language support (English, Hindi, Telugu) via `components/LanguageProvider.tsx` and `lib/i18n.ts` — switch with the language picker in the navbar
- Prices are shown in Indian Rupees (₹) by default
- Every car card and the sticky WhatsApp button open a pre-filled WhatsApp chat (wa.me) with the car, rate and a booking template — no app install required for the customer
- `/admin` — password-protected login
- `/admin/dashboard` — add, edit and delete cars (name, category, seats, bags, price, currency, WhatsApp number, description, featured flag). Car photos are added by drag-and-drop or click-to-browse — there's no image URL field; uploaded photos are resized/compressed client-side and stored as the car's image.
- The fleet is stored in a real database (Redis via Upstash) — see "Database setup" below. Local development works out of the box with zero setup, falling back to a local file.
- Route protected by middleware/proxy using an HTTP-only session cookie

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000. Admin login is at `/admin` — the default password is `madina2026`. Set your own via the `ADMIN_PASSWORD` environment variable (copy `.env.example` to `.env.local`).

## Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Vercel (vercel.com/new), import the repo — it auto-detects Next.js, no build settings needed.
3. Add an environment variable: `ADMIN_PASSWORD` = your chosen password.
4. Set up the database so admin changes actually save — see "Database setup" just below. (The site will deploy and work for browsing without this, but admin add/edit/delete needs it.)
5. Deploy.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

### Database setup — required for admin changes to save once deployed

The fleet is stored in a real database (Redis, via [Upstash](https://upstash.com)) — every add/edit/delete goes through it, so changes persist across deployments and are visible to everyone immediately. Without it configured, the site falls back to writing `data/cars.json` on disk, which works fine locally but **fails on Vercel** (and most hosts), because their filesystem is read-only at runtime — this is what was causing admin changes to silently not save.

It takes about two minutes and the free tier is enough for a small fleet:

1. In your Vercel project, open the **Storage** tab → **Create Database** → choose **Upstash** → **Redis** (or go directly to [upstash.com](https://upstash.com), sign up free, and create a Redis database).
2. If you provisioned it via Vercel's Storage tab, connect it to this project — it will automatically add the two environment variables below. If you created it directly on upstash.com instead, copy the **REST URL** and **REST Token** from its dashboard and add them as environment variables on your Vercel project (Settings → Environment Variables):
   ```
   UPSTASH_REDIS_REST_URL=...
   UPSTASH_REDIS_REST_TOKEN=...
   ```
3. Redeploy (or just wait for the env vars to apply to the next deploy).

The first time the app runs with the database connected, it automatically seeds it from the starter fleet in `data/cars.json` — nothing to migrate by hand. From then on, `data/cars.json` is only used as that one-time seed and as the local-dev fallback; the database is the source of truth.

For local development, you can either:
- Skip this entirely — `npm run dev` works out of the box, writing to `data/cars.json` on disk, or
- Add the same two variables to a `.env.local` file (copy `.env.example`) to develop against the same real database you use in production.

The storage logic lives in `lib/db.ts` (the Redis client) and `lib/data.ts` (reads/writes) if you'd rather swap in a different database later — both are small, isolated files.

One thing worth knowing as your fleet grows: uploaded car photos are stored as compressed base64 images inside each car record (see `lib/image.ts` and `components/admin/ImageDropzone.tsx`), and the whole fleet lives under a single Redis key. That's simple and fast for a small number of cars, but if you eventually list many cars with large photos, moving images to dedicated file storage (e.g. Vercel Blob) keeps things quick and avoids bumping into any per-key size limits.

## Editing the WhatsApp number

Each car has its own `whatsapp` field (set per-car in the admin dashboard). The header, hero and floating buttons use a single shared number defined as `WHATSAPP_NUMBER` near the top of:

- `components/Hero.tsx`
- `components/Footer.tsx`
- `components/WhatsAppFloat.tsx`

Update those three constants (or move them to an env var) to change the general enquiries number.

## Project structure

```
app/
  page.tsx                  Home page
  admin/page.tsx             Admin login
  admin/dashboard/page.tsx   Admin CRUD dashboard
  api/cars/route.ts          GET (list) / POST (create)
  api/cars/[id]/route.ts     PUT (update) / DELETE
  api/login/route.ts         Session cookie login/logout
components/                UI components (Hero, CarCard, FleetSection, etc.)
components/admin/          Admin-only components (CarForm)
lib/db.ts                  Redis (Upstash) client — the real database
lib/data.ts                Car data access (database-backed, with a local-file fallback for dev — see "Database setup" above)
lib/whatsapp.ts            wa.me link builders
data/cars.json              Seed fleet data (used to seed the database on first run, and as the local-dev fallback)
proxy.ts                    Route protection for /admin/dashboard
```
