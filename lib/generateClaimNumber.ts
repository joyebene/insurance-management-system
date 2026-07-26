export function generateClaimNumber() {
  const date = new Date();

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `CLM-${date.getFullYear()}${String(
    date.getMonth() + 1
  ).padStart(2, "0")}${String(
    date.getDate()
  ).padStart(2, "0")}-${random}`;
}