import { fetchGenres } from '../api/tmdbApi.js';

// 1. Popup'u gösterme fonksiyonu
export async function createMoviePopup(movie, genreMap) {
  let template = document.querySelector('#catalog-popup-template');

  if (!template) {
    const popupPath = './popup.html';

    try {
      const res = await fetch(popupPath);
      if (!res.ok) {
        console.error(
          `Popup.html yüklenemedi. Durum: ${res.status}, URL: ${res.url}`
        );
        return;
      }

      const html = await res.text();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      const popupSection = tempDiv.querySelector('.movie-popup-section');
      if (!popupSection) {
        console.error('.movie-popup-section bulunamadı.');
        return;
      }

      popupSection.id = 'catalog-popup-template';
      document.body.appendChild(popupSection);
      await showCatalogPopupFromTemplate(popupSection, movie, genreMap);
    } catch (error) {
      console.error('Popup yüklenirken bir hata oluştu:', error);
    }

    return;
  }

  const popupSection = template.cloneNode(true);
  popupSection.id = '';
  const popupOverlay = popupSection.querySelector('.movie-popup-overlay');
  await showCatalogPopupFromTemplate(popupSection, movie, genreMap);
}

// --------------------------------------------
// 2. Popup içeriğini doldurma ve event ekleme
// --------------------------------------------
async function showCatalogPopupFromTemplate(popupSection, movie, genreMap) {
  popupSection.style.display = 'block';
  const popupOverlay = popupSection.querySelector('.movie-popup-overlay');

  const img = popupOverlay.querySelector('.movie-popup-img');
  img.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : '';
  img.alt = movie.title;

  popupOverlay.querySelector('.movie-popup-title').textContent = movie.title;
  popupOverlay.querySelector('.vote-avg').textContent =
    movie.vote_average?.toFixed(1) ?? '-';
  popupOverlay.querySelector('.vote-count').textContent =
    movie.vote_count ?? '-';
  popupOverlay.querySelector('.popularity-value').textContent =
    movie.popularity?.toFixed(1) ?? '-';

  let genreText = '-';
  if (movie.genre_names?.length) {
    genreText = movie.genre_names.join(', ');
  } else if (movie.genres?.length) {
    genreText = movie.genres.map(g => g.name).join(', ');
  } else if (movie.genre_ids?.length) {
    genreText = movie.genre_ids.map(id => genreMap[id] || id).join(', ');
  }
  popupOverlay.querySelector('.genre-value').textContent = genreText;

  popupOverlay.querySelector('.about-value').textContent =
    movie.overview || 'No description.';

  // Add to Library butonu
  const addBtn = popupOverlay.querySelector('.movie-popup-add-btn');
  if (addBtn) {
    // Film zaten library'de mi kontrol et
    let library = JSON.parse(localStorage.getItem('library')) || [];
    const isInLibrary = library.includes(movie.id);

    // Tek event listener kullan
    addBtn.onclick = () => {
      let currentLibrary = JSON.parse(localStorage.getItem('library')) || [];
      const isCurrentlyInLibrary = currentLibrary.includes(movie.id);

      if (isCurrentlyInLibrary) {
        // Film library'de, çıkar
        currentLibrary = currentLibrary.filter(id => id !== movie.id);
        localStorage.setItem('library', JSON.stringify(currentLibrary));
        addBtn.textContent = 'Add to library';
        addBtn.classList.remove('removed');
      } else {
        // Film library'de değil, ekle
        currentLibrary.push(movie.id);
        localStorage.setItem('library', JSON.stringify(currentLibrary));
        addBtn.textContent = 'Remove from library';
        addBtn.classList.add('removed');
      }
    };

    // Başlangıç durumunu ayarla
    if (isInLibrary) {
      addBtn.textContent = 'Remove from library';
      addBtn.classList.add('removed');
    } else {
      addBtn.textContent = 'Add to library';
      addBtn.classList.remove('removed');
    }
  }

  const closeBtn = popupOverlay.querySelector('.movie-popup-close');
  const isLocal = window.location.hostname === 'localhost';
  const repoName = isLocal ? '' : window.location.pathname.split('/')[1];
  const basePath = isLocal ? '' : `/${repoName}`;

  closeBtn.addEventListener('mouseenter', () => {
    closeBtn.querySelector('img').src = `${basePath}/img/svg/close-hover.svg`;
  });

  closeBtn.addEventListener('mouseleave', () => {
    closeBtn.querySelector('img').src = `${basePath}/img/svg/close.svg`;
  });

  closeBtn.addEventListener('click', () => closeCatalogPopup());

  popupOverlay.addEventListener('mousedown', e => {
    if (e.target === popupOverlay) {
      closeCatalogPopup();
    }
  });

  // ESC tuşu ile kapatma
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCatalogPopup();
    }
  });

  document.body.appendChild(popupSection);
}


// -----------------------------
// 3. Popup kapatma fonksiyonu
// -----------------------------
export function closeCatalogPopup() {
  const popup =
    document.querySelector('.movie-popup-section') ||
    document.querySelector('#catalog-popup-template');
  if (popup) popup.remove();
}
