document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('HeroCarousel');
  if (!carousel) return;
  const track = carousel.querySelector('.hero-carousel__track');
  const images = track.querySelectorAll('.hero-carousel__image');
  const total = images.length;
  let current = 0;

  const prevBtn = document.getElementById('HeroCarouselPrev');
  const nextBtn = document.getElementById('HeroCarouselNext');
  let intervalId;

  const progressContainer = document.getElementById('HeroCarouselProgress');
  const progressBars = progressContainer ? progressContainer.querySelectorAll('.hero-carousel__progress-bar') : [];
  const SLIDE_DURATION = 8000;

  function updateProgressBar() {
    if (!progressBars.length) return;
    progressBars.forEach((bar, idx) => {
      bar.classList.remove('active', 'filled');
      bar.style.removeProperty('--progress');
      if (idx < current) {
        bar.classList.add('filled');
      } else if (idx === current) {
        bar.classList.add('active');
      }
    });
  }

  function resetProgressBar() {
    progressBars.forEach(bar => {
      bar.classList.remove('active', 'filled');
      bar.style.removeProperty('--progress');
    });
  }

  // Update progress bar on slide change
  function showImage(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    updateProgressBar();
  }

  function nextImage() {
    current = (current + 1) % total;
    showImage(current);
  }

  function prevImage() {
    current = (current - 1 + total) % total;
    showImage(current);
  }

  // On manual navigation, reset progress bar animation
  function resetInterval() {
    clearInterval(intervalId);
    updateProgressBar();
    intervalId = setInterval(nextImage, SLIDE_DURATION);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevImage();
      resetInterval();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextImage();
      resetInterval();
    });
  }

  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let dragThreshold = 50; // px

  // Touch events
  track.addEventListener('touchstart', function(e) {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    isDragging = true;
    currentX = 0;
    track.style.transition = 'none';
  });

  track.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${-current * 100 + (currentX / track.offsetWidth) * 100}%)`;
  });

  track.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    track.style.transition = '';
    if (currentX > dragThreshold) {
      prevImage();
      resetInterval();
    } else if (currentX < -dragThreshold) {
      nextImage();
      resetInterval();
    } else {
      showImage(current);
    }
    isDragging = false;
    currentX = 0;
  });

  // Mouse events for desktop
  track.addEventListener('mousedown', function(e) {
    startX = e.clientX;
    isDragging = true;
    currentX = 0;
    track.style.transition = 'none';
    e.preventDefault();
  });

  track.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    track.style.transform = `translateX(${-current * 100 + (currentX / track.offsetWidth) * 100}%)`;
  });

  track.addEventListener('mouseup', function(e) {
    if (!isDragging) return;
    track.style.transition = '';
    if (currentX > dragThreshold) {
      prevImage();
      resetInterval();
    } else if (currentX < -dragThreshold) {
      nextImage();
      resetInterval();
    } else {
      showImage(current);
    }
    isDragging = false;
    currentX = 0;
  });

  track.addEventListener('mouseleave', function(e) {
    if (!isDragging) return;
    track.style.transition = '';
    showImage(current);
    isDragging = false;
    currentX = 0;
  });

  // Initial state
  showImage(current);
  updateProgressBar();
  intervalId = setInterval(nextImage, SLIDE_DURATION);
}); 