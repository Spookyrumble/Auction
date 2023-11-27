export function previewInit() {
  //   document.addEventListener("DOMContentLoaded", () => {
  //   const form = document.getElementById("newListing");

  const itemInput = document.getElementById("item");

  itemInput.addEventListener("input", function () {
    document.getElementById("previewTitle").textContent = this.value;
  });

  const descriptionInput = document.getElementById("description");
  descriptionInput.addEventListener("input", function () {
    document.getElementById("previewDescription").textContent = this.value;
  });

  const urlInput = document.getElementById("itemUrl");
  urlInput.addEventListener("input", function () {
    document.getElementById("previewImg").src = this.value;
  });
}
