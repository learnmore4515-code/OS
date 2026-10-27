import Link from "next/link";

export default function LoginPage() {
  return (
    <div style={{ padding: 24, maxWidth: 400, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Log in</h1>
      <form id="login-form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ fontSize: 14, color: "#374151", display: "flex", flexDirection: "column", gap: 4 }}>
          Email
          <input name="email" type="email" required autoComplete="email" style={{ padding: 8, fontSize: 14 }} />
        </label>
        <label style={{ fontSize: 14, color: "#374151", display: "flex", flexDirection: "column", gap: 4 }}>
          Password
          <input name="password" type="password" required autoComplete="current-password" style={{ padding: 8, fontSize: 14 }} />
        </label>
        <button type="submit" style={{ padding: 10, fontSize: 14, background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Sign in
        </button>
      </form>
      <p id="login-error" style={{ color: "#dc2626", fontSize: 14, marginTop: 8, display: "none" }}>Invalid email or password.</p>
      <p style={{ marginTop: 16, fontSize: 14, color: "#4b5563" }}>
        Don't have an account? <Link href="/signup" style={{ color: "#2563eb" }}>Sign up</Link>
      </p>
      <script
        id="login-script"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              const form = document.getElementById('login-form');
              const error = document.getElementById('login-error');
              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const fd = new FormData(form);
                const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') }), headers: { 'Content-Type': 'application/json' } });
                error.style.display = res.ok ? 'none' : 'block';
                if (res.ok) window.location.href = '/dashboard';
              });
            })();
          `,
        }}
      />
    </div>
  );
}
