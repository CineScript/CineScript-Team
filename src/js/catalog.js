import {
  fetchPopularMovies,
  fetchDailyTrending,
  fetchWeeklyTrending,
  fetchUpcomingMovies,
  searchMovies
} from '../api/tmdbApi.js';
import { createMoviePopup } from './popup.js';

console.log('catalog.js yüklendi!');

const form = document.getElementById('search-form');
const movieList = document.getElementById('movie-list');
const noResults = document.getElementById('no-results');
const yearSelect = document.getElementById('year-select');

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

function renderMovies(movies) {
  movieList.innerHTML = '';
  if (!movies || movies.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';
  const moviesToShow = movies.slice(0, 21);
  moviesToShow.forEach(movie => {
    const li = document.createElement('li');
    li.classList.add('movie-item');
    li.innerHTML = `
      <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Yayın Tarihi: ${movie.release_date || 'Bilinmiyor'}</p>
    `;
    li._movieData = movie;
    movieList.appendChild(li);
  });
}

function populateYearSelect() {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1900; y--) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
}

export async function initCatalog() {
  console.log('initCatalog fonksiyonu çağrıldı!');
  if (!form || !movieList || !noResults || !yearSelect) {
    console.error('Catalog için gerekli DOM elemanları bulunamadı!');
    return;
  }

  populateYearSelect();

  try {
    const [popularData, dailyData, weeklyData, upcomingData] = await Promise.all([
      fetchPopularMovies(),
      fetchDailyTrending(),
      fetchWeeklyTrending(),
      fetchUpcomingMovies()
    ]);

    const allMovies = [
      ...popularData.results,
      ...dailyData.results,
      ...weeklyData.results,
      ...upcomingData.results
    ];

    const uniqueMovies = new Map();
    allMovies.forEach(m => {
      if (!uniqueMovies.has(m.id)) uniqueMovies.set(m.id, m);
    });

    renderMovies(Array.from(uniqueMovies.values()));

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

        renderMovies(filteredResults);

        if (filteredResults.length === 0) {
          noResults.style.display = 'block';
          noResults.textContent = 'Aradığınız kriterlere uygun film bulunamadı.';
        } else {
          noResults.style.display = 'none';

          // Yıl seçiciyi görünür yap
          yearSelect.style.display = 'inline-block';

          // Yıl seçiciyi arama kutusu ile buton arasına taşı
          const searchBtn = form.querySelector('.search-button');
          if (searchBtn && yearSelect) {
            form.insertBefore(yearSelect, searchBtn);
          }
        }
      } catch (error) {
        console.error('Arama sırasında hata oluştu:', error);
        noResults.style.display = 'block';
        noResults.textContent = 'Film bulunamadı veya bir hata oluştu.';
      }
    });

  } catch (error) {
    console.error('Filmler yüklenirken hata:', error);
    noResults.style.display = 'block';
    noResults.textContent = 'Filmler yüklenirken hata oluştu.';
  }
}

// Otomatik başlat
initCatalog();
enableMoviePopups();
