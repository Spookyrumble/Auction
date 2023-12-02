import { apiFetch } from "../API/fetch/authorizedFetch.mjs";
import {
  baseURL,
  userURL,
  authListingsURL,
  openListingsURL,
} from "../API/constants/urls.mjs";
import { createListingAuctionCards } from "../cards/profileListingCards.mjs";

export function profileViewBtns() {
  const username = localStorage.getItem("userId");
  const bidsBtn = document.getElementById("myBidsBtn");
  const listingsBtn = document.getElementById("myListingsBtn");
  const winsBtn = document.getElementById("myWinsBtn");

  bidsBtn.addEventListener("click", async () => {
    const response = await apiFetch(`${userURL}/${username}/bids`, "GET");
    response.forEach(async (element) => {
      console.log(element.id);
      const postId = element.id;
      const auctions = await apiFetch(`${openListingsURL}/${postId}`, "GET");
      console.log(auctions);
    });
  });

  listingsBtn.addEventListener("click", () => {
    //
  });

  winsBtn.addEventListener("click", () => {
    //
  });
}

function fetchingLoop(array) {
  for (let i = 0; i < array.length; i++) {
    const arrayObject = array[i];
    createListingAuctionCards(arrayObject);
  }
}

profileViewBtns();
