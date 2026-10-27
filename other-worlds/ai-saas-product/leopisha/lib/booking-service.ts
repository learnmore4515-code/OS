import { type BookingFormValues } from "./booking.ts";
import { sendBookingConfirmation, type BookingConfirmationData } from "./email.ts";

export interface BookingStore {
  isSlotBooked(slot: { bookingDate: string; bookingTime: string }): Promise<boolean>;
  createBooking(booking: BookingFormValues): Promise<{ id: string }>;
  setCalendarEventId(bookingId: string, calendarEventId: string): Promise<void>;
  deleteBooking(bookingId: string): Promise<void>;
  getBooking(bookingId: string): Promise<BookingFormValues | null>;
}

export interface BookingCalendarClient {
  createEvent(input: BookingFormValues & { timezone: string; durationMinutes: number }): Promise<{ eventId: string; meetLink: string | null }>;
}

export interface BookingServiceOptions {
  store: BookingStore;
  calendar: BookingCalendarClient;
  timezone: string;
  durationMinutes: number;
  sendConfirmationEmail?: (data: BookingConfirmationData) => Promise<void>;
}

export function createBookingService({ store, calendar, timezone, durationMinutes, sendConfirmationEmail }: BookingServiceOptions) {
  return {
    async createBooking(booking: BookingFormValues) {
      let isTaken;
      try {
        isTaken = await store.isSlotBooked({
          bookingDate: booking.bookingDate,
          bookingTime: booking.bookingTime,
        });
      } catch (err) {
        throw new Error(`[booking] isSlotBooked failed: ${err instanceof Error ? err.message : JSON.stringify(err)}`);
      }

      if (isTaken) {
        return {
          ok: false as const,
          error: "That time is already booked. Please choose another slot.",
        };
      }

      let id;
      try {
        ({ id } = await store.createBooking(booking));
      } catch (err) {
        throw new Error(`[booking] createBooking failed: ${err instanceof Error ? err.message : JSON.stringify(err)}`);
      }

      try {
        const { eventId, meetLink } = await calendar.createEvent({
          ...booking,
          timezone,
          durationMinutes,
        });
        await store.setCalendarEventId(id, eventId);

        // Send confirmation email (don't block the response; error is surfaced in the API response)
        let confirmationEmailError: string | null = null;
        if (sendConfirmationEmail) {
          const emailData: BookingConfirmationData = {
            name: booking.name,
            company: booking.company,
            email: booking.email,
            bookingDate: booking.bookingDate,
            bookingTime: booking.bookingTime,
            timezone,
            service: booking.service,
            calendarEventId: eventId,
            meetLink: meetLink ?? undefined,
          };
          try {
            await sendConfirmationEmail(emailData);
          } catch (err) {
            confirmationEmailError = err instanceof Error ? err.message : String(err);
            console.error("[booking] Failed to send confirmation email:", err);
          }
        }

        return {
          ok: true as const,
          bookingId: id,
          confirmationEmailError,
        };
      } catch (error) {
        await store.deleteBooking(id);
        throw error;
      }
    },
  };
}
