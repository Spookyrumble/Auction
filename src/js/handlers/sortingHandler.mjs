export function sortData(selectedValue, data) {
  let sortedData = [...data];

  switch (selectedValue) {
    case "created":
      console.log("Sorting by created");
      sortedData.sort((a, b) => {
        return new Date(a.created) - new Date(b.created); // Example: Sorting based on createdAt property
      });
      break;
    case "endsAt":
      console.log("Sorting by endsAt");
      sortedData.sort((a, b) => {
        const currentDate = new Date(); // Current date and time
        const endsAtDateA = new Date(a.endsAt);
        const endsAtDateB = new Date(b.endsAt);

        // Calculate differences in milliseconds from the current date
        const timeDifferenceA = endsAtDateA.getTime() - currentDate.getTime();
        const timeDifferenceB = endsAtDateB.getTime() - currentDate.getTime();

        // Sort based on the difference (ascending order - closest to furthest)
        return timeDifferenceA - timeDifferenceB;
      });
      break;
    case "oldNew":
      console.log("Sorting by oldNew");
      sortedData.sort((b, a) => {
        return new Date(b.created) - new Date(a.created); // Example: Sorting based on createdAt property
      });
      break;
    case "noBids":
      console.log("Sorting by noBids");
      sortedData = sortedData.filter((item) => item.bids.length === 0); // Assuming bids is an array property
      break;
    default:
      console.log("Sorting by default");
      sortedData.sort((a, b) => {
        return new Date(b.created) - new Date(a.created); // Example: Sorting based on createdAt property
      });
      break;
  }

  return sortedData;
}
