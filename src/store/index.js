import { configureStore } from "@reduxjs/toolkit";

import options from "./options";
import forecast from "./forecast";

const store = configureStore({ reducer: {options: options.reducer, forecast: forecast.reducer} });

export default store;
