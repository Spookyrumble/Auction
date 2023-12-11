import { authListingsURL } from "/src/js/API/constants/urls.mjs";

export async function fetchAllPosts() {
  const token = localStorage.getItem("accessToken");

  let allPostsArray = [];
  const limit = 100;
  let offset = 0;

  if (!token) {
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const response = await fetch(
          `${authListingsURL}&limit=${limit}&offset=${offset}`
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
        offset += limit;
      }

      return allPostsArray;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  } else {
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const response = await fetch(
          `${authListingsURL}&limit=${limit}&offset=${offset}&sort=created`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
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
        offset += limit;
      }

      return allPostsArray;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }
}
