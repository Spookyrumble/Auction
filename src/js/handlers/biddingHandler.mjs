import { placeYourBid } from "/src/js/API/fetch/biddingFetch.mjs";

export function populateBiddingModal(data) {
  const biddingInfo = document.getElementById("listingInfoContainer");
  biddingInfo.innerHTML = "";
  const itemIdLabel = document.createElement("small");
  itemIdLabel.classList.add("text-muted");
  itemIdLabel.textContent = "Item Id:";
  biddingInfo.append(itemIdLabel);
  const itemId = document.createElement("p");
  itemId.className = "card-text";
  itemId.textContent = data.id;
  biddingInfo.append(itemId);
  const biddingLengthLabel = document.createElement("small");
  biddingLengthLabel.classList.add("text-muted");
  biddingLengthLabel.textContent = "Number of bids:";
  biddingInfo.append(biddingLengthLabel);
  const biddingLength = document.createElement("p");
  biddingLength.classList.add("card-text");
  biddingLength.textContent = data._count.bids;
  biddingInfo.append(biddingLength);
  const biddingHistoryLabel = document.createElement("small");
  biddingHistoryLabel.classList.add("text-muted");
  biddingHistoryLabel.textContent = "Bidding history:";
  const theBids = data.bids;
  const biddingHistory = document.createElement("ul");
  biddingHistory.classList.add("list-group", "border-none", "mb-3");

  if (theBids !== 0) {
    theBids.forEach((element) => {
      const bidder = document.createElement("li");
      bidder.classList.add("mx-4", "fs-6");
      bidder.textContent = `${element.bidderName} bid ${element.amount} Credits`;
      biddingInfo.append(biddingHistoryLabel);
      biddingHistory.append(bidder);
      biddingInfo.append(biddingHistory);
    });
  } else {
    biddingHistoryLabel.textContent = "No bidding history:";
  }
  const placeBid = document.getElementById("biddingBtnText");
  const listingId = data.id;

  placeBid.addEventListener("click", (e) => {
    e.preventDefault();
    const bidInput = document.getElementById("bidInput");
    const loadIndicator = document.getElementById("biddingBtnSpinner");
    const loaderText = document.getElementById("biddingBtnText");
    const closeBtn = document.getElementById("biddingModalCloseBtn");
    closeBtn.classList.add("visually-hidden");
    loaderText.textContent = "Please Wait...";
    loadIndicator.classList.remove("visually-hidden");
    const bidAmount = bidInput.value;
    const parsedAmount = parseInt(bidAmount);
    const bid = {
      amount: parsedAmount,
    };
    console.log(bid);
    console.log(listingId);
    placeYourBid(listingId, bid);
    loaderText.textContent = "Done!";
    loadIndicator.classList.add("visually-hidden");
  });
}
