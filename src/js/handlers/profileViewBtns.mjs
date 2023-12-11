import { apiFetch } from "../API/fetch/authorizedFetch.mjs";
import { userURL } from "../API/constants/urls.mjs";
import { createListingAuctionCards } from "../cards/profileListingCards.mjs";
import { fetchById } from "../API/fetch/fetchListingById.mjs";
import { buildUserPage } from "../profile.js";
import { userFetch } from "../API/fetch/userFetch.mjs";
import { triggerCountdown } from "../API/utils/countdown.mjs";

// Testing array for wins history
// const fakeArray = [
//   "854efa4e-03f6-48ba-ba4a-6f0655f28016",
//   "39ab43a0-31bc-4ce0-9bb4-9f3b0fa9e55e",
//   "9ee04e11-4073-44fc-b1b5-91b5cbfc91c0",
// ];
async function createWinList() {
  const { wins } = await userFetch();
  return wins;
}
const winList = createWinList();

export async function profileViewBtns() {
  const username = localStorage.getItem("userId");
  const bidsBtn = document.getElementById("myBidsBtn");
  const listingsBtn = document.getElementById("myListingsBtn");
  const winsBtn = document.getElementById("myWinsBtn");

  bidsBtn.addEventListener("click", async () => {
    const container = document.getElementById("cardContainer");
    container.textContent = "";
    bidsBtn.classList.add("activeBtn");
    listingsBtn.classList.remove("activeBtn");
    winsBtn.classList.remove("activeBtn");
    const response = await apiFetch(
      `${userURL}/${username}/bids?_listings=true`,
      "GET"
    );
    for (let i = 0; i < response.length; i++) {
      const listing = response[i].listing;
      const amount = response[i].amount;
      const created = response[i].created;
      buildBidsPage(listing, amount, created);
    }
  });

  listingsBtn.addEventListener("click", () => {
    bidsBtn.classList.remove("activeBtn");
    listingsBtn.classList.add("activeBtn");
    winsBtn.classList.remove("activeBtn");
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";
    buildUserPage();
  });

  winsBtn.addEventListener("click", async () => {
    const container = document.getElementById("cardContainer");
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
      for (let i = 0; i < wins.length; i++) {
        const data = await fetchById(wins[i]);
        // console.log(data);
        createListingAuctionCards(data);
      }
    }
  });
}

profileViewBtns();

async function buildBidsPage(data, amount, created) {
  const bidsContainer = document.getElementById("cardContainer");
  const card = document.createElement("div");
  card.id = data.id;
  card.className = "card border border-info m-3 col-8-sm d-flex flex-column";
  bidsContainer.append(card);

  const body = document.createElement("div");
  body.className = "card-body";
  card.append(body);

  const endsAt = document.createElement("div");
  endsAt.className = "mb-3 d-flex justify-content-center";
  body.append(endsAt);

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
  body.append(idContainer);

  const auctionId = document.createElement("a");
  auctionId.className = "text-muted small text-decoration-none mb-3";
  auctionId.textContent = `Auction ID: ${data.id} - You won this auction!`;
  auctionId.textContent = `Auction ID: ${data.id}`;
  auctionId.href = "#";
  idContainer.append(auctionId);

  const title = document.createElement("small");
  title.className = "text-muted";
  title.textContent = "Title:";
  body.append(title);

  const titleText = document.createElement("h5");
  titleText.className = "card-title";
  titleText.textContent = data.title;
  body.append(titleText);

  const description = document.createElement("small");
  description.className = "text-muted";
  description.textContent = "Description:";
  body.append(description);

  const descriptionText = document.createElement("p");
  descriptionText.className = "card-text mb-3";
  descriptionText.textContent = data.description;
  body.append(descriptionText);

  const bidLabel = document.createElement("small");
  bidLabel.className = "text-muted";
  bidLabel.textContent = "Bid amount:";
  body.append(bidLabel);
  const bidCount = document.createElement("p");
  bidCount.classList = "";
  bidCount.className = "card-text";
  const bidCountNr = amount;
  bidCount.textContent = `${bidCountNr} Credits`;
  body.append(bidCount);

  const createdAt = document.createElement("small");
  createdAt.className = "text-muted";
  createdAt.textContent = "Bid placed at: ";
  body.append(createdAt);

  const formattedDate = Date(created);
  const createdAtDate = document.createElement("p");
  createdAtDate.classList = "";
  createdAtDate.className = "card-text";
  createdAtDate.textContent = formattedDate;
  body.append(createdAtDate);
}
