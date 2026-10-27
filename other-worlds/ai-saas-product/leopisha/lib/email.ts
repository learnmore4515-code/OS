import nodemailer from "nodemailer";

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
}

export interface BookingConfirmationData {
  name: string;
  company: string;
  email: string;
  bookingDate: string;
  bookingTime: string;
  timezone: string;
  service: string;
  message?: string;
  calendarEventId?: string;
  meetLink?: string;
}

export interface ReminderData {
  name: string;
  email: string;
  company: string;
  bookingDate: string;
  bookingTime: string;
  timezone: string;
  service: string;
  meetLink?: string;
}

function getEmailConfig(): EmailConfig {
  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || "Leo Pisha <hello@leopisha.com>",
  };
}

function createTransporter() {
  const config = getEmailConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export async function sendBookingConfirmation(data: BookingConfirmationData) {
  const config = getEmailConfig();
  const transporter = createTransporter();

  const dateStr = new Date(`${data.bookingDate}T${data.bookingTime}:00`).toLocaleString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: data.timezone,
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: #fef3c7; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h1 style="margin: 0 0 8px; font-size: 24px; color: #92400e;">Booking Confirmed ✓</h1>
        <p style="margin: 0; color: #b45309;">Your strategy call with Leo Pisha is scheduled.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 140px;">Date & Time</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${dateStr} (${data.timezone})</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Service</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.service}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Duration</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">30 minutes</td>
        </tr>
        ${data.meetLink ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Meeting Link</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="${data.meetLink}" style="color: #2563eb; text-decoration: none;">Join Google Meet</a></td>
        </tr>
        ` : ""}
      </table>

      <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 12px; font-size: 16px;">What to expect</h3>
        <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
          <li>We'll review the process you described and map the bottleneck</li>
          <li>You'll get a clear assessment of what automation would change</li>
          <li>We'll tell you honestly whether a pilot is worth doing now, later, or not at all</li>
        </ul>
      </div>

      <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">If you need to reschedule or cancel, reply to this email or contact us at <a href="mailto:hello@leopisha.com" style="color: #2563eb;">hello@leopisha.com</a>.</p>
      <p style="color: #6b7280; font-size: 14px; margin: 0;">— The Leo Pisha Team</p>
    </body>
    </html>
  `;

  const text = `
Booking Confirmed ✓

Your strategy call with Leo Pisha is scheduled.

Date & Time: ${dateStr} (${data.timezone})
Service: ${data.service}
Duration: 30 minutes
${data.meetLink ? `Meeting Link: ${data.meetLink}` : ""}

What to expect:
- We'll review the process you described and map the bottleneck
- You'll get a clear assessment of what automation would change
- We'll tell you honestly whether a pilot is worth doing now, later, or not at all

If you need to reschedule or cancel, reply to this email or contact us at hello@leopisha.com.

— The Leo Pisha Team
  `.trim();

  await transporter.sendMail({
    from: config.from,
    to: data.email,
    subject: `Booking confirmed: Leo Pisha strategy call on ${new Date(data.bookingDate).toLocaleDateString("en-KE", { weekday: "short", month: "short", day: "numeric" })}`,
    text,
    html,
  });
}

export async function sendLeoBookingNotification(data: BookingConfirmationData) {
  const config = getEmailConfig();
  const transporter = createTransporter();

  const dateStr = new Date(`${data.bookingDate}T${data.bookingTime}:00`).toLocaleString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: data.timezone,
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: #dbeafe; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h1 style="margin: 0 0 8px; font-size: 24px; color: #1e40af;">New Booking Request ✓</h1>
        <p style="margin: 0; color: #3b82f6;">A new strategy call has been booked with Leo Pisha.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 140px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Company</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.company}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Service</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.service}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Date &amp; Time</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${dateStr} (${data.timezone})</td>
        </tr>
        ${data.message
          ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Message</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.message}</td>
            </tr>`
          : ""}
      </table>

      <p style="color: #6b7280; font-size: 14px; margin: 0;">— Leo Pisha Booking System</p>
    </body>
    </html>
  `;

  const text = `
New Booking Request ✓

A new strategy call has been booked with Leo Pisha.

Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Service: ${data.service}
Date & Time: ${dateStr} (${data.timezone})
${data.message ? `Message: ${data.message}` : ""}

— Leo Pisha Booking System
  `.trim();

  await transporter.sendMail({
    from: config.from,
    to: process.env.LEO_EMAIL || config.user || "leopishaagency@gmail.com",
    subject: `New booking: ${data.name} — ${data.service} on ${new Date(data.bookingDate).toLocaleDateString("en-KE", { weekday: "short", month: "short", day: "numeric" })}`,
    text,
    html,
  });
}

export async function sendReminderEmail(data: ReminderData) {
  const config = getEmailConfig();
  const transporter = createTransporter();

  const dateStr = new Date(`${data.bookingDate}T${data.bookingTime}:00`).toLocaleString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: data.timezone,
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: #dbeafe; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h1 style="margin: 0 0 8px; font-size: 24px; color: #1e40af;">Reminder: Your call is tomorrow ⏰</h1>
        <p style="margin: 0; color: #3b82f6;">Don't forget your strategy session with Leo Pisha.</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 140px;">Date & Time</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${dateStr} (${data.timezone})</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Service</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${data.service}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Duration</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">30 minutes</td>
        </tr>
        ${data.meetLink ? `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Meeting Link</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="${data.meetLink}" style="color: #2563eb; text-decoration: none; font-weight: 600;">Join Google Meet →</a></td>
        </tr>
        ` : ""}
      </table>

      <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">See you tomorrow! If something changed, reply to this email to reschedule.</p>
      <p style="color: #6b7280; font-size: 14px; margin: 0;">— The Leo Pisha Team</p>
    </body>
    </html>
  `;

  const text = `
Reminder: Your call is tomorrow ⏰

Your strategy call with Leo Pisha is scheduled for tomorrow.

Date & Time: ${dateStr} (${data.timezone})
Service: ${data.service}
Duration: 30 minutes
${data.meetLink ? `Meeting Link: ${data.meetLink}` : ""}

See you tomorrow! If something changed, reply to this email to reschedule.

— The Leo Pisha Team
  `.trim();

  await transporter.sendMail({
    from: config.from,
    to: data.email,
    subject: `Reminder: Leo Pisha strategy call tomorrow at ${new Date(`${data.bookingDate}T${data.bookingTime}:00`).toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit", timeZone: data.timezone })}`,
    text,
    html,
  });
}

export async function testEmailConnection() {
  const transporter = createTransporter();
  return transporter.verify();
}