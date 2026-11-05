const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const mobileQuery = window.matchMedia('(max-width: 640px)');

document.querySelectorAll('.carousel-frame').forEach((frame) => {
  // Slides are written in the HTML: an optional title slide (mobile only, via CSS) plus the photos
  const track = frame.querySelector('.carousel-track');
  const dotsContainer = frame.querySelector('.carousel-dots');
  if (!track || !dotsContainer) return;
  track.querySelectorAll('img').forEach((img) => { img.draggable = false; });
  let index = 0;

  const slides = () => [...track.children].filter((el) => getComputedStyle(el).display !== 'none');
  let count = 0;
  let dots = [];

  const goTo = (i) => {
    index = (i + count) % count;
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((dot, d) => dot.classList.toggle('active', d === index));
  };

  const setup = () => {
    count = slides().length;
    dotsContainer.innerHTML = '';
    if (count > 1) {
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dotsContainer.appendChild(dot);
      }
    }
    dots = [...dotsContainer.children];
    goTo(0);
  };
  setup();
  mobileQuery.addEventListener('change', setup);

  // Swipe (touch)
  let startX = 0, startY = 0, dx = 0, swiping = false, locked = false, lastSwipe = 0;

  frame.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    startX = t.clientX; startY = t.clientY; dx = 0;
    swiping = false; locked = false;
  }, { passive: true });

  frame.addEventListener('touchmove', (e) => {
    if (count < 2) return;
    const t = e.touches[0];
    dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (!locked) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      locked = true;
      swiping = Math.abs(dx) > Math.abs(dy);
      if (swiping) track.classList.add('dragging');
    }
    if (!swiping) return;
    e.preventDefault();
    const w = frame.offsetWidth;
    let offset = dx;
    // Rubber-band at the ends
    if ((index === 0 && dx > 0) || (index === count - 1 && dx < 0)) offset = dx / 3;
    track.style.transform = `translateX(${-index * w + offset}px)`;
  }, { passive: false });

  frame.addEventListener('touchend', () => {
    if (!swiping) return;
    track.classList.remove('dragging');
    lastSwipe = Date.now();
    const threshold = frame.offsetWidth * 0.2;
    if (dx < -threshold && index < count - 1) goTo(index + 1);
    else if (dx > threshold && index > 0) goTo(index - 1);
    else goTo(index);
    swiping = false;
  });

  // Tap / click still advances
  frame.addEventListener('click', (e) => {
    if (Date.now() - lastSwipe < 500) { e.preventDefault(); return; }
    if (count > 1) goTo(index + 1);
  });
});
