# Codebase Audit — TG Germany built foundation

> PLAN-phase reference. Maps the EXISTING built homepage + shared partials so the inner-page plan reuses, not reinvents. Read alongside `tasks/research.md` and `tasks/plan.md`.
>
> **Repo root:** `/Users/gaviaworks/Developer/Projects/tggermany`
> **Stack confirmed:** static HTML + Tailwind Play CDN (`assets/js/tw-config.js`) + hand-written CSS (`assets/css/styles.css`) + Alpine.js 3 (+ `@alpinejs/collapse`). No build step. Partials via `fetch` include.

---

## 0. HTML files present at repo root

Only **one** real page exists; everything else linked from nav/footer is unbuilt.

| File | Status |
|---|---|
| `index.html` | **Built** — the live homepage. |
| `partials/header.html` | Built — shared header partial (not a standalone page). |
| `partials/footer.html` | Built — shared footer partial (not a standalone page). |

- **`ek-garanti.html` does NOT exist** (confirmed: `ls ek-garanti.html` → "No such file or directory"). It is referenced 2× from the homepage (`index.html:283` `ek-garanti.html`, `index.html:284` `ek-garanti.html#sorgula`) but is an unbuilt link. No partial or stub for it anywhere.
- No `kategori.html`, `urun.html`, `sepet.html`, `odeme.html`, or any legal/corporate page exists yet — all are placeholder targets.

Image assets present (relevant for inner-page reuse): `assets/img/products/p1.jpg … p12.jpg` (12 demo photos), `assets/img/tg-products/akilli-ampul.jpg` (1 real TG photo), banners `hero.webp`, `promo-ses.jpg`, `trust-bg.jpg`, plus `logo.png`, favicons, and an `assets/img/brand/` dir.

---

## 1. PAGE INVENTORY — RAW LINK LIST

Every `<a href>` (and the lang buttons) extracted one-by-one from the two partials. **R** = real intended page (not yet built unless noted), **#** = placeholder/no-op, **EXT** = external, **anchor** = same-page hash, **DYN** = href built dynamically in Alpine.

### Header (`partials/header.html`)

| # | Anchor text | href | Kind | Notes |
|---|---|---|---|---|
| 1 | TR / DE | (buttons, no href) | — | `header.html:10–11` lang switch; calls `$store.lang.set()`. Working skeleton, not links. |
| 2 | Kurumsal Satış | `kurumsal-satis.html` | **R** | `header.html:13` utility bar. Text via `$store.lang.t('corporate')`. |
| 3 | Hakkımızda | `hakkimizda.html` | **R** | `header.html:14` utility bar. |
| 4 | Çağrı Merkezi: — | (none, `<span>`) | — | `header.html:15` `.data-tbd` placeholder, no link. |
| 5 | (logo) | `index.html` | **R/built** | `header.html:27` home link. |
| 6 | category nav items ×4 | `kategori.html#{slug}` | **R/DYN** | `header.html:35` `x-for c in cats` → `'kategori.html#'+c.slug`. Slugs: `akilli-yasam`, `ses`, `fonksiyon`, `koruma`. |
| 7 | (search icon) | (button) | — | `header.html:42` toggles search panel. |
| 8 | (account icon) | `#` | **#** | `header.html:45` placeholder — account/login not designed. |
| 9 | (cart icon) | (button) | — | `header.html:48` opens cart drawer. |
| 10 | search suggestion rows | `urun.html#{id}` | **R/DYN** | `header.html:74` `'urun.html#'+r.id`. |
| 11 | mega sub-links | `kategori.html#{slug}` | **R/DYN** | `header.html:93` each subcategory → the category page hash (NOT a per-sub page). |
| 12 | "Tüm {cat} ürünleri" | `kategori.html#{slug}` | **R/DYN** | `header.html:95`. |
| 13 | mega promo block | `kategori.html#{slug}` | **R/DYN** | `header.html:100`. |
| 14 | mobile sub-links | `kategori.html#{slug}` | **R/DYN** | `header.html:133`. |
| 15 | Kurumsal Satış | `kurumsal-satis.html` | **R** | `header.html:138` mobile drawer. |
| 16 | Hakkımızda | `hakkimizda.html` | **R** | `header.html:139` mobile drawer. |
| 17 | İletişim | `iletisim.html` | **R** | `header.html:140` mobile drawer. |
| 18 | Sepete Git | `sepet.html` | **R** | `header.html:198` cart drawer foot. |
| 19 | Ödemeye Geç | `odeme.html` | **R** | `header.html:199` cart drawer foot. |
| 20 | Alışverişe Başla | `index.html` | **R/built** | `header.html:171` empty-cart CTA. |

