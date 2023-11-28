export function justBrowse() {
  const browseBtn = document.getElementById("landingBrowseBtn");

  browseBtn.addEventListener("click", () => {
    window.location.href = "/src/HTML/auction/index.html";
  });
}
