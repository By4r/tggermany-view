/* TG Germany — Alpine stores + components.
   Flat ttec-clean storefront (no charge signature). FAZ 0 genişletme:
   auth / wishlist / toast / orders / addresses / warranties / reviews / returns /
   recent stores + seed util (demo-işaretli) + requireAuth guard + cart kupon.
   localStorage mock — gerçek backend/PSP/auth/e-posta YOK. */

/* ---- Money ------------------------------------------------------------- */
function tgFormatPrice(v) {
  return Number(v).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₺";
}
window.tgFormatPrice = tgFormatPrice;

/* ---- localStorage helpers --------------------------------------------- */
function tgLoad(key, fallback) {
  try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
}
function tgSave(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
window.tgLoad = tgLoad; window.tgSave = tgSave;

/* ---- i18n (skeleton: TR primary, DE stub) ------------------------------ */
var TG_STRINGS = {
  tr: {
    search: "Ürün, kategori veya marka ara",
    cart: "Sepetim", account: "Hesabım", login: "Giriş Yap", register: "Kayıt Ol",
    free_left: "ücretsiz kargoya kaldı", free_done: "Ücretsiz kargo kazandınız!",
    add: "Sepete Ekle", added: "Eklendi", checkout: "Ödemeye Geç",
    empty: "Sepetiniz henüz boş", start: "Alışverişe Başla",
    subtotal: "Ara Toplam", view_cart: "Sepete Git", all: "Tüm Ürünler",
    corporate: "Kurumsal Satış", remove: "Kaldır",
    hello: "Merhaba", orders: "Siparişlerim", addresses: "Adreslerim",
    favorites: "Favorilerim", logout: "Çıkış Yap",
  },
  de: {
    search: "Produkt, Kategorie oder Marke suchen",
    cart: "Warenkorb", account: "Konto", login: "Anmelden", register: "Registrieren",
    free_left: "bis zum Gratisversand", free_done: "Gratisversand erreicht!",
    add: "In den Warenkorb", added: "Hinzugefügt", checkout: "Zur Kasse",
    empty: "Ihr Warenkorb ist leer", start: "Jetzt einkaufen",
    subtotal: "Zwischensumme", view_cart: "Warenkorb ansehen", all: "Alle Produkte",
    corporate: "Firmenkunden", remove: "Entfernen",
    hello: "Hallo", orders: "Meine Bestellungen", addresses: "Meine Adressen",
    favorites: "Favoriten", logout: "Abmelden",
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

  /* ---- toast store (site-wide bildirim) ---- */
  Alpine.store("toast", {
    items: [],
    _id: 0,
    push(msg, type) {
      var id = ++this._id;
      this.items.push({ id: id, msg: msg, type: type || "success" });
      var self = this;
      setTimeout(function () { self.dismiss(id); }, 2600);
    },
    dismiss(id) { this.items = this.items.filter(function (t) { return t.id !== id; }); },
  });

  /* ---- cart store ---- */
  Alpine.store("cart", {
    items: tgLoad("tg_cart", []),
    coupon: tgLoad("tg_coupon", null),   // { code, rate, label }
    freeShip: 750,    // ₺ ücretsiz kargo eşiği
    shipFee: 49.9,    // eşik altı sabit kargo

    persist() { tgSave("tg_cart", this.items); },

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
    clear() { this.items = []; this.coupon = null; tgSave("tg_coupon", null); this.persist(); },

    applyCoupon(code) {
      var c = window.TG.getCoupon(code);
      if (!c) { this.coupon = null; tgSave("tg_coupon", null); return false; }
      this.coupon = { code: c.code, rate: c.rate, label: c.label };
      tgSave("tg_coupon", this.coupon);
      return true;
    },
    clearCoupon() { this.coupon = null; tgSave("tg_coupon", null); },

    get count() { return this.items.reduce(function (n, i) { return n + i.qty; }, 0); },
    get subtotal() { return this.items.reduce(function (s, i) { return s + i.price * i.qty; }, 0); },
    get discount() { return this.coupon ? Math.round(this.subtotal * this.coupon.rate * 100) / 100 : 0; },
    get remaining() { return Math.max(0, this.freeShip - this.subtotal); },
    get shipPct() { return Math.min(100, Math.round((this.subtotal / this.freeShip) * 100)); },
    get shipping() {
      if (this.count === 0) return 0;
      return (this.subtotal - this.discount) >= this.freeShip ? 0 : this.shipFee;
    },
    get grandTotal() { return Math.max(0, this.subtotal - this.discount + this.shipping); },
    fmt(v) { return tgFormatPrice(v); },
  });

  /* ---- wishlist store (favoriler, site geneli senkron) ---- */
  Alpine.store("wishlist", {
    ids: tgLoad("tg_wishlist", []),
    persist() { tgSave("tg_wishlist", this.ids); },
    has(id) { return this.ids.indexOf(id) !== -1; },
    toggle(id) {
      if (this.has(id)) { this.ids = this.ids.filter(function (x) { return x !== id; }); Alpine.store("toast").push("Favorilerden çıkarıldı"); }
      else { this.ids.push(id); Alpine.store("toast").push("Favorilere eklendi"); }
      this.persist();
    },
    remove(id) { this.ids = this.ids.filter(function (x) { return x !== id; }); this.persist(); },
    get count() { return this.ids.length; },
    get products() {
      return this.ids.map(function (id) { return window.TG.getProduct(id); }).filter(Boolean);
    },
  });

  /* ---- addresses store ---- */
  Alpine.store("addresses", {
    list: tgLoad("tg_addresses", []),
    persist() { tgSave("tg_addresses", this.list); },
    add(a) {
      a.id = "adr-" + Date.now();
      if (a.varsayilan || this.list.length === 0) { this.list.forEach(function (x) { x.varsayilan = false; }); a.varsayilan = true; }
      this.list.push(a); this.persist(); return a.id;
    },
    update(id, patch) {
      var a = this.list.find(function (x) { return x.id === id; });
      if (!a) return;
      Object.assign(a, patch);
      if (patch.varsayilan) { this.list.forEach(function (x) { if (x.id !== id) x.varsayilan = false; }); }
      this.persist();
    },
    remove(id) {
      this.list = this.list.filter(function (x) { return x.id !== id; });
      if (this.list.length && !this.list.some(function (x) { return x.varsayilan; })) this.list[0].varsayilan = true;
      this.persist();
    },
    setDefault(id) { this.update(id, { varsayilan: true }); },
    get default() { return this.list.find(function (x) { return x.varsayilan; }) || this.list[0] || null; },
  });

  /* ---- orders store ---- */
  Alpine.store("orders", {
    list: tgLoad("tg_orders", []),
    _seq: tgLoad("tg_order_seq", 0),
    persist() { tgSave("tg_orders", this.list); tgSave("tg_order_seq", this._seq); },
    nextId() {
      this._seq += 1;
      var d = new Date();
      var ymd = String(d.getFullYear()).slice(2) + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2);
      return "TG-" + ymd + "-" + ("00" + this._seq).slice(-3);
    },
    create(order) {
      order.id = order.id || this.nextId();
      order.date = order.date || new Date().toISOString();
      order.status = order.status || "Hazırlanıyor";
      this.list.unshift(order);
      this.persist();
      return order.id;
    },
    get(id) { return this.list.find(function (o) { return o.id === id; }) || null; },
    /* misafir takip: e-posta + sipariş no */
    find(email, id) {
      return this.list.find(function (o) {
        return o.id === id && (!email || (o.email || "").toLowerCase() === (email || "").toLowerCase());
      }) || null;
    },
  });

  /* ---- warranties store (ek garanti kayıtları) ---- */
  Alpine.store("warranties", {
    list: tgLoad("tg_warranties", []),
    persist() { tgSave("tg_warranties", this.list); },
    add(w) {
      w.id = "wr-" + Date.now();
      w.durum = w.durum || "İnceleniyor";
      w.tarih = w.tarih || new Date().toISOString();
      this.list.unshift(w); this.persist(); return w.id;
    },
  });

  /* ---- reviews store (ürün yorumları) ---- */
  Alpine.store("reviews", {
    list: tgLoad("tg_reviews", []),
    persist() { tgSave("tg_reviews", this.list); },
    add(r) { r.tarih = new Date().toISOString(); this.list.unshift(r); this.persist(); },
    forProduct(id) { return this.list.filter(function (r) { return r.productId === id; }); },
  });

  /* ---- returns store (iade talepleri) ---- */
  Alpine.store("returns", {
    list: tgLoad("tg_returns", []),
    persist() { tgSave("tg_returns", this.list); },
    add(r) {
      r.id = "rt-" + Date.now(); r.durum = "Talep alındı"; r.tarih = new Date().toISOString();
      this.list.unshift(r); this.persist(); return r.id;
    },
    forOrder(id) { return this.list.filter(function (r) { return r.orderId === id; }); },
  });

  /* ---- recently viewed ---- */
  Alpine.store("recent", {
    ids: tgLoad("tg_recent", []),
    push(id) {
      this.ids = [id].concat(this.ids.filter(function (x) { return x !== id; })).slice(0, 8);
      tgSave("tg_recent", this.ids);
    },
    get products() {
      return this.ids.map(function (id) { return window.TG.getProduct(id); }).filter(Boolean);
    },
  });

  /* ---- auth store (UI-only, localStorage mock) ---- */
  Alpine.store("auth", {
    loggedIn: false,
    user: null,
    init() {
      tgEnsureDemoUser();   // giriş prefill'i (tgDemo.email/password) hep çalışsın diye kayıtlı demo kullanıcı
      var a = tgLoad("tg_auth", null);
      if (a && a.loggedIn) { this.loggedIn = true; this.user = tgLoad("tg_user", null); }
    },
    _users() { return tgLoad("tg_users", []); },
    _setSession(user) {
      this.user = user; this.loggedIn = true;
      tgSave("tg_user", user);
      tgSave("tg_auth", { loggedIn: true, token: "mock-" + Date.now(), email: user.email });
      tgSeedIfNeeded();
    },
    register(data) {
      var users = this._users();
      if (users.some(function (u) { return (u.email || "").toLowerCase() === (data.email || "").toLowerCase(); })) {
        return { ok: false, error: "Bu e-posta zaten kayıtlı." };
      }
      var user = { ad: data.ad, soyad: data.soyad, email: data.email, telefon: data.telefon || "", password: data.password, verified: false, marketingOptIn: !!data.marketingOptIn };
      users.push(user); tgSave("tg_users", users);
      this._setSession(user);
      return { ok: true };
    },
    login(email, password) {
      var users = this._users();
      var u = users.find(function (x) { return (x.email || "").toLowerCase() === (email || "").toLowerCase() && x.password === password; });
      if (!u) return { ok: false, error: "E-posta veya şifre hatalı." };
      this._setSession(u);
      return { ok: true };
    },
    /* sosyal → anında mock giriş (UI-only) */
    social(provider) {
      var email = provider.toLowerCase() + "-kullanici@tgmail.com";
      var users = this._users();
      var u = users.find(function (x) { return x.email === email; });
      if (!u) { u = { ad: "TG", soyad: "Üye", email: email, telefon: "", password: null, verified: true, social: provider }; users.push(u); tgSave("tg_users", users); }
      this._setSession(u);
      return { ok: true };
    },
    verifyEmail() { if (this.user) { this.user.verified = true; tgSave("tg_user", this.user); } },
    updateProfile(patch) {
      if (!this.user) return;
      var email = this.user.email;
      Object.assign(this.user, patch);
      tgSave("tg_user", this.user);
      var users = this._users();
      var u = users.find(function (x) { return x.email === email; });
      if (u) { Object.assign(u, patch); tgSave("tg_users", users); }
    },
    logout() {
      this.loggedIn = false; this.user = null;
      localStorage.removeItem("tg_auth");
      // tg_cart / tg_wishlist intentionally kept (UX standard)
    },
    /* "Verileri Sıfırla" — demo seed + sipariş/adres/favori temizle (boş-state testi) */
    resetData() {
      ["tg_orders", "tg_order_seq", "tg_addresses", "tg_wishlist", "tg_warranties", "tg_reviews", "tg_returns", "tg_recent", "tg_seed", "tg_coupon"].forEach(function (k) { localStorage.removeItem(k); });
      Alpine.store("orders").list = []; Alpine.store("orders")._seq = 0;
      Alpine.store("addresses").list = [];
      Alpine.store("wishlist").ids = [];
      Alpine.store("warranties").list = [];
      Alpine.store("reviews").list = [];
      Alpine.store("returns").list = [];
      Alpine.store("recent").ids = [];
      Alpine.store("cart").clearCoupon();
      Alpine.store("toast").push("Veriler sıfırlandı");
    },
    get fullName() { return this.user ? (this.user.ad + " " + this.user.soyad).trim() : ""; },
  });

  // init stores that need it (Alpine calls init() automatically for stores)
  Alpine.store("auth").init();
  Alpine.store("lang").init();
  tgSeedIfNeeded();
});

