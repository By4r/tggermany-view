# TG Germany — Research & Analysis

> Pre-implementation research for the TG Germany website rebuild.
> Sources: deep inspection of **ttec.com.tr** (+ teknoloji.ttec.com.tr) and **tggermany.com**, plus Playwright screenshots at 1440 / 768 / 390 (see `docs/screenshots/`).
> Date: 2026-06-16 · Owner: Gavia Works

---

## 1. Executive summary

**TG Germany** (brand "TUGG", developed by Gavia Works) is a Turkish-language e‑commerce / brand site for a **mobile-accessory and "smart living" technology brand**, currently live at `tggermany.com` as an **unfinished placeholder build** on a dated, generic storefront theme (codenamed "Vela": jQuery + Bootstrap + Owl/Slick + WOW.js). The information architecture and templates exist, but **content is almost entirely placeholder** (Lorem ipsum, dummy contact data, `376X231`/`950X457` image boxes, empty product categories, broken links). It is a clean rebuild candidate.

**TTEC** (`ttec.com.tr`) is the mature reference: a real, established Turkish technology brand (parent **TESAN İletişim AŞ**, brand born 1995) running **two** sites — a B2C consumer accessory store and a B2B technology-distributor microsite. It is the quality bar and structural model for the rebuild, but **TG Germany is its own brand** — TTEC is never mentioned on tggermany.com, so we treat the relationship as "same playbook, separate brand."

**Goal of the rebuild:** keep TG Germany's sensible IA and brand voice, replace the dated stack with a modern one, build a proper teal-led design system, and replace placeholder content with real (or realistic) German-market content.

---

## 2. Brand & positioning

| | TG Germany (tggermany.com) | TTEC (ttec.com.tr) — reference |
|---|---|---|
| Brand | TG Germany / "TUGG" | ttec (lowercase wordmark) |
| Parent / owner | Built by **Gavia Works** | TESAN İletişim AŞ (since 1983; ttec since 1995) |
| Sector | Mobile accessories + "smart living" tech | Mobile accessories (B2C) + security/infra hardware (B2B) |
| Positioning | "International technology brand uniting technology & daily life" | "Turkey's leading mobile accessory brand" / "global technology brand" |
| Audience | Mass consumer + B2B corporate gifting | Consumers + retailers + B2B installers/integrators |

**TG Germany copy already written (real, reusable):**
- Hero: *"Teknolojiyle Gününü Güçlendir"* (Power your day with technology)
- *"Mobil aksesuar ve akıllı teknoloji ürünlerinde güvenilir çözümler"*
- *"Şarj, ses ve bağlantı ürünlerinde doğru tercih"* · *"Akıllı Aksesuar Çözümleri"*
- About: *"TG Germany, teknoloji ve günlük yaşamı buluşturan yenilikçi ürünler geliştiren, tasarım, kalite ve fonksiyonelliği aynı çizgide sunmayı hedefleyen uluslararası bir teknoloji markasıdır."*
- Values: *"güvenilir performans, sürdürülebilir kalite anlayışı ve erişilebilir fiyat politikası"*; *"müşteri memnuniyetini temel değer"*.

**Tone of voice:** confident, reassuring, customer-centric, benefit-led. TTEC's brand promise — *"her zaman kullanıcılarının yanında, ürünlerinin arkasında duran"* (always beside its users, behind its products) — is the register to match.

---

## 3. Information architecture

### TG Germany (current) — keep this IA
**Top nav:** Hakkımızda · Satış Noktaları · Kurumsal Satış · İletişim · B2B *(broken → google.com)* · **Product pillars:** Akıllı Yaşam (Smart Living, w/ dropdown) · Ses (Audio) · Fonksiyon (Function) · Koruma (Protection)
**Footer:** repeats nav + Legal: KVKK, Aydınlatma Metni, Uzak Mesafeli Satış Sözleşmesi, Çerezler · Social: FB / X / Instagram / LinkedIn / YouTube *(all bare domains, no real profiles)*

### TTEC (reference) — proven patterns to borrow
- **Consumer:** Hikayemiz · Satış Noktaları · Kurumsal Satış · Kurumsal Ürünler (→ tech site) · İletişim · Giriş Yap · Sepet. Categories: Çocuk, Ses, Şarj, Akıllı Saat, Akıllı Ev, Diğer, Set Ürünler.
- **Footer split:** "Kurumsal" (corporate/legal) + "Destek" (support: teknik servis, servis istasyonları, ödeme & teslimat, ek garanti, sipariş takip).
- **Dual-site model:** B2C store + B2B distributor microsite (`teknoloji.ttec.com.tr`, WordPress/WooCommerce). Worth replicating only if TG sells to both audiences.

**Recommended TG Germany IA (rebuild):** keep the 4 product pillars (Akıllı Yaşam / Ses / Fonksiyon / Koruma) + About / Sales Points / Corporate Sales / Contact, adopt TTEC's two-column support/corporate footer, fix the B2B entry (real corporate-sales page, not a broken link), and decide on language strategy (see §7).

---

## 4. Page-by-page (TG Germany current state)

