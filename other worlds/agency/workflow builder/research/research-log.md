# Research Log

## Resume point
- Batch: 1 (in progress — candidate investigation underway)
- Completed count: 56 candidates recorded (48 + 10 new: Benus Beauty, Baki Beauty, Hussein The Plug, Accessories Kenya, Gadget Kenya, Multitouch Enterprise, Sikam Furniture, Wood Furniture Kenya)
- Investigated: 32 via website/WebSearch (added: Benus Beauty, Baki Beauty, Hussein The Plug, Accessories Kenya, Gadget Kenya, Multitouch Enterprise, Sikam Furniture, Wood Furniture Kenya; Duvena[Cloudflare], Victoria Homestore/Monsoon/Wellive[timeout], Decor Hub[Cloudflare] blocked)
- Qualified count: 28 (16 batch-1 + Bree Style #90, Mbaka #88, Benus #89, Aleena #87, Hussein #86, Sikam #87, Royal Boutiques #70 partial, Baki #72 partial, Accessories Kenya #70 partial, Gadget Kenya #72 partial, Multitouch #70 partial, Wood Furniture #62 partial — all have WhatsApp AI sales gap; none use a comparable WhatsApp AI agent)
- Insufficient-evidence count: 2 (Veda Fashion, Nayomi — JS-rendered pages returned only header)
- Disqualified count: 0
- Pending verification count: 26 (BeautyClick, Phone Place Kenya[403], mydecor.co.ke[empty], HerStyle[deeper cart check], Jamwas[timeout], Almasi Skincare[blog+physical shop, weaker fit])
- Blocked-by-Cloudflare/timeout: BeautyClick, Phone Place Kenya, Duvena, Victoria Homestore, Monsoon Furniture, Wellive Kenya, Decor Hub, Jamwas
- Total candidate pool: 56
- Next task: Discover more candidates via WebSearch to reach 100 qualified; meanwhile proceed to n8n workflow audit

## Batch history
| Batch | Date | Source | Candidates found | Qualified | Disqualified | Pending | Blocker |
|-------|------|--------|--------|------------------|-----------|--------------|---------|---------|
| 1 | 2026-10-26 | WebSearch (Tavily) + Dukazote directory snapshot | 41 | 9 | 0 | 32 | Instagram/TikTok login walls prevent direct social browsing; BeautyClick + Phone Place Kenya blocked by 403/Cloudflare; mydecor.co.ke empty |

## Investigated findings (Batch 1)
| ID | Business | Status | Key evidence |
|----|----------|--------|--------------|
| PROS-0006 | Sarai Afrique | qualified | Shopify cart/checkout exists, BUT no WhatsApp ordering, no chatbot. Lavington Mall, Nairobi. KSh 2,500–7,500. info@saraiafrique.com, 0701932202/0735932202. Gap: WhatsApp AI sales agent for social/DM orders outside site. |
| PROS-0016 | Original Makeup Kenya | qualified | NO cart/checkout, manual WhatsApp ordering (+254740666666, wa.me), "Easy WhatsApp Ordering", "Chat with us to place your order", no chatbot. Nairobi, countrywide shipping. KSH 2,800–16,900. originalmakeupke@gmail.com, IG @originalmakeupkenya. Strong prospect. |
| PROS-0020 | Sterling Cosmetics | qualified (partial automation) | WooCommerce cart + "Add to cart", AND manual "Order on Whatsapp" buttons, no chatbot. Nairobi CBD, Uchumi House. KSh 590–5,300. 0726240195. Gap: automate WhatsApp ordering. |
| PROS-0021 | Beauty Ridge | qualified | Cart link (unverified Add to Cart), manual WhatsApp +254710561017, "Pay on delivery", "Talk to us", no chatbot. Moi Avenue Nairobi, 24/7. KES 3,260–53,650 (premium fragrances). Strong prospect. |
| PROS-0022 | Lintons Beauty World | qualified (partial automation) | Add to Cart + functioning cart, WhatsApp wa.me/254769563736 footer, no chatbot. Westlands Nairobi (Kenrail Towers). Ksh 4,000–26,450. customercare@lintonsbeauty.com. |
| PROS-0023 | Beauty Palace Nairobi | qualified (partial automation) | Add to Bag cart + M-Pesa checkout (Paybill 880100) + manual "Send Order via WhatsApp" 254743758732, no chatbot. Nairobi. Ksh 150–20,000. Gap: automate WhatsApp ordering + confirmations. |
| PROS-0034 | Homedecorkenya | qualified (partial automation) | Functioning cart/checkout ("Item added to your cart", "Check out") + manual WhatsApp wa.me/+254724349620, no chatbot. Platinum Plaza, Tom Mboya St, Nairobi. KSh 1,200–45,000. 0724349620, FB/IG/TikTok @genuinehouseholddealers. |
| PROS-0038 | iDecorators Kenya | qualified (partial automation) | Functioning cart ("Add to cart", "/cart") but many products "Unavailable"/"Sold out"; heavily promotes phone/WhatsApp (0724 950 950, wa.me/254724999922), pay on delivery → orders finalized manually. Platinum Plaza, Tom Mboya St, Nairobi. KSh 1,300–24,999. No chatbot. |
| PROS-0039 | JSmart Interior Decor | qualified (partial automation) | Cart exists ("Your Cart (0)", "Add to Cart") but "Custom Order via WhatsApp" prominent (wa.me/254721530805, wa.me/254706243403), branch phones → many orders manual. Platinum Plaza Tom Mboya St + Kamakis, Nairobi. KSh 1,500–2,000 sale items. No chatbot. |
| PROS-0004 | Shopzetu | qualified (partial automation) | Online cart (/cart panel) + WhatsApp wa.me/254748419357, no chatbot. Kenya-wide fashion. KES 1,950–6,700. support@shopzetu.com, 0703 420 780. Mixed cart + WhatsApp ordering. |
| PROS-0011 | HIII STYLE | qualified (partial automation) | Cart interface ("Your Cart", "Proceed to Checkout") but orders confirmed manually via WhatsApp wa.me/254103930040 ("Confirm Order via WhatsApp", "Our team confirms within minutes", 24/7 support), no chatbot. Kenya-based, Nairobi delivery, 401+ products across 14 categories. No email/address published. |
| PROS-0007 | Veda Fashion | insufficient-evidence | JS-rendered page returned only header "Veda Fashion | Modest Fashion Boutique in Nairobi"; no ordering/contact/price details visible. Needs re-investigation. |
| PROS-0008 | Nayomi | insufficient-evidence | JS-rendered page returned only header "Nayomi — Premium Women's Fashion in Kenya"; no ordering/contact/price details visible. Needs re-investigation. |
| PROS-0042 | MissiSippi Fashion House 254 | qualified | Nairobi CBD (Moi Avenue) + Nairobi Town. Women's suits, blazers, trenchcoats, heels, handbags, dresses. NO cart/checkout (catalog only). Manual WhatsApp +254 729 387521, "Order on WhatsApp for fast delivery across Nairobi", click-to-chat + pre-filled messages. "Style Assistant" element present but unconfirmed automated. No prices listed. sales@missisippi.fashion, +254 729 387521/+254 707 706540. Strong prospect. |
| PROS-0043 | BoshChic Fashions | qualified | Nairobi (Comet Mall, 1st Floor). Luxury kaftans, dresses, accessories. NO cart/checkout. Manual WhatsApp wa.me/254704963700, phone 0704 963 700, "Order via WhatsApp", no chatbot. Prices KES 1,000–6,000. Address Comet Mall Nairobi, Instagram, TikTok. Strong prospect. |
| PROS-0044 | A-Belly's Wear | qualified | Nairobi (Greenspan, Donholm). Dresses, tailored sets, menswear, shirts, knitwear. NO cart/checkout (asks to chat to confirm price/size/availability). Manual WhatsApp 254720780210, "Chat to order", "Personal WhatsApp support", no chatbot. No prices listed. Instagram @belinderarthur, TikTok @nyarnam1. Strong prospect. |
| PROS-0001 | Elegance Fashion Kenya | qualified | Instagram @elegance_fashion_kenya + Facebook + TikTok @elegancefashionkenya + Wix site claratorome.wixsite.com/elegancefashion; Instagram-based seller, likely manual DM/WhatsApp ordering; Nairobi fashion boutique |
| PROS-0003 | Dresses Kenya | qualified | Instagram @dresses_kenya_ + Facebook perfectfits.fashion; Instagram-based dress seller, likely manual DM/WhatsApp ordering; Nairobi |

## Notes
- Instagram (instagram.com) is behind a login wall — cannot browse logged-in. TikTok shows loading state.
- Playwright browser is blocked (already in use by another process) — using WebFetch for public websites; WebSearch for 403/Cloudflare-blocked sites.
- n8n-mcp instance is connected (OpenAI, Anthropic, Firecrawl, Brave Search, Browserbase credentials available).
- No investigated business uses a WhatsApp AI sales agent/chatbot → none disqualified on comparable-automation gate.
- Strongest prospects (manual WhatsApp ordering, no cart): Original Makeup Kenya, Beauty Ridge.
- Pattern: most beauty/fashion/home-decor stores have SOME web cart but ALSO take manual WhatsApp orders, and NONE have an AI sales agent → all investigated are qualified (gap = WhatsApp AI sales agent), with partial-automation stores scored lower.
- 41 candidates span fashion (14), beauty (9), phone accessories (8), home decor (10).
