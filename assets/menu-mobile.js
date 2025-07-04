// Prevent double initialization
if (window.menuMobileInitialized) {
  console.log('Menu mobile already initialized');
} else {
  window.menuMobileInitialized = true;

  document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.header-menu__mobile');
    const searchBtn = document.querySelector('.menu-mobile__search-icon');
    const mobileNav = document.querySelector('.menu-mobile__nav');
    const searchBar = document.querySelector('.menu-mobile__search');
    const overlay = document.querySelector('.menu-mobile__overlay');
    const menuItems = document.querySelectorAll('.menu-mobile__item');

    // Toggle mobile menu
    hamburgerBtn?.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Toggle search bar
    // searchBtn?.addEventListener('click', () => {
    //   searchBar.classList.toggle('active');
    //   if (searchBar.classList.contains('active')) {
    //     searchBar.querySelector('input').focus();
    //   }
    // });

    // Close menu when clicking overlay
    overlay?.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Handle submenu toggles
    menuItems.forEach(item => {
      const link = item.querySelector('.menu-mobile__link');
      const submenu = item.querySelector('.menu-mobile__submenu');
      const arrow = item.querySelector('.menu-mobile__arrow');

      if (submenu) {
        link?.addEventListener('click', (e) => {
          e.preventDefault();
          submenu.classList.toggle('active');
          arrow?.classList.toggle('active');
        });
      }
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchBar?.contains(e.target) && !searchBtn?.contains(e.target)) {
        searchBar?.classList.remove('active');
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        mobileNav?.classList.remove('active');
        overlay?.classList.remove('active');
        searchBar?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
} 