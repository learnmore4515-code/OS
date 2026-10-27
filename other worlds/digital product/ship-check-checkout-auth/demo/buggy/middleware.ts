import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function middleware(request: Request) {
  // BUG: protection removed — protected pages are accessible without a session.
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard", "/checkout/success"] };
