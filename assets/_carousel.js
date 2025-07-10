document.addEventListener("DOMContentLoaded", function () {
  // Find all carousels on the page
  const carouselTracks = document.querySelectorAll("[data-carousel-track]");

  if (carouselTracks.length === 0) return;

  // Check if device is mobile
  function isMobile() {
    return window.innerWidth <= 992;
  }

  // Initialize each carousel independently
  carouselTracks.forEach(function (carouselTrack, index) {
    // Find the specific buttons for this carousel
    const carouselContainer = carouselTrack.closest(".home-container");
    if (!carouselContainer) return;

    const prevButton = carouselContainer.querySelector(".carousel-btn--prev");
    const nextButton = carouselContainer.querySelector(".carousel-btn--next");

    if (!prevButton || !nextButton) return;

    const carouselItems = carouselTrack.querySelectorAll(".carousel-item");

    if (carouselItems.length === 0) return;

    // Calculate scroll amount (width of first item + margin)
    function getScrollAmount() {
      const firstItem = carouselItems[0];
      const itemWidth = firstItem.offsetWidth;
      const itemMargin =
        parseInt(window.getComputedStyle(firstItem).marginRight, 10) || 0;
      return (itemWidth + itemMargin) * 2;
    }

    // Update button states based on scroll position
    function updateButtonStates() {
      // Don't update button states on mobile since buttons are hidden
      if (isMobile()) return;

      const scrollLeft = carouselTrack.scrollLeft;
      const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;

      prevButton.disabled = scrollLeft <= 0;
      nextButton.disabled = scrollLeft >= maxScroll - 1; // -1 for browser rounding
    }

    // Scroll to previous items
    function scrollToPrev() {
      if (isMobile()) return; // Don't allow button navigation on mobile

      const scrollAmount = getScrollAmount();
      carouselTrack.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }

    // Scroll to next items
    function scrollToNext() {
      if (isMobile()) return; // Don't allow button navigation on mobile

      const scrollAmount = getScrollAmount();
      carouselTrack.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

    // Initialize carousel functionality for this specific carousel
    function initCarousel() {
      if (isMobile()) {
        // On mobile, only enable touch scrolling, no button functionality
        prevButton.style.display = "none";
        nextButton.style.display = "none";
        return;
      }

      // Desktop functionality
      prevButton.style.display = "flex";
      nextButton.style.display = "flex";

      // Remove any existing event listeners to prevent duplicates
      prevButton.removeEventListener("click", scrollToPrev);
      nextButton.removeEventListener("click", scrollToNext);
      carouselTrack.removeEventListener("scroll", updateButtonStates);

      // Event listeners for buttons (only on desktop)
      prevButton.addEventListener("click", scrollToPrev);
      nextButton.addEventListener("click", scrollToNext);

      // Update button states on scroll
      carouselTrack.addEventListener("scroll", updateButtonStates);

      // Initial button state update
      updateButtonStates();
    }

    // Add drag functionality for desktop for this specific carousel
    function initDragFunctionality() {
      if (isMobile()) return; // Mobile devices have native touch scrolling

      let isDown = false;
      let startX;
      let scrollLeftStart;

      carouselTrack.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - carouselTrack.offsetLeft;
        scrollLeftStart = carouselTrack.scrollLeft;
        carouselTrack.style.cursor = "grabbing";
      });

      carouselTrack.addEventListener("mouseleave", () => {
        isDown = false;
        carouselTrack.style.cursor = "grab";
      });

      carouselTrack.addEventListener("mouseup", () => {
        isDown = false;
        carouselTrack.style.cursor = "grab";
      });

      carouselTrack.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselTrack.offsetLeft;
        const walk = (x - startX) * 2;
        carouselTrack.scrollLeft = scrollLeftStart - walk;
      });
    }

    // Initialize this carousel
    initCarousel();
    initDragFunctionality();

    // Handle window resize for this specific carousel
    window.addEventListener("resize", function () {
      // Reinitialize carousel when switching between mobile and desktop
      initCarousel();
    });
  });
});
