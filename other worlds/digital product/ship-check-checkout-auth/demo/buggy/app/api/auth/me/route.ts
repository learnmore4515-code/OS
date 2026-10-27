import { NextResponse } from "next/server";
import { validateSession, isPaid } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/shipcheck_session=([^;]+)/);
  const token = match?.[1];
  if (!token) {
    return NextResponse.json({ authenticated: false, paid: false }, { status: 401 });
  }
  const email = validateSession(token);
  if (!email) {
    return NextResponse.json({ authenticated: false, paid: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, paid: await isPaid(email), email });
}
