import { apiFetch } from "/src/js/API/fetch/authorizedFetch.mjs";
import { openListingsURL } from "../constants/urls.mjs";

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
