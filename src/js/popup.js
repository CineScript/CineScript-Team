import {
  fetchPopularMovies,
  fetchDailyTrending,
  fetchWeeklyTrending,
  fetchUpcomingMovies,
  searchMovies,
  fetchGenres,
  fetchMovieDetails,
  fetchMovieVideos,
} from '../api/tmdbApi.js';
import closeSvg from '../img/svg/close.svg';
import closeHoverSvg from '../img/svg/close-hover.svg';

let genreMap = null;

async function ensureGenreMap() {
  if (genreMap) return genreMap;
  const data = await fetchGenres();
  genreMap = {};
  if (data.genres && Array.isArray(data.genres)) {
    data.genres.forEach(g => {
      genreMap[g.id] = g.name;
    });
  }
  return genreMap;
}

function getLibrary() {
  const data = localStorage.getItem('library');
  return data ? JSON.parse(data) : [];
}

function saveLibrary(library) {
  localStorage.setItem('library', JSON.stringify(library));
}

function toggleLibrary(movie, button) {
  let library = getLibrary();
  const movieId = movie.id;

  if (library.includes(movieId)) {
    library = library.filter(id => id !== movieId);
    button.textContent = 'Add to library';
    button.classList.remove('removed');
  } else {
    library.push(movieId);
    button.textContent = 'Remove from my library';
    button.classList.add('removed');
  }

  saveLibrary(library);
}

function updateButtonState(movie, button) {
  const library = getLibrary();
  if (library.includes(movie.id)) {
    button.textContent = 'Remove from my library';
    button.classList.add('removed');
  } else {
    button.textContent = 'Add to library';
    button.classList.remove('removed');
  }
}

export async function createMoviePopup(movie) {
  // popup.html'den şablonu klonla
  let template = document.querySelector('#popup-template');
  if (!template) {
    // Eğer template yoksa partials/popup.html'i fetch et ve ekle
    const isLocal = window.location.hostname === 'localhost';
    let popupPath;

    if (isLocal) {
      // Lokal geliştirme için: Public klasöründeki dosyalara '/' ile erişilir
      popupPath = '/popup.html';
    } else {
      // Canlı ortam için: GitHub Pages'da repo adıyla birlikte
      const repoName = window.location.pathname.split('/')[1];
      popupPath = `/${repoName}/popup.html`;
    }

    fetch(popupPath)
      .then(res => {
        if (!res.ok) {
          console.error(
            `Popup.html yüklenemedi. Durum: ${res.status}, URL: ${res.url}`
          );
          throw new Error('Network response was not ok.');
        }
        return res.text();
      })
      .then(async html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const popupOverlay = tempDiv.querySelector('.movie-popup-overlay');
        if (popupOverlay) {
          // Null kontrolü ekledik
          popupOverlay.id = 'popup-template';
          document.body.appendChild(popupOverlay);
          await showPopupFromTemplate(popupOverlay, movie);
        } else {
          console.error(
            'movie-popup-overlay bulunamadı, HTML içeriği yanlış olabilir.'
          );
        }
      })
      .catch(error => {
        console.error('Popup yüklenirken bir hata oluştu:', error);
      });
    return;
  }

  // Template zaten varsa klonla ve göster
  const popupOverlay = template.cloneNode(true);
  popupOverlay.id = '';
  await showPopupFromTemplate(popupOverlay, movie);
}

async function showPopupFromTemplate(popupOverlay, movie) {
  popupOverlay.style.display = 'flex';
  // Görsel
  const img = popupOverlay.querySelector('.movie-popup-img');
  img.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : '';
  img.alt = movie.title;
  // Başlık
  popupOverlay.querySelector('.movie-popup-title').textContent = movie.title;
  // Vote/votes
  const formattedVote =
    movie.vote_average != null ? movie.vote_average.toFixed(1) : '-';
  popupOverlay.querySelector('.vote-avg').textContent = formattedVote;
  popupOverlay.querySelector('.vote-count').textContent =
    movie.vote_count ?? '-';
  // Popularity
  const formattedPopularity =
    movie.popularity != null ? movie.popularity.toFixed(1) : '-';
  popupOverlay.querySelector('.popularity-value').textContent =
    formattedPopularity;
  // Genre
  let genreText = '-';
  if (movie.genre_names && Array.isArray(movie.genre_names)) {
    genreText = movie.genre_names.join(', ');
  } else if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
    const map = await ensureGenreMap();
    genreText = movie.genre_ids.map(id => map[id] || id).join(', ');
  }
  popupOverlay.querySelector('.genre-value').textContent = genreText;
  // About
  popupOverlay.querySelector('.about-value').textContent =
    movie.overview || 'No description.';

  // Buton seçimi ve durumu güncelleme & event ekleme
  const addBtn = popupOverlay.querySelector('.movie-popup-add-btn');
  if (addBtn) {
    updateButtonState(movie, addBtn);

    addBtn.addEventListener('click', function () {
      toggleLibrary(movie, this);
    });
  }

  // Kapatma butonu
  const closeBtn = popupOverlay.querySelector('.movie-popup-close');

  // Eğer butonun içinde img yoksa, dinamik olarak ekle
  let closeImg = closeBtn.querySelector('img');
  if (!closeImg) {
    closeImg = document.createElement('img');
    closeImg.alt = 'close';
    closeImg.className = 'close-icon';
    closeImg.width = 24;
    closeImg.height = 24;
    closeImg.style.width = '24px';
    closeImg.style.height = '24px';
    closeImg.src = closeSvg;
    closeBtn.appendChild(closeImg);
  }

  // Repo adını dinamik olarak alalım, böylece hem lokalde hem canlıda çalışır
  const isLocal = window.location.hostname === 'localhost';
  const repoName = isLocal ? '' : window.location.pathname.split('/')[1];
  const basePath = isLocal ? '' : `/${repoName}`; // Canlıda "/CineScript-Team" gibi olacak

  closeBtn.addEventListener('mouseenter', () => {
    // Canlıda: /CineScript-Team/img/svg/close-hover.svg
    // Lokal: /img/svg/close-hover.svg
    closeBtn.querySelector('img').src = closeHoverSvg;
  });

  closeBtn.addEventListener('mouseleave', () => {
    // Canlıda: /CineScript-Team/img/svg/close.svg
    // Lokal: /img/svg/close.svg
    closeBtn.querySelector('img').src = closeSvg;
  });

  closeBtn.addEventListener('click', () => popupOverlay.remove());

  // ESC ile popup kapatma
  function handleEscClose(e) {
    if (e.key === 'Escape') {
      popupOverlay.remove();
      document.removeEventListener('keydown', handleEscClose);
    }
  }
  document.addEventListener('keydown', handleEscClose);

  // Herhangi bir yere tıklanınca popup'ı kapat
  popupOverlay.addEventListener('mousedown', function (e) {
    if (e.target === popupOverlay) {
      popupOverlay.remove();
    }
  });
  // Ekrana ekle
  document.body.appendChild(popupOverlay);

  // Çarpı ikonunu DOM'a eklendikten sonra kesin olarak ekle
  if (closeBtn) {
    closeBtn.innerHTML = '';
    const closeImg = document.createElement('img');
    closeImg.alt = 'close';
    closeImg.className = 'close-icon';
    closeImg.width = 24;
    closeImg.height = 24;
    closeImg.style.width = '24px';
    closeImg.style.height = '24px';
    closeImg.src = closeSvg;
    closeBtn.appendChild(closeImg);
  }
}
