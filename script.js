document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const sidenav = document.getElementById('sidenav');

menuToggle.addEventListener('click', () => {
  const open = sidenav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

sidenav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    sidenav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const navLinks = document.querySelectorAll('.sidenav ol a');
const sections = Array.from(navLinks).map((link) =>
  document.querySelector(link.getAttribute('href'))
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => section && observer.observe(section));
