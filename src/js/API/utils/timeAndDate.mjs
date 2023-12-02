export function formatDate(timeString) {
  const date = new Date(timeString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${String(day).padStart(2, "0")}.${String(month).padStart(
    2,
    "0"
  )}.${year}`;
}
