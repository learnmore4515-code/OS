import { NextResponse } from "next/server";

import { bookingSchema } from "@/lib/booking";
import { createBookingService } from "@/lib/booking-service";
import { createGoogleCalendarClient, createSupabaseBookingStore, getBookingConfig } from "@/lib/booking-server";
import { sendBookingConfirmation, sendLeoBookingNotification } from "@/lib/email";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const config = getBookingConfig();
    const store = createSupabaseBookingStore();
    const service = createBookingService({
      store,
      calendar: createGoogleCalendarClient(),
      timezone: config.timezone,
      durationMinutes: config.durationMinutes,
      sendConfirmationEmail: sendBookingConfirmation,
    });

    const result = await service.createBooking(parsed.data);

    if (!result.ok) {
      return NextResponse.json(result, { status: 409 });
    }

    // Notify Leo of the new booking (never blocks the customer response; error is surfaced in the API response)
    let leoEmailError: string | null = null;
    try {
      await sendLeoBookingNotification({ ...parsed.data, timezone: config.timezone });
    } catch (err) {
      leoEmailError = err instanceof Error ? err.message : String(err);
      console.error("[booking] Leo notification email failed:", err);
    }

    return NextResponse.json({
      ok: true,
      bookingId: result.bookingId,
      confirmationEmailError: result.confirmationEmailError ?? null,
      leoEmailError,
    }, { status: 200 });
  } catch (error) {
    const err = error as { message?: string; name?: string; stack?: string; code?: string; status?: number; errors?: unknown[] };
    console.error("[booking] create booking error:", {
      message: err?.message,
      name: err?.name,
      code: err?.code,
      status: err?.status,
      errors: err?.errors,
      stack: err?.stack,
      fullError: String(error),
    });
    return NextResponse.json(
      { ok: false, error: "Could not confirm this booking. Please try again or email hello@leopisha.com instead." },
      { status: 502 }
    );
  }
}
