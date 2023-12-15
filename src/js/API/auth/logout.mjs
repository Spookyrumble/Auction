/**
 * Clears the local storage and redirects the user to the home page when the logout button is clicked.
 */
export function logOutStorageClear() {
  const logoutBtn = document.getElementById("signOut");
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/";
  });
}
