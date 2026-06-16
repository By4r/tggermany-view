# TG Germany — Design System & Page Plan

> PLAN phase. No page is implemented here — this is the build brief for a full e-commerce **design prototype**.
> Stack: static **HTML + Tailwind (CDN) + Alpine.js**, no build step. Language: **TR primary** + DE switcher skeleton.
> Inputs: `tasks/research.md`, `docs/screenshots/` (TTEC = quality/UX reference only; TG brand tokens only).
> Date: 2026-06-16 · Owner: Gavia Works

---

## 0. Design direction (one paragraph)

TG Germany is a charging-and-connectivity accessory brand whose promise is literally *"Teknolojiyle Gününü Güçlendir"* — power up your day. The design makes **"charge / power" the organizing idea**: a confident teal-led commerce surface, clean and white-spaced like a modern retailer, but where the brand's one bold move is an **energy/charge motif** carried through the primary actions and the way popularity is shown. Everything else stays disciplined and quiet so the commerce does its job. We follow the locked brand tokens exactly (teal `#00a8a9` + amber `#fbaf5d` + orange accent + Poppins); the differentiation comes from *behavior and structure*, not a novel palette.

**Layout DNA borrowed from TTEC desktop (`docs/screenshots/ttec/ttec-1440.png`)** — *structure only, not brand*: thin utility bar → header with a prominent rounded search → circular category rail → hero → product carousels at **5-up desktop**, generous ~80px section rhythm, light-gray/white section alternation, multi-column footer. We adopt that grid and white-space rithm and dress it in TG's identity.

---

## 1. Design tokens

### 1.1 Color palette

Defined as CSS custom properties (in `assets/css/styles.css`) **and** mirrored into `tailwind.config.theme.extend.colors` so both utilities and custom CSS (gradients, keyframes) stay in sync.

