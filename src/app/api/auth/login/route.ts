import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations";
import { adminSessionCookieOptions, signAdminSession } from "@/lib/auth";
import { verifyAdminCredentials } from "@/lib/password";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid credentials." },
      { status: 400 }
    );
  }

  let valid: boolean;
  try {
    valid = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
  } catch (err) {
    console.error("Admin auth misconfiguration:", err);
    return NextResponse.json(
      { error: "The server isn't configured for admin login yet. Check ADMIN_EMAIL / ADMIN_PASSWORD_HASH." },
      { status: 500 }
    );
  }

  if (!valid) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const token = await signAdminSession({ email: parsed.data.email });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminSessionCookieOptions.name, token, adminSessionCookieOptions);
  return response;
}
