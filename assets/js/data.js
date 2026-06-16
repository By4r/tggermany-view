/* TG Germany — mock content (DRY source for Alpine x-for).
   Demo product data only. Media = real free-license photos in assets/img/products/
   (Unsplash / Pexels). Replace with TG's own product photography for production.

   FAZ 0 genişletme: alt-kategori slug'ları, ürün detay alanları (gallery/desc/specs/
   variants/facets/related), bayi + SSS verisi, ve katalog/router helper'ları. */

window.TG = window.TG || {};

var IMG = "assets/img/products/";
var TGIMG = "assets/img/tg-products/"; // TG's own product photography

/* Category pillars (IA) + mega-menu subcategories.
   sub = [{slug,name}] (slug ile kategori sayfası alt-filtre eder). photo = temsili görsel. */
window.TG.categories = [
  { slug: "akilli-yasam", name: "Akıllı Yaşam", tag: "Smart Living",
    desc: "Evinizi daha akıllı, güvenli ve konforlu kılan bağlantılı yaşam ürünleri.",
    sub: [
      { slug: "akilli-aydinlatma", name: "Akıllı Aydınlatma" },
      { slug: "akilli-priz", name: "Akıllı Priz & Fiş" },
      { slug: "sensorler", name: "Sensörler" },
      { slug: "robot-supurge", name: "Robot Süpürge" },
      { slug: "akilli-saat", name: "Akıllı Saat" },
    ],
    photo: TGIMG + "akilli-ampul.jpg" },
  { slug: "ses", name: "Ses", tag: "Audio",
    desc: "Hareket halinde kesintisiz ses: kulaklıklar, hoparlörler ve fazlası.",
    sub: [
      { slug: "kablosuz-kulaklik", name: "Kablosuz Kulaklık" },
      { slug: "tws-kulaklik", name: "TWS Kulaklık" },
      { slug: "bluetooth-hoparlor", name: "Bluetooth Hoparlör" },
      { slug: "oyuncu-kulakligi", name: "Oyuncu Kulaklığı" },
      { slug: "soundbar", name: "Soundbar" },
    ],
    photo: IMG + "p2.jpg" },
  { slug: "fonksiyon", name: "Fonksiyon", tag: "Function",
    desc: "Şarj ve bağlantıda günlük hayatı kolaylaştıran güvenilir çözümler.",
    sub: [
      { slug: "powerbank", name: "Powerbank" },
      { slug: "hizli-sarj", name: "Hızlı Şarj" },
      { slug: "kablolar", name: "Kablolar" },
      { slug: "sarj-cihazlari", name: "Şarj Cihazları" },
      { slug: "arac-ici", name: "Araç İçi" },
    ],
    photo: IMG + "p1.jpg" },
  { slug: "koruma", name: "Koruma", tag: "Protection",
    desc: "Cihazlarınızı her gün koruyan dayanıklı kılıf ve ekran çözümleri.",
    sub: [
      { slug: "telefon-kilifi", name: "Telefon Kılıfı" },
      { slug: "ekran-koruyucu", name: "Ekran Koruyucu" },
      { slug: "tablet-kilifi", name: "Tablet Kılıfı" },
      { slug: "kamera-koruma", name: "Kamera Koruma" },
      { slug: "su-gecirmez", name: "Su Geçirmez" },
    ],
    photo: IMG + "p8.jpg" },
];

/* Demo products (trend = popularity, used only for sorting — not shown as a meter).
   subSlug = alt-kategori FK · sku/brand · color = filtre + varyant rengi ·
   desc/specs = PDP içeriği · added = sıralama için sözde tarih (yeni). */
