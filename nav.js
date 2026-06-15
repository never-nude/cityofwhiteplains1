/* City of White Plains — mobile navigation
   - Real slide-in drawer wired to the (previously decorative) hamburger button
   - Persistent bottom task bar on phones with the top resident actions
   - Focus trap, ESC to close, scroll lock, ARIA state. No dependencies. */
(function () {
  "use strict";

  // Top resident actions for the bottom bar. {label, i18n, href, icon, match}
  var BOTTOM = [
    { label: "Home", i18n: "bottom.home", href: "index.html", icon: "🏠", match: ["index.html", ""] },
    { label: "Pay", i18n: "bottom.pay", href: "pay.html", icon: "💳", match: ["pay.html"] },
    { label: "Pools", i18n: "bottom.rec", href: "recreation.html", icon: "🏊", match: ["recreation.html"] },
    { label: "Report", i18n: "bottom.report", href: "pay.html#report", icon: "⚠️", match: [] },
    { label: "Search", i18n: "bottom.search", href: "search.html", icon: "🔍", match: ["search.html"] }
  ];

  function currentFile() {
    var p = window.location.pathname.split("/").pop();
    return p || "index.html";
  }

  function applyLang(node) {
    if (window.WP && typeof WP.applyLang === "function") WP.applyLang(node);
  }

  function buildDrawer() {
    var nav = document.querySelector(".mainnav");
    if (!nav) return null;
    var btn = nav.querySelector(".menu-btn");
    if (!btn) return null;

    var overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    overlay.hidden = true;

    var drawer = document.createElement("aside");
    drawer.className = "nav-drawer";
    drawer.id = "nav-drawer";
    drawer.setAttribute("aria-label", "Menu");
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.hidden = true;

    var head = document.createElement("div");
    head.className = "drawer-head";
    head.innerHTML = '<span class="drawer-title" data-i18n="menu">Menu</span>' +
      '<button class="drawer-close" aria-label="Close menu" data-i18n-al="closemenu">✕</button>';
    drawer.appendChild(head);

    // search inside drawer
    var sform = document.createElement("form");
    sform.className = "search drawer-search";
    sform.setAttribute("role", "search");
    sform.setAttribute("action", "search.html");
    sform.setAttribute("method", "get");
    sform.innerHTML = '<input type="search" name="q" placeholder="Search permits, taxes, services…" data-i18n-ph="searchph" aria-label="Search the city website" autocomplete="off"><button type="submit" data-i18n="searchbtn">Search</button>';
    drawer.appendChild(sform);

    // clone primary nav links to keep them in sync per-page
    var list = document.createElement("nav");
    list.className = "drawer-links";
    list.setAttribute("aria-label", "Mobile");
    var links = nav.querySelectorAll(".wrap a");
    links.forEach(function (a) {
      var na = document.createElement("a");
      na.href = a.getAttribute("href");
      na.textContent = a.textContent;
      if (a.hasAttribute("data-i18n")) na.setAttribute("data-i18n", a.getAttribute("data-i18n"));
      if (a.classList.contains("active")) { na.classList.add("active"); na.setAttribute("aria-current", "page"); }
      list.appendChild(na);
    });
    drawer.appendChild(list);

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    var lastFocus = null;
    function focusables() {
      return drawer.querySelectorAll('a[href], button, input, [tabindex]:not([tabindex="-1"])');
    }
    function open() {
      lastFocus = document.activeElement;
      overlay.hidden = false; drawer.hidden = false;
      requestAnimationFrame(function () { drawer.classList.add("open"); overlay.classList.add("show"); });
      btn.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-lock");
      var f = focusables(); if (f.length) f[0].focus();
      document.addEventListener("keydown", onKey);
    }
    function close() {
      drawer.classList.remove("open"); overlay.classList.remove("show");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-lock");
      document.removeEventListener("keydown", onKey);
      setTimeout(function () { drawer.hidden = true; overlay.hidden = true; }, 220);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Tab") {
        var f = focusables(); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    btn.setAttribute("aria-controls", "nav-drawer");
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function () { drawer.hidden ? open() : close(); });
    overlay.addEventListener("click", close);
    head.querySelector(".drawer-close").addEventListener("click", close);

    applyLang(drawer);
    return drawer;
  }

  function buildBottomBar() {
    if (document.querySelector(".tabbar")) return;
    var cur = currentFile();
    var bar = document.createElement("nav");
    bar.className = "tabbar";
    bar.setAttribute("aria-label", "Quick actions");
    BOTTOM.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.href;
      a.className = "tab";
      var isActive = item.match.indexOf(cur) !== -1;
      if (isActive) { a.classList.add("active"); a.setAttribute("aria-current", "page"); }
      a.innerHTML = '<span class="tab-ic" aria-hidden="true">' + item.icon + '</span>' +
        '<span class="tab-lb" data-i18n="' + item.i18n + '">' + item.label + '</span>';
      bar.appendChild(a);
    });
    document.body.appendChild(bar);
    document.body.classList.add("has-tabbar");
    applyLang(bar);
  }

  function init() { buildDrawer(); buildBottomBar(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
