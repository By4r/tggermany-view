# Foundation Reference — FAZ 0 (DONUK / FROZEN)

> Teammate'ler bu kontrata **karşı** çalışır. Foundation dosyaları READ-ONLY: `assets/css/styles.css`, `assets/js/{tw-config,data,main,include}.js`, `partials/{header,footer}.html`. Yeni paylaşılan component gerekirse lead'e söyle — kendin foundation'a yazma.
> Replica: ttec-temiz/flat. Gradient/charge-signature ÜRETME. Tüm path RELATIVE. Görsel = div+`background:cover` (`.ratio-box`), `<img>` sadece logo/semantik. Sahte iletişim verisi YOK (`.data-tbd`). KDV fiyata dahil. Kargo eşiği 750₺.

## 1. Standart sayfa iskeleti (her .html bunu mirror eder)

`<head>` (index.html ile birebir): Tailwind CDN → `tw-config.js` → Poppins preload (4 woff2) → `styles.css`. `<title>`/`<meta description>` sayfaya göre.

```html
<!DOCTYPE html><html lang="tr"><head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>… — TG Germany</title>
  <meta name="description" content="…" />
  <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="180x180" href="assets/img/favicon.png" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="assets/js/tw-config.js"></script>
  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/poppins-700-latin.woff2" crossorigin />
  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/poppins-600-latin.woff2" crossorigin />
  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/poppins-400-latin.woff2" crossorigin />
  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/poppins-400-latin-ext.woff2" crossorigin />
  <link rel="stylesheet" href="assets/css/styles.css" />
</head><body>
  <div data-include="partials/header.html"></div>
  <main> … sayfa … </main>
  <div data-include="partials/footer.html"></div>

  <!-- Global toast host (x-teleport MUST be on a <template>) -->
  <div x-data>
    <template x-teleport="body">
      <div class="toast-host" aria-live="polite">
        <template x-for="t in $store.toast.items" :key="t.id">
          <div class="toast" :class="'toast--'+t.type" x-text="t.msg" x-cloak></div>
        </template>
      </div>
    </template>
  </div>

  <script src="assets/js/data.js"></script>
  <script src="assets/js/main.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script defer src="assets/js/include.js"></script>
</body></html>
```

