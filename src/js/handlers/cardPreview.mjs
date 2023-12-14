import { createBadge } from "../API/utils/createBadge.mjs";
import { triggerCountdown } from "../API/utils/countdown.mjs";

/**
 * Initializes the preview functionality for the auction card.
 */
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
    const dateTime = document.getElementById("previewEndsAt");
    triggerCountdown(this.value, dateTime);
  });

  addBtn.addEventListener("click", () => {
    createBadge();
  });
}
