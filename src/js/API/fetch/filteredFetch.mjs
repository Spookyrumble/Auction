import { fetchAllPosts } from "/src/js/API/fetch/fetchAllPosts.mjs";
import { createAuctionCards } from "/src/js/cards/createCards.mjs";

export async function filterFeed() {
  const allPosts = await fetchAllPosts();
  const currentDateTime = new Date();

  for (let i = 0; i < allPosts.length; i++) {
    const endDateTime = new Date(allPosts[i].endsAt);
    if (
      allPosts[i].media.length > 0 &&
      !allPosts[i].title.toLowerCase().includes("test") &&
      endDateTime > currentDateTime
    ) {
      createAuctionCards(allPosts[i]);
    }
  }
}
