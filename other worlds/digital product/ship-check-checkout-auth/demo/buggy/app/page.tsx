import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>Healthy SaaS Demo</h1>
      <p style={{ marginBottom: 24, color: "#4b5563" }}>
        This is the <strong>healthy</strong> demonstration of SHIP CHECK. Signup, login, checkout, and paid access all behave correctly.
      </p>
      <nav style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
        <Link href="/" style={navLink()} aria-label="Home">Home</Link>
        <Link href="/login" style={navLink()} aria-label="Login">Login</Link>
        <Link href="/signup" style={navLink()} aria-label="Signup">Signup</Link>
        <Link href="/checkout" style={navLink()} aria-label="Checkout">Checkout</Link>
        <Link href="/dashboard" style={navLink()} aria-label="Dashboard">Dashboard (paid)</Link>
        {/* BROKEN: dangling navigation link to a nonexistent route */}
        <Link href="/nonexistent" style={navLink()} aria-label="Broken link">Broken link</Link>
      </nav>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16, background: "#f9fafb" }}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Status: buggy</h2>
        <ul style={{ color: "#4b5563" }}>
          <li>Broken navigation link to /nonexistent.</li>
          <li>Login accepts any password (validation removed).</li>
          <li>Protected pages accessible without a session.</li>
          <li>Checkout cancellation incorrectly grants paid access.</li>
          <li>Webhooks are not idempotent (duplicates processed).</li>
        </ul>
      </div>
      {/* BROKEN: fixed-width element overflows on mobile, breaking the mobile layout */}
      <div style={{ width: 1200, background: "#fee2e2", padding: 16, marginTop: 24, color: "#991b1b", fontWeight: 600 }}>
        Mobile layout broken: this 1200px-wide block overflows narrow viewports.
      </div>
    </div>
  );
}

function navLink() {
  return {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: 500,
    padding: "6px 12px",
    borderRadius: 6,
    border: "1px solid transparent",
  } as React.CSSProperties;
}
