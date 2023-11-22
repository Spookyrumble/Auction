export function createDynamicCarousel(containerId, images) {
  // Create the main carousel div
  const carouselDiv = document.createElement("div");
  carouselDiv.id = containerId;
  carouselDiv.className = "carousel slide";
  carouselDiv.setAttribute("data-ride", "carousel");

  // Create the carousel indicators
  const ol = document.createElement("ol");
  ol.className = "carousel-indicators";
  images.forEach((_, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-target", `#${containerId}`);
    li.setAttribute("data-slide-to", index);
    if (index === 0) li.className = "active";
    ol.append(li);
  });

  // Create the carousel-inner div
  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";
  images.forEach((image, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

    const img = document.createElement("img");
    img.className = "d-block w-100";
    img.src = image.url; // Assuming image is an object with a 'url' property
    img.alt = image.alt || `Slide ${index + 1}`;

    carouselItem.append(img);
    carouselInner.append(carouselItem);
  });

  // Function to create carousel controls
  function createCarouselControl(direction) {
    const a = document.createElement("a");
    a.className = `carousel-control-${direction}`;
    a.href = `#${containerId}`;
    a.role = "button";
    a.setAttribute("data-slide", direction);

    const spanIcon = document.createElement("span");
    spanIcon.className = `carousel-control-${direction}-icon`;
    spanIcon.setAttribute("aria-hidden", "true");

    const spanText = document.createElement("span");
    spanText.className = "sr-only";
    spanText.textContent = direction === "prev" ? "Previous" : "Next";

    a.append(spanIcon);
    a.append(spanText);
    return a;
  }

  carouselDiv.append(ol);
  carouselDiv.append(carouselInner);
  carouselDiv.append(createCarouselControl("prev"));
  carouselDiv.append(createCarouselControl("next"));

  // Append the carousel to the container
  const container = document.getElementById(containerId);
  container.append(carouselDiv);
}
