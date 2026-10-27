import Link from "next/link";

export default function SignupPage() {
  return (
    <div style={{ padding: 24, maxWidth: 400, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Create an account</h1>
      <form id="signup-form" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ fontSize: 14, color: "#374151", display: "flex", flexDirection: "column", gap: 4 }}>
          Email
          <input name="email" type="email" required autoComplete="email" style={{ padding: 8, fontSize: 14 }} />
        </label>
        <label style={{ fontSize: 14, color: "#374151", display: "flex", flexDirection: "column", gap: 4 }}>
          Password
          <input name="password" type="password" required autoComplete="new-password" style={{ padding: 8, fontSize: 14 }} />
        </label>
        <button type="submit" style={{ padding: 10, fontSize: 14, background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Create account
        </button>
      </form>
      <p id="signup-error" style={{ color: "#dc2626", fontSize: 14, marginTop: 8, display: "none" }}>Signup failed.</p>
      <p style={{ marginTop: 16, fontSize: 14, color: "#4b5563" }}>
        Already have an account? <Link href="/login" style={{ color: "#2563eb" }}>Log in</Link>
      </p>
      <script
        id="signup-script"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              const form = document.getElementById('signup-form');
              const error = document.getElementById('signup-error');
              form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const fd = new FormData(form);
                const res = await fetch('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email: fd.get('email'), password: fd.get('password') }), headers: { 'Content-Type': 'application/json' } });
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
