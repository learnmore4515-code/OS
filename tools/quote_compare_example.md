# Quote Comparison MVP — Worked Example (Jubilee vs Britam)

**Client scenario (sample):** Jane Wanjiku, age 34, Nairobi, sum insured KSh 1,000,000, no pre-existing conditions declared.

## How to use

1. Open `tools/quote_compare.html` in any browser (double-click the file — nothing to install).
2. Fill in the client details at the top.
3. Add two to four underwriters. For each, enter the underwriter name, plan/tier, annual premium, and the benefit sub-limits / terms.
4. Click **Generate comparison** to see a side-by-side table.
5. Click **Print / Save PDF** to give the client a clean comparison sheet.

## Worked example data to enter

Use these as the pre-filled starting point (from researched product pages, accessed 2026-10-21). Premiums and sub-limits below are indicative placeholders — underwriters do not publish per-benefit pricing, so enter the real figures from each quotation.

| Field | Jubilee — J-Care Premium | Britam — Milele Health |
|---|---|---|
| Underwriter name | Jubilee Insurance | Britam Insurance |
| Plan / tier | J-Care Premium | Milele Health Platinum |
| Annual premium (KSh) | (enter quoted premium) | (enter quoted premium) |
| Inpatient cover | KSh 10M cap | KSh 300K–10M (tier-dependent) |
| Outpatient | Optional benefit | Seamless, no approvals (all tiers) |
| Dental | Optional benefit | (tier-dependent) |
| Maternity | Optional benefit | (tier-dependent) |
| Optical | Optional benefit | (tier-dependent) |
| Wellness &amp; checkups | Annual checkups &amp; vaccinations | Annual wellness checks (all tiers) |
| Waiting period (pre-existing) | Typically ~12 months | Tier-dependent |
| Exclusions | See policy document | See policy document |

## Notes

- Medical insurance only (MVP v1). No motor insurance.
- 3–4 underwriters per quotation.
- Output is a clean HTML comparison table with a price comparison summary and a disclaimer: *"For price comparison purposes only. Final terms are subject to each underwriter's policy document."*
- Kevin opens the HTML file directly in his browser — zero installation, no backend, no accounts.

## Next step

Send this file to Kevin. He tests it with a real quotation and gives feedback. If he confirms time saved (2–3 hours → 30 minutes or less), propose a paid engagement.
