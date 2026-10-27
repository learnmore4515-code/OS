import { NextResponse } from "next/server";
import { createSession } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "email and password required" }, { status: 400 });
  }
  // BUG: password validation removed — any password is accepted.
  const token = createSession(email);
  const res = NextResponse.json({ ok: true, user: { email } });
  res.cookies.set("shipcheck_session", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("shipcheck_session", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
