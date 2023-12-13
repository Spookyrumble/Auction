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

export async function buildUserPage() {
  const userId = localStorage.getItem("userId");

  const { avatar, name, credits } = await userFetch();
  const listings = await userListing(userId);

  const avatarElement = document.getElementById("avatarProfile");
  const nameElement = document.getElementById("userName");
  const creditsElement = document.getElementById("credits");
  const listingsElement = document.getElementById("listingNum");

  avatarElement.src = avatar;
  nameElement.textContent = name;
  creditsElement.innerText = credits;
  listingsElement.innerText = listings.length;

  listings.forEach((listing) => {
    createListingAuctionCards(listing);
  });
}
buildUserPage();
