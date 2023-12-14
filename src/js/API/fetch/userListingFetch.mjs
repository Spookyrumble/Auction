import { apiFetch } from "./authorizedFetch.mjs";
import { userURL } from "../constants/urls.mjs";

/**
 * Fetches the listings of a specific user.
 * @param {string} user - The username of the user.
 * @returns {Promise} - A promise that resolves to the response from the API.
 */
export async function userListing(user) {
  try {
    const response = await apiFetch(
      `${userURL}/${user}/listings?_bids=true`,
      "GET"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
