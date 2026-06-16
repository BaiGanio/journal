# Plan — *Shadows within the Cave*

> Audit + roadmap. Goal: make publishing essays trivial and ensure the landing
> page scales to 20+ essays. Written 2026-06-16.

## Verdict (short version)

The **product has a real chance** — it's a focused, opinionated essay journal
with a strong visual identity and a clear publishing cadence. The concept is not
a dead end.

The **codebase is not the bottleneck because of its size — it's the bottleneck
because it is half-finished in three incompatible directions at once.** There
are two parallel article systems (one static, one JSON-driven) plus a third
layout described in `CONTRIBUTING.md` that exists nowhere in the repo. That
contradiction — not scale — is why adding an essay feels hard.

Fix the architecture confusion and this stays a 2-hour-per-essay project for
years. Leave it and every new essay multiplies the inconsistency.

---

## What exists today (ground truth)

### Landing page (`index.html` + `assets/`) — solid
- `articles.js` — hand-edited JS array, the single source of truth for the feed.
- `index.js` — renders featured block, card list, sidebar; topic filter; issue label.
- `translations.js` — UI chrome translated into 24 EU languages (inline object).
- `i18n.js` — language switcher; persists to `localStorage` (`sitc-lang`).
- This half works and is coherent.

### Article pages (`pages/`) — incoherent, two generations overlaid
- Real published pages (`the-stoic-and-the-machine.html`, `cities-we-never-built.html`,
  `ai-fairy-tale-one.html`) are **hand-written static HTML**. Content is hard-coded
  in the markup. English only.
- A second, **JSON-driven system** exists but is **dead code**:
  - `pages/assets/i18-loader.js` fetches `assets/translations/{code}.json` and
    renders an `ARTICLE_BODY` block array.
  - **No page loads it.** `AVAILABLE_LANGS` (which it needs) is defined only inside
    `pages/TEMPLATE copy.html`, an abandoned alternate template.
  - The translation JSON files (`pages/translations/.../en.json`) are **orphaned
    placeholders** — the "stoic" en.json actually contains *Cave and the Screen*
    text, never displayed anywhere.
- `CONTRIBUTING.md` documents a **third** layout (`my-article/index.html` +
  per-article `translations/`) that does not match the real folder structure.

## Confirmed bugs (independent of any redesign)

1. **All feed links 404.** `articles.js` slugs point to `pages/philosophy/…`
   but the files live in `pages/…`. No `philosophy/` folder exists.
2. **Wrong script on an article page.** `pages/ai-fairy-tale-one.html` loads
   `../assets/index.js` (the *landing-page* renderer) instead of
   `pages/assets/index.js` (the carousel). It will throw on load.
3. **Two duplicate templates** (`TEMPLATE.html`, `TEMPLATE copy.html`) with
   different script wiring — no canonical starting point.
4. **Two i18n implementations** with different storage keys (`sitc-lang` vs
   `swtc_lang`) and different globals (`EU_LANGUAGES` vs `AVAILABLE_LANGS`).

## Will the landing page hold at 20+ essays?

**The rendering will hold; the authoring and the layout will not, as-is.**
- `articles.js` is O(n) render of plain DOM strings — 20, even 200 entries render
  instantly. No perf concern.
- **But:** the feed has no pagination/grouping. 20+ cards in one flat column is a
  UX problem, not a perf one. Needs issue/year grouping or an archive view.
- Editing `articles.js` by hand (with commented-out entries already accumulating)
  is the real friction and the source of the slug bug.

---

## The decision that unblocks everything

**Pick ONE article model and delete the other two.** Recommendation:

> **Keep static hand-written HTML article pages. Drop the JSON/`ARTICLE_BODY`
> system entirely (for now).**

Why static wins here:
- The essays are long-form, hand-crafted, with bespoke pull-quotes, carousels,
  and inline emphasis. Forcing that through a flat `{type,text}` block array
  loses formatting and fights the author.
- The stated principle is "no AI-generated essays, passion for wisdom" — a
  human-authored HTML page matches that ethos better than a CMS-lite JSON schema.
- Per-essay translation into 24 languages is an enormous content burden that
  isn't happening (only 1 stub bg.json exists). Translate the **chrome** (already
  done) and the essays only when a human actually translates one.

If full per-language essay translation becomes a real goal later, revisit a
static-site generator (Astro/Eleventy) rather than the hand-rolled JSON loader.

---

## Roadmap