window.TG.products = [
  { id: "p1", name: "PowerCell 20.000 mAh Hızlı Şarj Powerbank", cat: "fonksiyon", subSlug: "powerbank", sku: "TG-FN-201", brand: "TUGG", color: "Siyah", price: 1299.9, old: 1699.9, rating: 4.7, reviews: 218, badge: "İndirim", trend: 96, added: 8, stock: true, photo: IMG + "p1.jpg",
    desc: "20.000 mAh yüksek kapasiteli powerbank; 22.5W hızlı şarj ve çift çıkış ile telefon, tablet ve kulaklığınızı gün boyu güçte tutar. Kompakt gövde, LED şarj göstergesi.",
    specs: [{ k: "Kapasite", v: "20.000 mAh" }, { k: "Çıkış Gücü", v: "22.5W" }, { k: "Bağlantı", v: "USB-C + USB-A" }, { k: "Ağırlık", v: "340 g" }] },
  { id: "p2", name: "AeroBeat TWS Kablosuz Kulaklık", cat: "ses", subSlug: "tws-kulaklik", sku: "TG-SE-110", brand: "TUGG", color: "Beyaz", price: 899.0, old: null, rating: 4.6, reviews: 154, badge: "Yeni", trend: 88, added: 12, stock: true, photo: IMG + "p2.jpg",
    desc: "Dengeli ses imzası ve düşük gecikme moduyla TWS kulaklık. Şarj kutusuyla 28 saate varan kullanım, dokunmatik kontrol ve çağrı için çift mikrofon.",
    specs: [{ k: "Bağlantı", v: "Bluetooth 5.3" }, { k: "Kullanım", v: "28 saat (kutu ile)" }, { k: "Suya Dayanıklılık", v: "IPX4" }, { k: "Şarj", v: "USB-C" }] },
  { id: "p3", name: "BrightHome Akıllı Sarkıt LED Ampul (E27)", cat: "akilli-yasam", subSlug: "akilli-aydinlatma", sku: "TG-AY-027", brand: "TUGG", color: "Beyaz", price: 249.9, old: 329.9, rating: 4.4, reviews: 96, badge: "İndirim", trend: 74, added: 5, stock: true, photo: TGIMG + "akilli-ampul.jpg",
    desc: "Uygulama ve sesle kontrol edilebilen E27 akıllı LED ampul. 16 milyon renk, ayarlanabilir beyaz tonları ve zamanlama senaryolarıyla evinize uyum sağlar.",
    specs: [{ k: "Duy", v: "E27" }, { k: "Güç", v: "9W" }, { k: "Renk", v: "16M RGB + ayarlanabilir beyaz" }, { k: "Bağlantı", v: "Wi-Fi 2.4 GHz" }] },
  { id: "p4", name: "GuardGlass 3D Tam Kaplama Ekran Koruyucu", cat: "koruma", subSlug: "ekran-koruyucu", sku: "TG-KR-304", brand: "TUGG", color: "Şeffaf", price: 149.9, old: null, rating: 4.8, reviews: 402, badge: null, trend: 91, added: 4, stock: true, photo: IMG + "p4.jpg",
    desc: "9H sertliğinde temperli cam ekran koruyucu; kenardan kenara 3D kaplama, parmak izi önleyici kaplama ve kolay kurulum çerçevesi.",
    specs: [{ k: "Sertlik", v: "9H" }, { k: "Kaplama", v: "Oleofobik" }, { k: "Uyum", v: "Tam kaplama 3D" }, { k: "Kurulum", v: "Hizalama çerçeveli" }] },
  { id: "p5", name: "FlexCharge 65W GaN Hızlı Şarj Adaptörü", cat: "fonksiyon", subSlug: "sarj-cihazlari", sku: "TG-FN-065", brand: "TUGG", color: "Beyaz", price: 649.9, old: 799.9, rating: 4.7, reviews: 137, badge: "İndirim", trend: 82, added: 7, stock: true, photo: IMG + "p5.jpg",
    desc: "GaN teknolojisiyle kompakt 65W hızlı şarj adaptörü. Çift USB-C ve USB-A ile dizüstü, telefon ve tableti aynı anda güvenle şarj eder.",
    specs: [{ k: "Güç", v: "65W" }, { k: "Teknoloji", v: "GaN" }, { k: "Port", v: "2× USB-C + USB-A" }, { k: "Protokol", v: "PD 3.0 / QC" }] },
  { id: "p6", name: "PulseBar Taşınabilir Bluetooth Hoparlör", cat: "ses", subSlug: "bluetooth-hoparlor", sku: "TG-SE-220", brand: "TUGG", color: "Lacivert", price: 1149.0, old: null, rating: 4.5, reviews: 73, badge: "Yeni", trend: 69, added: 11, stock: true, photo: IMG + "p6.jpg",
    desc: "Dengeli bas ve net tizleriyle taşınabilir hoparlör. IPX7 su geçirmezlik, 16 saat çalma süresi ve iki hoparlörü eşleyen stereo modu.",
    specs: [{ k: "Güç", v: "20W" }, { k: "Kullanım", v: "16 saat" }, { k: "Su Dayanımı", v: "IPX7" }, { k: "Bağlantı", v: "Bluetooth 5.3" }] },
  { id: "p7", name: "SenseGuard Akıllı Priz (Wi-Fi)", cat: "akilli-yasam", subSlug: "akilli-priz", sku: "TG-AY-016", brand: "TUGG", color: "Beyaz", price: 399.9, old: 499.9, rating: 4.3, reviews: 58, badge: "İndirim", trend: 61, added: 6, stock: true, photo: IMG + "p7.jpg",
    desc: "Cihazlarınızı uzaktan açıp kapatan, enerji tüketimini ölçen Wi-Fi akıllı priz. Zamanlama ve senaryolarla otomasyon kurun.",
    specs: [{ k: "Akım", v: "16A" }, { k: "Ölçüm", v: "Enerji tüketimi" }, { k: "Bağlantı", v: "Wi-Fi 2.4 GHz" }, { k: "Kontrol", v: "Uygulama + ses" }] },
  { id: "p8", name: "ArmorFlex Darbeye Dayanıklı Telefon Kılıfı", cat: "koruma", subSlug: "telefon-kilifi", sku: "TG-KR-118", brand: "TUGG", color: "Siyah", price: 199.9, old: null, rating: 4.6, reviews: 311, badge: null, trend: 78, added: 3, stock: true, photo: IMG + "p8.jpg",
    desc: "Askeri sınıf darbe koruması sunan kılıf; köşelerde hava yastığı tasarımı, kaymaz yüzey ve hassas kesimlerle günlük kullanımda tam koruma.",
    specs: [{ k: "Koruma", v: "MIL-STD-810G" }, { k: "Malzeme", v: "TPU + PC" }, { k: "Köşe", v: "Hava yastığı" }, { k: "Yüzey", v: "Kaymaz mat" }] },
  { id: "p9", name: "DriveMate Hızlı Şarj Kablosu (USB-C)", cat: "fonksiyon", subSlug: "kablolar", sku: "TG-FN-009", brand: "TUGG", color: "Gri", price: 129.9, old: 169.9, rating: 4.4, reviews: 89, badge: "İndirim", trend: 55, added: 2, stock: true, photo: IMG + "p9.jpg",
    desc: "100W güç aktarımı ve 480 Mbps veri desteğiyle örgülü USB-C kablo. 10.000+ bükülme testiyle uzun ömürlü.",
    specs: [{ k: "Güç", v: "100W" }, { k: "Uzunluk", v: "1.5 m" }, { k: "Malzeme", v: "Örgülü naylon" }, { k: "Dayanım", v: "10.000+ bükülme" }] },
  { id: "p10", name: "AeroBeat Pro ANC Kablosuz Kulaklık", cat: "ses", subSlug: "kablosuz-kulaklik", sku: "TG-SE-130", brand: "TUGG", color: "Siyah", price: 1799.0, old: 2199.0, rating: 4.9, reviews: 246, badge: "İndirim", trend: 94, added: 10, stock: true, photo: IMG + "p10.jpg",
    desc: "Aktif gürültü engelleme (ANC) ve şeffaflık moduyla kulak üstü kulaklık. 40 saat kullanım, hızlı şarj ve çok noktalı bağlantı.",
    specs: [{ k: "ANC", v: "Aktif gürültü engelleme" }, { k: "Kullanım", v: "40 saat" }, { k: "Sürücü", v: "40 mm" }, { k: "Bağlantı", v: "Bluetooth 5.3 çok noktalı" }] },
  { id: "p11", name: "HomePulse Akıllı Ortam Sensörü", cat: "akilli-yasam", subSlug: "sensorler", sku: "TG-AY-044", brand: "TUGG", color: "Beyaz", price: 549.9, old: null, rating: 4.2, reviews: 41, badge: "Yeni", trend: 47, added: 9, stock: false, photo: IMG + "p11.jpg",
    desc: "Sıcaklık, nem ve hareket algılayan akıllı sensör. Eşik bildirimleri ve otomasyon tetikleyicileriyle evinizi güvende tutar.",
    specs: [{ k: "Algılama", v: "Sıcaklık · nem · hareket" }, { k: "Bağlantı", v: "Wi-Fi 2.4 GHz" }, { k: "Pil", v: "Şarj edilebilir" }, { k: "Bildirim", v: "Uygulama push" }] },
  { id: "p12", name: "ClearView Tablet Ekran Koruyucu", cat: "koruma", subSlug: "tablet-kilifi", sku: "TG-KR-212", brand: "TUGG", color: "Şeffaf", price: 179.9, old: 229.9, rating: 4.5, reviews: 64, badge: "İndirim", trend: 52, added: 1, stock: true, photo: IMG + "p12.jpg",
    desc: "Tabletler için yansıma önleyici temperli cam koruyucu. Hassas dokunma tepkisi, 9H sertlik ve hizalama çerçevesiyle kolay kurulum.",
    specs: [{ k: "Sertlik", v: "9H" }, { k: "Kaplama", v: "Yansıma önleyici" }, { k: "Dokunma", v: "Tam hassasiyet" }, { k: "Kurulum", v: "Çerçeveli" }] },
];

