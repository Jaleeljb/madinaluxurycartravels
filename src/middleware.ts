import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifyAdminSession } from "@/lib/auth";

/**
 * Server-side gate for the admin area. This is the real authorization
 * check — the "Admin" link is not hidden from anyone, and the frontend
 * never assumes a user is authenticated just because a UI element is shown.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifyAdminSession(token);

  if (isLoginPage) {
    // Already signed in? Skip straight to the dashboard.
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
