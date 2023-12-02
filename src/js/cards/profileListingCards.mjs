import { triggerCountdown } from "../API/utils/countdown.mjs";
import { formatDate } from "../API/utils/timeAndDate.mjs";

export function createListingAuctionCards(data) {
  const container = document.getElementById("container");

  const card = document.createElement("div");
  card.id = data.id;
  card.className = "card m-3 listingImg col-md-4 col-lg-4 col-xl-3";

  const cardBody = document.createElement("div");
  cardBody.className = "d-flex flex-column justify-content-between card-body";

  const imgContainer = document.createElement("div");

  const imgArray = data.media;

  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className =
    "d-flex justify-content-center thumbnailContainer";
  if (imgArray.length > 1) {
    const mainImage = document.createElement("img");
    mainImage.id = "mainImage";
    mainImage.className = "d-block cardImgSizing";
    mainImage.src = imgArray[0];
    mainImage.alt = "Main Image";
    imgContainer.append(mainImage);

    imgArray.forEach((src) => {
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
    });

    imgContainer.append(thumbnailContainer);
  } else if (imgArray.length === 1) {
    const img = document.createElement("img");
    img.className = "d-block cardImgSizing";
    img.src = imgArray[0];
    img.alt = "Image";
    imgContainer.append(img);
  } else {
    const noImageText = document.createElement("p");
    noImageText.textContent = "No images available.";
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
    tagElement.textContent = tag;
    listingTags.append(tagElement);
  });

  const btnContainer = document.createElement("div");
  btnContainer.className = "d-flex justify-content-end";
  const editBtn = document.createElement("a");
  editBtn.className = "btn btn-info border border-secondary mt-5";
  editBtn.textContent = "Edit";
  editBtn.href = "#";
  editBtn.disabled = true;
  btnContainer.append(editBtn);

  cardBody.append(imgContainer);
  cardBody.append(titleContainer);
  cardBody.append(textContainer);
  cardBody.append(priceContainer);
  cardBody.append(countdown);
  cardBody.append(listingTags);
  cardBody.append(btnContainer);
  card.append(cardBody);
  container.append(card);
}