export type CurrentWeatherData = {
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description: string;
  days: {
    datetime: string;
    datetimeEpoch: number;
    temp: number;
    feelslike: number;
    stations: Record<string, any>;
    source: string;
    hours: {
      datetime: string;
    }[];
  }[];
  alerts: {
    event: string;
    description: string;
  }[];
  currentConditions: {
    datetime: string;
    datetimeEpoch: number;
    temp: number;
    icon: string;
  };
};
