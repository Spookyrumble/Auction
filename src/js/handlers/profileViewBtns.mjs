import { apiFetch } from "../API/fetch/authorizedFetch.mjs";
import { userURL, openListingsURL } from "../API/constants/urls.mjs";
import { createListingAuctionCards } from "../cards/profileListingCards.mjs";
import { buildUserPage } from "../profile.js";

export function profileViewBtns() {
  const username = localStorage.getItem("userId");
  const bidsBtn = document.getElementById("myBidsBtn");
  const listingsBtn = document.getElementById("myListingsBtn");
  const winsBtn = document.getElementById("myWinsBtn");

  bidsBtn.addEventListener("click", async () => {
    const container = document.getElementById("container");
    container.textContent = "";
    bidsBtn.classList.add("activeBtn");
    listingsBtn.classList.remove("activeBtn");
    winsBtn.classList.remove("activeBtn");
    const response = await apiFetch(`${userURL}/${username}/bids`, "GET");
    response.forEach(async (element) => {
      const postId = element.id;
      const auctions = await apiFetch(
        `${openListingsURL}/${postId}?_seller=true`,
        "GET"
      );
      if (auctions.statusCode === 404) {
        console.log("The listing with this ID has been deleted");
        container.textContent = `There are no active bids.`;
      } else {
        createListingAuctionCards(auctions);
      }
    });
  });

  listingsBtn.addEventListener("click", () => {
    bidsBtn.classList.remove("activeBtn");
    listingsBtn.classList.add("activeBtn");
    winsBtn.classList.remove("activeBtn");
    const container = document.getElementById("container");
    container.innerHTML = "";
    buildUserPage();
  });

  winsBtn.addEventListener("click", async () => {
    const container = document.getElementById("container");
    container.textContent = "";
    bidsBtn.classList.remove("activeBtn");
    listingsBtn.classList.remove("activeBtn");
    winsBtn.classList.add("activeBtn");
    const response = await apiFetch(`${userURL}/${username}`, "GET");
    const wins = response.wins;
    if (wins.length === 0) {
      container.textContent = `There is no win history.`;
    } else {
      wins.forEach(async (element) => {
        const postId = element.id;
        const auctions = await apiFetch(
          `${openListingsURL}/${postId}?_seller=true`,
          "GET"
        );
        if (auctions.statusCode === 404) {
          console.log("The listing with this ID has been deleted");
        } else {
          createListingAuctionCards(auctions);
        }
      });
    }
  });
}

profileViewBtns();
