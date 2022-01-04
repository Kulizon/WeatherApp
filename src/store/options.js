import { createSlice } from "@reduxjs/toolkit";

const optionsInitialState = { city: "", unit: "metric", unitSymbol: "°C" };

const options = createSlice({
  name: "options",
  initialState: optionsInitialState,
  reducers: {
    changeUnit(state, action) {
      if (action.payload === "metric") state.unitSymbol = "°C";
      if (action.payload === "standard") state.unitSymbol = "K";
      if (action.payload === "imperial") state.unitSymbol = "°F";

      state.unit = action.payload;
    },
  },
});

export default options;

export const optionsActions = options.actions;
