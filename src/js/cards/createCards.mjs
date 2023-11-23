import { createDynamicCarousel } from "./imgCarousel.mjs";

export function createAuctionCards(data) {
  const container = document.getElementById("cardContainer");

  const card = document.createElement("div");
  card.id = data.id;
  (card.className = "card"), "mx-3";
  card.style = "width: 18rem;";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const carouselContainer = document.createElement("div");
  const imgArray = data.media;
  console.log(imgArray);

  const carousel = createDynamicCarousel(data.id, imgArray);

  carouselContainer.append(carousel);
  cardBody.append(carouselContainer);

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = data.title;
  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = data.description;
  const cardPrice = document.createElement("p");
  cardPrice.className = "card-text";
  cardPrice.textContent = data.price;
  const bidBtn = document.createElement("a");
  bidBtn.className = "btn btn-primary";
  bidBtn.textContent = "Bid Now";
  bidBtn.href = "#";

  cardBody.append(cardTitle);
  cardBody.append(cardText);
  cardBody.append(cardPrice);
  cardBody.append(bidBtn);
  card.append(cardBody);
  container.append(card);
}
