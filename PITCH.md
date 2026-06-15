# Where the City website costs residents time — and how to fix it

**A before/after audit and proposal for the Office of Mayor Justin C. Brasch**
City of White Plains, New York · Prepared June 2026

---

## The short version

The City's current website (cityofwhiteplains.com) runs on CivicPlus, a capable but heavily templated platform. The problem isn't that it looks dated — it's that everyday resident tasks take longer than they should, key information is locked inside PDFs, and the site does not yet meet the accessibility standard that is now legally binding on the City under the Americans with Disabilities Act.

This document pairs each problem with a working fix. Every fix below is already built and running as a live, static prototype:

**https://never-nude.github.io/cityofwhiteplains1/**

The prototype is plain HTML and CSS — no licensing, no proprietary CMS, no server to maintain. It can be hosted anywhere, including for free.

This is a proof of work, not a finished municipal system. The news items and figures in it are illustrative but grounded in real White Plains specifics (City Hall at 255 Main Street, the Kittrell and Gardella pools, the Hamilton-Main Garage, Bee-Line/OMNY transit, the Bryant–Mamaroneck StoryWalk). Anything that needs a real backend — payment processing, alert delivery, form intake — is clearly stubbed, not faked.

---

## Why accessibility is now a deadline, not a nicety

In April 2024 the U.S. Department of Justice issued a final rule under **Title II of the ADA** establishing **WCAG 2.1 Level AA** as the binding technical standard for the websites and mobile apps of state and local governments. In April 2026 DOJ extended the original compliance dates by one year.

White Plains has a 2020 Census population of **59,559** — above the 50,000 threshold. That puts the City in the larger-entity tier, with a compliance deadline of **April 26, 2027**. That is under a year away.

The exposure is concrete. When a public website fails WCAG 2.1 AA — low color contrast, no keyboard focus, unlabeled controls, scanned PDFs a screen reader can't read — it is both a barrier to residents with disabilities and a documented basis for ADA complaints and litigation against the municipality. PDFs in particular are one of the most common sources of public-sector accessibility findings.

The prototype is built to WCAG 2.1 AA from the ground up. Meeting the standard before the deadline is far cheaper than remediating under a complaint.

---

## The audit: seven problems, seven fixes

### 1. Search that doesn't know what residents need

**Where the current site costs residents.** Site search on templated civic platforms typically returns a long, flat list of pages and documents with no sense of priority. A resident searching "taxes" has to scan past board minutes and archived news to find the one link that lets them pay. People give up and call City Hall instead — which costs staff time too.

**The fix.** A client-side search index that ranks **resident tasks first**. Type "tax," "permit," or "pool" and the top results are *Pay property taxes*, *Apply for a building permit*, *Pool hours* — with live autocomplete in the search box and a clean results page. It is instant because the index ships with the page; there is no search server to run.

**Why it matters.** The fastest path to "I did the thing I came to do" is the entire job of a city website. Every search that ends in a completed task is a phone call City Hall didn't have to take.

### 2. A mobile experience for the way residents actually browse

**Where the current site costs residents.** Most local-government web traffic is on phones. Templated sites reflow to mobile, but the menu is often an afterthought, and the tasks people need most are buried several taps deep.

