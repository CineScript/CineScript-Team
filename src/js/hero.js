import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import axios from 'axios';
import { fetchPopularMovies, fetchMovieVideos } from '../api/tmdbApi';

// Modalı güvenli şekilde oluşturur, önceki varsa kapatır
function openModal(html) {
  // Önceki modali kaldır
  document.querySelectorAll('.basicLightbox').forEach(el => el.remove());

  // Yeni modalı oluştur
  const popupInstance = basicLightbox.create(html);
  popupInstance.show();

  // Sadece dış tıklamada kapanacak şekilde
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

// API'den gelen veriye göre hero'ları göster
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
      // Arka plan ayarla
      hero2.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${firstMovie.backdrop_path})`;
      hero2.style.backgroundSize = 'cover';
      hero2.style.backgroundPosition = 'center';
      hero2.style.backgroundRepeat = 'no-repeat';

      hero1.style.display = 'none';
      hero2.style.display = 'block';

      hero2.querySelector('.hero2-title').textContent = firstMovie.title;
      hero2.querySelector('.hero2-description').textContent =
        firstMovie.overview || 'No description available.';

      // Yıldızları ekle
      const rating = firstMovie.vote_average;
      const fullStars = Math.floor(rating / 2);
      const halfStar = rating % 2 >= 1 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;
      const starContainer = hero2.querySelector('.hero2-stars');
      starContainer.innerHTML = '';

      for (let i = 0; i < fullStars; i++) {
        const img = document.createElement('img');
        img.src = './img/svg/star.svg';
        img.alt = 'full star';
        img.classList.add('star-icon');
        starContainer.appendChild(img);
      }

      if (halfStar) {
        const img = document.createElement('img');
        img.src = './img/svg/star-half.svg';
        img.alt = 'half star';
        img.classList.add('star-icon');
        starContainer.appendChild(img);
      }

      for (let i = 0; i < emptyStars; i++) {
        const img = document.createElement('img');
        img.src = './img/svg/star-outline.svg';
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
            } else {
              showErrorPopup();
            }
          } catch (error) {
            console.error('Video açılırken hata:', error);
            showErrorPopup();
          }
        });
      }

      // More Details butonu
      const detailsBtn = document.getElementById('more-details-btn');
      if (detailsBtn) {
        detailsBtn.addEventListener('click', () => {
          openModal(`
            <div class="popup-details-wrapper">
              <div class="popup-details-content">
                <img class="popup-poster" src="https://image.tmdb.org/t/p/w500${
                  firstMovie.poster_path
                }" alt="${firstMovie.title}" />
                <div class="popup-info">
                  <h2>${firstMovie.title}</h2>
                  <ul class="popup-info-list">
                    <li><strong>Vote / Votes</strong> <span>${firstMovie.vote_average.toFixed(
                      2
                    )} / ${firstMovie.vote_count}</span></li>
                    <li><strong>Popularity</strong> <span>${firstMovie.popularity.toFixed(
                      1
                    )}</span></li>
                    <li><strong>Genre</strong> <span>Genre ID: ${firstMovie.genre_ids.join(
                      ', '
                    )}</span></li>
                  </ul>
                  <h3>ABOUT</h3>
                  <p>${firstMovie.overview || 'No description available.'}</p>
                  <button class="popup-library-btn">Add to Library</button>
                </div>
              </div>
            </div>
          `);
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

// Genel hata popup'ı
function showErrorPopup() {
  openModal(`
    <div class="popup-wrapper">
      <p class="popup-text">
        <strong>OOPS...</strong><br />
        We are very sorry!<br />
        But we couldn’t find the trailer.
      </p>
    </div>
  `);
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
  showHeroBasedOnAPI();

  const getStartedBtn = document.querySelector('#hero1 .hero-button');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      showErrorPopup();
    });
  }
});
