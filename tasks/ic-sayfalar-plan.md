# TG Germany — İç Sayfalar Planı (Inner-Pages Plan)

> **PLAN fazı.** Implement yok, kod yok, commit yok. Bu dosya, anasayfa-sonrası tüm iç sayfaların yapım brief'idir.
> Girdi sentezi: `tasks/codebase-audit.md` (mevcut yapı) + `tasks/ref-research.md` (referans pattern'leri) + `tasks/plan.md` (tasarım sistemi) + `tasks/replica-notes.md` (replica disiplini) + `tasks/handoff.md` (mevcut durum).
> Stack: static HTML + Tailwind CDN (`assets/js/tw-config.js`) + Alpine.js, **build yok**. TR birincil, DE skeleton. Tüm path **relative** (Pages subpath `/tggermany-view/`).
> Tarih: 2026-06-16 · Sahip: Gavia Works
>
> **⚠️ GÜNCEL KAPSAM:** Bu dosya 18 iç sayfayı tanımlar. Beyar "tam production akışı" yönüne geçti → **`tasks/tam-akis-onerisi.md`** bu planı **27 sayfaya** genişletir (auth + hesap paneli + checkout onayı + arama) ve **4 teammate**'e çıkarır. Kararlar orada KİLİTLİ; bu dosya o süperset'in iç-sayfa temelidir. Çelişkide `tam-akis-onerisi.md` esastır.

---

## ⚠️ Replica düzeltmesi (sentez kararı — okumadan geçme)

`plan.md §3/§5` hâlâ **"şarj/charge" signature**'ını (charge-fill CTA, trend charge-rank meter, sepet "charge bar", checkout battery-stepper) anlatır. Bu **kaldırıldı** ve artık geçersiz:
- `replica-notes.md` "What to REMOVE": tüm gradient + charge signature → çıkar.
- `styles.css:1–6` "no signature gimmicks"; `data.js:26` `trend` "sadece sıralama, meter değil"; `styles.css:274` `.ship-bar` "**bir 'charge bar' değildir**".
- `ref-research.md` charge-fill/charge-bar dilini `plan.md`'den miras aldı; **bu planda onu kullanmıyoruz.**

**Kural:** iç sayfalar **flat / ttec-temiz** kalır. "Sepete Ekle" = mevcut `.add-overlay` + `.btn` (teal, düz). Ücretsiz-kargo göstergesi = mevcut düz `.ship-bar`. Yeni gradient/animasyon/gimmick **üretilmez**.

---

## 1. SAYFA ENVANTERİ

Kaynak: `codebase-audit.md §1` (header+footer'daki her link tek tek çıkarıldı). **Mevcut durum: yalnızca `index.html` var; 13 gerçek iç sayfa linki bağlı, 0'ı yapıldı.** Ayrıca 10 ölü `#` link var (account/login, 8 sosyal, ve 4'lü **Destek** kolonu — hiç sayfa tasarlanmamış).

| # | Dosya | Amaç | Tip | Öncelik | Durum |
|---|---|---|---|---|---|
| 1 | `kategori.html` | Kategori/listeleme (4 pillar, `#{slug}` hash) | ürün-akışı | **P1** | yok |
| 2 | `urun.html` | Ürün detay (`#{id}` hash) | ürün-akışı | **P1** | yok |
| 3 | `sepet.html` | Sepet tam görünüm | ürün-akışı | **P1** | yok |
| 4 | `odeme.html` | Checkout (çok adımlı, mock) | ürün-akışı | **P1** | yok |
| 5 | `hakkimizda.html` | Marka hikâyesi + statlar | kurumsal | **P2** | yok |
| 6 | `kurumsal-satis.html` | B2B talep funnel + form | kurumsal | **P2** | yok |
| 7 | `satis-noktalari.html` | Bayi/perakende logo duvarı (sekmeli) | kurumsal | **P2** | yok |
| 8 | `iletisim.html` | İletişim formu + kartlar + harita placeholder | destek | **P2** | yok |
| 9 | `ek-garanti.html` | Uzatılmış garanti **kayıt + sorgu** (`#sorgula`) | destek | **P2** | **yok — anasayfada 2× linkli** (`index.html:283–284`) |
| 10 | `kvkk.html` | KVKK | yasal | **P2** | yok |
| 11 | `aydinlatma.html` | Aydınlatma Metni | yasal | **P2** | yok |
| 12 | `mesafeli-satis.html` | Uzak Mesafeli Satış Sözleşmesi | yasal | **P2** | yok |
| 13 | `cerezler.html` | Çerez Politikası | yasal | **P2** | yok |
| 14 | `sss.html` | SSS / FAQ (accordion) | destek | **P3** | yok — footer Destek `#` |
| 15 | `siparis-takip.html` | Sipariş takip formu (e-posta + sipariş no) | destek | **P3** | yok — footer Destek `#` |
| 16 | `odeme-teslimat.html` | Ödeme & Teslimat bilgi sayfası | destek | **P3** | yok — footer Destek `#` |
| 17 | `iade-degisim.html` | İade & Değişim bilgi sayfası | destek | **P3** | yok — footer Destek `#` |
| 18 | `404.html` | Branded 404 (TTEC bad path'lerde hard-404 verir — `ref-research §2,§11`) | destek | **P3** | yok |

**Bu dosyada: 18 sayfa** (13 mevcut link + 4 Destek kolonu + 1 branded 404). Partial gerekmiyor (header/footer reuse).
**Tam akış süperset'i: +9 sayfa → toplam 27** (`tam-akis-onerisi.md §1`): Auth 5 (`giris`, `kayit`, `sifremi-unuttum`, `sifre-sifirla`, `e-posta-dogrula`) · Hesap 2 (`hesabim` tek-shell 6-section + `siparis-detay`) · `siparis-tamamlandi` · `arama`.

**Account/login (`#`):** ~~dışarıda~~ → **KİLİTLİ: kapsama girdi.** Full auth + hesap paneli (UI-only, localStorage). Mevcut account `#` placeholder (`header.html:45`) → `giris.html`. Checkout misafir akışı da korunur (hesap adımında "misafir devam"). Detay: `tam-akis-onerisi.md`.

---

## 2. HER SAYFA İÇİN SPEC + KULLANICI AKIŞI

> Her sayfa shared header + footer + cart drawer + cookie-bar ile gelir (`data-include` + 5 script, `codebase-audit §4`).
> "Mevcut comp" = `codebase-audit §2`'den hazır; "Yeni comp" = §3'te tanımlanacak.

### 2.1 `kategori.html` (P1)
**Amaç:** Bir pillar'ın ürünlerini filtre + sıralama ile listelemek.
**Sections (sıra):** breadcrumb → kategori başlık (ad + alt-başlık + 1 satır pillar copy) → toolbar (sonuç sayısı · sıralama `<select>` · grid/list toggle) → 2 kolon: **filtre sidebar** + **ürün grid** (2/3/5-up) → aktif-filtre chip'leri → pagination → "İlgili/Öne çıkanlar" carousel.
**User flow:** mega-menü pillar / kategori-çember / footer "Ürünler" / arama → grid'i tarar → sol sidebar'dan daraltır (her toggle grid + sayıyı günceller, chip ekler) → sıralar / list view'a geçer → karta hover'da 2. görsele geçiş (Spigen) → ya karttan hızlı "Sepete Ekle" (toast + badge) ya da PDP'ye tıklar.
**Edge/empty:** kategoride ürün yok → **"Bu kategoride ürün bulunamadı"** (TTEC verbatim) + pillar'lara dönüş CTA · filtre eşleşmesi yok → **"Eşleşen ürün bulunamadı" + "Filtreleri Temizle"** (Anker) · yükleniyor → skeleton kartlar · stok yok → kart CTA'sı "Tükendi".
**Mevcut comp:** `tgProductCard` + `.card.product-card`, `.add-overlay`, `.badge`, `.container-tg`, `.section`, carousel pattern. **Yeni comp:** breadcrumb, page-header, filtre sidebar, sort select, grid/list toggle, aktif-filtre chip, pagination, skeleton-card, empty-state (§3).
**Ref:** TTEC `/category/{id}` (yapı + empty copy) + Anker facet taksonomisi + Spigen kart durumları.
**Data:** `byCategory(slug)` + filtre/sort helper'ları; alt-kategori slug'ları; `location.hash` router (§4).

### 2.2 `urun.html` (P1)
**Amaç:** Tek ürünü ikna edici şekilde sunmak, sepete eklemek.
**Sections:** breadcrumb (alt-kategori dahil) → 2 kolon hero: **galeri** (ana + thumbnail rail + zoom) | **info** (başlık → **ürün kodu/SKU** → fiyat → **taksit satırı** statik → **stok durumu** "Bugün Kargoda" → varyant swatch (varsa) → qty stepper → **"Sepete Ekle"** → favori → **güven rozet satırı** kargo/garanti/SSL) → benefit/lifestyle şeridi (TTEC "Hayatın İçinden") → tabs (Açıklama / Özellikler / Yorumlar) → "İlgili Ürünler" carousel.
**User flow:** grid/arama/related/trend kart → galeriyi inceler → varyant + qty seçer → "Sepete Ekle" (toast + badge) → drawer → spec/yorum okur → checkout'a ya da yan ürüne gider.
**Edge/empty:** stok yok → CTA disabled "Tükendi" + "Stoğa gelince haber ver" · yorum yok → "Henüz yorum yok — ilk yorumu siz yazın" · tek varyant → swatch satırını gösterme · geçersiz id → `404.html`'e yönlendir.
**Mevcut comp:** `.btn`, `.icon-btn`, `.ratio-box`, `.price` ailesi, `.stars`, qty stepper (`.qty` — drawer'dan ortak çıkar), carousel. **Yeni comp:** breadcrumb, galeri (thumb-rail + zoom), varyant swatch, tabs→accordion, spec tablosu, benefit triad, güven-rozet satırı, sticky add-to-cart mini-bar (mobil) (§3).
**Ref:** TTEC `/detail/{id}` (SKU/taksit/stok/güven rozeti) + Anker/Spigen swatch + sticky bar.
**Data:** ürün detay alanları — `gallery[]`, `desc`, `specs[]`, `variants`, `sku`, `brand`, `related` (§4).

### 2.3 `sepet.html` (P1)
**Amaç:** Sepetin tam gözden geçirilmesi + checkout'a köprü.
**Sections:** breadcrumb → 2 kolon: satır-kalemleri (thumb · başlık · varyant · **qty stepper** · satır toplamı · kaldır ×) | **sipariş özeti** (ara toplam · kargo + düz `.ship-bar` ücretsiz-kargo göstergesi · kupon input · genel toplam · "Ödemeye Geç") → "Alışverişe Devam Et".
**User flow:** drawer "Sepete Git" / header badge / toast → adet ayarlar (canlı toplam) → kupon dener → "Ödemeye Geç" → checkout.
**Edge/empty:** boş sepet → **"Sepetiniz Boş" + "Sepetinizde henüz ürün bulunmamaktadır" + "Alışverişe Başla"** (TTEC verbatim, chrome yok) + opsiyonel "Trend Ürünler" şeridi · stokta olmayan kalem → "Tükendi" işaretle, checkout'u blokla · geçersiz kupon → input altı inline hata.
**Mevcut comp:** `$store.cart` (items/subtotal/remaining/shipPct/fmt — `main.js:58–88`), `.qty`, `.ship-bar`, drawer empty-state markup'ı referans. **Yeni comp:** breadcrumb, kupon alanı, sayfa-içi sepet-satırı layout, sipariş-özeti kartı (§3).
**Ref:** TTEC `/cart` empty-state (birincil gözlem).
**Data:** kupon + KDV + genel toplam modeli (`$store.cart` genişletme, §4).

### 2.4 `odeme.html` (P1)
**Amaç:** Mock checkout — adres → kargo → ödeme → onay.
**Sections:** adım göstergesi (**düz stepper**, Teslimat→Ödeme→Onay) → Alpine çok-adımlı paneller (reload yok): adres formu → kargo yöntemi → ödeme (mock kart) → **KVKK + Mesafeli Satış onay kutuları** → "Siparişi Tamamla" → **sticky sipariş özeti sidebar** → onay ekranı (sipariş no + özet + "Siparişi Takip Et").
**User flow:** sepet "Ödemeye Geç" → adres doldur → kargo seç → mock kart → **iki sözleşme onayı zorunlu** → tamamla → onay ekranı.
**Edge/empty:** girişte sepet boş → empty-cart ekranına yönlendir · alan validasyonu inline (blur+submit) · onay kutusu işaretsiz → "Devam etmek için sözleşmeleri onaylayın" · mock ödeme reddi → özet korunarak inline hata-retry · **misafir checkout** (zorunlu hesap yok).
**Mevcut comp:** `$store.cart`, `.btn`, form-field temelleri. **Yeni comp:** düz stepper, çok-adımlı Alpine wizard, adres/kart form grupları, consent component, sticky özet (§3).
**Ref:** `plan.md §3.5` + Anker/Belkin + TR yasal zorunluluk (canlı TTEC checkout gözlemlenemedi — `ref-research §4`).
**Data:** sipariş/adres modeli, kargo seçenekleri, KDV (§4).

### 2.5 `hakkimizda.html` (P2)
**Amaç:** Marka hikâyesi + güven statları.
**Sections:** page-header → marka hikâye prose (research §2 gerçek copy) → 4'lü stat blok → değerler 3-up → CTA band.
**User flow:** utility-bar/footer "Hakkımızda" → okur → CTA ile kategori/iletişime gider.
**Edge:** içerik ince kalırsa Lorem ekleme — gerçek stat yoksa az ama dürüst blok (CLAUDE.md).
**Mevcut comp:** `.section`, `.t-h1/.t-h2`, `.label`, `.card`, `.btn`. **Yeni comp:** stat-blok quartet, değer-triad, CTA band (§3).
**Ref:** TTEC `/static/hakkimizda` (omurga) — **TTEC statlarını asla kullanma**, TG'nin kendi verisi (client).
**Data:** statlar (client TBD) — `data-tbd` placeholder.

### 2.6 `kurumsal-satis.html` (P2)
**Amaç:** B2B kurumsal-hediye talep funnel'ı.
**Sections:** hero → 3 fayda bloğu (Marka Bilinirliği / Marka Elçileri / Kullanışlı Hediye) → özelleştirilebilir ürün showcase → **"Ürün Talep Formu"** (firma, yetkili, e-posta/telefon, **adet**, **logo upload PDF/AI/PSD/TIFF**, adres, not, KVKK consent) → "Talebi Gönder".
**User flow:** "Kurumsal Satış" (mevcut TG'de bozuk B2B→google.com linki buraya bağlanacak) → pitch okur → form doldurur → logo yükler → KVKK → gönderir → başarı mesajı.
**Edge:** yanlış dosya tipi → "Yalnızca PDF, AI, PSD, TIFF kabul edilir" · eksik alan/KVKK işaretsiz → inline blok · başarı → "Talebiniz alındı, ekibimiz sizinle iletişime geçecek".
**Mevcut comp:** `.section`, `.card`, `.btn`, `.label`. **Yeni comp:** fayda-triad, ürün-showcase, **file-upload form** + consent (§3).
**Ref:** TTEC `/static/kurumsal-satis` "Ürün Talep Formu". **Tek B2C + tek B2B sayfası** (CLAUDE.md) — ayrı microsite yok.
**Data:** form front-end only; backend §7 açık soru.

### 2.7 `satis-noktalari.html` (P2)
**Amaç:** Ürünlerin satıldığı perakende noktaları (logo duvarı).
**Sections:** page-header + intro → **sekmeler Türkiye / Yurtdışı** → logo grid (grayscale→hover renk, logo = retailer link) → opsiyonel harita placeholder.
**User flow:** footer "Satış Noktaları" → sekme seçer → logoları tarar → retailer'a çıkar.
**Edge:** sekmede bayi yok → "Bu bölgede henüz satış noktası eklenmedi — online satın alın" + CTA · **statik sayfaya boş ürün şeridi gömme** (TTEC hatası — `ref-research §6`).
**Mevcut comp:** tabs pattern (yeni), `.ratio-box`, `.container-tg`. **Yeni comp:** tabs, logo-wall grid, harita placeholder (§3).
**Ref:** TTEC `/static/satis-noktalari` tabbed logo wall — geolocator ÜRETME, kısıtlı tut.
**Data:** `dealers[]` mock (logo + ad + bölge + opsiyonel url) (§4). **Logo'lar telif-güvenli/temsili** — gerçek retailer logoları client onayı (§7).

### 2.8 `iletisim.html` (P2)
**Amaç:** İletişim formu + ofis bilgisi.
**Sections:** page-header → 2 kolon: form (Ad Soyad / E-posta / Telefon / Mesaj + KVKK) | iletişim kartları (adres/telefon/e-posta — `data-tbd`) + harita placeholder.
**User flow:** header/footer/anasayfa "İletişim Formu" (`index.html:297`) → form doldurur → KVKK → gönderir → başarı.
**Edge:** validasyon inline (e-posta format, zorunlu), KVKK işaretsiz submit bloklu · başarı "Mesajınız alındı…" · **sahte veri yok** (`0222 222 2222` vb. asla).
**Mevcut comp:** `.card`, `.btn`, `.data-tbd`. **Yeni comp:** form-field set, consent, contact-kart, harita placeholder (§3).
**Ref:** TTEC `/static/iletisim` (consumer form pattern).
**Data:** gerçek telefon/adres/e-posta client TBD (§7).

### 2.9 `ek-garanti.html` (P2) — **eksik, anasayfada linkli**
**Amaç:** Uzatılmış garanti kaydı + başvuru sorgulama.
**Sections:** page-header → **iki sekme/iki blok**: **Kayıt** (Ad, Soyad, E-posta, Telefon, **Ürün Seri No**, Satın Alınan Yer dropdown, Satın Alma Tarihi date, **Fatura Görseli upload**, KVKK + opsiyonel pazarlama consent, "Başvuruyu Tamamla") · **Sorgu** (`#sorgula` anchor — "Başvuru Sorgulama").
**User flow:** anasayfa garanti bloğu "Yeni Başvuru" → kayıt formu · "Başvuru Kontrol" → `#sorgula` sorgu formu.
**Edge:** yanlış dosya tipi inline · eksik/consent → blok · sorgu bulunamadı → mesaj + İletişim fallback.
**Mevcut comp:** warranty bloğu zaten anasayfada link veriyor (`index.html:283–284`); `.btn`, `.card`. **Yeni comp:** **file-upload form** (corporate ile paylaşılan), tabs/anchor blok, consent (§3).
**Ref:** TTEC `/static/ek-garanti/register` + `/check`.
**Data:** form front-end only; "Satın Alınan Yer" mock dropdown.

### 2.10 Yasal: `kvkk.html`, `aydinlatma.html`, `mesafeli-satis.html`, `cerezler.html` (P2)
**Amaç:** Yasal metinler (zorunlu, Lorem yasak).
**Sections (paylaşılan legal template):** page-header (başlık + **"Son güncelleme" tarihi** — TTEC'te yok, biz ekliyoruz) → opsiyonel sayfa-içi TOC/anchor → harfli ana bölümler (A–F) + numaralı alt bölümler + bullet listeler.
**User flow:** footer legal strip / form consent linkleri → metni okur.
**Edge:** **gerçek client metni gelene kadar açıkça işaretli placeholder** — Lorem ipsum yok. Çerezler + ilk-ziyaret cookie-bar (mevcut `tgCookie`) eşleşir.
**Mevcut comp:** `.section`, `.t-h2`, `.label`, cookie-bar (mevcut). **Yeni comp:** **legal-template layout**, opsiyonel TOC accordion (§3).
**Ref:** TTEC `/static/kvkk` harfli-bölüm yapısı.
**Data:** statik prose; client metni TBD (§7).

### 2.11 Destek: `sss.html`, `siparis-takip.html`, `odeme-teslimat.html`, `iade-degisim.html` (P3)
Footer "Destek" kolonu şu an 4 ölü `#` link (`codebase-audit §1`). Footer'ı 4 ölü linkle yayınlamamak için bunları yapmayı öneriyorum (öncelik P3).
- **`sss.html`** — opsiyonel arama + konu tile'ları (Kargo & Teslimat / İade & Değişim / Garanti / Sipariş / Ürün Kullanımı) + her konuda accordion Q&A + "bulamadınız mı? İletişim" fallback. Comp: accordion (mevcut `@alpinejs/collapse` yüklü), tile grid. Empty/arama sonuç yok → İletişim fallback.
- **`siparis-takip.html`** — merkezî minimal form: **E-posta + Sipariş No → "Sorgula"** (telefon yok) + altında destek linki. Sonuç: bulundu → durum; bulunamadı → mesaj + İletişim. Mock.
- **`odeme-teslimat.html`** / **`iade-degisim.html`** — legal-template'in **bilgi varyantı** (prose + bullet, harfsiz). Ödeme yöntemleri, kargo süresi, ücretsiz-kargo eşiği (TG placeholder), hasarlı paket prosedürü / iade koşulları.
**Ref:** TTEC footer "Destek" flat task-page'leri + Belkin destek hub (SSS için).

### 2.12 `404.html` (P3)
**Amaç:** Branded 404 (TTEC bad path → hard 404).
**Sections:** kısa mesaj + arama kutusu + pillar linkleri + "Anasayfaya dön". Comp: page-header + `.btn`. Pages subpath'te 404 davranışı (GitHub Pages `404.html` root'ta otomatik) — §7 not.

---

## 3. ORTAK COMPONENT İHTİYAÇLARI

> **Anasayfadan yeniden kullanılacaklar** (READ-ONLY, fork etme): `tgProductCard` + `.card.product-card` ailesi, `.add-overlay`, `.badge/.fav/.stars`, `.btn` (+6 varyant), `.icon-btn/.tap`, `.container-tg`, `.section/.bg-soft`, `.ratio-box`(+ratios), `.t-h1/.t-h2/.label/.price`, `.qty` stepper, `.ship-bar`, header/footer/drawer/cookie-bar, `$store.{cart,ui,lang}`, `catName/byTrend`. (`codebase-audit §2`)

**Yeni paylaşılan component'ler** (Faz 0'da koordineli eklenir — §5/§6):

| Component | Nerede tanımlanır | Notlar |
|---|---|---|
| Breadcrumb | `styles.css` `.breadcrumb` + her sayfada inline markup | `Ana Sayfa > Pillar > Alt/Ürün`; ana sayfa hariç her iç sayfada |
| Page-header (sade) | `styles.css` `.page-header` | hero değil; başlık + alt-başlık + opsiyonel breadcrumb. **Mevcut `.hero` reuse edilmez** (`codebase-audit §2 gap`) |
| Filtre sidebar | `styles.css` `.filter-*` + Alpine `tgCatalog()` (`main.js` ext) | checkbox grup, renk swatch, fiyat slider, mobilde bottom-sheet |
| Sort `<select>` + grid/list toggle | `styles.css` `.toolbar` | |
| Aktif-filtre chip | `styles.css` `.chip` | kaldırılabilir + "Filtreleri Temizle" |
| Pagination | `styles.css` `.pager` | statik prototip için görünür sayfalama |
| Skeleton-card | `styles.css` `.skeleton` | grid boş flash etmesin |
| Empty-state | `styles.css` `.empty-state` | tek copy standardı: kategori/sepet/arama/bayi |
| Tabs | `styles.css` `.tabs` + Alpine | satış-noktaları, ürün-detay, ek-garanti |
| Accordion | mevcut `@alpinejs/collapse` + `.accordion` css | SSS, legal TOC, mobil filtre |
| Galeri | `styles.css` `.gallery` + Alpine `tgGallery()` | thumb-rail + zoom |
| Varyant swatch | `styles.css` `.swatch` | tek varyantta gizlen |
| Spec tablosu | `styles.css` `.spec-table` | |
| Güven-rozet satırı | `styles.css` `.trust-row` | kargo/garanti/SSL — PDP CTA altı |
| Form-field set | `styles.css` `.field/.field--error` | input/select/textarea + inline hata |
| **Consent component** | `styles.css` `.consent` + reuse | KVKK/mesafeli — §9 sayfalarına link. İletişim/kurumsal/garanti/checkout'ta ortak |
| **File-upload field** | `styles.css` `.file-upload` | kurumsal logo + garanti fatura; tip-kısıtlı |
| Stat-blok / fayda-triad | `styles.css` `.stat/.feature-triad` | hakkımızda/kurumsal |
| Logo-wall | `styles.css` `.logo-wall` | satış-noktaları |
| Contact-kart + harita placeholder | `styles.css` `.contact-card/.map-ph` | iletişim |
| Çok-adımlı checkout wizard | Alpine `tgCheckout()` (`main.js` ext) | düz stepper, panel geçişi |
| Sticky sipariş özeti | `styles.css` `.order-summary` | sepet + checkout |
| Düz stepper | `styles.css` `.stepper` | checkout (battery DEĞİL) |
| Legal-template layout | `styles.css` `.legal` | 4 yasal + 2 destek-bilgi sayfası |
| Toast (sepete eklendi) | `styles.css` `.toast` + `$store.ui` ext | quick-add geri bildirimi |

**Foundation çakışma notu:** Bu CSS class'ları + `data.js`/`main.js` helper'ları foundation dosyalarına dokunur (READ-ONLY). Çözüm: **Faz 0 — tek-yazar foundation genişletme** (§6). Teammate'ler dondurulmuş foundation'a karşı çalışır.

---

## 4. DATA MİMARİSİ (`assets/js/data.js` + `main.js` genişletme)

Mevcut (`codebase-audit §3`): `window.TG.categories[{slug,name,tag,sub[],photo}]` (4), `window.TG.products[{id,name,cat,price,old,rating,reviews,badge,trend,stock,photo}]` (12), `catName/byTrend`, `$store.cart{items,add/remove/setQty,count/subtotal/remaining/shipPct,fmt, freeShip:750}`. **Boşluklar** (`codebase-audit §3 son`): detay alanları, alt-slug, byCategory/filter/sort, hash-router, checkout modeli, yorum listesi, bayi/SSS verisi.

**Genişletmeler (örnek mock shape):**

```js
// categories: alt-kategori slug'ları (filtrelenebilir kategori için)
{ slug:"ses", name:"Ses", tag:"Audio", photo:"...",
  sub:[ {slug:"kulaklik", name:"Kulaklık"}, {slug:"hoparlor", name:"Hoparlör"} ] } // string[] → obje[]

// products: detay alanları
{ id:"p1", name:"...", cat:"ses", subSlug:"kulaklik",   // ← yeni: alt-kategori FK
  price:1299.9, old:1599.9, rating:4.7, reviews:128, badge:"İndirim", trend:88, stock:true,
  sku:"TG-AUD-01", brand:"TUGG",                         // ← yeni
  photo:"assets/img/products/p1.jpg",
  gallery:["...p1.jpg","...p1-2.jpg","...p1-3.jpg"],     // ← yeni (galeri)
  desc:"<p>...</p>", specs:[{k:"Bağlantı",v:"Bluetooth 5.3"}],  // ← yeni
  variants:{ renk:[{name:"Siyah",hex:"#1c2422"},{name:"Beyaz",hex:"#fff"}] }, // opsiyonel
  facets:{ guc:"100W", port:"USB-C", uyumluluk:"telefon" },     // filtre için
  related:["p3","p5","p8"] }                              // ← yeni

// helpers (data.js)
byCategory(slug)            // cat===slug ürünler
filterProducts(slug, f)     // facet/fiyat/renk filtreleme
sortProducts(list, key)     // recommended | price-asc | price-desc | new
getProduct(id)              // urun.html için
parseHash()                 // location.hash → {slug|id} (paylaşılan router util)

// dealers (satis-noktalari)
window.TG.dealers = { tr:[{name:"...",logo:"...",url:"#"}], global:[...] }
// faq (sss)
window.TG.faq = [{ topic:"Kargo & Teslimat", items:[{q:"...",a:"..."}] }]

// $store.cart genişletme (main.js): kupon + KDV + genel toplam
coupon, applyCoupon(code), discount, kdv (getter), grandTotal (getter)
// order model (odeme): { address{}, shipping, payment(mock), items, totals }
```

**Token uyumsuzluğu** (`codebase-audit §4`): CSS `:root` vars ↔ `tw-config.js` değerleri sapıyor (`ink #1c2422` vs `#14201f` vb.). **Faz 0'da hizala** + `.btn--amber` tanımsız → tanımla (veya kullanımdan kaldır). Karar §7.

---

## 5. DOSYA MİMARİSİ

**Yeni `.html` (18, repo kökü, relative path):** `kategori, urun, sepet, odeme, hakkimizda, kurumsal-satis, satis-noktalari, iletisim, ek-garanti, kvkk, aydinlatma, mesafeli-satis, cerezler, sss, siparis-takip, odeme-teslimat, iade-degisim, 404` `.html`.
Her sayfa `<head>` + `data-include` + 5 script bloğu `index.html`'i birebir mirror eder (`codebase-audit §4`).

**Yeni partial:** **yok** — header/footer reuse. (Breadcrumb/page-header partial DEĞİL; sayfa-içi inline + paylaşılan CSS — küçük ve sayfaya-özel değişken içeriyor.)

**Yeni JS dosyası:** tercihen **yok** — yeni helper'lar mevcut `data.js`/`main.js`'e Faz 0'da eklenir (tek namespace `window.TG` + `tg*` factory konvansiyonu korunur). Büyürse `assets/js/catalog.js` ayrı dosya opsiyonel (yalnızca gerekirse).

**Foundation (Faz 0 sonrası DONUK / READ-ONLY):** `styles.css`, `tw-config.js`, `include.js`, `data.js`, `main.js`, `partials/header.html`, `partials/footer.html`. Ortak component zorunluysa **yalnızca Faz 0'da, tek-yazar tarafından** eklenir; sonra dondurulur.

---

## 6. IMPLEMENT TEAM KURGUSU (sonraki faz — henüz kurma)

> **GÜNCEL (KİLİTLİ):** Tam akış kapsamıyla **3 → 4 UI teammate** (yeni **auth-account**) ve Faz 0 genişler. Tam tablo `tam-akis-onerisi.md §5`'te; aşağısı iç-sayfa temeli + auth-account eklentisidir.

**Önerilen: lead (delegate) + Faz 0 tek-yazar + 4 UI teammate.** Mantık: foundation çakışmasını sıfırlamak için önce paylaşılan zemini tek elden kur, sonra sayfaları çakışmasız 4 domain'e böl.

### Faz 0 — Foundation genişletme (tek-yazar, lead veya 1 teammate)
- **Owns (yazar):** `styles.css`, `tw-config.js`, `data.js`, `main.js`, **`partials/header.html`** — §3 component CSS'leri + §4 data/helper'lar + token hizalama + `.btn--amber` + toast/consent/file-upload/wizard.
- **Tam akış eklentisi:** `$store.auth` + `$store.wishlist`, `tg_orders/addresses/warranties/reviews/returns/recent` yardımcıları, **SEED-DEFAULT util**, order üretimi, `requireAuth(next)` guard, kupon `TG10`; **header'ın oturum açık/kapalı iki hali + hesap dropdown + favori ikonu** (`partials/header.html` — kritik foundation değişikliği); auth **SPLIT-layout** CSS + account-shell/sol-nav + sipariş-durum adımları + favori-kalp aktif.
- **Bağımlılık:** yok — ilk biter, sonra **DONAR**.
- **Çıktı:** dondurulmuş foundation + kısa "yeni class/helper/store" referans notu (teammate'ler buna karşı çalışır).
- **Neden tek-yazar:** 4 teammate aynı foundation dosyalarına yazarsa çakışır; bu fazı seri yapmak çakışmayı eler.

### Sonra paralel (foundation donduktan sonra):
**teammate "shop"** — ürün akışı (en yüksek complexity, paylaşılan cart/filter mantığı bir elde dursun)
- **Owns:** `kategori.html`, `urun.html`, `sepet.html`, `odeme.html`, **`arama.html`**, **`siparis-tamamlandi.html`**
- **Read-only:** tüm foundation + diğer teammate sayfaları
- **Bağımlılık:** Faz 0 (catalog/cart/order/wishlist/recent/kupon + auth gate)
- **Görev:** filtre/sort/pagination, PDP galeri/tabs/varyant + **♡favori + yorum yazma + stok bildirimi + son gezilen**, arama sonuç, **checkout wizard (hesap adımı dahil)** + onay, kupon `TG10`, tüm empty/edge state'ler. odeme → `tg_orders`.

**teammate "auth-account"** — kimlik + hesap paneli (state-yoğun; KİLİTLİ tam-akış eklentisi)
- **Owns:** `giris.html`, `kayit.html`, `sifremi-unuttum.html`, `sifre-sifirla.html`, `e-posta-dogrula.html`, `hesabim.html` (6 section), `siparis-detay.html`
- **Read-only:** foundation + diğer sayfalar
- **Bağımlılık:** Faz 0 ($store.auth/wishlist, seed util, guard, header iki hali)
- **Görev:** auth **SPLIT** ekranları (sosyal→anında mock giriş, e-posta/telefon tab, beni hatırla, şifremi unuttum) + state; hesap shell + 6 section + boş-state'ler + **SEED-DEFAULT + Verileri Sıfırla**; sipariş-detay (+ **İade Oluştur** → `tg_returns`); korumalı `?next=` yönlendirme.

**teammate "kurumsal"** — kurumsal + iletişim (form + statik ağırlık)
- **Owns:** `hakkimizda.html`, `kurumsal-satis.html`, `satis-noktalari.html`, `iletisim.html`
- **Read-only:** foundation + diğer sayfalar
- **Bağımlılık:** Faz 0 (form/consent/file-upload/logo-wall/stat)
- **Görev:** stat/triad/CTA, file-upload formlar, sekmeli logo-wall, contact form+kart.

**teammate "destek-yasal"** — destek + yasal + garanti + 404 (template-yoğun)
- **Owns:** `ek-garanti.html`, `kvkk.html`, `aydinlatma.html`, `mesafeli-satis.html`, `cerezler.html`, `sss.html`, `siparis-takip.html`, `odeme-teslimat.html`, `iade-degisim.html`, `404.html`
- **Read-only:** foundation + diğer sayfalar
- **Bağımlılık:** Faz 0 (legal-template, accordion, file-upload, form)
- **Görev:** paylaşılan legal-template + 4 yasal + 2 bilgi sayfası, ek-garanti kayıt/sorgu, SSS accordion, sipariş-takip form, 404.

> Her UI teammate **frontend-design skill**'i KALİTE lensi olarak kullanır (replica disiplini: ttec-temiz/flat; vibe/signature/gradient ÜRETMEZ).

**QA PROTOKOLÜ (her teammate):** Playwright ile 3 breakpoint (1440/768/390) screenshot'ı **kendi değerlendirmesi için** alır (`docs/screenshots/capture-build.mjs` yerel sayfalara yöneltilmiş), kendi eval'ini yapar (hizalama, hiyerarşi, hover, empty-state, console hatası 0, CLS), gerekiyorsa düzeltir. **Screenshot Beyar'a sunulmaz** — `docs/screenshots` altında durur; Beyar isterse açar. HTTP üzerinden test (`python3 -m http.server 8099`), `file://` değil.

**DENETİM PROTOKOLÜ (implement lead):** teammate "bitti" deyince **oto-kabul yok** — (1) kendi eval kanıtını ister, (2) kabul kriterine bakar (replica disiplini + empty/edge state'ler + relative path + foundation'a yazılmadı + 0 console hatası + 3 breakpoint sağlam), (3) diff'i okur (foundation dokunulmamış mı, sahte veri var mı). ~10 dk'da bir periyodik durum kontrolü. Yüzeysel/eksikse revize ettirir.

### Akış: Faz 0 (seri) → 4 teammate (paralel) → lead cross-page QA + entegrasyon.

---

## 7. KARARLAR (eski "açık sorular" — KİLİTLENDİ)

> Tümü Beyar + CC/mimar mutabakatıyla kilitlendi. Tam-akış mikro-kararları için `tam-akis-onerisi.md §7`.

| # | Konu | KİLİTLİ KARAR |
|---|---|---|
| 1 | Gerçek ürün fotoğrafı | Şimdilik telif-güvenli stok (`p1..p12`) + 1 gerçek; Yasin Bey gerçek foto verince değişir (açık-uçlu asset, kapsam değil) |
| 2 | Form backend + reCAPTCHA | **Mock** (`@submit.prevent` + başarı state) + **reCAPTCHA placeholder** |
| 3 | Gerçek telefon/adres/e-posta/sosyal | `data-tbd` placeholder — sahte veri yok |
| 4 | Ödeme | **Mock** (PSP yok, kart formu görsel) |
| 5 | Hesap/login | **VAR — KİLİTLİ** (full auth + hesap, UI-only, localStorage). Account `#` → `giris.html` |
| 6 | Destek kolonu (4 sayfa) | **Hepsi yapılır** (sss + sipariş-takip + ödeme-teslimat + iade-değişim) |
| 7 | ek-garanti kapsam | **Tam kayıt + sorgu** (`#sorgula`); girişliyse `tg_warranties`'e yazar |
| 8 | Ücretsiz-kargo eşiği | **750 ₺** (`freeShip:750`) |
| 9 | KDV | **Fiyata dahil** ("Fiyatlara KDV dahildir") — özet ayrı KDV satırı yok |
| 10 | Satış-noktaları logoları | **Temsili placeholder** (gerçek marka logosu yok) |
| 11 | Harita | **Statik placeholder** |
| 12 | DE i18n | **Skeleton** (switcher + header/cart/arama); iç gövde TR sabit |

**Foundation/teknik varsayımlar (Faz 0'da çözülecek, Beyar'a değil):**
- Token uyumsuzluğu (CSS vars ↔ `tw-config.js`) hizalanacak; `.btn--amber` tanımlanacak; dead `.search-pill` CSS bırakılabilir (zararsız) — Faz 0 kararı.
- `location.hash` router util `data.js`'e eklenir (her sayfa kendi parse etmesin).
- 404: GitHub Pages root `404.html`'i otomatik servis eder; subpath altında çalışır.
- Tüm yeni görsel telif-güvenli stok (Unsplash/Pexels) + mevcut TG asset; referanstan/markadan görsel kopyalanmaz.

---

## Özet

Header+footer link envanterinden **18 iç sayfa** çıkıyor: 4 ürün-akışı (kategori/ürün/sepet/ödeme), 4 kurumsal (hakkımızda/kurumsal-satış/satış-noktaları/iletişim), 4 yasal (kvkk/aydınlatma/mesafeli-satış/çerezler), 4 destek (sss/sipariş-takip/ödeme-teslimat/iade-değişim), artı eksik `ek-garanti.html` ve branded `404.html`. **Tam-akış kararıyla buna +9 sayfa eklendi (auth 5 + hesap 2 + sipariş-tamamlandı + arama) → toplam 27 sayfa** (`tam-akis-onerisi.md`). Şu an yalnızca `index.html` var; `ek-garanti.html` anasayfada linkli ama yok, footer "Destek" kolonunun 4'ü ölü `#`. İç sayfalar **flat/ttec-temiz** kalır — `plan.md`'deki şarj/charge signature kaldırıldı, mevcut `tgProductCard`/`.add-overlay`/düz `.ship-bar` reuse edilir; auth **SPLIT layout**, hesap **SEED-DEFAULT** ile dolu açılır. **Implement kurgusu: lead (delegate) + Faz 0 tek-yazar foundation genişletme (seri, sonra donar — `$store.auth`/`$store.wishlist` + seed util + header iki hali dahil) + 4 UI teammate** — **shop** (ürün akışı + arama + onay), **auth-account** (kimlik + hesap), **kurumsal** (kurumsal+iletişim), **destek-yasal** (yasal+destek+garanti+404) — her biri kendi `.html` dosyalarını yazar, foundation'a yazmaz, paylaşılan veriyi foundation store'larında konuşur, frontend-design'ı kalite lensi olarak kullanır, kendi 3-breakpoint Playwright QA'sını yapar; implement lead oto-kabul etmez, ~10 dk denetim + kabul kriteri + diff kontrolü uygular.
