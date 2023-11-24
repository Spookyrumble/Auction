import { triggerCountdown } from "../API/utils/countdown.mjs";

export function createAuctionCards(data) {
  const container = document.getElementById("cardContainer");

  const card = document.createElement("div");
  card.id = data.id;
  card.className = "card m-3 listingImg col-12 col-md-6 col-lg-4 col-xl-3";

  const cardBody = document.createElement("div");
  cardBody.className = "d-flex flex-column justify-content-between card-body";

  const imgContainer = document.createElement("div");
  imgContainer.className = "d-block w-100";

  const imgArray = data.media;
  console.log(data);

  if (imgArray.length > 0) {
    // Create carousel structure
    const carousel = document.createElement("div");
    carousel.id = "carouselExampleSlidesOnly";
    carousel.className = "carousel slide";
    carousel.setAttribute("data-bs-ride", "carousel");

    const carouselInner = document.createElement("div");
    carouselInner.className = "carousel-inner";
    carousel.append(carouselInner);

    // Loop through the images
    for (let i = 0; i < imgArray.length; i++) {
      const carouselItem = document.createElement("div");
      carouselItem.className = "carousel-item";
      if (i === 0) {
        carouselItem.classList.add("active");
      }

      const img = document.createElement("img");
      img.className = "img-fluid";
      img.src = imgArray[i];
      img.alt = `Image ${i}`;

      carouselItem.append(img);
      carouselInner.append(carouselItem);
    }

    // Append the carousel to a container
    imgContainer.append(carousel);
  } else if (imgArray.length >= 0) {
    const img = document.createElement("img");
    img.className = "d-block w-100";
    img.src = "https://via.placeholder.com/150";
    img.alt = "placeholder";
    imgContainer.append(img);
  }

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = data.title;
  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = data.description;
  const cardPrice = document.createElement("p");
  cardPrice.className = "card-text";
  cardPrice.textContent = data.price;

  const countdown = document.createElement("div");
  countdown.classList = "countdown";
  const time = data.endsAt;
  cardBody.append(countdown);
  triggerCountdown(time);

  const bidBtn = document.createElement("a");
  bidBtn.className = "btn btn-info border border-secondary";
  bidBtn.textContent = "Bid Now";
  bidBtn.href = "#";

  cardBody.append(imgContainer);
  cardBody.append(cardTitle);
  cardBody.append(cardText);
  cardBody.append(cardPrice);
  // cardBody.append(countdownContainer);
  cardBody.append(bidBtn);
  card.append(cardBody);
  container.append(card);
}
