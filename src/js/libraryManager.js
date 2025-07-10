export function toggleLibraryButton(movie, button) {
  let library = JSON.parse(localStorage.getItem('library')) || [];

  const isInLibrary = library.includes(movie.id);

  if (isInLibrary) {
    // Film zaten kütüphanedeyse kaldır
    library = library.filter(id => id !== movie.id);
    button.textContent = 'Add to Library';
    button.classList.remove('remove-from-library');
    button.classList.add('add-to-library');
  } else {
    // Yeni film ekle
    library.push(movie.id);
    button.textContent = 'Remove from my library';
    button.classList.remove('add-to-library');
    button.classList.add('remove-from-library');
  }

  localStorage.setItem('library', JSON.stringify(library));
}

export function initializeLibraryButton(movie, button) {
  const library = JSON.parse(localStorage.getItem('library')) || [];
  const isInLibrary = library.includes(movie.id);

  if (isInLibrary) {
    button.textContent = 'Remove from my library';
    button.classList.add('remove-from-library');
  } else {
    button.textContent = 'Add to Library';
    button.classList.add('add-to-library');
  }
}
