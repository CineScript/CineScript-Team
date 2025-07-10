const teamBtn = document.getElementById('team-btn');
const teamModal = document.getElementById('team-modal');
const modalClose = document.getElementById('modal-close');

let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

teamBtn.addEventListener('click', () => {
  currentSlide = 0;
  showSlide(currentSlide);
  teamModal.style.display = 'flex';
});

modalClose.addEventListener('click', () => {
  teamModal.style.display = 'none';
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    teamModal.style.display = 'none';
  }
});

teamModal.addEventListener('click', e => {
  if (e.target === teamModal) {
    teamModal.style.display = 'none';
  }
});

document.querySelector('.prev-slide').addEventListener('click', () => {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

document.querySelector('.next-slide').addEventListener('click', () => {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});
