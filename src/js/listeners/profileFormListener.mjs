import { updateAvatar } from "../API/fetch/changeAvatar.mjs";

/**
 * Handles the click event for editing the avatar.
 */
export function avatarEditHandler() {
  const containerAvatar = document.getElementById("editContainer");
  const avatarBtn = document.getElementById("editProfileBtn");

  avatarBtn.addEventListener("click", () => {
    containerAvatar.classList.toggle("collapse");
  });
}

updateAvatar();
