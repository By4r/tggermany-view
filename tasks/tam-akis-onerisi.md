# TG Germany — Tam Production E-Ticaret Akışı (UI-only) · KİLİTLİ PLAN

> **PLAN mutabakatı — kararlar kilitli.** Implement yok, kod yok, commit yok.
> Mevcut 18 sayfalık planı (`tasks/ic-sayfalar-plan.md`) "production'da kullanıcının dokunduğu her şey view'de test edilebilir" hedefine genişletir → **toplam 27 sayfa**.
> Backend YOK — **localStorage ile state-dolu, uçtan uca tıklanabilir** mock. Auth/PSP/e-posta gerçek değil; davranış simüle edilir.
> Auth ekran-düzeni referansı: `dadamutfak/giris-v1` — **yalnızca alan/layout pattern**. Marka/renk/görsel **TG Germany (ttec-temiz/flat)**; DadaMutfak'tan hiçbir şey kopyalanmaz.
> Tarih: 2026-06-16 · Sahip: Gavia Works · Kararlar: CC + Claude.ai mimar mutabakatı (Beyar devretti)

---

## Kilitli kararlar (bu plan bunlara göre)
**Beyar kararları:** Login/kayıt/hesap VAR (UI-only, localStorage) · checkout tam çok-adımlı + onay + sipariş detay (mock) · formlar mock (`@submit.prevent` + başarı) + reCAPTCHA placeholder · telefon/adres/sosyal `data-tbd` · kargo eşiği **750₺** · **KDV fiyata dahil** ("Fiyatlara KDV dahildir") · bayi logoları temsili placeholder · harita statik placeholder · DE skeleton (switcher + header/cart/arama), iç gövde TR sabit · Destek 4 sayfa.

**§7'nin 7 mikro-kararı (CC + mimar, KİLİTLİ):**
1. Hesap = **tek shell + hash-section** (6 section: özet/siparişler/adresler/favoriler/garanti/profil).
2. **e-posta-doğrula EKLE** (ince mock ara-ekran).
3. Auth = **SPLIT layout** (sol form · sağ TG marka görseli, flat/AA scrim; mobil tek-kolon stack).
4. **§6 opsiyonellerin HEPSİ dahil** (yorum yazma · iade talebi · son gezilen · stok bildirimi · bülten onay · kupon `TG10`). İSTİSNA: hesap "kuponlarım"/"yorumlarım" section **YOK** — hesap 6 section.
5. Sosyal login = **tık → anında mock giriş**.
6. Sipariş = **SEED-DEFAULT** (boş+girişli → 1–2 sipariş + 1–2 adres + birkaç favori, **demo-işaretli**; "Verileri Sıfırla" → boş-state; gerçek checkout ekler; misafire seed yok).
7. **arama.html = ayrı sayfa** (`?q=`).

---

## 1. EK SAYFA / EKRAN ENVANTERİ (mevcut 18'e ek → +9)

> Yeni `.html` repo kökünde, relative path, `index.html`'i mirror eden `<head>`+`data-include`+5 script. Hesap = tek shell + hash-section (mevcut `#slug` router'la uyumlu); sipariş-detay/onay/arama ayrı URL.

### AUTH (5)
| Dosya | Amaç | Tip | Öncelik |
|---|---|---|---|
| `giris.html` | Giriş — **SPLIT**: sol form (sosyal Google/FB → anında mock giriş · e-posta/telefon tab · şifre · beni hatırla · şifremi unuttum) · sağ TG marka görseli (flat) | auth | **P1** |
| `kayit.html` | Kayıt: ad/soyad/e-posta/telefon/şifre + KVKK & üyelik onay + (ops.) pazarlama izni; aynı split düzen | auth | **P1** |
| `sifremi-unuttum.html` | Kayıtlı e-posta iste → "sıfırlama bağlantısı gönderildi" state (mock) | auth | **P1** |
| `sifre-sifirla.html` | Yeni şifre + tekrar (`?t=mock`) → başarı → girişe | auth | **P1** |
| `e-posta-dogrula.html` | Kayıt sonrası doğrulama ara-ekranı: mock "Doğrula" → doğrulandı · "tekrar gönder" | auth | **P1** (KİLİTLİ — ince ekran) |

