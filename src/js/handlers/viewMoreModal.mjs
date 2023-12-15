import { fetchById } from "../API/fetch/fetchListingById.mjs";
import { triggerCountdown } from "../API/utils/countdown.mjs";
import { userFetch } from "../API/fetch/userFetch.mjs";
import { createAndPlaceBid } from "./biddingHandler.mjs";
import placeholderImage from "/src/images/placeholder.png";

/**
 * Builds and displays a view modal for a specific post.
 *
 * @param {string} postID - The ID of the post to view.
 * @returns {Promise<void>} - A promise that resolves when the view modal is built and displayed.
 */
export async function buildViewModal(postID) {
  const placeBidBtn = document.getElementById("submitBidBtn");
  const bidInput = document.getElementById("bidAmountInput");

  const { credits } = await userFetch();
  const listingData = await fetchById(postID);
  const headerText = document.getElementById("listingByIdHeader");
  const bodyContainer = document.getElementById("listingByIdBody");
  headerText.innerHTML = "";
  bodyContainer.innerHTML = "";

  const titleContainer = document.createElement("div");
  titleContainer.className = "w-100 d-flex flex-column justify-content-center";

  const headerTextLabel = document.createElement("small");
  headerTextLabel.className = "text-center text-primary bg-info";
  headerTextLabel.textContent = "Title:";

  const headerTitle = document.createElement("h2");
  headerTitle.className = "text-center text-primary";
  headerTitle.textContent = listingData.title;

  titleContainer.append(headerTextLabel);
  titleContainer.append(headerTitle);
  headerText.append(titleContainer);

  const sellerInfo = document.createElement("div");
  sellerInfo.className = "my-2";

  const mediaCarousel = document.createElement("div");
  mediaCarousel.className = "carousel slide";
  mediaCarousel.id = "mediaCarousel";
  mediaCarousel.setAttribute("data-bs-interval", "3000");
  mediaCarousel.setAttribute("data-bs-ride", "carousel");
  mediaCarousel.setAttribute("data-bs-touch", "true");
  mediaCarousel.setAttribute("data-bs-wrap", "true");
  mediaCarousel.setAttribute("data-bs-keyboard", "true");
  mediaCarousel.setAttribute("data-bs-pause", "hover");

  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";

  if (listingData.media && listingData.media.length > 0) {
    listingData.media.forEach((mediaUrl, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

      const carouselImg = document.createElement("img");
      carouselImg.className = "cardImgSizing d-block w-100";
      carouselImg.src = mediaUrl;
      carouselImg.alt = `Slide ${index + 1}`;
      carouselImg.loading = "lazy";

      carouselItem.append(carouselImg);
      carouselInner.append(carouselItem);
    });
  } else {
    const placeholderItem = document.createElement("div");
    placeholderItem.className = "carousel-item active";

    const placeholderImg = document.createElement("img");
    placeholderImg.className = "cardImgSizing d-block w-100";
    placeholderImg.src = placeholderImage;
    placeholderImg.alt = "Placeholder Image";
    placeholderImg.loading = "lazy";

    placeholderItem.append(placeholderImg);
    carouselInner.append(placeholderItem);
  }

  if (listingData.media.length > 1) {
    const carouselPrev = document.createElement("button");
    carouselPrev.className = "carousel-control-prev";
    carouselPrev.type = "button";
    carouselPrev.setAttribute("data-bs-target", "#mediaCarousel");
    carouselPrev.setAttribute("data-bs-slide", "prev");

    const carouselPrevIcon = document.createElement("span");
    carouselPrevIcon.className = "carousel-control-prev-icon";
    carouselPrevIcon.setAttribute("aria-hidden", "true");

    const carouselPrevText = document.createElement("span");
    carouselPrevText.className = "visually-hidden";
    carouselPrevText.textContent = "Previous";

    carouselPrev.append(carouselPrevIcon);
    carouselPrev.append(carouselPrevText);

    const carouselNext = document.createElement("button");
    carouselNext.className = "carousel-control-next";
    carouselNext.type = "button";
    carouselNext.setAttribute("data-bs-target", "#mediaCarousel");
    carouselNext.setAttribute("data-bs-slide", "next");

    const carouselNextIcon = document.createElement("span");
    carouselNextIcon.className = "carousel-control-next-icon";
    carouselNextIcon.setAttribute("aria-hidden", "true");

    const carouselNextText = document.createElement("span");
    carouselNextText.className = "visually-hidden";
    carouselNextText.textContent = "Next";

    carouselNext.append(carouselNextIcon);
    carouselNext.append(carouselNextText);

    const carouselIndicators = document.createElement("ol");
    carouselIndicators.className =
      "carousel-indicators custom-indicators rounded";

    listingData.media.forEach((_, index) => {
      const carouselIndicator = document.createElement("li");
      carouselIndicator.setAttribute("data-bs-target", "#mediaCarousel");
      carouselIndicator.setAttribute("data-bs-slide-to", index.toString());
      if (index === 0) {
        carouselIndicator.className = "active";
      }

      carouselIndicators.appendChild(carouselIndicator);
    });

    mediaCarousel.append(carouselPrev);
    mediaCarousel.append(carouselNext);
    mediaCarousel.append(carouselIndicators);
  }

  mediaCarousel.append(carouselInner);
  bodyContainer.append(mediaCarousel);

  const descriptionLabel = document.createElement("small");
  descriptionLabel.className = "text-muted mt-2";
  descriptionLabel.textContent = "Description:";
  bodyContainer.append(descriptionLabel);

  const description = document.createElement("p");
  description.className = "card-text";
  description.textContent = listingData.description;
  bodyContainer.append(description);

  const sellerLabel = document.createElement("small");
  sellerLabel.className = "text-muted";
  sellerLabel.textContent = "Seller:";
  const sellerInfoBox = document.createElement("div");
  sellerInfoBox.className = "d-flex gap-2 align-items-center";

  const sellerAvatar = document.createElement("img");
  sellerAvatar.className = "rounded-circle";
  sellerAvatar.src = listingData.seller.avatar;
  sellerAvatar.alt = "Seller Avatar";
  sellerAvatar.style.width = "50px";
  sellerAvatar.style.height = "50px";

  sellerAvatar.onerror = function () {
    this.src =
      "https://images.unsplash.com/photo-1496637721836-f46d116e6d34?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  };

  const seller = document.createElement("p");
  (seller.className = "card-text"), "fs-5";
  seller.textContent = listingData.seller.name;
  sellerInfo.append(sellerLabel);
  sellerInfo.append(sellerInfoBox);
  sellerInfoBox.append(sellerAvatar);
  sellerInfoBox.append(seller);
  bodyContainer.append(sellerInfo);

  const bidsLabel = document.createElement("small");
  bidsLabel.className = "text-muted";
  bidsLabel.textContent = "Bid History:";
  const bids = document.createElement("p");
  bids.className = "card-text";
  if (listingData.bids.length === 0) {
    bids.textContent = "No bids yet";
  } else {
    const bidList = listingData.bids;
    bidList.sort((a, b) => b.amount - a.amount);
    bidList.forEach((element) => {
      const bidDate = new Date(element.created);
      const day = bidDate.getDate();
      const month = bidDate.getMonth();
      const year = bidDate.getFullYear();
      const hour = bidDate.getHours();
      const minute = bidDate.getMinutes();
      const bidder = document.createElement("li");
      bidder.classList.add(
        "mx-4",
        "fs-6",
        "border-bottom",
        "mb-2",
        "border-1",
        "d-flex",
        "justify-content-between"
      );
      bidder.textContent = `${element.bidderName}: ${element.amount} Credit.`;
      bids.append(bidder);
      const bidPlacedDate = document.createElement("small");
      bidPlacedDate.classList.add("text-muted", "ms-4", "text-center");
      bidPlacedDate.textContent = `Bid placed: ${day}/${month}/${year} ${hour}:${minute}`;
      bidder.append(bidPlacedDate);
    });
    const leaderContainer = document.createElement("div");
    leaderContainer.classList.add(
      "d-flex",
      "flex-column",
      "justify-content-center"
    );
    const highestBidder = bidList[0].bidderName;
    highestBidder.toUpperCase();
    const leaderBoard = document.createElement("strong");
    leaderBoard.classList.add("m-auto", "text-muted");
    leaderBoard.textContent = `Current highest bidder:`;
    const highestBidderName = document.createElement("p");
    highestBidderName.classList.add(
      "text-center",
      "fs-3",
      "bg-primary",
      "text-secondary",
      "rounded"
    );
    highestBidderName.textContent = highestBidder;
    leaderContainer.append(leaderBoard);
    leaderContainer.append(highestBidderName);
    bodyContainer.append(leaderContainer);
  }

  const currentFounds = document.getElementById("availableFunds");
  currentFounds.textContent = credits;

  const biddingEndLabel = document.createElement("small");
  biddingEndLabel.className = "text-muted";
  biddingEndLabel.textContent = "Countdown:";
  const biddingEnd = document.createElement("p");
  biddingEnd.className = "card-text";
  const countdown = document.createElement("span");
  const time = listingData.endsAt;
  triggerCountdown(time, countdown);
  biddingEnd.append(countdown);
  bodyContainer.append(biddingEndLabel);
  bodyContainer.append(biddingEnd);
  bodyContainer.append(bidsLabel);
  bodyContainer.append(bids);

  placeBidBtn.addEventListener("click", (e) => {
    const spinner = document.getElementById("bidBtnSpinner");
    e.preventDefault();

    spinner.classList.remove("visually-hidden");
    createAndPlaceBid(postID, bidInput);

    spinner.classList.add("visually-hidden");
    placeBidBtn.textContent = "Success!";
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  });
}
