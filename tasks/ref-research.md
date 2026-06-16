# TG Germany — Inner-Page Reference Research

> PLAN phase, research only. Extracts reusable **inner-page** layout / user-flow / component patterns for the TG Germany rebuild (brand "TUGG", by Gavia Works).
> The homepage is already built and live; this document targets every **inner page**: category/listing, product detail, cart, checkout, about, contact, dealer locator (Satış Noktaları), corporate/B2B, support/FAQ, legal/KVKK.
> Quality lens: `frontend-design` skill (replica discipline — extract structure/flow to judge quality, **do not invent a new vibe**). Brand tokens stay per `tasks/plan.md` (teal `#00a8a9`, amber `#fbaf5d`, orange `#f5762d`, Poppins).
> **Copyright:** no visuals copied from any reference. Layout, flow, and component patterns only.
> Sources observed directly (June 2026): `ttec.com.tr` + `teknoloji.ttec.com.tr`, `tggermany.com`, `gaviaworks.com`, plus `anker.com`, `spigen.com`, `belkin.com`.
> Date: 2026-06-16 · Owner: Gavia Works · Author: ref-research

---

## 0. References & why each was chosen

### Primary — `ttec.com.tr` (faithful-replica source)
The structural and UX model. A real, mature Turkish mobile-accessory storefront with the exact catalog shape we are rebuilding (Ses / Şarj / Akıllı Saat / Akıllı Ev), Turkish-language flows, KVKK compliance, an extended-warranty system, a corporate-gifting B2B page, and a TR-style "sales points = retailer logo wall" pattern. Every inner-page section below is anchored to what TTEC actually does, because TG Germany's IA is a near one-to-one mirror.

**Observed inner-page URL map (verbatim paths):**
- Categories: `/category/{id}` — e.g. `/category/1` (Ses), `/category/14` (Şarj), `/category/19` (Seyahat Şarj), `/category/23` (Kablosuz Şarj), `/category/77` (Akıllı Saat), `/category/33` (Akıllı Ev), `/category/26` (Diğer), `/category/1075` (Set Ürünler). Also slug+id form: `/category/kablosuz-sarj-aletleri-23`.
- Product detail: `/detail/{id}` — e.g. `/detail/1638`, `/detail/1787`, `/detail/2278`.
- Cart: `/cart` · Login: `/login`
- About: `/static/hakkimizda` · Sales points: `/static/satis-noktalari` · Corporate sales: `/static/kurumsal-satis` · Contact: `/static/iletisim`
- Support: `/static/odeme-ve-teslimat`, `/static/siparis-takip`, `/static/servis-istasyonlari`, `/static/iptal-ve-iade`
- Warranty: `/static/ek-garanti/register`, `/static/ek-garanti/check`
- Legal: `/static/kvkk`, `/static/iptal-ve-iade`
- B2B microsite: `https://teknoloji.ttec.com.tr/` (separate WordPress/WooCommerce site; its own `/iletisim/`).

### Brand source — `tggermany.com`
TG identity + asset source only (placeholder build). Confirms the IA we keep: pillars **Akıllı Yaşam / Ses / Fonksiyon / Koruma** under `/urunler/*`; corporate pages `/hakkimizda`, `/satis-noktalari`, `/kurumsal-satis`, `/iletisim`; legal under `/kurumsal/*` (`kvkk`, `aydinlatma-metni`, `uzak-mesafeli-satis-sozlesmesi`, `cerezler`). Note the broken **B2B → google.com** link to fix and the fake contact data never to ship (per CLAUDE.md guardrails).

### Modernity bar — `gaviaworks.com`
The studio's own site sets the "modern" floor: clean multi-section vertical layout, persistent top nav with a **4-language switcher (TR/EN/DE/ES)** — proof the DE switcher skeleton is on-brand for the studio — image-top cards (image → heading → copy → "Detay" link), subtle gradient overlays, logo carousel, stat block, restrained motion ("clarity over flashiness"). This is the polish target for our inner pages: generous whitespace, card consistency, motion that serves rather than decorates.

### Additional comparables (chosen + justified)