/* gallery + related'ı türet: galeri = ürünün kendi foto'su + aynı kategoriden 2 gerçek görsel
   (404 yok); related = aynı kategorideki diğer ürünler. */
(function deriveProductExtras() {
  var byCat = {};
  window.TG.products.forEach(function (p) { (byCat[p.cat] = byCat[p.cat] || []).push(p); });
  window.TG.products.forEach(function (p) {
    var siblings = byCat[p.cat].filter(function (s) { return s.id !== p.id; });
    var extra = siblings.slice(0, 2).map(function (s) { return s.photo; });
    p.gallery = [p.photo].concat(extra);
    p.related = siblings.slice(0, 4).map(function (s) { return s.id; });
  });
})();

/* Bayiler — temsili yer tutucu (gerçek marka logosu yok; .logo-wall placeholder render eder) */
window.TG.dealers = {
  tr: [
    { name: "Teknoloji Marketi" }, { name: "Mobil Dünya" }, { name: "Akıllı Ev AVM" },
    { name: "Dijital Plaza" }, { name: "Elektronik Çarşı" }, { name: "Aksesuar Noktası" },
    { name: "Şarj İstasyonu" }, { name: "Ses Merkezi" }, { name: "Online Pazar" },
    { name: "Cihaz Galerisi" }, { name: "Tekno Bayi" }, { name: "Gün Işığı Elektronik" },
  ],
  global: [
    { name: "Tech Gallery" }, { name: "Mobile World" }, { name: "Smart Living Co." },
    { name: "Digital Plaza" }, { name: "Gadget Point" }, { name: "Charge Station" },
  ],
};

