import { setPaid } from "@/lib/store";

export default async function CancelPage() {
  // BUG: cancellation incorrectly grants paid access.
  await setPaid("demo@example.com", true);
  return (
    <div style={{ padding: 24, maxWidth: 500, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Payment cancelled</h1>
      <p style={{ color: "#4b5563", marginBottom: 20 }}>Your simulated payment was cancelled. No paid access was granted.</p>
      <a href="/checkout" style={{ color: "#2563eb", fontWeight: 600 }}>Try again</a>
    </div>
  );
}
