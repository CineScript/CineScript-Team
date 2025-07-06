import {
  fetchPopularMovies,
  fetchDailyTrending,
  fetchWeeklyTrending,
  fetchUpcomingMovies,
  searchMovies,
  fetchGenres,
} from '../api/tmdbApi.js';

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

import './catalog-hero.js';
import '../css/modal-trailer.css';
import { createMoviePopup } from './popup.js';

console.log('catalog.js yüklendi!');

const form = document.getElementById('search-form');
const movieList = document.getElementById('movie-list');
const noResults = document.getElementById('no-results');
const yearSelect = document.getElementById('year-select');
const pageNumbers = document.getElementById('page-numbers');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');

// Pagination
let currentPage = 1;
let totalPages = 1;
let allMovies = [];
const moviesPerPage = 21;

function enableMoviePopups() {
  movieList.addEventListener('click', e => {
    const li = e.target.closest('li.movie-item');
    if (!li) return;
    const idx = Array.from(movieList.children).indexOf(li);
    const movies = Array.from(movieList.children)
      .map(li => li._movieData)
      .filter(Boolean);
    const movie = movies[idx];
    if (movie) createMoviePopup(movie);
  });
}



function populateYearSelect() {
  const currentYear = new Date().getFullYear();
  
  // Mevcut Year option kaldırma
  const yearOption = yearSelect.querySelector('option[value=""]');
  if (yearOption) {
    yearOption.remove();
  }
  
  // Year option yıl ekleme
  for (let y = currentYear; y >= 1900; y--) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
  
  //Year option en sona ekleme
  const yearPlaceholder = document.createElement('option');
  yearPlaceholder.value = '';
  yearPlaceholder.textContent = 'Year';
  yearPlaceholder.disabled = true;
  yearPlaceholder.selected = true;
  yearSelect.appendChild(yearPlaceholder);
}

function createPagination() {
  pageNumbers.innerHTML = '';
  totalPages = Math.ceil(allMovies.length / moviesPerPage);
  
  // Maksimum 5 sayfa gösterme
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.dataset.page = i;
    pageBtn.addEventListener('click', () => goToPage(i));
    pageNumbers.appendChild(pageBtn);
  }
  
  // Önceki Sonraki butonlarını güncelleme
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

async function goToPage(page) {
  currentPage = page;
  await renderMovies(getMoviesForPage());
  createPagination();
}

function getMoviesForPage() {
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  return allMovies.slice(startIndex, endIndex);
}