### Phase 1 — Stop the bleeding ✅ DONE → site works, no broken links
1. Fix slugs in `articles.js` to real paths (`pages/<slug>.html`). → click every card.
2. Fix script tag in `ai-fairy-tale-one.html` to `assets/index.js`. → no console error.
3. Delete dead code: `pages/assets/i18-loader.js`, `pages/translations/*`,
   `pages/TEMPLATE copy.html`. → grep shows zero references.
4. Keep one `TEMPLATE.html` as the canonical starting point.

### Phase 2 — Make adding an essay trivial ✅ DONE → new essay live in minutes
5. ✅ `scripts/new-essay.js` — guided prompts; copies `TEMPLATE.html` →
   `pages/<slug>.html` (fills title/subtitle/topic/date/hero, strips the carousel
   block), creates `assets/images/<slug>/`, and inserts a correct entry at the top
   of `articles.js`. Zero deps; refuses to overwrite; computes next id.
6. ✅ `CONTRIBUTING.md` rewritten to the real flow (run script → add image →
   write HTML → check). Removed the obsolete translation-centric doc.
7. ⏭ Skipped the `data-*`-driven template idea — unnecessary now that the script
   fills the meta/header/hero, which was the friction item 7 aimed at.

### Phase 3 — Make the feed scale ✅ DONE → verified: 20 dummy essays group cleanly
8. ✅ Feed grouped by Issue/Year. Generalized the issue math into reusable helpers
   (`issueInfo` / `issueLabelOf` / `issueInfoOfDate`) and `groupByIssue()`; each
   issue renders as a `<section class="issue-group">` with a mono label header.
9. ✅ Pagination via a `PAGE_SIZE = 9` cap and a translatable "Show all N essays" /
   "Show fewer" toggle (`#show-more-wrap`). `renderAll()` now owns filtering,
   grouping, and pagination by rebuilding the DOM (replacing the old
   display-toggle `applyFilter`), so topic filter + pagination compose without
   state drift. New `showAll`/`showLess` keys added (en + bg; others fall back).
10. ⏭ Skipped splitting `articles.js` into generated JSON. The Phase 2 script
    already writes `articles.js` as the single source of truth; a second JSON
    artifact would reintroduce the dual-source problem this plan exists to kill.

### Phase 4 — SSG migration evaluation (the task was *evaluate*, not migrate)

**Verdict: do NOT migrate now. Revisit only when a human commits to translating
whole essays into ≥2 languages.** The trigger condition in this phase's own title
("only if translation becomes real") is not met — translation today is
chrome-only (`translations.js`), and the single `bg.json` is an orphaned stub.

Why migrating now is the wrong call:
- **No problem to solve yet.** The static model + Phase 2 script already make
  "publish an essay" a minutes-long task. Astro/Eleventy adds a Node toolchain,
  a build step, and a deploy pipeline to a repo that currently ships by copying
  files — pure cost, zero current benefit.
- **It fights the ethos.** The essays are hand-crafted (bespoke pull-quotes,
  carousels, inline emphasis). That's an argument *for* hand-written HTML, the
  same reason Phase-1 killed the JSON loader. An SSG only pays off when content
  is uniform enough to template.
- **The real blocker is content, not tooling.** 24-language per-essay translation
  is a human-labor problem. No generator reduces that; it only reorganizes where
  the already-translated text lives.

If/when translation becomes real, the migration target (for the record, so this
isn't re-litigated later):
- **Eleventy over Astro** for this project — simpler, zero-config-ish, Nunjucks/
  Markdown maps directly onto the current static pages without a component
  rewrite. Astro's islands/component model is more than a static essay journal needs.
- Shape: one Markdown file per essay per language (`essays/<slug>/<lang>.md`),
  front-matter carrying the fields now in `articles.js` (title, topic, date,
  hero, readTime). The feed (`articles.js`) becomes a build-time collection, not
  a hand-edited array — eliminating the slug-bug class entirely.
- Keep the existing `index.css` / visual identity; migrate layout into a base
  template. Generate `/`, `/<lang>/`, and per-essay pages at build.
- **Do NOT** resurrect the `ARTICLE_BODY` JSON loader — Markdown front-matter is
  the supported path; the old loader stays deleted.

No code was changed in Phase 4 — by design. The deliverable is this decision.

---

## One-line summary
Not a dead end — but you are maintaining three article architectures and shipping
one. Collapse to a single static model, add a 20-line "new essay" script, and
group the feed by issue. After that, 20+ essays is a content problem, not a code
problem.
