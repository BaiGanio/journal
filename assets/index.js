/* ── Helpers ── */
const fmt = iso => {
    const d = new Date(iso + 'T12:00:00');
    const lang = window.__activeLang || 'en';
    return d.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });
};

const topicClass = topic => {
    const map = { 'Philosophy': 'philosophy', 'Science': 'science', 'Science Fiction': 'scifi', 'History': 'history' };
    return map[topic] || 'default';
};

const imgOrPlaceholder = (src, alt) => src
    ? `<img src="${src}" alt="${alt || ''}" style="object-fit:contain" loading="lazy" />`
    : `<div class="img-placeholder"><span>Image</span></div>`;

/* ── Issue label ── */
function getCurrentIssueLabel() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    let seasonIdx;
    if (month >= 3 && month <= 5)       seasonIdx = 1; // Spring
    else if (month >= 6 && month <= 8)  seasonIdx = 2; // Summer
    else if (month >= 9 && month <= 11) seasonIdx = 3; // Autumn
    else                                seasonIdx = 0; // Winter

    const startYear = 2025;
    const issueNum = (year - startYear) * 4 + seasonIdx + 1;
    const seasons = t('seasons');
    return t('issueLabel', issueNum, seasons[seasonIdx], year);
}

/* ── Render featured ── */
function renderFeatured(a) {
    document.getElementById('featured-block').innerHTML = `
    <p class="featured-eyebrow">${t('featuredTag')}</p>
    <div class="featured-img-wrap">${imgOrPlaceholder(a.image, a.imageAlt)}</div>
    <div class="d-flex align-items-center gap-2 mt-3">
        <span class="topic-badge ${topicClass(a.topic)}">${a.topic}</span>
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
    <a href="${a.slug}" class="article-card" data-topic="${a.topic}">
        <div>
        <p class="card-topic ${topicClass(a.topic)}">${a.topic}</p>
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
        <small>${a.topic} &ensp;·&ensp; ${fmt(a.date)}</small>
    </a>`;
}

/* ── Core render (called on init and on every language change) ── */
let _featured = null;

function renderAll() {
    // Issue bar
    document.getElementById('issue-label').textContent = getCurrentIssueLabel();

    // Footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // Featured
    renderFeatured(_featured);

    // Article list (skip featured)
    const list = articles.filter(a => a.id !== _featured.id);
    document.getElementById('article-list').innerHTML = list.map(cardHTML).join('');

    // Sidebar (3 most recent)
    document.getElementById('sidebar-list').innerHTML = articles.slice(0, 3).map(sidebarLinkHTML).join('');

    // Re-apply active filter
    const activeBtn = document.querySelector('.topic-pill.active');
    if (activeBtn && activeBtn.dataset.topic !== 'All') {
        applyFilter(activeBtn.dataset.topic);
    }
}

/* ── Filter logic ── */
function applyFilter(topic) {
    const cards = document.querySelectorAll('.article-card');
    let visible = 0;
    cards.forEach(card => {
        const match = topic === 'All' || card.dataset.topic === topic;
        card.style.display = match ? 'grid' : 'none';
        if (match) visible++;
    });
    document.getElementById('featured-block').style.display =
        (topic === 'All' || _featured.topic === topic) ? 'block' : 'none';
    document.getElementById('no-results').style.display = visible === 0 ? 'block' : 'none';
}

/* ── Init ── */
function init() {
    // Sort newest first
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Pick featured article
    _featured = articles.find(a => a.featured) || articles[0];

    // Initial render
    renderAll();

    // Filter pills
    document.querySelectorAll('.topic-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.topic-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.topic);
        });
    });
}

// Expose for the language switcher
window.renderArticles = renderAll;

init();