document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('responsiveNav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
});

// document.querySelector('.fa-xmark').addEventListener('click', () => {
  
// })