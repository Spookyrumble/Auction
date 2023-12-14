import { triggerCountdown } from "../API/utils/countdown.mjs";
import { formatDate } from "../API/utils/timeAndDate.mjs";
import placeholderImage from "/src/images/placeholder.png";
import { searchHandler } from "../handlers/searchHandler.mjs";
import { buildViewModal } from "../handlers/viewMoreModal.mjs";

const container = document.getElementById("cardContainer");

searchHandler(container);

export function createAuctionCards(data) {
  const loader = document.getElementById("loader");
  loader.classList.add("d-none");

  const card = document.createElement("div");
  card.className =
    "card m-3 listingImg col-sm-10 col-md-8 col-lg-6 col-xl-4 cardTarget";
  card.style.textDecoration = "none";

  const cardBody = document.createElement("div");
  cardBody.className = "d-flex flex-column justify-content-between card-body";

  const imgContainer = document.createElement("div");
  imgContainer.className = "cardImgContainer";

  const imgArray = data.media;
  imgArray.onerror = function () {
    imgArray.src = placeholderImage;
  };

  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className =
    "d-flex justify-content-center thumbnailContainer";
  const uniqueUrls = new Set();

  if (imgArray.length > 1) {
    const mainImage = document.createElement("img");
    mainImage.id = "mainImage";
    mainImage.className = "d-block cardImgSizing";
    mainImage.src = imgArray[0];
    mainImage.loading = "lazy";
    mainImage.alt = `Main Image ${imgArray[0]}`;
    mainImage.onerror = function () {
      mainImage.src = placeholderImage;
      mainImage.alt = "Main Image Placeholder";
    };
    imgContainer.append(mainImage);

    imgArray.forEach((src) => {
      if (!uniqueUrls.has(src)) {
        uniqueUrls.add(src);

        const thumbnail = document.createElement("img");
        thumbnail.src = src;
        thumbnail.loading = "lazy";
        thumbnail.alt = `Thumbnail ${src}`;
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
          thumbnail.loading = "lazy";
          thumbnail.alt = "Thumbnail Placeholder";
        };
      }
    });

    imgContainer.append(thumbnailContainer);
  } else if (imgArray.length === 1) {
    const img = document.createElement("img");
    img.className = "d-block cardImgSizing";
    img.src = imgArray[0];
    img.loading = "lazy";
    img.alt = `Image ${imgArray[0]}`;
    img.onerror = function () {
      img.src = placeholderImage;
      img.alt = "Image Placeholder";
      img.loading = "lazy";
    };
    imgContainer.append(img);
  } else {
    const noImageText = document.createElement("img");
    noImageText.className = "d-block cardImgSizing";
    noImageText.src = placeholderImage;
    noImageText.loading = "lazy";
    noImageText.alt = "No Image placeholder";
    imgContainer.append(noImageText);
  }

  const titleContainer = document.createElement("div");
  titleContainer.className = "my-2";
  const titleLabel = document.createElement("small");
  titleLabel.className = "text-muted";
  titleLabel.textContent = "Title:";
  const cardTitle = document.createElement("h3");
  cardTitle.className = "card-title";
  cardTitle.textContent = data.title;
  if (data.title === "") {
    cardTitle.textContent = "No title";
  }
  cardTitle.textContent = `${data.title.substring(0, 20)}...`;

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

  const token = localStorage.getItem("accessToken");
  const viewMoreBtn = document.createElement("button");
  viewMoreBtn.className =
    "btn btn-info border border-secondary mt-5 ms-2 text-white";
  viewMoreBtn.textContent = "View Bids";
  if (token) {
    viewMoreBtn.setAttribute("data-bs-target", "#listingByIdModal");
    viewMoreBtn.setAttribute("data-bs-toggle", "modal");
  } else {
    viewMoreBtn.setAttribute("data-bs-target", "#loggedInModal");
    viewMoreBtn.setAttribute("data-bs-toggle", "modal");
  }
  viewMoreBtn.addEventListener("click", () => {
    if (token) {
      buildViewModal(data.id);
    } else {
      viewMoreBtn.click();
    }
  });

  btnContainer.append(viewMoreBtn);
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
