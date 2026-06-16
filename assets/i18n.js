 // ── i18n bootstrap ────────────────────────────────────────
// Runs after translations.js & articles.js, before index.js below.
(function () {
  const STORAGE_KEY = "sitc-lang";
  const DEFAULT_LANG = "en";
  // Detect browser language preference matching EU_LANGUAGES
  function detectBrowserLang() {
    const nav = navigator.languages || [navigator.language || "en"];
    for (const lang of nav) {
      const code = lang.split("-")[0].toLowerCase();
      if (EU_LANGUAGES.find(l => l.code === code)) return code;
    }
    return DEFAULT_LANG;
  }
  function getStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }
  function storeLang(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
  }
  function applyLang(code) {
    window.__activeLang = code;
    const langObj = EU_LANGUAGES.find(l => l.code === code);
    document.documentElement.lang = code;
    document.documentElement.dir = langObj && langObj.rtl ? "rtl" : "ltr";
    storeLang(code);
    // Mark active chip
    document.querySelectorAll(".lang-chip").forEach(btn => {
      const active = btn.dataset.code === code;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    // Update the collapsed toggle to show the active language
    if (langObj) {
      const flag = document.getElementById("lang-current-flag");
      if (flag) flag.src = `https://flagcdn.com/w40/${langObj.cc}.png`;
      const name = document.getElementById("lang-current-name");
      if (name) name.textContent = langObj.name;
    }
    // Update static UI strings
    const tagTitleEl = document.getElementById("masthead-title");
    if (tagTitleEl) tagTitleEl.textContent = t("tagtitle");
    const taglineEl = document.getElementById("masthead-tagline");
    if (taglineEl) {
      taglineEl.textContent = t("tagline") + "  ·  " + t("issueFrequency");
    }
    const sidebarRecent = document.getElementById("sidebar-recent-heading");
    if (sidebarRecent) sidebarRecent.textContent = t("sidebarRecentHeading");
    const sidebarAbout = document.getElementById("sidebar-about-heading");
    if (sidebarAbout) sidebarAbout.textContent = t("sidebarAboutHeading");
    const aboutText = document.getElementById("about-text");
    if (aboutText) aboutText.innerHTML = t("about");
    const footerTitle = document.getElementById("footer-title");
    if (footerTitle) footerTitle.textContent = t("footerText");
    // Re-render dynamic content if index.js exposes a render function
    if (typeof window.renderArticles === "function") {
      window.renderArticles();
    }
  }
  // Build the always-visible flag bar
  function buildLangBar() {
    const grid = document.getElementById("lang-grid");
    EU_LANGUAGES.forEach(lang => {
      const btn = document.createElement("button");
      btn.className = "lang-chip";
      btn.dataset.code = lang.code;
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", "false");
      btn.innerHTML =
        `<img src="https://flagcdn.com/w40/${lang.cc}.png" width="20" height="15" alt="" loading="lazy" />` +
        `<span>${lang.name}</span>`;
      btn.addEventListener("click", () => {
        applyLang(lang.code);
        closeGrid();
      });
      grid.appendChild(btn);
    });
  }
  function openGrid() {
    document.getElementById("lang-grid").classList.add("open");
    document.getElementById("lang-toggle").setAttribute("aria-expanded", "true");
  }
  function closeGrid() {
    document.getElementById("lang-grid").classList.remove("open");
    document.getElementById("lang-toggle").setAttribute("aria-expanded", "false");
  }
  document.addEventListener("DOMContentLoaded", function () {
    buildLangBar();
    // Toggle open/close
    const toggle = document.getElementById("lang-toggle");
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = document.getElementById("lang-grid").classList.contains("open");
      isOpen ? closeGrid() : openGrid();
    });
    // Close on outside click; keep open when clicking inside the grid
    document.addEventListener("click", closeGrid);
    document.getElementById("lang-grid").addEventListener("click", function (e) { e.stopPropagation(); });
    // Apply initial language
    const initial = getStoredLang() || detectBrowserLang();
    applyLang(initial);
  });
})();
