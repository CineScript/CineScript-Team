import axios from 'axios';
import iziToast from 'izitoast';
import { API_KEY, BASE_URL } from '../api/tmdbApi';

const LANGUAGE = 'en-US'; // Artık burada

let currentPage = 1;
let cachedUpcoming = [];

function round(value) {
  return Math.round(value * 10) / 10;
}

function isInLibrary(id) {
  const lib = JSON.parse(localStorage.getItem('myLibrary')) || [];
  return lib.some(movie => movie.id === id);
}

function toggleLibrary(movie, btn) {
  let lib = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const exists = lib.find(m => m.id === movie.id);

  if (exists) {
    lib = lib.filter(m => m.id !== movie.id);
    btn.textContent = 'Add to my library';
    iziToast.info({ message: 'Removed from My Library', position: 'topRight' });
  } else {
    lib.push(movie);
    btn.textContent = 'Remove from my library';
    iziToast.success({ message: 'Added to My Library', position: 'topRight' });
  }

  localStorage.setItem('myLibrary', JSON.stringify(lib));
}

async function fetchUpcomingMovies(page = 1) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
  const start = `${year}-${month}-01`;
  const end = `${year}-${month}-${lastDay}`;

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

async function fetchGenres() {
  const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });
  return res.data;
}

function buildHTML(movie, genreNames) {
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-GB');

  return `
    <div class="container">
      <h3 class="upcoming-header">Upcoming this month</h3>
      <div class="upcoming-body">
        <img
          class="upcoming-img"
          src="https://image.tmdb.org/t/p/original${movie.backdrop_path}"
          alt="${movie.title}"
        />
        <div class="upcoming-content">
          <h2 class="upcoming-content-header">${movie.title}</h2>
          <div class="result">
            <div class="result-left">
              <div>
                <span>Release date</span>
                <span class="date">${releaseDate}</span>
              </div>
              <div>
                <span>Vote / Votes</span>
                <span class="vote">
                  <span class="vote-average">${round(
                    movie.vote_average
                  )}</span> /
                  <span class="vote-count">${movie.vote_count}</span>
                </span>
              </div>
            </div>
            <div class="result-right">
              <div>
                <span>Popularity</span>
                <span class="popularity">${round(movie.popularity)}</span>
              </div>
              <div>
                <span>Genre</span>
                <span class="genre">${genreNames}</span>
              </div>
            </div>
          </div>
          <h3 class="upcoming-about-header">About</h3>
          <p class="upcoming-about">${movie.overview}</p>
          <button class="btn-primary" id="library-btn">Add to my library</button>
        </div>
      </div>
    </div>
  `;
}

export async function renderUpcoming() {
  console.log('🚀 renderUpcoming çağrıldı');
  const section = document.getElementById('upcoming');

  try {
    if (cachedUpcoming.length === 0) {
      const data = await fetchUpcomingMovies(currentPage++);
      cachedUpcoming = data.results.filter(m => m.backdrop_path && m.overview);
    }

    const genresData = await fetchGenres();
    const genresMap = {};
    genresData.genres.forEach(g => (genresMap[g.id] = g.name));

    const library = JSON.parse(localStorage.getItem('myLibrary')) || [];

    let movie;
    while (cachedUpcoming.length > 0) {
      const index = Math.floor(Math.random() * cachedUpcoming.length);
      const candidate = cachedUpcoming.splice(index, 1)[0];

      if (!library.some(f => f.id === candidate.id)) {
        movie = candidate;
        break;
      }
    }

    if (!movie) {
      section.innerHTML = `<p style="text-align:center">No more upcoming movies available.</p>`;
      iziToast.warning({
        message: 'No more unique movies to show.',
        position: 'topRight',
      });
      return;
    }

    const genreNames = movie.genre_ids
      .map(id => genresMap[id])
      .filter(Boolean)
      .join(', ');

    section.innerHTML = buildHTML(movie, genreNames);

    const btn = section.querySelector('#library-btn');
    if (isInLibrary(movie.id)) btn.textContent = 'Remove from my library';

    btn.addEventListener('click', () => toggleLibrary(movie, btn));
  } catch (error) {
    console.error('Error loading upcoming movie:', error);
    iziToast.error({
      message: 'Failed to load upcoming movie',
      position: 'topRight',
    });
  }
}
