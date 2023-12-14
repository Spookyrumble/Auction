// import { fetchAllPosts } from "/src/js/API/fetch/fetchAllPosts.mjs";
// import { createAuctionCards } from "/src/js/cards/createCards.mjs";

// /**
//  * Filters the feed by fetching all posts, comparing their end date with the current date,
//  * and creating auction cards for the posts that meet the criteria.
//  * @returns {Promise<void>} A promise that resolves when the filtering is complete.
//  */
// export async function filterFeed() {
//   const allPosts = await fetchAllPosts();
//   const currentDateTime = new Date();

//   for (let i = 0; i < allPosts.length; i++) {
//     const endDateTime = new Date(allPosts[i].endsAt);
//     if (
//       allPosts[i].media.length > 0 &&
//       !allPosts[i].title.toLowerCase().includes("test") &&
//       endDateTime > currentDateTime
//     ) {
//       createAuctionCards(allPosts[i]);
//     }
//   }
// }
