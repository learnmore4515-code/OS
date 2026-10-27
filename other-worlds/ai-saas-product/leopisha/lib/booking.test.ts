import assert from "node:assert/strict";
import test from "node:test";

import {
  BOOKING_FORM_DEFAULTS,
  BOOKING_ROLE_OPTIONS,
  BOOKING_SERVICE_OPTIONS,
  BOOKING_SOURCE,
  bookingSchema,
  createBookingWebhookPayload,
  type BookingFormValues,
} from "./booking.ts";
import { createBookingService, type BookingCalendarClient, type BookingStore } from "./booking-service.ts";

const validBooking: BookingFormValues = {
  ...BOOKING_FORM_DEFAULTS,
  name: "Jane Doe",
  company: "Acme Insurance Brokers",
  email: "jane@acme.co.ke",
  phone: "+254700000000",
  role: "broker",
  service: "diagnosis",
  message: "We want to reduce manual claims triage time.",
  bookingDate: "2026-10-20",
  bookingTime: "10:00",
};

test("booking form defaults require an intentional role and service selection", () => {
  assert.equal(BOOKING_FORM_DEFAULTS.role, "");
  assert.equal(BOOKING_FORM_DEFAULTS.service, "");
  assert.equal(BOOKING_ROLE_OPTIONS[0]?.value, "");
  assert.equal(BOOKING_SERVICE_OPTIONS[0]?.value, "");
});

test("booking schema rejects empty placeholder selections", () => {
  const result = bookingSchema.safeParse({
    ...validBooking,
    role: "",
    service: "",
  });

  assert.equal(result.success, false);
  if (result.success) {
    assert.fail("expected booking schema to reject empty role and service values");
  }

  const fields = result.error.issues.map((issue) => issue.path.join("."));
  assert(fields.includes("role"));
  assert(fields.includes("service"));
});

test("booking schema requires a booking date and time", () => {
  const result = bookingSchema.safeParse({
    ...validBooking,
    bookingDate: "",
    bookingTime: "",
  });

  assert.equal(result.success, false);
  if (result.success) {
    assert.fail("expected booking schema to require booking slot fields");
  }

  const fields = result.error.issues.map((issue) => issue.path.join("."));
  assert(fields.includes("bookingDate"));
  assert(fields.includes("bookingTime"));
});

test("booking webhook payload adds a stable source, timestamp, and slot fields", () => {
  const submittedAt = "2026-10-14T00:00:00.000Z";
  const payload = createBookingWebhookPayload(validBooking, submittedAt);

  assert.equal(payload.source, BOOKING_SOURCE);
  assert.equal(payload.submittedAt, submittedAt);
  assert.equal(payload.company, validBooking.company);
  assert.equal(payload.bookingDate, validBooking.bookingDate);
  assert.equal(payload.bookingTime, validBooking.bookingTime);
});

test("booking service rejects a slot that is already booked", async () => {
  const store: BookingStore = {
    async isSlotBooked() {
      return true;
    },
    async createBooking() {
      throw new Error("should not create booking when slot is taken");
    },
    async setCalendarEventId() {
      throw new Error("should not update booking when slot is taken");
    },
  };

  const calendar: BookingCalendarClient = {
    async createEvent() {
      throw new Error("should not create calendar event when slot is taken");
    },
  };

  const service = createBookingService({
    store,
    calendar,
    timezone: "Africa/Nairobi",
    durationMinutes: 30,
  });

  const result = await service.createBooking(validBooking);

  assert.equal(result.ok, false);
  assert.equal(result.error, "That time is already booked. Please choose another slot.");
});

test("booking service saves booking and calendar event for a free slot", async () => {
  const calls: string[] = [];
  const store: BookingStore = {
    async isSlotBooked() {
      calls.push("isSlotBooked");
      return false;
    },
    async createBooking(input) {
      calls.push(`createBooking:${input.bookingDate}:${input.bookingTime}`);
      return { id: "booking_123" };
    },
    async setCalendarEventId(id, calendarEventId) {
      calls.push(`setCalendarEventId:${id}:${calendarEventId}`);
    },
  };

  const calendar: BookingCalendarClient = {
    async createEvent(input) {
      calls.push(`createEvent:${input.bookingDate}:${input.bookingTime}`);
      return { eventId: "calendar_123" };
    },
  };

  const service = createBookingService({
    store,
    calendar,
    timezone: "Africa/Nairobi",
    durationMinutes: 30,
  });

  const result = await service.createBooking(validBooking);

  assert.equal(result.ok, true);
  assert.equal(result.bookingId, "booking_123");
  assert.deepEqual(calls, [
    "isSlotBooked",
    "createBooking:2026-10-20:10:00",
    "createEvent:2026-10-20:10:00",
    "setCalendarEventId:booking_123:calendar_123",
  ]);
});


test("booking service rolls back the booking when calendar creation fails", async () => {
  const calls: string[] = [];
  const store: BookingStore = {
    async isSlotBooked() {
      calls.push("isSlotBooked");
      return false;
    },
    async createBooking() {
      calls.push("createBooking");
      return { id: "booking_123" };
    },
    async setCalendarEventId() {
      calls.push("setCalendarEventId");
    },
    async deleteBooking(id) {
      calls.push(`deleteBooking:${id}`);
    },
  };

  const calendar: BookingCalendarClient = {
    async createEvent() {
      calls.push("createEvent");
      throw new Error("calendar failed");
    },
  };

  const service = createBookingService({
    store,
    calendar,
    timezone: "Africa/Nairobi",
    durationMinutes: 30,
  });

  await assert.rejects(() => service.createBooking(validBooking), /calendar failed/);
  assert.deepEqual(calls, ["isSlotBooked", "createBooking", "createEvent", "deleteBooking:booking_123"]);
});