### Footer (`partials/footer.html`)

| # | Anchor text | href | Kind | Notes |
|---|---|---|---|---|
| 21 | (logo) | `index.html` | **R/built** | `footer.html:21`. |
| 22 | Instagram/Facebook/YouTube/LinkedIn | `#` ×4 | **#** | `footer.html:27–30` social placeholders (intentionally no bare-domain fakes). |
| 23 | Hakkımızda | `hakkimizda.html` | **R** | `footer.html:37` (col "Kurumsal"). |
| 24 | Satış Noktaları | `satis-noktalari.html` | **R** | `footer.html:38`. |
| 25 | Kurumsal Satış | `kurumsal-satis.html` | **R** | `footer.html:39`. |
| 26 | İletişim | `iletisim.html` | **R** | `footer.html:40`. |
| 27 | Sipariş Takip | `#` | **#** | `footer.html:47` (col "Destek") — no page designed. |
| 28 | Ödeme & Teslimat | `#` | **#** | `footer.html:48`. |
| 29 | İade & Değişim | `#` | **#** | `footer.html:49`. |
| 30 | Sıkça Sorulan Sorular | `#` | **#** | `footer.html:50` (FAQ). |
| 31 | Akıllı Yaşam | `kategori.html#akilli-yasam` | **R** | `footer.html:57` (col "Ürünler"). |
| 32 | Ses | `kategori.html#ses` | **R** | `footer.html:58`. |
| 33 | Fonksiyon | `kategori.html#fonksiyon` | **R** | `footer.html:59`. |
| 34 | Koruma | `kategori.html#koruma` | **R** | `footer.html:60`. |
| 35 | Adres / Telefon / E-posta | (none, `<li>`) | — | `footer.html:68–70` `.data-tbd` placeholders, no links. |
| 36 | KVKK | `kvkk.html` | **R** | `footer.html:79` (legal strip). |
| 37 | Aydınlatma Metni | `aydinlatma.html` | **R** | `footer.html:80`. |
| 38 | Uzak Mesafeli Satış Sözleşmesi | `mesafeli-satis.html` | **R** | `footer.html:81`. |
| 39 | Çerezler | `cerezler.html` | **R** | `footer.html:82`. |
| 40 | (cookie bar) Çerezler | `cerezler.html` | **R** | `footer.html:95`. |

### Additional real targets referenced from `index.html` body (not in partials)

| Anchor | href | Notes |
|---|---|---|
| Ürünleri Keşfet | `kategori.html` | `index.html:41` hero CTA. |
| Kurumsal Satış | `kurumsal-satis.html` | `index.html:42` hero ghost CTA. |
| category hash links (hero strip, circle rail, family grid, promo cards, promo tiles, feature band) | `kategori.html#{slug}` | many; lines 53, 66, 80, 88(→`urun.html#id`), 96, 115, 119, 135, 144, 156, 159(→`urun.html#id`), 190, 201, 212, 237. |
| product links | `urun.html#{id}` | `index.html:88, 96, 164, 172`. |
| Yeni Başvuru / Başvuru Kontrol | `ek-garanti.html`, `ek-garanti.html#sorgula` | `index.html:283–284`. |
| İletişim Formu | `iletisim.html` | `index.html:297`. |
| social ×4 | `#` | `index.html:304–307` placeholders. |

### Distinct real pages the inner-page plan must produce

Deduplicated from all `R` rows (excluding `index.html`):

