import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import useHttp from "../../hooks/useHttp";
import { getForecastData } from "../../store/forecast";
import { optionsActions } from "../../store/options";

import Button from "./../UI/Button";

import styles from "./OptionsMenu.module.css";

const OptionsMenu = () => {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState();
  const adressRef = useRef();

  const [adressSubmitted, setAdressSubmitted] = useState(false);
  const [unitSubmitted, setUnitSubmitted] = useState(false);

  const [showCurrentLocation, setShowCurrentLocation] = useState(false);

  const [adressError, setAdressError] = useState(null);
  const [unitError, setUnitError] = useState(null);

  const currentAdress = useSelector((state) => state.forecast.city);
  const currentUnit = useSelector((state) => state.options.unit);

  const [fetchForecastData, isForecastLoading, forecastError] = useHttp();
  const [fetchPositionData, isPositionLoading, positionError] = useHttp();

  if (!currentAdress) return <Redirect to="/"></Redirect>;

  const adressSubmitHandler = async (e) => {
    e.preventDefault();
    setAdressError(null);
    setAdressSubmitted(true);
    setShowCurrentLocation(false);

    const newAdress = adressRef.current.value;

    if (!newAdress.trim()) {
      adressRef.current.focus();
      setAdressError("Please enter a valid value.");
      setAdressSubmitted(false);
      return;
    }

    await dispatch(getForecastData(fetchForecastData, fetchPositionData, newAdress, currentUnit));

    setAdressSubmitted(false);
    setShowCurrentLocation(true);
    adressRef.current.value = "";
  };

  const radioOnChangeHandler = (e) => {
    setUnit(e.target);
  };

  const unitSubmitHandler = async (e) => {
    e.preventDefault();
    setUnitError(null);
    setUnitSubmitted(true);

    if (!unit) {
      setUnitError("Please enter a valid value.");
      setUnitSubmitted(false);
      return;
    }

    await dispatch(optionsActions.changeUnit(unit.value));

    await dispatch(getForecastData(fetchForecastData, fetchPositionData, currentAdress, unit.value));

    unit.checked = false;
    setUnitSubmitted(false);
    setUnit();
  };

  return (
    <div className={styles.menu}>
      <form onSubmit={adressSubmitHandler}>
        <label htmlFor="newAdress">What's your new adress?</label>
        <input type="text" id="newAdress" placeholder="Your new adress..." ref={adressRef} />
        {adressError && <p className={styles.error}>{adressError}</p>}
        {adressSubmitted && forecastError && <p className={styles.error}>{forecastError}</p>}
        {adressSubmitted && positionError && <p className={styles.error}>{positionError}</p>}
        {showCurrentLocation && !positionError && !forecastError && !isForecastLoading && !isPositionLoading && (
          <p className={styles.success}>Adress is now set to: {currentAdress}</p>
        )}
        {adressSubmitted && (isForecastLoading || isPositionLoading) && (
          <div className={`lds-dual-ring ${styles["spinning-wheel"]}`}></div>
        )}
        <Button>Submit</Button>
      </form>

      <form onSubmit={unitSubmitHandler}>
        <label>What's your preferred unit?</label>
        <div>
          <div>
            <input type="radio" id="celsius" value="metric" name="unit" onChange={radioOnChangeHandler} />
            <label htmlFor="celsius">Celsius</label>
          </div>
          <div>
            <input type="radio" id="fahrenheit" value="imperial" name="unit" onChange={radioOnChangeHandler} />
            <label htmlFor="fahrenheit">Fahrenheit</label>
          </div>
          <div>
            <input type="radio" id="kelvin " value="standard" name="unit" onChange={radioOnChangeHandler} />
            <label htmlFor="kelvin ">Kelvin </label>
          </div>
        </div>
        {unitError && <p className={styles.error}>{unitError}</p>}
        {unitSubmitted && forecastError && <p className={styles.error}>{forecastError}</p>}
        {unitSubmitted && positionError && <p className={styles.error}>{positionError}</p>}
        {unitSubmitted && (isForecastLoading || isPositionLoading) && (
          <div className={`lds-dual-ring ${styles["spinning-wheel"]}`}></div>
        )}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default OptionsMenu;
