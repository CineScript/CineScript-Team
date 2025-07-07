<<<<<<< HEAD
// burada ... kısmına yazılan js dosyalarındaki aktarılacak tanım isimleri gelecek. isimler virgül ile ayrılmalıdır.
// import { ... } from './header.js';
// import { ... } from './hero.js';
// import { ... } from './catalog-hero.js';
// import { ... } from './library-hero.js';
// import { ... } from './trends.js';
// import { ... } from './upcoming.js';
// import { ... } from './catalog.js';
// import { ... } from './library.js';
// import { ... } from './footer.js';

import { initCatalog } from './js/catalog.js';

const themeButtons = document.querySelectorAll('[data-theme-option]');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
}

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedTheme = button.getAttribute('data-theme-option');
    htmlEl.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  });
});

=======
// Stil ve bağımlılıkları
import 'izitoast/dist/css/iziToast.min.css';
// Sayfa bölümleri
import { renderUpcoming } from './js/upcoming.js';
import { setupHeroEvents } from './js/catalog-hero.js';
import './js/library.js'; // sadece çalıştırmak için import ediliyor
// Global işlevsellik
import './js/header.js';
import { initFooterModal } from './js/footer.js';
import './js/hero.js';
import './js/library-hero.js';
import './js/trends.js';
import './js/loader.js';
import './js/scroll-up.js';
// :arrows_counterclockwise: HTML <load src="..."> etiketlerini parçalarla değiştir
import './api/tmdbApi.js';
import 'izitoast/dist/css/iziToast.min.css';
document.addEventListener('DOMContentLoaded', () => {
  const upcomingSection = document.getElementById('upcoming');
  if (upcomingSection) {
    renderUpcoming();
  }
});
import { initCatalog } from './js/catalog.js';
import { createMoviePopup } from './js/popup.js';
import { showLoader, hideLoader } from './js/loader.js';
import './js/library.js';
>>>>>>> 294fd51cd64d8f02c6b4768364170b6f42ab2c30
async function loadPartials() {
  const loads = document.querySelectorAll('load');
  for (const el of loads) {
    const src = el.getAttribute('src');
    if (src) {
<<<<<<< HEAD
      const res = await fetch(src);
      if (res.ok) {
        const html = await res.text();
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        el.replaceWith(wrapper);
      } else {
        console.error('Partial yüklenemedi:', src);
=======
      try {
        const res = await fetch(src);
        if (res.ok) {
          const html = await res.text();
          const wrapper = document.createElement('div');
          wrapper.innerHTML = html;
          el.replaceWith(wrapper);
        } else {
          console.error('Partial yüklenemedi:', src);
        }
      } catch (err) {
        console.error('Yükleme hatası:', err);
>>>>>>> 294fd51cd64d8f02c6b4768364170b6f42ab2c30
      }
    }
  }
}
<<<<<<< HEAD

loadPartials().then(() => {
  initCatalog();
});

=======
// :white_check_mark: Partial'lar yüklendikten sonra her bölümü başlat
loadPartials().then(async () => {
  try {
    // CATALOG HERO bölümü varsa başlat
    const heroSection = document.querySelector('.catalog-hero');
    if (heroSection) {
      setupHeroEvents();
    }
    // CATALOG bölümü varsa modülü dinamik olarak içe aktar ve başlat
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      const { initCatalog } = await import('./js/catalog.js');
      if (typeof initCatalog === 'function') {
        initCatalog();
      }
    }
    // UPCOMING bölümü varsa başlat
    const upcomingSection = document.getElementById('upcoming');
    if (upcomingSection) {
      renderUpcoming();
    }
    // FOOTER varsa modal'ı başlat
    const footerEl = document.getElementById('footer');
    if (footerEl) {
      initFooterModal();
    }
  } catch (error) {
    console.error('Bölümler başlatılırken hata oluştu:', error);
  }
});
>>>>>>> 294fd51cd64d8f02c6b4768364170b6f42ab2c30
