#!/usr/bin/env node
/*
 * new-essay.js — scaffold a new essay.
 *
 *   node scripts/new-essay.js
 *
 * Guided prompts. Creates:
 *   - pages/<slug>.html            (from pages/TEMPLATE.html)
 *   - assets/images/<slug>/        (drop your hero image here)
 *   - a new entry at the top of assets/articles.js
 *
 * No dependencies. Re-run safe: it refuses to overwrite an existing page.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = path.join(ROOT, 'pages', 'TEMPLATE.html');
const ARTICLES = path.join(ROOT, 'assets', 'articles.js');

// Buffered line queue: robust for both interactive TTY and piped/redirected input
// (avoids the readline race where piped lines arrive before the next question() registers).
const rl = readline.createInterface({ input: process.stdin });
const _lines = [];
const _waiters = [];
let _closed = false;
rl.on('line', l => (_waiters.length ? _waiters.shift()(l) : _lines.push(l)));
rl.on('close', () => { _closed = true; while (_waiters.length) _waiters.shift()(null); });
const nextLine = () => new Promise(res =>
  _lines.length ? res(_lines.shift()) : _closed ? res(null) : _waiters.push(res));
const ask = async (q, def) => {
  process.stdout.write(def ? `${q} [${def}]: ` : `${q}: `);
  const a = await nextLine();
  return (a == null ? '' : a.trim()) || def || '';
};

const slugify = s =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '')
    .trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const htmlEscape = s =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const humanDate = iso => {
  const d = new Date(iso + 'T12:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

function nextId(src) {
  const ids = [...src.matchAll(/"id":\s*"(\d+)"/g)].map(m => parseInt(m[1], 10));
  const max = ids.length ? Math.max(...ids) : 0;
  return String(max + 10).padStart(3, '0');
}

function renderTemplate(tpl, vals) {
  // Drop the carousel hero block — scaffold ships with the single-image hero.
  let out = tpl.replace(/<!-- Hero carousel -->[\s\S]*?<!-- Hero carousel -->\n?/, '');
  // Replace ARTICLE_* tokens. Negative lookahead so ARTICLE_IMAGE doesn't eat ARTICLE_IMAGE_ALT.
  const map = {
    ARTICLE_TITLE: vals.title,
    ARTICLE_SUBTITLE: vals.subtitle,
    ARTICLE_DATE: vals.dateHuman,
    ARTICLE_EXCERPT: vals.excerpt,
    ARTICLE_IMAGE_CAPTION: vals.caption,
    ARTICLE_IMAGE_ALT: vals.imageAlt,
    ARTICLE_IMAGE: vals.image,
  };
  return out.replace(/ARTICLE_[A-Z_]+(?![A-Z0-9_])/g, t => (t in map ? htmlEscape(map[t]) : t));
}

function insertArticle(src, entry) {
  const block = JSON.stringify(entry, null, 2).split('\n').map(l => '  ' + l).join('\n');
  return src.replace('const articles = [', 'const articles = [\n' + block + ',');
}

(async () => {
  console.log('\n  New essay for "Shadows within the Cave"\n  (press Enter to accept the [default])\n');

  const title = await ask('Title');
  if (!title) { console.error('Title is required.'); rl.close(); process.exit(1); }

  const slug = slugify(await ask('Slug', slugify(title)));
  const pagePath = path.join(ROOT, 'pages', `${slug}.html`);
  if (fs.existsSync(pagePath)) {
    console.error(`\n  pages/${slug}.html already exists — aborting (nothing changed).`);
    rl.close(); process.exit(1);
  }

  const subtitle = await ask('Subtitle');
  const excerpt = await ask('Excerpt (1–2 sentences for the feed card)');
  const imageName = await ask('Hero image filename (goes in the image folder)', 'hero.jpg');
  const imageAlt = await ask('Hero image alt text', '');
  const caption = await ask('Hero image caption', '');
  const date = await ask('Date (YYYY-MM-DD)', new Date().toISOString().slice(0, 10));
  const readTime = await ask('Read time label', '(X MIN READ)');
  const featured = /^y/i.test(await ask('Featured on the landing page? (y/N)', 'N'));

  rl.close();

  const image = `assets/images/${slug}/${imageName}`; // root-relative (for articles.js + ../ in page)

  // 1. Image folder
  const imgDir = path.join(ROOT, 'assets', 'images', slug);
  fs.mkdirSync(imgDir, { recursive: true });

  // 2. Page from template
  const html = renderTemplate(fs.readFileSync(TEMPLATE, 'utf8'), {
    title, subtitle, excerpt, image, imageAlt, caption, dateHuman: humanDate(date),
  });
  fs.writeFileSync(pagePath, html);

  // 3. articles.js entry
  let articlesSrc = fs.readFileSync(ARTICLES, 'utf8');
  const entry = {
    id: nextId(articlesSrc),
    slug: `pages/${slug}.html`,
    title,
    subtitle,
    date,
    image,
    ...(imageAlt ? { imageAlt } : {}),
    excerpt,
    readTime,
    featured,
  };
  fs.writeFileSync(ARTICLES, insertArticle(articlesSrc, entry));

  console.log(`
  Created:
    pages/${slug}.html
    assets/images/${slug}/   ← drop "${imageName}" here
    + entry #${entry.id} in assets/articles.js

  Next:
    1. Add your image:  assets/images/${slug}/${imageName}
    2. Write the essay body inside <article id="article-id"> in pages/${slug}.html
    3. Open index.html and click the new card to check it.
`);
})();
