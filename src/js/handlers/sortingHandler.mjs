/**
 * Sorts the data based on the selected sorting criteria.
 * @param {string} selectedValue - The selected sorting criteria ("created", "endsAt", "oldNew", "noBids", default).
 * @param {Object[]} data - The array of data objects to be sorted.
 * @returns {Object[]} - The sorted array of data objects.
 */
export function sortData(selectedValue, data) {
  const containerHeader = document.getElementById("auctionHeader");
  let sortedData = [...data];

  switch (selectedValue) {
    case "created":
      console.log("Sorting by created");
      sortedData.sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
      });

      break;
    case "endsAt":
      containerHeader.textContent = "Ending Auctions";
      console.log("Sorting by endsAt (excluding ended listings)");
      sortedData = sortedData.filter((listing) => {
        const endsAtDate = new Date(listing.endsAt);
        return endsAtDate > new Date();
      });
      sortedData.sort((a, b) => {
        const endsAtDateA = new Date(a.endsAt);
        const endsAtDateB = new Date(b.endsAt);
        const timeDifferenceA = endsAtDateA.getTime() - new Date().getTime();
        const timeDifferenceB = endsAtDateB.getTime() - new Date().getTime();

        return timeDifferenceA - timeDifferenceB;
      });
      break;
    case "oldNew":
      containerHeader.textContent = "Old Auctions";

      console.log("Sorting by oldNew");
      sortedData.sort((a, b) => {
        return new Date(a.created) - new Date(b.created);
      });
      break;
    case "noBids":
      containerHeader.textContent = "No Bid Auctions";
      console.log("Sorting by noBids");
      sortedData = sortedData.filter((item) => item.bids.length === 0);
      break;
    default:
      console.log("Sorting by default");
      sortedData.sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
      });
      break;
  }

  return sortedData;
}
