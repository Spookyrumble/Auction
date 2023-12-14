import { apiFetch } from "/src/js/API/fetch/authorizedFetch.mjs";
import { openListingsURL } from "../constants/urls.mjs";

/**
 * Places a bid on a listing.
 * @param {string} listingId - The ID of the listing.
 * @param {object} object - The bid object containing the bid details.
 * @returns {Promise<void>} - A promise that resolves when the bid is placed successfully.
 */
export async function placeYourBid(listingId, object) {
  try {
    const response = await apiFetch(
      `${openListingsURL}/${listingId}/bids`,
      "POST",
      object
    );
    console.log(response, object);
  } catch (error) {
    console.log(error);
  }
}