/* SSS — konu başlıkları + soru/cevap (sss.html accordion) */
window.TG.faq = [
  { topic: "Kargo & Teslimat", items: [
    { q: "Siparişim ne zaman kargoya verilir?", a: "Onaylanan siparişler genellikle 24 saat içinde hazırlanır ve kargoya teslim edilir. Kargo takip bilgisi e-posta ile paylaşılır." },
    { q: "Kargo ücreti ne kadar?", a: "750 ₺ ve üzeri tüm siparişlerde kargo ücretsizdir. Bu tutarın altındaki siparişlerde sabit kargo bedeli sepet özetinde gösterilir." },
  ] },
  { topic: "İade & Değişim", items: [
    { q: "Ürünü nasıl iade edebilirim?", a: "Teslim tarihinden itibaren 14 gün içinde, kullanılmamış ürünleri iade edebilirsiniz. İade talebini hesabınızdaki sipariş detayından veya iletişim üzerinden başlatabilirsiniz." },
    { q: "Değişim mümkün mü?", a: "Stok durumuna göre beden/renk değişimi yapılabilir. İade ve değişim koşulları için İade & Değişim sayfamızı inceleyin." },
  ] },
  { topic: "Garanti", items: [
    { q: "Ürünler garantili mi?", a: "Tüm TG Germany ürünleri 2 yıl garanti kapsamındadır. Ek garanti başvurusuyla koruma süresini uzatabilirsiniz." },
    { q: "Ek garanti nasıl başvurulur?", a: "Ek Garanti sayfasından ürün seri numarası ve fatura görseliyle başvurabilir, başvuru durumunuzu aynı sayfadan sorgulayabilirsiniz." },
  ] },
  { topic: "Sipariş", items: [
    { q: "Siparişimi nasıl takip ederim?", a: "Sipariş Takip sayfasından e-posta ve sipariş numaranızla, ya da giriş yaparak Hesabım > Siparişlerim üzerinden durumu görüntüleyebilirsiniz." },
    { q: "Üye olmadan alışveriş yapabilir miyim?", a: "Evet, ödeme adımında misafir olarak devam edebilirsiniz. Dilerseniz sipariş sonrası hesap oluşturabilirsiniz." },
  ] },
  { topic: "Ödeme", items: [
    { q: "Hangi ödeme yöntemleri var?", a: "Kredi/banka kartı ile güvenli ödeme alınır. Fiyatlara KDV dahildir." },
    { q: "Taksit imkânı var mı?", a: "Anlaşmalı bankaların kartlarına taksit seçenekleri ödeme adımında gösterilir." },
  ] },
];

