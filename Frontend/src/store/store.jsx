import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./reducers/userSlices";

export const store = configureStore({
  reducer: {
    user: userSlices,
  },
});

















