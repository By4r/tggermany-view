/* TG Germany — mock content (DRY source for Alpine x-for).
   Demo product data only. Media = real free-license photos in assets/img/products/
   (Unsplash / Pexels). Replace with TG's own product photography for production. */

window.TG = window.TG || {};

var IMG = "assets/img/products/";
var TGIMG = "assets/img/tg-products/"; // TG's own product photography

/* Category pillars (IA) + mega-menu subcategories. icon = representative product photo. */
window.TG.categories = [
  { slug: "akilli-yasam", name: "Akıllı Yaşam", tag: "Smart Living",
    sub: ["Akıllı Aydınlatma", "Akıllı Priz & Fiş", "Sensörler", "Robot Süpürge", "Akıllı Saat"],
    photo: TGIMG + "akilli-ampul.jpg" },
  { slug: "ses", name: "Ses", tag: "Audio",
    sub: ["Kablosuz Kulaklık", "TWS Kulaklık", "Bluetooth Hoparlör", "Oyuncu Kulaklığı", "Soundbar"],
    photo: IMG + "p2.jpg" },
  { slug: "fonksiyon", name: "Fonksiyon", tag: "Function",
    sub: ["Powerbank", "Hızlı Şarj", "Kablolar", "Şarj Cihazları", "Araç İçi"],
    photo: IMG + "p1.jpg" },
  { slug: "koruma", name: "Koruma", tag: "Protection",
    sub: ["Telefon Kılıfı", "Ekran Koruyucu", "Tablet Kılıfı", "Kamera Koruma", "Su Geçirmez"],
    photo: IMG + "p8.jpg" },
];

/* Demo products (trend = popularity, used only for sorting — not shown as a meter) */
window.TG.products = [
  { id: "p1", name: "PowerCell 20.000 mAh Hızlı Şarj Powerbank", cat: "fonksiyon", price: 1299.9, old: 1699.9, rating: 4.7, reviews: 218, badge: "İndirim", trend: 96, stock: true, photo: IMG + "p1.jpg" },
  { id: "p2", name: "AeroBeat TWS Kablosuz Kulaklık", cat: "ses", price: 899.0, old: null, rating: 4.6, reviews: 154, badge: "Yeni", trend: 88, stock: true, photo: IMG + "p2.jpg" },
  { id: "p3", name: "BrightHome Akıllı Sarkıt LED Ampul (E27)", cat: "akilli-yasam", price: 249.9, old: 329.9, rating: 4.4, reviews: 96, badge: "İndirim", trend: 74, stock: true, photo: TGIMG + "akilli-ampul.jpg" },
  { id: "p4", name: "GuardGlass 3D Tam Kaplama Ekran Koruyucu", cat: "koruma", price: 149.9, old: null, rating: 4.8, reviews: 402, badge: null, trend: 91, stock: true, photo: IMG + "p4.jpg" },
  { id: "p5", name: "FlexCharge 65W GaN Hızlı Şarj Adaptörü", cat: "fonksiyon", price: 649.9, old: 799.9, rating: 4.7, reviews: 137, badge: "İndirim", trend: 82, stock: true, photo: IMG + "p5.jpg" },
  { id: "p6", name: "PulseBar Taşınabilir Bluetooth Hoparlör", cat: "ses", price: 1149.0, old: null, rating: 4.5, reviews: 73, badge: "Yeni", trend: 69, stock: true, photo: IMG + "p6.jpg" },
  { id: "p7", name: "SenseGuard Akıllı Priz (Wi-Fi)", cat: "akilli-yasam", price: 399.9, old: 499.9, rating: 4.3, reviews: 58, badge: "İndirim", trend: 61, stock: true, photo: IMG + "p7.jpg" },
  { id: "p8", name: "ArmorFlex Darbeye Dayanıklı Telefon Kılıfı", cat: "koruma", price: 199.9, old: null, rating: 4.6, reviews: 311, badge: null, trend: 78, stock: true, photo: IMG + "p8.jpg" },
  { id: "p9", name: "DriveMate Hızlı Şarj Kablosu (USB-C)", cat: "fonksiyon", price: 129.9, old: 169.9, rating: 4.4, reviews: 89, badge: "İndirim", trend: 55, stock: true, photo: IMG + "p9.jpg" },
  { id: "p10", name: "AeroBeat Pro ANC Kablosuz Kulaklık", cat: "ses", price: 1799.0, old: 2199.0, rating: 4.9, reviews: 246, badge: "İndirim", trend: 94, stock: true, photo: IMG + "p10.jpg" },
  { id: "p11", name: "HomePulse Akıllı Ortam Sensörü", cat: "akilli-yasam", price: 549.9, old: null, rating: 4.2, reviews: 41, badge: "Yeni", trend: 47, stock: false, photo: IMG + "p11.jpg" },
  { id: "p12", name: "ClearView Tablet Ekran Koruyucu", cat: "koruma", price: 179.9, old: 229.9, rating: 4.5, reviews: 64, badge: "İndirim", trend: 52, stock: true, photo: IMG + "p12.jpg" },
];

/* Helpers */
window.TG.catName = function (slug) {
  var c = window.TG.categories.find(function (x) { return x.slug === slug; });
  return c ? c.name : "";
};
window.TG.byTrend = function (n) {
  return window.TG.products.slice().sort(function (a, b) { return b.trend - a.trend; }).slice(0, n || 6);
};
