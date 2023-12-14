import { triggerCountdown } from "../API/utils/countdown.mjs";
import { formatDate } from "../API/utils/timeAndDate.mjs";
import placeholderImage from "/src/images/placeholder.png";
import { searchHandler } from "../handlers/searchHandler.mjs";
import { deleteListing } from "../API/fetch/deletePost.mjs";

/**
 * Creates listing auction cards based on the provided data.
 *
 * @param {Object} data - The data used to populate the card.
 */
export function createListingAuctionCards(data) {
  const container = document.getElementById("cardContainer");

  const card = document.createElement("div");
  card.id = data.id;
  card.className =
    "card m-3 listingImg col-sm-10 col-md-8 col-lg-6 col-xl-4 cardTarget";

  const cardBody = document.createElement("div");
  cardBody.className = "d-flex flex-column justify-content-between card-body";

  const imgContainer = document.createElement("div");
  imgContainer.className = "cardImgContainer";
  const imgArray = data.media;

  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className =
    "d-flex justify-content-center thumbnailContainer";
  const uniqueUrls = new Set(); // Create a set to store unique URLs

  if (imgArray.length > 1) {
    const mainImage = document.createElement("img");
    mainImage.id = "mainImage";
    mainImage.className = "d-block cardImgSizing";
    mainImage.src = imgArray[0];
    mainImage.alt = "Main Image";
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
        thumbnail.alt = `Thumbnail  ${src}`;
        thumbnail.className = "img-thumbnail";
        thumbnail.style.width = "50px";
        thumbnail.style.height = "52px";
        thumbnail.style.cursor = "pointer";
        thumbnail.onclick = function () {
          mainImage.src = src;
          mainImage.alt = "Main Image";
        };
        thumbnailContainer.append(thumbnail);
        thumbnail.onerror = function () {
          thumbnail.src = placeholderImage;
          thumbnail.alt = `Thumbnail ${src}`;
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
  const bidCountNr = data.bids.length;
  bidCount.textContent = `Current bids: ${bidCountNr}`;
  bids.append(bidCount);

  const listingTags = document.createElement("div");
  listingTags.className = "d-flex flex-wrap align-items-center";
  const tagLabel = document.createElement("small");
  tagLabel.className = "text-muted";
  tagLabel.textContent = "Tags: ";
  listingTags.append(tagLabel);

  const tags = data.tags;
  tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "badge bg-secondary m-1";
    tagElement.style.cursor = "pointer";
    tagElement.textContent = tag;
    listingTags.append(tagElement);
  });

  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-group dropup d-flex justify-content-end";
  const cogIcon = document.createElement("i");
  cogIcon.className = "bi bi-gear-fill fs-4 dropdown-toggle";
  cogIcon.style.cursor = "pointer";
  cogIcon.setAttribute("aria-label", "Edit");
  cogIcon.setAttribute("data-bs-toggle", "dropdown"); // For Bootstrap 4
  cogIcon.setAttribute("aria-bs-haspopup", "true");
  cogIcon.setAttribute("aria-bs-expanded", "false");

  const dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-menu dropdown-menu-end";
  const dropdownMenuItems = document.createElement("a");
  dropdownMenuItems.className = "dropdown-item text-danger text-center";
  dropdownMenuItems.href = "#";
  dropdownMenuItems.textContent = "Delete";
  btnContainer.append(cogIcon);
  dropdownMenu.append(dropdownMenuItems);
  btnContainer.append(dropdownMenu);

  dropdownMenuItems.addEventListener("click", (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this listing?")) {
      deleteListing(data.id);
      window.location.reload();
    } else {
      window.alert("Listing not deleted.");
    }
  });

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