**The fix.** A real slide-in navigation menu (the prototype's hamburger actually works, with proper focus handling) plus a **persistent bottom task bar** on phones carrying the top resident actions — Pay, Pools, Report, Search — always one tap away. Tap targets meet accessibility size guidance. Tested down to a 380px-wide screen.

**Why it matters.** If the City's site is hard to use one-handed on a phone in a parking lot, it is hard to use, full stop.

### 3. Accessibility built in, not bolted on

**Where the current site costs residents — and exposes the City.** Common WCAG failures on civic sites include insufficient color contrast, no visible keyboard focus, missing form and control labels, data tables without proper headers, and images and documents without text alternatives. Each is a barrier to a resident with a disability and, as of the Title II rule above, a compliance gap.

**The fix.** The prototype was audited and corrected for WCAG 2.1 AA: contrast ratios verified with a contrast checker (every text/background pair clears the AA threshold), a visible keyboard focus indicator on every interactive element, skip links on every page, semantic landmarks, ARIA labels on controls and icon-only buttons, accessible data tables with `scope`/header associations, and respect for reduced-motion preferences.

**Why it matters.** This is the item with legal teeth (see deadline above) and the one that most directly determines whether every resident can use the site.

### 4. Real Spanish, not a translate widget

**Where the current site costs residents.** Many civic sites lean on a Google Translate widget. Machine translation of civic terms is unreliable — "assessment," "lien," "FOIL," and "exemption" do not translate cleanly — and the widget often breaks layout and is itself an accessibility problem.

**The fix.** A built-in **English/Spanish toggle** with curated, civically correct Spanish translations of the homepage and the Pay & Apply page, plus the site chrome on every page. The choice persists as the resident moves through the site during their visit.

**Why it matters.** A meaningful share of White Plains residents speak Spanish at home. Reliable translation of the pages people actually use is a matter of equal access — and aligns with the City's language-access obligations.

### 5. Stop burying public information in PDFs

**Where the current site costs residents.** Agendas, minutes, and notices are routinely posted as PDFs — frequently scanned ones. PDFs are slow to open on a phone, don't reflow to small screens, are often unreadable by screen readers, and don't surface in a quick search.

**The fix.** A demonstration meeting-minutes page (`minutes.html`) that presents a Common Council meeting as **searchable, mobile-friendly, accessible web text**, with a table of contents, an accessible vote table, and a "Download PDF" link *alongside* for anyone who wants the printable copy. Content first, document second.

**Why it matters.** Public records should be genuinely public — findable and readable by everyone, on any device, including assistive technology. The PDF stays available; it just stops being the only option.

### 6. An alert system that works like an emergency tool

**Where the current site costs residents.** A static notice bar with no severity, no timestamp, and no way to dismiss it gives residents no way to tell a routine note from an emergency — and no confidence the information is current.

**The fix.** A real alert system with **severity levels** (notice / warning / emergency, each visually distinct and screen-reader-announced appropriately), a **timestamp** on each alert, **per-visit dismissal** so a resident isn't nagged by something they've read, and a working **"Subscribe to alerts"** sign-up flow (email/SMS/severity preferences). Delivery is stubbed in the prototype and listed on the roadmap.

**Why it matters.** During a water-main break or a storm, clarity and credibility are the product. The alert bar is the one component that has to be unambiguous.

### 7. Fast, durable, and inexpensive to run

**Where the current site costs the City.** A proprietary CMS means ongoing license cost, vendor lock-in, and a heavier, slower page.

**The fix.** The prototype is static HTML and CSS with a few small vanilla-JavaScript enhancements — no framework, no build step, no database. It loads fast, has almost nothing to break, and can be hosted anywhere (it is currently served free on GitHub Pages).

**Why it matters.** Public money and resilience both argue for the lightest thing that does the job well.

---

## What would still need a backend

Honesty matters in a pitch. The prototype stubs — does not fake — the pieces that genuinely require server infrastructure:

- Real payment processing for taxes, utilities, and tickets
- Real alert delivery (email/SMS) and subscriber management
- Live form intake (permit applications, problem reports, FOIL requests)
- Authenticated resident accounts

These are listed in the project README under "Roadmap / requires backend." The UI for each is built and convincing so the experience can be evaluated now; the integrations would follow.

---

## The ask

A short working session to walk the Mayor's office through the live prototype on a phone and a laptop, and to scope what a production version — meeting the April 2027 ADA deadline — would take. The hard design and accessibility work is already demonstrated. The next decision is whether the City wants its website to be measured by how fast a resident gets something done.

---

## Sources

- DOJ, ADA Title II web/mobile accessibility rule and compliance timeline — https://www.ada.gov/resources/web-rule-first-steps/
- One-year extension of the Title II compliance deadlines (April 2026) — https://www.venable.com/insights/publications/2026/04/ada-title-ii-website-accessibility-regulations
- White Plains population, 2020 Census (59,559) — https://data.census.gov/profile/White_Plains_city,_New_York
- Current City website platform (CivicPlus) — https://www.cityofwhiteplains.com/

*Concept prepared independently. Not an official City of White Plains website or communication.*
