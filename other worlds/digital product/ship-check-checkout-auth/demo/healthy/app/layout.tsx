import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthy SaaS Demo — SHIP CHECK",
  description: "Healthy demonstration application for SHIP CHECK.",
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
