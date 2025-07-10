import { fetchDailyTrending, fetchMovieVideos } from '../api/tmdbApi.js';
import { openTrailerModal } from './modal-trailer.js';
import { createMoviePopup } from './popup.js';

const heroSection = document.querySelector('.catalog-hero');
const titleEl = document.querySelector('.catalog-hero-title');
const overviewEl = document.querySelector('.catalog-hero-overview');
const ratingEl = document.querySelector('.catalog-hero-rating');
const trailerBtn = document.querySelector('.catalog-hero-btn.trailer');
const detailsBtn = document.querySelector('.catalog-hero-btn.details');

let currentMovieId = null;
let currentMovieData = null;

async function renderRandomHeroMovie() {
  try {
    const data = await fetchDailyTrending();
    const movies = data.results;

    if (!movies || movies.length === 0) return;

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    currentMovieId = randomMovie.id;
    currentMovieData = randomMovie;

    const backdrop = randomMovie.backdrop_path || randomMovie.poster_path;
    const bgUrl = backdrop
      ? `https://image.tmdb.org/t/p/original${backdrop}`
      : '';

    if (bgUrl) {
      heroSection.style.setProperty('--hero-bg', `url(${bgUrl})`);
    }

    titleEl.textContent = randomMovie.title || randomMovie.name || 'No title';
    overviewEl.textContent = randomMovie.overview || 'No description available';
    ratingEl.innerHTML = generateStars(randomMovie.vote_average);
  } catch (err) {
    console.error('Hero verisi alınamadı:', err);
  }
}

function generateStars(voteAverage) {
  const fullStars = Math.floor(voteAverage / 2);
  const halfStar = voteAverage % 2 >= 1 ? '½' : '';
  return (
    '★'.repeat(fullStars) +
    (halfStar ? '★' : '') +
    '☆'.repeat(5 - fullStars - (halfStar ? 1 : 0))
  );
}

async function handleTrailerClick() {
  if (!currentMovieId) return;

  try {
    const data = await fetchMovieVideos(currentMovieId);
    const trailer = data.results.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );

    if (trailer) {
      openTrailerModal(trailer.key);
    } else {
      alert('Trailer not found.');
    }
  } catch (err) {
    console.error('Trailer yüklenemedi:', err);
  }
}

trailerBtn.addEventListener('click', handleTrailerClick);

detailsBtn.addEventListener('click', () => {
  if (currentMovieData) {
    createMoviePopup(currentMovieData);
  }
});

renderRandomHeroMovie();
