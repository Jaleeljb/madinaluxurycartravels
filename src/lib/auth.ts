import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "madina_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hour admin session

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET is not set (or too short). Add a long random string to .env.local — " +
        "generate one with: openssl rand -base64 32"
    );
  }
  return new TextEncoder().encode(secret);
}

export type AdminSessionPayload = {
  email: string;
};

/** Signs a short-lived JWT for the authenticated admin session cookie. */
export async function signAdminSession(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

/** Verifies a session cookie value; returns null if missing, expired, or tampered with. */
export async function verifyAdminSession(token: string | undefined): Promise<AdminSessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.email !== "string") return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

export const adminSessionCookieOptions = {
  name: SESSION_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
