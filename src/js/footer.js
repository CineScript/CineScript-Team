document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.querySelector('#open-team-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.modal-close');

  if (!openBtn || !modalOverlay || !closeBtn) return;

  function openModal() {
    modalOverlay.classList.add('active');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
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
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