1. **Anker (`anker.com`)** — *Why:* the global benchmark for a charging-led accessory store; catalog (Power Bank / Charger / Wireless Charger / Cable) maps almost exactly onto TG's Şarj + Fonksiyon pillars. Best-in-class **faceted category filtering** for charging products — facets we don't get from TTEC (whose listing renders client-side and exposed no filter UI). Observed on `/collections/chargers`: left filter sidebar with **Total Power Output (Below 100W / 100W–200W / Above 200W), Price ranges, Device Compatibility (laptops / phones+tablets / multi-device), Port Type (USB-C / USB-A / combined), Charging Type (desktop vs wall), Port Count (1 / 2–3 / 3+), Color (12 swatches)**; sort dropdown **Recommended / Price Low→High / Price High→Low**; and a clean **empty/no-results state** ("No corresponding product found" + "Clear Filter"). Directly informs our filter taxonomy.

2. **Spigen (`spigen.com`)** — *Why:* the protection/case benchmark — maps onto TG's **Koruma** pillar, the one pillar TTEC underplays. Strong **product-card conventions** on `/collections/phone-accessory`: dual image (primary + secondary on hover), name + category label, regular & sale price, **inline color-variant selector on the card**, short description, and a **"SOLD OUT" badge** for unavailable items. Sort offers 8 options incl. Best selling / A–Z / Price / Date. Filter facets by **Type + Color**. Informs card anatomy and out-of-stock signalling.

3. **Belkin (`belkin.com`)** — *Why:* "smart living"/lifestyle accessory positioning closest to TG's brand voice (audio, charging, MagSafe/Qi2, screen protection), and a **device-led discovery** model (browse by Samsung S26 / iPhone 17 / Switch 2) plus an explicit **support portal** ("Live Chat, User Guides, FAQs & More") with product-resource education hubs (MagSafe, Qi2, fast charging guides). Informs the support/FAQ hub structure and "shop by device" as an optional discovery aid — a richer support model than TTEC's flat static pages.

> Replica discipline note: TTEC governs **structure and flow**. Anker/Spigen/Belkin contribute only **missing facets** (filter taxonomy, card states, a real support hub) where TTEC is thin. We borrow patterns, never their look, and dress everything in TG tokens.

---

## 1. Category / Listing page (`kategori.html`)

### Layout / flow pattern (section order)
Anchored to TTEC `/category/1`, upgraded with Anker/Spigen facets:
1. Header chrome (shared).
2. **Breadcrumb** — TTEC: `Ana Sayfa > {Kategori}` (e.g. `Ana Sayfa > Ses`). Single-level; we extend to `Ana Sayfa > {Pillar} > {Alt-kategori}` when a subcategory is active.
3. **Category header** — title + short subtitle (TTEC pairs `Ses` with *"Müzik & Ses Aksesuarları"*) + one line of brand/category description prose (*"Türkiye'nin lider mobil aksesuar markası olarak…"* in TTEC; TG uses its own pillar copy).
4. **Toolbar row** — result count + **sort dropdown** + grid/list toggle (per `tasks/plan.md` §3.2). TTEC's listing is JS-rendered and exposed no sort/toggle in markup, so we take the toolbar pattern from Anker/Spigen.
5. **Two-column body** — left **filter sidebar**, right **product grid** (2/3/5-up per breakpoint).
6. **Pagination** (TTEC catalog is large; TTEC itself loads async with no visible pager — we ship explicit pagination for a static prototype).
7. **"Öne çıkanlar / İlgili" carousel** below the grid (reuses the homepage carousel).

```
┌──────────────────────────────────────────────┐
│ Ana Sayfa > Ses                              │  breadcrumb
│ SES  ·  Müzik & Ses Aksesuarları             │  category header + subtitle
│ <1 line pillar copy>                          │
├───────────┬──────────────────────────────────┤
│ FİLTRELE  │ 24 ürün       [Sırala ▾] [▦ ▤]  │  toolbar (count · sort · grid/list)
│ ┌───────┐ │ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌──┐ │
│ │Kategori│ │ │card│ │card│ │card│ │card│ │..│ │  5-up desktop grid
│ │Fiyat  │ │ └────┘ └────┘ └────┘ └────┘ └──┘ │
│ │Renk   │ │ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌──┐ │
│ │Güç(W) │ │ └────┘ …                          │
│ │Marka  │ │            [ ‹ 1 2 3 › ]          │  pagination
│ └───────┘ │                                   │
└───────────┴──────────────────────────────────┘
```

