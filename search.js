/* City of White Plains — client-side site search
   - Loads search-index.json
   - Live autocomplete on every masthead search box (ARIA 1.2 combobox)
   - Renders the full results page (search.html)
   Resident tasks are weighted above incidental matches. No dependencies. */
(function () {
  "use strict";
  window.WP = window.WP || {};

  // Tiny translate hook — i18n.js (if present) maps the English source string.
  function t(s) { return (window.WP && typeof WP.t === "function") ? WP.t(s) : s; }

  var INDEX = null;
  var loadPromise = null;
  var uid = 0;

  function loadIndex() {
    if (loadPromise) return loadPromise;
    loadPromise = fetch("search-index.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("index " + r.status); return r.json(); })
      .then(function (data) { INDEX = (data && data.docs) || []; return INDEX; })
      .catch(function () { INDEX = []; return INDEX; });
    return loadPromise;
  }

  function tokenize(q) {
    return (q || "").toLowerCase().trim().split(/[^a-z0-9á-úñ]+/i).filter(Boolean);
  }

  function scoreDoc(doc, tokens, raw) {
    var title = doc.title.toLowerCase();
    var kw = (doc.keywords || "").toLowerCase();
    var sum = (doc.summary || "").toLowerCase();
    var s = 0, matchedAll = true;
    for (var i = 0; i < tokens.length; i++) {
      var tok = tokens[i], ts = 0;
      if (title.indexOf(tok) !== -1) ts += 30;
      if (title.indexOf(tok) === 0) ts += 12;
      if ((" " + title).indexOf(" " + tok) !== -1) ts += 8;
      if (kw.indexOf(tok) !== -1) ts += 18;
      if ((" " + kw).indexOf(" " + tok) !== -1) ts += 6;
      if (sum.indexOf(tok) !== -1) ts += 5;
      if (ts === 0) matchedAll = false;
      s += ts;
    }
    if (!matchedAll) s *= 0.25;          // demote partial-term matches
    if (raw && title.indexOf(raw) !== -1) s += 25;
    if (s <= 0) return 0;
    return s + (doc.weight || 0) * 0.6;  // resident tasks float to the top
  }

  function search(q, limit) {
    if (!INDEX) return [];
    var raw = (q || "").toLowerCase().trim();
    var tokens = tokenize(q);
    if (!tokens.length) {
      // empty query → most useful resident tasks
      return INDEX.slice().sort(function (a, b) { return (b.weight || 0) - (a.weight || 0); })
        .slice(0, limit || 8).map(function (d) { return { doc: d, score: d.weight }; });
    }
    var scored = [];
    for (var i = 0; i < INDEX.length; i++) {
      var sc = scoreDoc(INDEX[i], tokens, raw);
      if (sc > 0) scored.push({ doc: INDEX[i], score: sc });
    }
    scored.sort(function (a, b) { return b.score - a.score || (b.doc.weight || 0) - (a.doc.weight || 0); });
    return limit ? scored.slice(0, limit) : scored;
  }
  WP.search = search;

  var TYPE_LABEL = {
    task: "Task", service: "Service", info: "Info",
    department: "Department", page: "Page", news: "News"
  };
  function typeLabel(ty) { return t(TYPE_LABEL[ty] || "Page"); }

  /* ---------- Autocomplete ---------- */
  function enhanceForm(form) {
    var input = form.querySelector('input[type="search"]');
    if (!input || input.dataset.acReady) return;
    input.dataset.acReady = "1";

    var listId = "ac-list-" + (++uid);
    var list = document.createElement("ul");
    list.className = "ac-list";
    list.id = listId;
    list.setAttribute("role", "listbox");
    list.hidden = true;
    form.appendChild(list);

    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-controls", listId);
    input.setAttribute("autocomplete", "off");

    var active = -1, items = [];

    function close() {
      list.hidden = true; list.innerHTML = ""; items = []; active = -1;
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
    }
    function go(url) { window.location.href = url; }

    function render(results) {
      list.innerHTML = ""; items = []; active = -1;
      if (!results.length) { close(); return; }
      results.forEach(function (r, i) {
        var li = document.createElement("li");
        li.className = "ac-item";
        li.id = listId + "-opt-" + i;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", "false");
        li.innerHTML = '<span class="ac-badge ac-' + r.doc.type + '">' + typeLabel(r.doc.type) +
          '</span><span class="ac-title"></span>';
        li.querySelector(".ac-title").textContent = r.doc.title;
        li.addEventListener("mousedown", function (e) { e.preventDefault(); go(r.doc.url); });
        list.appendChild(li);
        items.push({ el: li, url: r.doc.url });
      });
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
    }

    function setActive(n) {
      if (!items.length) return;
      if (active >= 0) { items[active].el.classList.remove("on"); items[active].el.setAttribute("aria-selected", "false"); }
      active = (n + items.length) % items.length;
      var el = items[active].el;
      el.classList.add("on"); el.setAttribute("aria-selected", "true");
      input.setAttribute("aria-activedescendant", el.id);
      el.scrollIntoView({ block: "nearest" });
    }

    input.addEventListener("input", function () {
      loadIndex().then(function () {
        var v = input.value.trim();
        if (!v) { close(); return; }
        render(search(v, 7));
      });
    });
    input.addEventListener("focus", function () { if (input.value.trim()) loadIndex().then(function () { render(search(input.value, 7)); }); });
    input.addEventListener("keydown", function (e) {
      if (list.hidden && (e.key === "ArrowDown" || e.key === "ArrowUp")) { loadIndex().then(function () { render(search(input.value, 7)); }); }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") {
        if (active >= 0 && items[active]) { e.preventDefault(); go(items[active].url); }
        // else: let the form submit to search.html
      } else if (e.key === "Escape") { close(); }
    });
    document.addEventListener("click", function (e) { if (!form.contains(e.target)) close(); });

    // submit → full results page
    form.setAttribute("action", "search.html");
    form.setAttribute("method", "get");
    if (input.getAttribute("onsubmit")) input.removeAttribute("onsubmit");
    form.removeAttribute("onsubmit");
    input.name = "q";
  }

  /* ---------- Results page ---------- */
  function param(name) {
    return new URLSearchParams(window.location.search).get(name) || "";
  }
  function renderResultsPage() {
    var host = document.getElementById("search-results");
    if (!host) return;
    var q = param("q");
    var heading = document.getElementById("search-heading");
    var input = document.querySelector('.search input[type="search"]');
    if (input) input.value = q;

    loadIndex().then(function () {
      var results = search(q, 40);
      if (heading) {
        heading.textContent = q
          ? t("Search results for") + " “" + q + "”"
          : t("Browse popular services");
      }
      var count = document.getElementById("search-count");
      if (count) count.textContent = q ? (results.length + " " + (results.length === 1 ? t("result") : t("results"))) : "";

      if (!results.length) {
        host.innerHTML = '<p class="no-res"></p>';
        host.querySelector(".no-res").textContent =
          t("No results found. Try a simpler word like “tax,” “permit,” or “pool.”");
        return;
      }
      var ul = document.createElement("ul");
      ul.className = "result-list";
      results.forEach(function (r) {
        var li = document.createElement("li");
        li.className = "result";
        var a = document.createElement("a");
        a.href = r.doc.url;
        a.innerHTML = '<span class="r-badge ac-' + r.doc.type + '">' + typeLabel(r.doc.type) + '</span>' +
          '<span class="r-title"></span><span class="r-sum"></span><span class="r-url"></span>';
        a.querySelector(".r-title").textContent = r.doc.title;
        a.querySelector(".r-sum").textContent = r.doc.summary || "";
        a.querySelector(".r-url").textContent = r.doc.url;
        li.appendChild(a);
        ul.appendChild(li);
      });
      host.innerHTML = "";
      host.appendChild(ul);
    });
  }

  function init() {
    var forms = document.querySelectorAll("form.search");
    if (forms.length) { loadIndex(); forms.forEach(enhanceForm); }
    renderResultsPage();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // re-translate dynamic UI when language changes
  document.addEventListener("wp:languagechange", function () {
    if (document.getElementById("search-results")) renderResultsPage();
  });
})();
