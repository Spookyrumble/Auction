import { createBadge } from "../API/utils/createBadge.mjs";

export function previewInit() {
  const itemInput = document.getElementById("item");
  const addBtn = document.getElementById("badgeAddBtn");

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

  const created = new Date();
  document.getElementById("previewCreated").textContent =
    `Created: ${created.toLocaleDateString()}`;

  const endsAt = document.getElementById("date");
  endsAt.addEventListener("input", function () {
    document.getElementById("previewEndsAt").innerText =
      `Ends At: ${this.value}`;
  });

  addBtn.addEventListener("click", () => {
    createBadge();
  });
}
