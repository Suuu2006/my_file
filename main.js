/* =====================================================================
   main.js：把 data.js 的內容畫成卡片／時間軸，並處理放大視窗、淡入、回頂端。
   一般不需要改這個檔案，內容請改 data.js。
   ===================================================================== */
(function () {
  'use strict';

  const GRADE_NAMES = ['', '大一', '大二', '大三', '大四'];
  const KIND_LABEL = { competitions: '重要經歷', projects: '專案作品', activities: '課外活動' };
  const KIND_GLYPH = { competitions: '競', projects: '作', activities: '活' };
  const LISTS = { competitions: COMPETITIONS, projects: PROJECTS, activities: ACTIVITIES };

  /* ---------- 小工具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(d) { return d.replace(/-/g, '.'); }
  function gradeOf(d) {
    const p = d.split('-');
    const y = +p[0], m = +p[1];
    const start = m >= 9 ? y : y - 1;
    return GRADE_NAMES[start - ENTRY_YEAR + 1] || '';
  }
  function sorted(list) {
    const out = list.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    return SORT_ORDER === 'desc' ? out.reverse() : out;
  }
  // 取最新的 n 筆，再依設定的順序排好
  function latest(list, n) {
    const newestFirst = list.slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
    return sorted(newestFirst.slice(0, n));
  }
  function $(sel) { return document.querySelector(sel); }

  // 圖片載入失敗時：隱藏圖片，改顯示文字符號（不會破版）
  document.addEventListener('error', function (e) {
    const t = e.target;
    if (t && t.tagName === 'IMG') {
      t.style.display = 'none';
      const box = t.closest('.card-media, .dialog-media');
      if (box) box.classList.add('noimg');
    }
  }, true);


  /* ---------- 卡片 ---------- */
  function cardHTML(kind, it, opts) {
    opts = opts || {};
    const g = gradeOf(it.date);
    const media =
      '<div class="card-media' + (it.image ? '' : ' noimg') + '">' +
        (it.image ? '<img src="' + esc(it.image) + '" alt="' + esc(it.title) + '" loading="lazy">' : '') +
        '<span class="ph">' + KIND_GLYPH[kind] + '</span>' +
      '</div>';
    const body =
      '<div class="card-body">' +
        '<div class="card-meta"><span>' + fmt(it.date) + '</span>' + (g ? '<span class="chip">' + g + '</span>' : '') + '</div>' +
        '<h3>' + esc(it.title) + '</h3>' +
        (it.badge ? '<p class="card-badge">' + esc(it.badge) + '</p>' : '') +
        '<p class="card-sum">' + esc(it.summary) + '</p>' +
        '<span class="card-more">' + (opts.href ? '前往完整頁面' : '查看詳情') + ' →</span>' +
      '</div>';
    const cls = 'card' + (opts.horizontal ? ' card-h' : '');
    if (opts.href) {
      return '<a class="' + cls + '" href="' + esc(opts.href) + '">' + media + body + '</a>';
    }
    return '<article class="' + cls + '" tabindex="0" role="button" data-kind="' + kind + '" data-id="' + esc(it.id) +
           '" aria-label="查看「' + esc(it.title) + '」詳情">' + media + body + '</article>';
  }

  function renderGrid(sel, kind, items, hrefFn) {
    const el = $(sel);
    if (!el) return;
    el.innerHTML = items.map(function (it) {
      return cardHTML(kind, it, { href: hrefFn ? hrefFn(it) : null });
    }).join('');
  }

  function renderTimeline(sel, kind, items) {
    const el = $(sel);
    if (!el) return;
    el.innerHTML = items.map(function (it) {
      const g = gradeOf(it.date);
      return '<li class="tl-row" id="' + esc(it.id) + '">' +
        '<div class="tl-when"><span class="tl-date">' + fmt(it.date) + '</span>' + (g ? '<span class="tl-grade">' + g + '</span>' : '') + '</div>' +
        '<div class="tl-dot"></div>' +
        '<div class="tl-card">' + cardHTML(kind, it, { horizontal: true }) + '</div>' +
      '</li>';
    }).join('');
  }

  function renderSkills(sel) {
    const el = $(sel);
    if (!el) return;
    function chips(arr) {
      return '<div class="tags">' + (arr || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>';
    }
    function group(title, arr) {
      return (arr && arr.length) ? '<div class="panel-group"><h3>' + title + '</h3>' + chips(arr) + '</div>' : '';
    }
    el.innerHTML =
      '<article class="panel">' +
        group('硬實力', SKILLS.hard) +
        group('工具', SKILLS.tools) +
      '</article>' +
      '<article class="panel">' +
        group('軟實力', SKILLS.soft) +
        group('證照', SKILLS.certs) +
      '</article>';
  }


  /* ---------- 詳情放大視窗（照片 + 說明） ---------- */
  let dlg = null;
  const state = { kind: null, list: [], index: 0, trigger: null };

  function buildDialog() {
    dlg = document.createElement('div');
    dlg.className = 'dialog';
    dlg.setAttribute('aria-hidden', 'true');
    dlg.innerHTML =
      '<div class="dialog-backdrop" data-close></div>' +
      '<div class="dialog-panel" role="dialog" aria-modal="true" aria-label="詳細內容">' +
        '<button type="button" class="dialog-close" data-close aria-label="關閉">×</button>' +
        '<div class="dialog-media"><img alt=""><span class="ph"></span></div>' +
        '<div class="dialog-info"></div>' +
      '</div>';
    document.body.appendChild(dlg);

    dlg.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) { closeDialog(); return; }
      const s = e.target.closest('[data-step]');
      if (s) step(+s.getAttribute('data-step'));
    });
  }

  function fillDialog() {
    const it = state.list[state.index];
    const kind = state.kind;
    const panel = dlg.querySelector('.dialog-panel');
    const media = dlg.querySelector('.dialog-media');
    const img = media.querySelector('img');
    const info = dlg.querySelector('.dialog-info');

    media.querySelector('.ph').textContent = KIND_GLYPH[kind];
    media.classList.remove('noimg');
    if (it.image) {
      panel.classList.remove('no-media');
      img.style.display = '';
      img.src = it.image;
      img.alt = it.title;
    } else {
      panel.classList.add('no-media');
    }

    const g = gradeOf(it.date);
    const meta = [fmt(it.date), g, it.role].filter(Boolean).join('　・　');
    const paras = String(it.detail || it.summary || '').split('\n').filter(Boolean)
      .map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    const tags = it.tags && it.tags.length
      ? '<div class="tags">' + it.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' : '';
    const link = it.link && it.link.url
      ? '<a class="btn btn-primary" href="' + esc(it.link.url) + '" target="_blank" rel="noopener">' + esc(it.link.label || '查看相關連結') + ' →</a>' : '';
    const pager = state.list.length > 1
      ? '<div class="dialog-pager">' +
          '<button type="button" data-step="-1" aria-label="上一個">‹ 上一個</button>' +
          '<span>' + (state.index + 1) + ' / ' + state.list.length + '</span>' +
          '<button type="button" data-step="1" aria-label="下一個">下一個 ›</button>' +
        '</div>' : '';

    info.innerHTML =
      '<p class="dlg-kind">' + esc(it.kind || KIND_LABEL[kind]) + '</p>' +
      '<h3 class="dlg-title">' + esc(it.title) + '</h3>' +
      '<p class="dlg-meta">' + esc(meta) + '</p>' +
      (it.badge ? '<p class="card-badge">' + esc(it.badge) + '</p>' : '') +
      '<div class="dlg-desc">' + paras + '</div>' +
      tags +
      (link ? '<div class="dlg-actions">' + link + '</div>' : '') +
      pager;
    info.scrollTop = 0;
  }

  function openDialog(kind, id, trigger) {
    if (!dlg) buildDialog();
    const list = sorted(LISTS[kind]);
    const idx = list.findIndex(function (x) { return x.id === id; });
    if (idx < 0) return;
    state.kind = kind; state.list = list; state.index = idx; state.trigger = trigger || null;
    fillDialog();
    dlg.classList.add('open');
    dlg.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    dlg.querySelector('.dialog-close').focus();
  }

  function closeDialog() {
    if (!dlg) return;
    dlg.classList.remove('open');
    dlg.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (state.trigger) { state.trigger.focus({ preventScroll: true }); }
  }

  function step(d) {
    const n = state.list.length;
    state.index = (state.index + d + n) % n;
    fillDialog();
  }

  document.addEventListener('click', function (e) {
    const c = e.target.closest('.card[data-kind]');
    if (c) openDialog(c.dataset.kind, c.dataset.id, c);
  });
  document.addEventListener('keydown', function (e) {
    const open = dlg && dlg.classList.contains('open');
    if (open) {
      if (e.key === 'Escape') closeDialog();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.card[data-kind]')) {
      e.preventDefault();
      openDialog(e.target.dataset.kind, e.target.dataset.id, e.target);
    }
  });


  /* ---------- 捲動淡入 ---------- */
  function initReveal() {
    const targets = document.querySelectorAll(
      '.avatar-lg, .hero-text, .page-head > *, .sec-head, .panel, .grid > .card, .tl-row, .contact .container > *'
    );
    targets.forEach(function (t) { t.classList.add('reveal'); });
    document.querySelectorAll('.grid').forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty('--d', (i % 4) * 0.08 + 's'); });
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('visible'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }


  /* ---------- 回到頂端 ---------- */
  function initToTop() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'to-top';
    btn.setAttribute('aria-label', '回到頂端');
    btn.textContent = '↑';
    document.body.appendChild(btn);
    function toggle() { btn.classList.toggle('show', window.scrollY > 500); }
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }


  /* ---------- 從首頁卡片跳進來時：捲到該項目並標示 ---------- */
  function focusHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const row = document.getElementById(id);
    if (!row || !row.classList.contains('tl-row')) return;
    row.classList.add('visible');
    setTimeout(function () {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.classList.add('flash');
      setTimeout(function () { row.classList.remove('flash'); }, 2600);
    }, 250);
  }


  /* ---------- 依頁面渲染 ---------- */
  const page = document.body.getAttribute('data-page');

  if (page === 'home') {
    renderGrid('#importantGrid', 'competitions', latest(COMPETITIONS, HOME_COMPETITIONS_LIMIT), function (it) { return 'competitions.html#' + it.id; });
    renderSkills('#skillsMount');
    renderGrid('#projectsGrid', 'projects', sorted(PROJECTS).filter(function (p) { return p.featured; }),
      function (it) { return 'projects.html#' + it.id; });
    renderGrid('#activitiesGrid', 'activities', sorted(ACTIVITIES));
  } else if (page === 'competitions') {
    renderTimeline('#timeline', 'competitions', sorted(COMPETITIONS));
  } else if (page === 'projects') {
    renderTimeline('#timeline', 'projects', sorted(PROJECTS));
  }

  initReveal();
  initToTop();
  if (page !== 'home') focusHash();
})();