async function renderMovies(movies) {
  movieList.innerHTML = '';
  if (!movies || movies.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';
  
  // Genre map
  await ensureGenreMap();
  
  movies.forEach(movie => {
    const li = document.createElement('li');
    li.classList.add('movie-item');
    
    // Yıl bilgisi
    const year = movie.release_date ? movie.release_date.split('-')[0] : '';
    
    // Genre bilgileri
    let genreText = '';
    if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
      const genreNames = movie.genre_ids
        .slice(0, 2)
        .map(id => genreMap[id])
        .filter(Boolean);
      genreText = genreNames.join(', ');
    }
    
    // Yıldız ratingi
    const rating = movie.vote_average ? Math.round(movie.vote_average / 2) : 0;
    
    // Yıldızlar
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsHTML += '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="star-icon"><path d="M13.852 16.8746C13.7336 16.875 13.6181 16.8381 13.5219 16.7691L9.00048 13.4911L4.47903 16.7691C4.38243 16.8392 4.26606 16.8767 4.14673 16.8762C4.0274 16.8758 3.91129 16.8374 3.81521 16.7667C3.71912 16.6959 3.64803 16.5964 3.61221 16.4826C3.57639 16.3688 3.5777 16.2465 3.61594 16.1335L5.37938 10.9103L0.809069 7.77612C0.710073 7.70831 0.635356 7.61062 0.595836 7.49732C0.556316 7.38402 0.554063 7.26105 0.589407 7.14638C0.624751 7.0317 0.695839 6.93134 0.792285 6.85995C0.888732 6.78856 1.00548 6.74988 1.12548 6.74956H6.76384L8.4654 1.51304C8.50205 1.39998 8.57358 1.30144 8.6697 1.23156C8.76583 1.16167 8.88163 1.12402 9.00048 1.12402C9.11932 1.12402 9.23512 1.16167 9.33125 1.23156C9.42738 1.30144 9.4989 1.39998 9.53555 1.51304L11.2371 6.75132H16.8755C16.9956 6.75126 17.1126 6.78967 17.2094 6.86093C17.3061 6.93218 17.3775 7.03254 17.413 7.1473C17.4486 7.26206 17.4465 7.38519 17.407 7.49866C17.3675 7.61213 17.2928 7.70998 17.1936 7.77788L12.6216 10.9103L14.384 16.1321C14.4125 16.2166 14.4205 16.3067 14.4074 16.395C14.3942 16.4832 14.3603 16.5671 14.3083 16.6396C14.2563 16.7122 14.1879 16.7713 14.1085 16.8122C14.0292 16.853 13.9413 16.8744 13.852 16.8746Z" fill="url(#paint0_linear_148_6985)"/><defs><linearGradient id="paint0_linear_148_6985" x1="2.62549" y1="2.24957" x2="13.8755" y2="17.2496" gradientUnits="userSpaceOnUse"><stop stop-color="#F84119"/><stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/></linearGradient></defs></svg>';
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        starsHTML += '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="star-icon"><path d="M9.00048 1.12402C9.11932 1.12402 9.23512 1.16167 9.33125 1.23156C9.42738 1.30144 9.4989 1.39998 9.53555 1.51304L11.2371 6.75132H16.8755C16.9956 6.75126 17.1126 6.78967 17.2094 6.86093C17.3061 6.93218 17.3775 7.03254 17.413 7.1473C17.4486 7.26206 17.4465 7.38519 17.407 7.49866C17.3675 7.61213 17.2928 7.70998 17.1936 7.77788L12.6216 10.9103L14.384 16.1321C14.4125 16.2166 14.4205 16.3067 14.4074 16.395C14.3942 16.4832 14.3603 16.5671 14.3083 16.6396C14.2563 16.7122 14.1879 16.7713 14.1085 16.8122C14.0292 16.853 13.9413 16.8744 13.852 16.8746Z" fill="url(#paint0_linear_148_6985)"/><defs><linearGradient id="paint0_linear_148_6985" x1="2.62549" y1="2.24957" x2="13.8755" y2="17.2496" gradientUnits="userSpaceOnUse"><stop stop-color="#F84119"/><stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/></linearGradient></defs></svg>';
      } else {
        starsHTML += '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="star-icon"><path d="M13.852 16.8746C13.7336 16.875 13.6181 16.8381 13.5219 16.7691L9.00048 13.4911L4.47903 16.7691C4.38243 16.8392 4.26606 16.8767 4.14673 16.8762C4.0274 16.8758 3.91129 16.8374 3.81521 16.7667C3.71912 16.6959 3.64803 16.5964 3.61221 16.4826C3.57639 16.3688 3.5777 16.2465 3.61594 16.1335L5.37938 10.9103L0.809069 7.77612C0.710073 7.70831 0.635356 7.61062 0.595836 7.49732C0.556316 7.38402 0.554063 7.26105 0.589407 7.14638C0.624751 7.0317 0.695839 6.93134 0.792285 6.85995C0.888732 6.78856 1.00548 6.74988 1.12548 6.74956H6.76384L8.4654 1.51304C8.50205 1.39998 8.57358 1.30144 8.6697 1.23156C8.76583 1.16167 8.88163 1.12402 9.00048 1.12402C9.11932 1.12402 9.23512 1.16167 9.33125 1.23156C9.42738 1.30144 9.4989 1.39998 9.53555 1.51304L11.2371 6.75132H16.8755C16.9956 6.75126 17.1126 6.78967 17.2094 6.86093C17.3061 6.93218 17.3775 7.03254 17.413 7.1473C17.4486 7.26206 17.4465 7.38519 17.407 7.49866C17.3675 7.61213 17.2928 7.70998 17.1936 7.77788L12.6216 10.9103L14.384 16.1321C14.4125 16.2166 14.4205 16.3067 14.4074 16.395C14.3942 16.4832 14.3603 16.5671 14.3083 16.6396C14.2563 16.7122 14.1879 16.7713 14.1085 16.8122C14.0292 16.853 13.9413 16.8744 13.852 16.8746Z" stroke="#B7B7B7" stroke-width="1.5"/></svg>';
      }
    }
    
    li.innerHTML = `
      <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p class="movie-genre-year">${genreText}${genreText && year ? ' | ' : ''}${year}</p>
      </div>
      <div class="movie-rating">
        ${starsHTML}
      </div>
    `;
    li._movieData = movie;
    movieList.appendChild(li);
  });
}

