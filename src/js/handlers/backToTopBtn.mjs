/**
 * Initializes the back-to-top button functionality.
 */
export function initializeBackToTopButton() {
  window.onscroll = function () {
    scrollFunction();
  };
}

/**
 * Handles the scroll event and shows or hides the back to top button based on the scroll position.
 */
function scrollFunction() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

/**
 * Scrolls the page to the top.
 */
export function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
