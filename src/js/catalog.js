import {
  fetchPopularMovies,
  fetchDailyTrending,
  fetchWeeklyTrending,
  fetchUpcomingMovies,
  searchMovies,
  fetchGenres,
} from '../api/tmdbApi.js';
import { createMoviePopup } from './popup.js';

console.log('catalog.js yüklendi!');

const form = document.getElementById('search-form');
const movieList = document.getElementById('movie-list');
const noResults = document.getElementById('no-results');

// --- Pagination ---
const MOVIES_PER_PAGE = 15;
const TOTAL_MOVIES = 60;
const TMDB_PAGE_SIZE = 20; // TMDB API'nın bir sayfada döndürdüğü film sayısı
const totalApiPages = Math.ceil(TOTAL_MOVIES / TMDB_PAGE_SIZE);
let allMovies = [];
let currentPage = 1;
let totalPages = Math.ceil(TOTAL_MOVIES / MOVIES_PER_PAGE);
let currentSearchResults = null;

// Pagination container
let paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination-container';

// enableMoviePopups fonksiyonu kaldırıldı çünkü createMovieCard içinde zaten tıklama olayı var

function renderPagination(page, totalPages) {
  paginationContainer.innerHTML = '';
  // Ok butonları için özel fonksiyon
  function addArrowBtn(direction, disabled) {
    const btn = document.createElement('button');
    btn.className = 'pagination-arrow';
    btn.disabled = disabled;
    let arrowSvg = '';
    if (direction === 'prev') {
      arrowSvg = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.9375 6.125L10.0625 14L17.9375 21.875" stroke="#B7B7B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
    } else {
      arrowSvg = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0625 21.875L17.9375 14L10.0625 6.125" stroke="#B7B7B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
    }
    btn.innerHTML = arrowSvg;
    paginationContainer.appendChild(btn);
    return btn;
  }
  function addPageBtn(num, isActive) {
    const btn = document.createElement('button');
    btn.className = 'pagination-page' + (isActive ? ' active' : '');
    btn.textContent = num;
    btn.addEventListener('click', () => changePage(num));
    paginationContainer.appendChild(btn);
  }
  // Oklar ve sayfa numaraları
  const prevBtn = addArrowBtn('prev', page === 1);
  prevBtn.addEventListener('click', () => changePage(page - 1));
  for (let i = 1; i <= totalPages; i++) {
    addPageBtn(i, page === i);
  }
  const nextBtn = addArrowBtn('next', page === totalPages);
  nextBtn.addEventListener('click', () => changePage(page + 1));
}

function changePage(newPage) {
  if (newPage < 1 || newPage > totalPages) return;
  currentPage = newPage;
  const movieArray = currentSearchResults || allMovies;
  renderMovies(getMoviesForPage(currentPage, movieArray));
  renderPagination(currentPage, totalPages);
}

function getMoviesForPage(page, movieArray = allMovies) {
  const start = (page - 1) * MOVIES_PER_PAGE;
  return movieArray.slice(start, start + MOVIES_PER_PAGE);
}

// YILDIZLAR İÇİN SVG'Yİ JS İLE OLUŞTUR
function getStarIcons(vote) {
  const fullStars = Math.floor(vote / 2);
  const halfStar = vote % 2 >= 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  // Dolu yıldız
  const starSvg = `<svg class="movie-catalog-star-icon" viewBox="0 0 24 24" style="margin-right:4px;vertical-align:middle;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#f87719" stroke="#f87719" stroke-width="1.2"/></svg>`;
  // Yarım yıldız (solu turuncu, sağı boş, kenarlık turuncu)
  const halfStarSvg = `<svg class="movie-catalog-star-icon" viewBox="0 0 24 24" style="margin-right:4px;vertical-align:middle;"><defs><linearGradient id="half-grad" x1="0" x2="1" y1="0" y2="0"><stop offset="50%" stop-color="#f87719"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#half-grad)" stroke="#f87719" stroke-width="1.2"/></svg>`;
  // Boş yıldız (sadece kenar çizgisi turuncu, içi boş)
  const emptyStarSvg = `<svg class="movie-catalog-star-icon" viewBox="0 0 24 24" style="margin-right:4px;vertical-align:middle;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="none" stroke="#f87719" stroke-width="1.2"/></svg>`;

  return (
    starSvg.repeat(fullStars) +
    halfStarSvg.repeat(halfStar) +
    emptyStarSvg.repeat(emptyStars)
  );
}

