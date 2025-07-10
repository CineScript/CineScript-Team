import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import {
  fetchPopularMovies,
  fetchMovieVideos,
  fetchGenres,
} from '../api/tmdbApi';

function openModal(html) {
  document.querySelectorAll('.basicLightbox').forEach(el => el.remove());

  const popupInstance = basicLightbox.create(html);
  popupInstance.show();

  const modalElement = popupInstance.element();
  modalElement.addEventListener(
    'click',
    e => {
      if (e.target === modalElement) {
        popupInstance.close();
      }
    },
    { once: true }
  );
}

export async function showHeroBasedOnAPI() {
  const hero1 = document.getElementById('hero1');
  const hero2 = document.getElementById('hero2');

  try {
    const popularData = await fetchPopularMovies();
    const firstMovie = popularData.results[0];
    const videoData = await fetchMovieVideos(firstMovie.id);

    const hasTrailer = videoData.results.some(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );

    if (hasTrailer && firstMovie.backdrop_path) {
      hero2.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${firstMovie.backdrop_path})`;
      hero2.style.backgroundSize = 'cover';
      hero2.style.backgroundPosition = 'center';
      hero2.style.backgroundRepeat = 'no-repeat';

      hero1.style.display = 'none';
      hero2.style.display = 'block';

      hero2.querySelector('.hero2-title').textContent = firstMovie.title;
      hero2.querySelector('.hero2-description').textContent =
        firstMovie.overview || 'No description available.';

      const rating = firstMovie.vote_average;
      const fullStars = Math.floor(rating / 2);
      const halfStar = rating % 2 >= 1 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;
      const starContainer = hero2.querySelector('.hero2-stars');
      starContainer.innerHTML = '';

      for (let i = 0; i < fullStars; i++) {
        const img = document.createElement('img');
        img.src = '/svg/star.svg';
        img.alt = 'full star';
        img.classList.add('star-icon');
        starContainer.appendChild(img);
      }

      if (halfStar) {
        const img = document.createElement('img');
        img.src = '/svg/star-half.svg';
        img.alt = 'half star';
        img.classList.add('star-icon');
        starContainer.appendChild(img);
      }

      for (let i = 0; i < emptyStars; i++) {
        const img = document.createElement('img');
        img.src = '/svg/star-outline.svg';
        img.alt = 'empty star';
        img.classList.add('star-icon');
        starContainer.appendChild(img);
      }

      // Trailer butonu
      const trailerBtn = document.getElementById('watch-trailer-btn');
      if (trailerBtn) {
        trailerBtn.addEventListener('click', async () => {
          try {
            const video = videoData.results.find(
              video => video.type === 'Trailer' && video.site === 'YouTube'
            );
            if (video) {
              const videoKey = video.key;
              openModal(`
                <div class="popup-video-wrapper">
                  <iframe
                    width="800"
                    height="450"
                    src="https://www.youtube.com/embed/${videoKey}?autoplay=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              `);
            }
          } catch (error) {
            console.error('Video açılırken hata:', error);
          }
        });
      }

      // More Details modalı
      const detailsBtn = hero2.querySelector('#more-details-btn');
      if (detailsBtn) {
        detailsBtn.addEventListener('click', async () => {
          try {
            const genres = await fetchGenres();
            const genreMap = genres.genres.reduce((acc, g) => {
              acc[g.id] = g.name;
              return acc;
            }, {});

            const posterUrl = firstMovie.poster_path
              ? `https://image.tmdb.org/t/p/w500${firstMovie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image';

            const genresText = firstMovie.genre_ids
              .map(id => genreMap[id])
              .join(', ');

            const popup = basicLightbox.create(
              `
              <div class="movie-modal">
                <button class="popup-close-btn" aria-label="Close">
                  <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                    <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </button>

                <img src="${posterUrl}" class="modal-poster" alt="${firstMovie.title}">
                <div class="modal-details">
                  <h2>${firstMovie.title}</h2>
                  <p><strong>Vote / Votes:</strong> ${firstMovie.vote_average} / ${firstMovie.vote_count}</p>
                  <p><strong>Popularity:</strong> ${firstMovie.popularity}</p>
                  <p><strong>Genre:</strong> ${genresText}</p>
                  <h3>ABOUT</h3>
                  <p>${firstMovie.overview}</p>
                  <button class="add-to-library">Add to Library</button>
                </div>
              </div>
              `,
              {
                onShow: instance => {
                  const closeBtn = instance
                    .element()
                    .querySelector('.popup-close-btn');
                  closeBtn.addEventListener('click', () => instance.close());
                },
              }
            );

            popup.show();
          } catch (error) {
            console.error('Detay popup gösterilemedi:', error);
          }
        });
      }
    } else {
      hero1.style.display = 'block';
      hero2.style.display = 'none';
    }
  } catch (err) {
    console.error('Hata oluştu:', err);
    hero1.style.display = 'block';
    hero2.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showHeroBasedOnAPI();

  const getStartedBtn = document.querySelector('#hero1 .hero-button');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const imageSrc =
        theme === 'dark' ? './img/camera-dark.png' : './img/camera-light.png';

      const modalHTML = `
        <div class="popup-wrapper">
          <button class="popup-close-btn" aria-label="Close">
            <svg class="popup-close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2"/>
              <path d="M6 18L18 6" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
          <p class="popup-text">
            OOPS...<br>
            We are very sorry!<br>
            But we couldn’t find the trailer.
          </p>
          <img src="${imageSrc}" alt="Camera icon" class="popup-img" />
        </div>
      `;

      const popupInstance = basicLightbox.create(modalHTML, {
        onShow: instance => {
          const closeBtn = instance.element().querySelector('.popup-close-btn');
          closeBtn.addEventListener('click', () => instance.close());
        },
      });

      popupInstance.show();
    });
  }
});
