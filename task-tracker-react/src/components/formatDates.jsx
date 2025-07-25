import { parseISO, format } from "date-fns";

function getReadableDate(isoDate) {
  if (!isoDate) return "No date";
  let date = parseISO(isoDate);
  let formattedDate = format(date, "d MMMM yyyy");
  return formattedDate;
}

export default getReadableDate;
