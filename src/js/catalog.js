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

// Pagination container
let paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination-container';

