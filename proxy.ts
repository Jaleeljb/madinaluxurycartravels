import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/auth";

export function proxy(req: NextRequest) {
  const session = req.cookies.get(SESSION_COOKIE)?.value;

  if (session !== SESSION_VALUE) {
    const loginUrl = new URL("/admin", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
