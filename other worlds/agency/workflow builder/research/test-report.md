# Demo Test Report — index.html (Autonomous AI Sales Agent Demo)

**Date:** 2026-10-27
**Environment:** Standalone `index.html` served via `python -m http.server` on port 8002 (workflow builder root)
**Browser automation:** Playwright (Chromium, headless)
**Credentials required:** None (demo mode — `LAUNCH_CONFIG.demoMode = true`)

## Method
Automated the full customer-to-order journey through the browser, then reset and repeated. Assertions checked page state (status chip, cart, dashboard) after each step. No console errors.

## Test cases and results

| # | Test case | Expected | Actual | Pass |
|---|-----------|----------|--------|------|
| 1 | Page loads; store branding + agent greeting | "Nairobi Trendz" + "Zara" + "DEMO AVAILABLE" | Greeting: "Hi, welcome to Nairobi Trendz 👋 I'm Zara…"; Availability: DEMO AVAILABLE | PASS |
| 2 | Product enquiry shows catalogue cards | "Premium Tech Sneakers" card + state PRODUCT_SELECTED | Cards shown; state DEMO · PRODUCT_SELECTED | PASS |
| 3 | Variant selection (size) | State VARIANT_SELECTION; cart still empty | State DEMO · VARIANT_SELECTION; cart empty | PASS |
| 4 | Add item to cart | Cart shows item; state CART_BUILDING | "Premium Tech Sneakers × 1 · eu 42", KES 4500; state CART_BUILDING | PASS |
| 5 | Delivery zone selection | State DELIVERY_SELECTION then CUSTOMER_DETAILS | CBD → state CUSTOMER_DETAILS | PASS |
| 6 | Customer details (name + phone) | State ORDER_REVIEW | State DEMO · ORDER_REVIEW | PASS |
| 7 | Explicit order confirmation | Order created; dashboard row added; Total Paid KES 0; Sync "DEMO ORDER CREATED" | Order ORD created; Jane Wanjiku +254712345678; KES 0; DEMO ORDER CREATED | PASS |
| 8 | Order totals deterministic | sneakers 4500 + CBD delivery 150 = KES 4650 after payment | Dashboard total paid showed 4650 after verify | PASS |
| 9 | Payment stays unverified until trusted callback | Total Paid KES 0 before verify | KES 0 before verify | PASS |
| 10 | Simulated trusted M-Pesa verification | State PAYMENT_VERIFIED; Total Paid = order total | State DEMO · PAYMENT_VERIFIED; paid updated | PASS |
| 11 | Honest sync labels | "DEMO ORDER CREATED" (not "SYNCED TO GOOGLE SHEETS") | "DEMO ORDER CREATED" | PASS |
| 12 | Reset + repeat | Greeting restored; dashboard empty | Greeting restored; "No orders yet" | PASS |
| 13 | No console/runtime errors | None | None | PASS |

## Verified behaviour
- Full journey works without any production credentials (no WhatsApp, M-Pesa, OpenAI, Google Sheets needed).
- `Total Paid (KES)` stays `0` until the simulated trusted payment-verification callback fires — never trusts the customer's claim.
- Sync status reads `DEMO ORDER CREATED`, never `SYNCED TO GOOGLE SHEETS` (no genuine Sheets write occurs in demo).
- Demo orders persist in `localStorage` across page reloads; reset clears them.
- Mobile/desktop responsive two-pane layout (chat left, dashboard right).

## Known limitations (documented, not bugs)
- Variant selection requires the customer to restate the size after entering `PRODUCT_SELECTED` state (state-machine flow, functional but slightly redundant).
- Customer name is stored lowercased because extraction runs on the lowercased message (cosmetic; does not affect order creation).
- After order confirmation, M-Pesa instructions now display immediately (fixed); previously required an extra message.
- The demo WhatsApp CTA link opens WhatsApp but no live agent replies (clearly labelled "Simulated channel — no live WhatsApp reply in demo").

## Demo verdict
**PASS** — The acceptance criterion is met: the demo can be opened, operated beginning-to-end, reset, repeated, and recorded (Loom) without first supplying production credentials.
