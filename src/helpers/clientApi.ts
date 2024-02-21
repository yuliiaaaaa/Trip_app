const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
type RequestMethod = "GET";
const API_KEY = "559HZ8KRKHF6WAZ9QR357KW7X";

function request<T>(
  location: string,
  date1: string,
  date2: string,
  additional:string,
  method: RequestMethod = "GET"
): Promise<T> {
  const url = `${BASE_URL}/${location}/${date1}/${date2}?key=${API_KEY}&${additional}`;
  const options: RequestInit = { method };
  return fetch(url, options).then((response) => response.json());
}

export const client = {
  get: <T>(
    location: string,
    date1: string,
    date2: string = "",
    additional: string = ""
  ) => request<T>(location, date1, date2, additional),
};
