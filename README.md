# Shadows within the Cave

### Project Structure
```txt
articles/                           ← GitHub repository root
│
├── index.html                      ← Landing page (auto-loads articles.json)
├── articles.json                   ← Master list of all published articles
│
├── articles/
│   ├── TEMPLATE.html               ← Copy this for every new essay
│   ├── the-stoic-and-the-machine.html
│   ├── light-from-dead-stars.html
│   └── cities-we-never-built.html
│
├── assets/
│   ├── images/
│   │   ├── stoic-machine.jpg
│   │   ├── dead-stars.jpg
│   │   └── cities-never-built.jpg
│   └── favicon.ico                 ← Optional
│
└── README.md                       ← Optional project notes
```

---

## Publishing a New Article — Checklist

### 1 · Write the article

Copy `articles/TEMPLATE.html` and rename it using a URL-friendly slug:

```
articles/my-new-essay-title.html
```

Replace all `ARTICLE_*` placeholders inside the file:

| Placeholder | Replace with |
|---|---|
| `ARTICLE_TITLE` | Full essay title |
| `ARTICLE_SUBTITLE` | One-line italic subtitle |
| `ARTICLE_TOPIC` | e.g. `Philosophy`, `Science`, `Science Fiction` |
| `ARTICLE_TOPIC_COLOR` | `#3d5a6b` / `#5a7a5e` / `#b85c38` |
| `ARTICLE_DATE` | e.g. `15 April 2025` |
| `ARTICLE_READTIME` | Estimated minutes, e.g. `7` |
| `ARTICLE_IMAGE` | Path from repo root: `assets/images/my-image.jpg` |
| `ARTICLE_IMAGE_ALT` | Descriptive alt text |
| `ARTICLE_IMAGE_CAPTION` | Short caption / source credit |
| `ARTICLE_EXCERPT` | 1–2 sentence summary (used in `<meta>` and landing page) |

Write your essay between the HTML comments in the `<article class="article-body">` block.

---

### 2 · Add the image

Place your image in `assets/images/` and compress it:

- Hero images: **max 1200 px wide**, JPEG at 80 % quality
- Aim for **< 300 KB** per image
- Recommended free tools: [Squoosh](https://squoosh.app), [TinyPNG](https://tinypng.com)

---

### 3 · Add the entry to `articles.json`

Open `articles.json` and **prepend** a new object to the array (newest first):

```json
{
  "id": "004",
  "slug": "articles/my-new-essay-title.html",
  "title": "My New Essay Title",
  "subtitle": "The one-line italic subtitle",
  "topic": "Philosophy",
  "topicColor": "philosophy",
  "date": "2025-04-15",
  "image": "assets/images/my-image.jpg",
  "imageAlt": "Descriptive alt text",
  "excerpt": "One or two sentences that draw the reader in.",
  "readTime": 7,
  "featured": false
}
```

> Set `"featured": true` on the essay you want displayed as the hero on the landing page.  
> Only one article should have `featured: true` at a time.

**Topic values and matching `topicColor`:**

| topic | topicColor |
|---|---|
| `"Philosophy"` | `"philosophy"` |
| `"Science"` | `"science"` |
| `"Science Fiction"` | `"scifi"` |
| `"History"` | `"history"` |

Add a new row to both tables if you introduce a new topic, and add a matching `.topic-pill` filter button in `index.html`.

---

### 4 · Commit and push

```bash
git add articles/my-new-essay-title.html assets/images/my-image.jpg articles.json
git commit -m "Publish: My New Essay Title"
git push origin main
```

GitHub Pages will deploy automatically within ~30 seconds.

---

## Section Elements Reference

Inside `<article class="article-body">` you can use:

```html
<p>             Paragraph (first gets a decorative drop cap)</p>
<h2>            Section heading (Playfair Display)</h2>
<h3>            Minor heading (monospaced, uppercase, muted)</h3>
<blockquote>    Pull quote with sepia left border</blockquote>
<hr />          Centred section divider rule
<a href="">     Inline link with sepia underline</a>

<!-- Optional second image inside the body -->
<figure class="body-image">
  <img src="../assets/images/second-image.jpg" alt="Description" />
  <figcaption>Caption text</figcaption>
</figure>
```

---

## Topic Colour Reference

| Topic | CSS variable | Hex |
|---|---|---|
| Philosophy | `--slate` | `#3d5a6b` |
| Science | `--sage` | `#5a7a5e` |
| Science Fiction | `--rust` | `#b85c38` |
| History | — | `#7a5e3a` |

---

## GitHub Pages Setup (first time only)

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under *Source*, select **Deploy from a branch → main → / (root)**.
4. Save. Your site will be live at `https://your-username.github.io/repository-name/`.

No build step. No dependencies. Pure static files.
