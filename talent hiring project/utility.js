document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('responsiveNav');

  function navToggleHandler () {
    
    if(!toggle) return;

    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
  navToggleHandler();
});
  
// document.querySelector('.fa-xmark').addEventListener('click', () => {
  
// })