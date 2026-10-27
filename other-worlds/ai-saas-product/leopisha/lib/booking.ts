import { z } from "zod";

export const BOOKING_SOURCE = "leopisha.com/book";

export const BOOKING_ROLE_OPTIONS = [
  { value: "", label: "Select your role" },
  { value: "broker", label: "Broker / Agent" },
  { value: "underwriter", label: "Underwriter" },
  { value: "claims-adjuster", label: "Claims Adjuster" },
  { value: "customer-service", label: "Customer Service" },
  { value: "operations", label: "Operations Manager" },
  { value: "it", label: "IT / Technical" },
  { value: "other", label: "Other" },
] as const;

export const BOOKING_SERVICE_OPTIONS = [
  { value: "", label: "Select a service" },
  { value: "diagnosis", label: "Automation Diagnosis" },
  { value: "claims-automation", label: "Claims Processing Automation" },
  { value: "underwriting-automation", label: "Underwriting Automation" },
  { value: "customer-ops", label: "Customer Operations Automation" },
  { value: "fraud-detection", label: "Fraud Detection & Prevention" },
  { value: "retainer", label: "Managed Automation Operations" },
] as const;

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  company: z.string().trim().min(1, "Please enter your company name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(7, "Please enter your phone number").max(20),
  role: z.string().trim().min(1, "Please select your role").max(80),
  service: z.string().trim().min(1, "Please select a service").max(80),
  message: z.string().trim().max(2000),
  bookingDate: z.string().trim().min(1, "Please select a date").regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid date"),
  bookingTime: z.string().trim().min(1, "Please select a time").regex(/^\d{2}:\d{2}$/, "Please select a valid time"),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const BOOKING_FORM_DEFAULTS: BookingFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  role: "",
  service: "",
  message: "",
  bookingDate: "",
  bookingTime: "",
};

export function createBookingWebhookPayload(booking: BookingFormValues, submittedAt = new Date().toISOString()) {
  return {
    ...booking,
    source: BOOKING_SOURCE,
    submittedAt,
  };
}
