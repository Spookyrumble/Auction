export function containerHandler() {
  const containerAvatar = document.getElementById("editContainer");
  const avatarBtn = document.getElementById("editProfileBtn");

  avatarBtn.addEventListener("click", () => {
    containerAvatar.classList.toggle("collapse");
  });
}
