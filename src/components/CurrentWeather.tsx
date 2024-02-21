import React from "react";
import {
  fahrenheitToCelsius,
  getDayOfWeek,
} from "../helpers/WeatherMethods";
import { weatherIcons } from "../helpers/WeatherIcons";
import { CountdownTimer } from "./CountDownTimer";
import { CurrentWeatherData } from "../types/CurrentWeatherData";
import { Trip } from "../types/Trip";
type Props = {
  currentWeather: CurrentWeatherData;
  selectedTrip: Trip;
};
export const CurrentWeather: React.FC<Props> = ({
  currentWeather,
  selectedTrip,
}) => {
  const temperature = fahrenheitToCelsius(
    currentWeather.currentConditions.temp
  );
  const iconUrl = weatherIcons[currentWeather.currentConditions.icon] || "";
  const dayOfWeek = getDayOfWeek(new Date());

  return (
    <div className="current-weather">
      <div className="current-weather__info">
        <p className="current-weather__day">{dayOfWeek}</p>
        <div className="current-weather__temperature-block">
          <img
            src={iconUrl}
            alt="weather-icon"
            className="current-weather__img"
          />
          <p className="current-weather__temperature">{temperature} </p>
          <p className="celsius">&#8451;</p>
        </div>
        <p className="current-weather__city">{currentWeather.address}</p>
        <CountdownTimer startDate={new Date(selectedTrip.startDate)} />
      </div>
    </div>
  );
};
