export function startCountdown(endTime) {
  const end = new Date(endTime);

  const interval = setInterval(function () {
    const now = new Date();
    const difference = end - now;

    if (difference <= 0) {
      clearInterval(interval);
      document.querySelectorAll(".countdown").innerText = "Countdown ended";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.querySelectorAll(".countdown").innerText =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  }, 1000);
}

export function triggerCountdown(endsAt) {
  // Ensure the countdown element is present
  if (document.querySelectorAll(".countdown")) {
    startCountdown(endsAt);
  } else {
    console.error("Countdown element not found");
  }
}
