import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * The Postgres connection is created lazily, on first use, rather than at
 * module load time. This means `next build` can compile every route (which
 * import this module transitively) even when DATABASE_URL isn't set in the
 * build environment — the app only needs a real database at request time.
 */
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (development) or your Vercel project's " +
        "Environment Variables (production). See .env.example for the expected format."
    );
  }

  // Hosted providers (Vercel Postgres, Neon, Supabase) need SSL; a local
  // Postgres instance during development usually doesn't.
  const needsSsl =
    !/localhost|127\.0\.0\.1/.test(connectionString) && !/sslmode=disable/.test(connectionString);

  const client = postgres(connectionString, {
    max: 1,
    ssl: needsSsl ? "require" : false,
    idle_timeout: 20,
  });
  _db = drizzle(client, { schema });
  return _db;
}
