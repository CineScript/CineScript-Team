<<<<<<< HEAD
const scrollUpBtn = document.querySelector('#scrollUpBtn');

const scrollThreshold = 300;

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > scrollThreshold ||
    document.documentElement.scrollTop > scrollThreshold
  ) {
    scrollUpBtn.style.display = 'block';
  } else {
    scrollUpBtn.style.display = 'none';
  }
}
scrollUpBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
=======
>>>>>>> parent of d3c76ef (feat: scroll up özelliği eklendi; library hero için JS import yolu düzeltildi)
