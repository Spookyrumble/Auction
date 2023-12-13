import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import { justBrowse } from "./listeners/landingPage.mjs";
import { formHandler } from "./handlers/formHandler.mjs";

/* eslint-disable no-unused-vars */
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";
/* eslint-enable no-unused-vars */

formHandler();
justBrowse();

function denyIndexIfLoggedIn() {
  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "/src/HTML/auction/index.html";
  }
}
denyIndexIfLoggedIn();
