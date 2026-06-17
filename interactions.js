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

  /* ---------- Real destinations for what used to be demo stubs ----------
     Transactional/official actions link out to the live City, County, State,
     or transit service; informational ones route to a real in-site page.
     Anything mapped here stops being a "concept" modal and becomes a real link. */
  var WP_LINKS = {
    // payments & permits → official City portals
    "Property tax payment": "https://cwp.munisselfservice.com/citizens/RealEstate/Default.aspx?mode=new",
    "Water & sewer payment": "https://www.cityofwhiteplains.com/820/Online-Payments",
    "Permit fee payment": "https://www.cityofwhiteplains.com/820/Online-Payments",
    "Parking ticket payment": "https://www.cityofwhiteplains.com/331/Pay-Parking-Tickets",
    "Parking permit application": "https://whiteplains.thepermitportal.com/",
    "Building permit application": "https://www.cityofwhiteplains.com/115/Building-Permits-Applications",
    "Business license application": "https://www.cityofwhiteplains.com/814/Applications-Permits",
    "Dog license application": "https://www.cityofwhiteplains.com/88/City-Clerk",
    "Special event permit": "https://www.cityofwhiteplains.com/814/Applications-Permits",
    "Request a certificate of occupancy": "https://www.cityofwhiteplains.com/86/Building",
    "Schedule an inspection": "https://www.cityofwhiteplains.com/123/Inspection-Information",
    // clerk / vital records / voting
    "Marriage license": "https://www.cityofwhiteplains.com/318/Marriage-Licenses",
    "Apply for a marriage license": "https://www.cityofwhiteplains.com/318/Marriage-Licenses",
    "Vital record (birth, marriage, death)": "https://www.cityofwhiteplains.com/317/Vital-Records",
    "Request a vital record": "https://www.cityofwhiteplains.com/317/Vital-Records",
    "File a FOIL records request": "foil.html",
    "File a claim against the City": "https://www.cityofwhiteplains.com/88/City-Clerk",
    "Register to vote": "https://www.ny.gov/services/register-vote",
    // assessor / finance / budget
    "Look up a property assessment": "https://www.cityofwhiteplains.com/84/Assessor",
    "View the annual assessment roll": "https://www.cityofwhiteplains.com/84/Assessor",
    "File a grievance with the Board of Assessment Review": "https://www.cityofwhiteplains.com/84/Assessor",
    "View quarterly financial reports": "https://www.cityofwhiteplains.com/92/Finance",
    "Adopted City budget": "https://www.cityofwhiteplains.com/301/Budget",
    "Capital improvement plan": "https://www.cityofwhiteplains.com/301/Budget",
    "See the capital improvement plan": "https://www.cityofwhiteplains.com/301/Budget",
    // planning / zoning / maps
    "Zoning lookup": "https://www.cityofwhiteplains.com/808/Maps-Plans-Zoning",
    "Look up zoning for a property": "https://www.cityofwhiteplains.com/808/Maps-Plans-Zoning",
    "GIS / City maps": "https://www.cityofwhiteplains.com/808/Maps-Plans-Zoning",
    "Explore City maps & GIS": "https://www.cityofwhiteplains.com/808/Maps-Plans-Zoning",
    "Browse open data": "https://www.cityofwhiteplains.com/808/Maps-Plans-Zoning",
    "Start a site plan review": "https://www.cityofwhiteplains.com/99/Planning",
    "Comprehensive plan & studies": "https://www.cityofwhiteplains.com/99/Planning",
    // procurement / jobs
    "Open bids & RFPs": "https://www.cityofwhiteplains.com/801/Bid-Opportunities",
    "View open bids & RFPs": "https://www.cityofwhiteplains.com/801/Bid-Opportunities",
    "Surplus property auctions": "https://www.cityofwhiteplains.com/356/Purchasing",
    "Register as a City vendor": "https://www.cityofwhiteplains.com/356/Purchasing",
    "See current City job openings": "https://www.cityofwhiteplains.com/Jobs.aspx",
    "Civil service exams": "https://www.cityofwhiteplains.com/98/Personnel",
    "Civil service exam schedule": "https://www.cityofwhiteplains.com/98/Personnel",
    "Employee resources": "https://www.cityofwhiteplains.com/98/Personnel",
    // transit (external)
    "Metro-North service": "https://new.mta.info/agencies/metro-north-railroad",
    "Bee-Line bus & OMNY": "https://transportation.westchestergov.com/",
    "Find a City garage": "https://www.cityofwhiteplains.com/97/Parking-Traffic",
    // public safety → real in-site department page
    "File a police report": "department.html?d=public-safety",
    "Non-emergency police line": "department.html?d=public-safety",
    "Fire prevention & permits": "department.html?d=public-safety",
    // informational → real in-site pages
    "Set up a payment plan": "payment-plans.html",
    "Facility rentals": "recreation.html",
    "Program Guide (PDF)": "recreation.html",
    "See the programming schedule": "recreation.html",
    "Economic development": "business.html",
    "Bulk pickup scheduling": "trash.html",
    "Browse City multimedia": "news.html",
    "Subscribe to the City calendar feed": "calendar.ics"
  };
  function isExternal(url) { return /^https?:/.test(url); }
  function upgradeStubLinks(root) {
    (root || document).querySelectorAll("[data-demo]").forEach(function (el) {
      var url = WP_LINKS[el.getAttribute("data-demo")];
      if (!url) return;                 // no real target yet → leave as honest modal
      el.removeAttribute("data-demo");
      if (el.tagName === "A") {
        el.setAttribute("href", url);
        if (isExternal(url)) {
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener");
          if (el.children.length === 0 && !/↗/.test(el.textContent)) {
            el.insertAdjacentHTML("beforeend", ' <span class="ext" aria-hidden="true">↗</span><span class="vh"> (opens a new site)</span>');
          }
        }
      } else {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          if (isExternal(url)) window.open(url, "_blank", "noopener");
          else window.location.href = url;
        });
      }
    });
  }

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
        t("In production this routes to the right department and emails you a confirmation.") + "</p>";
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

  /* body-phrase translator for JS-injected dynamic content (depts, events) */
  function tb(s) { return (window.WP && typeof WP.tBody === "function") ? WP.tBody(s) : s; }

  /* ---------- Department detail (department.html?d=slug) ---------- */
  function deptLink(item) {
    if (item.demo) return '<a href="#" data-demo="' + esc(item.t) + '">' + esc(tb(item.t)) + "</a>";
    var h = item.h || "#";
    if (/^https?:/.test(h)) return '<a href="' + h + '" target="_blank" rel="noopener">' + esc(tb(item.t)) + ' <span class="ext" aria-hidden="true">↗</span><span class="vh"> (opens a new site)</span></a>';
    return '<a href="' + h + '">' + esc(tb(item.t)) + "</a>";
  }
  function renderDepartment() {
    var host = document.getElementById("dept-detail");
    if (!host || !window.WP_DEPTS) return;
    var slug = new URLSearchParams(window.location.search).get("d");
    var d = null;
    for (var i = 0; i < window.WP_DEPTS.length; i++) if (window.WP_DEPTS[i].slug === slug) { d = window.WP_DEPTS[i]; break; }
    var crumb = document.getElementById("dept-crumb");
    if (!d) {
      document.title = t("Department not found") + " · City of White Plains";
      if (crumb) crumb.textContent = t("Not found");
      host.innerHTML = '<div class="page-hd"><div class="wrap"><h2>' + t("Department not found") + '</h2>' +
        '<p>' + t("We couldn't find that department.") + ' <a href="departments.html" style="color:#fff;text-decoration:underline;">' + t("Browse all departments →") + '</a></p></div></div>';
      return;
    }
    document.title = d.name + " · City of White Plains";
    if (crumb) crumb.textContent = tb(d.name);

    var head = '<div class="page-hd"><div class="wrap"><div class="kick">' + esc(tb(d.group || "City Department")) + '</div>' +
      "<h2>" + esc(tb(d.name)) + "</h2><p>" + esc(tb(d.tagline || "")) + "</p></div></div>";

    var ext = d.external ? '<div class="callout-ext"><p>' + t("This department maintains its own website.") + ' ' +
      '<a href="' + d.external + '" target="_blank" rel="noopener">' + t("Visit it directly ↗") + '</a></p></div>' : "";

    var services = (d.services || []).map(function (s) { return "<li>" + deptLink(s) + "</li>"; }).join("");
    var faqs = (d.faqs && d.faqs.length)
      ? "<h3>" + t("Frequently asked") + "</h3>" + d.faqs.map(function (f) {
          return '<details class="faq"><summary>' + esc(tb(f.q)) + "</summary><p>" + esc(tb(f.a)) + "</p></details>";
        }).join("")
      : "";
    var related = (d.related || []).map(function (r) {
      var x = /^https?:/.test(r.h) ? ' target="_blank" rel="noopener"' : "";
      return '<a href="' + r.h + '"' + x + ">" + esc(tb(r.t)) + "</a>";
    }).join("");

    var body = '<div class="wrap"><div class="layout"><div class="prose">' +
      ext +
      "<h3>" + t("About this department") + "</h3><p>" + esc(tb(d.overview)) + "</p>" +
      "<h3>" + t("Services") + "</h3><ul class=\"svc-list\">" + services + "</ul>" +
      faqs +
      '</div><aside class="side">' +
        '<div class="side-box contact"><h4>' + t("Contact") + '</h4><p><strong>' + esc(tb(d.name)) + "</strong><br>" +
          esc(tb(d.contact.office)) + "<br><br><strong>" + t("Phone:") + "</strong> " + esc(d.contact.phone) +
          "<br><strong>" + t("Hours:") + "</strong> " + esc(tb(d.contact.hours)) + "</p></div>" +
        (related ? '<div class="side-box"><h4>' + t("Related") + '</h4>' + related + "</div>" : "") +
        '<div class="side-box"><h4>' + t("Quick actions") + '</h4>' +
          '<a href="pay.html">' + t("Pay a bill") + '</a><a href="pay.html#report">' + t("Report a problem") + '</a>' +
          '<a href="departments.html">' + t("All departments") + '</a></div>' +
      "</aside></div></div>";

    host.innerHTML = head + body;
  }

  /* ---------- Trash & recycling: compute upcoming collection dates ---------- */
  function initTrash() {
    var sel = document.getElementById("trash-zone"), out = document.getElementById("trash-upcoming");
    if (!sel || !out) return;
    // weekdays as JS getDay() values: Mon=1 … Fri=5
    var ZONES = {
      A: { refuse: [1, 4], rec: [3] }, B: { refuse: [2, 5], rec: [4] },
      C: { refuse: [1, 4], rec: [2] }, D: { refuse: [2, 5], rec: [5] }
    };
    function nextDates(days, count) {
      var res = [], d = new Date(); d.setHours(0, 0, 0, 0);
      for (var i = 0; i < 120 && res.length < count; i++) {
        var dd = new Date(d); dd.setDate(d.getDate() + i);
        if (days.indexOf(dd.getDay()) !== -1) res.push(dd);
      }
      return res;
    }
    function lang() { return (window.WP && WP.lang === "es") ? "es-US" : "en-US"; }
    function fmtLong(dt) { return dt.toLocaleDateString(lang(), { weekday: "long", month: "long", day: "numeric" }); }
    function fmtShort(dt) { return dt.toLocaleDateString(lang(), { weekday: "short", month: "short", day: "numeric" }); }
    var TRASH_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13"/></svg>';
    var REC_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 19l-3-5 4-2M17 19l3-5-4-2M12 3l3 5h-6zM7 19h6M12 21l2-3"/></svg>';
    function col(cls, icon, title, days) {
      var ds = nextDates(days, 4);
      if (!ds.length) return "";
      var lis = ds.slice(1).map(function (x) { return "<li>" + fmtShort(x) + "</li>"; }).join("");
      return '<div class="pickup ' + cls + '"><h3><span class="ic" aria-hidden="true">' + icon + "</span>" + title + "</h3>" +
        '<p class="next">' + t("Next:") + " " + fmtLong(ds[0]) + "</p><ul>" + lis + "</ul></div>";
    }
    function render() {
      var z = ZONES[sel.value] || ZONES.A;
      out.innerHTML = '<div class="pickups">' +
        col("", TRASH_SVG, t("Refuse & organics"), z.refuse) +
        col("rec", REC_SVG, t("Recycling"), z.rec) + "</div>";
    }
    sel.addEventListener("change", render);
    document.addEventListener("wp:languagechange", render);
    render();
  }

  /* ---------- Generic stubbed request forms (form[data-stub]) ---------- */
  function initStubForms() {
    [].forEach.call(document.querySelectorAll("form[data-stub]"), function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var bad = null;
        [].forEach.call(form.querySelectorAll("[required]"), function (f) {
          if (!String(f.value).trim()) { f.setAttribute("aria-invalid", "true"); if (!bad) bad = f; }
          else f.removeAttribute("aria-invalid");
        });
        if (bad) { bad.focus(); return; }
        var ref = (form.getAttribute("data-ref-prefix") || "WP") + "-" + new Date().getFullYear() + "-" + Math.floor(100000 + Math.random() * 900000);
        var ok = document.createElement("div");
        ok.className = "form-success"; ok.setAttribute("role", "status");
        ok.innerHTML = '<div class="ok-ic" aria-hidden="true">✓</div>' +
          "<h3>" + t(form.getAttribute("data-success") || "Request received") + "</h3>" +
          "<p>" + t("Your request reference is") + " <strong>" + ref + "</strong>. " +
          t("Submissions aren't processed in this proposal.") + "</p>";
        form.replaceWith(ok); ok.setAttribute("tabindex", "-1"); ok.focus();
      });
    });
  }

  /* ---------- City calendar (calendar.html) ---------- */
  var CAL_CATS = [
    { k: "meeting",   c: "#11243f", bg: "#e7ecf3", label: "Council & committees" },
    { k: "hearing",   c: "#9a7b2e", bg: "#f5edda", label: "Public hearings" },
    { k: "holiday",   c: "#b3261e", bg: "#fbe6e4", label: "City holidays" },
    { k: "rec",       c: "#2e7d52", bg: "#e3f0e8", label: "Recreation" },
    { k: "community", c: "#1a4480", bg: "#e6edf6", label: "Community events" }
  ];
  var WP_EVENTS = [
    // May 2026
    { d: "2026-05-04", cat: "meeting",   t: "Common Council Regular Meeting", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular monthly meeting of the Common Council. Agenda posted the Friday before; open to the public with a public-comment period." },
    { d: "2026-05-18", cat: "rec",       t: "Summer Camp Registration Opens", time: "9:00 a.m.", loc: "Recreation & Parks, Gillie Park", desc: "Online and in-person registration opens for youth summer day camps. Residents register first; popular sessions fill quickly." },
    { d: "2026-05-25", cat: "holiday",   t: "Memorial Day — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices are closed. Refuse and recycling collection shifts one day later for the rest of the week." },
    { d: "2026-05-30", cat: "community", t: "Memorial Day Parade & Ceremony", time: "10:00 a.m.", loc: "Mamaroneck Avenue", desc: "Annual parade up Mamaroneck Avenue followed by a remembrance ceremony. Street closures begin at 9 a.m." },
    // June 2026
    { d: "2026-06-01", cat: "meeting",   t: "Common Council Regular Meeting", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular monthly meeting of the Common Council. Minutes are published as searchable web text afterward." },
    { d: "2026-06-08", cat: "meeting",   t: "Common Council Work Session", time: "6:00 p.m.", loc: "Council Conference Room, City Hall", desc: "Informal work session for the Council to review upcoming legislation and department briefings." },
    { d: "2026-06-10", cat: "hearing",   t: "Public Hearing — 2026–2027 Proposed Budget", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Public hearing on the proposed municipal budget. Residents may comment in person or submit written remarks to the City Clerk." },
    { d: "2026-06-13", cat: "community", t: "Downtown Soccer Fest — Opening Weekend", time: "12:00 p.m.", loc: "Court Street & Renaissance Plaza", desc: "International matchups on the big screen in the heart of downtown, with food vendors and family activities.", url: "news-soccerfest.html" },
    { d: "2026-06-15", cat: "rec",       t: "Gardella & Kittrell Pools Open", time: "11:00 a.m.", loc: "Gardella Park & Kittrell Park", desc: "Both City pools open for the season. Kittrell features zero-depth entry and lap lanes. Season passes on sale now.", url: "recreation.html#hours" },
    { d: "2026-06-17", cat: "community", t: "Farmers Market — Opening Day", time: "8:00 a.m.", loc: "Court Street", desc: "The downtown farmers market returns for the season every Wednesday through October. Local produce, bakers, and makers." },
    { d: "2026-06-19", cat: "holiday",   t: "Juneteenth — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices are closed in observance of Juneteenth. Collection shifts one day later." },
    { d: "2026-06-22", cat: "rec",       t: "Youth Summer Camp Begins", time: "9:00 a.m.", loc: "City parks & recreation sites", desc: "First day of the Recreation & Parks summer day-camp season. Check your confirmation for site and drop-off details." },
    { d: "2026-06-24", cat: "meeting",   t: "Planning Board Meeting", time: "7:00 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular Planning Board meeting to review site-plan and subdivision applications. Agenda posted in advance." },
    { d: "2026-06-27", cat: "community", t: "Concerts in the Park", time: "6:30 p.m.", loc: "Tibbits Park", desc: "Free outdoor summer concert series. Bring a blanket or lawn chair; food trucks on site." },
    // July 2026
    { d: "2026-07-03", cat: "holiday",   t: "Independence Day (observed) — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices are closed. July 4 falls on a Saturday, so the holiday is observed Friday, July 3." },
    { d: "2026-07-06", cat: "meeting",   t: "Common Council Regular Meeting", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular monthly meeting of the Common Council." },
    { d: "2026-07-08", cat: "hearing",   t: "Public Hearing — Site Plan Review", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Public hearing on a downtown mixed-use site-plan application. Project materials are available from the Planning Department." },
    { d: "2026-07-11", cat: "community", t: "Downtown Soccer Fest — Finale", time: "12:00 p.m.", loc: "Court Street & Renaissance Plaza", desc: "Closing weekend of the downtown viewing festival.", url: "news-soccerfest.html" },
    { d: "2026-07-15", cat: "rec",       t: "Family Movie Night", time: "8:30 p.m.", loc: "Turnure Park", desc: "Free outdoor movie under the stars. Screening begins at dusk; concessions benefit youth programs." },
    { d: "2026-07-22", cat: "meeting",   t: "Zoning Board of Appeals", time: "7:00 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular meeting of the Zoning Board of Appeals to consider variance and special-permit requests." },
    { d: "2026-07-25", cat: "community", t: "Summer Sounds Concert", time: "6:30 p.m.", loc: "Tibbits Park", desc: "Free outdoor summer concert series continues. Rain date the following Saturday." },
    // August 2026
    { d: "2026-08-03", cat: "meeting",   t: "Common Council Regular Meeting", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular monthly meeting of the Common Council." },
    { d: "2026-08-12", cat: "hearing",   t: "Public Hearing — Parking Permit Districts", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Public hearing on proposed changes to residential parking permit districts. Residents in affected areas are encouraged to attend." },
    { d: "2026-08-15", cat: "rec",       t: "Adult Tennis League Finals", time: "9:00 a.m.", loc: "Gardella Park Courts", desc: "Championship matches for the City summer tennis league. Spectators welcome." },
    { d: "2026-08-19", cat: "community", t: "National Night Out & Community Safety Day", time: "5:00 p.m.", loc: "Renaissance Plaza", desc: "Meet the Police and Fire departments, with demonstrations, giveaways, and family activities." },
    { d: "2026-08-26", cat: "meeting",   t: "Planning Board Meeting", time: "7:00 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular Planning Board meeting. Agenda posted in advance." },
    // September 2026
    { d: "2026-09-07", cat: "holiday",   t: "Labor Day — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices are closed. Refuse and recycling collection shifts one day later for the rest of the week." },
    { d: "2026-09-08", cat: "meeting",   t: "Common Council Regular Meeting", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular monthly meeting, held Tuesday this month following the Labor Day holiday." },
    { d: "2026-09-09", cat: "hearing",   t: "Public Hearing — Capital Improvement Plan", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Public hearing on the multi-year capital improvement plan for streets, parks, and facilities." },
    { d: "2026-09-12", cat: "rec",       t: "Fall Recreation Programs Begin", time: "9:00 a.m.", loc: "City recreation sites", desc: "Fall classes, leagues, and after-school programs begin. Registration is open online." },
    { d: "2026-09-19", cat: "community", t: "White Plains Outdoor Arts Festival", time: "10:00 a.m.", loc: "Tibbits Park & Court Street", desc: "Juried fine-art and craft festival drawing artists from across the region. Free admission." },
    { d: "2026-09-23", cat: "meeting",   t: "Zoning Board of Appeals", time: "7:00 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular meeting of the Zoning Board of Appeals." },
    // October–December 2026
    { d: "2026-10-05", cat: "meeting",   t: "Common Council Regular Meeting", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular monthly meeting of the Common Council." },
    { d: "2026-10-12", cat: "holiday",   t: "Indigenous Peoples' / Columbus Day — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices are closed. Collection shifts one day later." },
    { d: "2026-10-31", cat: "community", t: "Downtown Halloween Walk", time: "3:00 p.m.", loc: "Mamaroneck Avenue", desc: "Trick-or-treating with downtown merchants, costume contest, and family activities." },
    { d: "2026-11-02", cat: "meeting",   t: "Common Council Regular Meeting", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Regular monthly meeting of the Common Council." },
    { d: "2026-11-03", cat: "holiday",   t: "Election Day — City offices closed", time: null, loc: "Citywide", desc: "City Hall is closed. Polls are open 6 a.m.–9 p.m.; find your polling place through the County Board of Elections." },
    { d: "2026-11-11", cat: "holiday",   t: "Veterans Day — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices are closed in observance of Veterans Day." },
    { d: "2026-11-26", cat: "holiday",   t: "Thanksgiving — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices are closed. No collection; the week's schedule shifts later." },
    { d: "2026-11-27", cat: "holiday",   t: "Day after Thanksgiving — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices remain closed." },
    { d: "2026-12-05", cat: "community", t: "Holiday Tree Lighting", time: "5:00 p.m.", loc: "Renaissance Plaza", desc: "Annual tree lighting with music, hot cocoa, and a visit from Santa." },
    { d: "2026-12-07", cat: "meeting",   t: "Common Council Regular Meeting", time: "7:30 p.m.", loc: "Common Council Chambers, City Hall", desc: "Final regular Council meeting of the year." },
    { d: "2026-12-25", cat: "holiday",   t: "Christmas Day — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices are closed. Collection shifts one day later for the week." },
    { d: "2027-01-01", cat: "holiday",   t: "New Year's Day — City offices closed", time: null, loc: "Citywide", desc: "City Hall and non-emergency offices are closed for the New Year holiday." }
  ];

  function initCalendar() {
    var weeks = document.getElementById("cal-weeks");
    if (!weeks) return;
    var dowEl = document.getElementById("cal-dow"), titleEl = document.getElementById("cal-title");
    var filtersEl = document.getElementById("cal-filters"), listEl = document.getElementById("cal-list");
    var gridWrap = document.getElementById("cal-grid-wrap"), upEl = document.getElementById("cal-upcoming");

    var catByKey = {}; CAL_CATS.forEach(function (c) { catByKey[c.k] = c; });
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var vY = today.getFullYear(), vM = today.getMonth();
    var active = {}; CAL_CATS.forEach(function (c) { active[c.k] = true; });
    var view = "month";

    function lang() { return (window.WP && WP.lang === "es") ? "es-US" : "en-US"; }
    function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
    function key(dt) { return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0"); }
    function visible() { return WP_EVENTS.filter(function (e) { return active[e.cat]; }); }
    function eventsOn(dt) { var k = key(dt); return visible().filter(function (e) { return e.d === k; }); }
    function catLabel(k) { return t(catByKey[k].label); }
    function timeLabel(e) { return e.time ? e.time : t("All day"); }

    /* day-of-week headers, localized */
    function renderDOW() {
      var base = new Date(2026, 10, 1); // Nov 1 2026 = Sunday
      var html = "";
      for (var i = 0; i < 7; i++) {
        var d = new Date(base); d.setDate(1 + i);
        html += "<span>" + d.toLocaleDateString(lang(), { weekday: "short" }) + "</span>";
      }
      dowEl.innerHTML = html;
    }

    function renderFilters() {
      filtersEl.innerHTML = CAL_CATS.map(function (c) {
        return '<button type="button" class="cal-chip" data-cat="' + c.k + '" aria-pressed="' +
          (active[c.k] ? "true" : "false") + '" style="--c:' + c.c + '">' +
          '<span class="dot" aria-hidden="true"></span>' + esc(catLabel(c.k)) + "</button>";
      }).join("");
    }

    function evButton(e, idx, cls) {
      var c = catByKey[e.cat];
      return '<button type="button" class="' + cls + '" data-ei="' + idx + '" style="--c:' + c.c + ';--evbg:' + c.bg + '" ' +
        'title="' + esc(timeLabel(e) + " — " + tb(e.t)) + '"><span class="et">' +
        (e.time ? esc(e.time) + " " : "") + "</span>" + esc(tb(e.t)) + "</button>";
    }

    function renderMonth() {
      titleEl.textContent = new Date(vY, vM, 1).toLocaleDateString(lang(), { month: "long", year: "numeric" });
      var first = new Date(vY, vM, 1);
      var offset = first.getDay(); // Sunday = 0
      var daysInMonth = new Date(vY, vM + 1, 0).getDate();
      var totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;
      var cells = "";
      for (var i = 0; i < totalCells; i++) {
        var dt = new Date(vY, vM, 1 - offset + i);
        var inMonth = dt.getMonth() === vM && dt.getFullYear() === vY;
        var isToday = dt.getTime() === today.getTime();
        var evs = inMonth ? eventsOn(dt) : [];
        var inner = '<span class="dnum">' + dt.getDate() + "</span>";
        evs.slice(0, 3).forEach(function (e) { inner += evButton(e, WP_EVENTS.indexOf(e), "cal-ev"); });
        if (evs.length > 3) {
          inner += '<button type="button" class="cal-more" data-day="' + key(dt) + '">+' +
            (evs.length - 3) + " " + t("more") + "</button>";
        }
        cells += '<div class="cal-cell' + (inMonth ? "" : " pad") + (isToday ? " today" : "") + '">' + inner + "</div>";
      }
      weeks.innerHTML = cells;
    }

    function renderList() {
      var future = visible().filter(function (e) { return parse(e.d) >= today; })
        .sort(function (a, b) { return a.d < b.d ? -1 : 1; });
      if (!future.length) { listEl.innerHTML = '<p class="cal-empty">' + t("No events match the selected categories.") + "</p>"; return; }
      var html = "", curMonth = "";
      future.forEach(function (e) {
        var dt = parse(e.d);
        var mlabel = dt.toLocaleDateString(lang(), { month: "long", year: "numeric" });
        if (mlabel !== curMonth) { curMonth = mlabel; html += '<div class="agenda-month">' + esc(mlabel) + "</div>"; }
        var c = catByKey[e.cat];
        html += '<div class="agenda-row">' +
          '<div class="agenda-date"><div class="ad-dow">' + dt.toLocaleDateString(lang(), { weekday: "short" }) +
          '</div><div class="ad-day">' + dt.getDate() + "</div></div>" +
          '<div class="agenda-item" data-ei="' + WP_EVENTS.indexOf(e) + '">' +
          '<span class="agenda-tag" style="--c:' + c.c + '">' + esc(catLabel(e.cat)) + "</span>" +
          "<h4>" + esc(tb(e.t)) + "</h4>" +
          '<div class="meta">' + esc(timeLabel(e)) + " · " + esc(tb(e.loc)) + "</div></div></div>";
      });
      listEl.innerHTML = html;
    }

    function renderUpcoming() {
      if (!upEl) return;
      var next = visible().filter(function (e) { return parse(e.d) >= today; })
        .sort(function (a, b) { return a.d < b.d ? -1 : 1; }).slice(0, 4);
      if (!next.length) { upEl.innerHTML = '<p style="font-size:14px;color:var(--ink-dim);margin:0;">' + t("Nothing coming up.") + "</p>"; return; }
      upEl.innerHTML = next.map(function (e) {
        var dt = parse(e.d), c = catByKey[e.cat];
        var ds = dt.toLocaleDateString(lang(), { month: "short", day: "numeric" });
        return '<button type="button" class="cal-up" data-ei="' + WP_EVENTS.indexOf(e) + '" ' +
          'style="display:block;width:100%;text-align:left;border:none;border-left:3px solid ' + c.c +
          ';background:none;cursor:pointer;padding:8px 0 8px 12px;border-bottom:1px solid var(--line);font:inherit;">' +
          '<span style="font-size:12px;font-weight:700;color:' + c.c + ';display:block;">' + esc(ds) + "</span>" +
          '<span style="font-size:14px;color:var(--ink);">' + esc(tb(e.t)) + "</span></button>";
      }).join("");
    }

    function openEvent(idx) {
      var e = WP_EVENTS[idx]; if (!e) return;
      var c = catByKey[e.cat], dt = parse(e.d);
      var dateStr = dt.toLocaleDateString(lang(), { weekday: "long", month: "long", day: "numeric", year: "numeric" });
      var link = e.url ? '<p style="margin-top:14px;"><a class="btn" href="' + e.url + '">' + t("More details") + " →</a></p>" : "";
      openModal(tb(e.t),
        '<div class="ev-detail">' +
        '<span class="ev-tag" style="background:' + c.c + '">' + esc(catLabel(e.cat)) + "</span>" +
        "<dl>" +
        "<dt>" + t("Date") + "</dt><dd>" + esc(dateStr) + "</dd>" +
        "<dt>" + t("Time") + "</dt><dd>" + esc(timeLabel(e)) + "</dd>" +
        "<dt>" + t("Location") + "</dt><dd>" + esc(tb(e.loc)) + "</dd>" +
        "</dl>" +
        '<p class="ev-desc">' + esc(tb(e.desc)) + "</p>" + link + "</div>");
    }

    function openDay(dayKey) {
      var dt = parse(dayKey);
      var evs = eventsOn(dt);
      var dateStr = dt.toLocaleDateString(lang(), { weekday: "long", month: "long", day: "numeric" });
      var body = evs.map(function (e) {
        var c = catByKey[e.cat];
        return '<div style="padding:10px 0;border-top:1px solid var(--line);">' +
          '<span class="ev-tag" style="display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;color:#fff;border-radius:4px;padding:2px 8px;background:' + c.c + '">' + esc(catLabel(e.cat)) + "</span>" +
          '<div style="font-weight:700;color:var(--navy);margin-top:5px;">' + esc(tb(e.t)) + "</div>" +
          '<div style="font-size:13.5px;color:var(--ink-dim);">' + esc(timeLabel(e)) + " · " + esc(tb(e.loc)) + "</div></div>";
      }).join("");
      openModal(dateStr, '<div class="modal-p">' + body + "</div>");
    }

    function setView(v) {
      view = v;
      gridWrap.style.display = v === "month" ? "" : "none";
      listEl.style.display = v === "list" ? "block" : "none";
      var mb = document.getElementById("cal-view-month"), lb = document.getElementById("cal-view-list");
      mb.classList.toggle("on", v === "month"); mb.setAttribute("aria-pressed", v === "month" ? "true" : "false");
      lb.classList.toggle("on", v === "list"); lb.setAttribute("aria-pressed", v === "list" ? "true" : "false");
    }

    function renderAll() { renderDOW(); renderFilters(); renderMonth(); renderList(); renderUpcoming(); }

    /* events */
    document.getElementById("cal-prev").addEventListener("click", function () { vM--; if (vM < 0) { vM = 11; vY--; } renderMonth(); });
    document.getElementById("cal-next").addEventListener("click", function () { vM++; if (vM > 11) { vM = 0; vY++; } renderMonth(); });
    document.getElementById("cal-todaybtn").addEventListener("click", function () { vY = today.getFullYear(); vM = today.getMonth(); renderMonth(); setView("month"); });
    document.getElementById("cal-view-month").addEventListener("click", function () { setView("month"); });
    document.getElementById("cal-view-list").addEventListener("click", function () { setView("list"); });
    filtersEl.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-cat]"); if (!b) return;
      var k = b.getAttribute("data-cat"); active[k] = !active[k];
      b.setAttribute("aria-pressed", active[k] ? "true" : "false");
      renderMonth(); renderList(); renderUpcoming();
    });
    function onActivate(ev) {
      var more = ev.target.closest(".cal-more");
      if (more) { openDay(more.getAttribute("data-day")); return; }
      var item = ev.target.closest("[data-ei]");
      if (item) openEvent(+item.getAttribute("data-ei"));
    }
    weeks.addEventListener("click", onActivate);
    listEl.addEventListener("click", onActivate);
    if (upEl) upEl.addEventListener("click", onActivate);
    document.addEventListener("wp:languagechange", function () { renderAll(); });

    renderAll(); setView("month");
  }

  /* ---------- Homepage task launcher ("I want to…") ---------- */
  var WP_TASKS = [
    { l: "Pay a bill (taxes, water, parking)", u: "pay.html", k: "pay bill taxes property water sewer parking ticket permit fee online", pop: 1 },
    { l: "Find your trash & recycling day", u: "trash.html", k: "trash garbage recycling pickup collection day schedule zone bulk", pop: 1 },
    { l: "Apply for a permit or license", u: "pay.html", k: "permit license building business parking dog apply application", pop: 1 },
    { l: "Report a problem", u: "pay.html#report", k: "report problem pothole streetlight light graffiti missed pickup complaint issue", pop: 1 },
    { l: "Council agendas & minutes", u: "minutes.html", k: "council meeting agenda minutes resolution vote government", pop: 1 },
    { l: "Find a City job", u: "jobs.html", k: "job jobs employment work civil service exam careers hiring openings", pop: 1 },
    { l: "Pay your water & sewer bill", u: "water-sewer.html", k: "water sewer bill utility account balance leak meter" },
    { l: "Downtown, dining & events", u: "downtown.html", k: "downtown mamaroneck avenue dining restaurants bars nightlife shopping arts things to do events festival", pop: 1 },
    { l: "City calendar & events", u: "calendar.html", k: "calendar events meetings hearings holidays festival concert" },
    { l: "Request public records (FOIL)", u: "foil.html", k: "foil records request freedom of information documents clerk" },
    { l: "Recreation, pools & camps", u: "recreation.html", k: "recreation parks pool swim camp program class league register kids" },
    { l: "Register to vote", u: "https://www.ny.gov/services/register-vote", k: "vote voting register election ballot 18" },
    { l: "Apply for a marriage license", u: "https://www.cityofwhiteplains.com/318/Marriage-Licenses", k: "marriage license wedding married clerk" },
    { l: "Birth & death certificates", u: "https://www.cityofwhiteplains.com/317/Vital-Records", k: "birth death certificate vital record clerk baby" },
    { l: "License your dog", u: "https://www.cityofwhiteplains.com/88/City-Clerk", k: "dog pet license animal" },
    { l: "Browse City departments", u: "departments.html", k: "department directory phone contact office staff" },
    { l: "Contact City Hall", u: "index.html#contact", k: "contact phone address email city hall reach" },
    { l: "City maps & zoning (GIS)", u: "https://www.cityofwhiteplains.com/808/Maps-Plans-Zoning", k: "map maps gis zoning property parcel lookup district" },
    { l: "City budget & finances", u: "government.html#budget", k: "budget finance money spending tax rate" },
    { l: "Municipal code & local laws", u: "government.html#code", k: "code law laws ordinance local rule regulation" },
    { l: "Metro-North & buses", u: "community.html#transit", k: "metro north train bus bee-line omny transit commute station" },
    { l: "Start or run a business", u: "business.html", k: "business start open license commercial economic development" },
    { l: "News & announcements", u: "news.html", k: "news announcement update notice press story" },
    { l: "Accessibility help", u: "accessibility.html", k: "accessibility ada disability screen reader large text contrast" }
  ];
  function initLauncher() {
    var input = document.getElementById("launch-input"),
        resultsEl = document.getElementById("launch-results"),
        chipsEl = document.getElementById("launch-chips"),
        form = document.getElementById("launcher");
    if (!input || !resultsEl || !form) return;
    var active = -1, shown = [];
    function isExt(tk) { return /^https?:/.test(tk.u); }
    function go(tk) { if (!tk) return; if (isExt(tk)) window.open(tk.u, "_blank", "noopener"); else window.location.href = tk.u; }
    function score(tk, q) {
      var label = tk.l.toLowerCase(), hay = (tk.l + " " + tk.k).toLowerCase();
      if (label.indexOf(q) === 0) return 4;
      if (label.indexOf(q) !== -1) return 3;
      if (hay.indexOf(q) !== -1) return 2;
      // token prefix match (e.g. "vot" → "vote")
      if (hay.split(/\s+/).some(function (w) { return w.indexOf(q) === 0; })) return 1;
      return 0;
    }
    function filter(q) {
      q = q.toLowerCase().trim(); if (!q) return [];
      return WP_TASKS.map(function (tk) { return { tk: tk, s: score(tk, q) }; })
        .filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s; }).slice(0, 6).map(function (x) { return x.tk; });
    }
    function renderResults(list) {
      shown = list; active = -1; input.removeAttribute("aria-activedescendant");
      if (!list.length) {
        var q = input.value.trim();
        if (q) { resultsEl.innerHTML = '<li class="launch-empty">' + t("Press Enter to search the whole site for") + ' “' + esc(q) + '”</li>'; resultsEl.hidden = false; }
        else { resultsEl.hidden = true; resultsEl.innerHTML = ""; }
        input.setAttribute("aria-expanded", q ? "true" : "false"); return;
      }
      resultsEl.innerHTML = list.map(function (tk, i) {
        return '<li role="option" id="lr-' + i + '"><button type="button" data-i="' + i + '">' +
          '<span class="lr-t">' + esc(tb(tk.l)) + '</span>' +
          '<span class="lr-go">' + (isExt(tk) ? t("Open ↗") : t("Go →")) + '</span></button></li>';
      }).join("");
      resultsEl.hidden = false; input.setAttribute("aria-expanded", "true");
    }
    function renderChips() {
      chipsEl.innerHTML = WP_TASKS.filter(function (tk) { return tk.pop; }).map(function (tk) {
        return '<button type="button" data-u="' + tk.u + '" data-e="' + (isExt(tk) ? 1 : 0) + '">' + esc(tb(tk.l.replace(/ \(.*\)/, ""))) + "</button>";
      }).join("");
    }
    function setActive(i) {
      var items = resultsEl.querySelectorAll("li[role=option]");
      items.forEach(function (li, idx) { li.classList.toggle("active", idx === i); });
      active = i;
      if (i >= 0 && items[i]) input.setAttribute("aria-activedescendant", "lr-" + i);
      else input.removeAttribute("aria-activedescendant");
    }
    input.addEventListener("input", function () { renderResults(filter(input.value)); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (shown.length) setActive((active + 1) % shown.length); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (shown.length) setActive((active - 1 + shown.length) % shown.length); }
      else if (e.key === "Enter") { if (active >= 0 && shown[active]) { e.preventDefault(); go(shown[active]); } }
      else if (e.key === "Escape") { renderResults([]); }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (active >= 0 && shown[active]) return go(shown[active]);
      if (shown.length) return go(shown[0]);
      var q = input.value.trim(); if (q) window.location.href = "search.html?q=" + encodeURIComponent(q);
    });
    resultsEl.addEventListener("click", function (e) { var b = e.target.closest("[data-i]"); if (b) go(shown[+b.getAttribute("data-i")]); });
    chipsEl.addEventListener("click", function (e) { var b = e.target.closest("[data-u]"); if (b) go({ u: b.getAttribute("data-u"), k: "" }); });
    document.addEventListener("click", function (e) { if (!form.contains(e.target)) renderResults([]); });
    document.addEventListener("wp:languagechange", function () { renderChips(); if (input.value.trim()) renderResults(filter(input.value)); });
    renderChips();
  }

  /* ---------- Water & sewer account lookup (demo) ---------- */
  function initWaterLookup() {
    var form = document.getElementById("water-lookup"), out = document.getElementById("water-result");
    if (!form || !out) return;
    var HOLDERS = ["M. Rivera", "J. O'Connor", "S. Patel", "D. Washington", "L. Nguyen", "A. Castellano", "R. Goldberg", "T. Almeida"];
    var STREETS = ["Mamaroneck Ave", "Soundview Ave", "Ridgeway", "North Broadway", "Bryant Ave", "Gedney Way", "Battle Ave", "Westchester Ave"];
    function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) >>> 0; } return h; }
    function lang() { return (window.WP && WP.lang === "es") ? "es-US" : "en-US"; }
    var lastAcct = null;
    function render(acct) {
      var h = hash(acct || "100482");
      var holder = HOLDERS[h % HOLDERS.length];
      var num = 100 + (h % 1800);
      var street = STREETS[(h >> 4) % STREETS.length];
      var ccf = 9 + (h % 28);                       // quarterly usage in CCF
      var prev = 1000 + (h % 6000), cur = prev + ccf;
      var water = 24 + ccf * 4.85, sewer = ccf * 3.40;
      var balance = Math.round((water + sewer) * 100) / 100;
      var gallons = Math.round(ccf * 748);
      var due = new Date(2026, 6, 31).toLocaleDateString(lang(), { month: "long", day: "numeric", year: "numeric" });
      function money(n) { return "$" + n.toFixed(2); }
      out.innerHTML =
        '<div class="acct">' +
          '<div class="acct-head"><div class="who">' + t("Account") + " #" + esc(acct) + " · " + esc(holder) + '</div>' +
            '<div class="addr">' + num + " " + esc(street) + ', White Plains, NY 10601</div></div>' +
          '<div class="acct-grid">' +
            '<div><div class="lbl">' + t("Current balance") + '</div><div class="val due">' + money(balance) + '</div></div>' +
            '<div><div class="lbl">' + t("Due date") + '</div><div class="val">' + esc(due) + '</div></div>' +
            '<div><div class="lbl">' + t("Usage this quarter") + '</div><div class="val">' + ccf + ' CCF</div></div>' +
          '</div>' +
          '<div class="acct-foot"><span class="small">' + t("Meter:") + " " + prev + " → " + cur + " · ≈ " + gallons.toLocaleString(lang()) + " " + t("gallons") + '</span>' +
            '<a class="btn" href="#" data-demo="Water &amp; sewer payment" style="margin-left:auto;">' + t("Pay this balance →") + '</a></div>' +
        '</div>' +
        '<p style="font-size:12.5px;color:var(--ink-dim);margin-top:8px;">' + t("Sample account — figures are illustrative for this proposal.") + '</p>';
      upgradeStubLinks(out);
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = (form.elements.acct.value || "").trim();
      if (!v) { form.elements.acct.setAttribute("aria-invalid", "true"); form.elements.acct.focus(); return; }
      form.elements.acct.removeAttribute("aria-invalid");
      lastAcct = v; render(v);
    });
    document.addEventListener("wp:languagechange", function () { if (lastAcct) render(lastAcct); });
  }

  function init() {
    initReportForm(); initStubForms(); initNewsFilter(); initDeptFilter();
    renderDepartment(); initTrash(); initCalendar(); initWaterLookup(); initLauncher(); upgradeStubLinks();
    // Re-render the department detail (and re-upgrade its links) when language changes.
    document.addEventListener("wp:languagechange", function () {
      if (document.getElementById("dept-detail")) { renderDepartment(); upgradeStubLinks(); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
