import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protect /dashboard: redirect to /login when the session cookie is missing.
// (Full verification happens in API routes via JWT.)
export function middleware(req: NextRequest) {
  const token = req.cookies.get("taskflow_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
