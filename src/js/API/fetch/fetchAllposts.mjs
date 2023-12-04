import { apiFetch } from "/src/js/API/fetch/authorizedFetch.mjs";
import { authListingsURL } from "/src/js/API/constants/urls.mjs";

export async function fetchAllPosts() {
  let allPostsArray = [];
  const limit = 100;
  let offset = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const response = await apiFetch(
      `${authListingsURL}&limit=${limit}&offset=${offset}`,
      "GET"
    );

    const posts = await response;

    if (posts.length === 0 || posts.length < limit) {
      allPostsArray = [...allPostsArray, ...posts];
      break;
    }

    allPostsArray = [...allPostsArray, ...posts];
    offset += limit;
  }

  return allPostsArray;
}
