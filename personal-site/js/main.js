/* ============================================
   CONTENT POPULATION
   从 content.js 读取数据，填充到页面
   ============================================ */

function populateContent() {
  if (typeof SITE === 'undefined') {
    console.warn('content.js 未加载，使用 HTML 中的占位内容');
    return;
  }

  // --- 文本字段 ---
  const fields = {
    'hero-status': SITE.hero.status,
    'hero-intro': SITE.hero.intro,
    'hero-name': SITE.hero.name,
    'hero-role1': SITE.hero.role1,
    'hero-role2': SITE.hero.role2,
    'hero-desc': SITE.hero.desc,
    'hero-location': SITE.hero.location,
    'about-lead': SITE.about.lead,
    'about-body1': SITE.about.body1,
    'about-body2': SITE.about.body2,
    'footer-name': '© 2026 ' + SITE.hero.name + ' · 用心制作',
  };

  Object.keys(fields).forEach(key => {
    const el = document.querySelector('[data-field="' + key + '"]');
    if (el) {
      // 支持换行
      el.innerHTML = fields[key].replace(/\n/g, '<br>');
    }
  });

  // --- 技能标签 ---
  const skillTags = document.getElementById('skillTags');
  if (skillTags && SITE.about.skills) {
    skillTags.innerHTML = SITE.about.skills
      .map(s => '<span class="skill-tag">' + s + '</span>')
      .join('');
  }

  // --- 原则清单 ---
  const principlesList = document.getElementById('principlesList');
  if (principlesList && SITE.about.principles) {
    principlesList.innerHTML = SITE.about.principles
      .map(p => '<li><span class="principles-dot"></span>' + p + '</li>')
      .join('');
  }

  // --- 此刻 NOW ---
  const nowList = document.getElementById('nowList');
  if (nowList && SITE.now && SITE.now.items) {
    nowList.innerHTML = SITE.now.items.map(item =>
      '<div class="now-item">' +
        '<span class="now-item-label">' + item.label + '</span>' +
        '<span class="now-item-text">' + item.text + '</span>' +
      '</div>'
    ).join('');
  }

  // --- 经历时间线 ---
  const timeline = document.getElementById('timeline');
  if (timeline && SITE.experience) {
    // 保留 timeline-line 元素
    const line = timeline.querySelector('.timeline-line');
    timeline.innerHTML = '';
    if (line) timeline.appendChild(line);

    SITE.experience.forEach(exp => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.setAttribute('data-fade-up', '');
      item.innerHTML =
        '<div class="timeline-dot"></div>' +
        '<div class="timeline-date">' + exp.date + '</div>' +
        '<div class="timeline-card">' +
          '<h3 class="timeline-title">' + exp.title + '</h3>' +
          '<p class="timeline-org">' + exp.org + '</p>' +
          '<p class="timeline-desc">' + exp.desc + '</p>' +
          '<div class="timeline-tags">' +
            (exp.tags || []).map(t => '<span class="timeline-tag">' + t + '</span>').join('') +
          '</div>' +
        '</div>';
      timeline.appendChild(item);
    });
  }

  // --- 项目卡片 ---
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid && SITE.projects) {
    projectsGrid.innerHTML = SITE.projects.map(p => {
      const visualClass = 'project-visual-' + (p.visual || 1);
      const href = p.link || '#';
      // 外链新标签页打开，并防止反向标签劫持
      const linkAttrs = p.link ? ' target="_blank" rel="noopener noreferrer"' : '';
      return '<a href="' + href + '"' + linkAttrs + ' class="project-card" data-cursor="view" data-fade-up>' +
        '<div class="project-card-inner">' +
          '<div class="project-card-visual ' + visualClass + '">' +
            '<div class="project-card-glow"></div>' +
            '<span class="project-card-icon">' + (p.icon || '◆') + '</span>' +
          '</div>' +
          '<div class="project-card-body">' +
            '<div class="project-card-meta">' +
              '<span class="project-card-type">' + p.type + '</span>' +
              '<span class="project-card-year">' + p.year + '</span>' +
            '</div>' +
            '<h3 class="project-card-title">' + p.title + '</h3>' +
            '<p class="project-card-desc">' + p.desc + '</p>' +
            '<div class="project-card-tech">' +
              (p.tech || []).map(t => '<span>' + t + '</span>').join('') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</a>';
    }).join('');
  }

