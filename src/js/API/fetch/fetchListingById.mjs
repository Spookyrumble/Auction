import { apiFetch } from "./authorizedFetch.mjs";
import { openListingsURL } from "../constants/urls.mjs";

/**
 * Fetches a listing by its ID.
 * @param {string} id - The ID of the listing.
 * @returns {Promise} - A promise that resolves to the fetched listing.
 */
export async function fetchById(id) {
  try {
    const response = await apiFetch(
      `${openListingsURL}/${id}?_bids=true&_seller=true`,
      "GET"
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}
