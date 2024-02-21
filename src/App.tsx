import React, { useEffect, useState } from "react";
import cn from "classnames";
import { ProductSlider } from "./components/CardSlider";
import "./styles/styles.scss";
import { SearchBar } from "./components/SearchBar";
import { TripDetailsList } from "./components/TripDetailsList";
import { Modal } from "./components/Modal";
import { useLocalStorage } from "./helpers/UseLocalStorage";
import { CurrentWeather } from "./components/CurrentWeather";
import { getCurrentDateTime, getWeather } from "./helpers/WeatherMethods";
import { CurrentWeatherData } from "./types/CurrentWeatherData";
import { ForecastData } from "./types/ForeCastData";
import initTrip from "./utils/trip.json";
import { Trip } from "./types/Trip";
import { ErrorElement } from "./components/Error";
import { NotFound } from "./components/NotFound";

export function App() {
  const initTrips: Trip[] = initTrip;
  const [trips, setTrips] = useLocalStorage("trips", initTrips);
  const [weatherData, setWeatherData] = useState<ForecastData>();
  const [query, setQuery] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>();
  const [isError, setIsError] = useState(false);
  const [isErrorCurrentWeather, setIsErrorCurrentWeather] = useState(false);

  useEffect(() => {
    const currentDateTime = getCurrentDateTime();
    const today = new Date().toISOString().split("T")[0];

    if (selectedTrip) {
      getWeather(selectedTrip.address, currentDateTime, "", "include=current")
        .then((value) =>
          setCurrentWeather(value as CurrentWeatherData | undefined)
        )
        .catch(() => setIsErrorCurrentWeather(true));

      const startDay =
        new Date(selectedTrip.startDate) < new Date(today) &&
        new Date(today) <= new Date(selectedTrip.lastDate)
          ? new Date(today).toISOString().split("T")[0]
          : selectedTrip.startDate;

      getWeather(selectedTrip.address, startDay, selectedTrip.lastDate)
        .then((value) => setWeatherData(value as ForecastData))
        .catch(() => setIsError(true));
    }
  }, [selectedTrip]);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const onAddTrip = () => {
    setShowModal(true);
  };

  const getPreparedData = () => {
    let preparedWeatherData = [...trips];
    if (query) {
      preparedWeatherData = trips.filter((trip) => {
        const address = trip.address;
        const firstDay = trip.startDate;
        const lastDay = trip.lastDate;

        return (
          firstDay.toLowerCase().includes(query.toLowerCase()) ||
          address.toLowerCase().includes(query.toLowerCase()) ||
          lastDay.toLowerCase().includes(query.toLowerCase())
        );
      });
    }

    if (isSorted) {
      preparedWeatherData.sort((trip1, trip2) => {
        const date1 = new Date(trip1.startDate).getTime();
        const date2 = new Date(trip2.startDate).getTime();
        return date1 - date2;
      });
    }
    return preparedWeatherData;
  };

  const preparedWeatherData = getPreparedData();
  const isShownTripDetails =
    selectedTrip && !isError && preparedWeatherData.length > 0 && weatherData;
  const isShownCurrentWeather =
    currentWeather &&
    selectedTrip &&
    !isErrorCurrentWeather &&
    preparedWeatherData.length > 0;

  return (
    <div className="App">
      <div className="App__content">
        <header className="App__header">
          <h1>Weather Forecast</h1>
        </header>

        <div className="App__left">
          <div className="App__search-bar">
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          <div className="App__sort-switcher">
            <input
              id="toggle"
              type="checkbox"
              className={cn("toggle", { "is-active": isSorted })}
              onChange={() => setIsSorted((prevState) => !prevState)}
            />
            <label
              htmlFor="toggle"
              className={cn("toggle__label", { "is-active": isSorted })}
            ></label>
            <span>Sort by start date</span>
          </div>

          <div className="App__trips">
            {preparedWeatherData.length > 0 && (
              <ProductSlider
                products={preparedWeatherData}
                setSelectedTrip={setSelectedTrip}
              />
            )}
            {preparedWeatherData.length > 0 ? (
              <div className="App__add-button">
                <button className="add-button" onClick={onAddTrip}>
                  +<br />
                  Add Trip
                </button>
              </div>
            ) : (
              <NotFound />
            )}
          </div>

          {isShownTripDetails && <TripDetailsList trip={weatherData} />}
          {isError && <ErrorElement />}
        </div>

        <div className="App__right">
          {isShownCurrentWeather && (
            <CurrentWeather
              currentWeather={currentWeather}
              selectedTrip={selectedTrip}
            />
          )}
          {isErrorCurrentWeather && <ErrorElement />}
        </div>

        {showModal && (
          <Modal onClose={handleCloseModal} setTrips={setTrips} trips={trips} />
        )}
      </div>
      <div>
      </div>
    </div>
  );
}
