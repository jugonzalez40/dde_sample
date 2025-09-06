document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.image-modal-close');
  const prevBtn = document.getElementById('prevImage');
  const nextBtn = document.getElementById('nextImage');
  const productImages = document.querySelectorAll('.product-image');
  
  let currentImageIndex = 0;
  let images = [];

  // Collect all product images
  productImages.forEach((img, index) => {
    images.push({
      src: img.dataset.fullscreenSrc,
      alt: img.alt
    });
  });

  // Open modal when clicking on product images
  productImages.forEach((img, index) => {
    img.addEventListener('click', function() {
      currentImageIndex = index;
      showImage(currentImageIndex);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  // Show specific image in modal
  function showImage(index) {
    if (images.length > 0) {
      modalImage.src = images[index].src;
      modalImage.alt = images[index].alt;
    }
  }

  // Navigate to previous image
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
  }

  // Navigate to next image
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
  }

  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    prevImage();
  });
  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    nextImage();
  });

  // Close modal when clicking on background
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (modal.classList.contains('active')) {
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        nextImage();
      } else {
        // Swipe right - previous image
        prevImage();
      }
    }
  }
});