### HESAP PANELİ (2 dosya — shell + detay)
| Dosya | Amaç | Tip | Öncelik |
|---|---|---|---|
| `hesabim.html` | **Account shell** + sol nav; hash-section: `#ozet` `#siparisler` `#adresler` `#favoriler` `#garanti` `#profil`. Çıkış = aksiyon. **6 section (kuponlarım/yorumlarım YOK)** | hesap | **P1** |
| `siparis-detay.html` | Tek sipariş (`?id=`) — kalemler, durum adımları, adres, özet, fatura (mock), **İade Oluştur** girişi. Hesap + onay + takip buradan açar | hesap | **P1** |

> **hesabim.html section'ları (her biri boş-state'i ile):** `#ozet` (selamlama + son sipariş + adres/favori sayıları + demo-veri notu) · `#siparisler` (liste → detay) · `#adresler` (CRUD kartları) · `#favoriler` (wishlist grid) · `#garanti` (ek-garanti kayıtlarım) · `#profil` (bilgi düzenle + şifre değiştir + KVKK veri talebi/hesap sil mock + **Verileri Sıfırla**).

### CHECKOUT TAMAMLAMA (1)
| Dosya | Amaç | Tip | Öncelik |
|---|---|---|---|
| `siparis-tamamlandi.html` | Teşekkür/onay (`?id=`): sipariş no, özet, "Siparişi Takip Et" + "Siparişlerim" + "Alışverişe Devam" | ürün-akışı | **P1** |

> `odeme.html` (mevcut planda var) **genişler:** ilk adım = **Hesap adımı** (giriş yap / misafir devam / kayıt ol); girişliyse atlanır, kayıtlı adres seçilir.

### KEŞİF / ARAMA (1)
| Dosya | Amaç | Tip | Öncelik |
|---|---|---|---|
| `arama.html` | Arama sonuç (`?q=`) — header arama `submitSearch` hedefi. Sonuç grid + "sonuç yok" state + öneri | ürün-akışı | **P2** |

**EK SAYFA TOPLAMI: 9** → **Genel toplam: 18 + 9 = 27 sayfa.**

### Sayfa-olmayan ama eksiksiz UX için zorunlu STATE/ETKİLEŞİMLER (mevcut sayfalara eklenir — hepsi KİLİTLİ)
- **Favori (kalp) toggle** — kart (`tgProductCard`) + PDP; `$store.wishlist` site-geneli senkron + header rozet. Misafir de favleyebilir.
- **Header oturum-açık/kapalı iki hali** (§4) — `partials/header.html` Faz 0'da güncellenir.
- **Toast seti** — sepete/favoriye eklendi, adres kaydedildi, profil güncellendi, giriş/çıkış, form gönderildi, kupon geçerli/geçersiz, stok-bildirim aboneliği, bülten aboneliği.
- **Korumalı sayfa** — `hesabim`/`siparis-detay` çıkışken → `giris.html?next=...` → giriş sonrası geri döner.
- **PDP stok bildirimi** — out-of-stock "Stoğa gelince haber ver" → onay toast.
- **PDP yorum yazma** — girişliyken form → `tg_reviews` → PDP'de görünür.
- **Sipariş-detay iade talebi** — "İade Oluştur" → sebep → `tg_returns` → "iadeniz alındı".
- **Son gezilen ürünler** — `tg_recent`, PDP + anasayfa şeridi.
- **Bülten onayı** — footer newsletter → "abone olundu" toast.
- **Kupon `TG10`** — sepet/checkout'ta mock indirim kodu.

---

## 2. KULLANICI AKIŞ HARİTASI (uçtan uca)

