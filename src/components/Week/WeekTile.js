import styles from "./WeekTile.module.css";

const WeekTile = (props) => {
  return (
    <div className={styles["flip-card"]}>
      <div className={styles["flip-card-inner"] }>
        <div className={styles["week-tile"] + ' ' + styles["flip-card-front"]}>
          <h2>
            <span>{props.date.dayName}</span>
            <br></br>
            {props.date.month} {props.date.day}
          </h2>
          <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="Weather Icon" />
          <h4>{props.temperature}</h4>
          <p>{props.weather}</p>
        </div>
        <div className={styles["week-tile--detailed"] + ' ' + styles["flip-card-back"]}>
          <div>
            <p>
              Min <span>{props.detailed.temp.min}</span>
              {props.detailed.temp.unitSymbol}
            </p>
            <p>
              Max <span>{props.detailed.temp.max}</span>
              {props.detailed.temp.unitSymbol}
            </p>
          </div>
          <p>
            Pressure <span>{props.detailed.pressure}</span>hPa
          </p>
          <p>
            Humidity <span>{props.detailed.humidity}</span>%
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeekTile;
