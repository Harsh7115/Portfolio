/* -----------------------------------------------
   Portfolio JS — Animations, Typewriter, Nav
----------------------------------------------- */

// ── 1. Sidebar scroll forwarding ────────────────
document.querySelector(".sidebar").addEventListener("wheel", (event) => {
  event.preventDefault();
  const content = document.querySelector(".content");
  content.scrollBy({ top: event.deltaY });
});

// ── 2. Scroll progress bar ───────────────────────
const scrollProgress = document.getElementById("scrollProgress");
const mainContent = document.getElementById("mainContent");

if (mainContent && scrollProgress) {
  mainContent.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = mainContent;
    const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
    scrollProgress.style.width = pct + "%";
  });
}

// ── 3. Fade-in scroll animation ─────────────────
const blocks = document.querySelectorAll(".block");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    root: document.getElementById("mainContent"),
    threshold: 0.1,
  }
);
blocks.forEach((b) => fadeObserver.observe(b));

// ── 4. Active nav link on scroll ────────────────
const sections = ["about", "experience", "projects", "contact"];
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  },
  {
    root: document.getElementById("mainContent"),
    threshold: 0.4,
  }
);

sections.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// ── 5. Typewriter effect ─────────────────────────
(function typewriter() {
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  const phrases = [
    "AI & Software Engineer",
    "CS Senior @ U of Arizona",
    "RAG & LLM Systems Builder",
    "Founding Engineer",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typingSpeed = 65;
  const deletingSpeed = 35;
  const pauseAfterType = 1800;
  const pauseAfterDelete = 400;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      // Typing
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing — pause then start deleting
        setTimeout(() => {
          deleting = true;
          tick();
        }, pauseAfterType);
        return;
      }
    } else {
      // Deleting
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — move to next phrase
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
    }

    setTimeout(tick, deleting ? deletingSpeed : typingSpeed);
  }

  // Kick off after a short delay
  setTimeout(tick, 700);
})();
