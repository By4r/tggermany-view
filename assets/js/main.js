/* TG Germany — Alpine stores + components (cart / ui / lang) and the charge signature glue. */

/* ---- Money ------------------------------------------------------------- */
function tgFormatPrice(v) {
  return Number(v).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₺";
}
window.tgFormatPrice = tgFormatPrice;

/* ---- i18n (skeleton: TR primary, DE stub) ------------------------------ */
var TG_STRINGS = {
  tr: {
    search: "Ürün, kategori veya marka ara",
    cart: "Sepetim", account: "Hesabım", login: "Giriş Yap",
    free_left: "ücretsiz kargoya kaldı", free_done: "Ücretsiz kargo kazandınız!",
    add: "Sepete Ekle", added: "Eklendi", checkout: "Ödemeye Geç",
    empty: "Sepetiniz henüz boş", start: "Alışverişe Başla",
    subtotal: "Ara Toplam", view_cart: "Sepete Git", all: "Tüm Ürünler",
    corporate: "Kurumsal Satış", remove: "Kaldır",
  },
  de: {
    search: "Produkt, Kategorie oder Marke suchen",
    cart: "Warenkorb", account: "Konto", login: "Anmelden",
    free_left: "bis zum Gratisversand", free_done: "Gratisversand erreicht!",
    add: "In den Warenkorb", added: "Hinzugefügt", checkout: "Zur Kasse",
    empty: "Ihr Warenkorb ist leer", start: "Jetzt einkaufen",
    subtotal: "Zwischensumme", view_cart: "Warenkorb ansehen", all: "Alle Produkte",
    corporate: "Firmenkunden", remove: "Entfernen",
  },
};

document.addEventListener("alpine:init", function () {
  /* ---- lang store ---- */
  Alpine.store("lang", {
    current: localStorage.getItem("tg_lang") || "tr",
    init() { document.documentElement.lang = this.current; },
    set(code) {
      this.current = code;
      localStorage.setItem("tg_lang", code);
      document.documentElement.lang = code;
    },
    t(key) {
      var dict = TG_STRINGS[this.current] || TG_STRINGS.tr;
      return dict[key] || TG_STRINGS.tr[key] || key;
    },
  });

  /* ---- ui store ---- */
  Alpine.store("ui", {
    drawer: false,
    mobileNav: false,
    mega: null,        // active pillar slug
    openDrawer() { this.drawer = true; document.body.style.overflow = "hidden"; },
    closeDrawer() { this.drawer = false; document.body.style.overflow = ""; },
    toggleMobile() { this.mobileNav = !this.mobileNav; document.body.style.overflow = this.mobileNav ? "hidden" : ""; },
  });

  /* ---- cart store ---- */
  Alpine.store("cart", {
    items: JSON.parse(localStorage.getItem("tg_cart") || "[]"),
    freeShip: 750, // ₺ threshold

    persist() { localStorage.setItem("tg_cart", JSON.stringify(this.items)); },

    add(product, qty) {
      qty = qty || 1;
      var line = this.items.find(function (i) { return i.id === product.id; });
      if (line) { line.qty += qty; }
      else {
        this.items.push({ id: product.id, name: product.name, price: product.price, photo: product.photo, cat: product.cat, qty: qty });
      }
      this.persist();
    },
    remove(id) { this.items = this.items.filter(function (i) { return i.id !== id; }); this.persist(); },
    setQty(id, q) {
      var line = this.items.find(function (i) { return i.id === id; });
      if (!line) return;
      line.qty = Math.max(1, q);
      this.persist();
    },
    inc(id) { var l = this.items.find(function (i) { return i.id === id; }); if (l) { l.qty++; this.persist(); } },
    dec(id) { var l = this.items.find(function (i) { return i.id === id; }); if (l) { l.qty = Math.max(1, l.qty - 1); this.persist(); } },

    get count() { return this.items.reduce(function (n, i) { return n + i.qty; }, 0); },
    get subtotal() { return this.items.reduce(function (s, i) { return s + i.price * i.qty; }, 0); },
    get remaining() { return Math.max(0, this.freeShip - this.subtotal); },
    get shipPct() { return Math.min(100, Math.round((this.subtotal / this.freeShip) * 100)); },
    fmt(v) { return tgFormatPrice(v); },
  });
});

/* ---- product card component (charge-fill add-to-cart) ------------------ */
function tgProductCard(product) {
  return {
    p: product,
    addToCart() {
      if (!this.p.stock) return;
      Alpine.store("cart").add(this.p, 1);
      Alpine.store("ui").openDrawer();
    },
    stars(r) {
      var full = Math.round(r);
      return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
    },
  };
}
window.tgProductCard = tgProductCard;

/* ---- cookie consent (persisted choice) -------------------------------- */
function tgCookie() {
  return {
    show: false,
    init() { this.show = !localStorage.getItem("tg_cookie"); },
    decide(choice) { localStorage.setItem("tg_cookie", choice); this.show = false; },
  };
}
window.tgCookie = tgCookie;

/* ---- header component (mega-menu, search, lang) ----------------------- */
function tgHeader() {
  return {
    q: "",
    mega: null,            // active pillar slug (local)
    mobileOpen: {},        // accordion state for mobile nav
    condensed: false,      // utility strip hidden on scroll-down
    lastY: 0,
    init() {
      // Bound after the header partial is injected (Alpine initTree runs init()).
      this.lastY = window.scrollY || 0;
      window.addEventListener("scroll", () => {
        var y = window.scrollY || 0;
        var dy = y - this.lastY;
        if (Math.abs(dy) < 6) return;                 // ignore sub-pixel jitter
        if (dy > 0 && y > 120) this.condensed = true; // scrolling down, past threshold
        else if (dy < 0) this.condensed = false;      // scrolling up
        this.lastY = y;
      }, { passive: true });
    },
    get cats() { return window.TG.categories; },
    setMega(slug) { this.mega = slug; },
    clearMega() { this.mega = null; },
    activeCat() { return this.cats.find((c) => c.slug === this.mega) || null; },
    submitSearch() { /* skeleton: would route to kategori.html?q= */ this.clearMega(); },
  };
}
window.tgHeader = tgHeader;
