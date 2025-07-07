<<<<<<< HEAD
=======
export function initHeader() {
  const menuBtn = document.getElementById('menuToggleBtn');
  const mainNav = document.getElementById('mainNav');
  const overlay = document.getElementById('menuOverlay');

  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  // Overlay tıklanınca menüyü kapat
  overlay.addEventListener('click', () => {
    mainNav.classList.remove('open');
    overlay.classList.remove('active');
  });

  // TEMA TOGGLE (Dark / Light)
  const htmlEl = document.documentElement;
  const themeIcon = document.querySelector('.theme-icon');
  // 1. Sayfa yüklendiğinde önce kaydedilmiş tema uygulanır
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
  } else {
    // Yoksa varsayılan tema olarak "dark"
    htmlEl.setAttribute('data-theme', 'dark');
    updateIcon('dark');
  }
  // 2. Butona tıklanınca tema değişir
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);

    console.log('Tema değişti:', newTheme); // 👉 burada log görünüyor mu?
  });

  // 3. İkonu güncelleme fonksiyonu
  function updateIcon(theme) {
    const iconPath =
      theme === 'dark' ? './img/svg/dark.svg' : './img/svg/light.svg';
    themeIcon.setAttribute('src', iconPath);
  }
}
>>>>>>> 05c75ec (değişiklikler eklendi)
