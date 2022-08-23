import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import Day from "../../components/Day/Day";
import IconButton from "../../components/UI/IconButton/IconButton";

import ArrowDownIcon from "../../assets/arrow-down-solid";

import styles from "./TodayForecast.module.scss";

const getMonthName = (mon) => {
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
  ][mon];
};

const TodayForecast = (props) => {
  const city = useSelector((state) => state.forecast.city);
  const forecast = useSelector((state) => state.forecast.forecast);
  const unitSymbol = useSelector((state) => state.options.unitSymbol);

  if (!city || !forecast) return <Redirect to="/"></Redirect>;

  const description = forecast.current.weather[0].description.split(" ");

  for (let i = 0; i < description.length; i++) {
    description[i] = description[i][0].toUpperCase() + description[i].substr(1) + " ";
  }

  const date = new Date();

  return (
    <div className="page">
      <Day
        city={city[0].toUpperCase() + city.substr(1)}
        date={{ day: date.getUTCDate(), month: getMonthName(date.getUTCMonth()), year: date.getFullYear() }}
        icon={forecast.current.weather[0].icon}
        temperature={Math.floor(forecast.current.temp) + unitSymbol}
        weather={description}
      ></Day>
      <IconButton
        className={styles.icon}
        to="/this-week"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {ArrowDownIcon}
      </IconButton>
    </div>
  );
};

export default TodayForecast;
