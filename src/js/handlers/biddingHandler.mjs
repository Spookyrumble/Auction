import { placeYourBid } from "/src/js/API/fetch/biddingFetch.mjs";

/**
 * Creates and places a bid for a specific post.
 * @param {string} postId - The ID of the post to bid on.
 * @param {HTMLInputElement} inputElement - The input element containing the bid amount.
 */
export function createAndPlaceBid(postId, inputElement) {
  const bidAmount = inputElement.value;
  const bidAmountNumber = parseInt(bidAmount);
  const bidAmountObject = {
    amount: bidAmountNumber,
  };
  placeYourBid(postId, bidAmountObject);
}
