# City of White Plains — Website Redesign Concept

A redesign concept for the City of White Plains, NY municipal website. Built as a static, multi-page site focused on clarity, accessibility, and getting residents to the task they came to do — proposed as an alternative to the current CivicPlus site.

**This is an independent concept and not an official City of White Plains website.**

## Live preview

Served via GitHub Pages: https://never-nude.github.io/cityofwhiteplains1/

See **[PITCH.md](PITCH.md)** for the before/after audit prepared for the Mayor's office (also available as `PITCH.pdf`).

## What's here

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Task launcher, news, departments, city history |
| Pay & Apply | `pay.html` | Payment and permit/license flows |
| Recreation & Parks | `recreation.html` | Department page template — hours, programs, parks |
| Departments | `departments.html` | Full department directory |
| News | `news.html` | News index with categories and pagination |
| Article | `news-soccerfest.html` | Single-article layout |
| Meeting Minutes | `minutes.html` | PDF→web demo: minutes as accessible web text + PDF |
| Search | `search.html` | Site search results page |

| Asset | File | Purpose |
|------|------|---------|
| Styles | `style.css` | Shared design system |
| Search | `search.js`, `search-index.json` | Client-side weighted search + autocomplete |
| Navigation | `nav.js` | Mobile drawer + persistent bottom task bar |
| Language | `i18n.js` | EN/ES toggle + civic Spanish translations |
| Alerts | `alerts.js` | Severity alerts, dismissal, subscribe modal |
| Minutes PDF | `minutes.pdf` | Companion print/record copy of the minutes page |

## Features

- **Working site search** — a JSON index of services, departments, meetings, and news, ranked so resident tasks (pay taxes, permits, pool hours) appear above incidental matches. Live autocomplete in every search box; full results page at `search.html`.
- **Mobile-first navigation** — a real slide-in hamburger menu (focus-trapped, ESC/overlay to close) and a persistent bottom task bar on phones with the top resident actions. Tested at 380px.
- **WCAG 2.1 AA accessibility** — verified color contrast, visible keyboard focus, skip links, semantic landmarks, ARIA labels, accessible data tables, reduced-motion support. See ADA note below.
- **EN/ES language toggle** — real, curated civic Spanish for the homepage and Pay & Apply page plus site chrome everywhere. Choice persists in-session via `sessionStorage` (no `localStorage`, no third-party translate widget).
- **PDF→web** — `minutes.html` publishes a council meeting as searchable, mobile-friendly, accessible web text, with a "Download PDF" link alongside.
- **Persistent alerts** — notice/warning/emergency severities, per-session dismissal, timestamps, and a working "Subscribe to alerts" modal (delivery stubbed).

## Accessibility & ADA Title II

Under the U.S. Department of Justice's **ADA Title II** rule (2024), **WCAG 2.1 Level AA** is the binding technical standard for state and local government websites. In April 2026 DOJ extended the compliance dates by one year. With a 2020 Census population of **59,559**, White Plains is in the 50,000-and-over tier, giving the City a compliance deadline of **April 26, 2027**.

This concept is built to WCAG 2.1 AA. Color-contrast ratios were checked against the AA thresholds; every interactive element has a visible focus state; pages use skip links, landmarks, and labeled controls; data tables use `scope`/header associations. Publishing records as web text (not just PDFs) directly addresses one of the most common sources of public-sector accessibility complaints.

References: [ADA.gov web rule](https://www.ada.gov/resources/web-rule-first-steps/) · [deadline extension](https://www.venable.com/insights/publications/2026/04/ada-title-ii-website-accessibility-regulations)

## Design approach

- **Light, high-contrast, accessible** — federal civic design conventions (Public Sans, US Web Design System patterns) over trend-driven styling.
- **Task-first** — the homepage opens with what residents came to do.
- **Identity from the city** — civic navy (`#11243f`) and institutional gold, with the "Birthplace of the State of New York" (July 9, 1776) history given real prominence.
- **No build step** — plain HTML/CSS with small vanilla-JS enhancements. No framework, no bundler.

## Running locally

```bash
# The search index and translations load via fetch/JS, so use a static server:
python3 -m http.server 8000
# then open http://localhost:8000
```

## Roadmap / requires backend

These pieces need server infrastructure and are intentionally **stubbed** in this static concept — the UI is real, the integration is not:

- **Payments** — real processing for property tax, water/sewer, parking tickets, and permit fees (the "Pay" tiles are demo links).
- **Alert delivery & subscriptions** — actual email/SMS sending and subscriber management behind the "Subscribe to alerts" modal.
- **Form intake** — permit/license applications, "Report a problem" requests, and FOIL submissions.
- **Resident accounts** — authenticated profiles to view balances, history, and saved receipts.
- **Live meeting data** — pulling agendas/minutes from the clerk's system instead of hand-authored pages.

## Status

Concept / proof of work. Content is illustrative — grounded in real White Plains specifics (City Hall address, Kittrell and Gardella pools, Hamilton-Main Garage, Bee-Line/OMNY, the Bryant–Mamaroneck StoryWalk) — but the posts, figures, and meeting proceedings are fictitious.
