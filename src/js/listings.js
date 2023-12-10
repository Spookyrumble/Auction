import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import { authListingsURL } from "./API/constants/urls.mjs";
import { fetchOpenListings } from "./API/fetch/noAuthFetch.mjs";
import { apiFetch } from "./API/fetch/authorizedFetch.mjs";
import { createAuctionCards } from "/src/js/cards/createCards.mjs";
import { logOutStorageClear } from "./API/auth/logout.mjs";
import { navUserInfo } from "./handlers/navUserInfo.mjs";
import { navigationHandler } from "./handlers/navigation.mjs";
import { createPost } from "./API/fetch/createPost.mjs";
import { previewInit } from "./handlers/cardPreview.mjs";
import { sortData } from "./handlers/sortingHandler.mjs";
/* eslint-disable no-unused-vars */
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";
import { end } from "@popperjs/core";
/* eslint-enable no-unused-vars */

export async function init(sortBy) {
  const token = localStorage.getItem("accessToken");
  const currentDateTime = new Date();
  if (token) {
    const array = await apiFetch(`${authListingsURL}`, "GET");
    console.log(array);
    console.log("Logged in");

    let sortedData = sortData(sortBy, array);

    for (let i = 0; i < sortedData.length; i++) {
      const endDateTime = new Date(array[i].endsAt);
      if (
        !array[i].title.toLowerCase().includes("test") &&
        !array[i].title.toLowerCase().includes("hei") &&
        endDateTime > currentDateTime
      ) {
        createAuctionCards(sortedData[i]);
      }
    }
  } else {
    const array = await fetchOpenListings();
    let sortedData = sortData(sortBy, array);

    console.log(array);
    console.log("Not logged in");

    for (let i = 0; i < sortedData.length; i++) {
      const endDateTime = new Date(sortedData[i].endsAt);
      if (
        !sortedData[i].title.toLowerCase().includes("test") &&
        endDateTime > currentDateTime
      ) {
        createAuctionCards(sortedData[i]);
      }
    }
  }
}

const sortBySelect = document.getElementById("sortBySelect");

sortBySelect.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  console.log(selectedValue);
  removeCards();
  init(selectedValue);
});

previewInit();
logOutStorageClear();
navUserInfo();
navigationHandler();
createPost();
let defaultSort = "created";
init(defaultSort);
function removeCards() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.remove();
  });
}
