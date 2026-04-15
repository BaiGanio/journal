document.getElementById('footer-year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function() {
  const captions = [
    'ARTICLE_IMAGE_CAPTION_1',
    'ARTICLE_IMAGE_CAPTION_2',
    'ARTICLE_IMAGE_CAPTION_3',
  ];

  const imgs     = document.querySelectorAll('.carousel-track img');
  const dotsWrap = document.querySelector('.carousel-dots');
  const caption  = document.getElementById('heroCaption');
  let current = 0, animating = false, timer;

  // Guard clause
  if (!imgs.length || !dotsWrap) { return; }

  imgs.forEach((img, i) => {
    if (i !== 0) img.classList.add('from-right');
  });
  imgs[0].classList.add('active');

  // Build dots
  imgs.forEach((_, i) => {
    const d = document.createElement('span');
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => go(i));
    dotsWrap.appendChild(d);
  });

  function go(n) {
    if (animating) return;
    const next = (n + imgs.length) % imgs.length;
    if (next === current) return;
    animating = true;

    const goingForward = next > current ||
      (current === imgs.length - 1 && next === 0);

    const outgoing = imgs[current];
    const incoming = imgs[next];

    // Prepare incoming: place it just off-screen in the right direction
    incoming.classList.remove('from-right', 'from-left', 'leaving-left', 'leaving-right');
    incoming.classList.add(goingForward ? 'from-right' : 'from-left');

    // Force reflow so the initial position registers before transitioning
    incoming.getBoundingClientRect();

    // Transition outgoing out
    outgoing.classList.remove('active');
    outgoing.classList.add(goingForward ? 'leaving-left' : 'leaving-right');

    // Transition incoming in
    incoming.classList.remove('from-right', 'from-left');
    incoming.classList.add('active');

    // Update dots + caption
    dotsWrap.querySelectorAll('span').forEach((d, i) =>
      d.classList.toggle('active', i === next));
    if (caption) caption.textContent = captions[next];

    current = next;

    setTimeout(() => {
      outgoing.classList.remove('leaving-left', 'leaving-right');
      animating = false;
    }, 1800);

    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => go(current + 1), 10000);
  }

  document.querySelector('.carousel-btn.prev').addEventListener('click', () => go(current - 1));
  document.querySelector('.carousel-btn.next').addEventListener('click', () => go(current + 1));

  resetTimer();
});

document.addEventListener("DOMContentLoaded", function() {
    // 1. Find the article (Change 'article' to your specific tag or class)
    const article = document.getElementById('article-id');
    const timeSpan = document.getElementById('reading-time-id');
    if (article) {
        // 2. Strip tags and count words
        const text = article.innerText;
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        
        // 3. Calculate minutes (Average 238 WPM)
        const minutes = Math.ceil(words / 238);

        timeSpan.innerHTML = `${minutes} min read | (${words} words)`;
    }
});
