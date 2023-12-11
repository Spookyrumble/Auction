/**
 * Handles the search functionality.
 */
export function searchHandler() {
  const searchInput = document.getElementById("searchInput");
  const cardContainer = document.getElementById("cardContainer");
  const pinnedTagsContainer = document.getElementById("pinnedBadgeContainer");

  searchInput.addEventListener("keyup", (event) => {
    const searchValue = event.target.value.toLowerCase();
    pinnedTagsContainer.textContent = "";
    filterCards(searchValue);
  });

  cardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("badge")) {
      const clickedTag = event.target.textContent.toLowerCase();
      togglePinnedTag(clickedTag);
      filterByTag(clickedTag);
    }
  });

  const filterCards = (searchValue) => {
    const cards = cardContainer.querySelectorAll(".cardTarget");

    cards.forEach((card) => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      const description = card
        .querySelector(".card-text")
        .textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll(".badge")).map((tag) =>
        tag.textContent.toLowerCase()
      );

      if (
        title.includes(searchValue) ||
        description.includes(searchValue) ||
        tags.some((tag) => tag.includes(searchValue))
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  const createPinnedTag = (searchValue) => {
    const existingPinnedTag = document.querySelector(".pinned-tag");
    if (
      !existingPinnedTag ||
      existingPinnedTag.textContent.toLowerCase() !== searchValue
    ) {
      const pinnedTag = document.createElement("div");
      pinnedTag.className = `badge bg-secondary mx-2 fs-6 fw-normal`;
      pinnedTag.textContent = `${searchValue}`;

      const closeButton = document.createElement("i");
      closeButton.className = "bi bi-trash3 ms-2";
      closeButton.setAttribute("aria-label", "Close");
      closeButton.style.cursor = "pointer";
      closeButton.addEventListener("click", () => {
        pinnedTag.remove();
        searchInput.value = "";
        filterCards("");
      });

      pinnedTag.appendChild(closeButton);
      pinnedTagsContainer.innerHTML = ""; // Remove any existing pinned tags
      pinnedTagsContainer.appendChild(pinnedTag);
      filterByTag(searchValue); // Search by pinned tag when created
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      filterByTag(searchValue); // Search by pinned tag if the badge already exists
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  cardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("badge")) {
      const clickedTag = event.target.textContent.toLowerCase();
      createPinnedTag(clickedTag); // Create or search by the clicked tag
    }
  });

  const togglePinnedTag = (clickedTag) => {
    let existingPinnedTag = null;
    const pinnedTags = pinnedTagsContainer.getElementsByClassName("badge");

    for (let tag of pinnedTags) {
      if (tag.textContent.toLowerCase() === clickedTag) {
        existingPinnedTag = tag;
        break;
      }
    }

    if (existingPinnedTag) {
      existingPinnedTag.remove();
      searchInput.value = "";
      filterCards("");
    } else {
      createPinnedTag(clickedTag);
    }
  };

  const filterByTag = (clickedTag) => {
    const cards = cardContainer.querySelectorAll(".cardTarget");

    cards.forEach((card) => {
      const tags = Array.from(card.querySelectorAll(".badge")).map((tag) =>
        tag.textContent.toLowerCase()
      );

      if (tags.includes(clickedTag)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };
}
