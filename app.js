// app.js — faux game main-menu router + rendering. Vanilla JS, no build step.
(function () {
  const S = window.SITE;
  const app = document.getElementById('app');
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Title laid out as a per-letter grid so the two stacked words align column-for-column.
  const titleLetters = () => {
    const row = (word, cls) => word.toUpperCase().split('').map((ch) => `<span class="${cls}">${esc(ch)}</span>`).join('');
    return row(S.title[0], '') + row(S.title[1], 'l2');
  };

  // ---------- background ----------
  function buildBackground() {
    const bg = document.createElement('div');
    bg.id = 'bg';
    let particles = '';
    for (let i = 0; i < 22; i++) {
      const left = Math.random() * 100;
      const dur = 14 + Math.random() * 18;
      const delay = -Math.random() * dur;
      const size = 1 + Math.random() * 2.5;
      particles += `<span style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s"></span>`;
    }
    bg.innerHTML = `
      <div class="bg-base"></div>
      <div class="bg-blob b1"></div>
      <div class="bg-blob b2"></div>
      <div class="bg-crest"><div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div><div class="ring r4"></div></div>
      <div class="bg-particles">${particles}</div>
      <div class="bg-vignette"></div>
      <div class="bg-grain"></div>`;
    app.appendChild(bg);
  }

  // ---------- HUD ----------
  function hudTop() {
    const socials = S.social.map((s) => `<a class="social-btn" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} <span aria-hidden="true">\u2197</span></a>`).join('');
    return `
      <div class="hud-top">
        <div class="player-card">
          <div class="avatar" role="img" aria-label="Ryan Shah"></div>
          <div>
            <div class="pc-name">${esc(S.title.join(' '))}</div>
            <div class="pc-role">${esc(S.role)}</div>
            <span class="pc-rank">Rank \u00b7 Lead</span>
          </div>
        </div>
        <div class="hud-right">
          ${socials}
        </div>
      </div>`;
  }
  function hudBottom(kind) {
    const hint = kind === 'menu'
      ? `<span class="k"><span class="key">\u2191</span><span class="key">\u2193</span> Navigate</span><span class="k"><span class="key">\u23ce</span> Select</span>`
      : `<span class="k"><span class="key">Esc</span> Back to menu</span>`;
    return `<div class="hud-bottom"><div class="controls-hint">${hint}</div><span class="build-tag">\u00a9 ${new Date().getFullYear()} ${esc(S.title.join(' '))}</span></div>`;
  }

  // ---------- screens registry ----------
  const screens = {};
  function makeScreen(id, html) {
    const el = document.createElement('section');
    el.className = 'screen';
    el.id = id;
    el.innerHTML = html;
    app.appendChild(el);
    screens[id] = el;
    return el;
  }

  let current = 'boot';
  let busy = false;
  function go(next, opts = {}) {
    if (busy || next === current) return;
    busy = true;
    const from = screens[current];
    const to = screens[next];
    if (from) { from.classList.add('exit-back'); from.classList.remove('active'); }
    to.classList.add('enter-from');
    // force reflow then activate
    void to.offsetWidth;
    to.classList.add('active');
    to.classList.remove('enter-from');
    const prev = current;
    current = next;
    setTimeout(() => {
      if (from) from.classList.remove('exit-back');
      busy = false;
      if (typeof opts.onDone === 'function') opts.onDone();
      onEnter(next, prev);
    }, 560);
  }

  function onEnter(id, prev) {
    if (id === 'menu') {
      const m = screens.menu;
      m.classList.remove('menu-stagger'); void m.offsetWidth;
      if (prev === 'boot') m.classList.add('menu-stagger');
      setSel(selIndex, true);
    }
    if (id === 'about') animateBars();
  }

  // ---------- BOOT ----------
  function buildBoot() {
    makeScreen('boot', `
      <div class="boot-studio">
        <span class="mark"><span class="dot"></span>${esc(S.studio)} presents</span>
      </div>
      <h1 class="boot-title gridtitle">${titleLetters()}</h1>
      <div class="boot-tagline">${taglineHTML()}</div>
      <div class="boot-start">
        <div class="press">Press Start</div>
        <span class="hint">click anywhere \u00b7 or press \u23ce</span>
      </div>`);
    screens.boot.classList.add('active');
  }
  function taglineHTML() {
    // bold the last word ("feral")
    return esc(S.tagline).replace(/(\bferal\.?)/i, '<b>$1</b>');
  }

  // ---------- MENU ----------
  let selIndex = 0;
  function buildMenu() {
    const items = S.menu.map((m, i) => `
      <div class="menu-item" data-i="${i}" data-id="${m.id}">
        <span class="no">${esc(m.no)}</span>
        <div class="labels">
          <div class="mi-label">${esc(m.label)}</div>
          <div class="mi-sub">${esc(m.sub)}</div>
        </div>
        <span class="chev">\u25b8</span>
      </div>`).join('');
    makeScreen('menu', `
      ${hudTop()}
      <div id="menu-grid">
        <div class="menu-left">
          <h1 class="menu-title gridtitle">${titleLetters()}</h1>
          <div class="menu-tagline">${taglineHTML()}</div>
          <div class="menu-list">${items}</div>
        </div>
        <div class="preview" id="preview"></div>
      </div>
      ${hudBottom('menu')}`);
    // menu uses its own grid; override the generic .screen via inline above (so id #menu styling in css still applies)
    screens.menu.querySelectorAll('.menu-item').forEach((el) => {
      el.addEventListener('mouseenter', () => setSel(+el.dataset.i));
      el.addEventListener('click', () => selectCurrent());
    });
    renderPreview(0, true);
  }

  function setSel(i, force) {
    i = (i + S.menu.length) % S.menu.length;
    if (i === selIndex && !force) return;
    selIndex = i;
    screens.menu.querySelectorAll('.menu-item').forEach((el) => el.classList.toggle('sel', +el.dataset.i === i));
    renderPreview(i);
  }

  let previewTimer = null;
  function renderPreview(i, immediate) {
    const p = document.getElementById('preview');
    if (!p) return;
    const m = S.menu[i];
    const html = `
      <div class="preview-art">
        <picture>
          <source type="image/webp" srcset="${m.img.replace(/\.png$/, '.webp')}" />
          <img class="art-img" src="${m.img}" alt="" width="900" height="900" decoding="async" style="object-position:${m.pos || '50% 35%'}" />
        </picture>
        <span class="big">${esc(m.art)}</span>
      </div>
      <div class="preview-body">
        <h3>${esc(m.label)}</h3>
        <p>${esc(m.blurb)}</p>
        <div class="preview-tags">${m.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      </div>`;
    if (immediate) { p.innerHTML = html; return; }
    clearTimeout(previewTimer);
    p.classList.add('swap');
    previewTimer = setTimeout(() => { p.innerHTML = html; p.classList.remove('swap'); }, 180);
  }

  function selectCurrent() {
    const id = S.menu[selIndex].id;
    go(id);
  }

  // ---------- SECTION SCREENS ----------
  function sectionShell(id, innerHTML) {
    makeScreen(id, `
      <button class="back-btn" data-back><span class="key">Esc</span> Back to menu</button>
      <div class="section-inner">${innerHTML}</div>`);
    screens[id].querySelector('[data-back]').addEventListener('click', () => go('menu'));
  }

  function head(sec) {
    return `<div class="section-head">
      <div class="kicker">${esc(sec.kicker)}</div>
      <h2>${esc(sec.title)}</h2>
      <div class="lead">${esc(sec.lead)}</div>
    </div>`;
  }

  function buildAbout() {
    const a = S.sections.about;
    const stats = a.stats.map(([n, v]) => `
      <div class="cs-stat">
        <div class="row"><span class="n">${esc(n)}</span><span class="num">${v}</span></div>
        <div class="bar"><span class="fill" data-v="${v}" style="width:${v}%"></span></div>
      </div>`).join('');
    sectionShell('about', `
      ${head(a)}
      <div class="section-body">
        <div class="about-grid stagger">
          <div class="about-text">${a.body.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
          <div class="char-sheet">
            <div class="cs-head"><span class="t">Character Sheet</span><span class="v">Lv. ${esc(S.rank)}</span></div>
            ${stats}
          </div>
        </div>
      </div>`);
  }
  function animateBars() {
    screens.about.querySelectorAll('.cs-stat .fill').forEach((f) => {
      // base width is 0; setting it triggers the CSS transition (0 -> v%),
      // and jumps straight to v% when transitions are disabled.
      f.style.width = f.dataset.v + '%';
    });
  }

  function buildWork() {
    const w = S.sections.work;
    const cards = w.ops.map((o) => `
      <div class="op-card">
        <div class="op-top"><span class="op-tag ${o.tag}">${esc(o.tag)}</span><span class="op-years">${esc(o.years)}</span></div>
        <h3>${esc(o.codename)}</h3>
        <div class="op-role">${esc(o.role)}</div>
        <div class="op-desc">${esc(o.desc)}</div>
        <div class="op-chips">${o.chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div>
      </div>`).join('');
    sectionShell('work', `${head(w)}<div class="section-body"><div class="ops-grid stagger">${cards}</div></div>`);
  }

  function buildArchive() {
    const a = S.sections.archive;
    const cards = a.entries.map((e) => {
      const inner = `
        <span class="arc-tag">${esc(e.tag)}</span>
        <div><h3>${esc(e.title)}${e.url ? ' <span class="arc-ext" aria-hidden="true">\u2197</span>' : ''}</h3><p>${esc(e.desc)}</p></div>`;
      return e.url
        ? `<a class="arc-card" href="${esc(e.url)}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="arc-card">${inner}</div>`;
    }).join('');
    sectionShell('archive', `${head(a)}<div class="section-body"><div class="arc-grid stagger">${cards}</div></div>`);
  }

  function buildComms() {
    const c = S.sections.comms;
    const channels = S.social.map((s) => `<a class="comms-channel" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} <span aria-hidden="true">\u2197</span></a>`).join('');
    sectionShell('comms', `
      ${head(c)}
      <div class="section-body"><div class="comms-wrap stagger">
        <a class="comms-email" href="mailto:${esc(c.email)}">${esc(c.email)} <span class="arrow">\u2197</span></a>
        <div class="comms-channels">${channels}</div>
        ${c.note ? `<div class="comms-note">${esc(c.note)}</div>` : ''}
      </div></div>`);
  }

  // ---------- keyboard ----------
  document.addEventListener('keydown', (e) => {
    if (current === 'boot') {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go('menu'); }
      return;
    }
    if (current === 'menu') {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel(selIndex + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(selIndex - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCurrent(); }
      return;
    }
    // in a section
    if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); go('menu'); }
  });

  // boot: click anywhere to start
  function bootClick(e) {
    if (current !== 'boot') return;
    go('menu');
  }

  // ---------- init ----------
  buildBackground();
  buildBoot();
  buildMenu();
  buildAbout();
  buildWork();
  buildArchive();
  buildComms();
  screens.boot.addEventListener('click', bootClick);

  // small hook for verification / deep-linking
  window.__demo = { go, sel: setSel, screens, animateBars };
})();
