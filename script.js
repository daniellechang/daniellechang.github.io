const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('.carousel-frame[data-images]').forEach((frame) => {
  const images = frame.dataset.images.split('|');
  if (images.length < 2) return;

  const img = frame.querySelector('img');
  const dots = frame.querySelectorAll('.dot');
  let index = 0;

  frame.addEventListener('click', () => {
    index = (index + 1) % images.length;
    img.src = images[index];
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  });
});
