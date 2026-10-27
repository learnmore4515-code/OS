"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [me, setMe] = useState<{ authenticated: boolean; paid: boolean; email?: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : { authenticated: false, paid: false, email: undefined }))
      .then(setMe)
      .catch(() => setMe({ authenticated: false, paid: false, email: undefined }));
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 500, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Checkout</h1>
      <p style={{ color: "#4b5563", marginBottom: 20 }}>Simulated Stripe Checkout — no real payment is made.</p>
      {!me ? (
        <p style={{ color: "#4b5563" }}>Loading…</p>
      ) : me.paid ? (
        <p style={{ color: "#15803d" }}>You already have active paid access.</p>
      ) : (
        <>
          <form id="checkout-form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontSize: 14, color: "#374151", display: "flex", flexDirection: "column", gap: 4 }}>
              Email
              <input name="email" type="email" required autoComplete="email" defaultValue={me.email ?? ""} style={{ padding: 8, fontSize: 14 }} />
            </label>
            <p style={{ fontSize: 12, color: "#6b7280" }}>Plan: Pro Monthly — $19 (test mode simulation)</p>
            <button type="submit" style={{ padding: 10, fontSize: 14, background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }} data-testid="checkout-button">
              Complete checkout (test)
            </button>
          </form>
          <p id="checkout-error" style={{ color: "#dc2626", fontSize: 14, marginTop: 8, display: "none" }}></p>
        </>
      )}
      <script
        id="checkout-script"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              const form = document.getElementById('checkout-form');
              const error = document.getElementById('checkout-error');
              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const fd = new FormData(form);
                const res = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ email: fd.get('email') }), headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
                if (res.ok) {
                  const data = await res.json();
                  window.location.href = data.url || '/checkout/success';
                } else {
                  error.style.display = 'block';
                  error.textContent = 'Checkout failed.';
                }
              });
            })();
          `,
        }}
      />
    </div>
  );
}
