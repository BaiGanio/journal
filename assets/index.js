/* ── Helpers ── */
const fmt = iso => {
    const d = new Date(iso + 'T12:00:00');
    const lang = window.__activeLang || 'en';
    return d.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });
};

const imgOrPlaceholder = (src, alt) => src
    ? `<img src="${src}" alt="${alt || ''}" style="object-fit:contain" loading="lazy" />`
    : `<div class="img-placeholder"><span>Image</span></div>`;

/* ── Issue helpers ── */
// Given a year + month (1-12), return { num, seasonIdx, year } for the issue.
function issueInfo(year, month) {
    let seasonIdx;
    if (month >= 3 && month <= 5)       seasonIdx = 1; // Spring
    else if (month >= 6 && month <= 8)  seasonIdx = 2; // Summer
    else if (month >= 9 && month <= 11) seasonIdx = 3; // Autumn
    else                                seasonIdx = 0; // Winter

    const startYear = 2025;
    const num = (year - startYear) * 4 + seasonIdx + 1;
    return { num, seasonIdx, year };
}

function issueLabelOf({ num, seasonIdx, year }) {
    const seasons = t('seasons');
    return t('issueLabel', num, seasons[seasonIdx], year);
}

function issueInfoOfDate(iso) {
    const d = new Date(iso + 'T12:00:00');
    return issueInfo(d.getFullYear(), d.getMonth() + 1);
}

function getCurrentIssueLabel() {
    const now = new Date();
    return issueLabelOf(issueInfo(now.getFullYear(), now.getMonth() + 1));
}

// Group an (already newest-first) list of articles by issue, newest issue first.
function groupByIssue(list) {
    const groups = new Map();
    list.forEach(a => {
        const info = issueInfoOfDate(a.date);
        if (!groups.has(info.num)) {
            groups.set(info.num, { num: info.num, label: issueLabelOf(info), items: [] });
        }
        groups.get(info.num).items.push(a);
    });
    return [...groups.values()].sort((g1, g2) => g2.num - g1.num);
}

/* ── Render featured ── */
function renderFeatured(a) {
    document.getElementById('featured-block').innerHTML = `   
    <div class="featured-img-wrap">${imgOrPlaceholder(a.image, a.imageAlt)}</div>
    <div class="d-flex align-items-center gap-2 mt-3">
        <span class="read-time">${a.readTime}</span>
    </div>
    <h2 class="featured-title"><a href="${a.slug}">${a.title}</a></h2>
    <p class="featured-subtitle">${a.subtitle}</p>
    <p style="color:var(--muted);font-size:.92rem;">${a.excerpt}</p>
    <a href="${a.slug}" style="font-family:'DM Mono',monospace;font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink);padding-bottom:1px;">${t('readMore')} →</a>
    `;
}

/* ── Render article card ── */
function cardHTML(a) {
    return `
    <a href="${a.slug}" class="article-card">
        <div>
        <p class="card-title">${a.title}</p>
        <p class="card-excerpt">${a.excerpt}</p>
        <p class="card-meta">${fmt(a.date)} &ensp;·&ensp; ${a.readTime}</p>
        </div>
        <div class="card-img">${imgOrPlaceholder(a.image, a.imageAlt)}</div>
    </a>`;
}

/* ── Sidebar link ── */
function sidebarLinkHTML(a) {
    return `
    <a href="${a.slug}" class="sidebar-link">
        ${a.title}
        <small>${fmt(a.date)}</small>
    </a>`;
}

/* ── Core render (called on init and on every language change) ── */
const PAGE_SIZE = 9; // cards shown before the "Show all" toggle
let _featured = null;
let _showAll = false;

function renderAll() {
    // Issue bar
    document.getElementById('issue-label').textContent = getCurrentIssueLabel();

    // Footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // Featured
    renderFeatured(_featured);

    // Feed: everything except the featured article
    const list = articles.filter(a => a.id !== _featured.id);

    // Pagination: cap to PAGE_SIZE unless "show all" is active
    const shown = _showAll ? list : list.slice(0, PAGE_SIZE);

    // Group the shown cards by issue
    document.getElementById('article-list').innerHTML = groupByIssue(shown).map(g => `
    <section class="issue-group">
        <h3 class="issue-group-label">${g.label}</h3>
        ${g.items.map(cardHTML).join('')}
    </section>`).join('');

    // "Show all / show fewer" toggle
    const moreWrap = document.getElementById('show-more-wrap');
    if (list.length > PAGE_SIZE) {
        moreWrap.style.display = 'block';
        document.getElementById('show-more-btn').textContent =
            _showAll ? t('showLess') : t('showAll', list.length);
    } else {
        moreWrap.style.display = 'none';
    }

    // Sidebar (3 most recent)
    document.getElementById('sidebar-list').innerHTML = articles.slice(0, 3).map(sidebarLinkHTML).join('');
}

/* ── Init ── */
function init() {
    // Sort newest first
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Pick featured article
    _featured = articles.find(a => a.featured) || articles[0];

    // Initial render
    renderAll();

    // Show-all toggle
    document.getElementById('show-more-btn').addEventListener('click', () => {
        _showAll = !_showAll;
        renderAll();
    });
}

// Expose for the language switcher
window.renderArticles = renderAll;

init();