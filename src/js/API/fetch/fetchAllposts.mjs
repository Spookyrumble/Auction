import { authListingsURL } from "/src/js/API/constants/urls.mjs";

export async function fetchAllPosts() {
  const token = localStorage.getItem("accessToken");

  let allPostsArray = [];
  const limit = 100;
  let offset = 0;

  const maxPosts = 500;

  try {
    const headers = token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {};

    const baseUrl = token
      ? `${authListingsURL}&sort=created&_listings=true`
      : authListingsURL;

    while (allPostsArray.length < maxPosts) {
      const response = await fetch(
        `${baseUrl}&limit=${limit}&offset=${offset}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const posts = await response.json();

      if (posts.length === 0 || posts.length < limit) {
        allPostsArray = [...allPostsArray, ...posts];
        break;
      }

      allPostsArray = [...allPostsArray, ...posts];
      if (allPostsArray.length > maxPosts) {
        allPostsArray = allPostsArray.slice(0, maxPosts); // Cut off any excess posts
        break;
      }
      offset += limit;
    }

    return allPostsArray;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