/* ---- Helpers ---------------------------------------------------------- */
window.TG.catName = function (slug) {
  var c = window.TG.categories.find(function (x) { return x.slug === slug; });
  return c ? c.name : "";
};
window.TG.getCategory = function (slug) {
  return window.TG.categories.find(function (x) { return x.slug === slug; }) || null;
};
window.TG.subName = function (catSlug, subSlug) {
  var c = window.TG.getCategory(catSlug);
  if (!c) return "";
  var s = c.sub.find(function (x) { return x.slug === subSlug; });
  return s ? s.name : "";
};
window.TG.byTrend = function (n) {
  return window.TG.products.slice().sort(function (a, b) { return b.trend - a.trend; }).slice(0, n || 6);
};
window.TG.byCategory = function (slug) {
  return window.TG.products.filter(function (p) { return p.cat === slug; });
};
window.TG.getProduct = function (id) {
  return window.TG.products.find(function (p) { return p.id === id; }) || null;
};
window.TG.relatedProducts = function (id) {
  var p = window.TG.getProduct(id);
  if (!p) return [];
  return (p.related || []).map(window.TG.getProduct).filter(Boolean);
};
/* filtre: f = { sub, colors[], min, max, inStock } — hepsi opsiyonel */
window.TG.filterProducts = function (slug, f) {
  f = f || {};
  return window.TG.byCategory(slug).filter(function (p) {
    if (f.sub && p.subSlug !== f.sub) return false;
    if (f.colors && f.colors.length && f.colors.indexOf(p.color) === -1) return false;
    if (typeof f.min === "number" && p.price < f.min) return false;
    if (typeof f.max === "number" && p.price > f.max) return false;
    if (f.inStock && !p.stock) return false;
    return true;
  });
};
/* sıralama: key = onerilen | fiyat-artan | fiyat-azalan | yeni | puan */
window.TG.sortProducts = function (list, key) {
  var a = list.slice();
  switch (key) {
    case "fiyat-artan": a.sort(function (x, y) { return x.price - y.price; }); break;
    case "fiyat-azalan": a.sort(function (x, y) { return y.price - x.price; }); break;
    case "yeni": a.sort(function (x, y) { return y.added - x.added; }); break;
    case "puan": a.sort(function (x, y) { return y.rating - x.rating; }); break;
    default: a.sort(function (x, y) { return y.trend - x.trend; }); // önerilen
  }
  return a;
};
/* arama: ada göre filtre (header autocomplete + arama.html ortak) */
window.TG.search = function (q) {
  q = (q || "").trim().toLocaleLowerCase("tr-TR");
  if (!q) return [];
  return window.TG.products.filter(function (p) {
    return p.name.toLocaleLowerCase("tr-TR").indexOf(q) !== -1 ||
           window.TG.catName(p.cat).toLocaleLowerCase("tr-TR").indexOf(q) !== -1;
  });
};
/* router: location.hash (#slug) ve ?query okuma — her sayfa kendi parse etmesin */
window.TG.parseHash = function () { return (location.hash || "").replace(/^#/, "").trim(); };
window.TG.parseQuery = function (key) {
  return new URLSearchParams(location.search).get(key);
};

/* Kupon (mock) — yalnızca TG10 geçerli */
window.TG.coupons = { TG10: { code: "TG10", rate: 0.10, label: "%10 indirim" } };
window.TG.getCoupon = function (code) {
  return window.TG.coupons[(code || "").trim().toUpperCase()] || null;
};
