import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import { TripCard } from "./TripCard";
import { Trip } from "../types/Trip";

type Props = {
  products: Trip[];
  setSelectedTrip: (card: Trip) => void;
};

export const ProductSlider: React.FC<Props> = ({
  products,
  setSelectedTrip,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [products]);

  const cardWidth = 200;
  const gap = 16;
  const itemsPerSlide = 3;
  const isDisabledPrevButton = currentIndex === 0;
  const isDisabledNextButton = currentIndex >= products.length - itemsPerSlide;

  const handleNextClick = () => {
    if (currentIndex < products.length - itemsPerSlide) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const translateX = currentIndex * (cardWidth + gap);

  return (
    <div className="slider">
      <div className="slider__top">
        <div className="slider-buttons slider__buttons">
          <button
            className="button button--slider--left"
            aria-label="button-slider-left"
            type="button"
            disabled={isDisabledPrevButton}
            onClick={handlePrevClick}
          >
            &#10095;
          </button>
          <button
            className="button"
            aria-label="button-slider-right"
            type="button"
            disabled={isDisabledNextButton}
            onClick={handleNextClick}
          >
            &#10095;
          </button>
        </div>
      </div>
      <div
        className="slider__photos"
        style={{
          transform: `translateX(-${translateX}px)`,
        }}
        ref={sliderRef}
      >
        {products.map((product: Trip) => (
          <div className={cn("productSlide")} key={product.id}>
            <TripCard card={product} setSelectedTrip={setSelectedTrip} />
          </div>
        ))}
      </div>
    </div>
  );
};
