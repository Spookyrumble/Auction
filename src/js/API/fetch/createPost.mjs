import { postListing } from "./postListingFetch.mjs";

/**
 * Creates a post by gathering input values from the DOM and sending a POST request.
 */
export function createPost() {
  const btn = document.getElementById("submitBtn");
  const addTagBtn = document.getElementById("badgeAddBtn");
  const tagsInput = document.getElementById("tags");
  const addImageBtn = document.getElementById("addImgBtn");
  const imageInput = document.getElementById("itemUrl");
  const addImageBadge = document.getElementById("addBadge");
  const addTagsBadge = document.getElementById("tagBadge");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("item");
    const title = titleInput.value;
    const descriptionInput = document.getElementById("description");
    const description = descriptionInput.value;
    const endsAtInput = document.getElementById("date");
    const endsAt = endsAtInput.value;

    const listingObject = {
      title,
      description,
      tags,
      media,
      endsAt,
    };
    if (imageInput.value !== "") {
      media.push(imageInput.value);
      imageInput.value = "";
      imgCount++;
      addImageBadge.textContent = imgCount;
      addImageBadge.classList.remove("d-none");
    }
    if (tagsInput.value !== "") {
      tags.push(tagsInput.value);
      tagsInput.value = "";
      tagCount++;
      addTagsBadge.textContent = tagCount;
      addTagsBadge.classList.remove("d-none");
    }
    postListing(listingObject);
  });
  let tags = [];
  let tagCount = 0;

  addTagBtn.addEventListener("click", () => {
    if (tagsInput.value !== "") {
      tags.push(tagsInput.value);
      tagsInput.value = "";
      tagCount++;
      addTagsBadge.textContent = tagCount;
      addTagsBadge.classList.remove("d-none");
    } else {
      tags = [];
      addTagsBadge.classList.add("d-none");
    }
  });

  let media = [];
  let imgCount = 0;

  addImageBtn.addEventListener("click", () => {
    if (imageInput.value !== "") {
      media.push(imageInput.value);
      imageInput.value = "";
      imgCount++;
      addImageBadge.textContent = imgCount;
      addImageBadge.classList.remove("d-none");
    } else {
      media = [];
      addImageBadge.classList.add("d-none");
    }
  });
}
