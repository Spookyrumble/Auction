export function createBadge() {
  const badgeContainer = document.getElementById("tagBadges");
  const tagInput = document.getElementById("tags");

  const badge = document.createElement("span");
  badge.classList.add("badge", "bg-secondary", "m-1");
  badge.textContent = tagInput.value;
  badgeContainer.append(badge);
}