/* ---- SEED-DEFAULT: girişli + henüz seed edilmemişse demo veri yükle ----
   Demo siparişler TG-DEMO-* ile işaretli; gerçek checkout siparişiyle karışmaz.
   Misafire seed YOK. "Verileri Sıfırla" ile boş-state test edilir. */
function tgSeedIfNeeded() {
  if (!window.Alpine) return;
  var auth = Alpine.store("auth");
  if (!auth || !auth.loggedIn) return;
  if (localStorage.getItem("tg_seed")) return;

  var orders = Alpine.store("orders");
  var addresses = Alpine.store("addresses");
  var wishlist = Alpine.store("wishlist");
  var name = (auth.user && auth.user.ad ? auth.user.ad + " " : "") + (auth.user && auth.user.soyad ? auth.user.soyad : "TG Üye");

  if (!addresses.list.length) {
    addresses.list.push({ id: "adr-demo-1", baslik: "Ev", ad: auth.user.ad || "TG", soyad: auth.user.soyad || "Üye", telefon: "", il: "İstanbul", ilce: "Kadıköy", adres: "Örnek Mah. Demo Sok. No:1 D:2", varsayilan: true, demo: true });
    addresses.persist();
  }
  if (!orders.list.length) {
    var p1 = window.TG.getProduct("p10"), p2 = window.TG.getProduct("p4"), p3 = window.TG.getProduct("p2");
    var addr = addresses.default;
    orders.list.push({
      id: "TG-DEMO-002", demo: true, date: new Date(Date.now() - 6 * 864e5).toISOString(), status: "Kargoda", email: auth.user.email,
      items: [{ id: p1.id, name: p1.name, price: p1.price, photo: p1.photo, qty: 1 }],
      address: addr, shipping: "Standart Kargo",
      totals: { ara: p1.price, indirim: 0, kargo: 0, genel: p1.price },
    });
    orders.list.push({
      id: "TG-DEMO-001", demo: true, date: new Date(Date.now() - 21 * 864e5).toISOString(), status: "Teslim Edildi", email: auth.user.email,
      items: [
        { id: p2.id, name: p2.name, price: p2.price, photo: p2.photo, qty: 2 },
        { id: p3.id, name: p3.name, price: p3.price, photo: p3.photo, qty: 1 },
      ],
      address: addr, shipping: "Standart Kargo",
      totals: { ara: p2.price * 2 + p3.price, indirim: 0, kargo: 49.9, genel: p2.price * 2 + p3.price + 49.9 },
    });
    orders.persist();
  }
  if (!wishlist.ids.length) { wishlist.ids = ["p1", "p6", "p8"]; wishlist.persist(); }

  localStorage.setItem("tg_seed", "1");
}
window.tgSeedIfNeeded = tgSeedIfNeeded;

