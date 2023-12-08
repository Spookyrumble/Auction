import { apiFetch } from "/src/js/API/fetch/authorizedFetch.mjs";
import { openListingsURL } from "../constants/urls.mjs";

export async function placeYourBid(listingId, amount) {
  try {
    const response = await apiFetch(
      `${openListingsURL}/${listingId}/bids`,
      "POST",
      amount
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
