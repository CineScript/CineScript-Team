import { fetchUpcomingMovies, fetchGenres } from '../api/tmdbApi.js';

const upcomingContainer = document.querySelector('.upcoming-container');

// Yaklaşan Filmleri Çekme Fonksiyonu
document.addEventListener('DOMContentLoaded', async () => {
  let genresMap = new Map();

  async function loadGenres() {
    try {
      const genresData = await fetchGenres();
      if (genresData && genresData.genres) {
        genresData.genres.forEach(genre => {
          genresMap.set(genre.id, genre.name);
        });
      }
    } catch (error) {
      console.error('Türler çekilirken bir hata oluştu:', error);
    }
  }

  function getGenreNames(genreIds) {
    if (!genreIds || genreIds.length === 0) {
      return 'Unknown';
    }
    return genreIds.map(id => genresMap.get(id) || 'Unknown').join(', ');
  }

  //Kütüphane Yönetim Fonksiyonları Başlangıcı
  function getLibrary() {
    const data = localStorage.getItem('library');
    return data ? JSON.parse(data) : [];
  }

  function saveLibrary(library) {
    localStorage.setItem('library', JSON.stringify(library));
  }

  // Kütüphaneye film ekleme/çıkarma fonksiyonu
  function toggleLibrary(movie, button) {
    let library = getLibrary();
    const movieId = movie.id;

    if (library.includes(movieId)) {
      library = library.filter(id => id !== movieId);
      button.textContent = 'Add to my library';
      button.classList.remove('removed');
    } else {
      library.push(movieId);
      button.textContent = 'Remove from my library';
      button.classList.add('removed');
    }
    saveLibrary(library);
  }

  // Buton durumunu güncelleme fonksiyonu
  function updateButtonState(movie, button) {
    const library = getLibrary();
    if (library.includes(movie.id)) {
      button.textContent = 'Remove from my library';
      button.classList.add('removed');
    } else {
      button.textContent = 'Add to my library';
      button.classList.remove('removed');
    }
  }
  //Kütüphane Yönetim Fonksiyonları Sonu

  //Yaklaşan Filmleri Çekme ve Görüntüleme Fonksiyonları Başlangıcı
  async function fetchAndDisplayUpcomingMovies() {
    await loadGenres();

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startDate = firstDayOfMonth.toISOString().split('T')[0];

    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const endDate = lastDayOfMonth.toISOString().split('T')[0];

    try {
      const data = await fetchUpcomingMovies(startDate, endDate);

      if (data && data.results && data.results.length > 0) {
        const filteredMovies = data.results.filter(movie => {
          const releaseDate = new Date(movie.release_date);
          return (
            releaseDate.getFullYear() === currentYear &&
            releaseDate.getMonth() === currentMonth
          );
        });

        if (filteredMovies.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredMovies.length);
          const randomMovie = filteredMovies[randomIndex];
          displayUpcomingItem(randomMovie);
        } else {
          upcomingContainer.innerHTML = '<p>No movie released this month.</p>';
        }
      } else {
        upcomingContainer.innerHTML = '<p>No upcoming movies found.</p>';
      }
    } catch (error) {
      console.error('Yaklaşan filmler çekilirken bir hata oluştu:', error);
      upcomingContainer.innerHTML =
        '<p>There was an error loading movies. Please try again later.</p>';
    }
  }

  function displayUpcomingItem(movie) {
    upcomingContainer.innerHTML = '';

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('upcoming-item');

    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
      : 'https://via.placeholder.com/150x225?text=Poster+Yok';

    const apiReleaseDate = movie.release_date;
    let formattedDisplayDate = 'Unknown';

    if (apiReleaseDate) {
      const dateObj = new Date(apiReleaseDate);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      formattedDisplayDate = `${day}.${month}.${year}`;
    }

    const voteAverage = movie.vote_average
      ? movie.vote_average.toFixed(2)
      : 'Unknown';
    const popularity = movie.popularity
      ? movie.popularity.toFixed(2)
      : 'Unknown';

    const overview =
      movie.overview || 'There is no information about this movie.';
    const genreNames = getGenreNames(movie.genre_ids);

    movieDiv.innerHTML = `
      <div class="poster-container">
        <img src="${imageUrl}" alt="${
      movie.title || movie.original_title || 'Movie Poster'
    }">
      </div>
      <div class="movie-details">
        <h3 class="movie-title">${movie.title || movie.original_title}</h3>
        <div class="movie-details-info">
         <p class="details-text">Release date: <span class="release-date-text">${formattedDisplayDate}</span></p>

         <p class="details-text">Vote / Votes: <span class ="vote-text vote-text-container">${voteAverage}</span> / <span class="vote-text">10</span></p>
         <p class="details-text">Popularity: <span class="details-text-info popularity-text">${popularity}</span></p>
         <p class="details-text">Genre: <span class="details-text-info genre-text">${genreNames}</span></p>
        </div>
        <div class="about-section"> <p class="about-label">ABOUT:</p> <p class="overview-text">${overview}</p> </div>
        <button class="add-to-library-btn" data-movie-id="${
          movie.id
        }">Add to my library</button>
      </div>
    `;
    // Yaklaşan Filmleri Çekme ve Görüntüleme Fonksiyonları Sonu

    // Buton durumunu güncelleme ve event ekleme

    const addButton = movieDiv.querySelector('.add-to-library-btn');

    updateButtonState(movie, addButton);

    addButton.addEventListener('click', event => {
      toggleLibrary(movie, addButton);
    });

    upcomingContainer.appendChild(movieDiv);
  }

  fetchAndDisplayUpcomingMovies();
});
