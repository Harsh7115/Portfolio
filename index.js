/* -----------------------------------------------
   Portfolio JS — Cursor, Animations, Typewriter
----------------------------------------------- */

// ── 1. Custom Cursor ─────────────────────────────
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth-follow for the ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.11;
    ringY += (mouseY - ringY) * 0.11;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand ring on interactive elements
  document.querySelectorAll(
    'a, button, .stat-item, .badge, .tpill, .social-btn, .resume-btn'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expand'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
  });
})();

// ── 2. Scroll progress bar ───────────────────────
const scrollProgress = document.getElementById('scrollProgress');
const mainContent    = document.getElementById('mainContent');

if (mainContent && scrollProgress) {
  mainContent.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = mainContent;
    const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
    scrollProgress.style.width = pct + '%';
  });
}

// ── 3. Scroll reveal for blocks ──────────────────
const blocks = document.querySelectorAll('.block');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger each block slightly based on position
        const delay = Array.from(blocks).indexOf(entry.target) * 40;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(delay, 180));
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    root: document.getElementById('mainContent'),
    threshold: 0.07,
  }
);

blocks.forEach((b) => fadeObserver.observe(b));

// ── 4. Active nav link on scroll ────────────────
const sectionIds = ['about', 'experience', 'projects', 'contact'];
const navLinks   = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  {
    root: document.getElementById('mainContent'),
    threshold: 0.38,
  }
);

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// ── 5. Typewriter effect ─────────────────────────
(function typewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'AI & Software Engineer',
    'CS Senior @ U of Arizona',
    'RAG & LLM Systems Builder',
    'Founding Engineer',
  ];

  let phraseIndex   = 0;
  let charIndex     = 0;
  let deleting      = false;
  const TYPE_SPEED  = 65;
  const DEL_SPEED   = 32;
  const PAUSE_TYPED = 1900;
  const PAUSE_DEL   = 380;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        setTimeout(() => { deleting = true; tick(); }, PAUSE_TYPED);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting     = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_DEL);
        return;
      }
    }

    setTimeout(tick, deleting ? DEL_SPEED : TYPE_SPEED);
  }

  setTimeout(tick, 800);
})();

// ── 6. Sidebar scroll forwarding ────────────────
document.querySelector('.sidebar')?.addEventListener('wheel', (event) => {
  event.preventDefault();
  document.querySelector('.content')?.scrollBy({ top: event.deltaY });
});

// ── 7. Count-up animation for stats ─────────────
(function initCountUp() {
  const statNums = document.querySelectorAll('.stat-number[data-target]');
  statNums.forEach((el) => {
    const target  = parseFloat(el.dataset.target);
    const isFloat = el.dataset.float === 'true';
    const suffix  = el.dataset.suffix || '';
    const duration = 1800;

    function animate() {
      const startTime = performance.now();
      function update(currentTime) {
        const elapsed  = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = target * eased;
        el.textContent = isFloat
          ? value.toFixed(2)
          : Math.floor(value) + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = isFloat ? target.toFixed(2) : target + suffix;
        }
      }
      requestAnimationFrame(update);
    }

    // Delay slightly so the page has settled
    setTimeout(animate, 600);
  });
})();

// ── 8. Sidebar spotlight cursor tracking ────────
(function initSpotlight() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  sidebar.addEventListener('mousemove', (e) => {
    const rect = sidebar.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width)  * 100).toFixed(1) + '%';
    const y = (((e.clientY - rect.top)  / rect.height) * 100).toFixed(1) + '%';
    sidebar.style.setProperty('--spot-x', x);
    sidebar.style.setProperty('--spot-y', y);
  });
})();