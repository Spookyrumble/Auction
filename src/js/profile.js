/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import { avatarEditHandler } from "./listeners/profileFormListener.mjs";
import { navUserInfo } from "./handlers/navUserInfo.mjs";
import { userFetch } from "./API/fetch/userFetch.mjs";
import { createListingAuctionCards } from "./cards/profileListingCards.mjs";
import { previewInit } from "./handlers/cardPreview.mjs";
import { profileViewBtns } from "./handlers/profileViewBtns.mjs";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";

avatarEditHandler();

const listForm = document.getElementById("newListing");
listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(listForm);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
});

navUserInfo();
previewInit();

async function buildUserPage() {
  const { avatar, name, listings, credits } = await userFetch();
  console.log(listings);

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
