import { openListingsURL } from "../constants/urls.mjs";
import { apiFetch } from "./authorizedFetch.mjs";

export async function postListing(listingObject) {
  try {
    const response = await apiFetch(openListingsURL, "POST", listingObject);

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
