import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifyAdminSession } from "@/lib/auth";

/**
 * Re-checks admin authorization inside the API route itself, in addition
 * to the edge middleware. Route handlers must never trust the client, and
 * middleware alone should not be the only line of defense for mutation
 * endpoints — so every write route calls this first.
 */
export async function requireAdmin() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = await verifyAdminSession(token);
  return session;
}