1. **`kategori.html`** — category/listing (uses `#{slug}` hash for the 4 pillars; also target of search submit per `main.js:172` comment `kategori.html?q=`).
2. **`urun.html`** — product detail (uses `#{id}` hash).
3. **`sepet.html`** — cart page.
4. **`odeme.html`** — checkout.
5. **`hakkimizda.html`** — About.
6. **`kurumsal-satis.html`** — Corporate/B2B sales.
7. **`satis-noktalari.html`** — Store locations.
8. **`iletisim.html`** — Contact.
9. **`ek-garanti.html`** (+ `#sorgula` anchor) — Extended warranty (apply + check). **Does not exist.**
10. **`kvkk.html`** — KVKK.
11. **`aydinlatma.html`** — Clarification text.
12. **`mesafeli-satis.html`** — Distance-sales contract.
13. **`cerezler.html`** — Cookies.

**Tally: 13 distinct real inner pages intended; 0 built so far (only `index.html` exists).**
**Pure `#` placeholder links: 10** — account/login icon (1, header), social (4 footer + 4 homepage), and the Destek column (4: Sipariş Takip, Ödeme & Teslimat, İade & Değişim, SSS). The 4 Destek items have no destination page designed at all; account/login is undesigned; socials await real client URLs.

---

## 2. COMPONENT INVENTORY — reusable UI already built

All visual primitives live in `assets/css/styles.css`; markup patterns are on `index.html` / partials. Classes are **hand-authored CSS** (BEM-ish), supplemented by Tailwind utilities from the CDN.

### Layout / scaffolding
- **`.container-tg`** — page width wrapper, `max-width:1280px`, responsive `padding-inline`. `styles.css:92–94`. Used everywhere.
- **`.section`** / **`.bg-soft`** — vertical section rhythm (36/52/72px) and the alternating soft-grey band. `styles.css:95–98`.
- **`.ratio-box`** + modifiers `.ratio-1-1 / .ratio-4-3 / .ratio-16-9 / .ratio-21-9` — the universal media box: a `div` with `background-image` (NOT `<img>`). `styles.css:143–148`.

### Typography / text tokens
- **`.t-h1` / `.t-h2`** — fluid `clamp()` headings. `styles.css:78–79`.
- **`.label`** + **`.label--accent`** — small uppercase eyebrow (muted / teal). `styles.css:84–89`. Heavily reused (cards, promos, footer support copy).
- **`.price` / `.price--old` / `.price--sale`** — money typography (tabular nums, strikethrough, sale-red). `styles.css:80–82`.
- **`.data-tbd`** — muted-italic marker for client-supplied data not yet provided. `styles.css:350–351`. Used in header `:15`, homepage `:294–295`, footer `:68–70`.

### Buttons / CTAs
- **`.btn`** base + variants: `.btn--sm`, `.btn--lg`, `.btn--block`, `.btn--secondary`, `.btn--ghost`, `.btn--light`, disabled `.btn[disabled]/.is-disabled`. `styles.css:150–170`.
- **`.btn--amber`** is USED (`header.html:105` mega promo) but **NOT defined in CSS** — falls back to base teal `.btn`. ⚠️ Gap: define `.btn--amber` if amber CTA is wanted on inner pages.
- **`.icon-btn`** + `.tap` (44px hit-target) — header action buttons, qty controls. `styles.css:172–174`, `.tap` `styles.css:140`.

### Product card (the workhorse) — `styles.css:176–216`
- Structure: `<article class="card product-card" x-data="tgProductCard(p)">` → `.media` (badge + fav + image link + `.add-overlay`) → `.body` (label, title, `.rating-row`/`.stars`, `.price-row`). Canonical markup at `index.html:84–103` (Çok Satanlar) and re-used verbatim at `index.html:160–179` (Öne Çıkan). **Two identical copies already — prime candidate for a partial/template.**
- Sub-parts: **`.badge`** + **`.badge--new`** (`styles.css:209–210`), **`.fav`** heart (`styles.css:212–213`), **`.add-overlay`** slide-up add-to-cart with stock-disabled + touch-always-visible states (`styles.css:194–207`), **`.stars` / `.rating-row`** (`styles.css:215–216`).
- JS behavior from `tgProductCard()` (`main.js:92–106`): `addToCart()`, `stars(r)` renderer.

