import React from "react";
import { fahrenheitToCelsius, getDayOfWeek } from "../helpers/WeatherMethods";
import { weatherIcons } from "../helpers/WeatherIcons";
import { ForecastDay } from "../types/ForeCastData";
type Props = {
  tripWeather: ForecastDay;
};

export const TripDetails: React.FC<Props> = ({ tripWeather }) => {
  const minTemperature = fahrenheitToCelsius(tripWeather.tempmin);
  const maxTemperature = fahrenheitToCelsius(tripWeather.tempmax);
  const iconUrl = weatherIcons[tripWeather.icon] || "";
  const dayOfWeek = getDayOfWeek(new Date(tripWeather.datetime));

  return (
    <div className="trip-details">
      <p className="trip-details__day">{dayOfWeek}</p>
      <div className="trip-details__temp">
        <img src={iconUrl} alt="weather-icon" className="trip-details__img" />
        <p className="trip-details__temp-info">
          {`${maxTemperature}`}
          <p className="celsius celsius--small">&#8451;</p>
          <p>{`/${minTemperature}`}</p>
          <p className="celsius celsius--small">&#8451;</p>
        </p>
      </div>
    </div>
  );
};
