/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import { containerHandler } from "./listeners/profileFormListener.mjs";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";

containerHandler();

const listForm = document.getElementById("newListing");
listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(listForm);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
});
