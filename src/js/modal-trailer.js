const modal = document.querySelector('#trailerModal');
const iframe = document.querySelector('#trailerIframe');
const closeButtons = modal.querySelectorAll('[data-close]');

export function openTrailerModal(videoKey) {
  iframe.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
  modal.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeTrailerModal() {
  iframe.src = ''; // videoyu durdur
  modal.classList.add('is-hidden');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeTrailerModal();
  }
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', closeTrailerModal);
});
