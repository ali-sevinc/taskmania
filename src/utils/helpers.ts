const todayComparable = new Date()
  .toISOString()
  .slice(0, 10)
  .replaceAll(/-/g, "");

export function compareDate(date: string) {
  const dateString = date.replaceAll(/-/g, "");
  if (dateString === todayComparable) {
    return "today";
  }
  if (dateString > todayComparable) {
    return "upcoming";
  }
  return "past";
}

export function smallText(text: string, number: number) {
  if (text.length <= number) return text;
  const smalledText = text.slice(0, number) + " ...";
  return smalledText;
}

export function formatDate(date: string) {
  const dateString = new Date(date);
  const format = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return format.format(dateString);
}
