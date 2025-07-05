import axios from 'axios';

const API_KEY = '2609725f661288e9b08bc0d62455b671';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'en-US';

// Günlük trend filmler
export async function fetchDailyTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return await res.json();
}

// Aylık trend filmler
export async function fetchUpcomingMovies(page = 1) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const start = `${year}-${month}-01`;
  const end = `${year}-${month}-31`;

  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
      sort_by: 'popularity.desc',
      primary_release_date_gte: start,
      primary_release_date_lte: end,
      page,
    },
  });

  return res.data;
}

// Filmin videoları (fragman dahil)
export async function fetchMovieVideos(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  return await res.json();
}

// Anahtar kelime + yıla göre arama
export async function searchMovies(query, year = '') {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&year=${year}`
  );
  return await res.json();
}

// Tür listesini getirme
export async function fetchGenres() {
  const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });
  return res.data;
}
