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

  /* ---------- Department detail (department.html?d=slug) ---------- */
  function deptLink(item) {
    if (item.demo) return '<a href="#" data-demo="' + esc(item.t) + '">' + esc(item.t) + "</a>";
    var h = item.h || "#";
    if (/^https?:/.test(h)) return '<a href="' + h + '" target="_blank" rel="noopener">' + esc(item.t) + ' <span class="ext" aria-hidden="true">↗</span><span class="vh"> (opens a new site)</span></a>';
    return '<a href="' + h + '">' + esc(item.t) + "</a>";
  }
  function renderDepartment() {
    var host = document.getElementById("dept-detail");
    if (!host || !window.WP_DEPTS) return;
    var slug = new URLSearchParams(window.location.search).get("d");
    var d = null;
    for (var i = 0; i < window.WP_DEPTS.length; i++) if (window.WP_DEPTS[i].slug === slug) { d = window.WP_DEPTS[i]; break; }
    var crumb = document.getElementById("dept-crumb");
    if (!d) {
      document.title = "Department not found · City of White Plains";
      if (crumb) crumb.textContent = "Not found";
      host.innerHTML = '<div class="page-hd"><div class="wrap"><h2>Department not found</h2>' +
        '<p>We couldn\'t find that department. <a href="departments.html" style="color:#fff;text-decoration:underline;">Browse all departments →</a></p></div></div>';
      return;
    }
    document.title = d.name + " · City of White Plains";
    if (crumb) crumb.textContent = d.name;

    var head = '<div class="page-hd"><div class="wrap"><div class="kick">' + esc(d.group || "City Department") + '</div>' +
      "<h2>" + esc(d.name) + "</h2><p>" + esc(d.tagline || "") + "</p></div></div>";

    var ext = d.external ? '<div class="callout-ext"><p>This department maintains its own website. ' +
      '<a href="' + d.external + '" target="_blank" rel="noopener">Visit it directly ↗</a></p></div>' : "";

    var services = (d.services || []).map(function (s) { return "<li>" + deptLink(s) + "</li>"; }).join("");
    var faqs = (d.faqs && d.faqs.length)
      ? "<h3>Frequently asked</h3>" + d.faqs.map(function (f) {
          return '<details class="faq"><summary>' + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>";
        }).join("")
      : "";
    var related = (d.related || []).map(function (r) {
      var x = /^https?:/.test(r.h) ? ' target="_blank" rel="noopener"' : "";
      return '<a href="' + r.h + '"' + x + ">" + esc(r.t) + "</a>";
    }).join("");

    var body = '<div class="wrap"><div class="layout"><div class="prose">' +
      ext +
      "<h3>About this department</h3><p>" + esc(d.overview) + "</p>" +
      "<h3>Services</h3><ul class=\"svc-list\">" + services + "</ul>" +
      faqs +
      '</div><aside class="side">' +
        '<div class="side-box contact"><h4>Contact</h4><p><strong>' + esc(d.name) + "</strong><br>" +
          esc(d.contact.office) + "<br><br><strong>Phone:</strong> " + esc(d.contact.phone) +
          "<br><strong>Hours:</strong> " + esc(d.contact.hours) + "</p></div>" +
        (related ? '<div class="side-box"><h4>Related</h4>' + related + "</div>" : "") +
        '<div class="side-box"><h4>Quick actions</h4>' +
          '<a href="pay.html">Pay a bill</a><a href="pay.html#report">Report a problem</a>' +
          '<a href="departments.html">All departments</a></div>' +
      "</aside></div></div>";

    host.innerHTML = head + body;
  }

  function init() { initReportForm(); initNewsFilter(); initDeptFilter(); renderDepartment(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
