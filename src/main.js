// burada ... kısmına yazılan js dosyalarındaki aktarılacak tanım isimleri gelecek. isimler virgül ile ayrılmalıdır.
// import { ... } from './header.js';
// import { ... } from './hero.js';
// import { ... } from './catalog-hero.js';
import './js/library-hero.js';
// import { ... } from './trends.js';
import './js/upcoming.js';
// import { ... } from './catalog.js';
import './js/library.js';
import './js/footer.js';

import { renderUpcoming } from './js/upcoming.js';

import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', renderUpcoming);

import { renderUpcoming } from './js/upcoming.js';

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
loadPartials().then(() => {
  initCatalog();
});