### Cards / tiles / promos
- **`.card`** — generic white rounded bordered surface. `styles.css:177`. Used for product cards, promo cards, warranty/support cards, family grid.
- **`.promo-tile`** (+ `__bg / __overlay / __content / __link`) — 3-up editorial image tile. `styles.css:339–348`; markup `index.html:189–223`.
- **`.promo-feature`** (+ `__bg / __overlay`) — wide image-led band. `styles.css:332–337`; markup `index.html:230–239`.
- Flat 2-up promo cards (teal + white) — no dedicated class, built from `.card` + grid + inline `background:var(--tg-primary)`. `index.html:130–147`.
- Category family grid card — `.card` + `.ratio-4-3`. `index.html:113–123`.
- **`.cat-circle`** — round category thumbnail (76px). `styles.css:257`; markup `index.html:64–71`.

### Header components (`partials/header.html`)
- **Utility bar** `.utility-bar` (`styles.css:229–232`) with collapse-on-scroll (`.is-condensed`).
- **`.lang-switch`** TR/DE toggle (`styles.css:252–254`; markup `:9–12`).
- **`.logo-img`** (`styles.css:234–235`).
- **`.nav-link`** with animated underline (`styles.css:246–248`).
- **`.cart-count`** badge (`styles.css:250`).
- **Mega menu** `.mega` + `.mega-promo` (+ `__overlay/__logo/__content/__title`) — `styles.css:259, 321–326`; markup `:86–110`.
- **Search panel** `.search-backdrop`, `.search-panel` (+ `__inner`), `.search-box` (+ `__icon/__submit`), `.search-clear`, **live suggestions** `.search-suggest` (+ `__row/__thumb/__name`), `.search-empty` — `styles.css:298–319`; markup `:55–83`.
  - Note: an older inline `.search-pill` / `.search-btn` set still exists in CSS (`styles.css:237–244`) but is **unused** by current markup — the panel uses `.search-box`. Dead-ish CSS to be aware of.
- **Mobile nav drawer** + **Cart drawer** share `.drawer`, `.drawer-backdrop`, `.drawer__head/__body/__foot` (`styles.css:261–267`); both use `x-teleport="body"`. Cart drawer adds **`.qty`** stepper (`styles.css:269–272`) and **`.ship-bar`** free-shipping progress (`styles.css:274–276`). Markup `:112–204`.

### Footer / global
- **`.site-footer`** + `h4` column heads (`styles.css:278–282`), **`.footer-legal`** strip, **`.social-ico`** round social buttons (`styles.css:283–284`).
- **Newsletter form** — inline `x-data="{ email:'' }"`, `@submit.prevent` (no backend). `footer.html:10–14`.
- **`.cookie-bar`** consent (`styles.css:353–354`; `tgCookie()` in `main.js:109–116`; markup `footer.html:90–102`).
- **`.trust-band`** — teal band w/ image texture + gradient overlay, 4 trust items. `styles.css:286–296`; markup `index.html:244–263`.
- **Warranty block** — `.warranty-shield` + `.warranty-badge`. `styles.css:328–330`; markup `index.html:269–288`.

### Hero (homepage-specific, likely not reused as-is)
- `.hero` + `__bg/__overlay/__main/__content/__eyebrow/__title/__sub/__cta/__btn-ghost` and the `.hero__cats` bottom strip. `styles.css:100–134`; markup `index.html:30–58`. Has Ken-Burns + rise intro animations (reduced-motion guarded). Inner pages likely need a lighter page-header pattern instead — **no generic `.page-header`/breadcrumb component exists yet** (gap).

---

## 3. DATA SHAPE INVENTORY (`assets/js/data.js`) + consumption

Everything hangs off the global **`window.TG`** namespace (`data.js:5`). Loaded via plain `<script>` before `main.js` and Alpine (`index.html:317–321`).

### `window.TG.categories` — array of 4 pillar objects (`data.js:11–24`)
```
{ slug, name, tag, sub[], photo }
```
| Field | Type | Example | Notes |
|---|---|---|---|
| `slug` | string | `"akilli-yasam"` | URL hash key; matches footer/nav hrefs. The 4 slugs: `akilli-yasam`, `ses`, `fonksiyon`, `koruma`. |
| `name` | string | `"Akıllı Yaşam"` | Display (TR). |
| `tag` | string | `"Smart Living"` | EN sub-label, shown as mega-menu eyebrow (`header.html:91`). |
| `sub` | string[] | 5 names | Mega-menu + mobile subcategory list. **No slug/href per sub** — all sub-links point to the parent category hash. ⚠️ A real category page filtered per sub will need sub-slugs. |
| `photo` | string | path | Single representative image. |

