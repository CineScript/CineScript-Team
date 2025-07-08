import { fetchUpcomingMovies, fetchGenres } from '../api/tmdbApi.js';

let currentPage = 1;
let cachedUpcoming = [];

function round(value) {
  return Math.round(value * 10) / 10;
}

function getLibrary() {
  return JSON.parse(localStorage.getItem('library')) || [];
}

function isInLibrary(id) {
  const lib = getLibrary();
  return lib.some(movie => movie.id === id);
}

function toggleLibrary(movie, btn) {
  let lib = getLibrary();
  const exists = lib.find(m => m.id === movie.id);

  if (exists) {
    lib = lib.filter(m => m.id !== movie.id);
    btn.textContent = 'Add to my library';
    alert(`"${movie.title}" kütüphaneden çıkarıldı.`);
  } else {
    lib.push(movie); // ✅ tüm nesneyi ekliyoruz
    btn.textContent = 'Remove from my library';
    alert(`"${movie.title}" kütüphaneye eklendi.`);
  }

  localStorage.setItem('library', JSON.stringify(lib));
}

function buildHTML(movie, genreNames) {
  const releaseDate = new Date(movie.release_date).toLocaleDateString('en-GB');

  return `
    <div class="container">
      <h3 class="upcoming-header">Upcoming this month</h3>
      <div class="upcoming-body">
        <img
          class="upcoming-img"
          src="https://image.tmdb.org/t/p/original${movie.backdrop_path}"
          alt="${movie.title}"
        />
        <div class="upcoming-content">
          <h2 class="upcoming-content-header">${movie.title}</h2>
          <div class="result">
            <div class="result-left">
              <div>
                <span>Release date</span>
                <span class="date">${releaseDate}</span>
              </div>
              <div>
                <span>Vote / Votes</span>
                <span class="vote">
                  <span class="vote-average">${round(
                    movie.vote_average
                  )}</span> /
                  <span class="vote-count">${movie.vote_count}</span>
                </span>
              </div>
            </div>
            <div class="result-right">
              <div>
                <span>Popularity</span>
                <span class="popularity">${round(movie.popularity)}</span>
              </div>
              <div>
                <span>Genre</span>
                <span class="genre">${genreNames}</span>
              </div>
            </div>
          </div>
          <h3 class="upcoming-about-header">About</h3>
          <p class="upcoming-about">${movie.overview}</p>
          <button class="btn-primary" id="library-btn">Add to my library</button>
        </div>
      </div>
    </div>
  `;
}

export async function renderUpcoming() {
  const section = document.getElementById('upcoming');
  if (!section) {
    alert('⚠️ upcoming bölümü bulunamadı.');
    return;
  }

  try {
    if (cachedUpcoming.length === 0) {
      const data = await fetchUpcomingMovies(currentPage++);
      cachedUpcoming = data.results.filter(m => m.backdrop_path && m.overview);
    }

    const genresData = await fetchGenres();
    const genresMap = {};
    genresData.genres.forEach(g => (genresMap[g.id] = g.name));

    const library = getLibrary();

    let movie;
    while (cachedUpcoming.length > 0) {
      const index = Math.floor(Math.random() * cachedUpcoming.length);
      const candidate = cachedUpcoming.splice(index, 1)[0];

      if (!library.some(f => f.id === candidate.id)) {
        movie = candidate;
        break;
      }
    }

    if (!movie) {
      section.innerHTML = `<p style="text-align:center">No more upcoming movies available.</p>`;
      alert('⚠️ Gösterilecek benzersiz bir film kalmadı.');
      return;
    }

    const genreNames = movie.genre_ids
      .map(id => genresMap[id])
      .filter(Boolean)
      .join(', ');

    section.innerHTML = buildHTML(movie, genreNames);

    const btn = section.querySelector('#library-btn');
    if (isInLibrary(movie.id)) {
      btn.textContent = 'Remove from my library';
    }

    btn.addEventListener('click', () => toggleLibrary(movie, btn));
  } catch (error) {
    console.error('❌ Yaklaşan film yüklenemedi:', error);
    alert('Bir hata oluştu. Film yüklenemedi.');
  }
}
