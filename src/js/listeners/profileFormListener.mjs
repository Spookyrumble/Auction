export function avatarEditHandler() {
  const containerAvatar = document.getElementById("editContainer");
  const avatarBtn = document.getElementById("editProfileBtn");

  avatarBtn.addEventListener("click", () => {
    containerAvatar.classList.toggle("collapse");
  });
}
