// burada ... kısmına yazılan js dosyalarındaki aktarılacak tanım isimleri gelecek. isimler virgül ile ayrılmalıdır.
// import { ... } from './header.js';
// import { ... } from './hero.js';
// import { ... } from './catalog-hero.js';
// import { ... } from './library-hero.js';
// import { ... } from './trends.js';
// import { ... } from './catalog.js';
// import { ... } from './library.js';

import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', renderUpcoming);

import { renderUpcoming } from './js/upcoming.js';

document.addEventListener('DOMContentLoaded', () => {
  const upcomingSection = document.getElementById('upcoming');
  if (upcomingSection) {
    renderUpcoming();
  }
});

import './js/footer.js';
