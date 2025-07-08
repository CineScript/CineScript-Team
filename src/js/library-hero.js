import { fetchDailyTrending } from '../api/tmdbApi.js';

async function setHeroBackground() {
  const heroElement = document.querySelector('.library-hero-bg');
  if (!heroElement) return;

  try {
    const data = await fetchDailyTrending();
    const results = data?.results;

    if (!results || results.length === 0) return;

    // Rastgele bir film seç
    const randomMovie = results[Math.floor(Math.random() * results.length)];
    const backdropPath = randomMovie?.backdrop_path;

    if (backdropPath) {
      const imageUrl = `https://image.tmdb.org/t/p/w1920${backdropPath}`;
      heroElement.style.backgroundImage = `url('${imageUrl}')`;
      heroElement.style.backgroundSize = 'cover';
      heroElement.style.backgroundPosition = 'center';
    }
  } catch (error) {
    console.error('Hero görseli yüklenemedi:', error);
    // CSS fallback devrede kalır
  }
}

setHeroBackground();

