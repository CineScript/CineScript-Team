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

import { renderUpcoming } from './js/upcoming.js';
import { initFooterModal } from './js/footer.js';

import { initCatalog } from './js/catalog.js';
import { createMoviePopup } from './js/popup.js';
import './js/library.js';

async function loadPartials() {
  const loads = document.querySelectorAll('load');

  for (const el of loads) {
    const src = el.getAttribute('src');
    if (src) {
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
      }
    }
  }
}

// ✅ Yüklemeler tamamlandıktan sonra çalışacak
(async () => {
  await loadPartials();

  // DOM'un güncellenmesini beklemek için küçük bir gecikme
  await new Promise(resolve => requestAnimationFrame(resolve));

  try {
    const upcomingSection = document.getElementById('upcoming');
    if (upcomingSection) {
      console.log('📦 #upcoming bulundu, render başlıyor');
      renderUpcoming();
    } else {
      console.warn("⛔️ #upcoming DOM'da bulunamadı");
    }

    const footerEl = document.getElementById('footer');
    if (footerEl) initFooterModal();
  } catch (error) {
    console.error('Bölümler başlatılırken hata oluştu:', error);
  }
})();

loadPartials().then(() => {
initCatalog();
});
