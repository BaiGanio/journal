/* ── Helpers ── */
const fmt = iso => {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
const topicClass = topic => {
    const map = { 'Philosophy': 'philosophy', 'Science': 'science', 'Science Fiction': 'scifi', 'History': 'history' };
    return map[topic] || 'default';
};
const imgOrPlaceholder = (src, alt, cls='') => src
    ? `<img src="${src}" alt="${alt}" style="object-fit: contain" loading="lazy" />`
    : `<div class="img-placeholder"><span>Image</span></div>`;

/* ── Render featured ── */
function renderFeatured(a) {
    document.getElementById('featured-block').innerHTML = `
    <p class="featured-eyebrow">Featured essay</p>
    <div class="featured-img-wrap">${imgOrPlaceholder(a.image, a.imageAlt)}</div>
    <div class="d-flex align-items-center gap-2 mt-3">
        <span class="topic-badge ${topicClass(a.topic)}">${a.topic}</span>
        <span class="read-time">${a.readTime}</span>
    </div>
    <h2 class="featured-title"><a href="${a.slug}">${a.title}</a></h2>
    <p class="featured-subtitle">${a.subtitle}</p>
    <p style="color:var(--muted);font-size:.92rem;">${a.excerpt}</p>
    <a href="${a.slug}" style="font-family:'DM Mono',monospace;font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink);padding-bottom:1px;">Read essay →</a>
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

/* ── Load & render ── */
async function init() {
    // Sort newest first
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Issue bar
    const latest = articles[0];
    document.getElementById('issue-label').textContent =
    `Latest: ${fmt(latest.date)} &ensp;·&ensp; ${articles.length} essays published`;

    // Footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // Featured
    const featured = articles.find(a => a.featured) || articles[0];
    renderFeatured(featured);

    // Article list (skip featured)
    const list = articles.filter(a => a.id !== featured.id);
    document.getElementById('article-list').innerHTML = list.map(cardHTML).join('');

    // Sidebar (3 most recent)
    document.getElementById('sidebar-list').innerHTML = articles.slice(0, 3).map(sidebarLinkHTML).join('');

    // Filter pills
    document.querySelectorAll('.topic-pill').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.topic-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const topic = btn.dataset.topic;
        const cards = document.querySelectorAll('.article-card');
        let visible = 0;
        cards.forEach(card => {
        const match = topic === 'All' || card.dataset.topic === topic;
        card.style.display = match ? 'grid' : 'none';
        if (match) visible++;
        });
        // Featured block
        const featuredTopic = featured.topic;
        document.getElementById('featured-block').style.display =
        (topic === 'All' || featuredTopic === topic) ? 'block' : 'none';
        document.getElementById('no-results').style.display = visible === 0 ? 'block' : 'none';
    });
    });
}

init().catch(console.error);