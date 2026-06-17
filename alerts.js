/* City of White Plains — alert system
   - Severity levels (notice / warning / emergency), timestamped
   - Compact + collapsed by default (highest severity shown; rest behind a toggle)
   - Dismissible per session (sessionStorage; no localStorage)
   - Working "Subscribe to alerts" modal (UI is real; submission is stubbed)
   No dependencies. */
(function () {
  "use strict";
  window.WP = window.WP || {};
  function t(s) { return (window.WP && typeof WP.t === "function") ? WP.t(s) : s; }

  // Active alerts. severity: "notice" | "warning" | "emergency"
  var ALERTS = [
    {
      id: "watermain-mamaroneck-2026-06",
      severity: "warning",
      time: "2026-06-13T08:30:00",
      title: "Water main work on Mamaroneck Avenue",
      body: "Lane closures between Main Street and Maple Avenue, June 16–18, 7 a.m.–4 p.m. Expect delays; local access maintained.",
      href: "news.html", linkText: "Details"
    },
    {
      id: "soccerfest-2026",
      severity: "notice",
      time: "2026-06-13T09:15:00",
      title: "Downtown Soccer Fest street closures this weekend",
      body: "Free resident parking and watch parties on June 14, 27 & July 11. Portions of Main Street and Mamaroneck Avenue closed during event hours.",
      href: "news-soccerfest.html", linkText: "Details"
    }
  ];

  var RANK = { emergency: 0, warning: 1, notice: 2 };
  var DKEY = "wp-alerts-dismissed";
  function dismissed() { try { return JSON.parse(sessionStorage.getItem(DKEY) || "[]"); } catch (e) { return []; } }
  function dismiss(id) {
    try { var d = dismissed(); if (d.indexOf(id) === -1) { d.push(id); sessionStorage.setItem(DKEY, JSON.stringify(d)); } } catch (e) {}
  }

  var SEV = {
    notice: { label: "Notice", icon: "ℹ" },
    warning: { label: "Warning", icon: "⚠" },
    emergency: { label: "Emergency", icon: "⛔" }
  };

  function fmtTime(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    var lang = (window.WP && WP.lang === "es") ? "es-US" : "en-US";
    try {
      return d.toLocaleDateString(lang, { month: "short", day: "numeric" }) + ", " +
        d.toLocaleTimeString(lang, { hour: "numeric", minute: "2-digit" });
    } catch (e) { return iso; }
  }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  var expanded = false;

  function buildBar(a) {
    var sev = SEV[a.severity] || SEV.notice;
    var bar = el("div", "alertbar alertbar-" + a.severity);
    bar.setAttribute("role", a.severity === "emergency" ? "alert" : "status");
    bar.dataset.id = a.id;
    var inner = el("div", "wrap alertbar-inner");
    inner.innerHTML =
      '<span class="alertbar-ic" aria-hidden="true">' + sev.icon + '</span>' +
      '<p class="alertbar-text">' +
        '<span class="alertbar-label">' + t(sev.label) + '</span> ' +
        '<span class="alertbar-title"></span> ' +
        '<span class="alertbar-body"></span> ' +
        (a.href ? '<a class="alertbar-link" href="' + a.href + '"></a> ' : '') +
        '<time class="alertbar-time" datetime="' + a.time + '"></time>' +
      '</p>' +
      '<button type="button" class="alertbar-x" aria-label="' + t("Dismiss this alert") + '">✕</button>';
    inner.querySelector(".alertbar-title").textContent = a.title;
    inner.querySelector(".alertbar-body").textContent = a.body;
    if (a.href) inner.querySelector(".alertbar-link").textContent = (a.linkText || "Details") + " →";
    inner.querySelector(".alertbar-time").textContent = t("Updated") + " " + fmtTime(a.time);
    inner.querySelector(".alertbar-x").addEventListener("click", function () {
      dismiss(a.id); bar.remove(); applyCollapse();
    });
    bar.appendChild(inner);
    return bar;
  }

  function applyCollapse() {
    var region = document.getElementById("wp-alerts"); if (!region) return;
    var bars = [].slice.call(region.querySelectorAll(".alertbar"));
    bars.forEach(function (b, i) { b.hidden = (!expanded && i > 0); });
    var extra = bars.length - 1;
    var tog = region.querySelector(".alert-toggle");
    if (tog) {
      if (extra <= 0) { tog.hidden = true; }
      else {
        tog.hidden = false;
        tog.textContent = expanded
          ? t("Show fewer")
          : ("+ " + extra + " " + (extra === 1 ? t("more update") : t("more updates")));
        tog.setAttribute("aria-expanded", expanded ? "true" : "false");
      }
    }
    var msg = region.querySelector(".alert-subrow-msg");
    if (msg) msg.textContent = bars.length === 0 ? t("No active alerts right now.") : "";
  }

  function render() {
    var main = document.querySelector("main");
    if (!main || document.getElementById("wp-alerts")) return;
    var region = el("section", "alertbar-region");
    region.id = "wp-alerts";
    region.setAttribute("aria-label", "City alerts");

    var d = dismissed();
    var active = ALERTS.filter(function (a) { return d.indexOf(a.id) === -1; })
      .sort(function (a, b) { return (RANK[a.severity] || 9) - (RANK[b.severity] || 9); });
    active.forEach(function (a) { region.appendChild(buildBar(a)); });

    var row = el("div", "alert-subrow");
    row.innerHTML = '<div class="wrap alert-subrow-inner">' +
      '<span class="alert-subrow-msg"></span>' +
      '<button type="button" class="alert-toggle" aria-expanded="false" hidden></button>' +
      '<button type="button" class="btn-link-sub" data-subscribe data-i18n="alerts.subscribe">Subscribe to alerts</button>' +
      '</div>';
    row.querySelector(".alert-toggle").addEventListener("click", function () { expanded = !expanded; applyCollapse(); });
    region.appendChild(row);

    var slot = document.getElementById("wp-alert-slot");
    if (slot) slot.appendChild(region); else main.parentNode.insertBefore(region, main);
    applyCollapse();
    if (window.WP && WP.applyLang) WP.applyLang(region);
  }

  /* ---------- Subscribe modal (stubbed submission) ---------- */
  var lastFocus = null;
  function openModal() {
    if (document.getElementById("sub-modal")) return;
    lastFocus = document.activeElement;
    var ov = el("div", "modal-overlay show"); ov.id = "sub-modal";
    var dlg = el("div", "modal");
    dlg.setAttribute("role", "dialog"); dlg.setAttribute("aria-modal", "true"); dlg.setAttribute("aria-labelledby", "sub-h");
    dlg.innerHTML =
      '<div class="modal-head"><h2 id="sub-h">Subscribe to City alerts</h2>' +
      '<button type="button" class="modal-x" aria-label="Close">✕</button></div>' +
      '<form class="modal-body" novalidate>' +
        '<p class="modal-p">Get emergency and service alerts from the City of White Plains.</p>' +
        '<label class="fld"><span>Email address</span>' +
        '<input type="email" name="email" required autocomplete="email" placeholder="you@example.com"></label>' +
        '<label class="fld"><span>Mobile number (optional, for SMS)</span>' +
        '<input type="tel" name="phone" autocomplete="tel" placeholder="(914) 555-0123"></label>' +
        '<fieldset class="fld"><legend>Which alerts?</legend>' +
          '<label class="chk"><input type="checkbox" name="sev" value="emergency" checked> Emergencies</label>' +
          '<label class="chk"><input type="checkbox" name="sev" value="warning" checked> Service warnings</label>' +
          '<label class="chk"><input type="checkbox" name="sev" value="notice"> General notices</label>' +
        '</fieldset>' +
        '<div class="modal-actions"><button type="submit" class="btn gold">Subscribe</button>' +
        '<button type="button" class="btn ghost modal-cancel">Cancel</button></div>' +
        '<p class="modal-note">Demo only — this concept does not yet send messages. See the README roadmap.</p>' +
      '</form>';
    ov.appendChild(dlg); document.body.appendChild(ov); document.body.classList.add("nav-lock");

    function close() {
      ov.remove(); document.body.classList.remove("nav-lock");
      document.removeEventListener("keydown", onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) {
      if (e.key === "Escape") return close();
      if (e.key === "Tab") {
        var f = dlg.querySelectorAll('a[href],button,input,[tabindex]:not([tabindex="-1"])');
        if (!f.length) return; var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    dlg.querySelector(".modal-x").addEventListener("click", close);
    dlg.querySelector(".modal-cancel").addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    var form = dlg.querySelector("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.email.value.trim();
      if (!email || email.indexOf("@") === -1) { form.email.focus(); form.email.setAttribute("aria-invalid", "true"); return; }
      dlg.querySelector(".modal-body").innerHTML =
        '<div class="modal-success" role="status"><div class="ok-ic" aria-hidden="true">✓</div>' +
        '<h3>You’re on the list</h3>' +
        '<p>Confirmation would be sent to <strong>' + email.replace(/[<>&]/g, "") + '</strong>. ' +
        'This concept stubs the subscription — no message is actually sent.</p>' +
        '<button type="button" class="btn modal-done">Done</button></div>';
      dlg.querySelector(".modal-done").addEventListener("click", close);
      dlg.querySelector(".modal-done").focus();
    });
    dlg.querySelector("input[name=email]").focus();
  }

  function bindSubscribe() {
    document.addEventListener("click", function (e) {
      var trg = e.target.closest("[data-subscribe]");
      if (trg) { e.preventDefault(); openModal(); }
    });
  }

  function init() { render(); bindSubscribe(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  document.addEventListener("wp:languagechange", function () {
    document.querySelectorAll(".alertbar-time").forEach(function (tEl) {
      var iso = tEl.getAttribute("datetime"); if (iso) tEl.textContent = t("Updated") + " " + fmtTime(iso);
    });
    applyCollapse();
  });
})();
