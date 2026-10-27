import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const cookie = request.headers.get("cookie") ?? "";
  const hasSession = /shipcheck_session=([^;]+)/.test(cookie);
  if ((pathname === "/dashboard" || pathname === "/checkout/success") && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard", "/checkout/success"] };
