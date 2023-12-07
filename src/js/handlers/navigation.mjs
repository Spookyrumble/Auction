export function navigationHandler() {
  //Listens to nav elements and prevents profile, quick list new item and signout if no user is logged in
  const profile = document.getElementById("profileNavLink");
  const quickList = document.getElementById("newListing");
  const signOut = document.getElementById("signOut");
  const token = localStorage.getItem("accessToken");

  if (!token) {
    profile.href = "#";
    profile.setAttribute("data-bs-target", "#loggedInModal");
    profile.setAttribute("data-bs-toggle", "modal");
    quickList.setAttribute("data-bs-target", "#loggedInModal");
    quickList.setAttribute("data-bs-toggle", "modal");
    signOut.href = "/";
  }
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
