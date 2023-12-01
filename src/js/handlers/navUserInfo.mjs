import { userFetch } from "../API/fetch/userFetch.mjs";

export async function navUserInfo() {
  const userAvatar = document.getElementById("avatar");
  const userCredits = document.getElementById("creditsValue");

  const userData = await userFetch();
  const pic = userData.avatar;
  const credits = userData.credits;
  userAvatar.src = pic;
  userAvatar.alt = "avatar";
  userAvatar.style.cursor = "pointer";
  userAvatar.onclick = function () {
    window.location.href = "/src/HTML/profile/";
  };
  userCredits.textContent = credits;
}
