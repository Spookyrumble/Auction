/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/styles.scss";
import { justBrowse } from "./listeners/landingPage.mjs";
import { formHandler } from "./handlers/formHandler.mjs";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";

formHandler();
justBrowse();