Server: `python3 -m http.server 8099` (fetch-include `file://`'de çalışmaz). Sayfa içeriğini bir Alpine bileşeni/island olarak `x-data` ile sar; veriyi `window.TG`'den oku.

## 2. Yeni data (`window.TG`) — data.js

- `categories[]`: `{ slug, name, tag, desc, sub:[{slug,name}], photo }` — **sub artık obje** (slug + name).
- `products[]`: eski alanlar + `subSlug, sku, brand, color, added, desc, specs:[{k,v}], gallery:[url], related:[id]`.
- `dealers`: `{ tr:[{name}], global:[{name}] }` (temsili — logo yok, `.logo-cell` ada göre render eder).
- `faq`: `[{ topic, items:[{q,a}] }]`.
- Helpers: `catName(slug)` · `getCategory(slug)` · `subName(cat,sub)` · `byTrend(n)` · `byCategory(slug)` · `getProduct(id)` · `relatedProducts(id)` · `filterProducts(slug,{sub,colors,min,max,inStock})` · `sortProducts(list,key)` key∈`onerilen|fiyat-artan|fiyat-azalan|yeni|puan` · `search(q)` · `parseHash()` · `parseQuery(key)` · `getCoupon(code)` (yalnız `TG10`).

Routing konvansiyonu: `kategori.html#<catSlug>` (+ opsiyonel `?sub=<subSlug>`), `urun.html#<id>`, `arama.html?q=`, `siparis-detay.html?id=`, `siparis-tamamlandi.html?id=`, `sifre-sifirla.html?t=`, `giris.html?next=`.

## 3. Yeni Alpine store'ları — main.js (`$store.*`)

- **auth**: `loggedIn, user{ad,soyad,email,telefon,verified,marketingOptIn}`, `register(d)→{ok,error}`, `login(email,pwd)→{ok,error}`, `social(provider)`, `verifyEmail()`, `updateProfile(patch)`, `logout()`, `resetData()` (Verileri Sıfırla), `fullName`. Korumalı sayfa: `tgRequireAuth()` (girişsizse `giris.html?next=…`'e atar, false döner).
- **wishlist**: `ids[]`, `has(id)`, `toggle(id)` (toast'lı), `remove(id)`, `count`, `products`.
- **cart** (genişledi): `coupon`, `applyCoupon(code)→bool`, `clearCoupon()`, getter `discount`, `shipping` (eşik altı `shipFee=49.9`), `grandTotal`, `clear()`. KDV ayrı satır YOK.
- **orders**: `list[]`, `create(order)→id` (id `TG-YYMMDD-NNN`, `status` vars. "Hazırlanıyor"), `get(id)`, `find(email,id)` (misafir takip). Order shape: `{id,date,status,email,items:[{id,name,price,photo,qty}],address,shipping,totals:{ara,indirim,kargo,genel}}`.
- **addresses**: `list[]`, `add(a)→id`, `update(id,patch)`, `remove(id)`, `setDefault(id)`, `default`. Address: `{id,baslik,ad,soyad,telefon,il,ilce,adres,varsayilan}`.
- **warranties**: `list[]`, `add(w)→id`. `{id,urunSeriNo,satinAlinanYer,tarih,faturaAdi,durum}`.
- **reviews**: `list[]`, `add(r)`, `forProduct(id)`. `{productId,ad,puan,yorum,tarih}`.
- **returns**: `list[]`, `add(r)→id`, `forOrder(id)`. `{orderId,items,sebep,durum}`.
- **recent**: `push(id)`, `products` (son gezilen — PDP'de `$store.recent.push(p.id)` çağır).
- **toast**: `push(msg, type?)` type∈`success|error`. host snippet yukarıda.
- **lang/ui**: değişmedi (`$store.lang.t(key)`, `$store.ui.openDrawer()`...). Yeni i18n key: `login,register,hello,orders,addresses,favorites,logout`.

**SEED-DEFAULT** otomatik: kullanıcı girişli + `tg_seed` yoksa demo sipariş (`TG-DEMO-*`, `demo:true`) + adres + favori yüklenir; misafire seed yok; `$store.auth.resetData()` boş-state'e döner. Sen ekstra seed yazma — sadece store'ları oku/yaz.

`tgProductCard(p)` genişledi: `toggleFav()`, `faved` (favori kartlarda `@click.prevent="toggleFav()"` + `:class="faved && 'is-faved'"` + `x-text="faved?'♥':'♡'"`).

localStorage anahtarları: `tg_cart, tg_coupon, tg_wishlist, tg_auth, tg_user, tg_users, tg_orders, tg_order_seq, tg_addresses, tg_warranties, tg_reviews, tg_returns, tg_recent, tg_seed, tg_lang, tg_cookie`.

## 4. Yeni CSS class'ları — styles.css (kullan, fork etme)

Genel: `.btn--amber .btn--danger` · `.breadcrumb`(.sep/.current) · `.page-header`(__inner/__title/__sub) · `.empty-state`(__icon/__title) · `.skeleton` · `.toast-host .toast`(--success/--error).

Listeleme: `.toolbar`(__count) + `select` · `.view-toggle` · `.filter__group`(__title/__opt) `.swatch-dot` `.price-range` · `.chip` · `.pager`(.is-active/.is-disabled).

PDP: `.gallery__main/__thumbs/__thumb`(.is-active) · `.swatch`(.is-active/__dot) · `.spec-table` · `.trust-row`(__item) · `.tabs .tab`(.is-active) · `.sticky-buy`.

Form: `.field`(__label/.req/__input/__error/__hint/--error) textarea/select dahil · `.seg` · `.consent` · `.file-upload`(__name) · `.recaptcha-ph`.

Auth: `.auth .auth__form .auth__card .auth__aside`(-bg/-scrim/-content) · `.social-btn` · `.auth__divider`.

Hesap: `.account-shell .account-nav`(a.is-active) `.account-card` · `.demo-tag`.

Sipariş: `.order-status`(__step.is-done/.is-current/__dot) · `.status-badge`(--prep/--ship/--done) · `.stepper`(__step.is-active/.is-done/__num/__line) · `.order-summary`(__row.total) `.coupon-row` `.kdv-note`.

Kurumsal/iletişim: `.stat`(__num/__label) `.benefit__icon` · `.logo-wall .logo-cell` · `.contact-card`(__icon) `.map-ph`(__pin).

Yasal/bilgi: `.legal`(h2/h3/p/ul/li) `.legal__toc` `.legal__updated`.

Mevcut (reuse): `.container-tg .section .bg-soft .ratio-box(.ratio-1-1/4-3/16-9/21-9) .t-h1 .t-h2 .label(--accent) .price(--old/--sale) .btn(--sm/lg/block/secondary/ghost/light) .icon-btn .tap .card .product-card .badge .fav .stars .qty .ship-bar .data-tbd .accordion__item/__head/__body`. Accordion `@alpinejs/collapse` yüklü (`x-collapse`).

## 5. Kabul kriteri (her teammate, eval-iterate ≥2 tur)
Replica/flat · 3 breakpoint (1440/768/390) · 0 console hatası · empty/edge state'ler · relative path · foundation'a yazılmadı · dil tonu anasayfayla tutarlı · favori/cart/auth store senkron · KDV-dahil + 750₺ copy.
