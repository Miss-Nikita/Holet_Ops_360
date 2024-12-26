import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlices";
import propertySlice from "./reducers/propertySlices"

export const store = configureStore({
  reducer: {
    user: userSlice,
    property:propertySlice
  },
});

















