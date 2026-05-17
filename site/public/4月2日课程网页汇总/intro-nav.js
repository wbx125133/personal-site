/* ═══════════════════════════════════════════════
   Navigation Component — Intro Module
   ═══════════════════════════════════════════════ */

(function () {
  const PAGES = [
    { file: 'intro-1.html', label: '产品基础与核心视角' },
    { file: 'intro-2.html', label: '产品经理发展史与技术驱动' },
    { file: 'intro-3.html', label: '人工智能发展阶段与大模型产业' },
    { file: 'intro-4.html', label: '大模型评测与国内外对比' },
    { file: 'intro-5.html', label: '产品经理核心能力模型' },
    { file: 'intro-6.html', label: '产品项目落地全工作流' },
    { file: 'intro-7.html', label: 'AIPM核心详解' },
  ];

  const current = parseInt(document.body.dataset.slide || '1', 10);
  const total = PAGES.length;
  const prevPage = current > 1 ? PAGES[current - 2].file : 'index.html';
  const nextPage = current < total ? PAGES[current].file : null;

  /* ── Home Button ── */
  const home = document.createElement('a');
  home.href = 'index.html';
  home.className = 'home-btn';
  home.innerHTML = '← 首页';
  document.body.appendChild(home);

  /* ── Build DOM ── */
  const track = document.createElement('div');
  track.className = 'progress-track';
  document.body.appendChild(track);

  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.style.width = ((current / total) * 100) + '%';
  document.body.appendChild(bar);

  const nav = document.createElement('div');
  nav.className = 'nav-bar';

  const counter = document.createElement('div');
  counter.className = 'nav-counter';
  counter.textContent = String(current).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');

  const dots = document.createElement('div');
  dots.className = 'nav-dots';
  PAGES.forEach((p, i) => {
    const dot = document.createElement('a');
    dot.className = 'nav-dot' + (i + 1 === current ? ' active' : '');
    dot.href = p.file;
    dot.title = p.label;
    dots.appendChild(dot);
  });

  const arrows = document.createElement('div');
  arrows.className = 'nav-arrows';

  const arrL = document.createElement('a');
  arrL.className = 'nav-arr';
  arrL.href = prevPage;
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
