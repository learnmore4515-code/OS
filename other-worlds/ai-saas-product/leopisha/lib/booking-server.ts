import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";

import type { BookingCalendarClient, BookingStore } from "./booking-service.ts";
import type { BookingFormValues } from "./booking.ts";

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getBookingConfig() {
  return {
    supabaseUrl: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    supabaseServiceRoleKey: getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    bookingsTable: process.env.SUPABASE_BOOKINGS_TABLE || "bookings",
    timezone: process.env.BOOKING_TIMEZONE || "Africa/Nairobi",
    durationMinutes: Number(process.env.BOOKING_DURATION_MINUTES || "30"),
    calendarId: getRequiredEnv("GOOGLE_CALENDAR_ID"),
    googleClientId: getRequiredEnv("GOOGLE_CLIENT_ID"),
    googleClientSecret: getRequiredEnv("GOOGLE_CLIENT_SECRET"),
    googleRefreshToken: getRequiredEnv("GOOGLE_REFRESH_TOKEN"),
    includeMeetLink: process.env.BOOKING_INCLUDE_MEET_LINK === "true",
    inviteEmails: (process.env.BOOKING_INVITE_EMAILS || "").split(",").map((v) => v.trim()).filter(Boolean),
    // Email config
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpSecure: process.env.SMTP_SECURE,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    smtpFrom: process.env.SMTP_FROM,
  };
}

export function createSupabaseBookingStore(): BookingStore {
  const config = getBookingConfig();
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  return {
    async isSlotBooked({ bookingDate, bookingTime }) {
      const { count, error } = await supabase
        .from(config.bookingsTable)
        .select("id", { count: "exact", head: true })
        .eq("booking_date", bookingDate)
        .eq("booking_time", bookingTime);

      if (error) throw error;
      return (count || 0) > 0;
    },

    async createBooking(booking) {
      const { data, error } = await supabase
        .from(config.bookingsTable)
        .insert({
          name: booking.name,
          company: booking.company,
          email: booking.email,
          phone: booking.phone,
          role: booking.role,
          service: booking.service,
          message: booking.message,
          booking_date: booking.bookingDate,
          booking_time: booking.bookingTime,
        })
        .select("id")
        .single();

      if (error || !data) throw error || new Error("Could not save booking");
      return { id: String(data.id) };
    },

    async setCalendarEventId(bookingId, calendarEventId) {
      const { error } = await supabase
        .from(config.bookingsTable)
        .update({ calendar_event_id: calendarEventId })
        .eq("id", bookingId);

      if (error) throw error;
    },

    async deleteBooking(bookingId) {
      const { error } = await supabase
        .from(config.bookingsTable)
        .delete()
        .eq("id", bookingId);

      if (error) throw error;
    },

    async getBooking(bookingId) {
      const { data, error } = await supabase
        .from(config.bookingsTable)
        .select("*")
        .eq("id", bookingId)
        .single();

      if (error || !data) return null;
      return {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        role: data.role,
        service: data.service,
        message: data.message,
        bookingDate: data.booking_date,
        bookingTime: data.booking_time,
      } as BookingFormValues;
    },
  };
}

function toUtcIso(date: string, time: string, timezone: string) {
  const local = new Date(`${date}T${time}:00`);
  const utc = new Date(local.toLocaleString("en-US", { timeZone: "UTC" }));
  void timezone;
  return utc.toISOString();
}

export function createGoogleCalendarClient(): BookingCalendarClient {
  const config = getBookingConfig();
  const oauth2 = new google.auth.OAuth2(config.googleClientId, config.googleClientSecret);
  oauth2.setCredentials({ refresh_token: config.googleRefreshToken });
  const calendar = google.calendar({ version: "v3", auth: oauth2 });

  return {
    async createEvent(input: BookingFormValues & { timezone: string; durationMinutes: number }) {
      const start = new Date(`${input.bookingDate}T${input.bookingTime}:00`);
      const end = new Date(start.getTime() + input.durationMinutes * 60_000);

      const response = await calendar.events.insert({
        calendarId: config.calendarId,
        conferenceDataVersion: config.includeMeetLink ? 1 : 0,
        sendUpdates: "all",
        requestBody: {
          summary: `Leo Pisha consultation — ${input.company}`,
          description: [
            `Name: ${input.name}`,
            `Company: ${input.company}`,
            `Email: ${input.email}`,
            `Phone: ${input.phone}`,
            `Role: ${input.role}`,
            `Service: ${input.service}`,
            input.message ? `Notes: ${input.message}` : null,
          ].filter(Boolean).join("\n"),
          start: {
            dateTime: `${input.bookingDate}T${input.bookingTime}:00`,
            timeZone: input.timezone,
          },
          end: {
            dateTime: end.toISOString(),
            timeZone: input.timezone,
          },
          attendees: [
            { email: input.email },
            ...config.inviteEmails.map((email) => ({ email })),
          ],
          ...(config.includeMeetLink
            ? {
                conferenceData: {
                  createRequest: {
                    requestId: `${input.company}-${input.bookingDate}-${input.bookingTime}`,
                  },
                },
              }
            : {}),
        },
      });

      const eventId = response.data.id;
      if (!eventId) {
        throw new Error("Calendar event was created without an id");
      }
      const meetLink = response.data.hangoutLink || response.data.conferenceData?.entryPoints?.find((ep: any) => ep.entryPointType === "video")?.uri || null;
      return { eventId, meetLink };
    },
  };
}
