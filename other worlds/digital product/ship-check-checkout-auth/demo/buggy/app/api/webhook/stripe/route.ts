import { NextResponse } from "next/server";
import { setPaid } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { type, data } = await request.json();
  // BUG: idempotency removed — duplicate webhooks are processed every time.
  if (type === "checkout.session.completed" && data?.email) {
    setPaid(data.email, true);
  }
  return NextResponse.json({ ok: true, received: type });
}
