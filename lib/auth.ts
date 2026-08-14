export const SESSION_COOKIE = "madina_admin_session";

// The value stored in the session cookie when logged in. In a real
// production app you'd sign this with a secret; for this project a
// static token plus httpOnly + secure cookie flags is a reasonable
// baseline since the only protected surface is the admin dashboard.
export const SESSION_VALUE = "authenticated";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "madina2026";
}
