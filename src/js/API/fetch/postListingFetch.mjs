import { openListingsURL } from "../constants/urls.mjs";
import { apiFetch } from "./authorizedFetch.mjs";

const loader = document.getElementById("previewBtnSpinner");
const btn = document.getElementById("submitBtn");

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
