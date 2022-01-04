import { createSlice } from "@reduxjs/toolkit";

const forecastInitialState = { forecast: "", forecastState: {}, city: "" };

const forecast = createSlice({
  name: "forecast",
  initialState: forecastInitialState,
  reducers: {
    changeCity(state, action) {
      state.city = action.payload;
    },
    changeForecast(state, action) {
      state.forecast = action.payload;
    },
    changeForecastState(state, action) {
      state.forecastState = { error: action.payload.error, isLoading: action.payload.isLoading };
    },
  },
});

export default forecast;

export const forecastActions = forecast.actions;

export const getForecastData = (fetchForecastData, fetchPositionData, adress, unit) => {
  return async (dispatch) => {
    const positionData = await fetchPositionData(
      `https://eu1.locationiq.com/v1/search.php?key=pk.f9016451fc816966e88ac5eb7155c35e&q=${adress}&format=json`
    );

    const city = positionData[0]["display_name"].split(',')[0]

    dispatch(forecastActions.changeCity(city));

    const data = await fetchForecastData(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${positionData[0].lat}&lon=${positionData[0].lon}&exclude=minutely,hourly&appid=dbdd257d1cb79e0e4ca0fa1f294a2024&units=${unit}`
    );

    dispatch(forecastActions.changeForecast(data));
  };
};
