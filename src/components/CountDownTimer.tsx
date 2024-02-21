import React, { useState, useEffect } from "react";
type Props = {
  startDate: Date;
};

export const CountdownTimer: React.FC<Props> = ({ startDate }) => {
  const calculateTimeLeft = () => {
    const difference = startDate.getTime() - new Date().getTime();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    let seconds = Math.floor((difference / 1000) % 60);
    let minutes = Math.floor((difference / 1000 / 60) % 60);
    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="countdown">
      <div className="timer countdown__timer">
        <div className="timer__data">
          <h1 className="timer__date">{days} </h1>
          <p className="timer__text">days</p>
        </div>

        <div className="timer__data">
          <h1 className="timer__date">{hours} </h1>
          <p className="timer__text">hours</p>
        </div>
  
        <div className="timer__data">
          <h1 className="timer__date">{minutes} </h1>
          <p className="timer__text">minutes</p>
        </div>
  
        <div className="timer__data">
          <h1 className="timer__date">{seconds} </h1>
          <p className="timer__text">seconds</p>
        </div>
      </div>
    </div>
  );
};
