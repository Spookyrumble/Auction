/* eslint-disable no-undef */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    correctEmail: "spooky@noroff.no",
    correctPassword: "auctionhouse",
    wrongEmail: "wrongEmail@wrong.wrong",
    wrongPassword: "wrongPassword",
    shortPassword: "short",
  },
  e2e: {
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});
