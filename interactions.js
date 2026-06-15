/* City of White Plains — page interactions
   - data-demo: honest modal for actions that need a real backend (payments, logins)
   - Report a Problem: working client-side form with validation + reference number (stub submit)
   - News: client-side category filtering
   - Departments: live directory filter
   No dependencies; reuses the modal styles from style.css. */
(function () {
  "use strict";
  window.WP = window.WP || {};
  function t(s) { return (window.WP && typeof WP.t === "function") ? WP.t(s) : s; }
  function esc(s) { return String(s).replace(/[<>&]/g, function (c) { return { "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]; }); }

  /* ---------- generic accessible modal ---------- */
  function openModal(title, bodyHTML) {
    if (document.getElementById("wp-modal")) return;
    var lastFocus = document.activeElement;
    var ov = document.createElement("div"); ov.className = "modal-overlay show"; ov.id = "wp-modal";
    var dlg = document.createElement("div"); dlg.className = "modal";
    dlg.setAttribute("role", "dialog"); dlg.setAttribute("aria-modal", "true"); dlg.setAttribute("aria-labelledby", "wp-modal-h");
    dlg.innerHTML =
      '<div class="modal-head"><h2 id="wp-modal-h"></h2>' +
      '<button type="button" class="modal-x" aria-label="' + t("Close") + '">✕</button></div>' +
      '<div class="modal-body">' + bodyHTML +
      '<div class="modal-actions" style="margin-top:18px;"><button type="button" class="btn modal-ok">' + t("Got it") + '</button></div></div>';
    dlg.querySelector("#wp-modal-h").textContent = title;
    ov.appendChild(dlg); document.body.appendChild(ov); document.body.classList.add("nav-lock");
    function close() { ov.remove(); document.body.classList.remove("nav-lock"); document.removeEventListener("keydown", onKey); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
    function onKey(e) {
      if (e.key === "Escape") return close();
      if (e.key === "Tab") {
        var f = dlg.querySelectorAll('a[href],button,input,textarea,select');
        if (!f.length) return; var a = f[0], b = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus(); }
        else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus(); }
      }
    }
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    dlg.querySelector(".modal-x").addEventListener("click", close);
    dlg.querySelector(".modal-ok").addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    dlg.querySelector(".modal-ok").focus();
  }

  document.addEventListener("click", function (e) {
    var trg = e.target.closest("[data-demo]");
    if (!trg) return;
    e.preventDefault();
    var label = trg.getAttribute("data-demo") || trg.textContent.trim();
    openModal(label,
      '<p class="modal-p">' + t("In the production website, this opens the secure City service for:") +
      ' <strong>' + esc(label) + '</strong>.</p>' +
      '<p class="modal-p" style="margin-top:10px;">' +
      t("This concept stubs services that need a payment processor or sign-in. The full list is in the project roadmap.") + '</p>');
  });

  /* ---------- Report a Problem ---------- */
  function initReportForm() {
    var form = document.getElementById("report-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var loc = form.elements.location, desc = form.elements.description, bad = null;
      [loc, desc].forEach(function (f) {
        if (f && !f.value.trim()) { f.setAttribute("aria-invalid", "true"); if (!bad) bad = f; }
        else if (f) f.removeAttribute("aria-invalid");
      });
      if (bad) { bad.focus(); return; }
      var ref = "WP-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);
      var ok = document.createElement("div");
      ok.className = "form-success"; ok.setAttribute("role", "status");
      ok.innerHTML = '<div class="ok-ic" aria-hidden="true">✓</div>' +
        "<h3>" + t("Request received") + "</h3>" +
        "<p>" + t("Your service request has been logged as") + " <strong>" + ref + "</strong>. " +
        t("In production this routes to the right department and emails you a confirmation. (Demo — nothing is actually submitted.)") + "</p>";
      form.replaceWith(ok);
      ok.setAttribute("tabindex", "-1"); ok.focus();
    });
  }

  /* ---------- News category filter ---------- */
  function initNewsFilter() {
    var bar = document.getElementById("news-filters"), list = document.getElementById("news-list");
    if (!bar || !list) return;
    var rows = [].slice.call(list.querySelectorAll("[data-cat]"));
    var count = document.getElementById("news-count");
    function apply(cat) {
      var n = 0;
      rows.forEach(function (r) {
        var show = cat === "all" || r.getAttribute("data-cat") === cat;
        r.hidden = !show; if (show) n++;
      });
      [].forEach.call(bar.querySelectorAll("button[data-filter]"), function (b) {
        var on = b.getAttribute("data-filter") === cat;
        b.classList.toggle("on", on); b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (count) count.textContent = n + " " + (n === 1 ? t("item") : t("items"));
    }
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]"); if (b) apply(b.getAttribute("data-filter"));
    });
    apply("all");
  }

  /* ---------- Departments directory filter ---------- */
  function initDeptFilter() {
    var inp = document.getElementById("dept-search"), grid = document.getElementById("dept-dir");
    if (!inp || !grid) return;
    var cards = [].slice.call(grid.querySelectorAll("[data-name]"));
    var count = document.getElementById("dept-count");
    function apply() {
      var q = inp.value.toLowerCase().trim(), n = 0;
      cards.forEach(function (c) {
        var hay = (c.getAttribute("data-name") + " " + (c.getAttribute("data-keywords") || "")).toLowerCase();
        var show = !q || hay.indexOf(q) !== -1;
        c.hidden = !show; if (show) n++;
      });
      if (count) count.textContent = n + " " + (n === 1 ? t("department") : t("departments"));
    }
    inp.addEventListener("input", apply); apply();
  }

  function init() { initReportForm(); initNewsFilter(); initDeptFilter(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
