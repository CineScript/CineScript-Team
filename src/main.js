import { renderUpcoming } from './js/upcoming.js';
import { initFooterModal } from './js/footer.js';

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
