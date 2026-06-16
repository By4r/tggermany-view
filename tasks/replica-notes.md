# ttec.com.tr — Visual Language Notes (for faithful replica)

> Goal: rebuild TG Germany's storefront as a **faithful structural replica of ttec.com.tr** — clean, white, flat. No creative reinvention, no signature/distinctive element. Use TG's real brand (logo + teal #00a8a9 / amber #fbaf5d) applied with ttec's restraint.
> Source: `docs/screenshots/ttec/` (homepage, category, card closeup @ 1440/768/390), captured 2026-06-16.

## Overall feel
- **Light & clean.** Background is **white**; sections alternate white / very light gray (~`#f5f6f7`). Lots of breathing room.
- **Flat color, used sparingly.** Teal is an *accent* (price, buttons, links, small icons), not a wash. **No gradients anywhere** on cards, buttons, backgrounds, or category tiles. Orange/red only for discount badges.
- **Photography does the work.** Real product photos carry the page; the UI chrome around them is quiet and neutral.
- **Rounded but modest.** Cards/buttons have small-to-medium radius; nothing is a big pill except the search field and category circles.

## Header (top → bottom)
1. **Thin utility bar** — dark teal strip: short announcement left; account / help / language-ish links right. Small text.
2. **Main bar (white)** — logo left · **large rounded search field** center (with a teal search button) · account + cart icons right (cart shows a count bubble).
3. **Category row** — horizontal strip of **circular category thumbnails** (real product/category photos in circles) with a label under each; ~7–8 across on desktop. Acts as primary category nav.

## Hero
- A **banner/slider** area: product-forward promo with a price/offer callout and a CTA. Imagery-led, on a contained rounded block. Teal accents, **no gradient dial / no animated gimmick**. Pagination dots.

## Product card anatomy (the core unit)
- **White card**, thin light border + very subtle shadow; modest radius.
- **Product photo on white**, generous padding, consistent square-ish ratio. Photo is the hero of the card.
- **Discount badge** (orange/red) top-left when on sale; occasional small "new"-type tag.
- Small **brand/category line**, then **product title** (2 lines, muted dark).
- Optional **rating** (stars + count).
- **Price** in teal/dark, bold; struck old price next to it when discounted.
- **Add-to-cart = small teal circular "+" button** (bottom-right), not a big colored bar.
- Grid: **5-up desktop**, ~3-up tablet, **2-up mobile**. Even gaps, aligned heights.

## Sections / homepage rhythm
- Repeating **titled product carousels/grids** ("week's deals", "featured", per-category) — section title left, "see all" link right, then a row of cards.
- **Editorial/lifestyle banner tiles** (2-up / 3-up) with rounded corners and real photos.
- A **campaign band** (colorful product promo) and a **dark-teal product feature band** (solid color block, not gradient) highlighting one product.
- Generous vertical padding between sections (~64–80px desktop).

## Category (listing) page
- Breadcrumb + category title.
- **Left filter sidebar** (categories, brand, price, attributes) on desktop.
- **Product grid** (same card unit), 5-up desktop. Sort + result count toolbar.
- Pagination at the bottom; consistent white background.

## Footer
- Light background, **multi-column link lists** (corporate / support / products / contact), brand block with logo + short line + social icons; legal/payment strip at the very bottom. Quiet, dense, organized.

## Buttons (from cookie banner + cards)
- **Primary:** solid teal, white text, rounded — flat (no fill animation).
- **Secondary:** light/outline with subtle border.
- **Ghost/text:** plain, for "reject"/tertiary.
- Circular **icon buttons** (the "+" add, cart, account).

## Color usage summary (apply TG palette with this discipline)
- **White** = dominant background. **Light gray** = alternating sections / image padding.
- **Teal `#00a8a9`** = primary actions, price, links, active states, the utility bar / feature band (solid).
- **Amber `#fbaf5d`** = sparing secondary accent only.
- **Orange/red** = discount badge.
- **Near-black** = headings/body; **gray** = meta/muted.

## What to REMOVE from the previous build (anti-patterns vs. ttec)
- ❌ All gradients (token `--tg-charge`, hero gradient, category-circle gradients, card gradients, banner gradients).
- ❌ Charge "signature": hero "%86 günün gücü" dial, charge-fill button animation, trend charge-level meter, cart "charge bar".
- ❌ Conductor eyebrow (teal rule + amber node).
- ❌ Fake inline SVG wordmark logo → replace with the **real TG logo** (`assets/img/logo.png`).
- ❌ Fake gradient product boxes → **real product photos** (`assets/img/products/*.jpg`, free-license Unsplash/Pexels).
