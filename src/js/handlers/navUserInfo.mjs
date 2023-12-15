import { userFetch } from "../API/fetch/userFetch.mjs";

/**
 * Updates the user information in the navigation bar.
 * If the user is not logged in, it hides the user field and sets the sign out button text to "Sign in".
 * If the user is logged in, it retrieves the user data, updates the avatar, username, and credits in the navigation bar.
 * @returns {Promise<void>} A promise that resolves when the user information is updated.
 */
export async function navUserInfo() {
  if (!localStorage.getItem("accessToken")) {
    const userField = document.getElementById("userField");
    const signOutBtn = document.getElementById("signOut");
    userField.classList.add("d-none");
    signOutBtn.textContent = "Sign in";
    return;
  } else {
    const userAvatar = document.getElementById("avatar");
    const loggedInUser = document.getElementById("loggedInUserName");
    const userCredits = document.getElementById("creditsValue");

    const userData = await userFetch();
    const pic = userData.avatar;
    const credits = userData.credits;
    const userName = userData.name;
    loggedInUser.textContent = userName;
    userAvatar.src = pic;
    userAvatar.alt = "avatar";
    userAvatar.style.cursor = "pointer";
    userAvatar.onclick = function () {
      window.location.href = "/src/HTML/profile/";
    };
    userCredits.textContent = `${credits} credits`;
  }
}
