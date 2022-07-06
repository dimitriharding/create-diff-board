import { utcToZonedTime, format } from "date-fns-tz";

export const utcToZonedTimeFormat = (utcDate: string, pattern = "PP, p") => {
  if (utcDate) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(utcDate);
    const userTimeZoneDate = utcToZonedTime(date, userTimeZone);
    const formattedTimeZonedDate = format(userTimeZoneDate, pattern, {
      timeZone: userTimeZone,
    });
    return formattedTimeZonedDate;
  }

  return "";
};

export const msToTime = (ms: number) => {
  let seconds = (ms / 1000).toFixed(1) as unknown as number;
  let minutes = (ms / (1000 * 60)).toFixed(1) as unknown as number;
  let hours = (ms / (1000 * 60 * 60)).toFixed(1) as unknown as number;
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days";
};

export const fetchData = (path: string, cb: (data: Object) => void) => {
  fetch(path)
    .then((response) => response.json())
    .then((data) => cb(data));
};
