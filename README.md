# City of White Plains — Website Redesign Concept

A redesign concept for the City of White Plains, NY municipal website. Built as a static, multi-page site with a focus on clarity, accessibility, and getting residents to the task they came to do.

**This is an independent concept and not an official City of White Plains website.**

## Live preview

Served via GitHub Pages: https://never-nude.github.io/cityofwhiteplains1/

## What's here

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Task launcher, news, departments, city history |
| Pay & Apply | `pay.html` | Payment and permit/license flows |
| Recreation & Parks | `recreation.html` | Department page template — hours, programs, parks |
| Departments | `departments.html` | Full department directory |
| News | `news.html` | News index with categories and pagination |
| Article | `news-soccerfest.html` | Single-article layout |
| Styles | `style.css` | Shared design system |

## Design approach

- **Light, high-contrast, accessible** — built to be read in daylight by everyone, following federal civic design conventions (Public Sans, US Web Design System patterns) rather than trend-driven aesthetics.
- **Task-first** — the homepage opens with what residents actually came to do, not an announcement carousel.
- **Identity from the city** — civic navy and institutional gold, with the "Birthplace of the State of New York" (July 9, 1776) history given real prominence.
- **No build step** — plain HTML and CSS. Open `index.html` in any browser, or serve the folder statically.

## Running locally

```bash
# Any static server works, e.g.:
python3 -m http.server 8000
# then open http://localhost:8000
```

## Status

Concept / proof of work. Content is illustrative — grounded in real White Plains specifics (City Hall address, Kittrell and Gardella pools, the Bryant–Mamaroneck StoryWalk, Bee-Line transit) but the posts and figures are fictitious.
