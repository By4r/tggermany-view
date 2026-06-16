/* Partial loader — DRY header/footer without a build step.
   Usage: <div data-include="partials/header.html"></div>
   Paths are RELATIVE (works under a GitHub Pages subpath). Requires HTTP
   (fetch is blocked on file://) — serve with `npx serve .` or `python3 -m http.server`. */
(function () {
  function hydrate(el) {
    if (window.Alpine && typeof window.Alpine.initTree === "function") {
      window.Alpine.initTree(el);
    } else {
      document.addEventListener(
        "alpine:initialized",
        function () { window.Alpine.initTree(el); },
        { once: true }
      );
    }
  }

  async function loadIncludes() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-include]"));
    await Promise.all(
      nodes.map(async function (el) {
        var url = el.getAttribute("data-include");
        try {
          var res = await fetch(url);
          if (!res.ok) throw new Error(res.status + " " + res.statusText);
          el.innerHTML = await res.text();
          hydrate(el);
        } catch (err) {
          el.innerHTML =
            '<div style="padding:12px;color:#d64545;font:14px Poppins">' +
            "Partial yüklenemedi: " + url + " — yerel sunucu (http) ile çalıştırın. (" + err.message + ")" +
            "</div>";
          console.error("[include]", url, err);
        }
      })
    );
    document.dispatchEvent(new CustomEvent("includes:loaded"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
})();
