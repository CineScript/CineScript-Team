import { fetchGenres } from '../api/tmdbApi.js';

// 1. Popup'u gösterme fonksiyonu
export async function deleteHeroTrendsPopup(movie, genreMap) {
  let template = document.querySelector('#hero-trends-popup-template');

  if (!template) {
    const popupPath = './public/popup.html';

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

      const popupOverlay = tempDiv.querySelector('.movie-popup-overlay');
      if (!popupOverlay) {
        console.error('.movie-popup-overlay bulunamadı.');
        return;
      }

      popupOverlay.id = 'hero-trends-popup-template';
      document.body.appendChild(popupOverlay);
      await showHeroTrendsPopupFromTemplate(popupOverlay, movie, genreMap);
    } catch (error) {
      console.error('Popup yüklenirken bir hata oluştu:', error);
    }

    return;
  }

  const popupOverlay = template.cloneNode(true);
  popupOverlay.id = '';
  await showHeroTrendsPopupFromTemplate(popupOverlay, movie, genreMap);
}

// 2. Popup içeriğini doldurma ve event ekleme
async function showHeroTrendsPopupFromTemplate(popupOverlay, movie, genreMap) {
  popupOverlay.style.display = 'flex';

  // ESC tuşuyla kapatma
  function handleEscKey(event) {
    if (event.key === 'Escape') {
      deleteHeroTrendsPopupClose();
      document.removeEventListener('keydown', handleEscKey);
    }
  }
  document.addEventListener('keydown', handleEscKey);

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

  const removeBtn = popupOverlay.querySelector('.movie-popup-add-btn.removed');
  if (removeBtn) {
    removeBtn.style.display = 'inline-block';

    removeBtn.onclick = () => {
      let library = JSON.parse(localStorage.getItem('library')) || [];
      library = library.filter(id => id !== movie.id);
      localStorage.setItem('library', JSON.stringify(library));

      deleteHeroTrendsPopupClose();
      window.location.reload();
    };
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

  closeBtn.addEventListener('click', () => {
    deleteHeroTrendsPopupClose();
    document.removeEventListener('keydown', handleEscKey);
  });

  popupOverlay.addEventListener('mousedown', e => {
    if (e.target === popupOverlay) {
      deleteHeroTrendsPopupClose();
      document.removeEventListener('keydown', handleEscKey);
    }
  });

  document.body.appendChild(popupOverlay);
}

// 3. Popup kapatma fonksiyonu
export function deleteHeroTrendsPopupClose() {
  const popup =
    document.querySelector('.movie-popup-overlay') ||
    document.querySelector('#hero-trends-popup-template');
  if (popup) popup.remove();
}