/* ============================================
   NOTES RENDERING — 首页卡片 + 列表页
   静态 content.js 和数据库笔记共用这两个渲染函数。
   数据库笔记带 id，卡片链接到 note.html?id=xxx 详情页；
   静态示例笔记没有正文，链接到 notes.html 列表页。
   ============================================ */
function renderHomeNotes(list) {
  const notesGrid = document.getElementById('notesGrid');
  if (!notesGrid || !list || list.length === 0) return;

  notesGrid.innerHTML = list.slice(0, 3).map(n => {
    const href = n.id ? ('note.html?id=' + n.id) : 'notes.html';
    return '<a href="' + href + '" class="note-card" data-cursor="view" data-fade-up>' +
      '<div class="note-card-date">' +
        '<span class="note-card-day">' + n.day + '</span>' +
        '<span class="note-card-month">' + n.month + '</span>' +
      '</div>' +
      '<div class="note-card-body">' +
        '<span class="note-card-tag">' + n.tag + '</span>' +
        '<h3 class="note-card-title">' + n.title + '</h3>' +
        '<p class="note-card-excerpt">' + n.excerpt + '</p>' +
      '</div>' +
    '</a>';
  }).join('');
}

/* 首页笔记空状态：数据库已配置但还没有已发布笔记时显示 */
function renderHomeNotesEmpty() {
  const notesGrid = document.getElementById('notesGrid');
  if (!notesGrid) return;
  notesGrid.innerHTML =
    '<div class="notes-empty">' +
      '<div class="notes-empty-title">第一篇笔记正在酝酿</div>' +
      '<div class="notes-empty-sub">想清楚再写，写下来的才算数。</div>' +
    '</div>';
}

/* 数据库连接失败时的提示（比如云端数据库休眠中）。
   注意：此时绝不能展示静态假数据，否则用户会以为真笔记被替换/丢失。 */
function renderNotesError() {
  const notesGrid = document.getElementById('notesGrid');
  const notesList = document.querySelector('.notes-list');
  const html =
    '<div class="notes-empty">' +
      '<div class="notes-empty-title">笔记暂时连不上数据库</div>' +
      '<div class="notes-empty-sub">云端数据库可能在休眠恢复中（免费版 7 天不用会休眠），过几分钟刷新试试。你的笔记数据不会丢。</div>' +
    '</div>';
  if (notesGrid) notesGrid.innerHTML = html;
  if (notesList) notesList.innerHTML = html;
}

function renderNotesList(list, fromFilter) {
  const notesList = document.querySelector('.notes-list');
  if (!notesList || !list) return;

  if (list.length === 0) {
    notesList.innerHTML =
      '<div class="notes-empty">' +
        '<div class="notes-empty-title">' + (fromFilter ? '没有匹配的笔记' : '还没有发布的笔记') + '</div>' +
        '<div class="notes-empty-sub">' + (fromFilter ? '换个关键词或标签试试。' : '第一篇正在酝酿中。') + '</div>' +
      '</div>';
    return;
  }

  notesList.innerHTML = list.map(n => {
    const inner =
      '<div class="note-item-date">' +
        '<span class="note-item-day">' + n.day + '</span>' +
        '<span class="note-item-month">' + n.month + ' ' + (n.year || '2026') + '</span>' +
      '</div>' +
      '<div class="note-item-body">' +
        '<div class="note-item-tags">' +
          '<span class="note-item-tag">' + n.tag + '</span>' +
          (n.readingMinutes ? '<span class="note-item-reading">约 ' + n.readingMinutes + ' 分钟</span>' : '') +
        '</div>' +
        '<h2 class="note-item-title">' + n.title + '</h2>' +
        '<p class="note-item-excerpt">' + n.excerpt + '</p>' +
      '</div>' +
      '<span class="note-item-arrow">→</span>';

    if (n.id) {
      return '<a href="note.html?id=' + n.id + '" class="note-item note-item-link" data-cursor="hover">' + inner + '</a>';
    }
    return '<div class="note-item" data-cursor="hover">' + inner + '</div>';
  }).join('');
}

