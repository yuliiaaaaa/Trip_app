import { client } from "./clientApi";

export const getWeather = (
  location: string,
  date1: string,
  date2?: string,
  additional?: string
) => {
  return client.get(location, date1, date2, additional);
};

export function fahrenheitToCelsius(fahrenheit: number) {
  return ((fahrenheit - 32) * (5 / 9)).toFixed(0);
}

export const getDayOfWeek = (date: Date) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
};

export const getCurrentDateTime = () => {
  const now = new Date();
  const currentDate = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}`;
  const currentTime = now.toISOString().split("T")[1].substring(0, 8);
  const currentDateTime = `${currentDate}T${currentTime}`;
  return currentDateTime;
};

export function calculateStartDay(
  selectedTripStartDate: string,
  today: string,
  selectedTripLastDate: string
) {
  const isTodayWithinTripDates =
    new Date(selectedTripStartDate) < new Date(today) &&
    new Date(today) <= new Date(selectedTripLastDate);

  const startDay = isTodayWithinTripDates
    ? new Date(today).toISOString().split("T")[0]
    : selectedTripStartDate;

  return startDay;
}
