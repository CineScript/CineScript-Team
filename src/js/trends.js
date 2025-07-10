import {
  fetchPopularMovies,
  fetchDailyTrending,
  fetchWeeklyTrending,
  fetchUpcomingMovies,
  searchMovies,
  fetchGenres,
  fetchMovieDetails,
  fetchMovieVideos,
} from '../api/tmdbApi.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const gallery = document.querySelector('.weekly-gallery');
const seeAllBtn = document.querySelector('.weekly-see-all');

let allMovies = [];
let isExpanded = false;

function getVisibleCardCount() {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1280) return 3;
  return 3;
}

function createRatingStars(vote) {
  const fullStars = Math.floor(vote / 2);
  const hasHalfStar = vote % 2 >= 1;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push('<img src="./svg/star.svg" alt="star" />');
  }
  if (hasHalfStar) {
    stars.push('<img src="./svg/star-half.svg" alt="half star" />');
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push('<img src="./svg/star-outline.svg" alt="empty star" />');
  }

  return stars.join('');
}

export async function renderWeeklyTrends(limit = getVisibleCardCount()) {
  try {
    const [trendData, genreData] = await Promise.all([
      fetchWeeklyTrending(),
      fetchGenres(),
    ]);

    allMovies = trendData.results;

    const genreMap = genreData.genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});

    const moviesToShow = allMovies.slice(0, limit);

    const markup = moviesToShow
      .map(movie => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Image';

        const genreName = movie.genre_ids
          .map(id => genreMap[id])
          .slice(0, 1)
          .join(', ');
        const year = movie.release_date
          ? movie.release_date.slice(0, 4)
          : 'N/A';
        const ratingStars = createRatingStars(movie.vote_average);

        return `
        <li class="weekly-card" data-id="${movie.id}">
          <div class="poster-wrapper">
            <img class="card-img" src="${posterUrl}" alt="${movie.title}" />
            <div class="card-overlay">
              <h3 class="card-title">${movie.title.toUpperCase()}</h3>
              <p class="card-info">${genreName} | ${year}</p>
              <div class="card-rating">${ratingStars}</div>
            </div>
          </div>
        </li>
        `;
      })
      .join('');

    gallery.innerHTML = markup;
  } catch (err) {
    console.error('Weekly trends fetch error:', err);
    gallery.innerHTML = '<p>Veriler alınamadı.</p>';
  }
}

seeAllBtn.addEventListener('click', () => {
  isExpanded = !isExpanded;
  const count = isExpanded ? allMovies.length : getVisibleCardCount();
  renderWeeklyTrends(count);
});

gallery.addEventListener('click', async e => {
  const card = e.target.closest('.weekly-card');
  if (!card) return;

  const movieId = card.dataset.id;

  try {
    const movie = await fetchMovieDetails(movieId);
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image';

    const genres = movie.genres.map(g => g.name).join(', ');

    const popup = basicLightbox.create(
      `
        <div class="movie-modal">
    <button class="popup-close-btn" aria-label="Close">
      <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
        <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>

    <img src="${posterUrl}" class="modal-poster" alt="${movie.title}">
    <div class="modal-details">
      <h2>${movie.title}</h2>
      <p><strong>Vote / Votes:</strong> ${movie.vote_average} / ${movie.vote_count}</p>
      <p><strong>Popularity:</strong> ${movie.popularity}</p>
      <p><strong>Genre:</strong> ${genres}</p>
      <h3>ABOUT</h3>
      <p>${movie.overview}</p>
      <button class="add-to-library">Add to Library</button>
    </div>
  </div>
    `,
      {
        onShow: instance => {
          const closeBtn = instance.element().querySelector('.popup-close-btn');
          closeBtn.addEventListener('click', () => instance.close());
        },
      }
    );
    popup.show();
  } catch (err) {
    console.error('Popup açılırken hata:', err);
  }
});

renderWeeklyTrends();
