/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";
import { fetchOpenListings } from "./API/fetch/noAuthFetch.mjs";
import { createAuctionCards } from "/src/js/cards/createCards.mjs";
import { end } from "@popperjs/core";
import { previewInit } from "./handlers/cardPreview.mjs";

async function init() {
  const array = await fetchOpenListings();
  // console.log(array);
  const currentDateTime = new Date();

  for (let i = 0; i < array.length; i++) {
    const endDateTime = new Date(array[i].endsAt);
    if (
      array[i].media.length > 0 &&
      !array[i].title.toLowerCase().includes("test") &&
      endDateTime > currentDateTime
    ) {
      createAuctionCards(array[i]);
    }
  }
}

init();
previewInit();