// Film kartı oluşturucu
function createMovieCard(movie, genreMap) {
  const li = document.createElement('li');
  li.classList.add('movie-item', 'movie-catalog-item');

  const imgSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  const releaseYear = movie.release_date?.split('-')[0] || 'Bilinmiyor';
  const rating = movie.vote_average || 0;
  // Genre isimleri
  let genreNames = 'Tür bilinmiyor';
  if (movie.genre_ids && genreMap) {
    genreNames = movie.genre_ids.map(id => genreMap[id] || id).join(', ');
  } else if (movie.genres && Array.isArray(movie.genres)) {
    genreNames = movie.genres.map(g => g.name).join(', ');
  }
  const stars = getStarIcons(rating);

  li.innerHTML = `
    <img src="${imgSrc}" alt="${movie.title}" class="catalog-film-poster" />
    <div class="catalog-overlay">
      <h3 class="catalog-film-title">${movie.title}</h3>
      <div class="movie-catalog-bottom-row">
        <p class="movie-catalog-film-info">${genreNames} | ${releaseYear}</p>
        <div class="movie-catalog-stars">${stars}</div>
      </div>
    </div>
  `;

  // Popup açmak için tıklama
  li.addEventListener('click', () => {
    if (typeof createMoviePopup === 'function') {
      createMoviePopup(movie, genreMap);
    }
  });

  return li;
}

// renderMovies fonksiyonunu güncelle
function renderMovies(movies) {
  movieList.innerHTML = '';
  if (!movies || movies.length === 0) {
    noResults.style.display = 'block';
    paginationContainer.style.display = 'none';
    return;
  }
  noResults.style.display = 'none';
  paginationContainer.style.display = '';
  // Genre map'i hazırla
  if (!window._genreMap) window._genreMap = null;
  const genreMap = window._genreMap;
  movies.forEach(movie => {
    const li = createMovieCard(movie, genreMap);
    li._movieData = movie;
    movieList.appendChild(li);
  });
}

// Genre map'i başta doldur (initCatalog içinde)
async function ensureGenreMap() {
  if (window._genreMap) return window._genreMap;
  if (typeof fetchGenres === 'function') {
    const data = await fetchGenres();
    console.log('fetchGenres sonucu:', data);
    const map = {};
    if (data.genres && Array.isArray(data.genres)) {
      data.genres.forEach(g => {
        map[g.id] = g.name;
      });
    }
    window._genreMap = map;
    return map;
  }
  return null;
}

// Custom year dropdown
let selectedYear = '';
const yearDropdown = document.querySelector('.year-dropdown');
yearDropdown.style.display = 'none';
const yearSelected = yearDropdown.querySelector('.year-selected');
const yearOptions = yearDropdown.querySelector('.year-options');
const yearLabel = yearDropdown.querySelector('.year-label');

const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1900; y--) {
  const li = document.createElement('li');
  li.textContent = y;
  li.addEventListener('click', () => {
    selectedYear = y;
    yearLabel.textContent = y;
    yearOptions.classList.add('hidden');
  });
  yearOptions.appendChild(li);
}

yearSelected.addEventListener('click', e => {
  e.stopPropagation();
  yearOptions.classList.toggle('hidden');
});

document.addEventListener('click', e => {
  if (!yearDropdown.contains(e.target)) {
    yearOptions.classList.add('hidden');
  }
});

