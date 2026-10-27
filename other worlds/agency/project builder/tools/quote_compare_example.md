# Worked example — Medical insurance quotation comparison

**Prepared for:** Kevin Osiga, Insurance Broker, Kenya (EAT / UTC+3)
**Product:** Medical insurance only
**Underwriters in example:** Jubilee (J-Care Premium) vs Britam (Milele Health)
**Purpose:** See how `tools/quote_compare.html` works before sending it to Kevin for a real quotation.

> Premiums and per-benefit sub-limits are **not published** by underwriters (a quote is required). The figures below are **illustrative sample data** only, based on the researched product profiles for Jubilee J-Care Premium and Britam Milele Health. Replace them with the actual quoted figures when Kevin runs a real quotation.

---

## How to use the tool

1. Open `tools/quote_compare.html` in any browser (Chrome, Edge, Safari, Firefox). Zero installation.
2. Fill in **Client details**: name, age, sum insured, location, pre-existing conditions.
3. Add one block per underwriter (3–4). For each:
   - Enter underwriter name and premium (annual or monthly) in KSh.
   - Add each quoted benefit: pick the benefit category, enter the sub-limit (KSh), waiting period, and exclusions.
4. Click **Generate comparison**. A side-by-side table renders with a premium summary (lowest highlighted) and per-underwriter sub-limits/waiting periods/exclusions.
5. Click **Print / Save as PDF** (or Ctrl+P → "Save as PDF") to send the client-ready comparison to the client.

---

## Sample client

| Field | Value |
|---|---|
| Client name | Wanjiku Muthoni |
| Age | 34 |
| Sum insured | KSh 5,000,000 |
| Location | Nairobi, Kenya |
| Pre-existing conditions | Hypertension (diagnosed 2022) |

---

## Sample underwriter entries

### Underwriter 1 — Jubilee (J-Care Premium)

| Field | Value |
|---|---|
| Premium type | Annual |
| Premium amount | KSh 185,000 |

| Benefit | Sub-limit (KSh) | Waiting period | Exclusions |
|---|---|---|---|
| Inpatient | 10,000,000 | — | None |
| Outpatient | 300,000 | — | — |
| Maternity | 150,000 | 12 months | Optional benefit; PEC waiting applies |
| Dental | 50,000 | 6 months | — |
| Optical | 40,000 | 6 months | — |
| Cancer | Covered (within inpatient) | — | — |
| Chronic conditions | Covered | 12 months | Hypertension waiting applies |
| Mental health | Covered | — | — |
| HIV | Covered | — | — |
| Congenital | Covered | — | — |
| Wellness checks | Included | — | Annual checkups & vaccinations |
| Telemedicine | Included | — | — |

Notes (from research): optional outpatient/maternity/dental/optical; cancer, HIV, chronic, congenital, psychiatric covered; annual checkups & vaccinations; telemedicine, drug delivery, wellness coaching; overseas treatment on credit + regional coverage; activates 24–48h after payment. Quote via digital.jubileeinsurance.com/jcare or callback 0709 949 000.

### Underwriter 2 — Britam (Milele Health, Platinum tier)

| Field | Value |
|---|---|
| Premium type | Annual |
| Premium amount | KSh 210,000 |

| Benefit | Sub-limit (KSh) | Waiting period | Exclusions |
|---|---|---|---|
| Inpatient | 10,000,000 | — | None |
| Outpatient | Covered (seamless, no approvals) | — | — |
| Maternity | Not itemized | Tier-dependent | — |
| Dental | 75,000 | 6 months | — |
| Optical | 60,000 | 6 months | — |
| Cancer | Covered | — | — |
| Chronic conditions | Tier-dependent | 12 months | Hypertension waiting applies |
| Mental health | Comprehensive (Platinum) | — | — |
| HIV | Covered | — | — |
| Congenital | — | — | — |
| Wellness checks | Included | — | Annual wellness checks |
| Telemedicine | — | — | — |

Notes (from research): outpatient seamless (no approvals) all tiers; hospital access tier-dependent (Platinum open panel incl. Aga Khan, Nairobi, MP Shah, Mater); chronic conditions tier-dependent; Critical Illness Cash Benefit Platinum & Gold; mental health Platinum & Gold comprehensive; annual wellness checks all tiers. Quote via callback or WhatsApp Bella 254705100100.

### Underwriter 3 — Sanlam (optional, 3rd underwriter)

| Field | Value |
|---|---|
| Premium type | Annual |
| Premium amount | KSh 165,000 |

| Benefit | Sub-limit (KSh) | Waiting period | Exclusions |
|---|---|---|---|
| Inpatient | 5,000,000 | — | — |
| Outpatient | 250,000 | — | — |
| Maternity | 100,000 | 12 months | — |
| Dental | 40,000 | 6 months | — |
| Optical | 30,000 | 6 months | — |

*(Fill in the remaining rows in the tool as quoted.)*

### Underwriter 4 — (optional)

Leave blank or add a 4th underwriter (e.g. APA Insurance or ICEA Lion) when Kevin has a fourth quote. The tool supports up to 4.

---

## Expected output (what Kevin will see)

**Premium comparison**
- Jubilee — KSh 185,000 /annual ← Lowest
- Britam — KSh 210,000 /annual
- Sanlam — KSh 165,000 /annual ← Lowest (if added)

**Comparison table (benefit rows × underwriter columns)** — each cell shows sub-limit, waiting period, and exclusions, normalised across underwriters so Jubilee's "optional maternity" lines up with Britam's "not itemized maternity."

**Sub-limits, waiting periods & exclusions by underwriter** — detailed block per underwriter.

**Disclaimer footer:**
> For price comparison purposes only; final terms subject to underwriter policy document. Premiums shown are as quoted and must be confirmed with the underwriter before binding. Not a policy document or advice.

---

## Verification checklist (for Kevin)

- [ ] Opened `quote_compare.html` directly in browser — no install, no JSON, no CLI
- [ ] Entered client details + 2–4 underwriter quotes
- [ ] Generated a clean side-by-side comparison table
- [ ] Printed / saved as PDF to send to a client
- [ ] Time to create a comparative quotation ≤ 30 minutes (vs 2–3 hours manual)

If the above works, Kevin can test with a real quotation and, if time saved is demonstrated, proceed to a paid engagement.

---

**Next step:** Send `tools/quote_compare.html` to Kevin (email/WhatsApp). He opens it, fills a real quotation, and gives feedback. Schedule any demo/call for Kenya business hours (EAT, UTC+3).
