export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB");
}
