import { apiFetch } from "./authorizedFetch.mjs";

export function createPost() {
  const form = document.getElementById("newListing");
  const btn = document.getElementById("submitBtn");
  const addTagBtn = document.getElementById("badgeAddBtn");
  const tagsInput = document.getElementById("tags");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("item");
    const title = titleInput.value;
    const descriptionInput = document.getElementById("description");
    const description = descriptionInput.value;
    const imageInput = document.getElementById("itemUrl");
    const image = imageInput.value;
    const endsAtInput = document.getElementById("date");
    const endsAt = endsAtInput.value;
    const endsAtDate = new Date(endsAt);

    const listingObject = {
      title,
      description,
      tags,
      media: [image],
      endsAtDate,
    };
    console.log(listingObject);
  });
  let tags = [];
  addTagBtn.addEventListener("click", () => {
    tags.push(tagsInput.value);
    tagsInput.value = "";
  });
}
