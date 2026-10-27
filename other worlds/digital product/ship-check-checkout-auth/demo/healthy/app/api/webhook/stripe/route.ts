import { NextResponse } from "next/server";
import { isProcessed, markProcessed, setPaid } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { type, data } = await request.json();
  const eventId = data?.id ?? `evt_${Math.random().toString(36).slice(2)}`;
  if (await isProcessed(eventId)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }
  await markProcessed(eventId);
  if (type === "checkout.session.completed" && data?.email) {
    setPaid(data.email, true);
  }
  return NextResponse.json({ ok: true, received: type });
}
