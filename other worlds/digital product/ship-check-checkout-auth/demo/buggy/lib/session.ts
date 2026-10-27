// Simulated in-memory session store for the demo only.
// Not a real authentication system; used to demonstrate SHIP CHECK behaviour.

export class SessionManager {
  private users = new Map<string, string>(); // email -> password hash (plaintext for demo realism)
  private sessions = new Map<string, string>(); // token -> email
  private paid = new Set<string>(); // emails with active paid access
  private checkouts = new Map<string, { email: string; priceId: string; paid: boolean }>();

  async authenticate(email: string, password: string): Promise<{ email: string } | null> {
    const stored = this.users.get(email);
    if (stored === undefined) return null;
    // Constant-time-ish comparison is not critical for a demo, but avoid timing leaks where cheap.
    if (stored !== password) return null;
    return { email };
  }

  async register(email: string, password: string): Promise<void> {
    if (this.users.has(email)) throw new Error("user exists");
    this.users.set(email, password);
  }

  create(email: string): string {
    const token = `sess_${Math.random().toString(36).slice(2)}`;
    this.sessions.set(token, email);
    return token;
  }

  validate(token: string): boolean {
    return this.sessions.has(token);
  }

  emailFor(token: string): string | undefined {
    return this.sessions.get(token);
  }

  destroy(token: string): void {
    this.sessions.delete(token);
  }

  isPaid(email: string): boolean {
    return this.paid.has(email);
  }

  createCheckout(email: string, checkoutId: string, priceId: string): void {
    this.checkouts.set(checkoutId, { email, priceId, paid: false });
  }

  markCheckoutPaid(checkoutId: string): void {
    const c = this.checkouts.get(checkoutId);
    if (c && !c.paid) {
      c.paid = true;
      this.paid.add(c.email);
    }
  }

  setPaid(email: string, paid: boolean): void {
    if (paid) this.paid.add(email);
    else this.paid.delete(email);
  }
}

export const sessions = new SessionManager();