### `window.TG.products` — array of 12 product objects (`data.js:27–40`)
```
{ id, name, cat, price, old, rating, reviews, badge, trend, stock, photo }
```
| Field | Type | Notes |
|---|---|---|
| `id` | string | `"p1"…"p12"` — also the `urun.html#{id}` anchor. |
| `name` | string | TR product name. |
| `cat` | string | category `slug` (FK into categories). |
| `price` | number | current price (₺), e.g. `1299.9`. |
| `old` | number\|null | pre-discount price or `null`. |
| `rating` | number | 0–5, e.g. `4.7`. |
| `reviews` | number | review count. |
| `badge` | string\|null | `"İndirim"` / `"Yeni"` / `null`. `badge--new` styling keys off `=== 'Yeni'`. |
| `trend` | number | popularity score (sort only, not displayed). |
| `stock` | boolean | gates add-to-cart + "Stokta yok". |
| `photo` | string | image path. |

### Helpers on `window.TG`
- **`catName(slug)`** (`data.js:43–46`) → category display name. Used `index.html:95, 171`.
- **`byTrend(n)`** (`data.js:47–49`) → top-N products sorted by `trend` desc (default 6). Used `index.html:83` (`byTrend(5)`).

### How `main.js` / Alpine consumes the data
- **`alpine:init`** (`main.js:31–89`) registers 3 **stores**:
  - **`$store.lang`** (`:33–45`) — `current`, `set()`, `t(key)`; dict `TG_STRINGS` (`:10–29`) has `tr` + `de`. Persists `tg_lang` in localStorage; sets `<html lang>`.
  - **`$store.ui`** (`:48–55`) — `drawer`, `mobileNav`, `mega`; `openDrawer/closeDrawer/toggleMobile` (lock body scroll).
  - **`$store.cart`** (`:58–88`) — `items[]` persisted to localStorage `tg_cart`; methods `add/remove/setQty/inc/dec`; getters `count/subtotal/remaining/shipPct`; `fmt()`. `freeShip = 750`. **Cart line shape:** `{ id, name, price, photo, cat, qty }` (`:69`).
- **Component factories** (global functions, used via `x-data="..."`):
  - **`tgProductCard(product)`** (`:92–106`) — `p`, `addToCart()`, `stars(r)`.
  - **`tgCookie()`** (`:109–116`).
  - **`tgHeader()`** (`:119–175`) — search (`q`, `results()`, `submitSearch` comment notes intended `kategori.html?q=`), mega (`setMega/clearMega/activeCat`), mobile accordion (`mobileOpen{}`), condensed-on-scroll logic (`init`, hysteresis-guarded), `cats` getter → `window.TG.categories`.
- **Money helper** `tgFormatPrice(v)` (`:4–7`) — `toLocaleString("tr-TR")` + ` ₺`. Exposed as `window.tgFormatPrice`; cart uses it via `fmt`.

### Alpine `x-for` / `x-data` patterns to mirror on inner pages
- Bare `x-data` island + `<template x-for="c in window.TG.categories">` — hero strip `index.html:48–56`, circle rail `:64–71`, family grid `:113–123`.
- Product grid: `<template x-for="p in window.TG.byTrend(5)">` (`:82–104`) and `window.TG.products.slice(0,10)` (`:158–180`) wrapping `tgProductCard(p)`.
- Search results: `x-for="r in results()"` (`header.html:73`).
- Dynamic hrefs built with `:href="'kategori.html#'+c.slug"` / `'urun.html#'+p.id` — this is the established routing convention inner pages must read on load (parse `location.hash`).

