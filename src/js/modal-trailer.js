const modal = document.createElement('div');
modal.classList.add('trailer-modal', 'is-hidden');

modal.innerHTML = `
  <div class="trailer-modal-backdrop">
    <div class="trailer-modal-content">
      <button class="trailer-modal-close">&times;</button>
      <iframe
        id="trailer-video"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
        allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  </div>
`;

document.body.appendChild(modal);

const closeBtn = modal.querySelector('.trailer-modal-close');
const backdrop = modal.querySelector('.trailer-modal-backdrop');
const iframe = modal.querySelector('#trailer-video');

export function openTrailerModal(youtubeKey) {
  iframe.src = `https://www.youtube.com/embed/${youtubeKey}?autoplay=1`;
  modal.classList.remove('is-hidden');
}

function closeTrailerModal() {
  modal.classList.add('is-hidden');
  iframe.src = '';
}

closeBtn.addEventListener('click', closeTrailerModal);
backdrop.addEventListener('click', e => {
  if (e.target === backdrop) {
    closeTrailerModal();
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('is-hidden')) {
    closeTrailerModal();
  }
});
