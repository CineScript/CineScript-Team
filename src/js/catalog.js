import {
  fetchPopularMovies,
  fetchDailyTrending,
  fetchWeeklyTrending,
  fetchUpcomingMovies,
  searchMovies
} from '../api/tmdbApi.js';
import { createMoviePopup } from './popup.js';

console.log('catalog.js yüklendi!');

const form = document.getElementById('search-form');
const movieList = document.getElementById('movie-list');
const noResults = document.getElementById('no-results');
const yearSelect = document.getElementById('year-select');

function enableMoviePopups() {
  movieList.addEventListener('click', e => {
    const li = e.target.closest('li.movie-item');
    if (!li) return;
    const idx = Array.from(movieList.children).indexOf(li);
    const movies = Array.from(movieList.children).map(li => li._movieData).filter(Boolean);
    const movie = movies[idx];
    if (movie) createMoviePopup(movie);
  });
}

// renderMovies fonksiyonunu güncelleyip movie objesini li'ye atama
function renderMovies(movies) {
  movieList.innerHTML = '';
  if (!movies || movies.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';
  const moviesToShow = movies.slice(0, 21);
  moviesToShow.forEach(movie => {
    const li = document.createElement('li');
    li.classList.add('movie-item');
    li.innerHTML = `
      <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Yayın Tarihi: ${movie.release_date || 'Bilinmiyor'}</p>
    `;
    li._movieData = movie; 
    movieList.appendChild(li);
  });
}

function populateYearSelect() {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1900; y--) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
}

export async function initCatalog() {
  console.log('initCatalog fonksiyonu çağrıldı!');
  if (!form || !movieList || !noResults || !yearSelect) {
    console.error('Catalog için gerekli DOM elemanları bulunamadı!');
    return;
  }

  populateYearSelect();

  try {
    // Tüm kategorilerden filmleri çekme
    const [popularData, dailyData, weeklyData, upcomingData] = await Promise.all([
      fetchPopularMovies(),
      fetchDailyTrending(),
      fetchWeeklyTrending(),
      fetchUpcomingMovies()
    ]);
    console.log('API verileri geldi:', { popularData, dailyData, weeklyData, upcomingData });

    // Tek bir listeye birleştirme
    const allMovies = [
      ...popularData.results,
      ...dailyData.results,
      ...weeklyData.results,
      ...upcomingData.results
    ];
    console.log('Birleştirilmiş film listesi:', allMovies);

    // ID bazlı benzersizleştirme
    const uniqueMovies = new Map();
    allMovies.forEach(m => {
      if (!uniqueMovies.has(m.id)) uniqueMovies.set(m.id, m);
    });
    console.log('Benzersiz filmler:', Array.from(uniqueMovies.values()));

    renderMovies(Array.from(uniqueMovies.values()));

    // Arama formu submit
    form.addEventListener('submit', async e => {
      e.preventDefault();

      let query = document.getElementById('search-input').value.trim();
      let year = yearSelect.value;

      if (!query) return;

      // API'ye arama sorgusu gönderme
      try {
        const data = await searchMovies(query);
        console.log('Arama sonuçları:', data);

        // Eğer yıl seçilmişse, filtreleme yapma
        let filteredResults = data.results;
        if (year) {
          filteredResults = filteredResults.filter(m => m.release_date && m.release_date.startsWith(year));
        }

        renderMovies(filteredResults);

        if (filteredResults.length === 0) {
          noResults.style.display = 'block';
          noResults.textContent = 'Aradığınız kriterlere uygun film bulunamadı.';
        }
      } catch (error) {
        console.error('Film arama hatası:', error);
        noResults.style.display = 'block';
        noResults.textContent = 'Film bulunamadı veya bir hata oluştu.';
      }
    });

  } catch (error) {
    console.error('Filmler yüklenirken hata:', error);
    noResults.style.display = 'block';
    noResults.textContent = 'Filmler yüklenirken hata oluştu.';
  }
}

// Eğer script doğrudan çağrılıyorsa otomatik başlat
initCatalog();
enableMoviePopups();
