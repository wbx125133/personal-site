/* ═══════════════════════════════════════════════
   Navigation Component
   Injects bottom nav bar, progress bar, keyboard/click navigation
   ═══════════════════════════════════════════════ */

(function () {
  const PAGES = [
    { file: 'slide-2.html',   label: '训练三阶段' },
    { file: 'slide-3.html',   label: 'Transformer' },
    { file: 'slide-4.html',   label: '自回归生成' },
    { file: 'slide-5.html',   label: '泛化能力' },
    { file: 'slide-6.html',   label: '涌现能力' },
    { file: 'slide-7.html',   label: '局限性' },
    { file: 'slide-8.html',   label: 'Prompt基础' },
    { file: 'slide-9.html',   label: 'Prompt技巧' },
    { file: 'slide-10.html',  label: '少量样本' },
    { file: 'slide-11.html',  label: '协作象限' },
    { file: 'slide-12.html',  label: '象限应用' },
  ];

  const currentFile = location.pathname.split('/').pop();
  const currentIdx = PAGES.findIndex(p => p.file === currentFile);
  const current = currentIdx + 1;
  const total = PAGES.length;
  const prevPage = currentIdx > 0 ? PAGES[currentIdx - 1].file : 'index.html';
  const nextPage = currentIdx < total - 1 ? PAGES[currentIdx + 1].file : null;

  /* ── Home Button ── */
  const home = document.createElement('a');
  home.href = 'index.html';
  home.className = 'home-btn';
  home.innerHTML = '← 知识库';
  document.body.appendChild(home);


  /* ── Personal Site Button ── */
  const siteHome = document.createElement('a');
  siteHome.href = '../index.html';
  siteHome.className = 'home-btn site-home-btn';
  siteHome.innerHTML = '返回个站 ↗';
  siteHome.setAttribute('aria-label', '返回王柏晰个人站');
  document.body.appendChild(siteHome);

  /* ── Build DOM ── */
  // Progress track + bar
  const track = document.createElement('div');
  track.className = 'progress-track';
  document.body.appendChild(track);

  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.style.width = ((current / total) * 100) + '%';
  document.body.appendChild(bar);

  // Bottom nav bar
  const nav = document.createElement('div');
  nav.className = 'nav-bar';

  // Counter
  const counter = document.createElement('div');
  counter.className = 'nav-counter';
  counter.textContent = String(current).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');

  // Dots
  const dots = document.createElement('div');
  dots.className = 'nav-dots';
  PAGES.forEach((p, i) => {
    const dot = document.createElement('a');
    dot.className = 'nav-dot' + (i === currentIdx ? ' active' : '');
    dot.href = p.file;
    dot.title = p.label;
    dots.appendChild(dot);
  });

  // Arrows
  const arrows = document.createElement('div');
  arrows.className = 'nav-arrows';

  const arrL = document.createElement('a');
  arrL.className = 'nav-arr' + (prevPage ? '' : ' disabled');
  arrL.href = prevPage || '#';
  arrL.innerHTML = '‹';
  arrL.setAttribute('aria-label', '上一页');

  const arrR = document.createElement('a');
  arrR.className = 'nav-arr' + (nextPage ? '' : ' disabled');
  arrR.href = nextPage || '#';
  arrR.innerHTML = '›';
  arrR.setAttribute('aria-label', '下一页');

  arrows.appendChild(arrL);
  arrows.appendChild(arrR);

  nav.appendChild(counter);
  nav.appendChild(dots);
  nav.appendChild(arrows);
  document.body.appendChild(nav);

  /* ── Keyboard Navigation ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (nextPage) window.location.href = nextPage;
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (prevPage) window.location.href = prevPage;
    }
  });

  /* ── Click hot zones (left/right 15%) ── */
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-bar') || e.target.closest('.card') || e.target.closest('a') || e.target.closest('button') || e.target.closest('.tab-btn')) return;
    const x = e.clientX / window.innerWidth;
    if (x < 0.15 && prevPage) window.location.href = prevPage;
    if (x > 0.85 && nextPage) window.location.href = nextPage;
  });

  /* ── Scroll-reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.05 });
  revealEls.forEach(el => obs.observe(el));
  setTimeout(() => revealEls.forEach(el => el.classList.add('visible')), 300);
})();