### Step-by-step user flow
1. **Arrives from:** mega-menu pillar click, category circle rail on home, footer "Ürünler" column, or a search.
2. Lands on the pillar listing; scans the grid; reads the result count to gauge breadth.
3. **Narrows** via the left filter sidebar (Anker model: power output / price / color / port type) — each toggle re-renders the grid and updates the count; active filters show as removable chips above the grid.
4. **Re-orders** via sort (Recommended default → price asc/desc → newest), or flips to list view for spec-dense scanning.
5. Hovers a card (image swaps to second shot — Spigen pattern), reads price/rating, either quick-adds via the card's "Sepete Ekle" (charge-fill) → toast + cart badge increments, **or** clicks through to PDP.
6. **Exits to:** PDP, cart drawer (after quick-add), or deeper subcategory.

### Component conventions
- **Filter sidebar** (Anker-derived taxonomy, tuned per pillar): `Kategori` (subcategories), `Fiyat` (range slider + preset bands), `Renk` (color swatches — Spigen/Anker), `Güç / W` (charging pillars — Anker's "Total Power Output"), `Bağlantı / Port` (USB-C / USB-A / kablosuz — Fonksiyon), `Marka`, plus pillar-specific (`Uyumluluk / cihaz` for Koruma cases — Belkin's device model). On mobile, the sidebar becomes a **bottom-sheet drawer** ("Filtrele" button) per `plan.md` §3.2.
- **Toolbar:** result count ("24 ürün"), sort `<select>`, grid/list toggle.
- **Product card:** image (16:10) with **hover-swap to 2nd image** (Spigen), badge top-left (İndirim/Yeni), wishlist top-right, eyebrow=category, 2-line title, rating stars+count, price row (current ink / struck old / sale in orange, tabular), card-level **color variant dots** (Spigen), charge-fill "Sepete Ekle". **"TÜKENDİ / SOLD OUT" badge** replaces the CTA when out of stock (Spigen).
- **Active-filter chips** above grid (removable), with "Filtreleri Temizle".

### Empty states / edge cases
- **No products in category:** TTEC shows **"Bu kategoride ürün bulunamadı"** — use this verbatim with a CTA back to all pillars. (Live TG today: same "Ürün bulunamadı"; 3 of 4 pillars empty — research §4.)
- **No filter matches:** Anker's pattern — **"Eşleşen ürün bulunamadı" + "Filtreleri Temizle"** button (don't leave a blank grid).
- **Loading:** TTEC renders **12 skeleton placeholder cards** while products load — adopt skeleton loaders (`plan.md` §2.5) so the grid never flashes empty.
- **Out of stock:** card keeps image, swaps CTA → "Tükendi" + optional "Stoğa gelince haber ver".

---

## 2. Product detail page (`urun.html`)