| Page | URL | State |
|---|---|---|
| Home | `/` | Hero + value band + "Trend Ürünler" + "En Çok Tercih Edilen" + newsletter. Product cards = Latin filler; placeholder image boxes. |
| About | `/hakkimizda` | Single text block (good mission copy). No stats/team/timeline/images. Thin. |
| Sales Points | `/satis-noktalari` | Tabs Türkiye / Yurtdışı, but **no real locations**, no map. |
| Corporate Sales | `/kurumsal-satis` | Lorem ipsum + 3 value blocks (Marka Bilinirliği / Marka Elçileri / Kullanışlı Hediye). CTA "İletişime Geç". |
| Contact | `/iletisim` | Form (Ad Soyad, E‑posta, Telefon, Mesaj) + 3 office cards with **fake demo data** (erentheme.com, US addresses). No map. |
| Akıllı Yaşam | `/urunler/akilli-yasam` | 2 dummy products, Lorem ipsum, no prices. Filters: Boyut, Renk, Marka (Sony/Samsung defaults). |
| Ses / Fonksiyon / Koruma | `/urunler/*` | **All empty** ("Ürün bulunamadı"). Grid/list + sort UI present. |
| Legal | `/kurumsal/*` | KVKK / Aydınlatma / Mesafeli Satış / Çerezler — **all Lorem ipsum**. |

No working product-detail page; no confirmed cart/checkout/account → e‑commerce is **not operational**.

---

## 5. Visual identity & design system

**From live CSS + screenshots (`docs/screenshots/`):**
- **Primary brand color:** teal/cyan **`#00a8a9`** (dominant accent — CTAs, links, header, footer; 166 uses in style.css).
- **Secondary accent:** warm amber **`#fbaf5d`**; the logo "g" is rendered in an **orange** accent.
- **Neutrals:** white `#ffffff`, text `#201f1f` / `#323232`, body gray `#6f7172`, light grays `#ebebeb` / `#eaedff`.
- **State colors:** Bootstrap defaults (`#d9534f`, `#28a745`, `#17a2b8`) — replace with intentional tokens.
- **Type:** **Poppins** (sans) throughout. Icons: Font Awesome 5 Pro + Ionicons.
- **Logo:** bitmap **PNG** "tg germany" wordmark (orange "g") — low-res scaling risk; needs an **SVG** rebuild.
- **TTEC palette/logo:** not reliably extractable from text fetches — **pull live CSS + logo SVG before locking** any TTEC-derived palette decisions.

**Recurring components (both sites) to design properly:**
Sticky header w/ mega-menu · hero banner · horizontal product carousels · product grid cards · category listing w/ sidebar filters (size/color/brand) + grid/list toggle + sort · tabbed content (sales points Türkiye/Global) · stat blocks · logo walls (retailers) · forms with **file upload + KVKK consent** (corporate gifting logo upload; TTEC extended-warranty serial/invoice upload) · support/utility phone strip · two-column footer · newsletter capture.

---

## 6. Reference content & real data (from TTEC — useful as realistic placeholders / patterns)

- **Stats pattern:** founded 1995 · 30+ countries (consumer) / 20+ countries + 22,000+ retail points (tech) · 100M+ consumers · 100M+ products sold · KANTAR TNS award (Jan 2019, most preferred mobile-accessory brand).
- **Retailer logo wall:** Amazon, Carrefour, Hepsiburada, MediaMarkt, Trendyol, Turkcell, Vodafone, etc. (tabbed Türkiye / Global).
- **Corporate gifting line:** logo-branded wireless chargers, power banks, Bluetooth headphones, speakers. CTA "Hemen Başvur"; inquiry form w/ logo upload (PDF/AI/PSD/TIFF).
- **TESAN contact (real):** Çobançeşme Mah., Sanayi Cad., Bilge 1 Sok. No:17, Yenibosna 34196, Bahçelievler / İstanbul · +90 212 454 60 00 · consumer line 0850 222 88 32 (Mon–Fri 08:00–22:00) · social @ttectr.
- **Support utilities to consider:** extended warranty (Ek Garanti), order tracking (Sipariş Takip), service stations, payment & delivery policy.

> ⚠️ TG Germany's own contact data is currently **fake** (`0222 222 2222`, erentheme.com, US addresses). Real German-market contact details must be supplied by the client before launch.

---

## 7. Gaps, risks & decisions needed

**Must fix (current site is broken/non-compliant):**
1. Empty product catalog — 3 of 4 categories have zero products; no PDP; no cart/checkout.
2. Fake contact data, broken **B2B → google.com** link, social links to bare domains.
3. Legal pages are Lorem ipsum — **KVKK / distance-sales / cookie texts are legally required** for a commercial site.
4. Non-functional German language switcher (flag present, no implementation).
5. Bitmap logo, no design system, dated stack.

**Open decisions for the client / next step:**
- **Language strategy:** site is `lang="tr"` with a German flag toggle. Is TG Germany targeting Germany (→ German primary, likely + English/Turkish)? This drives everything. **Recommend German primary + English fallback.**
- **Scope:** full transactional e‑commerce (cart/checkout/account) vs. catalog + lead-gen brand site? Current build implies a store but none of it works.
- **B2C vs. B2B vs. both:** mirror TTEC's dual model, or single consumer store with a corporate-gifting page?
- **Content source:** real products/prices/images and real legal + contact data must come from the client.
- **Stack:** modern framework (React/Next + a design-token system) recommended over the existing jQuery/Bootstrap theme.

**Strengths to carry forward:** clear IA (4 product pillars + About/Sales Points/Corporate/Contact), a defined brand color (#00a8a9) + amber accent + Poppins, decent Turkish marketing copy for About & Corporate Sales, and a B2B corporate-gifting angle worth featuring.

---

## 8. Screenshots

Captured with Playwright/Chromium at 3 breakpoints (full-page, 2× DPR) — see **`docs/screenshots/`**:

| Site | 1440 (desktop) | 768 (tablet) | 390 (mobile) |
|---|---|---|---|
| TG Germany | `tggermany/tggermany-1440.png` | `tggermany/tggermany-768.png` | `tggermany/tggermany-390.png` |
| TTEC | `ttec/ttec-1440.png` | `ttec/ttec-768.png` | `ttec/ttec-390.png` |

Re-capture anytime with: `node docs/screenshots/capture.mjs`
