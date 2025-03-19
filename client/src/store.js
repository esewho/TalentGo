import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default { store };
