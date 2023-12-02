export function logOutStorageClear() {
  const logoutBtn = document.getElementById("signOut");
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/";
  });
}