/* ---- requireAuth guard — korumalı sayfalar için ----
   Girişli değilse giris.html?next=<bu sayfa>'ya yönlendirir, false döner. */
function tgRequireAuth() {
  var a = window.Alpine && Alpine.store("auth");
  if (a && a.loggedIn) return true;
  var here = location.pathname.split("/").pop() + location.hash;
  location.href = "giris.html?next=" + encodeURIComponent(here || "hesabim.html");
  return false;
}
window.tgRequireAuth = tgRequireAuth;

/* ---- product card component ------------------------------------------- */
function tgProductCard(product) {
  return {
    p: product,
    addToCart() {
      if (!this.p.stock) return;
      Alpine.store("cart").add(this.p, 1);
      Alpine.store("ui").openDrawer();
    },
    toggleFav() { Alpine.store("wishlist").toggle(this.p.id); },
    get faved() { return Alpine.store("wishlist").has(this.p.id); },
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

/* ---- header component (mega-menu, search, account menu) --------------- */
function tgHeader() {
  return {
    q: "",
    mega: null,
    mobileOpen: {},
    condensed: false,
    accountOpen: false,    // hesap dropdown (girişli)
    lastY: 0,
    init() {
      this.lastY = window.scrollY || 0;
      var ticking = false;
      var lockUntil = 0;
      var self = this;
      var evaluate = function () {
        ticking = false;
        var y = window.scrollY || 0;
        var now = (window.performance && performance.now()) || Date.now();
        if (now < lockUntil) { self.lastY = y; return; }
        var dy = y - self.lastY;
        if (Math.abs(dy) < 10) return;
        var next = self.condensed;
        if (dy > 0 && y > 160) next = true;
        else if (dy < 0 || y < 80) next = false;
        if (next !== self.condensed) { self.condensed = next; lockUntil = now + 450; }
        self.lastY = y;
      };
      window.addEventListener("scroll", function () {
        if (!ticking) { ticking = true; requestAnimationFrame(evaluate); }
      }, { passive: true });
    },
    searchOpen: false,
    get cats() { return window.TG.categories; },
    setMega(slug) { this.mega = slug; },
    clearMega() { this.mega = null; },
    activeCat() { return this.cats.find((c) => c.slug === this.mega) || null; },
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
      if (this.searchOpen) this.$nextTick(() => { var el = this.$refs.searchInput; if (el) el.focus(); });
    },
    closeSearch() { this.searchOpen = false; },
    clearQuery() { this.q = ""; this.$nextTick(() => { var el = this.$refs.searchInput; if (el) el.focus(); }); },
    results() {
      var q = (this.q || "").trim();
      if (q.length < 2) return [];
      return window.TG.search(q).slice(0, 6);
    },
    fmt(v) { return window.tgFormatPrice(v); },
    submitSearch() {
      var q = (this.q || "").trim();
      this.searchOpen = false; this.clearMega();
      if (q) location.href = "arama.html?q=" + encodeURIComponent(q);
    },
    logout() {
      this.accountOpen = false;
      Alpine.store("auth").logout();
      Alpine.store("toast").push("Çıkış yapıldı");
      location.href = "index.html";
    },
  };
}
window.tgHeader = tgHeader;

/* ---- global toast host (her sayfada body sonunda x-teleport) ----------- */
function tgToastHost() { return {}; }
window.tgToastHost = tgToastHost;

/* ===== Wave: form prefill + validation timing ==========================
   ÖNEMLİ: tgDemo yalnızca FORM INPUT demo değerleridir (kullanıcının gireceği
   örnek veriler). Site'nin GERÇEK iletişim verisi (footer/header telefon/adres/
   e-posta = .data-tbd) BUNUNLA DEĞİŞMEZ; o placeholder kalır. */
window.tgDemo = {
  // kimlik / iletişim (kullanıcının kendi gireceği örnek)
  ad: "Yasin", soyad: "Demir",
  email: "demo@tgkullanici.com",        // giriş için — kayıtlı demo kullanıcı (tgEnsureDemoUser)
  emailNew: "yeni.uye@tgkullanici.com", // KAYIT için — henüz kayıtlı olmayan, "zaten kayıtlı" hatası vermez
  password: "demo1234",
  telefon: "532 000 00 00",
  // adres
  il: "İstanbul", ilce: "Kadıköy", adres: "Örnek Mah. Demo Cad. No:12 D:4", adresBaslik: "Ev",
  // kart (mock — gerçek PSP yok)
  cardName: "YASIN DEMIR", cardNo: "4242 4242 4242 4242", cardExp: "12/28", cardCvv: "123",
  // kurumsal / form metinleri
  firma: "Demo Teknoloji A.Ş.", yetkili: "Yasin Demir", adet: "250",
  mesaj: "Ürünleriniz ve kurumsal iş birliği hakkında bilgi almak istiyorum.",
  // ek garanti / sipariş takip
  seriNo: "TG-FN-201-000123", satinAlinanYer: "TG Germany Online",
  satinAlmaTarihi: "2026-05-01", siparisNo: "TG-DEMO-001",
};

/* Kayıtlı demo kullanıcı (idempotent) — giriş prefill'i hep çalışsın. */
function tgEnsureDemoUser() {
  var users = tgLoad("tg_users", []);
  if (!users.some(function (u) { return (u.email || "").toLowerCase() === window.tgDemo.email; })) {
    users.push({ ad: window.tgDemo.ad, soyad: window.tgDemo.soyad, email: window.tgDemo.email, telefon: window.tgDemo.telefon, password: window.tgDemo.password, verified: true });
    tgSave("tg_users", users);
  }
}
window.tgEnsureDemoUser = tgEnsureDemoUser;

/* Validation timing mixin — hata yalnız blur(touch) veya submit'ten SONRA görünür.
   Kullanım: x-data="Object.assign(tgFormUX(), { ...kendi form state... })"
   input'ta @blur="touch('email')"; hata blokunda x-show="showErr('email') && !valid('email')". */
function tgFormUX() {
  return {
    touched: {},
    submitted: false,
    touch(field) { this.touched[field] = true; },
    touchAll(fields) { var t = this; (fields || []).forEach(function (f) { t.touched[f] = true; }); this.submitted = true; },
    showErr(field) { return this.submitted || !!this.touched[field]; },
    resetUX() { this.touched = {}; this.submitted = false; },
  };
}
window.tgFormUX = tgFormUX;
