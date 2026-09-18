const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('.carousel-frame[data-images]').forEach((frame) => {
  const images = frame.dataset.images.split('|');
  if (images.length < 2) return;

  const img = frame.querySelector('img');
  const dotsContainer = frame.querySelector('.carousel-dots');
  let index = 0;

  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('.dot');

  frame.addEventListener('click', () => {
    index = (index + 1) % images.length;
    img.src = images[index];
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  });
});
