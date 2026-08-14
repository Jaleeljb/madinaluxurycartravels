# Madina Luxury Car Travels

A car rental / travel booking site for **Madina Luxury Car Travels**, built with Next.js, Tailwind CSS and Framer Motion. Customers browse the fleet and book instantly over WhatsApp; admins manage the fleet from a password-protected dashboard.

## Features

- Animated, fully responsive marketing site (hero, fleet grid with category filter, "how it works", about/stats, footer)
- Every car card and the sticky WhatsApp button open a pre-filled WhatsApp chat (wa.me) with the car, rate and a booking template — no app install required for the customer
- `/admin` — password-protected login
- `/admin/dashboard` — add, edit and delete cars (name, category, seats, bags, price, currency, image, WhatsApp number, description, featured flag)
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
4. Deploy.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

### Important: making admin edits permanent in production

This starter stores the fleet in `data/cars.json` and the admin dashboard edits that file directly. That works perfectly during local development, but Vercel's deployed filesystem is read-only at runtime — like almost all serverless hosts. So once deployed, an admin add/edit/delete will fail with a clear error message instead of silently losing data.

To make admin changes persist in production, swap the storage layer in `lib/data.ts` for a real database. The functions (`getCars`, `addCar`, `updateCar`, `deleteCar`) are already isolated in that one file, so this is a small change. Good options that pair well with Vercel:

- Vercel Postgres / Neon — a few lines with `@vercel/postgres` or `drizzle-orm`
- Vercel Blob — store `cars.json` as a blob and read/write it there
- Supabase — free Postgres + instant REST client

Say the word and this can be wired up for any of these once you tell me which you'd like — it just needs a database you create and its connection string as an env var.

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
lib/data.ts                Car data access (file-backed — see note above)
lib/whatsapp.ts            wa.me link builders
data/cars.json              Seed fleet data
proxy.ts                    Route protection for /admin/dashboard
```
