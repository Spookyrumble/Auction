/**
 * Handles the navigation logic.
 */
export function navigationHandler() {
  const profile = document.getElementById("profileNavLink");
  const quickList = document.getElementById("newListingLink");
  const signOut = document.getElementById("signOut");
  const token = localStorage.getItem("accessToken");
  const homeLink = document.getElementById("logoLink");

  if (!token) {
    profile.href = "#";
    profile.setAttribute("data-bs-target", "#loggedInModal");
    profile.setAttribute("data-bs-toggle", "modal");
    quickList.setAttribute("data-bs-target", "#loggedInModal");
    quickList.setAttribute("data-bs-toggle", "modal");
    signOut.href = "/";
  }
  homeLink.style.cursor = "pointer";
  homeLink.addEventListener("click", () => {
    window.location.href = "/src/HTML/auction/";
  });
}
document.addEventListener("click", function (event) {
  const dropdownMenu = document.getElementById("burgerMenu");
  const dropdownButton = document.getElementById("burgerBtn");

  if (
    !dropdownMenu.contains(event.target) &&
    !dropdownButton.contains(event.target) &&
    dropdownMenu.classList.contains("show")
  ) {
    dropdownButton.click();
  }
});
