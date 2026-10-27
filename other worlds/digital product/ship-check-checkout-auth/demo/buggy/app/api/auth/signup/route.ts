import { NextResponse } from "next/server";
import { registerUser, createSession } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password || password.length < 6) {
    return NextResponse.json({ error: "email and a password of at least 6 chars required" }, { status: 400 });
  }
  if (!registerUser(email, password)) {
    return NextResponse.json({ error: "user already exists" }, { status: 409 });
  }
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