/* ---- 笔记页：搜索 + 标签筛选 ----
   notesCache 保存当前全集（静态示例或数据库笔记），
   筛选只作用在列表页，不影响首页卡片。 */
let notesCache = [];
let notesFilter = { q: '', tag: '' };

function setNotesCache(list) {
  notesCache = list || [];
  renderTagChips(notesCache);
  applyNotesFilter();
}

function renderTagChips(list) {
  const tagsEl = document.getElementById('notesTags');
  if (!tagsEl) return;
  const tags = [];
  list.forEach(n => { if (n.tag && tags.indexOf(n.tag) === -1) tags.push(n.tag); });
  tagsEl.innerHTML = '<button class="notes-tag-chip active" data-tag="">全部</button>' +
    tags.map(t => '<button class="notes-tag-chip" data-tag="' + t + '">' + t + '</button>').join('');
  tagsEl.querySelectorAll('.notes-tag-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      tagsEl.querySelectorAll('.notes-tag-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      notesFilter.tag = btn.getAttribute('data-tag');
      applyNotesFilter();
    });
  });
}

function applyNotesFilter() {
  if (!document.querySelector('.notes-list')) return;
  let list = notesCache;
  if (notesFilter.tag) list = list.filter(n => n.tag === notesFilter.tag);
  if (notesFilter.q) {
    list = list.filter(n => ((n.title || '') + ' ' + (n.excerpt || '')).toLowerCase().indexOf(notesFilter.q) !== -1);
  }
  renderNotesList(list, true);
}

const notesSearchEl = document.getElementById('notesSearch');
if (notesSearchEl) {
  notesSearchEl.addEventListener('input', () => {
    notesFilter.q = notesSearchEl.value.trim().toLowerCase();
    applyNotesFilter();
  });
}

/* 先用静态内容渲染，保证页面秒开 */
renderHomeNotes(typeof SITE !== 'undefined' ? SITE.notes : []);
setNotesCache(typeof SITE !== 'undefined' ? SITE.notes : []);

/* 如果配置了数据库，用在线笔记替换静态内容 */
async function upgradeNotesFromDB() {
  if (typeof DB === 'undefined' || !DB.ready) return;
  const needsNotes = document.getElementById('notesGrid') || document.querySelector('.notes-list');
  if (!needsNotes) return;
  try {
    const notes = await DB.listPublished();
    if (notes && notes.length > 0) {
      renderHomeNotes(notes);
      setNotesCache(notes);
    } else {
      // 数据库已配置但还没有笔记：显示空状态，不再展示静态示例
      renderHomeNotesEmpty();
      setNotesCache([]);
    }
  } catch (e) {
    console.warn('读取在线笔记失败', e);
    // 数据库已配置但连不上：显示连接失败提示，而不是误导性的静态示例
    renderNotesError();
  }
}
upgradeNotesFromDB();

  // --- 联系方式 ---
  const contactEmail = document.getElementById('contactEmail');
  if (contactEmail && SITE.contact && SITE.contact.email) {
    contactEmail.href = 'mailto:' + SITE.contact.email;
  }

  const contactLinks = document.getElementById('contactLinks');
  if (contactLinks && SITE.contact && SITE.contact.links) {
    contactLinks.innerHTML = SITE.contact.links.map(l => {
      return '<a href="' + l.href + '" class="contact-link" data-cursor="hover">' +
        '<span class="contact-link-label">' + l.label + '</span>' +
        '<span class="contact-link-arrow">↗</span>' +
      '</a>';
    }).join('');
  }
}

// 立即执行内容填充
populateContent();


/* ============================================
   GSAP FALLBACK
   如果 GSAP 没加载成功（CDN 被墙），标记页面让所有元素直接显示
   ============================================ */
if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
  document.body.classList.add('no-anim');
}


/* ============================================
   LOADER
   ============================================ */
const loader = document.getElementById('loader');
const loaderPercent = document.getElementById('loaderPercent');
const loaderBar = document.getElementById('loaderBar');

// 如果没有 loader 元素（笔记页），直接初始化动画
if (!loader) {
  document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initScrollAnimations();
  });
} else {
  let progress = 0;
  const loaderInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      setTimeout(initReveal, 300);
    }
    loaderPercent.textContent = Math.floor(progress);
    loaderBar.style.width = progress + '%';
  }, 100);
}