```
                         ┌─────────────────────────────────────────────────────────┐
                         │                     ANASAYFA (index)                      │
                         │  header KAPALI: [Giriş Yap] | sepet(badge) | favori(badge)│
                         └───────────────┬─────────────────────────┬────────────────┘
                                         │ gez                      │ ara
                         ┌───────────────▼──────────┐      ┌────────▼─────────┐
                         │ kategori.html (#slug)     │      │ arama.html (?q=) │
                         │  filtre·sırala·grid       │      │  sonuç / boş     │
                         └───────────────┬──────────┘      └────────┬─────────┘
                                         │ ürün tıkla                │
                                ┌────────▼─────────────────────────▼────────┐
                                │            urun.html (#id)                 │
                                │ galeri·varyant·qty· ♡fav ·yorum·SepeteEkle │
                                │ (stok yok → "haber ver")  → tg_recent      │
                                └───────┬───────────────────────┬───────────┘
                              ♡ favori  │                       │ Sepete Ekle → toast
                          ┌─────────────▼──────┐        ┌────────▼────────┐
                          │ $store.wishlist     │        │ $store.cart      │──► cart drawer (quick)
                          │ (tg_wishlist)       │        │ (tg_cart)        │
                          └─────────────────────┘        └────────┬────────┘
                                                                  │ Sepete Git
                                                        ┌─────────▼─────────┐
                                                        │   sepet.html      │ kupon TG10
                                                        │ qty·kupon·özet    │ boş → "Sepetiniz Boş"
                                                        │ (Fiyatlara KDV dahil)│
                                                        └─────────┬─────────┘
                                                                  │ Ödemeye Geç
                                ┌─────────────────────────────────▼──────────────────────────┐
                                │                       odeme.html (wizard)                   │
                                │  [1 HESAP] giriş / misafir / kayıt ──┐                       │
                                │  [2 Adres] kayıtlı seç / yeni        │                       │
                                │  [3 Kargo] yöntem                    │  sticky özet sidebar  │
                                │  [4 Ödeme] mock kart + reCAPTCHA ph. │                       │
                                │  [5 Onay ] KVKK + Mesafeli Satış ✔  ─┘                       │
                                └─────────────────────────────────┬────────────────────────────┘
                                            Siparişi Tamamla       │ → tg_orders'a yaz, sepeti boşalt
                                                        ┌──────────▼───────────┐
                                                        │ siparis-tamamlandi   │ sipariş no + özet
                                                        │   (?id=)             │
                                                        └─────┬──────────┬─────┘
                                       Siparişi Takip Et      │          │ Siparişlerim
                                              ┌───────────────▼┐    ┌────▼──────────────────────┐
                                              │ siparis-takip  │    │ siparis-detay (?id=)       │
                                              │ misafir/girişli│    │ durum·kalem·İade Oluştur   │
                                              └────────────────┘    └────────────────────────────┘

   AUTH BRANŞI (SPLIT layout; "Giriş Yap" / korumalı aksiyon):
   giris.html ─(sosyal→anında mock | e-posta/telefon+şifre | beni hatırla)─► tg_auth=on, tg_user set ─► next/hesabim
       │ "Hesabın yok mu?" → kayit → e-posta-dogrula(mock) → tg_users'a yaz → girişli
       │ "Şifremi unuttum" → sifremi-unuttum → "gönderildi" → sifre-sifirla(?t=) → girişe
       ▼
   HESAP (girişli, ilk açılışta SEED-DEFAULT dolu):
       hesabim.html  #ozet · #siparisler · #adresler · #favoriler · #garanti · #profil · [Çıkış]
       (çıkışken hesabim → giris.html?next=hesabim.html)   ·   #profil → "Verileri Sıfırla" → boş-state
   header AÇIK: [Merhaba {ad} ▾  Hesabım·Siparişlerim·Adreslerim·Favorilerim·Çıkış] | sepet | favori
```

---

## 3. STATE / MOCK YAKLAŞIMI (localStorage şeması)

> Mevcut (korunur): `tg_lang`, `tg_cart`, `tg_cookie`. Yeni store'lar **Faz 0'da** `main.js`'e eklenir (`tg*`/`$store` konvansiyonu, tek namespace `window.TG`). Mock — plaintext, yalnızca prototip.

| Key | Şekil (örnek) | Yazan / Okuyan |
|---|---|---|
| `tg_auth` | `{ loggedIn:true, token:"mock-xyz", email, remember:true }` | giris/kayit; header + korumalı sayfalar |
| `tg_user` | `{ ad, soyad, email, telefon, verified:true, marketingOptIn:false }` | kayit/profil; account |
| `tg_users` | `[{ ad, soyad, email, telefon, password, verified }]` | kayit push; giris doğrular (mock) |
| `tg_orders` | `[{ id:"TG-240616-001", date, items[], totals:{ara,kargo,indirim,genel}, address, shipping, status }]` | odeme yazar; account/detay/takip |
| `tg_addresses` | `[{ id, baslik, ad, soyad, telefon, il, ilce, adres, varsayilan }]` | hesabim-adresler + checkout |
| `tg_wishlist` | `["p1","p5","p9"]` | ♡ toggle; account-favoriler + header rozet |
| `tg_warranties` | `[{ id, urunSeriNo, satinAlinanYer, tarih, faturaAdi, durum }]` | ek-garanti; account-garanti |
| `tg_reviews` | `[{ productId, ad, puan, yorum, tarih }]` | PDP yorum-yaz; PDP |
| `tg_returns` | `[{ orderId, items, sebep, durum }]` | siparis-detay İade Oluştur |
| `tg_recent` | `["p3","p7"]` son gezilen | PDP yazar; PDP/anasayfa şeridi |
| `tg_seed` | `{ seeded:true }` | seed util — bir kez seed işareti |

