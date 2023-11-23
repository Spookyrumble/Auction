export function containerHandler() {
  const containerAvatar = document.getElementById("editContainer");
  const containerListing = document.getElementById("listingContainer");
  const avatarBtn = document.getElementById("editProfileBtn");
  const listingBtn = document.getElementById("newListingBtn");

  avatarBtn.addEventListener("click", () => {
    if (!containerListing.classList.contains("collapse")) {
      containerListing.classList.add("collapse");
      containerAvatar.classList.toggle("collapse");
    } else {
      containerAvatar.classList.toggle("collapse");
    }
  });

  listingBtn.addEventListener("click", () => {
    if (!containerAvatar.classList.contains("collapse")) {
      containerAvatar.classList.add("collapse");
      containerListing.classList.toggle("collapse");
    } else {
      containerListing.classList.toggle("collapse");
    }
  });
}
