/**
 * Handles the search functionality.
 */
export function searchHandler() {
  const searchInput = document.getElementById("searchInput");
  const cardContainer = document.getElementById("cardContainer");

  searchInput.addEventListener("keyup", (event) => {
    const searchValue = event.target.value.toLowerCase();
    filterCards(searchValue);
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

  cardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("badge")) {
      const clickedTag = event.target.textContent.toLowerCase();
      filterByTag(clickedTag);
    }
  });

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
