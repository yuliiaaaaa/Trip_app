import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid";
import cn from "classnames";
import cities from "../utils/cities.json";
import { Trip } from "../types/Trip";

type Props = {
  onClose: () => void;
  setTrips: (trip: Trip[]) => void;
  trips: Trip[];
};

export const Modal: React.FC<Props> = ({ onClose, setTrips, trips }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const MAX_DAYS_AHEAD = 15;
  const minDate = new Date().toISOString().split("T")[0];
  const maxDate = new Date(
    new Date().getTime() + MAX_DAYS_AHEAD * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateError("");
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateError("");
    setEndDate(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityError("");
    setSelectedCity(e.target.value);
  };

  const handleAddTrip = () => {
    if (!selectedCity || !startDate || !endDate) {
      setCityError(selectedCity ? "" : "City is required");
      setStartDateError(startDate ? "" : "Start date is required");
      setEndDateError(endDate ? "" : "End date is required");
      return;
    }

    if (endDate <= startDate) {
      setEndDateError("End date must be after start date");
      return;
    }
    if (endDate > maxDate) {
      setEndDateError(`End date must be within ${MAX_DAYS_AHEAD} days`);
      return;
    }
    if (startDate <= minDate) {
      setStartDateError("Start date must be after today");
      return;
    }
  
    const newTrip = {
      id: uuidv4(),
      address: selectedCity,
      startDate,
      lastDate: endDate,
    };

    setTrips([newTrip, ...trips]);
    onClose();
  };

  const handleCancel = () => {
    setSelectedCity("");
    setCityError("");
    setEndDate("");
    setEndDateError("");
    setStartDate("");
    setStartDateError("");
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h3 className="modal__title">Create trip</h3>

          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="modal__fields">
          <div className="modal__input">
            <label className="modal__label">Select City:</label>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className={cn("modal__field", { "is-error": cityError })}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {cityError && <span className="error">{cityError}</span>}
          </div>

          <div className="modal__input">
            <label className="modal__label">Start Date:</label>
            <input
              type="date"
              value={startDate}
              min={minDate}
              max={maxDate}
              onChange={handleStartDateChange}
              className={cn("modal__field", { "is-error": startDateError })}
            />
            {startDateError && <span className="error">{startDateError}</span>}
          </div>

          <div className="modal__input">
            <label className="modal__label">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={minDate}
              max={maxDate}
              className={cn("modal__field", { "is-error": endDateError })}
            />
            {endDateError && <span className="error">{endDateError}</span>}
          </div>
        </div>

        <div className="modal__buttons">
          <button onClick={handleCancel} className="form-button">
            Cancel
          </button>

          <button
            onClick={handleAddTrip}
            className="form-button form-button--blue"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
