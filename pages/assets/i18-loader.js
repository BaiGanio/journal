
(() => {
    const STORAGE_KEY = 'swtc_lang'; // remembered across visits
    // ── 1. Pick initial language ───────────────────────────────────────
    const availableCodes = AVAILABLE_LANGS.map(l => l.code);

    function detectLang() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && availableCodes.includes(saved)) return saved;
      // Try browser language (e.g. "bg-BG" → "bg")
      const browser = (navigator.language || 'en').split('-')[0].toLowerCase();
      if (availableCodes.includes(browser)) return browser;
      return 'en';
    }

    let currentLang = detectLang();

    // ── 3. Build the language switcher UI ─────────────────────────────
    const langList  = document.getElementById('langList');
    const langLabel = document.getElementById('langLabel');
    const switcher  = document.getElementById('langSwitcher');

    function buildSwitcher(activeLang) {
      langList.innerHTML = '';
      AVAILABLE_LANGS.forEach(lang => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerHTML = `${lang.englishLabel} <span class="lang-native">${lang.label}</span>`;
        if (lang.code === activeLang) btn.classList.add('active');
        btn.addEventListener('click', () => {
          switcher.removeAttribute('open');
          applyLang(lang.code);
        });
        langList.appendChild(btn);
      });
      const active = AVAILABLE_LANGS.find(l => l.code === activeLang);
      langLabel.textContent = (active?.code ?? 'EN').toUpperCase();
    }

    // Close switcher when clicking outside
    document.addEventListener('click', e => {
      if (!switcher.contains(e.target)) switcher.removeAttribute('open');
    });

    // ── 4. Load & apply a translation ─────────────────────────────────
    async function applyLang(code) {
      try {
        const res = await fetch(`assets/translations/${code}.json`);
        if (!res.ok) throw new Error(`No translation file for "${code}"`);
        const t = await res.json();

        // Update <html lang="">
        document.documentElement.lang = code;

        // Update <title> and meta tags
        document.title = t.ARTICLE_TITLE ?? document.title;
        setMeta('description',  t.ARTICLE_EXCERPT);
        setMeta('og:title',     t.ARTICLE_TITLE);
        setMeta('og:description', t.ARTICLE_EXCERPT);
        setMetaProp('og:image', t.ARTICLE_IMAGE ? `../${t.ARTICLE_IMAGE}` : null);

        // Replace all [data-i18n="KEY"] text nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.dataset.i18n;
          if (t[key] !== undefined) el.textContent = t[key];
        });

        // Replace [data-i18n-src] and [data-i18n-alt] on images
        document.querySelectorAll('[data-i18n-src]').forEach(img => {
          const srcKey = img.dataset.i18nSrc;
          const altKey = img.dataset.i18nAlt;
          if (t[srcKey]) img.src = `../${t[srcKey]}`;
          if (t[altKey]) img.alt = t[altKey];
        });

        // Render ARTICLE_BODY from JSON array
        renderBody(t.ARTICLE_BODY ?? []);

        // Optional: build carousel images if present
        buildCarousel(t);

        // Remember choice
        localStorage.setItem(STORAGE_KEY, code);
        currentLang = code;
        buildSwitcher(code);

        // Reveal page
        document.body.classList.remove('i18n-loading');
        document.body.classList.add('i18n-ready');

      } catch (err) {
        console.warn('[i18n]', err.message);
        if (code !== 'en') applyLang('en'); // graceful fallback
      }
    }

    // ── 5. Render structured body blocks ──────────────────────────────
    function renderBody(blocks) {
      const article = document.getElementById('article-id');
      if (!article) return;
      article.innerHTML = '';
      blocks.forEach((block, i) => {
        let el;
        switch (block.type) {
          case 'p':
            el = document.createElement('p');
            el.textContent = block.text;
            // Drop-cap on first paragraph
            if (i === 0) el.classList.add('drop-cap');
            break;
          case 'h2':
            el = document.createElement('h2');
            el.textContent = block.text;
            break;
          case 'h3':
            el = document.createElement('h3');
            el.textContent = block.text;
            break;
          case 'blockquote':
            el = document.createElement('blockquote');
            el.textContent = block.text;
            break;
          case 'hr':
            el = document.createElement('hr');
            break;
          case 'code':
            el = document.createElement('pre');
            const code = document.createElement('code');
            code.textContent = block.text;
            el.appendChild(code);
            break;
          default:
            return; // skip unknown block types
        }
        article.appendChild(el);
      });
    }

    // ── 6. Optional carousel builder ──────────────────────────────────
    function buildCarousel(t) {
      const track = document.getElementById('carouselTrack');
      if (!track) return;
      track.innerHTML = '';
      [1, 2, 3].forEach(n => {
        const src = t[`ARTICLE_IMAGE_${n}`];
        const alt = t[`ARTICLE_IMAGE_ALT_${n}`];
        if (src) {
          const img = document.createElement('img');
          img.src = `../${src}`;
          img.alt = alt ?? '';
          track.appendChild(img);
        }
      });
    }

    // ── 7. Meta helpers ────────────────────────────────────────────────
    function setMeta(name, content) {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (el) el.setAttribute('content', content);
    }
    function setMetaProp(prop, content) {
      if (!content) return;
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (el) el.setAttribute('content', content);
    }

    // ── 8. Boot ───────────────────────────────────────────────────────
    buildSwitcher(currentLang);
    applyLang(currentLang);

    // Footer year (unchanged from original)
    const fy = document.getElementById('footer-year');
    if (fy) fy.textContent = new Date().getFullYear();

})();