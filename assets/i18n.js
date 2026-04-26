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
    document.documentElement.lang = code;
    storeLang(code);
    // Update label
    const langObj = EU_LANGUAGES.find(l => l.code === code) || { name: "English" };
    document.getElementById("lang-label").textContent = langObj.name;
    // Mark active option
    document.querySelectorAll(".lang-option").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.code === code);
    });
    // Update static UI strings
    const tagTitleEl = document.getElementById("masthead-title");
    if (tagTitleEl) tagTitleEl.textContent = t("tagtitle");
    const taglineEl = document.getElementById("masthead-tagline");
    if (taglineEl) {
      taglineEl.textContent = t("tagline") + " \u2002·\u2002 " + t("issueFrequency");
    }
    const filterLabel = document.getElementById("filter-label");
    if (filterLabel) filterLabel.textContent = t("topicsLabel");
    const pillAll = document.getElementById("pill-all");
    if (pillAll) pillAll.textContent = t("topicAll");
    const pillHistory = document.getElementById("pill-history");
    if (pillHistory) pillHistory.textContent = t("topicHistory");
    const pillPhilosophy = document.getElementById("pill-philosophy");
    if (pillPhilosophy) pillPhilosophy.textContent = t("topicPhilosophy");
    const pillScience = document.getElementById("pill-science");
    if (pillScience) pillScience.textContent = t("topicScience");
    const pillScifi = document.getElementById("pill-scifi");
    if (pillScifi) pillScifi.textContent = t("topicSciFi");
    const noResults = document.getElementById("no-results");
    if (noResults) noResults.textContent = t("noResults");
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
  // Build dropdown
  function buildDropdown() {
    const dropdown = document.getElementById("lang-dropdown");
    EU_LANGUAGES.forEach(lang => {
      const btn = document.createElement("button");
      btn.className = "lang-option";
      btn.dataset.code = lang.code;
      btn.textContent = lang.name;
      btn.setAttribute("role", "option");
      btn.addEventListener("click", () => {
        applyLang(lang.code);
        closeDropdown();
      });
      dropdown.appendChild(btn);
    });
  }
  function openDropdown() {
    const btn = document.getElementById("lang-switcher-btn");
    const dd = document.getElementById("lang-dropdown");
    btn.setAttribute("aria-expanded", "true");
    dd.classList.add("open");
  }
  function closeDropdown() {
    const btn = document.getElementById("lang-switcher-btn");
    const dd = document.getElementById("lang-dropdown");
    btn.setAttribute("aria-expanded", "false");
    dd.classList.remove("open");
  }
  document.addEventListener("DOMContentLoaded", function () {
    buildDropdown();
    // Toggle
    document.getElementById("lang-switcher-btn").addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = document.getElementById("lang-dropdown").classList.contains("open");
      isOpen ? closeDropdown() : openDropdown();
    });
    // Close on outside click
    document.addEventListener("click", function () { closeDropdown(); });
    document.getElementById("lang-dropdown").addEventListener("click", function (e) { e.stopPropagation(); });
    // Apply initial language
    const initial = getStoredLang() || detectBrowserLang();
    applyLang(initial);
  });
})();
  