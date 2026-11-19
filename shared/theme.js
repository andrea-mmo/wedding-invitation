// Modo noche / día: botón sol-luna junto al selector de idioma. El tema se guarda y, la primera vez, sigue al del dispositivo.
(function () {
  var root = document.documentElement, KEY = "boda-theme";
  var bar = document.querySelector(".lang"); if (!bar) return;
  var b = document.createElement("button");
  b.type = "button"; b.className = "theme";
  b.innerHTML = '<svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a.7.7 0 0 0-.9-.9A10 10 0 1 0 21.4 15.5a.7.7 0 0 0-.9-.9z"/></svg>' +
    '<svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></g></svg>';
  function label() { var d = root.getAttribute("data-theme") === "dark"; b.setAttribute("aria-label", tr(d ? "Cambiar a modo día" : "Cambiar a modo noche")); b.title = b.getAttribute("aria-label"); }
  b.addEventListener("click", function (e) {
    e.stopPropagation();
    var t = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(KEY, t); } catch (er) {}
    label();
  });
  b.addEventListener("pointerdown", function (e) { e.stopPropagation(); }, true);
  bar.appendChild(b); label();
})();
