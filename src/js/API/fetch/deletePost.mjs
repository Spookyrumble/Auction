import { apiFetch } from "./authorizedFetch.mjs";
import { openListingsURL } from "../constants/urls.mjs";

/**
 * Deletes a listing with the specified listing ID.
 * @param {string} listingId - The ID of the listing to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the listing is successfully deleted.
 */
export async function deleteListing(listingId) {
  try {
    await apiFetch(`${openListingsURL}/${listingId}`, "DELETE");
    console.log("The listing has been successfully deleted");
  } catch (error) {
    console.log(error);
  }
}
