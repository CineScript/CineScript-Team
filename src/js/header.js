export function initHeader() {
  const menuBtn = document.getElementById('menuToggleBtn');
  const mainNav = document.getElementById('mainNav');
  const overlay = document.getElementById('menuOverlay');

  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    mainNav.classList.remove('open');
    overlay.classList.remove('active');
  });

  //  ACTIVE NAV LINK AYARI
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }

    // SPA yapısı yoksa bu kısmı da bırakabiliriz ama zararı yok
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // TEMA TOGGLE (Dark / Light)
  const htmlEl = document.documentElement;
  const themeIcon = document.querySelector('.theme-icon');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
  } else {
    htmlEl.setAttribute('data-theme', 'dark');
    updateIcon('dark');
  }

  const themeToggleBtn = document.getElementById('themeToggleBtn');

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
    console.log('Tema değişti:', newTheme);
  });

  function updateIcon(theme) {
    const iconPath = theme === 'dark' ? '/svg/dark.svg' : '/svg/light.svg';
    themeIcon.setAttribute('src', iconPath);
  }
}

initHeader();
