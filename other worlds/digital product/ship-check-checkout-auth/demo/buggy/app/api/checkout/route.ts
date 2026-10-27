import { NextResponse } from "next/server";
import { validateSession, createCheckout } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/shipcheck_session=([^;]+)/);
  const token = match?.[1];
  const email = token ? validateSession(token) : null;
  if (!email) {
    return NextResponse.json({ error: "authentication required" }, { status: 401 });
  }
  const { priceId = "price_monthly_19" } = await request.json();
  const checkoutId = `cs_demo_${Math.random().toString(36).slice(2)}`;
  createCheckout(checkoutId, email);
  return NextResponse.json({ ok: true, checkoutId, url: `/checkout/success?session_id=${checkoutId}` });
}
