import { openListingsURL } from "../constants/urls.mjs";
import { apiFetch } from "./authorizedFetch.mjs";

const loader = document.getElementById("previewBtnSpinner");
const btn = document.getElementById("submitBtn");

/**
 * Posts a listing object to the server.
 * @param {Object} listingObject - The listing object to be posted.
 * @returns {Promise} - A promise that resolves with the server response.
 */
export async function postListing(listingObject) {
  loader.classList.remove("visually-hidden");
  try {
    const response = await apiFetch(openListingsURL, "POST", listingObject);
    loader.classList.add("visually-hidden");
    btn.textContent = "Success!";
    window.location.reload();
    return response;
  } catch (error) {
    console.log(error);
  }
}
