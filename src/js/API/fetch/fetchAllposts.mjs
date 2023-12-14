import { authListingsURL } from "/src/js/API/constants/urls.mjs";
import placeholderImage from "/src/images/placeholder.png"; // Ensure this path is correct

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

      if (response.status === 403) {
        console.error("403 Forbidden error occurred");
        break;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const posts = await response.json();

      // Iterate through posts and update image URLs
      const updatedPosts = posts.map((post) => {
        if (post.media && Array.isArray(post.media)) {
          post.media = post.media.map((url) =>
            url.startsWith("http://") ? placeholderImage : url
          );
        }
        return post;
      });

      allPostsArray = [...allPostsArray, ...updatedPosts];

      if (posts.length === 0 || posts.length < limit) {
        break;
      }

      if (allPostsArray.length > maxPosts) {
        allPostsArray = allPostsArray.slice(0, maxPosts);
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
