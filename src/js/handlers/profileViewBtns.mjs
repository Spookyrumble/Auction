import { apiFetch } from "../API/fetch/authorizedFetch.mjs";
import { userURL } from "../API/constants/urls.mjs";
import { createListingAuctionCards } from "../cards/profileListingCards.mjs";
import { fetchById } from "../API/fetch/fetchListingById.mjs";
import { buildUserPage } from "../profile.js";
import { userFetch } from "../API/fetch/userFetch.mjs";
import { triggerCountdown } from "../API/utils/countdown.mjs";

/**
 * Creates a list of user's wins.
 * @returns {Promise<Array>} A promise that resolves to an array of user's wins.
 */
async function createWinList() {
  const { wins } = await userFetch();
  return wins;
}

const container = document.getElementById("cardContainer");

/**
 * Handles the click events for the profile view buttons.
 * Retrieves user data based on the clicked button and updates the UI accordingly.
 */
export async function profileViewBtns() {
  const username = localStorage.getItem("userId");
  const bidsBtn = document.getElementById("myBidsBtn");
  const listingsBtn = document.getElementById("myListingsBtn");
  const winsBtn = document.getElementById("myWinsBtn");

  bidsBtn.addEventListener("click", async () => {
    container.textContent = "Loading..";
    bidsBtn.classList.add("activeBtn");
    listingsBtn.classList.remove("activeBtn");
    winsBtn.classList.remove("activeBtn");
    const response = await apiFetch(
      `${userURL}/${username}/bids?_listings=true`,
      "GET"
    );
    container.textContent = "";
    for (let i = 0; i < response.length; i++) {
      const listing = response[i].listing;
      const amount = response[i].amount;
      const created = response[i].created;
      buildBidsPage(listing, amount, created);
    }
  });

  listingsBtn.addEventListener("click", () => {
    container.textContent = "";
    bidsBtn.classList.remove("activeBtn");
    listingsBtn.classList.add("activeBtn");
    winsBtn.classList.remove("activeBtn");
    buildUserPage();
  });
  winsBtn.addEventListener("click", async () => {
    container.textContent = "";
    bidsBtn.classList.remove("activeBtn");
    listingsBtn.classList.remove("activeBtn");
    winsBtn.classList.add("activeBtn");
    const { wins } = await userFetch();

    if (wins.length === 0) {
      const noWins = document.createElement("p");
      noWins.textContent = "You haven't won any auctions yet.";
      container.append(noWins);
    } else {
      for (let winId of wins) {
        try {
          const data = await fetchById(winId);
          if (data && !data.error) {
            createListingAuctionCards(data);
          }
        } catch (error) {
          console.error(`Fetch failed for win ID: ${winId}`, error);
        }
      }
    }
  });
  // winsBtn.addEventListener("click", async () => {
  //   container.textContent = "";
  //   bidsBtn.classList.remove("activeBtn");
  //   listingsBtn.classList.remove("activeBtn");
  //   winsBtn.classList.add("activeBtn");
  //   const { wins } = await userFetch();

  //   if (wins.length === 0) {
  //     const noWins = document.createElement("p");
  //     noWins.textContent = "You haven't won any auctions yet.";
  //     container.append(noWins);
  //   } else {
  //     for (let i = 0; i < wins.length; i++) {
  //       const data = await fetchById(wins[i]);
  //       // console.log(data);
  //       createListingAuctionCards(data);
  //     }
  //   }
  // });
}

profileViewBtns();

async function buildBidsPage(data, amount, created) {
  const winList = await createWinList();
  const bidsContainer = document.getElementById("cardContainer");
  const card = document.createElement("div");
  card.id = data.id;
  card.className =
    "card p-3 border border-info m-3 col-sm-8 col-md-6 d-flex flex-column";
  // bidsContainer.append(card);

  // // const body = document.createElement("div");
  // // body.className = "card-body";
  // // card.append(body);
  // bidsContainer.append(card);

  const endsAt = document.createElement("div");
  endsAt.className = "mb-3 d-flex justify-content-center";
  card.append(endsAt);

  let wonAuction = false;
  winList.forEach((element) => {
    if (element === data.id) {
      wonAuction = true;
    }
  });

  const countdown = document.createElement("p");
  if (wonAuction) {
    countdown.classList = "text-success fs-1";
    countdown.textContent = "You won this auction!";
  } else {
    countdown.textContent = triggerCountdown(data.endsAt, endsAt);
  }

  endsAt.append(countdown);

  const idContainer = document.createElement("div");
  idContainer.className = "d-flex justify-content-between";
  card.append(idContainer);

  const auctionId = document.createElement("a");
  auctionId.className = "text-muted small text-decoration-none mb-3";
  auctionId.textContent = `Auction ID: ${data.id} - You won this auction!`;
  auctionId.textContent = `Auction ID: ${data.id}`;
  auctionId.href = "#";
  idContainer.append(auctionId);

  const title = document.createElement("small");
  title.className = "text-muted";
  title.textContent = "Title:";
  card.append(title);

  const titleText = document.createElement("h5");
  titleText.className = "card-title";
  titleText.textContent = data.title;
  card.append(titleText);

  const description = document.createElement("small");
  description.className = "text-muted";
  description.textContent = "Description:";
  card.append(description);

  const descriptionText = document.createElement("p");
  descriptionText.className = "card-text mb-3";
  descriptionText.textContent = data.description;
  card.append(descriptionText);

  const bidLabel = document.createElement("small");
  bidLabel.className = "text-muted";
  bidLabel.textContent = "Bid amount:";
  card.append(bidLabel);
  const bidCount = document.createElement("p");
  bidCount.classList = "";
  bidCount.className = "card-text";
  const bidCountNr = amount;
  bidCount.textContent = `${bidCountNr} Credits`;
  card.append(bidCount);

  const createdAt = document.createElement("small");
  createdAt.className = "text-muted";
  createdAt.textContent = "Bid placed at: ";
  card.append(createdAt);

  const formattedDate = Date(created);
  const createdAtDate = document.createElement("p");
  createdAtDate.classList = "";
  createdAtDate.className = "card-text";
  createdAtDate.textContent = formattedDate;
  card.append(createdAtDate);
  bidsContainer.append(card);
}