| Token | Hex | Role |
|---|---|---|
| `--tg-primary` | `#00a8a9` | Brand teal — primary CTAs, links, active states, header/footer |
| `--tg-primary-600` | `#018a8b` | Hover/pressed teal |
| `--tg-primary-700` | `#007577` | Deep teal, borders on teal surfaces |
| `--tg-ink-teal` | `#053b3f` | Dark teal section backgrounds (brand-trust band, footer top) |
| `--tg-amber` | `#fbaf5d` | Secondary accent — highlights, charge-fill end, badges |
| `--tg-amber-600` | `#f59423` | Amber hover/depth |
| `--tg-orange` | `#f5762d` | Accent (the logo "g") — sparing emphasis, sale price, charge spark |
| `--tg-ink` | `#14201f` | Headings / near-black (teal-tinted, not pure #000) |
| `--tg-body` | `#44514f` | Body text (warm-neutral, teal-tinted) |
| `--tg-muted` | `#7c8a88` | Captions, meta, disabled text |
| `--tg-line` | `#e4ebea` | Borders / dividers / card outline |
| `--tg-bg` | `#ffffff` | Base background |
| `--tg-bg-soft` | `#f5f8f8` | Alternating section background (subtle teal-tinted gray) |
| `--tg-success` | `#1f9d57` | In-stock / success |
| `--tg-warning` | `#e6a700` | Low-stock / warning |
| `--tg-error` | `#d64545` | Errors / out-of-stock |

> Note: we intentionally drop the current site's Bootstrap default state colors and the cool `#eaedff` lilac — they read as template defaults. Neutrals are warmed/teal-tinted for cohesion (skill: "spend boldness in one place," keep the rest cohesive).

**Gradient (signature use only):** `--tg-charge: linear-gradient(90deg, var(--tg-primary) 0%, var(--tg-amber) 100%)` — reserved for the charge-fill interaction, never decorative.

### 1.2 Typography — Poppins

Loaded via Google Fonts (Poppins 400/500/600/700) with `font-display: swap`; system-ui fallback stack. Tabular figures for all prices (`font-variant-numeric: tabular-nums`).

| Role | Size / line-height (desktop) | Weight | Notes |
|---|---|---|---|
| Display (hero) | 56 / 60 | 700 | `letter-spacing: -0.02em`; clamps to 34 on mobile |
| H1 | 40 / 48 | 700 | page titles |
| H2 | 32 / 40 | 600 | section titles |
| H3 | 24 / 32 | 600 | card group / sub-section |
| H4 | 20 / 28 | 600 | product title (detail) |
| Body-lg | 18 / 28 | 400 | lead paragraphs |
| Body | 16 / 26 | 400 | default |
| Small | 14 / 22 | 400/500 | meta, form help |
| Caption | 12 / 18 | 500 | badges, labels |
| Eyebrow | 12 / 16 | 600 | UPPERCASE, `letter-spacing: 0.10em` — used with the conductor tick (§2) |
| Button | 15 / 16 | 600 | — |
| Price | 20–24 | 700 | tabular-nums; sale price in `--tg-orange` |

Fluid scaling via `clamp()` between the 390 and 1440 breakpoints for Display/H1/H2.

### 1.3 Spacing scale

4-based: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128` (Tailwind's default scale already covers this — use `1,2,3,4,5,6,8,10,12,16,20,24,32`).

- **Section vertical padding:** desktop `80–96`, tablet `56–64`, mobile `40–48`.
- **Card gaps:** `16` mobile, `20` tablet, `24` desktop.
- **Container:** `max-width: 1280px`, side gutter `24` desktop / `20` tablet / `16` mobile, centered.

### 1.4 Radius

| Token | Value | Use |
|---|---|---|
| `--r-sm` | 8px | inputs, small tags |
| `--r-md` | 12px | buttons, badges |
| `--r-lg` | 16px | cards, panels |
| `--r-xl` | 24px | hero / feature blocks |
| `--r-pill` | 999px | category circles, chips, search field |

### 1.5 Shadow (teal-tinted for cohesion)

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(5,59,63,.06)` | inputs, subtle |
| `--shadow-card` | `0 4px 16px rgba(5,59,63,.08)` | product cards (rest) |
| `--shadow-hover` | `0 12px 28px rgba(5,59,63,.14)` | card hover, dropdowns |
| `--shadow-drawer` | `-12px 0 40px rgba(5,59,63,.18)` | cart drawer / modals |

### 1.6 Breakpoints & grid

| Name | Width | Container | Product grid | Category circles |
|---|---|---|---|---|
| Mobile (base) | 390 | fluid, 16 gutter | **2-up** | 4-up (scroll) |
| Tablet `md` | 768 | fluid, 20 gutter | **3-up** | 6-up |
| Desktop `xl` | 1440 | 1280 max, 24 gutter | **5-up** | 8-up |

Mobile-first. 12-column mental model; product grids use CSS grid with the column counts above. Motion respects `prefers-reduced-motion` (charge-fill degrades to a simple color change).

---

## 2. Shared components

Each is described as an HTML-skeleton intent. Shared chrome (header, footer) lives in `partials/` and is fetch-included (see §4); interactive state is Alpine.

### 2.1 Header (`partials/header.html`)
Three stacked rows, sticky on scroll (utility bar hides on scroll-down):
1. **Utility bar** (thin, `--tg-ink-teal` bg): left = announcement/free-shipping text; right = **language switcher (TR active / DE)**, support phone, account link. DE switcher is a working Alpine toggle that sets `localStorage.lang` and swaps a `data-i18n` label set (skeleton — TR strings present, DE stubbed).
2. **Main bar** (white): logo (SVG, orange "g") left · **prominent pill search** center (`--r-pill`, Alpine-driven suggestions stub) · account icon + **cart button with item-count badge** (opens drawer, §2.6) right.
3. **Category nav** (white, border-bottom): the 4 pillars **Akıllı Yaşam · Ses · Fonksiyon · Koruma** + Kurumsal links (Hakkımızda, Kurumsal Satış). Hovering a pillar opens a **mega-menu** panel.

**Mega-menu** (`x-data` per pillar, `@mouseenter`/focus): full-width panel under the nav — left column of subcategories, right column a promo tile (image + CTA). Keyboard-accessible (focus-visible, Esc closes), `aria-expanded`. On mobile the whole header collapses into a hamburger → slide-in nav with accordion pillars.

### 2.2 Footer (`partials/footer.html`)
- **Top band** (`--tg-ink-teal`): newsletter capture (email input + charge-fill "Abone Ol") + brand line + social icons (FB/X/Instagram/LinkedIn/YouTube — real-profile placeholders, never bare domains).
- **Link columns:** **Kurumsal** (Hakkımızda, Satış Noktaları, Kurumsal Satış, İletişim) · **Destek** (Sipariş Takip, Ödeme & Teslimat, İade & Değişim, SSS) · **Ürünler** (4 pillars) · **İletişim** (real-data placeholders: address, phone, email).
- **Legal strip** (bottom): KVKK · Aydınlatma Metni · Uzak Mesafeli Satış Sözleşmesi · Çerezler · `© 2026 TUGG — Gavia Works`.

### 2.3 Product card (`assets/js/data.js` → rendered via Alpine `x-for`)
Skeleton: media box (16:10, lazy img, hover swaps to 2nd image) → optional **badge** (İndirim/Yeni, top-left) + wishlist icon (top-right) → **eyebrow** = category (with conductor tick, §5) → title (2-line clamp) → rating stars + count → price row (current `--tg-ink`; old price struck `--tg-muted`; sale price `--tg-orange`, tabular-nums) → **"Sepete Ekle" charge-fill button** (§5). Variants: default, compact (carousel), **trend** (adds charge-level rank meter instead of 01/02/03).

### 2.4 Buttons
| Variant | Look | Use |
|---|---|---|
| Primary | teal fill, white text, **charge-fill hover** | main CTAs, add-to-cart |
| Secondary | teal outline, teal text | secondary actions |
| Ghost | no border, teal text | tertiary/inline |
| Amber | amber fill, ink text | promo / highlight CTA |
| Icon | square/circle, `--r-md`/pill | cart, wishlist, qty |
Sizes `sm / md / lg`; states hover/active/focus-visible/disabled/loading. All ≥44px tap target on mobile.

### 2.5 Supporting components
Qty stepper · filter sidebar (checkbox groups, color swatches, price range slider via Alpine) · sort dropdown · grid/list toggle · breadcrumb · tabs (Türkiye/Yurtdışı; product-detail tabs) · accordion (mobile filters, FAQ, legal) · rating stars · badges/chips · form fields (input/select/textarea/file-upload + KVKK consent checkbox) · toast (added-to-cart) · pagination · empty state · skeleton loaders.

### 2.6 Cart drawer (`assets/js/main.js` — global Alpine `$store.cart`)
Slide-in from right (`--shadow-drawer`, backdrop, focus-trap, Esc/`@click.outside` to close): header "Sepetim (n)" → scrollable line items (thumb, title, variant, qty stepper, line total, remove) → **free-shipping progress shown as a charge bar** (§5) → subtotal → "Sepete Git" + "Ödemeye Geç" (charge-fill) → **empty state** with CTA. Cart state persisted to `localStorage`; same `$store.cart` powers the header badge, the cart page, and checkout.

---

## 3. Page inventory

Section order top→bottom; **bold** = key component. All pages share header + footer + cart drawer.

1. **Anasayfa — `index.html`**
   Hero slider (**charge-fill CTA**) → **category circle rail** (4 pillars + sub) → **Trend Ürünler** carousel (**trend product cards w/ charge-rank meter**) → **kategori vitrin** (4 large pillar tiles, editorial) → öne çıkan / lifestyle banners (2- & 3-up) → **marka güven bandı** (stats + retailer logo wall, on `--tg-ink-teal`) → newsletter (in footer top) .

2. **Ürün listesi / Kategori — `kategori.html`**
   Breadcrumb → category header (title + count + short copy) → toolbar (**sort**, **grid/list toggle**, result count) → 2-col: **filter sidebar** (Kategori, Fiyat, Renk, Boyut, Marka) + **product grid** (2/3/5-up) → **pagination** → öne çıkanlar carousel. Mobile: filters become a bottom-sheet drawer.

3. **Ürün detay — `urun.html`**
   Breadcrumb → 2-col: **gallery** (thumb rail + main image, zoom) + **info** (title, rating, price, **variant swatches** color/size, **qty stepper**, **charge-fill "Sepete Ekle"**, trust badges: kargo/iade/garanti) → **tabs** (Açıklama / Özellikler / Yorumlar) → **ilgili ürünler** carousel.

4. **Sepet — `sepet.html`**
   Breadcrumb → 2-col: line-item list (thumb, title, variant, **qty stepper**, line total, remove) + **order summary** (ara toplam, kargo as **charge bar to free-shipping**, kupon input, **genel toplam**, "Ödemeye Geç" charge-fill) → empty state → "Alışverişe Devam Et". (Drawer = quick view; this = full review.)

5. **Ödeme / Checkout — `odeme.html`**
   **Stepper rendered as a charging bar** (Teslimat → Ödeme → Onay) → step panels (Alpine multi-step, no page reload): address form → shipping method → payment (card form, mock) → KVKK + mesafeli-satış consent → place-order → **order-summary sidebar** (sticky). Confirmation state (sipariş no, charge-complete pulse).

6. **Hakkımızda — `hakkimizda.html`**
   Hero → brand story (real About copy from research §2) → **stat blocks** → values (3-up) → CTA band.

7. **Satış Noktaları — `satis-noktalari.html`**
   Header → **tabs Türkiye / Yurtdışı** → retailer **logo wall** → map placeholder.

8. **Kurumsal Satış (B2B) — `kurumsal-satis.html`**
   Hero ("Markanıza Özel...") → 3 benefit blocks (Marka Bilinirliği / Marka Elçileri / Kullanışlı Hediye) → customizable-product showcase → **başvuru form** (firma, yetkili, e-posta/telefon, adet, **logo upload**, KVKK consent) → CTA "Hemen Başvur".

9. **İletişim — `iletisim.html`**
   Contact form (Ad Soyad, E-posta, Telefon, Mesaj + KVKK) → office/contact cards (real-data placeholders) → map placeholder.

10. **Yasal sayfalar — `kvkk.html`, `mesafeli-satis.html`, `cerezler.html`, `aydinlatma.html`**
    Shared simple **legal template**: title + last-updated + prose + (optional) accordion sections. Real content TBD by client — no Lorem ipsum.

> Total: **~13 HTML pages** + 2 partials.

---

## 4. File structure & component reuse

```
/
├─ index.html  kategori.html  urun.html  sepet.html  odeme.html
├─ hakkimizda.html  satis-noktalari.html  kurumsal-satis.html  iletisim.html
├─ kvkk.html  mesafeli-satis.html  cerezler.html  aydinlatma.html
├─ partials/
│   ├─ header.html        # fetch-included
│   └─ footer.html        # fetch-included
├─ assets/
│   ├─ css/styles.css      # @font, CSS vars (§1), base, components, charge-fill keyframes
│   ├─ js/
│   │   ├─ include.js      # loads partials/* into [data-include] before Alpine init
│   │   ├─ main.js         # Alpine stores (cart, ui, lang) + components (menu, drawer, gallery, filters)
│   │   └─ data.js         # mock products / categories (DRY content source for x-for)
│   └─ img/                # logo.svg, product/lifestyle placeholders, icons
├─ tailwind.config.js?     # (inline <script> config for the CDN — see below)
```

**No build step** — each page `<head>` includes, in order:
1. Tailwind Play CDN `<script src="https://cdn.tailwindcss.com">` + an inline `<script>tailwind.config = {{ theme: {{ extend: {{...tokens from §1...}} }} }}</script>`.
2. Google Fonts (Poppins) + `assets/css/styles.css`.
3. Alpine via CDN (`defer`), preceded by `assets/js/include.js`, `data.js`, `main.js`.

**Component reuse without a server-side templating layer:**
- **Header/footer:** placeholders `<div data-include="partials/header.html"></div>`. `include.js` runs on `DOMContentLoaded`, `fetch()`es each partial, injects HTML, **then** dispatches an event so Alpine hydrates the injected markup. ⚠️ `fetch()` needs HTTP — serve locally (`npx serve .` or `python3 -m http.server`), **not** `file://`. Document this in README/CLAUDE.md.
- **Repeated lists (cards, categories, cart lines):** never hand-duplicated — rendered with Alpine `x-for` over `data.js`. One card template, reused everywhere.
- **Fallback** (if a hard requirement forbids fetch): keep header/footer as a single source in `partials/` and document a copy-on-change rule; prefer the fetch approach.

---

## 5. Signature element (frontend-design self-critique applied)

**The brand's thesis is "power your day."** So the signature is **the "Şarj / Charge" interaction language** — the brand idea expressed as behavior and structure, not decoration:

1. **Charge-fill primary actions.** Primary CTAs and every "Sepete Ekle" fill left→right with the teal→amber `--tg-charge` gradient on hover and "complete" to 100% with a brief amber spark on click. Consistent across hero CTA, add-to-cart, checkout. (Reduced-motion: instant color change, no sweep.)
2. **Charge as a data structure.** Where the template default would be numbered markers (01/02/03), we instead encode *real information* as a charge level:
   - **Trend Ürünler** ranks items with a small **charge-level meter** (fuller = more popular) — the meter means something, satisfying "structure is information."
   - **Free-shipping progress** in cart/drawer is a **charging bar** ("80 TL more to full charge / free shipping").
   - **Checkout stepper** is a battery filling across the 3 steps.

**Secondary, restrained motif — the "conductor" eyebrow.** Section eyebrows use a short teal rule terminating in a small amber **node** (a quiet nod to cables/connectivity). One accessory only.

**Self-critique (skill: "remove one accessory"):**
- *Is this generic?* Teal+amber on white with product grids could read as a generic tech store — true. The differentiation is deliberately placed in *behavior + meaningful structure* (charge-rank, charging stepper), which is specific to a **charging-accessory** brand and can't be lifted onto an unrelated site. That's the defensible risk.
- *Removed accessories:* dropped a page-threading "power line" connector (pure decoration) down to the minimal conductor tick; dropped gradient backgrounds — the charge gradient appears **only** in the fill interaction, never as ambient decor; dropped the cool lilac neutral. Boldness is spent in one place (the charge language); everything else stays quiet and disciplined.

---

## 6. Quality floor (non-negotiable at build)

Responsive 390/768/1440 · visible keyboard focus (`:focus-visible`) · `prefers-reduced-motion` honored · semantic landmarks + ARIA on menu/drawer/tabs · alt text · color contrast ≥ AA on teal/amber surfaces (amber text only on dark) · ≥44px tap targets · no fake data shipped (research §6 guardrail) · legal pages present (no Lorem ipsum).

---

## 7. Build order (next phase, on approval)

1. Tokens + `styles.css` + `tailwind.config` + Poppins + charge-fill keyframes.
2. `include.js` partial loader + `data.js` mock data + Alpine stores.
3. `partials/header.html` (+ mega-menu, lang switcher) & `partials/footer.html`.
4. Product card + button + cart drawer (the reused core).
5. `index.html` → validate the system end-to-end with a screenshot pass.
6. `kategori.html` → `urun.html` → `sepet.html` → `odeme.html`.
7. Static pages (hakkimizda, satis-noktalari, kurumsal-satis, iletisim) + legal template.
8. Screenshot QA at all 3 breakpoints (`docs/screenshots/capture.mjs` adapted for local pages).
