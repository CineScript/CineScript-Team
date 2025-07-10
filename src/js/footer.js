const teamBtn = document.getElementById('team-btn');
const teamModal = document.getElementById('team-modal');
const modalClose = document.getElementById('modal-close');

let currentSlide = 0;

// Slide gösterme fonksiyonu
function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

// Modalı aç
teamBtn.addEventListener('click', () => {
  currentSlide = 0;
  showSlide(currentSlide);
  teamModal.style.display = 'flex';
});

// Modalı kapat
modalClose.addEventListener('click', () => {
  teamModal.style.display = 'none';
});

// ESC ile kapat
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    teamModal.style.display = 'none';
  }
});

// Modal dışına tıklanırsa kapat
teamModal.addEventListener('click', e => {
  if (e.target === teamModal) {
    teamModal.style.display = 'none';
  }
});

// Önceki slide (yeni class: .prev-slide)
document.querySelector('.prev-slide').addEventListener('click', () => {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Sonraki slide (yeni class: .next-slide)
document.querySelector('.next-slide').addEventListener('click', () => {
  const slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});
