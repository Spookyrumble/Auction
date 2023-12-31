/**
 * Triggers a countdown timer that updates the specified element with the remaining time until a given end time.
 * @param {string} time - The end time of the countdown in a valid date string format.
 * @param {HTMLElement} elementToUpdate - The HTML element to update with the countdown timer.
 * @returns {void}
 */
export function triggerCountdown(time, elementToUpdate) {
  const end = new Date(time);
  const interval = setInterval(function () {
    const now = new Date();
    const difference = end - now;

    if (difference <= 0) {
      clearInterval(interval);
      elementToUpdate.innerText = "Auction closed";
      elementToUpdate.classList.add("text-danger");
      return;
    }

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    elementToUpdate.innerText = `Auction ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    elementToUpdate.classList.add("text-success");
  }, 1000);
}
