import { fetchDailyTrending, fetchMovieVideos } from '../api/tmdbApi.js';

const titleEl = document.querySelector('.catalog-hero-title');
const overviewEl = document.querySelector('.catalog-hero-overview');
const imageEl = document.querySelector('.catalog-hero-img');
const trailerBtn = document.querySelector('.catalog-hero-trailer-btn');

let currentMovieId = null;

async function renderRandomHeroMovie() {
  try {
    const data = await fetchDailyTrending();
    const movies = data.results;

    if (!movies || movies.length === 0) return;

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    currentMovieId = randomMovie.id;
    const title = randomMovie.title || randomMovie.name || 'Untitled';
    const overview = randomMovie.overview || 'No description available';
    const posterPath = randomMovie.poster_path
      ? `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
      : 'img/placeholder.jpg';

    titleEl.textContent = title;
    overviewEl.textContent = overview;
    imageEl.src = posterPath;
    imageEl.alt = title;
  } catch (error) {
    console.error('Error loading hero movie:', error);
  }
}

async function handleTrailerClick() {
  if (!currentMovieId) return;

  try {
    const data = await fetchMovieVideos(currentMovieId);
    const videos = data.results;
    const trailer = videos.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );

    if (trailer) {
      const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      window.open(trailerUrl, '_blank');
    } else {
      alert('No trailer available for this movie.');
    }
  } catch (error) {
    console.error('Error fetching trailer:', error);
  }
}

trailerBtn.addEventListener('click', handleTrailerClick);
renderRandomHeroMovie();
