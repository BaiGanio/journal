# How to Add a Translation

Thank you for contributing to *Shadows within the Cave*! Adding a translation takes about 20 minutes and requires **no coding knowledge** — just a text editor.

---

## File structure

Every article lives in its own folder and has a `translations/` subfolder:

```
my-article/
├── index.html          ← the article page (don't edit this)
├── translations/
│   ├── en.json         ← English source (always present, your reference)
│   ├── bg.json         ← Bulgarian
│   └── de.json         ← your new translation goes here
└── assets/
```

---

## Step-by-step

### 1. Copy the English file

```
translations/en.json  →  translations/XX.json
```

Replace `XX` with the [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for your language:

| Language   | Code | Language   | Code |
|------------|------|------------|------|
| Bulgarian  | `bg` | German     | `de` |
| French     | `fr` | Spanish    | `es` |
| Italian    | `it` | Polish     | `pl` |
| Dutch      | `nl` | Romanian   | `ro` |
| Greek      | `el` | Swedish    | `sv` |
| Czech      | `cs` | Hungarian  | `hu` |

### 2. Edit your new file

Open it in any text editor. Fill in the translated values. **Only translate the values (right side), never the keys (left side).**

```json
{
  "_language": "German",
  "_language_native": "Deutsch",
  "_lang_code": "de",

  "ARTICLE_TOPIC": "Philosophie",    ← translate this
  "ARTICLE_TITLE": "Die Höhle und der Bildschirm",
  ...
}
```

Keys that start with `_` are metadata — fill them in but they don't need translation.

**Image paths** (`ARTICLE_IMAGE`, `ARTICLE_IMAGE_1`, etc.) — **do not translate**, leave them identical to the English file unless your version has different photos.

### 3. Translate the body

The `ARTICLE_BODY` array contains the article text as structured blocks:

```json
"ARTICLE_BODY": [
  { "type": "p",          "text": "Translate this paragraph." },
  { "type": "h2",         "text": "Translate this heading." },
  { "type": "blockquote", "text": "Translate this quote." },
  { "type": "hr" }        ← no text, leave as-is
]
```

Translate every `"text"` value. The `"type"` values (`p`, `h2`, `blockquote`, `hr`) **must not change**.

### 4. Activate your language

Open the article's `index.html` in a text editor and find the `AVAILABLE_LANGS` array near the bottom. Uncomment (or add) your language:

```javascript
const AVAILABLE_LANGS = [
  { code: 'en', label: 'English',  englishLabel: 'English'  },
  { code: 'bg', label: 'Български', englishLabel: 'Bulgarian' },
  { code: 'de', label: 'Deutsch',  englishLabel: 'German'   }, // ← add this line
];
```

### 5. Test it

Open the article in a browser. Click the language selector (top right). Your language should appear and switch the full article.

---

## Tips

- Use the English file as your source of truth, not another translation.
- Keep punctuation and quotation marks consistent with your language's conventions.
- If a proper noun (name, place, title) has a widely accepted translation in your language, use it. Otherwise leave it in the original language.
- For blockquotes that cite a classical work (e.g. Plato), use the established published translation in your language if one exists.

---

```txt
/* <!-- ── i18n loader ──────────────────────────────────────────────────
      HOW IT WORKS
      ─────────────
      1. Put translation files like in the below example:
             translations/ai-fairy-tale-one/en.json   ← always required (source of truth)
             translations/ai-fairy-tale-one/bg.json
             translations/ai-fairy-tale-one/de.json   … etc.

      2. List every available language in AVAILABLE_LANGS below.
         (Only languages with a real .json file should be listed.)

      3. The loader picks the user's browser language automatically,
         falls back to "en", and lets the reader switch at any time.
         The choice is remembered in localStorage.

      4. To add a new language: drop in the .json, add one line here.
 ──────────────────────────────────────────────────────────────────── --> */
 ```

## Questions?

Open an issue or send a message to the project maintainer. Thank you! 🌍
