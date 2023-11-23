/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";
import { fetchOpenListings } from "./API/fetch/noAuthFetch.mjs";
import { createAuctionCards } from "/src/js/cards/createCards.mjs";

// const auctionArray = fetchOpenListings();
// console.log(auctionArray);

// createAuctionCards(auctionArray);

async function init() {
  const array = await fetchOpenListings();
  for (let i = 0; i < array.length; i++) {
    createAuctionCards(array[i]);
  }
}

init();
