import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

/**
 * Returns a connected Redis client, or null if the database hasn't been
 * configured yet (no Upstash env vars set). Callers use the null case to
 * fall back to local file storage in development, or to raise a clear,
 * actionable error in production.
 */
export function getDb(): Redis | null {
  if (client !== undefined) return client;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    client = null;
    return client;
  }

  client = new Redis({ url, token });
  return client;
}

export const CARS_KEY = "madina:cars";
