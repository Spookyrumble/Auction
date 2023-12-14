import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import { fetchAllPosts } from "./API/fetch/fetchAllposts.mjs";
import { createAuctionCards } from "/src/js/cards/createCards.mjs";
import { logOutStorageClear } from "./API/auth/logout.mjs";
import { navUserInfo } from "./handlers/navUserInfo.mjs";
import { navigationHandler } from "./handlers/navigation.mjs";
import { createPost } from "./API/fetch/createPost.mjs";
import { previewInit } from "./handlers/cardPreview.mjs";
import { sortData } from "./handlers/sortingHandler.mjs";
import {
  initializeBackToTopButton,
  scrollToTop,
} from "./handlers/backToTopBtn.mjs";

/* eslint-disable no-unused-vars */
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";
import { end } from "@popperjs/core";
/* eslint-enable no-unused-vars */

/**
 * Initializes the auction listings.
 *
 * @param {string} sortBy - The sorting criteria for the listings.
 * @returns {Promise<void>} - A promise that resolves when the initialization is complete.
 */
export async function init(sortBy) {
  const token = localStorage.getItem("accessToken");
  const currentDateTime = new Date();
  if (token) {
    const array = await fetchAllPosts();

    let sortedData = sortData(sortBy, array);

    for (let i = 0; i < sortedData.length; i++) {
      const endDateTime = new Date(array[i].endsAt);
      if (
        !array[i].title.toLowerCase().includes("test") &&
        !array[i].title.toLowerCase().includes("example") &&
        !array[i].title.toLowerCase().includes("tester") &&
        !array[i].title.toLowerCase().includes("hei") &&
        endDateTime > currentDateTime
      ) {
        createAuctionCards(sortedData[i]);
      }
    }
  } else {
    const array = await fetchAllPosts();
    let sortedData = sortData(sortBy, array);

    for (let i = 0; i < sortedData.length; i++) {
      const endDateTime = new Date(sortedData[i].endsAt);
      if (
        !sortedData[i].title.toLowerCase().includes("test") &&
        !array[i].title.toLowerCase().includes("example") &&
        !array[i].title.toLowerCase().includes("tester") &&
        !array[i].title.toLowerCase().includes("hei") &&
        endDateTime > currentDateTime
      ) {
        createAuctionCards(sortedData[i]);
      }
    }
  }
}

const sortBySelect = document.getElementById("sortBySelect");
const pinnedBadgeContainer = document.getElementById("pinnedBadgeContainer");

sortBySelect.addEventListener("change", (event) => {
  const loader = document.getElementById("loader");
  const selectedValue = event.target.value;
  pinnedBadgeContainer.textContent = "";

  removeCards();
  loader.classList.remove("d-none");
  init(selectedValue);
});

previewInit();
logOutStorageClear();
navUserInfo();
navigationHandler();
createPost();

let defaultSort = "created";
init(defaultSort);

/**
 * Removes all cards with the class "cardTarget" from the DOM.
 */
function removeCards() {
  const cards = document.querySelectorAll(".cardTarget");
  cards.forEach((card) => {
    card.remove();
  });
}

initializeBackToTopButton();
document.getElementById("backToTopBtn").addEventListener("click", scrollToTop);