### Layout / flow pattern
Anchored to TTEC `/detail/1638` (SmartCharger PD 20W), enriched with Anker/Spigen PDP conventions:
1. **Breadcrumb** — TTEC: `Ana Sayfa > Seyahat Şarj Aletleri > {ürün adı}` (full path incl. subcategory + product name).
2. **Two-column hero:**
   - **Left — gallery:** main image + **thumbnail rail** (TTEC places 4 thumbnails; we keep a left/under rail with zoom). 4 angles typical.
   - **Right — info column:** title → **product code** (TTEC shows `2SCS22B` — keep an SKU line) → **price** (`₺699,90`) → **installment line** (TTEC: *"6 taksit (6 x ₺116,65)"* — a TR-market trust signal worth replicating as static copy) → **stock status** (TTEC: *"Bugün Kargoda"* = ships today) → **variant selectors** (color/size — absent on TTEC's single-variant charger but required generically; take swatch pattern from Spigen/Anker) → **qty stepper** → **"Sepete Ekle" charge-fill** → wishlist → **trust badges** (TTEC: *Ücretsiz kargo · 2 yıl garanti · 256-bit SSL güvenlik*).
3. **Feature/lifestyle band** — TTEC "Hayatın İçinden": 3–4 illustrated benefit tiles (smart chip / 4× hızlı şarj / akım koruması / kompakt). We mirror as a benefit strip.
4. **Tabs / sections** — Açıklama / Özellikler (spec table) / Yorumlar. (`plan.md` §3.3. TTEC presents these as stacked sections; tabs collapse to accordion on mobile.)
5. **"İlgili ürünler" carousel.**

```
Ana Sayfa > Seyahat Şarj Aletleri > SmartCharger PD 20W
┌───────────────┬──────────────────────────────┐
│  [ main img ] │ ttec SmartCharger PD 20W      │
│               │ Ürün kodu: 2SCS22B            │
│  [t][t][t][t] │ ₺699,90   6 taksit (6×116,65) │
│  thumb rail   │ ✓ Bugün Kargoda               │
│               │ Renk: ● ○ ○   [- 1 +]         │
│               │ [▰▰▰ Sepete Ekle ] ♡          │
│               │ 🚚 Ücretsiz · 🛡 2 yıl · 🔒 SSL │
├───────────────┴──────────────────────────────┤
│ Hayatın İçinden: [smart chip][4×][koruma][..] │
├───────────────────────────────────────────────┤
│ [Açıklama] Özellikler  Yorumlar               │  tabs → accordion (mobile)
├───────────────────────────────────────────────┤
│ İlgili Ürünler  ‹ card card card card ›       │
└───────────────────────────────────────────────┘
```

### Step-by-step user flow
1. **Arrives from:** category grid, search, related-products carousel, or a homepage trend card.
2. Reviews gallery (clicks thumbnails / zooms), reads title + price + installment + stock.
3. Picks variant (color/size) → qty → **"Sepete Ekle"** (charge-fill completes) → **toast** + cart badge increments → optionally opens cart drawer.
4. Scrolls to spec table / reviews to validate; scans benefit band.
5. **Exits to:** cart drawer → checkout, or laterally to a related product.

### Component conventions
- **SKU / ürün kodu line** and **installment line** are TR-market PDP signatures worth keeping (static).
- **Trust-badge row** (kargo / garanti / SSL) directly under the CTA — TTEC pattern.
- **Sticky add-to-cart:** TTEC's static page had none, but Anker/Belkin use a **sticky mini-bar** (thumbnail + price + add button) that appears on scroll once the main CTA leaves the viewport — recommended for mobile (`plan.md` notes sticky add-to-cart as a convention to consider).
- **Gallery:** thumbnail rail + zoom; lifestyle/benefit tiles below as a separate band (TTEC "Hayatın İçinden").
- **Tabs → accordion** on mobile.

### Empty states / edge cases
- **Out of stock:** swap CTA → disabled **"Tükendi"** + "Stoğa gelince haber ver" email capture; keep gallery/specs visible.
- **No reviews yet:** "Henüz yorum yok — ilk yorumu siz yazın."
- **Single-variant product:** hide the variant selector entirely (TTEC's charger had none) — don't render an empty swatch row.
- **Invalid product id:** TTEC returns hard **404** on bad `/detail/*` and `/static/*` paths (observed) → ship a branded 404 with search + pillar links.

---

## 3. Cart (`sepet.html`) + cart drawer

### Layout / flow pattern
TTEC `/cart` was observed in its **empty state** (real signal for that edge case). The full layout follows `plan.md` §3.4:
1. Breadcrumb.
2. **Two-column:** left line-item list (thumb, title, variant, **qty stepper**, line total, remove) · right **order summary** (ara toplam, kargo, kupon input, genel toplam, "Ödemeye Geç" charge-fill).
3. **Free-shipping progress** rendered as the signature **charge bar** ("X TL daha ekleyin, kargo bedava").
4. "Alışverişe Devam Et" link.

The **drawer** (`plan.md` §2.6) is the quick-view of the same `$store.cart`; the page is the full review.

### Step-by-step user flow
1. **Arrives from:** quick-add toast "Sepete Git", header cart badge, or the cart drawer "Sepete Git".
2. Adjusts quantities (stepper re-computes line + grand totals live), removes items, applies a coupon.
3. Watches the **charge bar** toward free shipping (motivation device).
4. Clicks **"Ödemeye Geç"** → checkout. Or "Alışverişe Devam Et" back to listing.

### Component conventions
- Line item: thumb · title · variant · qty stepper · line total · remove (×).
- Summary: subtotal · shipping (as charge bar) · coupon field · grand total · primary checkout CTA.
- Drawer mirrors this with focus-trap, Esc/click-outside close, `--shadow-drawer`.

### Empty states / edge cases (TTEC-observed, primary evidence)
- **Empty cart:** TTEC shows heading **"Sepetiniz Boş"** + body **"Sepetinizde henüz ürün bulunmamaktadır"** + a single prominent CTA **"Alışverişe Başla"** routing to home/categories. No summary/line-item chrome rendered in the empty state — a clean re-engagement screen. **Replicate this exact pattern** (TG copy): empty heading + body + "Alışverişe Başla" + maybe a "Trend Ürünler" strip to recover the session.
- **Out-of-stock item in cart:** flag the line ("Tükendi") and block checkout until removed.
- **Coupon invalid:** inline error on the coupon field ("Kupon kodu geçersiz"), never a global alert.

---

## 4. Checkout (`odeme.html`)

> No live checkout was observable on TTEC (consumer checkout is behind `/login`/cart-with-items). Pattern is composed from `plan.md` §3.5 + Anker/Belkin conventions + TR legal requirements.

### Layout / flow pattern
- **Stepper as a charging bar:** Teslimat → Ödeme → Onay (signature element).
- Multi-step Alpine panels (no reload): **address form → shipping method → payment (mock card) → KVKK + mesafeli-satış consent → place order**.
- **Sticky order-summary sidebar** (items, subtotal, shipping, total) throughout.
- **Confirmation state:** sipariş no + charge-complete pulse + "Siparişi Takip Et" link (ties to order-tracking, §8).

### Step-by-step user flow
1. **Arrives from:** cart "Ödemeye Geç".
2. Fills address → picks shipping → enters (mock) card → **must tick KVKK + Mesafeli Satış Sözleşmesi consent** (legally required, research §7) → "Siparişi Tamamla".
3. Lands on confirmation (order number, summary) → optional account/track links.

### Component conventions
- Progress stepper (battery-fill), sticky summary, consent checkboxes wired to the legal pages (§9), mock payment field group.
- **Guest checkout** offered (no forced account), with optional account creation post-order.

### Empty / error states
- **Empty cart at checkout entry:** redirect to the empty-cart screen (§3) — never an empty checkout.
- **Field validation:** inline, per-field, on blur + on submit (required address fields, card format, consent unchecked → "Devam etmek için sözleşmeleri onaylayın").
- **Payment declined (mock):** inline summary error with retry, summary preserved.

---

## 5. About / Hakkımızda (`hakkimizda.html`)

### Layout / flow pattern (TTEC `/static/hakkimizda`, observed)
TTEC's About is deliberately lean — narrative + stats, **no** timeline/team/logo-wall/CTA band:
1. Page title "Hakkımızda".
2. **Brand-story prose** (founding 1995, mission via design + functionality, 30+ countries).
3. **Four stat blocks:** `1995` (founding), `30+` (countries), `100M+` (consumers), `1983` (Tesan heritage).
4. **Heritage sub-section** "Köklü Geçmiş" + explanatory text (parent company).
5. Footer.

### TG adaptation
TG's current About is a single thin text block (research §4). Upgrade to TTEC's spine but richer (our `plan.md` §3.6 already specifies hero → story → stat blocks → values 3-up → CTA band). Use the **real TG About copy** (research §2) and real TG stats (client-supplied) — **never** TTEC's numbers (own-brand rule).

### Component conventions
- Stat block quartet (number + label), prose with a sub-section heading, optional values triad, closing CTA band.

### Edge cases
- Thin content risk: don't pad with Lorem (CLAUDE.md). If real stats are missing, ship fewer honest blocks rather than fake ones.

---

## 6. Sales points / Dealer locator — Satış Noktaları (`satis-noktalari.html`)

### Layout / flow pattern (TTEC `/static/satis-noktalari`, observed)
TTEC uses a **retailer logo wall**, *not* a geolocating store-finder:
1. Intro line: *"Ürünlerimize ulaşabileceğiniz Türkiye ve Global'deki perakende satış noktalarımız."*
2. **Two tabs: Türkiye / Global.**
3. **Logo grid** (~40+ retailer logos under Türkiye: Amazon, MediaMarkt, Trendyol, Carrefour, Turkcell, Vodafone, Türk Telekom, etc.); Global tab swaps the set.
4. **No** map, city filter, store cards, or per-store address/phone.

### Step-by-step user flow
1. **Arrives from:** header/footer "Satış Noktaları".
2. Picks Türkiye or Global tab → scans retailer logos → recognizes where to buy → leaves to that retailer (logos can link out).

### TG adaptation
Keep TTEC's **tabbed logo-wall** as the baseline (TG's current page has tabs Türkiye/Yurtdışı but no real content — research §4; `plan.md` §3.7 = tabs + logo wall + map placeholder). Since TG targets the German market, consider a **Türkiye / Yurtdışı** split and, optionally, a lightweight **map placeholder** block below the wall (the one richer element TTEC lacks). Don't over-build a full geolocator — match the reference's restraint.

### Component conventions
- Tabs · responsive logo grid (grayscale→color on hover) · each logo = retailer link · optional map placeholder.

### Empty / edge states
- **No dealers in a tab:** "Bu bölgede henüz satış noktası eklenmedi — online satın alın" + CTA to store. (TTEC's "Featured Products" strip on this page even showed the **"Bu kategoride ürün bulunamadı"** empty message — avoid embedding empty product strips on static pages.)

---

## 7. Corporate / B2B — Kurumsal Satış (`kurumsal-satis.html`)

### Layout / flow pattern (TTEC `/static/kurumsal-satis`, observed)
A clean B2B conversion funnel:
1. **Hero** — personalized branded accessories as corporate gifts (TTEC tagline *"mükemmel bir hediyeye ne dersiniz?"*).
2. **Three benefit blocks** — (a) brand awareness via logo-branded products, (b) "marka elçileri" / brand ambassadors via employee+partner accessories, (c) practical daily-use gifts. (Matches TG's existing trio: Marka Bilinirliği / Marka Elçileri / Kullanışlı Hediye — research §4.)
3. **Product showcase** — wireless chargers / power banks / Bluetooth headphones (customizable line).
4. **Application form — "Ürün Talep Formu":** company + contact fields, preferred contact method (phone/email), **order quantity**, **logo file upload (accepts PDF, AI, PSD, TIFF only)**, company address, optional notes, submit **"Talebi Gönder"**.

### Step-by-step user flow
1. **Arrives from:** header "Kurumsal Satış" (fix TG's broken B2B→google.com link to point here), footer, or home promo.
2. Reads pitch → benefit blocks → product showcase → fills the request form → uploads logo (restricted file types) → consents KVKK → **"Talebi Gönder"** → confirmation.

### Component conventions
- Benefit triad (icon + heading + copy), product showcase trio, **lead-capture form with constrained file upload** + KVKK consent. This is one of two file-upload forms on the brand (the other: extended warranty, §8) — build a reusable file-upload field.
- TG model is **single B2C store + one B2B page** (CLAUDE.md locked) — not a separate microsite (TTEC's `teknoloji.ttec.com.tr` is out of scope; its `/iletisim/` is just phone+address, no form — a useful contrast: B2B-distributor contact skews phone-first).

### Empty / error states
- **Wrong file type:** inline "Yalnızca PDF, AI, PSD, TIFF kabul edilir."
- **Missing required field / unchecked KVKK:** inline, block submit.
- **Success:** "Talebiniz alındı, ekibimiz sizinle iletişime geçecek."

---

## 8. Support / FAQ + order tracking + warranty

> TTEC has **no single "SSS/FAQ" hub** — support is a set of **flat `/static/*` task pages** in the footer "Destek" column. Belkin shows the richer alternative (a portal with search + topic tiles + resource guides). TG's `plan.md` footer already lists Destek: Sipariş Takip · Ödeme & Teslimat · İade & Değişim · SSS.

### 8a. Payment & delivery — Ödeme & Teslimat (TTEC `/static/odeme-ve-teslimat`, observed)
Prose page (no accordion). Topics: payment methods (credit card, installments per bank agreement), shipping (orders prepped within 24h, tracking emailed after 18:00), delivery-time variability (weekly-service regions may delay), shipping costs (customer pays except during free-shipping promos), damaged-package refusal procedure. **No fixed free-shipping threshold stated** — so our cart "charge bar to free shipping" threshold is a TG design choice (pick a round figure as placeholder).

### 8b. Order tracking — Sipariş Takip (TTEC `/static/siparis-takip`, observed)
- **Centered minimal form:** two required fields — **E-posta Adresi** + **Sipariş Numarası** (phone *not* required) — **"Sorgula"** button — support link beneath.
- **States:** success → order status; not-found → message + support fallback link; error → support link. Keep it a single, focused form.

### 8c. Extended warranty — Ek Garanti (TTEC `/static/ek-garanti/register` + `/check`, observed)
- **Register form (single page):** Ad, Soyad, E-posta, Telefon · **Ürün Seri No** · **Satın Alınan Yer** (dropdown) · **Satın Alma Tarihi** (date picker) · **Fatura Görseli** (file upload, "Dosya seçilmedi" default) · **two consent checkboxes** — mandatory KVKK Aydınlatma Metni + optional marketing opt-in · submit **"Başvuruyu Tamamla"**.
- **Check form:** "Başvuru Sorgulama" to look up an existing application.
- Pattern to reuse: **serial + invoice-upload + dual consent** registration. (TG may not need full warranty registration in the prototype, but the form pattern feeds checkout consent + corporate form.)

### 8d. FAQ — recommended (Belkin-informed, TTEC-absent)
TTEC has no FAQ accordion; we **add an SSS page** (already in plan footer) to be more modern than the reference:
- Optional search box (Belkin "Live Chat, User Guides, FAQs"), **topic category tiles** (Kargo & Teslimat / İade & Değişim / Garanti / Sipariş / Ürün Kullanımı), then **accordion Q&A** within each topic, and a "Aradığınızı bulamadınız mı? İletişim" fallback. Accordion = `plan.md` §2.5.

### Support flow & edge cases
- **Flow:** footer "Destek" → task page (track / pay-deliver / returns / FAQ) → resolve or fall back to İletişim.
- **No results (FAQ search / order not found):** clear message + contact fallback (never a dead end). TTEC's order-tracking explicitly offers a support link as the fallback.

---

## 9. Legal / KVKK (`kvkk.html`, `aydinlatma.html`, `mesafeli-satis.html`, `cerezler.html`)

### Layout / flow pattern (TTEC `/static/kvkk`, observed)
- **Hierarchical section-based legal template** (no accordion): **lettered main sections (A–F)** — e.g. *A. Veri Sorumlusunun Kimliği, B. Veri Toplamanın Yöntemi* — with **numbered subsections** and **bolded subheadings**; long passages broken into **bulleted lists** rather than dense prose; a **"Referans ve İlgili Dokümanlar"** section near the end.
- **No table of contents, no last-updated date** observed on TTEC.

### TG adaptation
Use a **shared legal template** (`plan.md` §3.10): page title + **add a "Son güncelleme" date** (improvement over TTEC) + optional **in-page TOC / anchor list** for long docs (improvement) + lettered/numbered sections + bullets. Apply to KVKK, Aydınlatma Metni, Uzak Mesafeli Satış Sözleşmesi, Çerezler.

### Component conventions
- One reusable legal layout: sticky/inline TOC (optional, for long pages), heading hierarchy, bullet-friendly prose, last-updated stamp.
- **Consent links:** checkout + warranty + corporate forms link directly to these pages (open in modal or new context).

### Edge cases
- **Mandatory, never Lorem ipsum** (CLAUDE.md / research §7). TG's current legal pages are all placeholder — real client text required before launch; ship a faithful **structural skeleton** with clearly-marked placeholder copy until then.
- **Cookie consent banner** (Çerezler) should pair with a first-visit banner linking to the cookie page.

---

## 10. Contact / İletişim (`iletisim.html`)

### Layout / flow pattern
TTEC's consumer `/static/iletisim` obfuscates its email via Cloudflare and was not directly renderable, but research §4 + the homepage confirm the consumer pattern: **contact form (Ad Soyad, E-posta, Telefon, Mesaj) + office/contact cards (address, phone, email)**. The B2B microsite contact (`teknoloji.ttec.com.tr/iletisim/`, observed) is the **contrast**: phone (`0212 454 60 00`) + technical-support line + address, **no form/map** — B2B leans phone-first.

### TG adaptation (`plan.md` §3.9)
Consumer-style: **contact form (Ad Soyad / E-posta / Telefon / Mesaj + KVKK consent) → office/contact cards (real-data placeholders) → map placeholder.** Never ship TG's current fake data (`0222 222 2222`, erentheme.com, US addresses — guardrail).

### Component conventions
- Two-column: form left, info cards + map placeholder right (stacks on mobile).
- KVKK consent checkbox required on submit.

### Edge cases
- **Validation:** inline per-field (email format, required), submit blocked until KVKK ticked.
- **Success:** "Mesajınız alındı, en kısa sürede dönüş yapacağız."
- **No real data yet:** clearly-marked placeholders, not invented addresses.

---

## 11. Cross-cutting patterns & 404

- **404:** TTEC returns hard 404 on bad `/detail/*` and `/static/*` (observed) → ship a branded 404 (search + pillar links + "Anasayfaya dön").
- **Async/skeleton everywhere:** TTEC renders product strips client-side with **skeleton placeholders** and a uniform empty message **"Bu kategoride ürün bulunamadı"** — standardize one empty-state copy + skeleton component across category, related, and home strips.
- **Breadcrumbs** on every inner page below home (TTEC pattern), full path on PDP.
- **Two reusable form patterns:** (1) contact/lead form (+ KVKK), (2) **file-upload form** (logo for corporate, invoice for warranty) with constrained types + dual consent.
- **Consent is pervasive:** KVKK checkbox on contact, corporate, warranty, checkout — build one reusable consent component linking to §9 pages.
- **Footer "Destek" column** is the support spine (TTEC) — keep it the single entry point to track/pay-deliver/returns/FAQ.

---

## 12. Strongest 5 patterns to carry into the plan

1. **TTEC's exact empty-cart screen** — "Sepetiniz Boş" + body + single **"Alışverişe Başla"** CTA (no line-item/summary chrome). Primary, observed; the cleanest re-engagement edge case to replicate.
2. **Anker-grade faceted filter sidebar** for charging pillars — Power(W) / Port / Compatibility / Color / Price — plus the **"no match → Filtreleri Temizle"** empty state. The biggest UX upgrade over TTEC's filter-less listing.
3. **TTEC PDP signatures** — breadcrumb-with-subcategory, **ürün kodu (SKU)** line, **installment line** ("6 taksit…"), **stock status** ("Bugün Kargoda"), and the **trust-badge row** (Ücretsiz kargo · 2 yıl garanti · 256-bit SSL) right under add-to-cart. TR-market-correct and trust-building.
4. **TTEC's tabbed retailer logo-wall** as Satış Noktaları (Türkiye/Global) + restraint (no over-built geolocator) — match the reference instead of inventing a store finder; add only a map placeholder.
5. **One reusable file-upload + dual-consent form pattern** (corporate logo upload PDF/AI/PSD/TIFF; warranty invoice upload + KVKK) and **one shared legal template** (lettered sections + bullets, plus our added last-updated + TOC). Covers corporate, warranty, and all four legal pages with consistent, compliant components.
