export function initFooterModal() {
  const openBtn = document.querySelector('#open-team-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.modal-close');
  const track = document.querySelector('.slider-track');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const slides = document.querySelectorAll('.team-card');

  if (!openBtn || !modalOverlay || !closeBtn) {
    alert('❗ Footer modal için gerekli öğeler bulunamadı.');
    return;
  }

  let currentIndex = 0;

  function updateSlider() {
    const offset = -currentIndex * 100;
    if (track) {
      track.style.transform = `translateX(${offset}%)`;
    }
  }

  function openModal() {
    modalOverlay.classList.add('active');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
    updateSlider();
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    openBtn.focus();
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });

  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });
  }
}
