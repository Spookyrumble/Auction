import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import { avatarEditHandler } from "./listeners/profileFormListener.mjs";
import { navUserInfo } from "./handlers/navUserInfo.mjs";
import { userFetch } from "./API/fetch/userFetch.mjs";
import { createListingAuctionCards } from "./cards/profileListingCards.mjs";
import { previewInit } from "./handlers/cardPreview.mjs";
import { createPost } from "./API/fetch/createPost.mjs";

import { userListing } from "./API/fetch/userListingFetch.mjs";
import { logOutStorageClear } from "./API/auth/logout.mjs";
import { navigationHandler } from "./handlers/navigation.mjs";
import placeholderImage from "/src/images/placeholder.png";

/* eslint-disable no-unused-vars */
import { profileViewBtns } from "./handlers/profileViewBtns.mjs";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";
/* eslint-enable no-unused-vars */

avatarEditHandler();
logOutStorageClear();
navUserInfo();
previewInit();
navigationHandler();
createPost();

/**
 * Builds the user page by fetching user data and populating the page with the retrieved information.
 * @returns {Promise<void>} A promise that resolves when the user page is built.
 */
export async function buildUserPage() {
  const userId = localStorage.getItem("userId");

  const { avatar, name, credits } = await userFetch();
  const listings = await userListing(userId);

  const avatarElement = document.getElementById("avatarProfile");
  const nameElement = document.getElementById("userName");
  const creditsElement = document.getElementById("credits");
  const listingsElement = document.getElementById("listingNum");

  if (!avatar) {
    avatarElement.src = placeholderImage;
    avatarElement.alt = "Avatar Placeholder";
    avatarElement.style.width = "150px";
    avatarElement.style.height = "150px";
    avatarElement.classList.add("rounded-circle");
  } else {
    avatarElement.src = avatar;
    avatarElement.alt = "Avatar profile picture";
    avatarElement.style.width = "150px";
    avatarElement.style.height = "150px";
  }
  nameElement.textContent = name;
  creditsElement.innerText = credits;
  listingsElement.innerText = listings.length;

  listings.forEach((listing) => {
    createListingAuctionCards(listing);
  });
}
buildUserPage();
