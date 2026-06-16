# How to Add an Essay

Thank you for contributing to *Shadows within the Cave*! Adding an essay takes a
few minutes of setup plus the time to write. **You don't edit `articles.js` by
hand** — a small script scaffolds everything for you.

You need [Node.js](https://nodejs.org) installed. Check with `node -v`.

---

## 1. Scaffold the essay

From the project root, run:

```bash
node scripts/new-essay.js
```

It asks a few questions (title, subtitle, topic, excerpt, hero image, date).
Press **Enter** to accept the `[default]` shown for any of them. When it finishes
it has created:

```
pages/<slug>.html              ← your new essay page
assets/images/<slug>/          ← put your image(s) here
```

…and added the essay to the landing-page feed (`assets/articles.js`) for you.

The **slug** is the URL-friendly name derived from your title
(e.g. *"Cities We Never Built"* → `cities-we-never-built`). The script won't
overwrite an essay that already exists.

---

## 2. Add your hero image

Drop your image into the folder the script created, using the filename you gave
it (default `hero.jpg`):

```
assets/images/<slug>/hero.jpg
```

---

## 3. Write the essay

Open `pages/<slug>.html` and write your content inside the
`<article id="article-id">` block. Replace the placeholder paragraphs. Available
elements:

| Element        | Use for                                   |
|----------------|-------------------------------------------|
| `<p>`          | paragraph (the first one gets a drop-cap) |
| `<h2>`         | section heading                           |
| `<h3>`         | minor heading (monospaced, uppercase)     |
| `<blockquote>` | pull quote                                |
| `<hr>`         | section divider                           |

The title, subtitle, topic, date, and hero image were filled in for you from
your answers — you normally don't need to touch the `<head>` or header.

### Want a multi-image carousel instead of one hero?

The scaffold ships with a single hero image. To use a swipeable carousel, copy
the `<figure class="hero-image-wrap">` carousel block from an existing essay
(`pages/cities-we-never-built.html` or `pages/ai-fairy-tale-one.html`) and
replace the single-image `<figure>` with it.

---

## 4. Check it

Open `index.html` in a browser, find your new card in the feed, and click
through to the essay. Confirm the image loads and the text reads correctly.

---

## Notes

- **Essays are hand-written static HTML.** There is no build step and no CMS —
  what you write is what ships. Keep the markup simple.
- **One source of truth for the feed:** `assets/articles.js`. Let the script
  write to it; editing it by hand is what used to cause broken links.
- **Read time / word count** in the meta line is a free-text label — update it
  yourself once the essay is written (e.g. `(6 MIN READ) | (1400 WORDS)`).

## Questions?

Open an issue or message the maintainer. Thank you! 🌍