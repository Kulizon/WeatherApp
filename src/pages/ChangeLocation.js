import { useHistory } from "react-router";
import { getForecastData } from "../store/forecast";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";

import useHttp from "../hooks/useHttp";

import Button from "../components/UI/Button";

import styles from "./ChangeLocation.module.css";

const ChangeLocation = () => {
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const dispatch = useDispatch();
  const history = useHistory();

  const [fetchForecastData, isForecastLoading, forecastError] = useHttp();
  const [fetchPositionData, isPositionLoading, positionError] = useHttp();

  const unit = useSelector((state) => state.options.unit);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (!inputRef.current.value.trim()) {
      inputRef.current.focus();
      setError("Please enter a valid value.");
      return;
    }

    const adress = inputRef.current.value;

    await dispatch(getForecastData(fetchForecastData, fetchPositionData, adress, unit));

    history.push({ pathname: "/today" });
  };

  return (
    <div className="page">
      <form action="" onSubmit={submitHandler} className={styles.form}>
        <label htmlFor="cityName">What's your adress?</label>
        <input type="text" id="cityName" ref={inputRef} placeholder="Kielce, 25-004..."></input>
        {error && <p>{error}</p>}
        {forecastError && <p>{forecastError}</p>}
        {positionError && <p>{positionError}</p>}
        {(isForecastLoading || isPositionLoading) && <div className="lds-dual-ring"></div>}
        <Button disabled={isForecastLoading || isPositionLoading}>Submit</Button>
      </form>
    </div>
  );
};

export default ChangeLocation;
