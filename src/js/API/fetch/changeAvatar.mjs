import { apiFetch } from "./authorizedFetch.mjs";
import { userURL } from "../constants/urls.mjs";

// const form = document.getElementById("editAvatar");
const avatarImg = document.getElementById("avatarInput");
const submitBtn = document.getElementById("avatarSubmitBtn");
const spinner = document.getElementById("avatarBtnSpinner");
const spinnerText = document.getElementById("avatarBtnText");
const user = localStorage.getItem("userId");

/**
 * Updates the user's avatar.
 */
export function updateAvatar() {
  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const profileImg = {
      avatar: avatarImg.value,
    };
    console.log("clicked");

    if (profileImg.avatar !== "") {
      try {
        spinner.classList.remove("visually-hidden");
        spinnerText.textContent = "Updating..";
        console.log(profileImg);

        const response = await apiFetch(
          `${userURL}/${user}/media`,
          "PUT",
          profileImg
        );
        console.log(response);
        spinner.classList.add("visually-hidden");
        spinnerText.textContent = "Updated!";
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("no image");
    }
  });
}
