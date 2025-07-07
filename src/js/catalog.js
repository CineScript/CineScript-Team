import { fetchWeeklyTrending, searchMovies } from '../api/tmdbApi.js';
import { createMoviePopup } from './popup.js';

let form, movieList, noResults, yearSelect, clearBtn;
let currentPage = 1;
let currentQuery = '';
let currentYear = '';

function enableMoviePopups() {
  movieList.addEventListener('click', e => {
    const li = e.target.closest('li.movie-item');
    if (!li || !li._movieData) return;
    createMoviePopup(li._movieData);
  });
}

function renderMovies(movies) {
  movieList.innerHTML = '';

  if (!movies || movies.length === 0) {
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  movies
    .filter(m => m && m.poster_path)
    .forEach(movie => {
      const li = document.createElement('li');
      li.classList.add('movie-item');
      li.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
        movie.title
      }" />
        <div class="movie-item-text">
          <h3>${movie.title}</h3>
          <p>${movie.release_date?.split('-')[0] || 'Unknown'}</p>
        </div>`;
      li._movieData = movie;
      movieList.appendChild(li);
    });
}

function populateYearSelect() {
  const now = new Date().getFullYear();
  for (let y = now; y >= 1900; y--) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
}

async function loadTrending() {
  try {
    const data = await fetchWeeklyTrending();
    renderMovies(data.results);
  } catch (err) {
    noResults.textContent = 'Failed to load movies.';
    noResults.style.display = 'block';
  }
}

async function performSearch(query, year = '') {
  try {
    const data = await searchMovies(query, year);
    renderMovies(data.results);
  } catch (err) {
    noResults.textContent = 'Search failed.';
    noResults.style.display = 'block';
  }
}

export async function initCatalog() {
  form = document.getElementById('search-form');
  movieList = document.getElementById('movie-list');
  noResults = document.getElementById('no-results');
  yearSelect = document.getElementById('year-select');
  clearBtn = document.getElementById('clear-search');

  if (!form || !movieList || !noResults || !yearSelect || !clearBtn) {
    console.error('Catalog init error: Missing DOM elements');
    return;
  }

  populateYearSelect();
  await loadTrending();
  enableMoviePopups();

  // Submit (search) action
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const query = form.query.value.trim();
    const year = yearSelect.value;
    currentQuery = query;
    currentYear = year;
    if (query) {
      await performSearch(query, year);
    }
  });

  // Show/hide clear button on input
  form.query.addEventListener('input', () => {
    clearBtn.style.display = form.query.value ? 'block' : 'none';
  });

  // Clear button resets form and loads trending again
  clearBtn.addEventListener('click', () => {
    form.query.value = '';
    yearSelect.value = '';
    clearBtn.style.display = 'none';
    loadTrending();
  });

  // Başlangıçta clear butonunu gizle
  clearBtn.style.display = 'none';
}