// Arama inputuna çarpı (clear) butonu ekle
function addSearchClearButton() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;
  // Eğer zaten bir wrapper yoksa, inputu bir wrapper ile sar
  if (!searchInput.parentNode.classList.contains('search-input-wrapper')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'search-input-wrapper';
    searchInput.parentNode.insertBefore(wrapper, searchInput);
    wrapper.appendChild(searchInput);
  }
  const wrapper = searchInput.parentNode;
  // Eğer zaten eklenmişse tekrar ekleme
  if (wrapper.querySelector('.search-clear-btn')) return;
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'search-clear-btn';
  clearBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 4.5L4.5 13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
  clearBtn.style.display = 'none'; // Başta gizli
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    clearBtn.style.display = 'none';
  });
  wrapper.appendChild(clearBtn);
  // Input eventleriyle butonu göster/gizle
  searchInput.addEventListener('input', () => {
    clearBtn.style.display = searchInput.value ? 'flex' : 'none';
  });
  // Sayfa yüklenince de kontrol et
  clearBtn.style.display = searchInput.value ? 'flex' : 'none';
}

// Otomatik başlat
document.addEventListener('DOMContentLoaded', () => {
  initCatalog();
  addSearchClearButton();
});

export async function initCatalog() {
  console.log('initCatalog fonksiyonu çağrıldı!');
  if (!form || !movieList || !noResults) {
    console.error('Catalog için gerekli DOM elemanları bulunamadı!');
    return;
  }

  try {
    // Sadece popüler filmlerden 60 film çek
    let allFetchedMovies = [];
    for (let i = 1; i <= totalApiPages; i++) {
      const data = await fetchPopularMovies(i);
      allFetchedMovies = allFetchedMovies.concat(data.results);
    }
    allMovies = allFetchedMovies.slice(0, TOTAL_MOVIES);
    totalPages = Math.ceil(allMovies.length / MOVIES_PER_PAGE);
    currentPage = 1;
    // --- TEST: Genre map geliyor mu? ---
    const testGenreMap = await ensureGenreMap();
    console.log('Genre map:', testGenreMap);
    // --- TEST SONU ---
    renderMovies(getMoviesForPage(currentPage));
    renderPagination(currentPage, totalPages);
    // Pagination'ı movieList'in hemen altına ekle
    if (!paginationContainer.parentNode) {
      movieList.parentNode.insertBefore(
        paginationContainer,
        movieList.nextSibling
      );
    }

    // Arama formu submit
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const query = document.getElementById('search-input').value.trim();
      const year = selectedYear;

      if (!query) return;

      try {
        const data = await searchMovies(query);
        let filteredResults = data.results;

        if (year) {
          filteredResults = filteredResults.filter(
            m => m.release_date && m.release_date.startsWith(year)
          );
        }

        currentSearchResults = filteredResults;
        totalPages = Math.ceil(filteredResults.length / MOVIES_PER_PAGE);
        currentPage = 1;
        renderMovies(getMoviesForPage(currentPage, currentSearchResults));
        renderPagination(currentPage, totalPages);
        yearDropdown.style.display = 'inline-block'; // Sadece arama sonrası göster
        form.classList.add('active'); // Sadece arama sonrası üçlü blok ortala

        if (filteredResults.length === 0) {
          noResults.style.display = 'block';
        } else {
          noResults.style.display = 'none';
        }
      } catch (error) {
        console.error('Arama sırasında hata oluştu:', error);
        noResults.style.display = 'block';
        noResults.textContent = 'Film bulunamadı veya bir hata oluştu.';
        yearDropdown.style.display = 'inline-block'; // Hata olsa bile göster
        form.classList.add('active'); // Hata olsa bile üçlü blok ortala
      }
    });
  } catch (error) {
    console.error('Filmler yüklenirken hata:', error);
    noResults.style.display = 'block';
    noResults.textContent = 'Filmler yüklenirken hata oluştu.';
  }
}
