# CLAUDE.md

Guidance for working in this repository.

## What this is

**TG Germany** — a website rebuild for the technology brand "TG Germany" (brand "TUGG"), developed by **Gavia Works**. The brand sells **mobile accessories and "smart living" tech** (charging, audio, connectivity, protection). The existing site at `tggermany.com` is an unfinished placeholder on a dated jQuery/Bootstrap theme; this repo is the modern rebuild.

The mature sister reference is **ttec.com.tr** (TESAN İletişim AŞ) — a separate but structurally similar brand we model for quality and IA. **TG Germany is its own brand; do not surface "TTEC" in TG Germany's UI or copy.**

> Full analysis: **`tasks/research.md`**. Read it before designing or implementing.

## Current status

**Research + design plan complete. No page implementation yet.** The repo contains research (`tasks/research.md`), the design/page plan (`tasks/plan.md`), reference screenshots, and a Playwright capture script. Build only after the plan is approved. The §7 open decisions are now resolved — see "Locked decisions" below.

## Locked decisions

- **Scope:** full e-commerce **design** prototype — home, category/listing, product detail, cart, checkout flow (design level, no real backend).
- **Stack (final):** static **HTML + Tailwind (CDN) + Alpine.js**. **No framework, no build step.** Playwright in `package.json` is for screenshots only — keep it.
- **Language:** **Turkish primary** + a **German (DE)** language switcher present in the skeleton (content starts TR). English is a later phase.
- **Model:** single **B2C** store + one **"Kurumsal Satış (B2B)"** page — *not* a separate microsite.
- **Brand:** TG Germany tokens only — teal `#00a8a9` dominant, amber `#fbaf5d`, orange accent, Poppins. **TTEC is a quality/UX reference only — never borrow its name or colors.**

## Layout

```
tasks/research.md            Site analysis & rebuild brief (read first)
tasks/plan.md                Design system + component + page plan
docs/screenshots/            Reference screenshots, full-page, 3 breakpoints
  capture.mjs                Playwright capture script (re-run to refresh)
  ttec/  tggermany/          PNGs: <site>-{1440,768,390}.png
```

## Brand & design tokens (from research)

- **Primary:** teal `#00a8a9` · **Accent:** amber `#fbaf5d` (logo "g" is orange)
- **Neutrals:** `#ffffff`, text `#201f1f`/`#323232`, body `#6f7172`, lights `#ebebeb`/`#eaedff`
- **Type:** Poppins (locked). Full type scale & token system defined in `tasks/plan.md`.
- **Logo:** only a bitmap PNG exists — rebuild as SVG.
- **Signature:** the "şarj/charge" interaction language (charge-fill CTAs, charge-level trend ranking) — see `tasks/plan.md` §5. Spend boldness there; keep everything else quiet.
- When doing visual/design work, invoke the **frontend-design** skill and derive choices from `tasks/research.md` + `tasks/plan.md`, not from defaults.

## Information architecture (keep)

Product pillars: **Akıllı Yaşam · Ses · Fonksiyon · Koruma**. Plus: Hakkımızda · Satış Noktaları · Kurumsal Satış · İletişim. Adopt TTEC's two-column footer (corporate + support).

## Conventions & guardrails

- **Content is greenfield.** Treat all current site copy as placeholder *except* the real brand taglines and About/Corporate-Sales copy quoted in `tasks/research.md` §2.
- **Never ship the fake data** from the current site: `0222 222 2222`, `erentheme.com`, US demo addresses, B2B→google.com link, bare-domain social links. Real contact/legal data must come from the client.
- **Legal pages are mandatory** (KVKK / distance-sales / cookies) — don't ship Lorem ipsum.
- **Language:** Turkish primary; DE switcher must be a working skeleton control (not a dead flag). EN later.
- **No build step:** Tailwind via CDN config + Alpine via CDN. Shared header/footer handled via fetch-included partials (see `tasks/plan.md` §4) — serve over a local static server, not `file://`.
- Reference code locations as `path:line`.

## Tooling

- Node v24, npm. Playwright + Chromium installed (dev dep) for screenshots.
- Refresh reference screenshots: `node docs/screenshots/capture.mjs`
