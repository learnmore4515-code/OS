import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buggy SaaS Demo — SHIP CHECK",
  description: "Buggy demonstration application for SHIP CHECK (broken checkout/auth flows).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", color: "#111827", background: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}
