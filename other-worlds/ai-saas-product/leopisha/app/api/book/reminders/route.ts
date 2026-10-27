import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendReminderEmail } from "@/lib/email";

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getConfig() {
  return {
    supabaseUrl: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    supabaseServiceRoleKey: getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    bookingsTable: process.env.SUPABASE_BOOKINGS_TABLE || "bookings",
    timezone: process.env.BOOKING_TIMEZONE || "Africa/Nairobi",
    cronSecret: process.env.CRON_SECRET,
  };
}

export async function GET(req: Request) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  const config = getConfig();

  if (config.cronSecret && authHeader !== `Bearer ${config.cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  // Calculate tomorrow's date in the booking timezone
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowDate = tomorrow.toLocaleDateString("en-CA", { timeZone: config.timezone }); // YYYY-MM-DD

  // Fetch bookings for tomorrow that haven't been reminded yet
  const { data: bookings, error } = await supabase
    .from(config.bookingsTable)
    .select("*")
    .eq("booking_date", tomorrowDate)
    .eq("reminder_sent", false)
    .not("calendar_event_id", "is", null);

  if (error) {
    console.error("[reminders] Failed to fetch bookings:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch bookings" }, { status: 500 });
  }

  if (!bookings || bookings.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, message: "No bookings to remind" });
  }

  let sent = 0;
  let failed = 0;

  for (const booking of bookings) {
    try {
      await sendReminderEmail({
        name: booking.name,
        email: booking.email,
        company: booking.company,
        bookingDate: booking.booking_date,
        bookingTime: booking.booking_time,
        timezone: config.timezone,
        service: booking.service,
        // We don't have meet_link stored, but we could add it to the table
      });

      // Mark reminder as sent
      await supabase
        .from(config.bookingsTable)
        .update({ reminder_sent: true })
        .eq("id", booking.id);

      sent++;
    } catch (err) {
      console.error(`[reminders] Failed to send reminder for booking ${booking.id}:`, err);
      failed++;
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: bookings.length });
}