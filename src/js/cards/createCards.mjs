import { triggerCountdown } from "../API/utils/countdown.mjs";
import { formatDate } from "../API/utils/timeAndDate.mjs";
import { populateBiddingModal } from "../handlers/biddingHandler.mjs";
import placeholderImage from "/src/images/placeholder.png";
import { searchHandler } from "../handlers/searchHandler.mjs";
import { buildViewModal } from "../handlers/viewMoreModal.mjs";

const container = document.getElementById("cardContainer");

searchHandler(container);

export function createAuctionCards(data) {
  const loader = document.getElementById("loader");
  loader.classList.add("d-none");

  const card = document.createElement("a");
  // card.setAttribute("data-bs-target", "#listingByIdModal");
  // card.setAttribute("data-bs-toggle", "modal");
  card.className = "card m-3 listingImg col-md-8 col-lg-8 col-xl-4 cardTarget";
  // card.style.cursor = "pointer";
  card.style.textDecoration = "none";

  const cardBody = document.createElement("div");
  cardBody.className = "d-flex flex-column justify-content-between card-body";

  const imgContainer = document.createElement("div");
  imgContainer.className = "cardImgContainer";

  const imgArray = data.media;

  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className =
    "d-flex justify-content-center thumbnailContainer";
  const uniqueUrls = new Set();

  if (imgArray.length > 1) {
    const mainImage = document.createElement("img");
    mainImage.id = "mainImage";
    mainImage.className = "d-block cardImgSizing";
    mainImage.src = imgArray[0];
    mainImage.alt = "Main Image";
    mainImage.onerror = function () {
      mainImage.src = placeholderImage;
    };
    imgContainer.append(mainImage);

    imgArray.forEach((src) => {
      if (!uniqueUrls.has(src)) {
        uniqueUrls.add(src);

        const thumbnail = document.createElement("img");
        thumbnail.src = src;
        thumbnail.className = "img-thumbnail";
        thumbnail.style.width = "50px";
        thumbnail.style.height = "52px";
        thumbnail.style.cursor = "pointer";
        thumbnail.onclick = function () {
          mainImage.src = src;
        };
        thumbnailContainer.append(thumbnail);
        thumbnail.onerror = function () {
          thumbnail.src = placeholderImage;
        };
      }
    });

    imgContainer.append(thumbnailContainer);
  } else if (imgArray.length === 1) {
    const img = document.createElement("img");
    img.className = "d-block cardImgSizing";
    img.src = imgArray[0];
    img.alt = "Image";
    imgContainer.append(img);
  } else {
    const noImageText = document.createElement("img");
    noImageText.className = "d-block cardImgSizing";
    noImageText.src = placeholderImage;
    imgContainer.append(noImageText);
  }

  const titleContainer = document.createElement("div");
  titleContainer.className = "my-2";
  const titleLabel = document.createElement("small");
  titleLabel.className = "text-muted";
  titleLabel.textContent = "Title:";
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = data.title;
  const descriptionLabel = document.createElement("small");
  descriptionLabel.className = "text-muted";
  descriptionLabel.textContent = "Description:";
  const textContainer = document.createElement("div");
  const cardText = document.createElement("p");
  cardText.className = "card-text mb-3";
  cardText.textContent = data.description;
  const priceContainer = document.createElement("div");
  const cardPrice = document.createElement("p");
  cardPrice.className = "card-text";
  cardPrice.textContent = data.price;
  titleContainer.append(titleLabel);
  titleContainer.append(cardTitle);
  textContainer.append(descriptionLabel);
  textContainer.append(cardText);
  priceContainer.append(cardPrice);

  const createdAt = document.createElement("small");
  createdAt.className = "text-muted";
  const formattedDate = formatDate(data.created);
  createdAt.textContent = `Created: ${formattedDate}`;
  priceContainer.append(createdAt);

  const countdown = document.createElement("div");
  countdown.classList = "countdown";
  const time = data.endsAt;
  const countdownTimer = document.createElement("span");
  triggerCountdown(time, countdownTimer);
  countdown.append(countdownTimer);

  const bids = document.createElement("div");
  const bidCount = document.createElement("small");
  bidCount.classList = "text-muted";
  bidCount.className = "card-text";
  const bidCountNr = data._count.bids;
  bidCount.textContent = `Current bids: ${bidCountNr}`;
  bids.append(bidCount);

  const listingTags = document.createElement("div");
  listingTags.className = "d-flex flex-wrap align-items-center";
  const tagLabel = document.createElement("small");
  tagLabel.className = "text-muted";
  tagLabel.textContent = "Tags: ";
  listingTags.append(tagLabel);

  const tags = data.tags;
  if (tags.length === 0) {
    tagLabel.textContent = `Tags: No tags`;
  } else {
    tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.className = "badge bg-secondary m-1";
      tagElement.style.cursor = "pointer";
      tagElement.textContent = tag;
      listingTags.append(tagElement);
    });
  }

  const btnContainer = document.createElement("div");
  btnContainer.className = "d-flex justify-content-end gap-2";
  const bidBtn = document.createElement("a");
  bidBtn.className = "btn btn-info border border-secondary mt-5 text-white";
  bidBtn.textContent = "Place bid";
  if (!localStorage.getItem("accessToken")) {
    bidBtn.setAttribute("data-bs-toggle", "modal");
    bidBtn.setAttribute("data-bs-target", "#loggedInModal");
  } else {
    bidBtn.setAttribute("data-bs-toggle", "modal");
    bidBtn.setAttribute("data-bs-target", "#biddingModal");
    const bidInput = document.getElementById("bidInput");
    bidBtn.addEventListener("click", () => {
      bidInput.id = data.id;
      const inputId = bidInput.id;
      populateBiddingModal(data, inputId);
    });

    const biddingModal = document.getElementById("biddingModal");
    biddingModal.addEventListener("hidden.bs.modal", () => {
      bidInput.value = "";
    });
  }
  const viewMoreBtn = document.createElement("a");
  viewMoreBtn.className =
    "btn btn-info border border-secondary mt-5 ms-2 text-white";
  viewMoreBtn.textContent = "View more";
  viewMoreBtn.setAttribute("data-bs-toggle", "modal");
  viewMoreBtn.setAttribute("data-bs-target", "#listingByIdModal");
  viewMoreBtn.addEventListener("click", () => {
    buildViewModal(data.id);
  });

  btnContainer.append(viewMoreBtn);
  btnContainer.append(bidBtn);
  cardBody.append(imgContainer);
  cardBody.append(titleContainer);
  cardBody.append(textContainer);
  cardBody.append(priceContainer);
  cardBody.append(countdown);
  cardBody.append(bids);
  cardBody.append(listingTags);
  cardBody.append(btnContainer);
  card.append(cardBody);
  container.append(card);
}

searchHandler();