### Top data-shape gaps inner pages will need
1. **No product detail fields** — `urun.html` needs: description, gallery (multiple images; today `photo` is a single string), specs/attributes, variants (color/capacity), SKU, brand, breadcrumb category path, related products. None exist.
2. **No sub-category slugs/hrefs** — `sub[]` is plain strings; a filterable `kategori.html` needs per-sub slugs and a way to filter products by sub. Products have only `cat` (pillar), no sub assignment.
3. **No `byCategory(slug)` / filter / sort / search-by-category helper** — `kategori.html` listing logic must be added (only `byTrend` and `catName` exist; `results()` filters by name only, in the header).
4. **No hash-router util** — nothing reads `location.hash` to resolve the active category/product; each inner page must implement it.
5. **Cart/checkout data** — cart store exists and is solid, but `sepet.html`/`odeme.html` need totals beyond subtotal (shipping cost, tax/KDV, discount/coupon, grand total) and an order/address/form model — none modeled.
6. **No reviews data** — only a `reviews` count + `rating` number; product detail "reviews" UI would need a review list shape.
7. **i18n coverage** — `TG_STRINGS` only covers header/cart/search words; inner-page copy is hard-coded TR. DE switch will leave inner-page body text untranslated (acceptable per "TR primary, DE skeleton", but note it).

---

## 4. CONVENTIONS

### Naming
- CSS: hand-written, BEM-ish (`block__element`, `block--modifier`): `.hero__title`, `.product-card`, `.promo-tile__overlay`, `.btn--secondary`. Tailwind utilities layered on top for one-off layout (`grid`, `flex`, `gap-*`, `mb-*`, responsive prefixes).
- JS: `tg`-prefixed globals (`tgProductCard`, `tgHeader`, `tgCookie`, `tgFormatPrice`); data namespace `window.TG`; localStorage keys `tg_lang`, `tg_cart`, `tg_cookie`.

### Color tokens / CSS custom properties (`styles.css:21–56`)
Two parallel token sources — keep both in sync when adding pages:
- **CSS vars (`:root`)** — the source of truth for hand-written CSS: `--tg-primary #00a8a9`, `--tg-primary-600 #018a8b`, `--tg-primary-700 #007577`, `--tg-amber #fbaf5d`, `--tg-amber-600 #f59423`, `--tg-sale #e3502f`, `--tg-ink #1c2422`, `--tg-body #4b5654`, `--tg-muted #8a9492`, `--tg-line #e8ebea`, `--tg-bg #fff`, `--tg-bg-soft #f5f6f7`; states `--tg-success/-warning/-error`; radii `--r-sm/md/lg/pill`; shadows `--shadow-sm/-card/-hover/-drawer`; `--container 1280px`.
- **Tailwind config (`tw-config.js`)** — for utility classes (`text-ink`, `bg-soft`, `text-primary-700`, etc.). ⚠️ **Values diverge slightly** from the CSS vars (e.g. `ink #14201f` vs `--tg-ink #1c2422`; `line #e4ebea` vs `--tg-line #e8ebea`; `soft #f5f8f8` vs `--tg-bg-soft #f5f6f7`; adds `inkteal #053b3f`, `brandorange #f5762d`, `borderRadius.xl`, `boxShadow.card/hover`). Inner pages mixing utilities + vars will get near-but-not-identical neutrals. Prefer CSS vars for exact brand surfaces.
- Dark/deep teal `#053b3f` (Tailwind `inkteal`) is used raw in hero/promo overlays via inline `rgba(5,59,63,…)`.

### Charge / şarj interaction language
- **Intentionally NOT implemented as a literal meter.** `styles.css:1–6` header states "no signature gimmicks"; `data.js:26` notes `trend` is "used only for sorting — not shown as a meter"; the free-shipping `.ship-bar` comment (`styles.css:274`) explicitly says "not a 'charge bar'". The brand's "güçlendir/charge" idea survives only as **copy** ("Teknolojiyle gününü güçlendir", `index.html:38`) and amber accents — not as an interactive charge-fill component. Inner pages should follow this restrained interpretation unless the plan revisits it.

