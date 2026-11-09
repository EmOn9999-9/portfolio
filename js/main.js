/* =========================================================
   Portfolio — rendering + interactions
   All content comes from PORTFOLIO in data.js
   ========================================================= */
(() => {
  const D = PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n, l = 2) => String(n).padStart(l, '0');

  const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'github', label: 'GitHub' },
    { id: 'contact', label: 'Contact' },
  ].filter(s => {
    // Hide sections that have no data
    const empty = { services: !D.services?.length, projects: !D.projects?.length, experience: !D.experience?.length }[s.id];
    if (empty) document.getElementById(s.id)?.remove();
    return !empty;
  });

  /* ---------- Render ---------- */
  function renderMeta() {
    document.title = `${D.profile.name} — Portfolio`;
    $('#logo').textContent = D.profile.shortName;
    $('#year').textContent = new Date().getFullYear();
    $('#footer-name').textContent = D.profile.name;
    if (D.profile.resume) $('#cv-btn').href = D.profile.resume;
    else $('#cv-btn').remove();
  }

  function renderNav() {
    const items = SECTIONS.slice(1);
    $('#nav-links').innerHTML = items.map(s =>
      `<li><a href="#${s.id}" data-nav="${s.id}" class="hover:text-fg transition-colors">${s.label}</a></li>`).join('');
    $('#mobile-links').innerHTML = items.map((s, i) =>
      `<li><a href="#${s.id}" class="flex gap-4"><span class="text-dim">${pad(i + 1)}</span>${s.label}</a></li>`).join('');
    $('#side-index').innerHTML = SECTIONS.map((s, i) =>
      `<a href="#${s.id}" data-side="${s.id}" class="flex items-center gap-2 hover:text-fg transition-colors"><span class="w-4 h-px bg-line transition-all"></span>${pad(i)}</a>`).join('');
    $('#side-socials').innerHTML = D.socials.map(s =>
      `<a href="${esc(s.url)}" target="_blank" rel="noopener" class="font-mono text-[10px] uppercase tracking-widest text-dim hover:text-fg [writing-mode:vertical-rl] rotate-180">${esc(s.name)}</a>`).join('')
      + '<span class="w-px h-16 bg-line"></span>';
  }

  function renderHero() {
    const p = D.profile;
    $('#hero-name').dataset.text = p.name;
    $('#hero-name').textContent = p.name;
    $('#hero-tagline').textContent = p.tagline;
    $('#hero-location').textContent = `◎ ${p.location}`;
    if (p.availability) {
      $('#badge-text').textContent = p.availability;
      $('#badge').classList.remove('hidden'); $('#badge').classList.add('inline-flex');
    }
    $('#hero-socials').innerHTML = D.socials.map(s =>
      `<a href="${esc(s.url)}" target="_blank" rel="noopener" class="hover:text-fg transition-colors">${esc(s.name)} ↗</a>`).join('');
  }

  function renderAbout() {
    const p = D.profile;
    $('#about-photo').innerHTML = p.photo
      ? `<img src="${esc(p.photo)}" alt="Portrait of ${esc(p.name)}" class="w-full h-full object-cover grayscale" />`
      : `<div class="thumb w-full h-full flex items-center justify-center"><span class="font-mono text-5xl font-medium bg-bg px-3">${esc(p.shortName)}</span></div>`;
    $('#about-bio').innerHTML = p.bio.map(b => `<p>${esc(b)}</p>`).join('');
    $('#about-stats').innerHTML = p.stats.map(s => `
      <div class="bg-bg p-6 reveal">
        <div class="text-4xl md:text-5xl font-semibold tracking-tight tabular-nums"><span data-count="${s.value}">0</span>${esc(s.suffix || '')}</div>
        <div class="font-mono text-[10px] uppercase tracking-widest text-dim mt-2">${esc(s.label)}</div>
      </div>`).join('');
    $('#about-edu').innerHTML = D.education.map(e => `
      <div class="flex items-start justify-between gap-4 border border-line p-4">
        <div><div class="font-medium">${esc(e.title)}</div><div class="text-sm text-dim">${esc(e.place)}</div>${e.grade ? `<div class="mt-2 inline-block font-mono text-[10px] uppercase tracking-widest border border-line px-2 py-1">${esc(e.grade)}</div>` : ''}</div>
        <div class="font-mono text-xs text-dim whitespace-nowrap">${esc(e.period)}</div>
      </div>`).join('');
  }

  function renderSkills() {
    $('#skills-grid').innerHTML = D.skills.map((g, gi) => `
      <div class="bg-bg p-6 reveal">
        <div class="flex justify-between font-mono text-xs text-dim mb-6"><span>${pad(gi + 1)}</span><span class="uppercase tracking-widest">${esc(g.group)}</span></div>
        ${g.items.every(s => s.level == null)
          ? `<ul class="flex flex-wrap gap-2">${g.items.map(s =>
              `<li class="border border-line px-3 py-2 text-sm hover:bg-fg hover:text-bg transition-colors">${esc(s.name)}</li>`).join('')}</ul>`
          : `<ul class="space-y-5">${g.items.map(s => `
            <li>
              <div class="flex justify-between text-sm mb-2"><span>${esc(s.name)}</span>${s.level != null ? `<span class="font-mono text-xs text-dim">${s.level}%</span>` : ''}</div>
              ${s.level != null ? `<div class="bar"><i data-level="${s.level}"></i></div>` : ''}
            </li>`).join('')}</ul>`}
      </div>`).join('');
    const row = D.marquee.map(t => `<span>${esc(t)}</span><span class="sep">✳</span>`).join('');
    $('#marquee').innerHTML = row + row; // duplicated for seamless loop
  }

  function renderServices() {
    if (!$('#services-grid')) return;
    $('#services-grid').innerHTML = D.services.map((s, i) => `
      <div class="bg-bg p-8 group hover:bg-fg hover:text-bg transition-colors duration-300 reveal min-h-[260px] flex flex-col">
        <div class="font-mono text-xs opacity-60">[${pad(i + 1)}]</div>
        <h3 class="text-2xl font-semibold tracking-tight mt-auto">${esc(s.title)}</h3>
        <p class="mt-3 text-sm opacity-70 leading-relaxed">${esc(s.desc)}</p>
      </div>`).join('');
  }

  let activeFilter = 'All';
  function renderProjects() {
    if (!D.projects.length) return;
    const filters = ['All', ...new Set(D.projects.map(p => p.category))];
    $('#project-filters').classList.toggle('hidden', filters.length < 3);
    $('#project-filters').innerHTML = filters.map(f => `
      <button role="tab" data-filter="${esc(f)}" aria-selected="${f === activeFilter}"
        class="px-4 py-2 border transition-colors ${f === activeFilter ? 'bg-fg text-bg border-fg' : 'border-line text-dim hover:text-fg hover:border-fg'}">${esc(f)}</button>`).join('');

    const list = D.projects
      .map((p, i) => ({ ...p, i }))
      .filter(p => activeFilter === 'All' || p.category === activeFilter);

    $('#projects-grid').innerHTML = list.map((p, n) => {
      const big = p.featured && activeFilter === 'All';
      return `
      <article class="card border border-line bg-bg cursor-pointer reveal ${big ? 'md:col-span-2 lg:row-span-1' : ''}" data-project="${p.i}" tabindex="0" role="button" aria-label="Open ${esc(p.title)} details">
        <div class="thumb ${big ? 'aspect-[16/7]' : 'aspect-[16/10]'} border-b border-line relative overflow-hidden">
          ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" class="w-full h-full object-cover grayscale hover:grayscale-0 transition" loading="lazy" />`
                    : `<div class="absolute inset-0 flex items-center justify-center"><span class="bg-bg px-3 py-1 font-mono text-xs uppercase tracking-widest">${esc(p.title)}</span></div>`}
          <span class="absolute top-3 left-3 bg-bg border border-line font-mono text-[10px] px-2 py-1">${pad(n + 1)} / ${esc(p.category)}</span>
          ${big ? '<span class="absolute top-3 right-3 bg-fg text-bg font-mono text-[10px] px-2 py-1 uppercase tracking-widest">Featured</span>' : ''}
        </div>
        <div class="p-6">
          <div class="flex items-baseline justify-between gap-4">
            <h3 class="text-xl font-semibold tracking-tight">${esc(p.title)}</h3>
            <span class="font-mono text-xs text-dim">${esc(p.year)}</span>
          </div>
          <p class="mt-2 text-sm text-muted">${esc(p.summary)}</p>
          <div class="mt-4 flex flex-wrap gap-2">${p.tech.map(t => `<span class="font-mono text-[10px] border border-line px-2 py-1 text-dim">${esc(t)}</span>`).join('')}</div>
        </div>
      </article>`;
    }).join('') || `<p class="font-mono text-sm text-dim">No projects in this category yet.</p>`;

    observeReveal($('#projects-grid'));
    bindTilt();
    bindCursorTargets();
  }

  function renderExperience() {
    if (!$('#timeline')) return;
    $('#timeline').innerHTML = D.experience.map(e => `
      <li class="relative pl-8 md:pl-12 pb-12 last:pb-0 reveal">
        <span class="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-bg border border-fg"></span>
        <div class="grid md:grid-cols-12 gap-2 md:gap-6">
          <div class="md:col-span-3 font-mono text-xs text-dim pt-1.5">${esc(e.period)}</div>
          <div class="md:col-span-9">
            <h3 class="text-2xl font-semibold tracking-tight">${esc(e.role)} <span class="text-dim font-normal">@ ${esc(e.company)}</span></h3>
            <p class="mt-2 text-muted max-w-2xl">${esc(e.desc)}</p>
          </div>
        </div>
      </li>`).join('');
  }

  function renderContact() {
    $('#contact-email').textContent = D.profile.email;
    $('#contact-socials').innerHTML = D.socials.map(s => `
      <a href="${esc(s.url)}" target="_blank" rel="noopener" class="bg-bg p-4 flex justify-between items-center hover:bg-fg hover:text-bg transition-colors">
        <span>${esc(s.name)}</span><span class="font-mono text-xs">↗</span>
      </a>`).join('');
  }

  /* ---------- GitHub ---------- */
  async function loadGitHub() {
    const user = D.github.username;
    const statBox = (label, value) => `
      <div class="bg-bg p-6"><div class="text-3xl md:text-4xl font-semibold tabular-nums">${value}</div>
      <div class="font-mono text-[10px] uppercase tracking-widest text-dim mt-2">${label}</div></div>`;
    $('#gh-stats').innerHTML = ['Public repos', 'Followers', 'Following', 'Total stars'].map(l => statBox(l, '—')).join('');
    $('#gh-chart').src = `https://ghchart.rshah.org/404040/${encodeURIComponent(user)}`;

    const fallback = (msg) => {
      $('#gh-repos').innerHTML = D.projects.filter(p => p.github).slice(0, D.github.repoCount).map(p => repoCard({
        name: p.title, description: p.summary, html_url: p.github, language: p.tech[0], stargazers_count: '—', forks_count: '—'
      })).join('');
      $('#gh-langs').innerHTML = '<p class="text-sm text-dim">Unavailable right now.</p>';
      const note = $('#gh-note'); note.textContent = `// ${msg} — showing projects from data.js instead.`; note.classList.remove('hidden');
    };

    try {
      const [uRes, rRes] = await Promise.all([
        fetch(`https://api.github.com/users/${encodeURIComponent(user)}`),
        fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=100`),
      ]);
      if (!uRes.ok || !rRes.ok) throw new Error(uRes.status === 403 ? 'GitHub rate limit reached' : 'GitHub user not found');
      const u = await uRes.json();
      const repos = (await rRes.json()).filter(r => !r.fork);
      const stars = repos.reduce((a, r) => a + r.stargazers_count, 0);

      $('#gh-stats').innerHTML = [
        ['Public repos', u.public_repos], ['Followers', u.followers], ['Following', u.following], ['Total stars', stars],
      ].map(([l, v]) => statBox(l, `<span data-count="${v}">0</span>`)).join('');
      $$('#gh-stats [data-count]').forEach(countUp);

      const langs = {};
      repos.forEach(r => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1; });
      const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
      const top = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 5);
      $('#gh-langs').innerHTML = top.length ? top.map(([l, c]) => {
        const pct = Math.round((c / total) * 100);
        return `<div><div class="flex justify-between text-sm mb-1.5"><span>${esc(l)}</span><span class="font-mono text-xs text-dim">${pct}%</span></div>
                <div class="bar"><i data-level="${pct}" style="width:${pct}%"></i></div></div>`;
      }).join('') : '<p class="text-sm text-dim">No language data.</p>';

      $('#gh-repos').innerHTML = repos.slice(0, D.github.repoCount).map(repoCard).join('');
    } catch (err) {
      fallback(err.message || 'Could not reach GitHub');
    }
  }

  function repoCard(r) {
    return `
      <a href="${esc(r.html_url)}" target="_blank" rel="noopener" class="bg-bg p-6 flex flex-col gap-3 hover:bg-surface transition-colors min-h-[150px]">
        <div class="flex justify-between items-start gap-2"><span class="font-medium break-all">${esc(r.name)}</span><span class="font-mono text-xs text-dim">↗</span></div>
        <p class="text-sm text-dim line-clamp-2">${esc(r.description || 'No description.')}</p>
        <div class="mt-auto flex gap-4 font-mono text-[10px] uppercase tracking-widest text-dim">
          ${r.language ? `<span>● ${esc(r.language)}</span>` : ''}<span>★ ${esc(r.stargazers_count)}</span><span>⑂ ${esc(r.forks_count)}</span>
        </div>
      </a>`;
  }

  /* ---------- Section heads ---------- */
  function renderHeads() {
    $$('.section-head').forEach(h => {
      // Number sections by their visible order so hidden sections leave no gap
      const idx = SECTIONS.findIndex(s => s.id === h.closest('section').id);
      h.innerHTML = `<span>[${pad(idx)}]</span><span class="title">${h.dataset.label}</span>`;
    });
  }

  /* ---------- Effects ---------- */
  function scramble(el, finalText, duration = 1200) {
    if (reduceMotion) { el.textContent = finalText; return; }
    const chars = '!<>-_\\/[]{}—=+*^?#01';
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(t * finalText.length);
      el.textContent = finalText.split('').map((c, i) =>
        i < revealed || c === ' ' ? c : chars[Math.floor(Math.random() * chars.length)]).join('');
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function typeRoles() {
    const el = $('#typed'); const roles = D.profile.roles;
    if (reduceMotion) { el.textContent = roles[0]; return; }
    let r = 0, i = 0, del = false;
    const step = () => {
      const word = roles[r];
      el.textContent = word.slice(0, i);
      if (!del && i < word.length) i++;
      else if (del && i > 0) i--;
      else if (!del) { del = true; return setTimeout(step, 1600); }
      else { del = false; r = (r + 1) % roles.length; }
      setTimeout(step, del ? 35 : 70);
    };
    step();
  }

  function countUp(el) {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
    const start = performance.now(), dur = 1400;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      $$('[data-count]', e.target).forEach(c => { if (!c.dataset.done) { c.dataset.done = 1; countUp(c); } });
      $$('.bar > i[data-level]', e.target).forEach(b => b.style.width = b.dataset.level + '%');
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  function observeReveal(root = document) { $$('.reveal:not(.in)', root).forEach(el => revealObs.observe(el)); }

  function bindTilt() {
    if (reduceMotion || !matchMedia('(hover: hover)').matches) return;
    $$('.card').forEach(card => {
      if (card.dataset.tilt) return; card.dataset.tilt = 1;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }

  function bindMagnetic() {
    if (reduceMotion || !matchMedia('(hover: hover)').matches) return;
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => btn.style.transform = '');
    });
  }

  const ring = $('#cursor-ring'), dot = $('#cursor-dot');
  function initCursor() {
    if (reduceMotion || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px)`; });
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(loop); };
    loop();
    bindCursorTargets();
  }
  function bindCursorTargets() {
    $$('a, button, .card, input, textarea').forEach(el => {
      if (el.dataset.cur) return; el.dataset.cur = 1;
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ---------- Scroll: nav, progress, active section ---------- */
  function initScroll() {
    const nav = $('#nav'), bar = $('#progress');
    const onScroll = () => {
      nav.classList.toggle('scrolled', scrollY > 20);
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    const secObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        $$('[data-nav]').forEach(a => a.classList.toggle('text-fg', a.dataset.nav === id));
        $$('[data-side]').forEach(a => {
          const on = a.dataset.side === id;
          a.classList.toggle('text-fg', on);
          a.firstElementChild.style.width = on ? '2rem' : '';
          a.firstElementChild.style.background = on ? 'var(--fg)' : '';
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) secObs.observe(el); });
  }

  /* ---------- Clock ---------- */
  function initClock() {
    const el = $('#clock');
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: D.profile.timezone || undefined });
    const tick = () => el.textContent = `${fmt.format(new Date())} LOCAL`;
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Theme ---------- */
  function toggleTheme() {
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    const btn = $('#menu-btn'), menu = $('#mobile-menu');
    const set = (open) => {
      menu.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', open);
      const [a, b] = btn.children;
      a.style.transform = open ? 'translateY(3.5px) rotate(45deg)' : '';
      b.style.transform = open ? 'translateY(-3.5px) rotate(-45deg)' : '';
    };
    btn.addEventListener('click', () => set(menu.classList.contains('hidden')));
    $$('a', menu).forEach(a => a.addEventListener('click', () => set(false)));
  }

  /* ---------- Toast ---------- */
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.style.opacity = 1;
    clearTimeout(toastT); toastT = setTimeout(() => t.style.opacity = 0, 2000);
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(D.profile.email); toast('Email copied to clipboard'); }
    catch { toast(D.profile.email); }
  }

  /* ---------- Modal ---------- */
  let lastFocus;
  function openProject(i) {
    const p = D.projects[i]; lastFocus = document.activeElement;
    $('#modal-body').innerHTML = `
      <div class="thumb aspect-[16/8] border-b border-line flex items-center justify-center overflow-hidden">
        ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" class="w-full h-full object-cover" />` : `<span class="bg-bg px-3 py-1 font-mono text-xs uppercase tracking-widest">${esc(p.title)}</span>`}
      </div>
      <div class="p-6 md:p-8">
        <div class="font-mono text-xs text-dim">${esc(p.category)} · ${esc(p.year)}</div>
        <h3 id="modal-title" class="text-3xl font-semibold tracking-tight mt-2">${esc(p.title)}</h3>
        <p class="mt-4 text-muted leading-relaxed">${esc(p.details || p.summary)}</p>
        <div class="mt-6 flex flex-wrap gap-2">${p.tech.map(t => `<span class="font-mono text-[10px] border border-line px-2 py-1">${esc(t)}</span>`).join('')}</div>
        <div class="mt-8 flex flex-wrap gap-3">
          ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener" class="bg-fg text-bg px-5 py-3 font-mono text-xs uppercase tracking-widest">Live site ↗</a>` : ''}
          ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" class="border border-line px-5 py-3 font-mono text-xs uppercase tracking-widest hover:border-fg">Source code ↗</a>` : ''}
          ${p.private && !p.github ? `<span class="border border-dashed border-line px-5 py-3 font-mono text-xs uppercase tracking-widest text-dim">Private repository</span>` : ''}
        </div>
      </div>`;
    showLayer($('#modal'));
    $('#modal [data-close].absolute.top-3, #modal button[data-close]')?.focus();
    bindCursorTargets();
  }
  function showLayer(el) { el.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function hideLayer(el) { el.classList.add('hidden'); document.body.style.overflow = ''; lastFocus?.focus?.(); }

  /* ---------- Command palette ---------- */
  const COMMANDS = [
    ...SECTIONS.map(s => ({ label: `Go to ${s.label}`, hint: 'section', run: () => location.hash = s.id })),
    { label: 'Toggle theme', hint: 'action', run: toggleTheme },
    { label: 'Copy email', hint: 'action', run: copyEmail },
    ...(D.profile.resume ? [{ label: 'Download CV', hint: 'action', run: () => $('#cv-btn').click() }] : []),
    ...D.socials.map(s => ({ label: `Open ${s.name}`, hint: 'link', run: () => window.open(s.url, '_blank', 'noopener') })),
  ];
  let palSel = 0, palItems = [];
  function renderPalette(q = '') {
    q = q.toLowerCase();
    palItems = COMMANDS.filter(c => c.label.toLowerCase().includes(q));
    palSel = Math.min(palSel, Math.max(palItems.length - 1, 0));
    $('#palette-list').innerHTML = palItems.map((c, i) => `
      <li role="option" aria-selected="${i === palSel}" data-i="${i}" class="px-5 py-2.5 flex justify-between cursor-pointer">
        <span>${esc(c.label)}</span><span class="text-[10px] uppercase tracking-widest opacity-60">${c.hint}</span>
      </li>`).join('') || '<li class="px-5 py-3 text-dim">No results</li>';
  }
  function openPalette() {
    lastFocus = document.activeElement; palSel = 0;
    $('#palette-input').value = ''; renderPalette(); showLayer($('#palette'));
    setTimeout(() => $('#palette-input').focus(), 0);
  }
  function runPalette(i) { const c = palItems[i]; if (!c) return; hideLayer($('#palette')); c.run(); }

  /* ---------- Contact form ---------- */
  function initForm() {
    const form = $('#contact-form');
    const rules = {
      'f-name': v => v.trim().length > 1,
      'f-email': v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      'f-msg': v => v.trim().length >= 10,
    };
    const check = (id) => {
      const ok = rules[id]($('#' + id).value);
      $('#' + id).parentElement.classList.toggle('invalid', !ok);
      $('#' + id).setAttribute('aria-invalid', !ok);
      return ok;
    };
    Object.keys(rules).forEach(id => $('#' + id).addEventListener('blur', () => check(id)));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const ok = Object.keys(rules).map(check).every(Boolean);
      if (!ok) { toast('Please fix the highlighted fields'); return; }
      const name = $('#f-name').value, email = $('#f-email').value, message = $('#f-msg').value;
      if (D.contact.formspreeId) {
        try {
          const res = await fetch(`https://formspree.io/f/${D.contact.formspreeId}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name, email, message }),
          });
          if (!res.ok) throw new Error();
          form.reset(); toast('Message sent — thank you!');
        } catch { toast('Could not send. Please email me directly.'); }
      } else {
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        location.href = `mailto:${D.profile.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + name)}&body=${body}`;
      }
    });
  }

  /* ---------- Global events ---------- */
  function initEvents() {
    $('#theme-toggle').addEventListener('click', toggleTheme);
    $('#copy-email').addEventListener('click', copyEmail);
    $('#cmd-btn').addEventListener('click', openPalette);

    $('#project-filters')?.addEventListener('click', (e) => {
      const b = e.target.closest('[data-filter]'); if (!b) return;
      activeFilter = b.dataset.filter; renderProjects();
    });
    $('#projects-grid')?.addEventListener('click', (e) => {
      const c = e.target.closest('[data-project]'); if (c) openProject(+c.dataset.project);
    });
    $('#projects-grid')?.addEventListener('keydown', (e) => {
      const c = e.target.closest('[data-project]');
      if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openProject(+c.dataset.project); }
    });

    $$('#modal [data-close]').forEach(el => el.addEventListener('click', () => hideLayer($('#modal'))));
    $$('#palette [data-close]').forEach(el => el.addEventListener('click', () => hideLayer($('#palette'))));

    $('#palette-input').addEventListener('input', (e) => { palSel = 0; renderPalette(e.target.value); });
    $('#palette-list').addEventListener('click', (e) => { const li = e.target.closest('[data-i]'); if (li) runPalette(+li.dataset.i); });
    $('#palette-input').addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); palSel = (palSel + 1) % Math.max(palItems.length, 1); renderPalette(e.target.value); }
      if (e.key === 'ArrowUp') { e.preventDefault(); palSel = (palSel - 1 + palItems.length) % Math.max(palItems.length, 1); renderPalette(e.target.value); }
      if (e.key === 'Enter') { e.preventDefault(); runPalette(palSel); }
    });

    addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        $('#palette').classList.contains('hidden') ? openPalette() : hideLayer($('#palette'));
      }
      if (e.key === 'Escape') {
        if (!$('#palette').classList.contains('hidden')) hideLayer($('#palette'));
        else if (!$('#modal').classList.contains('hidden')) hideLayer($('#modal'));
      }
    });
  }

  /* ---------- Loader ---------- */
  function runLoader(done) {
    const loader = $('#loader');
    if (reduceMotion) { loader.remove(); return done(); }
    document.body.classList.add('loading');
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(n + Math.ceil(Math.random() * 9), 100);
      $('#loader-count').textContent = pad(n, 3);
      $('#loader-bar').style.width = n + '%';
      if (n === 100) {
        clearInterval(iv);
        setTimeout(() => {
          loader.style.transition = 'opacity .5s, transform .6s cubic-bezier(.7,0,.3,1)';
          loader.style.opacity = 0; loader.style.transform = 'translateY(-100%)';
          document.body.classList.remove('loading');
          setTimeout(() => loader.remove(), 600);
          done();
        }, 200);
      }
    }, 40);
  }

  /* ---------- Boot ---------- */
  renderMeta(); renderNav(); renderHeads(); renderHero(); renderAbout(); renderSkills();
  renderServices(); renderProjects(); renderExperience(); renderContact();
  initScroll(); initClock(); initMenu(); initForm(); initEvents(); initCursor(); bindMagnetic();
  loadGitHub();

  runLoader(() => {
    scramble($('#hero-name'), D.profile.name);
    typeRoles();
    observeReveal();
  });
})();
