import { renderUpcoming } from './js/upcoming.js';
import './js/header.js';
import './js/hero.js';
import './js/catalog-hero.js';
import './js/library-hero.js';
import './js/trends.js';
// import './js/upcoming.js';
import './js/catalog.js';
import './js/library.js';
import './js/footer.js';
import './js/popup.js';
import './js/loader.js';
import './js/scroll-up.js';
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
import './js/scroll-up.js';
import './js/library-hero.js';
import './js/library.js';
async function loadPartials() {
  const loads = document.querySelectorAll('load');
  for (const el of loads) {
    const src = el.getAttribute('src');
    if (src) {
      const res = await fetch(src);
      if (res.ok) {
        const html = await res.text();
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        el.replaceWith(wrapper);
      } else {
        console.error('Partial yüklenemedi:', src);
      }
    }
  }
}
loadPartials().then(() => {});