**Mock davranış kuralları:**
- **Kayıt:** `tg_users`'a ekler → `e-posta-dogrula` (mock "Doğrula") → `tg_auth` set. E-posta kayıtlıysa "bu e-posta zaten kayıtlı" hatası.
- **Giriş:** `tg_users` içinde e-posta+şifre eşleşmesi; yoksa "e-posta veya şifre hatalı". **Sosyal → anında mock kullanıcı oluşturur/girer** (UI-only). "Beni hatırla" → `tg_auth.remember` (flag görsel; localStorage zaten kalıcı).
- **Şifremi unuttum:** gerçek e-posta yok → her zaman "bağlantı gönderildi"; `sifre-sifirla.html?t=mock` doğrudan açılır.
- **SEED-DEFAULT:** kullanıcı **girişli + `tg_seed` yokken** açılışta seed util çalışır → `tg_orders`'a 1–2 **demo sipariş** (`id:"TG-DEMO-001"`, `status:"Teslim Edildi"/"Kargoda"`), `tg_addresses`'e 1–2 adres, `tg_wishlist`'e birkaç ürün id ekler; `tg_seed.seeded=true`. **Misafire seed yok.** `#profil` → **"Verileri Sıfırla"** → seed/sipariş/adres/favori temizler → boş-state test edilir. Demo veriler hesapta kapatılabilir **"Demo verisi"** notuyla işaretli; gerçek checkout siparişi (`TG-YYMMDD-NNN`) üstüne eklenir, karışmaz.
- **Sipariş no:** istemci üretir (`TG-YYMMDD-NNN`, sayaç+runtime tarih); durum statik mock (Hazırlanıyor→Kargoda→Teslim — görsel adımlar).
- **Misafir checkout:** `tg_auth` yokken sipariş yine `tg_orders`'a (e-posta ile) yazılır; sipariş-takip e-posta+no ile bulur.
- **Çıkış:** `tg_auth` temizlenir; `tg_cart`/`tg_wishlist` kalır (UX standardı). Seed verisi `tg_seed` ile kalıcı (tekrar seed'lenmez).
- **Kupon:** `TG10` → %10 indirim (özet `indirim` satırı); başka kod → "Kupon kodu geçersiz".

---

## 4. HEADER OTURUM STATE'İ (açık/kapalı iki hal)

`partials/header.html` **Faz 0'da** güncellenir (foundation, tek-yazar). İki hal `$store.auth.loggedIn` ile Alpine `x-if`/`x-show`:

**Kapalı (misafir):** aksiyon alanı **[Giriş Yap]** (kişi ikonu + metin) → `giris.html` · sepet (badge) · **favori (badge)**. Mevcut account `#` placeholder (`header.html:45`) → `giris.html`.

**Açık (girişli):** **hesap dropdown** (kişi ikonu + "Merhaba, {ad}"): Hesabım (`#ozet`) · Siparişlerim · Adreslerim · Favorilerim · **Çıkış Yap**. Sepet + favori rozetleri aynı.

**Yönetim:** yeni `$store.auth` (loggedIn, user, login()/logout()) + `$store.wishlist` (ids, toggle(), count). Header `.account-menu` component (Faz 0 CSS + Alpine). DE switcher mevcut `$store.lang` ile değişmez. Çıkış → `logout()` → header reaktif kapalı-hale → anasayfaya yönlendir. Footer'a opsiyonel "Hesabım" linkleri (minor, Faz 0).

---

## 5. TEAM KURGUSU (sonraki faz — henüz kurma)

**lead (delegate) + genişlemiş Faz 0 tek-yazar foundation + 4 UI teammate.** Auth+account state-yoğun, kohezyon yüksek → ayrı **"auth-account"** teammate.

**Faz 0 (tek-yazar, seri, sonra DONAR):**
- `main.js`: `$store.auth`, `$store.wishlist`, `tg_orders/addresses/warranties/reviews/returns/recent` yardımcıları, **seed util** (§3), order üretimi, korumalı-sayfa guard `requireAuth(next)`, kupon `TG10`.
- `partials/header.html`: oturum açık/kapalı iki hal + hesap dropdown + favori ikonu (§4) — **kritik foundation değişikliği, tek elden.**
- `styles.css`: **auth split-layout** (sol form / sağ marka panel, mobil stack), sosyal buton/tab/field, account-shell + sol-nav, sipariş-durum adımları, hesap-kart, favori-kalp aktif, account dropdown, toast, kupon satırı, yorum formu, iade formu, son-gezilen şerit.
- Token hizalama + `.btn--amber` (önceki plandan).

**Paralel teammate'ler (foundation donduktan sonra):**

| Teammate | Owns (.html) | Bağımlılık | Görev özeti |
|---|---|---|---|
| **shop** | `kategori`, `urun`, `sepet`, `odeme`, `arama`, `siparis-tamamlandi` | Faz 0 (cart/order/wishlist/recent/kupon + auth gate) | listeleme/PDP/sepet/**checkout wizard (hesap adımı)** + arama + onay; ♡favori + **PDP yorum yazma** + **stok bildirimi** + **son gezilen**; kupon `TG10`; empty/edge. odeme → `tg_orders` |
| **auth-account** | `giris`, `kayit`, `sifremi-unuttum`, `sifre-sifirla`, `e-posta-dogrula`, `hesabim` (6 section), `siparis-detay` | Faz 0 ($store.auth/wishlist, seed, guard, header iki hal) | **auth SPLIT** ekranları + state, hesap shell + 6 section + boş-state'ler + **SEED-DEFAULT + Verileri Sıfırla**, sipariş-detay (+**İade Oluştur** → `tg_returns`), korumalı yönlendirme |
| **kurumsal** | `hakkimizda`, `kurumsal-satis`, `satis-noktalari`, `iletisim` | Faz 0 (form/file-upload/consent) | (önceki planla aynı) + footer **bülten onay** toast |
| **destek-yasal** | `ek-garanti`, `sss`, `siparis-takip`, `odeme-teslimat`, `iade-degisim`, `kvkk`, `aydinlatma`, `mesafeli-satis`, `cerezler`, `404` | Faz 0 (legal-template, accordion, form) | (önceki planla aynı); `ek-garanti` girişliyse `tg_warranties`'e yazar (account-garanti paylaşımlı), `siparis-takip` misafir+girişli |

**Koordinasyon (çakışma sıfır — paylaşım veri store'larında, kod değil):**
- `odeme`(shop) ↔ `siparis-tamamlandi`(shop) ↔ `siparis-detay`/`hesabim-siparisler`(auth-account): paylaşılan `tg_orders`.
- `ek-garanti`(destek-yasal) ↔ `hesabim #garanti`(auth-account): `tg_warranties`.
- ♡favori + yorum: `tgProductCard`/PDP (shop) ↔ `hesabim #favoriler`(auth-account): `tg_wishlist` / `tg_reviews`.
- Her teammate **yalnızca kendi .html'lerini** yazar; foundation DONUK.

> Her UI teammate **frontend-design**'ı kalite lensi olarak (ttec-temiz/flat; auth `giris-v1` yalnızca alan/düzen, marka TG). **QA protokolü** (kendi 3-breakpoint Playwright eval'i, Beyar'a sunulmaz) + **denetim protokolü** (lead oto-kabul etmez, ~10 dk + kabul kriteri + diff) önceki planla aynı.

**Akış:** Faz 0 (seri) → 4 teammate (paralel) → lead cross-page QA + entegrasyon.

---

## 6. KAPSAM NOTLARI

**Dahil (KİLİTLİ — §6 opsiyoneller onaylandı):**
1. `arama.html` arama sonuç sayfası.
2. Korumalı sayfa + `?next=` yönlendirme.
3. Favori/wishlist site-geneli senkron.
4. Sipariş durum adımları (sipariş-detay).
5. KVKK veri hakları (profil: verilerimi indir / hesabımı sil — mock).
6. reCAPTCHA placeholder tüm formlarda.
7. **PDP ürün yorumu yazma** (`tg_reviews`) — PDP'de görünür. *(Hesap "yorumlarım" section YOK.)*
8. **Sipariş-detay iade talebi** (`tg_returns`).
9. **Son gezilen ürünler** (`tg_recent`).
10. **Stok bildirimi** ("stoğa gelince haber ver" + onay).
11. **Bülten aboneliği onay** state'i (footer).
12. **Kupon `TG10`** (sepet/checkout). *(Hesap "kuponlarım" section YOK.)*

**Bilinçli KAPSAM DIŞI:** ürün karşılaştırma (compare) · tam DE i18n (yalnızca skeleton) · canlı chat / gerçek harita embed / gerçek PSP (backend gerektirir).

---

## 7. KİLİTLİ KARARLAR (eski "açık sorular" — çözüldü)

| # | Soru | KİLİTLİ KARAR | Gerekçe |
|---|---|---|---|
| 1 | Hesap paneli yapısı | **Tek shell + hash-section** (6 section) | Az dosya, SPA-dashboard hissi, mevcut hash-router tutarlılığı |
| 2 | e-posta-doğrula | **EKLE** (ince mock ara-ekran) | Tam akış, atlama yok; mock "Doğrula" yeterli |
| 3 | Auth layout | **SPLIT** (sol form · sağ TG görseli, flat/AA scrim; mobil stack) | Beyar görsel-dolu istiyor; split standart e-ticaret auth, replica disiplinini bozmaz (sakin sağ panel) |
| 4 | §6 opsiyoneller | **HEPSİ dahil** (7–12) · hesap "kuponlarım"/"yorumlarım" section YOK (6 section) | "Tam akış, atlama yok"; yorum PDP'de, kupon checkout'ta görünür — ayrı hesap section gereksiz |
| 5 | Sosyal login | **Tık → anında mock giriş** | "Dolu/test edilebilir" hissi; UI-only |
| 6 | Sipariş seed | **SEED-DEFAULT** (boş+girişli → demo-işaretli 1–2 sipariş/adres/favori; "Verileri Sıfırla" → boş-state; gerçek checkout ekler; misafire seed yok) | Beyar "dolu görmek istiyorum"; boş-state demo-reset ile korunur; demo işaret gerçek siparişle karışmayı önler |
| 7 | arama.html | **Ayrı sayfa** (`?q=`) | Header arama bir hedef ister; ayrı sayfa daha temiz/test edilebilir |

> Foundation/teknik (Faz 0'da çözülür, karar gerektirmez): token hizalama (CSS vars ↔ `tw-config.js`), `.btn--amber` tanımı, `location.hash`/`?query` router util, GitHub Pages root `404.html` davranışı, tüm yeni görsel telif-güvenli stok + mevcut TG asset.

---

## Özet

Mevcut 18 sayfaya **9 ek sayfa** kilitlendi (Auth 5 · Hesap 2: tek-shell `hesabim` 6-section + `siparis-detay` · `siparis-tamamlandi` · `arama`) → **toplam 27 sayfa**, artı sayfa-olmayan zorunlu UX state'leri: site-geneli ♡favori senkron, header oturum-açık/kapalı iki hali, `?next=` korumalı yönlendirme, toast seti, checkout'a eklenen hesap adımı, ve §6'nın 7–12 opsiyonellerinin tamamı (PDP yorum · iade talebi · son gezilen · stok bildirimi · bülten onay · kupon `TG10`) — hesap yalnızca 6 section'da kalır. Auth **SPLIT layout** (flat, marka TG), giriş ve hesap **SEED-DEFAULT** ile ilk açılışta dolu görünür ("Verileri Sıfırla" ile boş-state korunur), tüm state `localStorage` mock'ta uçtan uca tıklanır-test edilir; gerçek backend/PSP/e-posta yok. Replica disiplini korunur (ttec-temiz/flat; `giris-v1` yalnızca alan/düzen). Implement kurgusu: **lead (delegate) + genişlemiş Faz 0 tek-yazar foundation** (yeni `$store.auth`/`$store.wishlist` + seed util + header iki hali + auth/account CSS) **+ 4 UI teammate** (shop · auth-account · kurumsal · destek-yasal), paylaşılan veri foundation store'larında, her teammate yalnızca kendi `.html`'lerini yazar, foundation donuk. Implement Beyar'ın ayrı prompt'uyla başlar.
