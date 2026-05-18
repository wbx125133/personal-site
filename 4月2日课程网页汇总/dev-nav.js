/* ═══════════════════════════════════════════════
   Navigation Component — Dev Module
   ═══════════════════════════════════════════════ */

(function () {
  const PAGES = [
    { file: 'dev-1.html',  label: '团队工作流' },
    { file: 'dev-2.html',  label: '需求管理' },
    { file: 'dev-3.html',  label: 'MVP设计' },
    { file: 'dev-4.html',  label: 'LLM原理' },
    { file: 'dev-5.html',  label: 'Token与语义' },
    { file: 'dev-6.html',  label: '训练与能力' },
  ];

  const current = parseInt(document.body.dataset.slide || '1', 10);
  const total = PAGES.length;
  const prevPage = current > 1 ? PAGES[current - 2].file : 'index.html';
  const nextPage = current < total ? PAGES[current].file : null;

  /* ── Home Button ── */
  const home = document.createElement('a');
  home.href = 'index.html';
  home.className = 'home-btn';
  home.innerHTML = '知识库';
  document.body.appendChild(home);


  /* ── Personal Site Button ── */
  const siteHome = document.createElement('a');
  siteHome.href = '../index.html';
  siteHome.className = 'home-btn site-home-btn';
  siteHome.innerHTML = '返回个站';
  siteHome.setAttribute('aria-label', '返回王柏晰个人站');
  document.body.appendChild(siteHome);

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
