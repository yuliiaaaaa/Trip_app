import React from "react";
import { Trip } from "../types/Trip";
type Props = {
  card: Trip;
  setSelectedTrip: (card: Trip) => void;
};

export const TripCard: React.FC<Props> = ({ card, setSelectedTrip }) => {
  const { address, startDate, lastDate } = card;

  const handleTripClick = () => {
    setSelectedTrip(card);
  };

  return (
    <div className="trip-card" onClick={handleTripClick}>
      <img src={`img/${address}.jpg`} alt="city" className="trip-card__photo" />
      <div className="trip-card__info">
        <p className="trip-card__city">{address}</p>
        <p className="trip-card__date">{`${startDate} - ${lastDate}`}</p>
      </div>
    </div>
  );
};
