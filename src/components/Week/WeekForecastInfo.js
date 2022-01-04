import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import WeekTile from "./WeekTile";

import styles from "./WeekForecastInfo.module.css";

const getMonthName = (month) => {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][month];
};

const getDayName = (day) => {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
};

const WeekForecastInfo = (props) => {
  const city = useSelector((state) => state.forecast.city);
  const forecast = useSelector((state) => state.forecast.forecast);
  const unitSymbol = useSelector((state) => state.options.unitSymbol);

  if (!city || !forecast) return <Redirect to="/"></Redirect>;

  const forecastTiles = [];

  for (let i = 0; i < forecast.daily.length - 2; i++) {
    const dayInfo = forecast.daily[i];
    const date = new Date();

    date.setDate(date.getDate() + i);

    const description = dayInfo.weather[0].description.split(" ");

    for (let n = 0; n < description.length; n++)
      description[n] = description[n][0].toUpperCase() + description[n].substr(1) + " ";

    forecastTiles.push(
      <CSSTransition key={dayInfo.dt} classNames="fade-slide-in-top" timeout={300 + (i + 1) * 125} appear>
        <li style={{ animationDelay: `${(i + 1) * 125}ms` }}>
          <WeekTile
            date={{
              day: date.getUTCDate(),
              dayName: getDayName(date.getDay()),
              month: getMonthName(date.getUTCMonth()),
              year: date.getFullYear(),
            }}
            icon={dayInfo.weather[0].icon}
            temperature={Math.floor(dayInfo.temp.day) + unitSymbol}
            detailed={{
              temp: { min: dayInfo.temp.min, max: dayInfo.temp.max, unitSymbol: unitSymbol },
              pressure: dayInfo.pressure,
              humidity: dayInfo.humidity,
            }}
            weather={description}
          ></WeekTile>
        </li>
      </CSSTransition>
    );
  }

  return (
    <div>
      <TransitionGroup component="ul" className={styles["week-forecast"]}>
        {forecastTiles}
      </TransitionGroup>
    </div>
  );
};

export default WeekForecastInfo;
