import { apiFetch } from "./authorizedFetch.mjs";
import { openListingsURL } from "../constants/urls.mjs";

export async function deleteListing(listingId) {
  try {
    await apiFetch(`${openListingsURL}/${listingId}`, "DELETE");
    console.log("The listing has been successfully deleted");
  } catch (error) {
    console.log(error);
  }
}
