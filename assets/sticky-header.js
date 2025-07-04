// document.addEventListener("DOMContentLoaded", function () {
//   const header = document.querySelector("header.flex-column");
//   const headerHeight = header.offsetHeight;

//   // Set CSS variable for header height
//   document.documentElement.style.setProperty(
//     "--header-height",
//     `${headerHeight}px`
//   );

//   // Handle scroll behavior
//   let lastScrollTop = 0;
//   const scrollThreshold = 50; // Minimum scroll amount before header changes

//   window.addEventListener("scroll", function () {
//     const currentScroll =
//       window.pageYOffset || document.documentElement.scrollTop;

//     if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
//       // Scrolling down
//       header.style.transform = "translateY(-100%)";
//     } else {
//       // Scrolling up
//       header.style.transform = "translateY(0)";
//     }

//     lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
//   });

//   // Update header height on window resize
//   window.addEventListener("resize", function () {
//     const newHeaderHeight = header.offsetHeight;
//     document.documentElement.style.setProperty(
//       "--header-height",
//       `${newHeaderHeight}px`
//     );
//   });
// }); 