export async function initCatalog() {
  console.log('initCatalog fonksiyonu çağrıldı!');
  if (!form || !movieList || !noResults || !yearSelect) {
    console.error('Catalog için gerekli DOM elemanları bulunamadı!');
    return;
  }

  populateYearSelect();

  try {
    const [popularData, dailyData, weeklyData, upcomingData] =
      await Promise.all([
        fetchPopularMovies(),
        fetchDailyTrending(),
        fetchWeeklyTrending(),
        fetchUpcomingMovies(),
      ]);

    const moviesData = [
      ...popularData.results,
      ...dailyData.results,
      ...weeklyData.results,
      ...upcomingData.results,
    ];

    const uniqueMovies = new Map();
    moviesData.forEach(m => {
      if (!uniqueMovies.has(m.id)) uniqueMovies.set(m.id, m);
    });

    allMovies = Array.from(uniqueMovies.values());
    console.log('Toplam film sayısı:', allMovies.length);
    console.log('Toplam sayfa sayısı:', Math.ceil(allMovies.length / moviesPerPage));
    await renderMovies(getMoviesForPage());
    createPagination();

    // Arama formu submit
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const query = document.getElementById('search-input').value.trim();
      const year = yearSelect.value;

      if (!query) return;

      try {
        const data = await searchMovies(query);
        let filteredResults = data.results;

        if (year) {
          filteredResults = filteredResults.filter(
            m => m.release_date && m.release_date.startsWith(year)
          );
        }

        allMovies = filteredResults;
        currentPage = 1; // Arama yapıldığında ilk sayfaya dönme
        await renderMovies(getMoviesForPage());
        createPagination();

        if (filteredResults.length === 0) {
          noResults.style.display = 'block';
          noResults.innerHTML = `
            <div class="no-results-content">
              <p class="oops-text">OOPS...</p>
              <p class="sorry-text">We are very sorry!</p>
              <p class="no-match-text">We don't have any results matching your search.</p>
            </div>
          `;
        } else {
          noResults.style.display = 'none';

          yearSelect.style.display = 'inline-block';
          yearSelect.classList.add('show');

          const searchBtn = form.querySelector('.search-button');
          if (searchBtn && yearSelect) {
            form.insertBefore(yearSelect, searchBtn);
          }
        }
      } catch (error) {
        console.error('Arama sırasında hata oluştu:', error);
        noResults.style.display = 'block';
        noResults.innerHTML = `
          <div class="no-results-content">
            <p class="oops-text">OOPS...</p>
            <p class="sorry-text">We are very sorry!</p>
            <p class="no-match-text">We don't have any results matching your search.</p>
          </div>
        `;
      }
    });
  } catch (error) {
    console.error('Filmler yüklenirken hata:', error);
    noResults.style.display = 'block';
    noResults.innerHTML = `
      <div class="no-results-content">
        <p class="oops-text">OOPS...</p>
        <p class="sorry-text">We are very sorry!</p>
        <p class="no-match-text">We don't have any results matching your search.</p>
      </div>
    `;
  }
}

// Search input event listeners
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) {
    clearSearchBtn.style.display = 'flex';
  } else {
    clearSearchBtn.style.display = 'none';
  }
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  searchInput.focus();
});

// Pagination event listeners
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
});

// Otomatik başlat
initCatalog();
enableMoviePopups();
