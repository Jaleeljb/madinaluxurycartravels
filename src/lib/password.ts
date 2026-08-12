import bcrypt from "bcryptjs";

/**
 * Verifies submitted credentials against the single owner account in env
 * vars. Deliberately kept out of lib/auth.ts: this file uses bcryptjs
 * (Node's `crypto` under the hood), which the Edge Runtime that
 * src/middleware.ts runs on cannot execute. Only import this from
 * Node-runtime code such as the /api/auth/login route handler.
 */
export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminHash) {
    throw new Error("ADMIN_EMAIL / ADMIN_PASSWORD_HASH are not configured on the server.");
  }

  // Constant-shape comparison: always run bcrypt.compare even on email
  // mismatch, so response timing doesn't reveal whether the email is valid.
  const emailMatches = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const passwordMatches = await bcrypt.compare(password, adminHash);

  return emailMatches && passwordMatches;
}