### Partial fetch-include mechanism (`assets/js/include.js`)
- Markup: `<div data-include="partials/header.html"></div>` (`index.html:26`, footer `:315`).
- `loadIncludes()` fetches each `data-include` URL, injects `innerHTML`, then **`Alpine.initTree(el)`** to hydrate (handles both pre- and post-Alpine-init via `hydrate()`). Fires `includes:loaded` event when done.
- **Requires HTTP** — `fetch` fails on `file://`; serve with `npx serve .` / `python3 -m http.server`. On failure it injects a visible TR error message.
- CSS makes includes invisible to layout: **`[data-include] { display: contents }`** (`styles.css:222`) so `position:sticky` header works; and a CLS reservation `[data-include="partials/header.html"]:empty { min-height: … }` (`styles.css:225–227`) holds header height until injected.
- **Every inner page must include the same two partial divs + the same 5 script tags** (`index.html:317–321`): `data.js`, `main.js`, `@alpinejs/collapse` CDN, `alpinejs` CDN, `include.js` — in that order (include.js last/deferred). Plus the `<head>` block: Tailwind CDN, `tw-config.js`, Poppins preloads, `styles.css`.

### Relative paths / GitHub Pages subpath
- All asset and partial paths are **relative** (`assets/…`, `partials/…`), deliberately so the site works under a GitHub Pages subpath (`include.js:3` comment). Inner pages at repo root can use the same relative roots. Do **not** introduce leading-slash absolute paths.

### Image handling — div + background-image (not `<img>`)
- Convention: product/promo/category imagery uses **`.ratio-box` div with inline `style="background-image:url(...)"`** + `background-size:cover`, never `<img>`. Explicit in `styles.css:143` ("div + background-image (NO `<img>`)"). The only real `<img>` tags are the logo (`logo.png`) and mega-promo logo. Inner pages should keep this for content/product imagery; reserve `<img>` for the logo and any truly semantic image.
- Aspect is controlled by `.ratio-1-1 / .ratio-4-3 / …`; placeholder bg is `--tg-bg-soft` so empty boxes don't flash white.

### Accessibility / motion baseline (reuse on inner pages)
- `:focus-visible` ring (`styles.css:137–139`), `.tap` 44px targets, `.sr-only`, `[x-cloak]` hide-until-hydrated (`styles.css:357`), global `prefers-reduced-motion` reset (`styles.css:364–366`). `<html lang>` is driven by the lang store.

---

## Summary

- **Real pages found vs placeholders:** exactly **1 built page** (`index.html`); the partials reference **13 distinct intended inner pages** (`kategori`, `urun`, `sepet`, `odeme`, `hakkimizda`, `kurumsal-satis`, `satis-noktalari`, `iletisim`, `ek-garanti` + `#sorgula`, `kvkk`, `aydinlatma`, `mesafeli-satis`, `cerezler`) — **none built yet**. **`ek-garanti.html` confirmed absent.** There are **10 pure `#` placeholder links** (account/login, 8 socials, and the 4-item Destek column which has no designed destination).
- **Reusable components ready to lift:** `.container-tg`, `.section`/`.bg-soft`, `.ratio-box` (+ratios), `.t-h1/.t-h2`, `.label(--accent)`, `.price` family, `.btn` (+ 6 variants; `.btn--amber` missing), `.icon-btn`/`.tap`, the **product card** (`tgProductCard`, already duplicated 2×), `.badge`/`.fav`/`.stars`, `.card`, promo `.promo-tile`/`.promo-feature` + 2-up promo pattern, `.cat-circle`, the full **header** (utility bar, lang-switch, nav, mega-menu, search panel + live suggestions, mobile drawer, **cart drawer** with `.qty` + `.ship-bar`), the **footer** (columns, legal strip, `.social-ico`, newsletter), `.trust-band`, warranty block, `.cookie-bar`, plus the 3 Alpine stores (`lang/ui/cart`).
- **Top data-shape gaps for inner pages:** (1) no product-detail fields (description, image gallery, specs, variants, related, breadcrumb) — `photo` is a single string; (2) no sub-category slugs and no product→sub mapping, so a filterable `kategori.html` can't filter by sub; (3) no `byCategory`/filter/sort helpers and no hash-router util (each page must parse `location.hash`); (4) no checkout/order model (shipping, KDV, coupon, grand total, address/form); (5) no reviews list shape; (6) no generic page-header/breadcrumb component; (7) two diverging token sources (CSS vars vs Tailwind config) to reconcile.
