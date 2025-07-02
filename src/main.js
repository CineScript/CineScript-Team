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

const themeButtons = document.querySelectorAll('[data-theme-option]');
const htmlEl = document.documentElement;

// Kaydedilmiş tema varsa uygula
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlEl.setAttribute('data-theme', savedTheme);
}

// Butonlara tıklama dinleyicisi
themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedTheme = button.getAttribute('data-theme-option');
    htmlEl.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  });
});
