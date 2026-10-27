import { cookies } from "next/headers";
import { validateSession, markCheckoutPaid, isPaid } from "@/lib/store";

export const runtime = "nodejs";

export default async function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const { session_id } = await (searchParams as Promise<{ session_id?: string }>);
  const cookieStore = await cookies();
  const token = cookieStore.get("shipcheck_session")?.value;
  let paid = false;
  let email = "";
  if (token) {
    email = validateSession(token) ?? "";
    // A success URL alone does not grant access. Paid access is activated by
    // backend confirmation of the checkout session (simulating a webhook).
    if (session_id) markCheckoutPaid(session_id);
    paid = await isPaid(email);
  }
  return (
    <div style={{ padding: 24, maxWidth: 500, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8, color: paid ? "#15803d" : "#dc2626" }}>
        {paid ? "Payment successful" : "Payment not confirmed"}
      </h1>
      <p style={{ color: "#4b5563", marginBottom: 20 }}>
        {paid
          ? "Your simulated payment was confirmed by the backend and paid access has been activated."
          : "Sign in to confirm your payment and activate paid access."}
      </p>
      {paid ? (
        <a href="/dashboard" style={{ color: "#2563eb", fontWeight: 600 }}>
          Go to dashboard
        </a>
      ) : (
        <a href="/login" style={{ color: "#2563eb", fontWeight: 600 }}>
          Sign in
        </a>
      )}
    </div>
  );
}
