// export function searchHandler() {
//   const searchInput = document.getElementById("searchInput");

//   searchInput.addEventListener("keyup", (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     console.log(searchValue);
//     const items = resultsContainer.getElementsByTagName("p");

//     // Loop through each item to check if it matches the search value
//     Array.from(items).forEach((item) => {
//       const textContent = item.textContent.toLowerCase(); // Get the text content of each item and convert to lowercase

//       // If the search value is found in the text content, show the item; otherwise, hide it
//       if (textContent.includes(searchValue)) {
//         item.style.display = "block"; // Show the item
//       } else {
//         item.style.display = "none"; // Hide the item
//       }
//     });
//   });
// }
