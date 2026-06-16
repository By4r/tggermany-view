# TG Germany — Handoff

> Living handoff for the TG Germany storefront rebuild. Read with `CLAUDE.md`, `tasks/research.md`, `tasks/plan.md`, `tasks/replica-notes.md`.
> Last updated: 2026-06-16

## Where we are

**Homepage is COMPLETE** — a faithful, clean replica of ttec.com.tr's visual language using TG Germany's real brand assets. Built with static HTML + Tailwind (CDN) + Alpine.js, no build step.

Delivered on the homepage:
- **Full-bleed image hero** (moderate gaviaworks.com pattern): TG's own `hero.webp`, brand teal overlay (not cinematic), eyebrow + headline (amber accent) + 2 CTAs + bottom "Odak Alanlar" category strip (centered). ~86vh.
- **2-row compact header**: utility bar (free-shipping · TR/DE switch · Kurumsal Satış · Hakkımızda · call-center placeholder) + single main bar (**logo left · category nav centered · actions right**). Kurumsal Satış/Hakkımızda live in the top utility bar (no duplicate).
- **Search = icon** → roomy descending search panel with dim backdrop (closes via Esc / click-outside / clear), **live autocomplete** (mock-product matches as thumbnail+name+price rows, "no results" state) and a proper clear (×) button. `tgHeader`: `toggleSearch / closeSearch / clearQuery / results`.
- **Mega-menu** (hover, full-width below the sticky header): left half = subcategories, **right half = category image (cover) with dark overlay + TG logo** promo.
- **Extended-warranty section** ("Ürününüzü Güvenceye Alın"): warranty card (+2-yıl badge, Yeni Başvuru / Başvuru Kontrol → `ek-garanti.html`, legal note) + support block (call-center `data-tbd` placeholder, İletişim Formu → `iletisim.html`, socials).
- **Three distinct visual-promo layouts**: 2-up split cards (Kampanya/Yeni Sezon) · **3-up editorial image tiles** (`promo-tile`, "Öne Çıkan Koleksiyonlar") · wide image-led band (`promo-feature`, audio). All copyright-safe assets, AA-tuned overlays.
- **Section rhythm** tuned so backgrounds alternate cleanly (hero → white / gray / … / teal accent / gray), no adjacent duplicates; consistent `.section` spacing.
- **Modern product cards**: flush image (top corners clipped to card radius), hover lift + soft shadow + subtle image zoom, refined İndirim/Yeni badges, **"Sepete Ekle" reveals over the image on hover** (always visible on touch via `@media (hover:none)`), price hierarchy (current/old), 2-line title clamp, rating+count. Grid 2/3/5-up.
- **Category circles** (centered, grouped), **promo banners** (flat), **trust band** (teal-dominant with a low-opacity TG image texture behind it).
- **Cart drawer** (Alpine `$store.cart`, localStorage, free-shipping progress), **cookie consent** (persisted), **sticky header** (utility strip auto-hides on scroll-down; flicker fixed via `overflow-anchor:none` + post-toggle lock).
- **Performance**: self-hosted Poppins (`assets/fonts/`) + preloads, hero preload → CLS ≈ 0 (1440/768/390 all < 0.013), 0 console errors.
- **Design tokens** softened a tick: `--r-sm 5 / --r-md 8 / --r-lg 12`.

**Live:** https://by4r.github.io/tggermany-view/ (GitHub Pages, repo `By4r/tggermany-view`, main/root, `.nojekyll`).

## Next

1. **Awaiting Yasin Bey's approval** on the homepage.
2. On approval → build the remaining **12 pages** with an agent team. Reference `plan.md §3` (page inventory) and a **3-teammate split**: `shop` (kategori, ürün, sepet, ödeme), `pages` (hakkımızda, satış-noktaları, kurumsal-satış, iletişim), `qa` (legal pages kvkk/aydınlatma/mesafeli-satış/çerezler + cross-page QA at 3 breakpoints).
3. **Add these 3 ttec features** during the remaining-pages phase (assessed valuable):
   - **Ek Garanti** (extended-warranty registration form — serial no + invoice upload, KVKK consent).
   - **Satış Noktaları / retailer wall** (tabbed Türkiye/Yurtdışı logo wall).
   - **Horizontal "fırsatlar" product carousel** (themed deals row) on relevant pages.

## Critical rules (carry into every page)

- **Replica discipline**: frontend-design skill is for QUALITY ONLY (spacing, hierarchy, hover, consistency). NO vibe/signature/gradients/gimmicks — keep it ttec-clean and flat.
- **All paths relative** (no leading `/`) — site runs under the GitHub Pages subpath `/tggermany-view/`. fetch-includes use `partials/...`.
- **Fixed/square-ratio images**: `div + background-image: cover; center` (`.ratio-box`), never `<img>` for those. No 2× retina multiplication — CSS render width drives it.
- **No fake contact data** — phone/address/email/social are real-data placeholders (`.data-tbd`, `#`) until the client supplies real data.
- **No ttec or other brand imagery** — only TG's own assets + copyright-safe stock (Unsplash/Pexels, free license).
- **fetch needs HTTP** — test with `python3 -m http.server 8099` (or `npx serve`), not `file://`.
- **Foundation files are READ-ONLY for teammates**: `assets/css/styles.css`, `assets/js/{tw-config,data,include,main}.js`, `partials/{header,footer}.html`. Reuse the card/button/drawer components and tokens; don't fork them.

## Reuse map

- Tokens + components: `assets/css/styles.css`. Tailwind token mirror: `assets/js/tw-config.js`.
- Mock data (DRY): `assets/js/data.js` (`window.TG.categories`, `window.TG.products`, `catName`, `byTrend`).
- Alpine stores/components: `assets/js/main.js` (`$store.cart`, `$store.ui`, `$store.lang`, `tgProductCard`, `tgHeader`, `tgCookie`).
- Shared chrome: `partials/header.html`, `partials/footer.html` (fetch-included via `assets/js/include.js`).
- Screenshot QA: `docs/screenshots/capture-build.mjs` (point at local pages) at 1440/768/390.

## Open items

- **Real TG product photography** needed from Yasin Bey → replace free-license stock in `assets/img/products/p1..p12.jpg`. (TG site had only the logo, one hero, and one real product photo — the smart bulb at `assets/img/tg-products/akilli-ampul.jpg`.)
- **Form backend + reCAPTCHA** (contact, corporate, warranty) — next phase; current forms are front-end only.
- **EN locale** — phase after TR/DE.
