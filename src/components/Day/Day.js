import { CSSTransition } from "react-transition-group";

import styles from "./Day.module.scss";

const Day = (props) => {
  return (
    <div className={styles.day}>
      <CSSTransition classNames="fade-slide-in-top" in={true} appear timeout={300}>
        <div className={styles.info}>
          <h2>{props.city},</h2>
          <h2>
            {props.date.month} {props.date.day} {props.date.year}
          </h2>
        </div>
      </CSSTransition>
      <CSSTransition classNames="fade-slide-in-bottom" in={true} appear timeout={800}>
        <div style={{ animationDelay: "500ms" }} className={styles.forecast}>
          <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="Weather Icon" />
          <h4>{props.temperature}</h4>
          <p>{props.weather}</p>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Day;
