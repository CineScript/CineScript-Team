import { fetchDailyTrending, fetchMovieVideos } from '../api/tmdbApi.js';

const titleEl = document.querySelector('.catalog-hero-title');
const overviewEl = document.querySelector('.catalog-hero-overview');
const trailerBtn = document.querySelector('.catalog-hero-btn.trailer');
const detailsBtn = document.querySelector('.catalog-hero-btn.details');
const heroSection = document.querySelector('.catalog-hero');
let currentMovieId = null;

async function renderRandomHeroMovie() {
  try {
    const data = await fetchDailyTrending();
    const movies = data.results;

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    currentMovieId = randomMovie.id;

    const posterPath = randomMovie.backdrop_path || randomMovie.poster_path;
    const bgUrl = `https://image.tmdb.org/t/p/original${posterPath}`;

    heroSection.style.backgroundImage = `url(${bgUrl})`;

    titleEl.textContent = randomMovie.title || randomMovie.name || 'Untitled';
    overviewEl.textContent = randomMovie.overview || 'No description available';
  } catch (error) {
    console.error('Error loading hero section:', error);
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
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
    } else {
      alert('No trailer available.');
    }
  } catch (error) {
    console.error('Trailer error:', error);
  }
}

trailerBtn.addEventListener('click', handleTrailerClick);
detailsBtn.addEventListener('click', () => {
  alert('More details tıklanıldı!'); // Buraya modal ya da detay sayfası ekleyebilirsin
});

renderRandomHeroMovie();