function initReveal() {
  loader.classList.add('hidden');
  startHeroAnimation();
  initLenis();
  initScrollAnimations();
}


/* ============================================
   HERO ANIMATION
   ============================================ */
function startHeroAnimation() {
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('[data-reveal] .hero-title-word').forEach(el => {
      el.style.transform = 'translateY(0)';
    });
    document.querySelectorAll('[data-reveal-delay], [data-reveal-delay-2]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.fromTo('#heroTag',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 }, 0
  );

  document.querySelectorAll('[data-reveal] .hero-title-word').forEach((el, i) => {
    tl.fromTo(el,
      { y: '110%' },
      { y: '0%', duration: 1, stagger: 0.05 },
      0.15 + i * 0.08
    );
  });

  tl.fromTo('[data-reveal-delay]',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 }, 0.8
  );

  tl.fromTo('[data-reveal-delay-2]',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 }, 0.95
  );

  tl.fromTo('#heroScroll',
    { opacity: 0 },
    { opacity: 1, duration: 0.8 }, 1.2
  );

  tl.fromTo('.hero-meta',
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.8 }, 1.2
  );

  // Glows parallax
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.to('.hero-glow-1', {
      x: -30, y: 20,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.hero-glow-2', {
      x: 40, y: -15,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  }
}


/* ============================================
   LENIS SMOOTH SCROLL
   ============================================ */
let lenis;

function initLenis() {
  if (typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
}


/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  }
});

function animateCursor() {
  if (!cursor) return;
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mouseover', (e) => {
  if (!cursor) return;
  const target = e.target.closest('[data-cursor]');
  if (target) {
    const type = target.getAttribute('data-cursor');
    cursor.classList.remove('hover', 'view');
    if (type === 'hover') cursor.classList.add('hover');
    if (type === 'view') cursor.classList.add('view');
  } else {
    cursor.classList.remove('hover', 'view');
  }
});


/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});


/* ============================================
   NAVIGATION
   ============================================ */
const nav = document.getElementById('nav');
const navMenuBtn = document.getElementById('navMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = window.innerHeight;

  if (nav) {
    if (scrollY > heroHeight * 0.8) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  if (progressBar) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }
});

if (navMenuBtn) {
  navMenuBtn.addEventListener('click', () => {
    navMenuBtn.classList.toggle('active');
    if (mobileMenu) mobileMenu.classList.toggle('active');
  });
}

document.querySelectorAll('.mobile-menu-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenuBtn) navMenuBtn.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: 0 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});


/* ============================================
   SCROLL TRIGGER ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Fade up elements
  gsap.utils.toArray('[data-fade-up]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Timeline progress line
  const timeline = document.getElementById('timeline');
  if (timeline) {
    const timelineProgress = document.getElementById('timelineProgress');
    if (timelineProgress) {
      ScrollTrigger.create({
        trigger: timeline,
        start: 'top 80%',
        end: 'bottom 80%',
        onUpdate: (self) => {
          timelineProgress.style.height = (self.progress * 100) + '%';
        }
      });
    }
  }

  // Section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    const words = title.querySelectorAll('span');
    gsap.fromTo(words,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Contact title
  gsap.fromTo('.contact-title',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    }
  );
}


/* ============================================
   LIVE CLOCK
   ============================================ */
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  const heroTime = document.getElementById('heroTime');
  const footerTime = document.getElementById('footerTime');

  if (heroTime) heroTime.textContent = h + ':' + m;
  if (footerTime) footerTime.textContent = h + ':' + m + ':' + s + ' GMT+8';
}
updateClock();
setInterval(updateClock, 1000);


/* ============================================
   NOTES PAGE ANIMATIONS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Notes page specific animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Note items on notes page
    const noteItems = document.querySelectorAll('.note-item');
    if (noteItems.length > 0) {
      gsap.fromTo('.note-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.notes-list',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Notes page header
    const notesHeader = document.querySelector('.notes-page-header');
    if (notesHeader) {
      gsap.fromTo('.notes-page-header > *',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }
  }
});
