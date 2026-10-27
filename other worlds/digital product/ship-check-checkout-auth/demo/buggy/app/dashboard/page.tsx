"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [me, setMe] = useState<{ authenticated: boolean; paid: boolean; email?: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : { authenticated: false, paid: false }))
      .then(setMe)
      .catch(() => setMe({ authenticated: false, paid: false }));
  }, []);

  if (!me) {
    return (
      <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28 }}>Dashboard</h1>
        <p style={{ color: "#4b5563" }}>Loading…</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: "#4b5563", marginBottom: 24 }}>Paid-access area. Only authenticated, paying users should see this.</p>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16, marginBottom: 20, background: me.paid ? "#f0fdf4" : "#fffbeb" }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Email: {me.email ?? "-"}</p>
        <p style={{ margin: 4, color: me.paid ? "#15803d" : "#92400e" }}>Paid access: {me.paid ? "active" : "inactive"}</p>
        {me.authenticated && !me.paid && (
          <p style={{ margin: 4, color: "#4b5563" }}>You are logged in but do not have active paid access.</p>
        )}
      </div>
      {me.paid ? (
        <>
          <p style={{ color: "#15803d", fontWeight: 600 }}>Welcome to your paid area.</p>
          <form id="logout-form" style={{ marginTop: 16, display: "inline" }}>
            <button type="submit" style={{ padding: "8px 14px", fontSize: 14, background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
              Log out
            </button>
          </form>
        </>
      ) : (
        <>
          <p style={{ color: "#4b5563" }}>You need a paid subscription to view this content.</p>
          <a href="/checkout" style={{ color: "#2563eb", fontWeight: 600, marginLeft: 8 }}>
            Go to checkout
          </a>
        </>
      )}
      <script
        id="logout-script"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              document.getElementById('logout-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                await fetch('/api/auth/login', { method: 'DELETE', credentials: 'include' });
                window.location.href = '/login';
              });
            })();
          `,
        }}
      />
    </div>
  );
}
