import { placeYourBid } from "/src/js/API/fetch/biddingFetch.mjs";

export function createAndPlaceBid(postId, inputElement) {
  const bidAmount = inputElement.value;
  const bidAmountNumber = parseInt(bidAmount);
  const bidAmountObject = {
    amount: bidAmountNumber,
  };
  placeYourBid(postId, bidAmountObject);
}
