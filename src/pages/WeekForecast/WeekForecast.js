import WeekForecastInfo from "../../components/Week/WeekForecastInfo/WeekForecastInfo";
import IconButton from "../../components/UI/IconButton/IconButton";

import ArrowUp from "../../assets/arrow-up-solid";
import ArrowDown from "../../assets/arrow-down-solid";

import styles from "./WeekForecast.module.scss";

const WeekForecast = (props) => {
  return (
    <div className={`page ${styles.forecast}`}>
      <IconButton
        className={styles["icon--up"]}
        to="/today"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {ArrowUp}
      </IconButton>
      <WeekForecastInfo></WeekForecastInfo>
      <IconButton
        className={styles["icon--down"]}
        to="/options"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {ArrowDown}
      </IconButton>
    </div>
  );
};

export default WeekForecast;
