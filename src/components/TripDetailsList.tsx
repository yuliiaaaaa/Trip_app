import React from "react";
import { TripDetails } from "./TripDetails";
import { ForecastData, ForecastDay } from "../types/ForeCastData";

type Props = {
  trip: ForecastData;
};
export const TripDetailsList: React.FC<Props> = ({ trip }) => {
  return (
    <div className="trip-list">
      <h3 className="trip-list__title">Week</h3>
      <div className="trip-weather-list">
        {trip.days.map((day: ForecastDay, index) => (
          <TripDetails key={`day-${index}`} tripWeather={day} />
        ))}
      </div>
    </div>
  );
};
