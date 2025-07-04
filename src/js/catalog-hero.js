import { fetchDailyTrending, fetchMovieVideos } from '../api/tmdbApi.js';

const heroTitle = document.querySelector('.catalog-hero-title');
const heroOverview = document.querySelector('.catalog-hero-overview');
const heroImg = document.querySelector('.catalog-hero-img');
const trailerBtn = document.querySelector('.catalog-hero-trailer-btn');

let currentMovieId = null;

async function renderRandomHeroMovie() {
  try {
    const movies = await fetchDailyTrending(); // veya fetchWeeklyTrending()
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    currentMovieId = randomMovie.id;

    heroTitle.textContent = randomMovie.title || randomMovie.name;
    heroOverview.textContent = randomMovie.overview;
    heroImg.src = `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`;
    heroImg.alt = randomMovie.title || randomMovie.name;

    // İsteğe bağlı: yıldız puanı ekle (sonra detaylandırabiliriz)
    // renderRating(randomMovie.vote_average);
  } catch (error) {
    console.error('Hero movie fetch error:', error);
  }
}

async function openTrailerModal() {
  if (!currentMovieId) return;

  try {
    const videos = await fetchMovieVideos(currentMovieId);
    const trailer = videos.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    if (trailer) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      window.open(youtubeUrl, '_blank');
    } else {
      alert('Trailer not available');
    }
  } catch (error) {
    console.error('Error loading trailer:', error);
  }
}

trailerBtn.addEventListener('click', openTrailerModal);
renderRandomHeroMovie();
