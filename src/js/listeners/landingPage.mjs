/**
 * Function that handles the "Just Browse" button click event.
 * Redirects the user to the auction page.
 */
export function justBrowse() {
  const browseBtn = document.getElementById("landingBrowseBtn");

  browseBtn.addEventListener("click", () => {
    window.location.href = "/src/HTML/auction/index.html";
  });
}
