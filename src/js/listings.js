/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import { openListingsURL, authListingsURL } from "./API/constants/urls.mjs";
import { fetchOpenListings } from "./API/fetch/noAuthFetch.mjs";
import { apiFetch } from "./API/fetch/authorizedFetch.mjs";
import { createAuctionCards } from "/src/js/cards/createCards.mjs";
import { logOutStorageClear } from "./API/auth/logout.mjs";
import { navUserInfo } from "./handlers/navUserInfo.mjs";
// import { fetchAllPostsAndFilter } from "./API/fetch/filteredFetch.mjs";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";
import { end } from "@popperjs/core";
import { previewInit } from "./handlers/cardPreview.mjs";

// fetchAllPostsAndFilter();

async function init() {
  const token = localStorage.getItem("accessToken");
  const currentDateTime = new Date();
  if (token) {
    const array = await apiFetch(authListingsURL, "GET");
    // console.log(array);
    console.log("Logged in");

    for (let i = 0; i < array.length; i++) {
      const endDateTime = new Date(array[i].endsAt);
      if (
        array[i].media.length > 0 &&
        !array[i].title.toLowerCase().includes("test") &&
        endDateTime > currentDateTime
      ) {
        createAuctionCards(array[i]);
      }
    }
  } else {
    const array = await fetchOpenListings();
    console.log(array);
    console.log("Not logged in");

    for (let i = 0; i < array.length; i++) {
      const endDateTime = new Date(array[i].endsAt);
      if (
        array[i].media.length > 0 &&
        !array[i].title.toLowerCase().includes("test") &&
        endDateTime > currentDateTime
      ) {
        createAuctionCards(array[i]);
      }
    }
  }
}

init();
previewInit();
logOutStorageClear();
navUserInfo();
