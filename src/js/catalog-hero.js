import { fetchDailyTrending, fetchMovieVideos } from '../api/tmdbApi.js';
import { openTrailerModal } from './modal-trailer.js';

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

    if (!movies || movies.length === 0) {
      console.error('Trend filmler bulunamadı.');
      return;
    }

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    currentMovieId = randomMovie.id;

    const posterPath = randomMovie.backdrop_path || randomMovie.poster_path;

    if (posterPath) {
      const bgUrl = `https://image.tmdb.org/t/p/original${posterPath}`;
      heroSection.style.backgroundImage = `url(${bgUrl})`;
    } else {
      heroSection.style.backgroundColor = '#000';
    }

    titleEl.textContent =
      randomMovie.title || randomMovie.name || 'Film adı yok';
    overviewEl.textContent = randomMovie.overview || 'Açıklama bulunamadı.';
  } catch (error) {
    console.error('Hero bölümü yüklenirken hata:', error);
  }
}

async function handleTrailerClick() {
  if (!currentMovieId) return;

  try {
    const data = await fetchMovieVideos(currentMovieId);
    const videos = data.results;

    if (!videos || videos.length === 0) {
      alert('Bu film için video bulunamadı.');
      return;
    }

    const trailer = videos.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    );

    if (trailer) {
      openTrailerModal(trailer.key);
    } else {
      alert('Fragman bulunamadı.');
    }
  } catch (error) {
    console.error('Fragman yüklenirken hata:', error);
  }
}

trailerBtn.addEventListener('click', handleTrailerClick);
detailsBtn.addEventListener('click', () => {
  alert('More details tıklandı!');
});

renderRandomHeroMovie();
