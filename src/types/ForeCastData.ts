export type ForecastDay = {
  cloudcover: number;
  conditions: string;
  datetime: string;
  datetimeEpoch: number;
  description: string;
  dew: number;
  feelslike: number;
  feelslikemax: number;
  feelslikemin: number;
  humidity: number;
  icon: string;
  moonphase: number;
  precip: number;
  precipcover: number;
  precipprob: number;
  pressure: number;
  severerisk: number;
  snow: number;
  snowdepth: number;
  solarenergy: number;
  solarradiation: number;
  source: string;
  stations: null;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  temp: number;
  tempmax: number;
  tempmin: number;
  uvindex: number;
  visibility: number;
  winddir: number;
  windgust: number;
  windspeed: number;
};

export type ForecastData = {
  address: string;
  days: ForecastDay[];
  latitude: number;
  longitude: number;
  queryCost: number;
  resolvedAddress: string;
  timezone: string;
  tzoffset: number;
};
