const teamBtn = document.getElementById('team-btn');
const teamModal = document.getElementById('team-modal');
const modalClose = document.getElementById('modal-close');

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

teamBtn.addEventListener('click', () => {
  teamModal.style.display = 'flex';
  showSlide(currentSlide);
});

modalClose.addEventListener('click', () => {
  teamModal.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
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
