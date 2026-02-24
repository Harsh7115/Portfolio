// Sidebar scroll forwarding
document.querySelector(".sidebar").addEventListener("wheel", (event) => {
  event.preventDefault();
  const content = document.querySelector(".content");
  content.scrollBy({ top: event.deltaY });
});

// Fade-in scroll animation
const blocks = document.querySelectorAll(".block");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);
blocks.forEach((b) => observer.observe(b));
